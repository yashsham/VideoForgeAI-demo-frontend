import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth, db, storage } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { uploadFile } from '../services/profile/storage';
import { voiceChatService } from '../services/profile/voice';
import { submitReview } from '../services/profile/reviews';
import { ProfileContextType, UserProfile, FileUpload, Review, VoiceChatSession } from '../types/profile';

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        try {
          const profileDoc = await getDoc(doc(db, 'users', user.uid));
          if (profileDoc.exists()) {
            setProfile(profileDoc.data() as UserProfile);
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) throw new Error('No user logged in');

    try {
      await setDoc(doc(db, 'users', user.uid), {
        ...profile,
        ...data,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      setProfile(prev => prev ? { ...prev, ...data } : null);
    } catch (error) {
      throw new Error('Failed to update profile: ' + error);
    }
  };

  const uploadProfilePhoto = async (file: File): Promise<string> => {
    if (!user) throw new Error('No user logged in');

    const upload = await uploadFile(file, user.uid, 'profile');
    await updateProfile({ photoURL: upload.url });
    return upload.url;
  };

  const handleFileUpload = async (file: File): Promise<FileUpload> => {
    if (!user) throw new Error('No user logged in');

    const type = file.type.startsWith('image/') ? 'image' :
                file.type.startsWith('video/') ? 'video' :
                file.type.startsWith('audio/') ? 'audio' : 
                'profile';

    return uploadFile(file, user.uid, type);
  };

  const handleReviewSubmit = async (review: Omit<Review, 'id' | 'userId' | 'status' | 'createdAt'>) => {
    if (!user || !profile) throw new Error('No user logged in');

    await submitReview({
      ...review,
      userId: user.uid,
      userDisplayName: profile.displayName,
      userPhotoURL: profile.photoURL || undefined
    });
  };

  const startVoiceChat = async (): Promise<VoiceChatSession> => {
    if (!user) throw new Error('No user logged in');

    const stream = await voiceChatService.startRecording();
    return {
      id: Math.random().toString(36).substring(7),
      userId: user.uid,
      startTime: new Date().toISOString()
    };
  };

  const endVoiceChat = async (sessionId: string): Promise<void> => {
    const audioBlob = await voiceChatService.stopRecording();
    const transcription = await voiceChatService.transcribeAudio(audioBlob);
    // Handle the audio blob and transcription as needed
  };

  const value = {
    user,
    profile,
    loading,
    updateProfile,
    uploadProfilePhoto,
    uploadFile: handleFileUpload,
    submitReview: handleReviewSubmit,
    startVoiceChat,
    endVoiceChat
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};