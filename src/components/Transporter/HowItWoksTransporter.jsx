import React from 'react';
import { Truck, Bell, CreditCard } from 'lucide-react';

const HowItWorksTransporter = () => {
  const steps = [
    {
      id: 1,
      icon: Truck,
      title: '1. Register My Truck',
      description: 'Create an account and add your trucks to the platform'
    },
    {
      id: 2,
      icon: Bell,
      title: '2. Receive Freight Offers',
      description: 'Get notified of shipping requests matching your trucks'
    },
    {
      id: 3,
      icon: CreditCard,
      title: '3. Transport & Get Paid',
      description: 'Complete the delivery and receive payment quickly'
    }
  ];

  return (
    <div className="w-full bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            How it works
          </h2>
          <p className="text-gray-600 text-base">
            Three simple steps to start earning
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.id}
                className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-blue-300 transition-colors duration-300 hover:shadow-lg"
              >
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-[#0066cc]" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 text-center mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm text-center leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <button className="px-8 py-3 bg-white text-[#0066cc] font-semibold rounded-full border-2 border-[#0066cc] hover:bg-blue-50 transition-colors duration-300 shadow-sm">
            Register my truck now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksTransporter;