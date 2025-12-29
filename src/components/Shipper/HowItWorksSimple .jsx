import React from 'react';
import { Edit3, Truck, Package } from 'lucide-react';

const HowItWorksSimple = () => {
  const steps = [
    {
      icon: <Edit3 className="w-8 h-8 text-blue-500" />,
      title: "Enter My Shipment",
      description: "Provide details about your cargo, pickup location, and destination."
    },
    {
      icon: <Truck className="w-8 h-8 text-blue-500" />,
      title: "2. Choose a Provider",
      description: "Compare offers from verified transporters and select the best one."
    },
    {
      icon: <Package className="w-8 h-8 text-blue-500" />,
      title: "3. Ship",
      description: "Track your shipment in real-time until safe delivery"
    }
  ];

  return (
    <div className="w-full bg-white py-16 md:py-20 lg:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            How it works
          </h2>
          <p className="text-base md:text-lg text-gray-600">
            Three simple steps to ship your goods
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border-2 border-gray-200 p-8 text-center hover:shadow-lg hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSimple;