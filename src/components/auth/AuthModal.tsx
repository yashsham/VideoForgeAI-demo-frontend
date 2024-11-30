import React from 'react';
import { X } from 'lucide-react';
import AuthForm from './AuthForm';
import SocialLogin from './SocialLogin';

interface AuthModalProps {
  onClose: () => void;
}

export default function AuthModal({ onClose }: AuthModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <SocialLogin />

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <AuthForm onSuccess={onClose} />
      </div>
    </div>
  );
}