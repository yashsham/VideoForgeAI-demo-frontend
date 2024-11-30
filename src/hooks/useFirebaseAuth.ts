import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth } from '../config/firebase';
import { getUserProfile } from '../services/firebase/user';

interface AuthState {
  user: User | null;
  profile: any | null;
  loading: boolean;
}

export function useFirebaseAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    profile: null,
    loading: true,
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const profile = await getUserProfile(user.uid);
          setAuthState({ user, profile, loading: false });
        } catch (error) {
          // Don't show error for profile fetching
          console.error('Error fetching user profile:', error);
          setAuthState({ user, profile: null, loading: false });
        }
      } else {
        setAuthState({ user: null, profile: null, loading: false });
      }
    });

    return () => unsubscribe();
  }, []);

  return authState;
}