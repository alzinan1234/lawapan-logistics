"use client";
import React, { useState } from 'react';
import { User, Truck, Package, DollarSign, Users, ArrowRight, Upload, Eye, EyeOff, LogOut } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInRole, setLoggedInRole] = useState(null);
  const [companyName, setCompanyName] = useState('');

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberPassword: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Login Handler
  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value 
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateLoginForm = () => {
    const newErrors = {};
    if (!loginData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!loginData.password) {
      newErrors.password = 'Password is required';
    } else if (loginData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleLogin = () => {
    const newErrors = validateLoginForm();
    if (Object.keys(newErrors).length === 0) {
      // Detect role from email
      if (loginData.email.includes('shipper')) {
        setLoggedInRole('shipper');
      } else if (loginData.email.includes('transporter')) {
        setLoggedInRole('transporter');
      } else {
        setLoggedInRole('shipper');
      }
      setCompanyName(loginData.email.split('@')[0]);
      setIsLoggedIn(true);
      setCurrentPage('onboarding');
    } else {
      setErrors(newErrors);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('login');
    setLoggedInRole(null);
    setLoginData({ email: '', password: '', rememberPassword: false });
  };

  // If logged in, show onboarding or dashboard
  if (isLoggedIn) {
    if (loggedInRole === 'shipper') {
      return <ShipperOnboarding companyName={companyName} onLogout={handleLogout} />;
    } else {
      return <TransporterOnboarding companyName={companyName} onLogout={handleLogout} />;
    }
  }

  // Login Page
  if (currentPage === 'login') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-8 md:p-10">
          <div className="mb-8">
            <img 
              src="/login-logo (2).png" 
              alt="LAWANPAN TRUCK Logo" 
              className="max-w-xs w-28 md:w-36 lg:w-40 mx-auto" 
            />
          </div>
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-3">
            Login to Account
          </h2>
          <p className="text-center text-gray-500 text-sm mb-8"> 
            Please enter your email and password to continue
          </p>

          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                className={`w-full px-4 py-3 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition text-black`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  className={`w-full px-4 py-3 border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition pr-12 text-black`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberPassword"
                  checked={loginData.rememberPassword}
                  onChange={handleLoginChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                />
                <span className="ml-2 text-sm text-gray-700">Remember Password</span>
              </label>
              <button
                type="button"
                className="text-sm text-red-500 hover:text-red-600 transition font-medium"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
              style={{backgroundColor: '#036BB4'}}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#025191'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#036BB4'}
            >
              Log In
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have account?{' '}
            <button
              onClick={() => setCurrentPage('signup')}
              className="text-[#036BB4] hover:text-blue-800 font-medium transition"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    );
  }

  // Sign Up Page
  if (currentPage === 'signup') {
    return <SignUpForm onBackToLogin={() => setCurrentPage('login')} />;
  }

  return null;
}

// Original SignUp Form Component
function SignUpForm({ onBackToLogin }) {
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
    { id: 'tractorhead', label: 'Tractorhead (566)', value: 'tractorhead', count: 566, icon: Truck },
    { id: 'truck', label: 'Truck (690)', value: 'truck', count: 690, icon: Truck },
    { id: 'light-commercial', label: 'Light commercial vehicle (970)', value: 'light-commercial', count: 970, icon: Package },
    { id: 'construction', label: 'Construction equipment (371)', value: 'construction', count: 371, icon: Package },
    { id: 'semi-trailer', label: 'Semi-trailer (285)', value: 'semi-trailer', count: 285, icon: Package },
    { id: 'trailer', label: 'Trailer (43)', value: 'trailer', count: 43, icon: Package },
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
      onBackToLogin();
    } catch (error) {
      alert('Error creating account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6">
        <div className="">
          <img 
            src="/login-logo (2).png" 
            alt="LAWANPAN TRUCK Logo" 
            className="max-w-xs w-28 md:w-36 lg:w-40 mx-auto" 
          />
        </div>
        <div className="w-full max-w-md text-center mb-8 mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join thousands of businesses and transporters</p>
        </div>

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
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

        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {role === 'transporter' ? 'Company Details' : 'Basic information'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {role === 'transporter' ? 'Transport company name' : 'Company name'}
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              placeholder="Enter company name"
            />
            {errors.companyName && (
              <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              placeholder="Your email address"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              placeholder="+226 XX XX XX XX"
              maxLength="16"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
            <div className="relative">
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-black"
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

          {role === 'transporter' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Trucks</label>
                <input
                  type="number"
                  name="numberOfTrucks"
                  value={formData.numberOfTrucks}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="Enter your total truck number"
                  min="0"
                />
                {errors.numberOfTrucks && (
                  <p className="mt-1 text-sm text-red-600">{errors.numberOfTrucks}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Truck Type</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowTruckOptions(!showTruckOptions)}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.truckTypes ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left flex justify-between items-center text-black ${formData.truckTypes.length > 0 ? 'text-black' : 'text-gray-500'}`}
                  >
                    <div className="flex items-center gap-2">
                      <Truck className="w-5 h-5" />
                      <span>
                        {formData.truckTypes.length > 0 
                          ? `${formData.truckTypes.length} type(s) selected`
                          : 'Select truck type'
                        }
                      </span>
                    </div>
                    <svg className={`w-5 h-5 text-gray-400 transition-transform ${showTruckOptions ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showTruckOptions && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {truckTypeOptions.map(option => {
                        const IconComponent = option.icon;
                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => handleTruckTypeToggle(option.value)}
                            className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex justify-between items-center text-black ${formData.truckTypes.includes(option.value) ? 'bg-blue-50 text-blue-700' : ''}`}
                          >
                            <div className="flex items-center gap-3">
                              <IconComponent className="w-5 h-5 text-gray-600" />
                              <span>{option.label}</span>
                            </div>
                            {formData.truckTypes.includes(option.value) && (
                              <svg className="w-5 h-5 text-[#036BB4]" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
                {errors.truckTypes && (
                  <p className="mt-1 text-sm text-red-600">{errors.truckTypes}</p>
                )}
                
                {formData.truckTypes.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.truckTypes.map(type => {
                      const option = truckTypeOptions.find(opt => opt.value === type);
                      const IconComponent = option.icon;
                      return (
                        <span key={type} className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                          <IconComponent className="w-4 h-4" />
                          {option.label.split(' (')[0]}
                          <button
                            type="button"
                            onClick={() => handleTruckTypeToggle(type)}
                            className="ml-1 text-blue-600 hover:text-blue-800"
                          >
                            ×
                          </button>
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Logo (Optional)</label>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              placeholder="Minimum 6 characters"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              placeholder="Re-enter your password"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

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
                <a href="#" className="text-[#036BB4] hover:underline font-medium">
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
                className="mt-1 w-4 h-4 text-[#036BB4] rounded border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="professional" className="ml-2 text-sm text-gray-700">
                I understood the <span className="font-medium">Lawapan Truck</span> was a service dedicated to professionals.
              </label>
            </div>
            
            {errors.terms && (
              <p className="text-sm text-red-600">{errors.terms}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {isSubmitting ? 'Creating...' : 'Create'}
          </button>

          <div className="text-center pt-4">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button onClick={onBackToLogin} className="text-[#036BB4] hover:underline font-medium">
                Log in
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

// Shipper After Login
function ShipperOnboarding({ companyName, onLogout }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedData, setSelectedData] = useState({
    companySize: null,
    shipmentsPerMonth: null,
    monthlyBudget: null,
    merchandiseType: null,
    shippingType: null,
    userRole: null,
    companyAddress: ''
  });

  const steps = [
    { title: 'What is the size of the company?' },
    { title: 'How many shipments do you make per month?' },
    { title: 'What is the monthly budget dedicated to your shipments?' },
    { title: 'What type of merchandise do you ship on a daily basis?' },
    { title: 'You ship:' },
    { title: 'What role fits you the most within your company?' },
    { title: 'Basic information' }
  ];

  if (currentStep < steps.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
          <img src="/login-logo (2).png" alt="Logo" className="w-32 mx-auto mb-8" />
          
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {steps.map((_, idx) => (
                <div key={idx} className={`h-1 flex-1 mx-1 rounded ${idx <= currentStep ? 'bg-[#036BB4]' : 'bg-gray-300'}`} />
              ))}
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center mb-8" style={{color: 'black'}}>Help Us Personalize Your Experience</h2>

          {currentStep === 0 && (
            <div>
              <p className="text-black mb-6 font-medium">{steps[currentStep].title}</p>
              <div className="grid grid-cols-2 gap-4">
                {['1-5', '6-20', '21-50', '51-200', '201-500', '500+'].map((val, idx) => (
                  <button key={idx} onClick={() => setSelectedData(p => ({ ...p, companySize: val }))} className={`p-6 border-2 rounded-lg text-center transition ${selectedData.companySize === val ? '' : 'border-gray-200'}`} style={selectedData.companySize === val ? {borderColor: '#036BB4', backgroundColor: '#f0f7ff'} : {}}>
                    <Users className="w-6 h-6 mx-auto mb-2 text-black" />
                    <div className="text-xs text-black">{val} employees</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div>
              <p className="text-black mb-6 font-medium">{steps[currentStep].title}</p>
              <div className="grid grid-cols-3 gap-4">
                {['0-5', '6-10', '11-50', '50-200', '500+'].map((val, idx) => (
                  <button key={idx} onClick={() => setSelectedData(p => ({ ...p, shipmentsPerMonth: val }))} className={`p-6 border-2 rounded-lg text-center transition ${selectedData.shipmentsPerMonth === val ? '' : 'border-gray-200'}`} style={selectedData.shipmentsPerMonth === val ? {borderColor: '#036BB4', backgroundColor: '#f0f7ff'} : {}}>
                    <Truck className="w-6 h-6 mx-auto mb-2 text-black" />
                    <div className="text-xs text-black">{val}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <p className="text-black mb-6 font-medium">{steps[currentStep].title}</p>
              <div className="grid grid-cols-2 gap-4">
                {['<2500', '2500-10000', '10000-50000', '50000+'].map((val, idx) => (
                  <button key={idx} onClick={() => setSelectedData(p => ({ ...p, monthlyBudget: val }))} className={`p-6 border-2 rounded-lg text-center transition ${selectedData.monthlyBudget === val ? '' : 'border-gray-200'}`} style={selectedData.monthlyBudget === val ? {borderColor: '#036BB4', backgroundColor: '#f0f7ff'} : {}}>
                    <DollarSign className="w-6 h-6 mx-auto mb-2 text-black" />
                    <div className="text-xs text-black">{val}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <p className="text-black mb-6 font-medium">{steps[currentStep].title}</p>
              <div className="grid grid-cols-3 gap-4">
                {['Food', 'Building', 'Vehicle', 'Mining', 'Nanotech', 'Others'].map((val, idx) => (
                  <button key={idx} onClick={() => setSelectedData(p => ({ ...p, merchandiseType: val }))} className={`p-6 border-2 rounded-lg text-center transition ${selectedData.merchandiseType === val ? '' : 'border-gray-200'}`} style={selectedData.merchandiseType === val ? {borderColor: '#036BB4', backgroundColor: '#f0f7ff'} : {}}>
                    <Package className="w-6 h-6 mx-auto mb-2 text-black" />
                    <div className="text-xs text-black">{val}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <p className="text-black mb-6 font-medium">{steps[currentStep].title}</p>
              <div className="grid grid-cols-2 gap-4">
                {['LTL', 'FTL'].map((val, idx) => (
                  <button key={idx} onClick={() => setSelectedData(p => ({ ...p, shippingType: val }))} className={`p-6 border-2 rounded-lg text-center transition ${selectedData.shippingType === val ? '' : 'border-gray-200'}`} style={selectedData.shippingType === val ? {borderColor: '#036BB4', backgroundColor: '#f0f7ff'} : {}}>
                    <Truck className="w-12 h-12 mx-auto mb-2 text-black" />
                    <div className="text-xs text-black">{val === 'LTL' ? 'Partial trucks' : 'Complete trucks'}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div>
              <p className="text-black mb-6 font-medium">{steps[currentStep].title}</p>
              <div className="space-y-3">
                {['Logistic manager', 'Purchasing manager', 'Operations Manager', 'Buyer', 'Freight Forwarder', 'Secretariat', 'Other'].map((role, idx) => (
                  <button key={idx} onClick={() => setSelectedData(p => ({ ...p, userRole: role }))} className={`w-full p-3 border-2 rounded-lg text-left transition text-black ${selectedData.userRole === role ? '' : 'border-gray-200'}`} style={selectedData.userRole === role ? {borderColor: '#036BB4', backgroundColor: '#f0f7ff'} : {}}>
                    {role}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div>
              <p className="text-sm font-medium text-black mb-4">Basic information</p>
              <label className="block text-sm font-medium text-black mb-2">Company address</label>
              <input
                type="text"
                value={selectedData.companyAddress}
                onChange={(e) => setSelectedData(p => ({ ...p, companyAddress: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500"
                placeholder="Enter company address"
              />
            </div>
          )}

          <div className="mt-8 flex gap-4">
            {currentStep > 0 && (
              <button onClick={() => setCurrentStep(currentStep - 1)} className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg text-black font-medium hover:bg-gray-50">
                Back
              </button>
            )}
            <button onClick={() => setCurrentStep(currentStep + 1)} className="flex-1 px-4 py-3 rounded-lg text-white font-medium" style={{backgroundColor: '#036BB4'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#025191'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#036BB4'}>
              {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // return (
  //   <div className="min-h-screen bg-gray-50">
  //     <nav className="bg-white shadow">
  //       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
  //         <img src="/login-logo (2).png" alt="Logo" className="w-24" />
  //         <h1 className="text-lg font-semibold text-black">{companyName}</h1>
  //         <button onClick={onLogout} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
  //           Logout
  //         </button>
  //       </div>
  //     </nav>
  //     <div className="max-w-7xl mx-auto px-6 py-8">
  //     </div>
  //   </div>
  // );
}

// Transporter After Login
function TransporterOnboarding({ companyName, onLogout }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedData, setSelectedData] = useState({
    shipmentsPerMonth: null,
    companyAddress: ''
  });

  const steps = [
    { title: 'How many shipments do you make per month?' },
    { title: 'Documents Upload' },
    { title: 'Basic information' }
  ];

  if (currentStep < steps.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
          <img src="/login-logo (2).png" alt="Logo" className="w-32 mx-auto mb-8" />
          
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {steps.map((_, idx) => (
                <div key={idx} className={`h-1 flex-1 mx-1 rounded ${idx <= currentStep ? '' : 'bg-gray-300'}`} style={idx <= currentStep ? {backgroundColor: '#036BB4'} : {}} />
              ))}
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center mb-8" style={{color: 'black'}}>Help Us Personalize Your Experience</h2>

          {currentStep === 0 && (
            <div>
              <p className="text-black mb-6 font-medium">{steps[currentStep].title}</p>
              <div className="grid grid-cols-3 gap-4">
                {['0-5', '6-10', '11-50', '50-200', '500+'].map((val, idx) => (
                  <button key={idx} onClick={() => setSelectedData(p => ({ ...p, shipmentsPerMonth: val }))} className={`p-6 border-2 rounded-lg text-center transition ${selectedData.shipmentsPerMonth === val ? '' : 'border-gray-200'}`} style={selectedData.shipmentsPerMonth === val ? {borderColor: '#036BB4', backgroundColor: '#f0f7ff'} : {}}>
                    <Truck className="w-6 h-6 mx-auto mb-2 text-black" />
                    <div className="text-xs text-black">{val}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div>
              <p className="text-sm font-medium text-black mb-6">{steps[currentStep].title}</p>
              <div className="space-y-4">
                {['Registration certificate', 'Transport license', 'Insurance certificate'].map((doc, idx) => (
                  <div key={idx} className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 cursor-pointer transition">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-black" />
                    <p className="text-sm text-black font-medium">Upload</p>
                    <p className="text-xs text-black mt-1">{doc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <p className="text-sm font-medium text-black mb-4">{steps[currentStep].title}</p>
              <label className="block text-sm font-medium text-black mb-2">Company address</label>
              <input
                type="text"
                value={selectedData.companyAddress}
                onChange={(e) => setSelectedData(p => ({ ...p, companyAddress: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500"
                placeholder="Enter company address"
              />
            </div>
          )}

          <div className="mt-8 flex gap-4">
            {currentStep > 0 && (
              <button onClick={() => setCurrentStep(currentStep - 1)} className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg text-black font-medium hover:bg-gray-50">
                Back
              </button>
            )}
            <button onClick={() => setCurrentStep(currentStep + 1)} className="flex-1 px-4 py-3 rounded-lg text-white font-medium" style={{backgroundColor: '#036BB4'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#025191'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#036BB4'}>
              {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // return (
  //   <div className="min-h-screen bg-gray-50">
  //     <nav className="bg-white shadow">
  //       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
  //         <img src="/login-logo (2).png" alt="Logo" className="w-24" />
  //         <h1 className="text-lg font-semibold text-black">{companyName}</h1>
  //         <button onClick={onLogout} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
  //           Logout
  //         </button>
  //       </div>
  //     </nav>
  //     <div className="max-w-7xl mx-auto px-6 py-8">
  //     </div>
  //   </div>
  // );
}