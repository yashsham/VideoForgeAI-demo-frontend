import React, { useState } from 'react';
import { X } from 'lucide-react';
import SignInForm from './auth/SignInForm';
import SignUpForm from './auth/SignUpForm';
import SocialLogin from './auth/SocialLogin';

interface AuthProps {
  onClose: () => void;
}

export default function Auth({ onClose }: AuthProps) {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSuccess = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-navy-900 w-full max-w-md p-8 rounded-2xl border border-blue-900/50 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <SocialLogin onSuccess={handleSuccess} />

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-navy-900 text-gray-400">Or continue with</span>
          </div>
        </div>

        {isSignUp ? (
          <SignUpForm 
            onSuccess={handleSuccess}
            onSwitchToSignIn={() => setIsSignUp(false)}
          />
        ) : (
          <SignInForm 
            onSuccess={handleSuccess}
            onForgotPassword={() => {/* Implement forgot password */}}
            onSwitchToSignUp={() => setIsSignUp(true)}
          />
        )}
      </div>
    </div>
  );
}