import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { UseFormRegister } from 'react-hook-form';

interface PasswordInputProps {
  id: string;
  placeholder: string;
  register: UseFormRegister<any>;
  error?: string;
}

export default function PasswordInput({ id, placeholder, register, error }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        {...register(id)}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        className={`input-field ${error ? 'border-red-500' : ''}`}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
}