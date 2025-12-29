"use client"
import React from 'react'
import { Shield, Check } from 'lucide-react'

const InsuranceProtection = () => {
  return (
    <div className="relative w-full py-9 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-700 flex items-center justify-center p-4 overflow-hidden">
      {/* Subtle background blur elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
        
        {/* Shield Icon Container */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Icon Box with glassmorphism */}
            <div className="bg-blue-300/20 backdrop-blur-md border border-blue-300/40 p-8 rounded-2xl shad ow-xl">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <Shield size={50} className="text-white/50 absolute" strokeWidth={1} />
                <Check size={28} className="text-white drop-shadow-lg relative" strokeWidth={3} />
              </div>
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
          Insurance Protection
        </h1>
        
        {/* Description */}
        <p className="text-base md:text-lg text-blue-50 max-w-lg mx-auto leading-relaxed drop-shadow-md font-light">
          Lawaap Truck insures your goods for up to 10,000,000 FCFA per trip in partnership with Corts Assurances
        </p>

        {/* CTA Button */}
        <div className="pt-6">
          <button className="group relative inline-flex items-center gap-2 px-7 py-3 bg-transparent border-2 border-white/60 hover:border-white text-white font-semibold rounded-full backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-white/10">
            <span>Get started today</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
      `}</style>
    </div>
  )
}

export default InsuranceProtection