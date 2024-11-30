import React from 'react';
import { Github, Twitter, Linkedin, Youtube, Facebook, Instagram } from 'lucide-react';

interface SocialLink {
  name: string;
  icon: React.ElementType;
  href: string;
}

const socialLinks: SocialLink[] = [
  { name: 'GitHub', icon: Github, href: 'https://github.com' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
];

export default function SocialLinks() {
  return (
    <div className="flex space-x-4">
      {socialLinks.map(({ name, icon: Icon, href }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
          aria-label={`Follow us on ${name}`}
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}