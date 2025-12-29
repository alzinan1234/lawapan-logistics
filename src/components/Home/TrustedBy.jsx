import React from 'react';

const TrustedBy = () => {
  // You can replace these with actual logo images
  const logos = [
    { id: 1, name: "Company 1", image: "./trusted-seller-logo.webp" },
    { id: 2, name: "Company 2", image: "./trusted-seller-logo.webp" },
    { id: 3, name: "Company 3", image: "./trusted-seller-logo.webp" },
    { id: 4, name: "Company 4", image: "./trusted-seller-logo.webp" },
    { id: 5, name: "Company 5", image: "./trusted-seller-logo.webp" },
  ];

  return (
    <div className="w-full bg-[#676767] py-12 md:py-16 lg:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Trusted By
          </h2>
          <p className="text-sm md:text-base text-gray-200 max-w-3xl mx-auto">
            Trusted by leading businesses who rely on us for fast, secure, and reliable transport solutions.
          </p>
        </div>

        {/* Logo Grid */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 lg:gap-8">
          {logos.map((logo) => (
            <div
              key={logo.id}
              className="bg-white rounded-xl p-6 md:p-8 w-32 h-20 md:w-50 md:h-29 flex items-center justify-center hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <img
                src={logo.image}
                alt={logo.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustedBy;

