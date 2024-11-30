import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../../types/auth';
import { getStoredToken, setStoredToken, removeStoredToken } from '../../utils/token';
import { validateToken } from '../../services/auth';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (token: string, user: User) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = getStoredToken();
      if (token) {
        try {
          const response = await validateToken(token);
          setUser(response.user);
        } catch (error) {
          removeStoredToken();
          toast.error('Session expired. Please sign in again.');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const signIn = (token: string, userData: User) => {
    setStoredToken(token);
    setUser(userData);
    toast.success('Successfully signed in!');
  };

  const signOut = () => {
    removeStoredToken();
    setUser(null);
    toast.success('Successfully signed out!');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}