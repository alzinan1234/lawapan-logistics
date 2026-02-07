// ============================================
// FILE: lib/apiClient.js
// COMPLETE AUTHENTICATION API CLIENT
// WITH ENHANCED ROLE DETECTION
// ============================================

import { API_ENDPOINTS } from "@/config/api";

// ============================================
// COOKIE MANAGEMENT FUNCTIONS
// ============================================

/**
 * Get authentication token from cookie
 */
const getTokenFromCookie = () => {
  if (typeof document === "undefined") return null;
  
  const name = "token=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");
  
  for (let cookie of cookieArray) {
    cookie = cookie.trim();
    if (cookie.indexOf(name) === 0) {
      const token = cookie.substring(name.length);
      console.log('✅ Token found in cookie');
      return token;
    }
  }
  
  console.warn('⚠️ No token found in cookie');
  return null;
};

/**
 * Save authentication token to cookie
 */
const setTokenInCookie = (token, expiryDays = 30) => {
  if (!token) {
    console.error('❌ Cannot set token - token is empty/null');
    return;
  }
  
  const date = new Date();
  date.setTime(date.getTime() + expiryDays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  
  // Set cookie with proper security flags
  document.cookie = `token=${token};${expires};path=/;SameSite=Lax;Secure`;
  console.log('✅ Token saved in cookie');
  console.log('🔑 Token preview:', token.substring(0, 20) + '...');
};

/**
 * Remove authentication token from cookie
 */
const removeTokenFromCookie = () => {
  document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
  console.log('🔄 Token removed from cookie');
};

// ============================================
// ROLE EXTRACTION HELPER
// ============================================

/**
 * Extract role from API response with comprehensive checks
 */
const extractRole = (data) => {
  if (!data) return null;
  
  console.log('🔍 Extracting role from data:', JSON.stringify(data, null, 2));
  
  // List of possible role field names
  const roleFields = [
    'role',
    'Role', 
    'ROLE',
    'user_role',
    'userRole',
    'UserRole',
    'user_type',
    'userType',
    'account_type',
    'accountType'
  ];
  
  // 1. Check direct fields in data
  for (const field of roleFields) {
    if (data[field]) {
      console.log(`✅ Role found in data.${field}:`, data[field]);
      return data[field].toUpperCase();
    }
  }
  
  // 2. Check in nested user object
  if (data.user) {
    for (const field of roleFields) {
      if (data.user[field]) {
        console.log(`✅ Role found in data.user.${field}:`, data.user[field]);
        return data.user[field].toUpperCase();
      }
    }
  }
  
  // 3. Check by pattern matching (case-insensitive)
  for (const key in data) {
    if (key.toLowerCase().includes('role') || key.toLowerCase().includes('type')) {
      console.log(`✅ Role found by pattern ${key}:`, data[key]);
      return String(data[key]).toUpperCase();
    }
  }
  
  console.warn('⚠️ Role not found in response data');
  return null;
};

/**
 * Extract user ID from API response
 */
const extractUserId = (data) => {
  if (!data) return null;
  
  const idFields = [
    'user_id',
    'userId', 
    'id',
    'ID',
    '_id',
    'user'
  ];
  
  for (const field of idFields) {
    if (data[field]) {
      // If it's an object, try to get id from it
      if (typeof data[field] === 'object' && data[field].id) {
        return data[field].id;
      }
      // Otherwise return the value directly
      if (typeof data[field] === 'string' || typeof data[field] === 'number') {
        return data[field];
      }
    }
  }
  
  return null;
};

// ============================================
// MAIN API CALL FUNCTION
// ============================================

/**
 * Generic API call function with authentication
 */
const apiCall = async (
  endpoint,
  method = "POST",
  data = null,
  headers = {},
  isFormData = false
) => {
  try {
    console.log(`🌐 API Call: ${method} ${endpoint}`);
    
    const token = getTokenFromCookie();
    
    const options = {
      method,
      headers: {
        ...headers,
      },
    };

    // Add authorization header if token exists
    if (token) {
      options.headers.Authorization = `Bearer ${token}`;
      console.log('✅ Authorization header added');
    }

    // Add Content-Type for non-FormData requests
    if (!isFormData && method !== "GET") {
      options.headers["Content-Type"] = "application/json";
    }

    // Add request body
    if (data && method !== "GET") {
      if (isFormData) {
        options.body = data;
      } else {
        options.body = JSON.stringify(data);
      }
    }

    // Make the API call
    const response = await fetch(endpoint, options);

    // Handle 401 Unauthorized
    if (response.status === 401) {
      console.error('❌ 401 Unauthorized - Token invalid/expired');
      removeTokenFromCookie();
      if (typeof window !== "undefined") {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('shipper_id');
        localStorage.removeItem('transporter_id');
        localStorage.removeItem('user_role');
      }
      throw new Error("Session expired. Please login again.");
    }

    // Handle other HTTP errors
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorData.detail || errorMessage;
      } catch (e) {
        errorMessage = response.statusText || errorMessage;
      }
      
      console.error(`❌ API Error: ${errorMessage}`);
      throw new Error(errorMessage);
    }

    // Parse successful response
    const responseData = await response.json();
    console.log(`✅ API Success: ${response.status}`);
    
    return responseData;

  } catch (error) {
    console.error("❌ API Error:", error.message);
    throw error;
  }
};

