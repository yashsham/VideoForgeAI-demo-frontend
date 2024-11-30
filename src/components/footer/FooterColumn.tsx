import React from 'react';
import { Link } from 'react-router-dom';

interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

export default function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
        {title}
      </h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            {link.isExternal ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                aria-label={`Visit ${link.label} (opens in new tab)`}
              >
                {link.label}
              </a>
            ) : (
              <Link
                to={link.href}
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                aria-label={`Go to ${link.label}`}
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}