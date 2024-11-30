import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { signUp } from '../../services/firebase/auth';
import { toast } from 'react-hot-toast';

interface SignUpFormProps {
  onSuccess: () => void;
  onSwitchToSignIn: () => void;
}

export default function SignUpForm({ onSuccess, onSwitchToSignIn }: SignUpFormProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      await signUp(email, password, username);
      onSuccess();
      onSwitchToSignIn(); // Switch to sign in after successful registration
    } catch (error) {
      // Error is already handled in the service
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 bg-navy-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
            placeholder="Choose a username"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 bg-navy-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
            placeholder="Enter your email"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full pl-10 pr-10 py-2 bg-navy-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
            placeholder="Create a password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Creating account...' : 'Create account'}
      </button>

      <p className="text-center text-sm text-gray-400">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToSignIn}
          className="text-blue-400 hover:text-blue-300"
        >
          Sign in
        </button>
      </p>
    </form>
  );
}