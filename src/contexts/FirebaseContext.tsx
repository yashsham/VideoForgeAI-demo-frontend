import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { auth } from '../config/firebase';
import { getUserProfile } from '../services/firebase/user';

interface FirebaseContextType {
  user: User | null;
  profile: any | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState({
    user: null as User | null,
    profile: null,
    loading: true
  });

  const refreshProfile = async () => {
    if (state.user) {
      try {
        const profile = await getUserProfile(state.user.uid);
        setState(prev => ({ ...prev, profile }));
      } catch (error) {
        console.error('Error refreshing profile:', error);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const profile = await getUserProfile(user.uid);
          setState({ user, profile, loading: false });
        } catch (error) {
          setState({ user, profile: null, loading: false });
        }
      } else {
        setState({ user: null, profile: null, loading: false });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <FirebaseContext.Provider value={{ ...state, refreshProfile }}>
      {state.loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        children
      )}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}