import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useProfile } from '../../contexts/ProfileContext';
import { toast } from 'react-hot-toast';

const profileSchema = z.object({
  displayName: z.string().min(2, 'Name must be at least 2 characters'),
  location: z.string().optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  socialLinks: z.object({
    twitter: z.string().url().optional().or(z.literal('')),
    linkedin: z.string().url().optional().or(z.literal('')),
    github: z.string().url().optional().or(z.literal(''))
  }).optional()
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfileInfo() {
  const { profile, updateProfile } = useProfile();
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: profile?.displayName || '',
      location: profile?.location || '',
      bio: profile?.bio || '',
      socialLinks: profile?.socialLinks || {}
    }
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfile(data);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Display Name
        </label>
        <input
          {...register('displayName')}
          className="w-full px-4 py-2 bg-navy-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
        />
        {errors.displayName && (
          <p className="mt-1 text-sm text-red-500">{errors.displayName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Location
        </label>
        <input
          {...register('location')}
          className="w-full px-4 py-2 bg-navy-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Bio
        </label>
        <textarea
          {...register('bio')}
          rows={4}
          className="w-full px-4 py-2 bg-navy-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
        />
        {errors.bio && (
          <p className="mt-1 text-sm text-red-500">{errors.bio.message}</p>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Social Links</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Twitter
          </label>
          <input
            {...register('socialLinks.twitter')}
            className="w-full px-4 py-2 bg-navy-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            LinkedIn
          </label>
          <input
            {...register('socialLinks.linkedin')}
            className="w-full px-4 py-2 bg-navy-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            GitHub
          </label>
          <input
            {...register('socialLinks.github')}
            className="w-full px-4 py-2 bg-navy-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}