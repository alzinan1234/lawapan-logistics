// components/SignUpForm.js
"use client";
import { User, Truck } from 'lucide-react';

import Link from 'next/link';
import { useState } from 'react';

export default function SignUpForm() {
  const [role, setRole] = useState('shipper');
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    country: 'Benin',
    password: '',
    confirmPassword: '',
    numberOfTrucks: '',
    truckTypes: [],
    companyLogo: null
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTruckOptions, setShowTruckOptions] = useState(false);

  const truckTypeOptions = [
    { id: 'tractorhead', label: 'Tractorhead (566)', value: 'tractorhead', count: 566 },
    { id: 'truck', label: 'Truck (690)', value: 'truck', count: 690 },
    { id: 'light-commercial', label: 'Light commercial vehicle (970)', value: 'light-commercial', count: 970 },
    { id: 'construction', label: 'Construction equipment (371)', value: 'construction', count: 371 },
    { id: 'semi-trailer', label: 'Semi-trailer (285)', value: 'semi-trailer', count: 285 },
    { id: 'trailer', label: 'Trailer (43)', value: 'trailer', count: 43 },
  ];

  const countries = ['Benin', 'Nigeria', 'Ghana', 'Togo', 'Ivory Coast'];

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'shipper') {
      setFormData(prev => ({
        ...prev,
        numberOfTrucks: '',
        truckTypes: [],
        companyLogo: null
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
      value = '+' + value;
      if (value.length > 3) value = value.slice(0, 3) + ' ' + value.slice(3);
      if (value.length > 7) value = value.slice(0, 7) + ' ' + value.slice(7);
      if (value.length > 10) value = value.slice(0, 10) + ' ' + value.slice(10);
      if (value.length > 13) value = value.slice(0, 13) + ' ' + value.slice(13);
    }
    setFormData(prev => ({ ...prev, phone: value }));
  };

  const handleTruckTypeToggle = (truckType) => {
    setFormData(prev => {
      const currentTypes = [...prev.truckTypes];
      if (currentTypes.includes(truckType)) {
        return { ...prev, truckTypes: currentTypes.filter(type => type !== truckType) };
      } else {
        return { ...prev, truckTypes: [...currentTypes, truckType] };
      }
    });
    setShowTruckOptions(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, companyLogo: 'File size must be less than 5MB' }));
        return;
      }
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, companyLogo: 'Please upload an image file' }));
        return;
      }
      setFormData(prev => ({ ...prev, companyLogo: file }));  
      setErrors(prev => ({ ...prev, companyLogo: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (role === 'transporter') {
      if (!formData.numberOfTrucks) {
        newErrors.numberOfTrucks = 'Please enter number of trucks';
      }

      if (formData.truckTypes.length === 0) {
        newErrors.truckTypes = 'Please select at least one truck type';
      }
    }
    
    if (!agreeToTerms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Form submitted:', { ...formData, role });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert(`Account created successfully! Welcome ${formData.companyName}`);
      
      setFormData({
        companyName: '',
        email: '',
        phone: '',
        country: 'Benin',
        password: '',
        confirmPassword: '',
        numberOfTrucks: '',
        truckTypes: [],
        companyLogo: null
      });
      setAgreeToTerms(false);
      setErrors({});
      
    } catch (error) {
      alert('Error creating account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* Header */}
      {/* <div className="w-full max-w-md text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
        <p className="text-gray-600">Join thousands of businesses and transporters</p>
      </div> */}

      {/* Main Form Container */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6">
          <div className="">
        {/* Placeholder for the logo image. Replace './login-logo (2).png' with the actual path. 
            I've added a width/max-width to resemble the size in the image. */}
        <img 
          src="./login-logo (2).png" 
          alt="LAWANPAN TRUCK Logo" 
          className="max-w-xs w-28 md:w-36 lg:w-40 mx-auto" 
        />
        {/*  - Not triggered as the user provides the logo */}
      </div>
            <div className="w-full max-w-md text-center mb-8  mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
        <p className="text-gray-600">Join thousands of businesses and transporters</p>
      </div>
        {/* Role Selection */}
       <div className="mb-8">
  <div className="flex flex-col sm:flex-row gap-4 mb-4">
    {/* Shipper Button */}
    <button
      type="button"
      onClick={() => handleRoleChange('shipper')}
      className={`flex-1 p-6 rounded-xl border-2 text-center transition-all duration-200 ${
        role === 'shipper' 
        ? 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-500' 
        : 'border-gray-100 bg-gray-50 text-gray-700 hover:border-gray-200'
      }`}
    >
      <div className="flex flex-col items-center gap-3">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${
          role === 'shipper' ? 'bg-white border-blue-200 shadow-sm' : 'bg-white border-gray-200'
        }`}>
          <User className={`w-6 h-6 ${role === 'shipper' ? 'text-blue-600' : 'text-gray-400'}`} />
        </div>
        <div>
          <div className={`font-bold text-lg ${role === 'shipper' ? 'text-gray-900' : 'text-gray-600'}`}>I'm a shipper</div>
          <div className="text-xs text-gray-500 mt-1">I need to ship goods</div>
        </div>
      </div>
    </button>
    
    {/* Transporter Button */}
    <button
      type="button"
      onClick={() => handleRoleChange('transporter')}
      className={`flex-1 p-6 rounded-xl border-2 text-center transition-all duration-200 ${
        role === 'transporter' 
        ? 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-500' 
        : 'border-gray-100 bg-gray-50 text-gray-700 hover:border-gray-200'
      }`}
    >
      <div className="flex flex-col items-center gap-3">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${
          role === 'transporter' ? 'bg-white border-blue-200 shadow-sm' : 'bg-white border-gray-200'
        }`}>
          <Truck className={`w-6 h-6 ${role === 'transporter' ? 'text-blue-600' : 'text-gray-400'}`} />
        </div>
        <div>
          <div className={`font-bold text-lg ${role === 'transporter' ? 'text-gray-900' : 'text-gray-600'}`}>I'm a Transporter</div>
          <div className="text-xs text-gray-500 mt-1">I have trucks to offer</div>
        </div>
      </div>
    </button>
  </div>
  
  <div className="h-px bg-gray-100 mt-6"></div>
</div>
        {/* Form Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {role === 'transporter' ? 'Company Details' : 'Basic information'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {role === 'transporter' ? 'Transport company name' : 'Company name'}
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter company name"
            />
            {errors.companyName && (
              <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your email address"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
            {/* */}
          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+226 XX XX XX XX"
              maxLength="16"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country
            </label>
            <div className="relative">
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Transporter Specific Fields */}

          {role === 'transporter' && (
            <>
              {/* Number of Trucks */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Trucks
                </label>
                <input
                  type="number"
                  name="numberOfTrucks"
                  value={formData.numberOfTrucks}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your total truck number"
                  min="0"
                />
                {errors.numberOfTrucks && (
                  <p className="mt-1 text-sm text-red-600">{errors.numberOfTrucks}</p>
                )}
              </div>

              {/* Truck Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Truck Type
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowTruckOptions(!showTruckOptions)}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.truckTypes ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left flex justify-between items-center ${formData.truckTypes.length > 0 ? 'text-gray-900' : 'text-gray-500'}`}
                  >
                    <span>
                      {formData.truckTypes.length > 0 
                        ? `${formData.truckTypes.length} type(s) selected`
                        : 'Select truck type'
                      }
                    </span>
                    <svg className={`w-5 h-5 text-gray-400 transition-transform ${showTruckOptions ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showTruckOptions && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {truckTypeOptions.map(option => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => handleTruckTypeToggle(option.value)}
                          className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex justify-between items-center ${formData.truckTypes.includes(option.value) ? 'bg-blue-50 text-blue-700' : ''}`}
                        >
                          <span>{option.label}</span>
                          {formData.truckTypes.includes(option.value) && (
                            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {errors.truckTypes && (
                  <p className="mt-1 text-sm text-red-600">{errors.truckTypes}</p>
                )}
                
                {/* Selected Truck Types Preview */}
                {formData.truckTypes.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.truckTypes.map(type => {
                      const option = truckTypeOptions.find(opt => opt.value === type);
                      return (
                        <span key={type} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                          {option.label.split(' (')[0]}
                          <button
                            type="button"
                            onClick={() => handleTruckTypeToggle(type)}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            ×
                          </button>
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
              {/* Company Logo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Logo (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id="companyLogo"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <label htmlFor="companyLogo" className="cursor-pointer">
                    <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <div className="text-gray-600 font-medium">Upload</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {formData.companyLogo ? formData.companyLogo.name : 'Click to upload your logo'}
                    </div>
                  </label>
                </div>
                {errors.companyLogo && (
                  <p className="mt-1 text-sm text-red-600">{errors.companyLogo}</p>
                )}
              </div>
            </>
          )}
          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Minimum 6 characters"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>
          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Re-enter your password"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-4">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                I have read and I accept the{' '}
                <a href="#" className="text-blue-600 hover:underline font-medium">
                  general terms and conditions
                </a>.
              </label>
            </div>
            <div className="flex items-start">
              <input
                type="checkbox"
                id="professional"
                checked={agreeToTerms}
                readOnly
                className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="professional" className="ml-2 text-sm text-gray-700">
                I understood the <span className="font-medium">Lawapan Truck</span> was a service dedicated to professionals.
              </label>
            </div>
            
            {errors.terms && (
              <p className="text-sm text-red-600">{errors.terms}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {isSubmitting ? 'Creating...' : 'Create'}
          </button>

          {/* Login Link */}
          <div className="text-center pt-4">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 hover:underline font-medium">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}