import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function FooterLogo() {
  return (
    <Link to="/" className="flex items-center space-x-2 group">
      <Sparkles className="h-8 w-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-200" />
      <div className="flex flex-col">
        <span className="text-white font-bold text-lg group-hover:text-blue-400 transition-colors duration-200">
          VideoForge AI
        </span>
        <span className="text-gray-400 text-sm">
          Creating the future of video
        </span>
      </div>
    </Link>
  );
}