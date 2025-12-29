import React from 'react';
import { Clock, Truck, BarChart3, Shield } from 'lucide-react';

const BenefitsForBusinesses = () => {
  const benefits = [
    {
      icon: <Clock className="w-6 h-6 text-blue-500" />,
      title: "Save Time",
      description: "Ship in just 3 clicks"
    },
    {
      icon: <Truck className="w-6 h-6 text-blue-500" />,
      title: "Reliable Trucks",
      description: "Verified transporters only"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-blue-500" />,
      title: "Track Online",
      description: "Monitor every step"
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-500" />,
      title: "Insured",
      description: "Full cargo protection"
    }
  ];

  return (
    <div className="w-full bg-white py-12 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            Benefits for Businesses
          </h2>
        </div>
 
        {/* Benefits Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300">
                {benefit.icon}
              </div>

              {/* Title */}
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-xs md:text-sm text-gray-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BenefitsForBusinesses;
