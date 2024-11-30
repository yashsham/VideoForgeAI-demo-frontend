import React from 'react';
import FooterColumn from './FooterColumn';
import SocialLinks from './SocialLinks';
import FooterLogo from './FooterLogo';
import FooterNewsletter from './FooterNewsletter';

const footerLinks = {
  product: [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Templates', href: '/templates' },
    { label: 'Enterprise', href: '/enterprise' },
  ],
  resources: [
    { label: 'Help Center', href: '/help' },
    { label: 'Community', href: '/community' },
    { label: 'Tutorials', href: '/tutorials' },
    { label: 'Documentation', href: '/docs' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
    { label: 'Press', href: '/press' },
    { label: 'Partners', href: '/partners' },
    { label: 'Contact Us', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Security', href: '/security' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <div className="space-y-8">
              <FooterLogo />
              <SocialLinks />
            </div>
          </div>
          
          <div className="col-span-1">
            <FooterColumn title="Product" links={footerLinks.product} />
          </div>
          
          <div className="col-span-1">
            <FooterColumn title="Resources" links={footerLinks.resources} />
          </div>
          
          <div className="col-span-1">
            <FooterColumn title="Company" links={footerLinks.company} />
          </div>
          
          <div className="col-span-1">
            <FooterColumn title="Legal" links={footerLinks.legal} />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FooterNewsletter />
            <div className="text-gray-400 text-sm md:text-right">
              © {new Date().getFullYear()} VideoForge AI. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}