// ============================================
// SIGNUP FUNCTION
// ============================================

export const signUpUser = async (formData) => {
  console.log('🚀 Starting signup process');
  console.log('📋 Signup data:', {
    email: formData.email,
    role: formData.role,
    companyName: formData.companyName
  });
  
  const formDataObj = new FormData();

  // Add required fields
  formDataObj.append("company_name", formData.companyName);
  formDataObj.append("email", formData.email);
  formDataObj.append("phone", formData.phone);
  formDataObj.append("country", formData.country);
  formDataObj.append("password", formData.password);
  formDataObj.append("role", formData.role.toUpperCase());
  formDataObj.append("service_policy", "true");
  formDataObj.append("terms_and_conditions", "true");

  // Add transporter-specific fields
  if (formData.role.toLowerCase() === "transporter") {
    formDataObj.append("number_of_trucks", formData.numberOfTrucks || "0");
    
    if (formData.truckTypes && formData.truckTypes.length > 0) {
      formData.truckTypes.forEach((type) => {
        formDataObj.append("truck_type", type);
      });
    }
    
    if (formData.companyLogo) {
      formDataObj.append("logo", formData.companyLogo);
    }
  }

  // Make API call
  const response = await apiCall(
    API_ENDPOINTS.AUTH.SIGN_UP,
    "POST",
    formDataObj,
    {},
    true
  );

  console.log('📦 Signup response received');

  if (response.success && response.data) {
    console.log('✅ Signup successful');
    
    // Extract and store token
    const tokenFields = [
      'token', 'access', 'access_token', 'accessToken',
      'Authorization', 'auth_token', 'jwt', 'bearer'
    ];

    let token = null;
    for (const field of tokenFields) {
      if (response.data[field] || response[field]) {
        token = response.data[field] || response[field];
        console.log(`✅ Token found in ${field}`);
        break;
      }
    }

    if (token) {
      setTokenInCookie(token, 30);
      if (typeof window !== "undefined") {
        localStorage.setItem('auth_token', token);
      }
    }

    // Extract and store role
    const userRole = extractRole(response.data) || formData.role.toUpperCase();
    console.log('👥 User Role:', userRole);
    
    if (typeof window !== "undefined") {
      localStorage.setItem('user_role', userRole);
    }

    // Extract and store user ID
    const userId = extractUserId(response.data);
    console.log('👤 User ID:', userId);

    if (userId && typeof window !== "undefined") {
      if (userRole === 'SHIPPER') {
        localStorage.setItem('shipper_id', userId);
        console.log('✅ Stored shipper_id:', userId);
      } else if (userRole === 'TRANSPORTER') {
        localStorage.setItem('transporter_id', userId);
        console.log('✅ Stored transporter_id:', userId);
      }
    }
  }

  return response;
};

// ============================================
// LOGIN FUNCTION - ENHANCED ROLE DETECTION
// ============================================

