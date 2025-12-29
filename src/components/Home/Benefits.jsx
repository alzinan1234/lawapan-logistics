import React from 'react';

const BenefitsSection = () => {
  return (
    <div className="w-full bg-gray-100 py-16 md:py-20 lg:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Benefits of Using Lawapan Truck
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Discover the simplicity and reliability of renting our quality trucks through our streamlined process. 
            Effortlessly book and confirm your selected vehicle online for a smooth and dependable experience
          </p>
        </div>

        {/* Benefits Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          
          {/* For Businesses Card */}
          <div className="bg-white rounded-3xl border-2 border-blue-200 p-8 hover:shadow-xl hover:border-blue-300 transition-all duration-300">
            {/* Illustration */}
            <div className="w-full h-48 mb-6 bg-blue-50 rounded-2xl flex items-center justify-center overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800&auto=format&fit=crop" 
                alt="Business professionals"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              For Businesses
            </h3>

            {/* Benefits List */}
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-gray-700 text-sm md:text-base">
                  <strong>Save time–</strong> ship in just 3 clicks
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-gray-700 text-sm md:text-base">
                  <strong>Reliable Trucks–</strong> Lawapan finds a reliable truck in real time
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-gray-700 text-sm md:text-base">
                  <strong>Track Everything–</strong> Track every step online, from quote to delivery
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-gray-700 text-sm md:text-base">
                  <strong>Insured Shipments–</strong> Cargo insurance up to 10,000,000 FCFA
                </span>
              </li>
            </ul>
          </div>

          {/* For Transporters Card */}
          <div className="bg-white rounded-3xl border-2 border-blue-200 p-8 hover:shadow-xl hover:border-blue-300 transition-all duration-300">
            {/* Illustration */}
            <div className="w-full h-48 mb-6 bg-purple-50 rounded-2xl flex items-center justify-center overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop" 
                alt="Delivery truck and workers"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              For Transporters
            </h3>

            {/* Benefits List */}
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-gray-700 text-sm md:text-base">
                  <strong>Free Geolocation–</strong> Geolocate your drivers for free
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-gray-700 text-sm md:text-base">
                  <strong>Free Freight Offers–</strong> Receive offers around you at no cost
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-gray-700 text-sm md:text-base">
                  <strong>Quick Payment–</strong> Get paid quickly after delivery
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-gray-700 text-sm md:text-base">
                  <strong>More Opportunities–</strong> Get paid quickly after delivery
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;