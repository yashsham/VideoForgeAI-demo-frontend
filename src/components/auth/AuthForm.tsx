import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { signInSchema, signUpSchema } from '../../schemas/auth';
import { signIn, signUp } from '../../services/auth';
import { useAuth } from './AuthContext';
import FormInput from './FormInput';

interface AuthFormProps {
  initialMode?: 'signin' | 'signup';
  onSuccess?: () => void;
}

export default function AuthForm({ initialMode = 'signin', onSuccess }: AuthFormProps) {
  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn: authSignIn } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm({
    resolver: zodResolver(mode === 'signin' ? signInSchema : signUpSchema),
    mode: 'onChange'
  });

  const onSubmit = async (data: any) => {
    try {
      if (mode === 'signin') {
        const response = await signIn(data);
        authSignIn(response.token, response.user);
        toast.success('Successfully signed in!');
      } else {
        await signUp(data);
        toast.success('Account created! Please verify your email.');
        setMode('signin');
      }
      reset();
      onSuccess?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Authentication failed');
    }
  };

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {mode === 'signup' && (
        <FormInput
          label="Username"
          error={errors.username?.message}
          icon={User}
        >
          <input
            {...register('username')}
            type="text"
            placeholder="Choose a username"
            className="input-field"
          />
        </FormInput>
      )}

      <FormInput
        label="Email"
        error={errors.email?.message}
        icon={Mail}
      >
        <input
          {...register('email')}
          type="email"
          placeholder="Enter your email"
          className="input-field"
        />
      </FormInput>

      <FormInput
        label="Password"
        error={errors.password?.message}
        icon={Lock}
      >
        <div className="relative">
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            className="input-field"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </FormInput>

      {mode === 'signup' && (
        <FormInput
          label="Confirm Password"
          error={errors.confirmPassword?.message}
          icon={Lock}
        >
          <input
            {...register('confirmPassword')}
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            className="input-field"
          />
        </FormInput>
      )}

      {mode === 'signin' && (
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register('rememberMe')}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <button
            type="button"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Forgot password?
          </button>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? (
          'Processing...'
        ) : mode === 'signin' ? (
          'Sign In'
        ) : (
          'Create Account'
        )}
      </button>

      <p className="text-center text-sm text-gray-600">
        {mode === 'signin' ? (
          <>
            Don't have an account?{' '}
            <button
              type="button"
              onClick={toggleMode}
              className="text-blue-600 hover:text-blue-800"
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button
              type="button"
              onClick={toggleMode}
              className="text-blue-600 hover:text-blue-800"
            >
              Sign in
            </button>
          </>
        )}
      </p>
    </form>
  );
}