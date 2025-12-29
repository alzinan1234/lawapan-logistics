"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const TransporterBanner = () => {
  return (
    <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden font-sans">
      {/* --- 1. Background Image Layer --- */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1519003722824-194d4455a60c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')", // আপনার ইমেজ পাথ এখানে দিন
        }}
      >
        {/* Subtle Overlay for better readability */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* --- 2. Main Content Overlay --- */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          
          {/* The Semi-transparent Dark Box (Same as Shipper style) */}
          <div className="bg-black/30 backdrop-blur-[2px] p-8 md:p-12 lg:p-14 rounded-sm max-w-xl lg:max-w-2xl border border-white/10 shadow-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-lg">
              Join Us and Increase <br /> Your Revenue!
            </h1>
            
            <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-10 drop-shadow-md max-w-lg">
              Connect with businesses across West Africa and grow your transport business.
            </p>

            {/* CTA Button (Same Rounded Style) */}
            {/* <Link href="/book">
              <button className="group flex items-center gap-3 px-10 py-4 bg-[#0060ad] text-white font-bold rounded-full hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-xl">
                <span>Join Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </Link> */}
          </div>

        </div>
      </div>

      {/* Optional: Bottom Gradient to blend with next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/10 to-transparent pointer-events-none"></div>

    </div>
  );
};

export default TransporterBanner;