import React from 'react';
import { MapPin, Truck, Banknote, TrendingUp } from 'lucide-react';

const TransporterAdvantages = () => {
  const advantages = [
    {
      id: 1,
      icon: MapPin,
      title: 'Free Geolocation',
      description: 'Track all your drivers for free with our GPS system'
    },
    {
      id: 2,
      icon: Truck,
      title: 'Free Freight Offers',
      description: 'Receive freight offers around you at no cost'
    },
    {
      id: 3,
      icon: Banknote,
      title: 'Quick Payment',
      description: 'Get paid quickly after successful delivery'
    },
    {
      id: 4,
      icon: TrendingUp,
      title: 'More Opportunities',
      description: 'Receive offers even during shortage periods'
    }
  ];

  return (
    <div className="w-full bg-gray-100 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Transporter Advantages
          </h2>
          <p className="text-gray-600 text-sm">
            Everything you need to grow your business
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {advantages.map((advantage) => {
            const IconComponent = advantage.icon;
            return (
              <div
                key={advantage.id}
                className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-2xl p-8 hover:border-blue-300 transition-all duration-300 hover:shadow-lg"
              >
                {/* Icon */}
                <div className="mb-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-blue-200">
                    <IconComponent className="w-6 h-6 text-[#0066cc]" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {advantage.title}
                </h3>

                {/* Description */}
                <p className="text-gray-700 text-sm leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TransporterAdvantages;
