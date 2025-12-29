"use client";

import React, { useState } from 'react';
// Assuming 'lucide-react' is installed for the icons
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberPassword: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      // Clear error on change
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      console.log('Login submitted:', formData);
      // Replace alert with actual login logic (e.g., API call)
      alert(`Login successful!\nEmail: ${formData.email}\nRemember: ${formData.rememberPassword}`);
    } else {
      setErrors(newErrors);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  // --- Adjusted Styling for Visual Fidelity ---
  // The blue shade in the image looks slightly darker than blue-600.
  // Using a custom color or blue-700/800 for the button might be closer.
  // The input border radius is slightly more rounded than 'md'. Using 'lg' or a custom value.

  return (
    // min-h-screen to center vertically, bg-gray-50 for light background
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">

      {/* Logo Container - Ensure the logo path is correct */}
    
      

      {/* Login Form Card - Added 'rounded-xl' and adjusted padding for closer match */}
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-8 md:p-10">
        <div className="mb-8">
        {/* Placeholder for the logo image. Replace './login-logo (2).png' with the actual path. 
            I've added a width/max-width to resemble the size in the image. */}
        <img 
          src="./login-logo (2).png" 
          alt="LAWANPAN TRUCK Logo" 
          className="max-w-xs w-28 md:w-36 lg:w-40 mx-auto" 
        />
        {/*  - Not triggered as the user provides the logo */}
      </div>
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
          Login to Account
        </h2>
        {/* Text style matches the image */}
        <p className="text-center text-gray-500 text-sm mb-8"> 
          Please enter your email and password to continue
        </p>
          

        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              // Removed onKeyPress from input, as it's better handled on the form/button submit/click
              className={`w-full px-4 py-3 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition`}
              placeholder=""
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onKeyPress={handleKeyPress} // Retained Enter key submit functionality
                className={`w-full px-4 py-3 border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition pr-12`}
                placeholder=""
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

          {/* Remember Password & Forgot Password */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="rememberPassword"
                checked={formData.rememberPassword}
                onChange={handleChange}
                // Checkbox style to match the standard browser appearance in the image (or customize with Tailwind)
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
              />
              <span className="ml-2 text-sm text-gray-700">Remember Password</span>
            </label>
            <button
              type="button"
              className="text-sm text-red-500 hover:text-red-600 transition font-medium" // Added font-medium
              onClick={() => alert('Password reset functionality would be implemented here')}
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button - Changed to a slightly darker blue (blue-700) for closer match */}
          <button
            type="submit" // Changed to type="submit" for proper form submission handling
            onClick={handleSubmit}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            Log In
          </button>
        </form>
        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have account?{' '}
        <Link href="/signup">
          <button
            type="button"
            className="text-blue-700 hover:text-blue-800 font-medium transition" // Adjusted color and bolding for links
            // onClick={() => alert('Sign up functionality would be implemented here')}
          >
            Sign Up
          </button>
        </Link>
        </p>
      </div>
    </div>
  );
}