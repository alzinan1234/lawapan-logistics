import React from 'react';
import { Edit3, Truck, MapPin } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Edit3 className="w-8 h-8 text-blue-600" />,
      title: "ENTER DETAILS",
      points: [
        "Provide your shipment details, pickup and delivery location.",
        "Describe the goods, add photos, and set your preferred dates.",
        "Tell us what you want to ship, where it's going, and when."
      ]
    },
    {
      icon: <Truck className="w-8 h-8 text-blue-600" />,
      title: "Get a Truck",
      points: [
        "Receive instant bids from trusted transport providers.",
        "We match your request with verified transporters in real time.",
        "Choose the best offer based on price, rating, and delivery time."
      ]
    },
    {
      icon: <MapPin className="w-8 h-8 text-blue-600" />,
      title: "Track Delivery",
      points: [
        "Track your shipment live until it reaches your destination.",
        "Stay updated at every step with real-time notifications.",
        "Monitor your delivery from pickup to drop-off, all in one place."
      ]
    }
  ];

  return (
    <div className="w-full bg-gray-50 py-16 md:py-20 lg:py-24 px-4 ">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            How it works
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Discover the simplicity and reliability of renting our quality trucks through our streamlined process. 
            Effortlessly book and confirm your selected vehicle online for a smooth and dependable experience
          </p>
        </div> 

         

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border-2 border-blue-200 p-8 hover:shadow-xl hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                {step.title}
              </h3>

              {/* Points List */}
              <ul className="space-y-4">
                {step.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;