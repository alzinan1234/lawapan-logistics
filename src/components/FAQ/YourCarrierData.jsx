import React from 'react';

const YourCarrierData = () => {
  const dataUsage = [
    'To perform the most accurate addressing of offers you are interested in, depending on your geolocation or your habits, or your operational bases',
    'To track shipments, step by step, for our common customers',
    'To Thanks to this data, customers are more satisfied and you increase your turnover'
  ];

  const dataProtection = [
    'To You enter exactly the same information into your Transport Management System every day',
    '...but with our mobile app, your Transport Management System is in your pocket',
    'Your geolocation data is only used when you are connected: "available" status to receive offers or when you are completing a mission for us'
  ];

  return (
    <div className="w-full bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Your Carrier Data
          </h1>
          <div className="w-32 h-1 bg-[#0066cc]"></div>
        </div>

        {/* First Section */}
        <div className="mb-10">
          <h2 className="text-[#0066cc] font-medium text-lg mb-4">
            The data used helps us to provide better services to you every day
          </h2>
          <ul className="space-y-3">
            {dataUsage.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-700 text-sm">
                <span className="text-gray-400 mt-1">•</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Second Section */}
        <div>
          <h2 className="text-[#0066cc] font-medium text-lg mb-4">
            We only use the data which relates to our customers
          </h2>
          <ul className="space-y-3">
            {dataProtection.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-700 text-sm">
                <span className="text-gray-400 mt-1">•</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default YourCarrierData;