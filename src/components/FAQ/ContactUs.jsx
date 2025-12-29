"use client";

import React, { useState } from 'react';
import { MapPin, Mail, Phone, User, MessageSquare } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

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
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Contact Us
          </h1>
          <div className="w-24 h-1 bg-[#0066cc]"></div>
        </div>

        {/* Subtitle */}
        <div className="mb-8">
          <p className="text-[#0066cc] font-medium text-base">
            Have a question? Contact Us! We respond to all inquiries.
          </p>
        </div>

        {/* Contact Form */}
        <div className="mb-12">
          {/* Row 1: Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full pl-11 pr-4 py-3 border-b-2 border-gray-200 focus:border-[#0066cc] outline-none transition-colors text-sm text-gray-900 placeholder-gray-400"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                className="w-full pl-11 pr-4 py-3 border-b-2 border-gray-200 focus:border-[#0066cc] outline-none transition-colors text-sm text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Row 2: Phone and Subject */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number"
                className="w-full pl-11 pr-4 py-3 border-b-2 border-gray-200 focus:border-[#0066cc] outline-none transition-colors text-sm text-gray-900 placeholder-gray-400"
              />
            </div>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full pl-11 pr-4 py-3 border-b-2 border-gray-200 focus:border-[#0066cc] outline-none transition-colors text-sm text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Row 3: Message */}
          <div className="relative mb-6">
            <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message"
              rows="4"
              className="w-full pl-11 pr-4 py-3 border-b-2 border-gray-200 focus:border-[#0066cc] outline-none transition-colors text-sm text-gray-900 placeholder-gray-400 resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-[#0066cc] text-white font-semibold py-3 rounded-lg hover:bg-[#0052a3] transition-colors shadow-md"
          >
            Send
          </button>
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

export default ContactUs;