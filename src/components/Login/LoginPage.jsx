"use client";
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginUser } from '../lib/apiClient';


export default function LoginPage() {
  const router = useRouter();
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberPassword: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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

  const handleLogin = async (e) => {
    e.preventDefault();
    const newErrors = validateLoginForm();
    
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      setErrors({});
      
      try {
        console.log("🚀 Login attempt for:", loginData.email);
        
        const response = await loginUser(loginData.email, loginData.password);
        
        if (response.success) {
          console.log("✅ Login successful");
          
          // Get user role from response
          const userRole = response.data?.role;
          
          // Store remember password preference
          if (loginData.rememberPassword) {
            localStorage.setItem('rememberEmail', loginData.email);
          } else {
            localStorage.removeItem('rememberEmail');
          }
          
          // Redirect based on role or to dashboard
          if (userRole === 'SHIPPER' || userRole === 'shipper') {
            console.log("📦 Redirecting to shipper dashboard");
            router.push('/shipper/dashboard');
          } else if (userRole === 'TRANSPORTER' || userRole === 'transporter') {
            console.log("🚛 Redirecting to transporter dashboard");
            router.push('/transporter/dashboard');
          } else {
            console.log("🏠 Redirecting to general dashboard");
            router.push('/dashboard');
          }
        } else {
          setErrors({ 
            submit: response.message || 'Login failed. Please try again.' 
          });
        }
      } catch (error) {
        console.error("❌ Login error:", error);
        setErrors({ 
          submit: error.message || 'Invalid email or password. Please try again.' 
        });
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  // Load remembered email on component mount
  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberEmail');
    if (rememberedEmail) {
      setLoginData(prev => ({
        ...prev,
        email: rememberedEmail,
        rememberPassword: true
      }));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans text-black">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-8 md:p-10 border border-gray-100">
        {/* Logo Section */}
        <div className="mb-8">
          <img 
            src="/login-logo (2).png" 
            alt="LAWANPAN TRUCK Logo" 
            className="max-w-xs w-28 md:w-36 lg:w-40 mx-auto" 
          />
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
          Login to Account
        </h2>
        <p className="text-center text-gray-500 text-sm mb-8"> 
          Please enter your email and password to continue
        </p>

        {errors.submit && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
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
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition text-black bg-white`}
              placeholder="Enter your email"
              disabled={loading}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
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
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition pr-12 text-black bg-white`}
                placeholder="Enter your password"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                disabled={loading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="rememberPassword"
                checked={loginData.rememberPassword}
                onChange={handleLoginChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                disabled={loading}
              />
              <span className="ml-2 text-sm text-gray-700">Remember Password</span>
            </label>
            <Link href="/forgot-password">
              <button
                type="button"
                className="text-sm text-red-500 hover:text-red-600 transition font-medium"
              >
                Forgot Password?
              </button>
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg bg-[#036BB4] hover:bg-[#025191] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have account?{' '}
          <Link href="/signup">
            <button
              type="button"
              className="text-[#036BB4] hover:text-blue-800 font-medium transition cursor-pointer"
            >
              Sign Up
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
}