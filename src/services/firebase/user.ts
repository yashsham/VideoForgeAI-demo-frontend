import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';

interface UserProfile {
  username: string;
  email: string;
  createdAt: string;
  photoURL: string | null;
  displayName: string;
  bio?: string;
  website?: string;
}

export const createUserProfile = async (userId: string, userData: UserProfile) => {
  try {
    // Create public profile
    const publicProfileRef = doc(db, 'public_profiles', userId);
    await setDoc(publicProfileRef, {
      username: userData.username,
      displayName: userData.displayName,
      photoURL: userData.photoURL,
      createdAt: serverTimestamp(),
    });

    // Create private user data
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...userData,
      updatedAt: serverTimestamp(),
      id: userId,
      emailVerified: false,
      role: 'user',
    });
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    // Get private user data
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      return null;
    }

    // Get public profile data
    const publicProfileRef = doc(db, 'public_profiles', userId);
    const publicProfileSnap = await getDoc(publicProfileRef);

    // Combine private and public data
    const userData = userSnap.data();
    const publicData = publicProfileSnap.exists() ? publicProfileSnap.data() : {};

    return {
      ...userData,
      ...publicData,
    } as UserProfile;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    }, { merge: true });

    // Update public fields if they exist in the updates
    const publicFields = ['username', 'displayName', 'photoURL'];
    const publicUpdates = Object.keys(updates)
      .filter(key => publicFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = updates[key as keyof UserProfile];
        return obj;
      }, {} as Record<string, any>);

    if (Object.keys(publicUpdates).length > 0) {
      const publicProfileRef = doc(db, 'public_profiles', userId);
      await setDoc(publicProfileRef, {
        ...publicUpdates,
        updatedAt: serverTimestamp(),
      }, { merge: true });
    }

    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};