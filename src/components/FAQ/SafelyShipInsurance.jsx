"use client";
import React, { useState } from 'react';
import { MapPin, Mail, Phone, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';

const SafelyShipInsurance = () => {
  const [openQuestionId, setOpenQuestionId] = useState(null);

  const faqData = [
    {
      id: 1,
      question: 'Are there any condition for registration?',
      answer: 'No conditions apply to shippers: you simply need to be a company registered with the RCS (French Trade and Companies Register). Chronotruck handles your shipments throughout mainland France, excluding Corsica and overseas territories.'
    },
    {
      id: 2,
      question: 'Are there any condition for registration?',
      answer: 'No conditions apply to shippers: you simply need to be a company registered with the RCS (French Trade and Companies Register).'
    },
    {
      id: 3,
      question: 'Are there any condition for registration?',
      answer: 'No conditions apply to shippers: you simply need to be a company registered with the RCS (French Trade and Companies Register).'
    },
    {
      id: 4,
      question: 'Are there any condition for registration?',
      answer: 'No conditions apply to shippers: you simply need to be a company registered with the RCS (French Trade and Companies Register).'
    }
  ];

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

  const toggleQuestion = (id) => {
    setOpenQuestionId(openQuestionId === id ? null : id);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full h-screen  bg-center bg-no-repeat bg-cover " style={{
        backgroundImage: "url('/trac-image.png')",
        width: '100%',
      }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Content - Positioned to the left */}
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
                Safely ship
              </h1>
              <p className="text-white/95 text-lg md:text-xl leading-relaxed drop-shadow-md max-w-md">
                Chronotruck and AXA guarantee your commodities up to €50,000 per shipment, on demand
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hiring Section */}
          <div className="mb-16">
            <div className="mb-6">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Lawapantruck is hiring
              </h2>
              <div className="w-40 h-1.5 bg-[#0066cc]"></div>
            </div>

            <div className="mb-6">
              <h3 className="text-[#0066cc] font-medium text-base mb-4">
                We are currently looking for :
              </h3>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
              <p className="text-gray-600 text-base leading-relaxed">
                Thank you for your interest in joining the Lawapantruck team. We do not have any job vacancies at this time, but we encourage you to stay tuned for future openings!
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h3 className="text-[#0066cc] font-medium text-base mb-8">
              FAQ :
            </h3>

            <div className="space-y-0">
              {faqData.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-gray-200"
                >
                  <button
                    onClick={() => toggleQuestion(item.id)}
                    className="w-full flex items-center justify-between gap-4 text-left group py-5 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <MessageSquare className="w-5 h-5 text-[#0066cc] flex-shrink-0" />
                      <span className="text-gray-900 text-base font-normal">
                        {item.question}
                      </span>
                    </div>
                    <div className="flex-shrink-0 w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
                      {openQuestionId === item.id ? (
                        <ChevronUp className="w-4 h-4 text-white" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </button>

                  {openQuestionId === item.id && (
                    <div className="pb-5 pl-12 pr-4 text-gray-600 text-base leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((contact) => {
              const IconComponent = contact.icon;
              return (
                <div
                  key={contact.id}
                  className="bg-gray-50 rounded-lg p-8 flex flex-col items-center text-center hover:bg-gray-100 transition-colors"
                >
                  <div className="w-16 h-16 bg-[#0066cc] rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-gray-900 font-semibold text-lg mb-2">
                    {contact.title}
                  </h3>
                  {contact.description && (
                    <p className="text-gray-600 text-base">
                      {contact.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafelyShipInsurance;