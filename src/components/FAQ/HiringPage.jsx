import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';

const HiringPage = () => {
  const contactInfo = [
    {
      id: 1,
      icon: MapPin,
      title: 'LAWAPAN',
      description: 'Tour EMBLEM, 92400'
    },
    {
      id: 2,
      icon: Mail,
      title: '@gmail.com',
      description: ''
    },
    {
      id: 3,
      icon: Phone,
      title: '0179711139',
      description: ''
    }
  ];

  return (
    <div className="w-full bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Lawapantruck is hiring
          </h1>
          <div className="w-32 h-1 bg-[#0066cc]"></div>
        </div>

        {/* Subtitle */}
        <div className="mb-6">
          <h2 className="text-[#0066cc] font-medium text-lg">
            We are currently looking for :
          </h2>
        </div>

        {/* Message Box */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
          <p className="text-gray-600 text-sm leading-relaxed">
            Thank you for your interest in joining the Lawapantruck team. We do not have any job vacancies at this time, but we encourage you to stay tuned for future openings!
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mb-10">
          <h2 className="text-[#0066cc] font-medium text-lg mb-4">
            FAQ :
          </h2>
          
          {/* FAQ Items */}
          <div className="space-y-2">
            {[1, 2, 3, 4].map((item) => (
              <details key={item} className="group">
                <summary className="flex items-center justify-between cursor-pointer bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[#0066cc] rounded flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium text-sm">
                      Are there any condition for registration?
                    </span>
                  </div>
                  <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                {item === 1 && (
                  <div className="px-4 py-3 bg-gray-50 border-x border-b border-gray-200 rounded-b-lg">
                    <p className="text-gray-600 text-sm">
                      No conditions apply to shippers; you simply need to be a company registered with the RCS (French Trade and Companies Register). Chronotruck handles your shipments throughout mainland France, excluding Corsica and overseas territories.
                    </p>
                  </div>
                )}
              </details>
            ))}
          </div>
        </div>

        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactInfo.map((contact) => {
            const IconComponent = contact.icon;
            return (
              <div
                key={contact.id}
                className="bg-gray-50 rounded-lg p-8 flex flex-col items-center text-center hover:bg-gray-100 transition-colors"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-[#0066cc] rounded-full flex items-center justify-center mb-4">
                  <IconComponent className="w-7 h-7 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-gray-900 font-semibold text-base mb-1">
                  {contact.title}
                </h3>

                {/* Description */}
                {contact.description && (
                  <p className="text-gray-600 text-sm">
                    {contact.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HiringPage;