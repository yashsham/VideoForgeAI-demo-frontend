import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FormInputProps {
  label: string;
  error?: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export default function FormInput({ label, error, icon: Icon, children }: FormInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        {children}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}