export const loginUser = async (email, password) => {
  console.log('🔐 Login attempt for:', email);
  
  const response = await apiCall(
    API_ENDPOINTS.AUTH.SIGN_IN, 
    "POST", 
    {
      email,
      password,
    }
  );

  console.log('📦 Login response received');
  console.log('📋 Full response:', JSON.stringify(response, null, 2));

  if (response.success && response.data) {
    console.log('✅ Login successful');
    
    // Extract and store token
    const tokenFields = [
      'token', 'access', 'access_token', 'accessToken',
      'Authorization', 'auth_token', 'jwt', 'bearer'
    ];

    let token = null;
    for (const field of tokenFields) {
      if (response.data[field] || response[field]) {
        token = response.data[field] || response[field];
        console.log(`✅ Token found in ${field}`);
        break;
      }
    }

    if (token) {
      setTokenInCookie(token, 30);
      if (typeof window !== "undefined") {
        localStorage.setItem('auth_token', token);
        console.log('✅ Token stored');
      }
    } else {
      console.warn('⚠️ Token not found in login response');
    }

    // Extract and store role - THIS IS CRITICAL
    const userRole = extractRole(response.data);
    console.log('👥 Extracted User Role:', userRole);
    
    if (userRole && typeof window !== "undefined") {
      localStorage.setItem('user_role', userRole);
      console.log('✅ Role stored in localStorage:', userRole);
    } else {
      console.error('❌ Could not extract user role from response!');
      console.log('Response.data keys:', Object.keys(response.data));
    }

    // Extract and store user ID
    const userId = extractUserId(response.data);
    console.log('👤 User ID:', userId);
    
    if (userId && userRole && typeof window !== "undefined") {
      if (userRole === 'SHIPPER') {
        localStorage.setItem('shipper_id', userId);
        console.log('✅ Stored shipper_id:', userId);
      } else if (userRole === 'TRANSPORTER') {
        localStorage.setItem('transporter_id', userId);
        console.log('✅ Stored transporter_id:', userId);
      }
    }

    // Add role to response.data for easy access
    if (userRole) {
      response.data.role = userRole;
    }
  }

  return response;
};

// ============================================
// LOGOUT FUNCTION
// ============================================

export const logoutUser = () => {
  console.log('🚪 Logging out user');
  
  removeTokenFromCookie();
  
  if (typeof window !== "undefined") {
    localStorage.removeItem('shipper_id');
    localStorage.removeItem('transporter_id');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('rememberEmail');
    localStorage.removeItem('user_role');
  }
  
  console.log('✅ User logged out successfully');
  window.location.href = "/login";
};

// ============================================
// FORGOT PASSWORD FUNCTIONS
// ============================================

export const forgotPasswordRequest = async (email) => {
  console.log('🔑 Forgot password request for:', email);
  const response = await apiCall(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, "POST", { email });
  return response;
};

export const verifyOTPForReset = async (email, otp) => {
  console.log('🔢 Verifying OTP for:', email);
  const response = await apiCall(API_ENDPOINTS.AUTH.VERIFY_OTP, "POST", { email, otp });
  return response;
};

export const resetPasswordWithToken = async (verificationToken, newPassword, confirmPassword) => {
  console.log('🔐 Resetting password with verification token');
  const response = await apiCall(API_ENDPOINTS.AUTH.RESET_PASSWORD, "POST", {
    verification_token: verificationToken,
    new_password: newPassword,
    confirm_password: confirmPassword
  });
  return response;
};

// ============================================
// OTHER AUTH FUNCTIONS
// ============================================

export const sendOTP = async (email) => {
  console.log('📧 Sending OTP to:', email);
  return apiCall(API_ENDPOINTS.AUTH.SEND_OTP, "POST", { email });
};

export const verifyOTP = async (email, otp) => {
  console.log('🔢 Verifying OTP');
  return apiCall(API_ENDPOINTS.AUTH.VERIFY_OTP, "POST", { email, otp });
};

export const resetPassword = async (email, otp, newPassword, newPassword2) => {
  console.log('🔐 Resetting password');
  return apiCall(API_ENDPOINTS.AUTH.RESET_PASSWORD, "POST", {
    email, otp,
    new_password: newPassword,
    new_password2: newPassword2,
  });
};

export const changePassword = async (oldPassword, newPassword, newPassword2) => {
  console.log('🔐 Changing password');
  return apiCall(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, "POST", {
    old_password: oldPassword,
    new_password: newPassword,
    new_password2: newPassword2,
  });
};

export const verifyEmail = async (email) => {
  console.log('📧 Verifying email:', email);
  return apiCall(API_ENDPOINTS.AUTH.VERIFY_EMAIL, "POST", { email });
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

export const getToken = () => {
  return getTokenFromCookie();
};

export const isAuthenticated = () => {
  const token = getTokenFromCookie();
  return !!token;
};

export const getUserRole = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem('user_role');
  }
  return null;
};

// ============================================
// DEFAULT EXPORT
// ============================================

export default apiCall;