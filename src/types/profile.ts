import { User } from 'firebase/auth';

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string | null;
  location?: string;
  bio?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  preferences?: {
    emailNotifications: boolean;
    darkMode: boolean;
    language: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface FileUpload {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  createdAt: string;
  userId: string;
}

export interface Review {
  id: string;
  userId: string;
  title: string;
  content: string;
  rating: number;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
  userDisplayName: string;
  userPhotoURL?: string;
}

export interface VoiceChatSession {
  id: string;
  userId: string;
  startTime: string;
  endTime?: string;
  transcription?: string;
  audioUrl?: string;
}

export interface ProfileContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  uploadProfilePhoto: (file: File) => Promise<string>;
  uploadFile: (file: File) => Promise<FileUpload>;
  submitReview: (review: Omit<Review, 'id' | 'userId' | 'status' | 'createdAt'>) => Promise<void>;
  startVoiceChat: () => Promise<VoiceChatSession>;
  endVoiceChat: (sessionId: string) => Promise<void>;
}