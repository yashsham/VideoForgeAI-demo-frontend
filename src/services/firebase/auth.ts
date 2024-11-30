import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification
} from 'firebase/auth';
import { auth } from '../../config/firebase';
import { createUserProfile } from './user';
import { toast } from 'react-hot-toast';

export const signUp = async (email: string, password: string, username: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Create user profile in Firestore
    await createUserProfile(user.uid, {
      username,
      email,
      createdAt: new Date().toISOString(),
      photoURL: null,
      displayName: username
    });

    // Send email verification
    await sendEmailVerification(user);
    
    toast.success('Account created! Please verify your email.');
    return user;
  } catch (error: any) {
    const errorMessage = error.code === 'auth/email-already-in-use' 
      ? 'Email already in use'
      : error.message;
    toast.error(errorMessage);
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    toast.success('Signed in successfully!');
    return userCredential.user;
  } catch (error: any) {
    const errorMessage = error.code === 'auth/wrong-password'
      ? 'Invalid email or password'
      : error.message;
    toast.error(errorMessage);
    throw error;
  }
};

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    
    // Create/update user profile
    await createUserProfile(user.uid, {
      username: user.displayName || 'User',
      email: user.email || '',
      createdAt: new Date().toISOString(),
      photoURL: user.photoURL,
      displayName: user.displayName || 'User'
    });

    toast.success('Signed in with Google successfully!');
    return user;
  } catch (error: any) {
    toast.error('Failed to sign in with Google');
    throw error;
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    toast.success('Signed out successfully');
  } catch (error) {
    toast.error('Failed to sign out');
    throw error;
  }
};

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success('Password reset email sent!');
  } catch (error: any) {
    toast.error('Failed to send reset email');
    throw error;
  }
};