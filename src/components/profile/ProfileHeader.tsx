import React from 'react';
import { Camera, Upload } from 'lucide-react';
import { useProfile } from '../../contexts/ProfileContext';
import { toast } from 'react-hot-toast';

export default function ProfileHeader() {
  const { profile, uploadProfilePhoto } = useProfile();

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await uploadProfilePhoto(file);
      toast.success('Profile photo updated successfully');
    } catch (error) {
      toast.error('Failed to update profile photo');
    }
  };

  return (
    <div className="relative mb-8">
      <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-800"></div>
      <div className="absolute bottom-0 left-8 transform translate-y-1/2">
        <div className="relative">
          <img
            src={profile?.photoURL || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop'}
            alt={profile?.displayName}
            className="w-24 h-24 rounded-full border-4 border-white"
          />
          <label className="absolute bottom-0 right-0 p-1 bg-white rounded-full cursor-pointer hover:bg-gray-100 transition-colors">
            <Camera className="h-4 w-4 text-gray-600" />
            <input
              type="file"
              className="hidden"
              accept="image/jpeg,image/png"
              onChange={handlePhotoUpload}
            />
          </label>
        </div>
      </div>
    </div>
  );
}