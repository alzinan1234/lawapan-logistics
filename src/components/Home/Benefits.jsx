"use client";
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const BenefitsSection = () => {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="w-full bg-gray-100 py-16 md:py-20 lg:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div 
          className="text-center mb-12 md:mb-16"
          data-aos="fade-down"
          data-aos-delay="100"
        >
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
          <div 
            className="group bg-white rounded-3xl border-2 border-blue-200 p-8 hover:shadow-xl hover:border-blue-300 transition-all duration-500 hover:-translate-y-2"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            {/* Illustration */}
            <div 
              className="w-full h-48 mb-6 bg-blue-50 rounded-2xl overflow-hidden group-hover:shadow-lg transition-shadow duration-300"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <img 
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800&auto=format&fit=crop" 
                alt="Business professionals"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Title */}
            <h3 
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 transition-colors duration-300"
              data-aos="fade-up"
              data-aos-delay="350"
            >
              For Businesses
            </h3>

            {/* Benefits List */}
            <ul className="space-y-4">
              {[
                { text: <><strong>Save time–</strong> ship in just 3 clicks</> },
                { text: <><strong>Reliable Trucks–</strong> Lawapan finds a reliable truck in real time</> },
                { text: <><strong>Track Everything–</strong> Track every step online, from quote to delivery</> },
                { text: <><strong>Insured Shipments–</strong> Cargo insurance up to 10,000,000 FCFA</> }
              ].map((item, idx) => (
                <li 
                  key={idx}
                  className="flex items-start gap-3 group-hover:translate-x-1 transition-transform duration-300"
                  data-aos="fade-up"
                  data-aos-delay={400 + (idx * 100)}
                >
                  <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0 transition-colors duration-300"></span>
                  <span className="text-gray-700 text-sm md:text-base">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* For Transporters Card */}
          <div 
            className="group bg-white rounded-3xl border-2 border-blue-200 p-8 hover:shadow-xl hover:border-blue-300 transition-all duration-500 hover:-translate-y-2"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            {/* Illustration */}
            <div 
              className="w-full h-48 mb-6 bg-purple-50 rounded-2xl overflow-hidden group-hover:shadow-lg transition-shadow duration-300"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop" 
                alt="Delivery truck and workers"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Title */}
            <h3 
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 transition-colors duration-300"
              data-aos="fade-up"
              data-aos-delay="350"
            >
              For Transporters
            </h3>

            {/* Benefits List */}
            <ul className="space-y-4">
              {[
                { text: <><strong>Free Geolocation–</strong> Geolocate your drivers for free</> },
                { text: <><strong>Free Freight Offers–</strong> Receive offers around you at no cost</> },
                { text: <><strong>Quick Payment–</strong> Get paid quickly after delivery</> },
                { text: <><strong>More Opportunities–</strong> Get paid quickly after delivery</> }
              ].map((item, idx) => (
                <li 
                  key={idx}
                  className="flex items-start gap-3 group-hover:translate-x-1 transition-transform duration-300"
                  data-aos="fade-up"
                  data-aos-delay={400 + (idx * 100)}
                >
                  <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0 transition-colors duration-300"></span>
                  <span className="text-gray-700 text-sm md:text-base">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Remove the inline styles since we're using AOS */}
    </div>
  );
};

export default BenefitsSection;