import { SignInInput, SignUpInput } from '../schemas/auth';
import { AuthResponse } from '../types/auth';
import { toast } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function signIn(data: SignInInput): Promise<AuthResponse> {
  try {
    console.log('Attempting to sign in:', API_URL);
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to sign in');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Sign in error:', error);
    const message = error instanceof Error ? error.message : 'Failed to sign in';
    toast.error(message);
    throw error;
  }
}

export async function signUp(data: SignUpInput): Promise<{ message: string }> {
  try {
    console.log('Attempting to sign up:', API_URL);
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to sign up');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Sign up error:', error);
    const message = error instanceof Error ? error.message : 'Failed to sign up';
    toast.error(message);
    throw error;
  }
}

export async function signOut(): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to sign out');
    }
  } catch (error) {
    console.error('Sign out error:', error);
    toast.error('Failed to sign out');
    throw error;
  }
}

export async function validateToken(token: string): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_URL}/api/auth/validate`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Invalid token');
    }

    return response.json();
  } catch (error) {
    console.error('Token validation error:', error);
    throw new Error('Token validation failed');
  }
}