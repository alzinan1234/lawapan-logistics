"use client";
import React, { useState } from 'react';
import { MapPin, Package } from 'lucide-react';

const ShipperBanner = () => {
  const [pickupLocation, setPickupLocation] = useState("Martyrs' Memorial, Algeria");
  const [deliveryLocation, setDeliveryLocation] = useState("Martyrs' Memorial, Algeria");
  const [merchandise, setMerchandise] = useState("Food commodities");

  // Reusable Input Component to match the HeroBanner style
  const InputGroup = ({ label, value, onChange, Icon, placeholder }) => (
    <div className="flex-1 space-y-2">
      <label className="block text-[11px] font-semibold text-gray-400 uppercase ml-1">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
          <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100">
            <Icon className="w-4 h-4 text-[#0060ad]" />
          </div>
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-[#f3f4f6] pl-14 pr-4 py-3.5 text-sm text-gray-900 rounded-full border-2 border-transparent focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder-gray-500 font-medium shadow-sm"
        />
      </div>
    </div>
  );

  return (
    <div className="relative w-full  bg-white font-sans">
      
      {/* --- 1. Background Image Layer --- */}
      <div 
        className="relative w-full h-[600px] md:h-[700px] bg-cover bg-center"
        style={{
          backgroundImage: "url('/semi-truck.png')", // Ensure this path is correct in your public folder
        }}
      >
        {/* Dark Overlay for contrast */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* --- 2. Main Text Overlay (Centered vertically) --- */}
        <div className="absolute inset-0 flex flex-col justify-center">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-900/40 backdrop-blur-[2px] p-8 md:p-12 rounded-sm max-w-xl lg:max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 drop-shadow-md">
                A simple, fast, and <br /> reliable transport solution
              </h1>
              <p className="text-white/90 text-lg md:text-xl leading-relaxed drop-shadow-sm">
                Simplify your logistics with Lawapan Truck. Track your shipment in real time, 
                get secure payments, and connect with trusted transporters.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- 3. Search Bar (Overlapping the image and the white section) --- */}
      <div className="relative z-20 -mt-20 md:-mt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[24px] shadow-2xl p-6 md:p-8 border border-gray-100">
            <h3 className="text-gray-700 font-bold mb-6 text-base ml-1">
              Quick truck search
            </h3>
            
            <div className="flex flex-col lg:flex-row gap-6 lg:items-end">
              
              {/* Pickup */}
              <InputGroup 
                label="Pickup (postal code or city)" 
                value={pickupLocation} 
                onChange={setPickupLocation} 
                Icon={MapPin}
                placeholder="Enter pickup location"
              />

              {/* Delivery */}
              <InputGroup 
                label="Delivery (postal code or city)" 
                value={deliveryLocation} 
                onChange={setDeliveryLocation} 
                Icon={MapPin}
                placeholder="Enter delivery location"
              />

              {/* Merchandise */}
              <InputGroup 
                label="Merchandise to be shipped" 
                value={merchandise} 
                onChange={setMerchandise} 
                Icon={Package}
                placeholder="What are you shipping?"
              />

              {/* Action Button */}
              <div className="lg:w-auto w-full">
                <button className="w-full lg:w-auto px-10 py-4 bg-[#0060ad] text-white text-sm font-bold rounded-full hover:bg-blue-700 active:scale-95 transform transition-all shadow-lg hover:shadow-blue-200 flex items-center justify-center">
                  Direct Rate
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ShipperBanner;