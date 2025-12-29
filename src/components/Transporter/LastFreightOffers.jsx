import React from 'react';

const LastFreightOffers = () => {
  // Sample data for freight offers
  const offers = [
    {
      id: 1,
      fromPostal: '42000',
      fromCity: 'Saint-Étienne',
      toPostal: '13016',
      toCity: 'Marseille',
      pal: 10,
      weight: '100,00',
      weightKg: '4500kg'
    },
    {
      id: 2,
      fromPostal: '42000',
      fromCity: 'Saint-Étienne',
      toPostal: '13016',
      toCity: 'Marseille',
      pal: 10,
      weight: '100,00',
      weightKg: '4500kg'
    },
    {
      id: 3,
      fromPostal: '42000',
      fromCity: 'Saint-Étienne',
      toPostal: '13016',
      toCity: 'Marseille',
      pal: 10,
      weight: '120,00',
      weightKg: '4500kg'
    },
    {
      id: 4,
      fromPostal: '42000',
      fromCity: 'Saint-Étienne',
      toPostal: '13016',
      toCity: 'Marseille',
      pal: 10,
      weight: '120,00',
      weightKg: '4500kg'
    },
    {
      id: 5,
      fromPostal: '42000',
      fromCity: 'Saint-Étienne',
      toPostal: '13016',
      toCity: 'Marseille',
      pal: 10,
      weight: '120,00',
      weightKg: '4500kg'
    },
    {
      id: 6,
      fromPostal: '42000',
      fromCity: 'Saint-Étienne',
      toPostal: '13016',
      toCity: 'Marseille',
      pal: 10,
      weight: '120,00',
      weightKg: '4500kg'
    }
  ];

  return (
    <div className="w-full bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
          Last Freight Offers
        </h2>
        {/* Offers List */}
        <div className="space-y-4">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row items-center justify-between gap-4"
            >
              {/* Left Section - Locations */}
              <div className="flex items-center gap-3 flex-1">
                {/* From Location */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-8 flex items-center justify-center">
                    <svg className="w-6 h-8" viewBox="0 0 24 32">
                      <rect x="8" y="0" width="8" height="3" fill="#002395"/>
                      <rect x="0" y="0" width="8" height="3" fill="#002395"/>
                      <rect x="16" y="0" width="8" height="3" fill="#ED2939"/>
                      <rect x="8" y="3" width="8" height="26" fill="white"/>
                      <rect x="0" y="3" width="8" height="26" fill="#002395"/>
                      <rect x="16" y="3" width="8" height="26" fill="#ED2939"/>   
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">
                      {offer.fromPostal} {offer.fromCity}
                    </div>
                  </div>
                </div>

                {/* Arrow/Separator */}
                <div className="hidden md:block text-gray-400 px-2">→</div>
                {/* To Location */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-8 flex items-center justify-center">
                    <svg className="w-6 h-8" viewBox="0 0 24 32">
                      <rect x="8" y="0" width="8" height="3" fill="#002395"/>
                      <rect x="0" y="0" width="8" height="3" fill="#002395"/>
                      <rect x="16" y="0" width="8" height="3" fill="#ED2939"/>
                      <rect x="8" y="3" width="8" height="26" fill="white"/>
                      <rect x="0" y="3" width="8" height="26" fill="#002395"/>
                      <rect x="16" y="3" width="8" height="26" fill="#ED2939"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">
                      {offer.toPostal} {offer.toCity}
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Section - Details */}
              <div className="flex items-center gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-1">
                  <span className="font-medium">{offer.pal} pal</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-medium">{offer.weight}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-medium">{offer.weightKg}</span>
                </div>
              </div>

              {/* Right Section - Button */}
              <div>
                <button className="bg-[#0066cc] hover:bg-[#0052a3] text-white font-semibold px-6 py-2 rounded-full transition-colors duration-200 text-sm whitespace-nowrap">
                  257
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LastFreightOffers;
