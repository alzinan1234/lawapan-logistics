"use client";
import React, { useState } from 'react';
import { MapPin, Box } from 'lucide-react';

const HeroBanner = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [merchandise, setMerchandise] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Searching for: " + pickupLocation);
    }, 1000);
  };

  return (
    <div className="relative w-full bg-white font-sans">
      
      {/* --- 1. Hero Image Section --- */}
      <div 
        className="relative w-full h-[600px] md:h-[700px] bg-cover bg-center flex items-center"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1519003722824-194d4455a60c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')` // Replace with your actual image path
        }}
      >
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl bg-black/30 backdrop-blur-sm p-8 md:p-12 rounded-sm">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              A simple, fast, and <br /> reliable transport solution
            </h1>
            <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-lg">
              Simplify your logistics with Lawapan Truck. Track your shipment in real time, 
              get secure payments, and connect with trusted transporters.
            </p>
          </div>
        </div>
      </div>

      {/* --- 2. Search Bar Section (Overlapping) --- */}
      <div className="relative z-20 -mt-20 md:-mt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[20px] shadow-2xl p-6 md:p-8 border border-gray-100">
            <h3 className="text-gray-500 font-medium mb-6 text-sm uppercase tracking-wider">
              Find a transporter in one click
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
              
              {/* Pickup */}
              <div className="space-y-2">
                <label className="block text-[11px] font-semibold text-gray-400 uppercase ml-1">
                  Pickup (postal code or city)
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600">
                    <MapPin size={20} />
                  </div>
                  <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="Martyrs' Memorial, Algeria"
                    className="w-full bg-[#f3f4f6] pl-12 pr-4 py-4 text-sm font-medium rounded-full border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Delivery */}
              <div className="space-y-2">
                <label className="block text-[11px] font-semibold text-gray-400 uppercase ml-1">
                  Delivery (postal code or city)
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600">
                    <MapPin size={20} />
                  </div>
                  <input
                    type="text"
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    placeholder="Martyrs' Memorial, Algeria"
                    className="w-full bg-[#f3f4f6] pl-12 pr-4 py-4 text-sm font-medium rounded-full border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Merchandise */}
              <div className="space-y-2">
                <label className="block text-[11px] font-semibold text-gray-400 uppercase ml-1">
                  Merchandise to be shipped
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600">
                    <Box size={20} />
                  </div>
                  <input
                    type="text"
                    value={merchandise}
                    onChange={(e) => setMerchandise(e.target.value)}
                    placeholder="Food commodities"
                    className="w-full bg-[#f3f4f6] pl-12 pr-4 py-4 text-sm font-medium rounded-full border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Search Button */}
              <div>
                <button
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="w-full bg-[#0066cc] text-white py-4 px-8 rounded-full font-bold text-sm hover:bg-[#0052a3] transition-all active:scale-95 shadow-lg shadow-blue-200"
                >
                  {isLoading ? 'Searching...' : 'Direct Rate'}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;