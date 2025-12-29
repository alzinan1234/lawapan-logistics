"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';

const FAQSection = () => {
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
      answer: 'No conditions apply to shippers: you simply need to be a company registered with the RCS (French Trade and Companies Register). Chronotruck handles your shipments throughout mainland France, excluding Corsica and overseas territories.'
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
    },
    {
      id: 5,
      question: 'Are there any condition for registration?',
      answer: 'No conditions apply to shippers: you simply need to be a company registered with the RCS (French Trade and Companies Register).'
    },
    {
      id: 6,
      question: 'Are there any condition for registration?',
      answer: 'No conditions apply to shippers: you simply need to be a company registered with the RCS (French Trade and Companies Register).'
    },
    {
      id: 7,
      question: 'Are there any condition for registration?',
      answer: 'No conditions apply to shippers: you simply need to be a company registered with the RCS (French Trade and Companies Register).'
    },
    {
      id: 8,
      question: 'Are there any condition for registration?',
      answer: 'No conditions apply to shippers: you simply need to be a company registered with the RCS (French Trade and Companies Register).'
    }
  ];

  const toggleQuestion = (id) => {
    setOpenQuestionId(openQuestionId === id ? null : id);
  };

  return (
    <div className="w-full bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1 bg-[#0066cc]"></div>
        </div>

        {/* Section Title */}
        <div className="mb-6">
          <h3 className="text-[#0066cc] font-medium text-base">
            Shipper FAQ :
          </h3>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-0">
          {faqData.map((item) => (
            <div
              key={item.id}
              className="border-b border-gray-200"
            >
              {/* Question */}
              <button
                onClick={() => toggleQuestion(item.id)}
                className="w-full flex items-center justify-between gap-4 text-left group py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <MessageSquare className="w-5 h-5 text-[#0066cc] flex-shrink-0" />
                  <span className="text-gray-900 text-sm font-normal">
                    {item.question}
                  </span>
                </div>
                <div className="flex-shrink-0 w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
                  {openQuestionId === item.id ? (
                    <ChevronUp className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-white" />
                  )}
                </div>
              </button>

              {/* Answer */}
              {openQuestionId === item.id && (
                <div className="pb-4 pl-11 pr-4 text-gray-600 text-sm leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;