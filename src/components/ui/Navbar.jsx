"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => pathname === path;

  return (
    <>
      {/* Fixed Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 transition-all duration-300 ${
        isScrolled ? 'shadow-lg backdrop-blur-md bg-white/80' : 'shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="">
              <div className="relative w-[67px] h-[60px]">
                <Image src="/web-logo.png" alt="Logo" fill className="object-contain" />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="relative group py-2">
                <span className={`font-medium transition-colors duration-300 ${isActive('/') ? 'text-blue-600' : 'text-gray-700 group-hover:text-blue-600'}`}>
                  Home
                </span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform origin-left transition-transform duration-300 ${isActive('/') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </Link>
              <Link href="/shipper" className="relative group py-2">
                <span className={`font-medium transition-colors duration-300 ${isActive('/shipper') ? 'text-blue-600' : 'text-gray-700 group-hover:text-blue-600'}`}>
                  Shipper
                </span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform origin-left transition-transform duration-300 ${isActive('/shipper') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </Link>
              <Link href="/transporter" className="relative group py-2">
                <span className={`font-medium transition-colors duration-300 ${isActive('/transporter') ? 'text-blue-600' : 'text-gray-700 group-hover:text-blue-600'}`}>
                  Transporter
                </span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform origin-left transition-transform duration-300 ${isActive('/transporter') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </Link>
              <Link href="/faq" className="relative group py-2">
                <span className={`font-medium transition-colors duration-300 ${isActive('/faq') ? 'text-blue-600' : 'text-gray-700 group-hover:text-blue-600'}`}>
                  FAQ
                </span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform origin-left transition-transform duration-300 ${isActive('/faq') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </Link>
              <Link href="/dashboard/Shipper" className="relative group py-2">
                <span className={`font-medium transition-colors duration-300 ${isActive('/dashboard/Shipper') ? 'text-blue-600' : 'text-gray-700 group-hover:text-blue-600'}`}>
                  Dashboard
                </span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform origin-left transition-transform duration-300 ${isActive('/dashboard/Shipper') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </Link>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/signup">
                <button className="px-6 py-2 text-blue-600 font-medium border border-blue-600 rounded-full hover:bg-blue-50 transform hover:scale-105 transition-all duration-300">
                  Sign Up
                </button>
              </Link>
              <Link href="/login">
                <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transform hover:scale-105 hover:shadow-lg transition-all duration-300">
                  Login
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden border-t border-gray-200 overflow-hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link href="/" className={`block px-3 py-2 rounded-md font-medium transition-all duration-300 transform ${isActive('/') ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 hover:translate-x-1'}`}>
              Home
            </Link>
            <Link href="/shipper" className={`block px-3 py-2 rounded-md font-medium transition-all duration-300 transform ${isActive('/shipper') ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 hover:translate-x-1'}`}>
              Shipper
            </Link>
            <Link href="/transporter" className={`block px-3 py-2 rounded-md font-medium transition-all duration-300 transform ${isActive('/transporter') ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 hover:translate-x-1'}`}>
              Transporter
            </Link>
            <Link href="/faq" className={`block px-3 py-2 rounded-md font-medium transition-all duration-300 transform ${isActive('/faq') ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 hover:translate-x-1'}`}>
              FAQ
            </Link>
            <Link href="/dashboard/Shipper" className={`block px-3 py-2 rounded-md font-medium transition-all duration-300 transform ${isActive('/dashboard') ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 hover:translate-x-1'}`}>
              Dashboard
            </Link>
            <div className="flex gap-3 pt-4 space-y-2">
              <Link href="/signup">
                <button className="w-full px-6 py-2 text-blue-600 font-medium border border-blue-600 rounded-full hover:bg-blue-50 transform hover:scale-105 transition-all duration-300">
                  Sign Up
                </button>
              </Link>
              <Link href="/login">
                <button className="w-full px-6 py-2 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transform hover:scale-105 hover:shadow-lg transition-all duration-300">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;