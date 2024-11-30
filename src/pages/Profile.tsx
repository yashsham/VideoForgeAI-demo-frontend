import React, { useState } from 'react';
import { useProfile } from '../contexts/ProfileContext';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileInfo from '../components/profile/ProfileInfo';
import SecuritySettings from '../components/profile/SecuritySettings';

export default function Profile() {
  const { loading } = useProfile();
  const [activeTab, setActiveTab] = useState<'info' | 'security'>('info');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-900 rounded-lg shadow-xl border border-gray-800">
          <ProfileHeader />
          
          <div className="p-8 pt-16">
            <div className="flex border-b border-gray-800 mb-8">
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === 'info'
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('info')}
              >
                Profile Information
              </button>
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === 'security'
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('security')}
              >
                Security Settings
              </button>
            </div>

            {activeTab === 'info' ? <ProfileInfo /> : <SecuritySettings />}
          </div>
        </div>
      </div>
    </div>
  );
}