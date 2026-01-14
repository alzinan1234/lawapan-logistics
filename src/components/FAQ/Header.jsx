"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();

  const navItems = [
    { id: 'faq', label: 'FAQ', href: '/faq' },
    { id: 'hiring', label: 'Lawapantruck is hiring', href: '/faq/hiring' },
    { id: 'about', label: 'About Us', href: '/faq/about' },
    { id: 'contact', label: 'Contact Us', href: '/faq/contact' },
    { id: 'insurance', label: 'Insurance', href: '/faq/insurance' },
    { id: 'data', label: 'Your Carries Data', href: '/faq/carries-data' }
  ];

  return (
    <header className="w-full bg-white  border-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <nav className="flex flex-wrap items-center justify-center gap-8 text-sm">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`py-4 transition-colors relative ${
                  isActive
                    ? 'font-medium'
                    : 'text-gray-900'
                }`}
                style={{color: isActive ? '#036BB4' : 'inherit'}}
                onMouseEnter={(e) => !isActive && (e.currentTarget.style.color = '#036BB4')}
                onMouseLeave={(e) => !isActive && (e.currentTarget.style.color = 'inherit')}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5" style={{backgroundColor: '#036BB4'}}></span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;