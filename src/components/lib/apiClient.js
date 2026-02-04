// ============================================
// FILE: lib/apiClient.js
// UPDATED: Added Forgot Password functionality
// ============================================

import { API_ENDPOINTS } from "@/config/api";

// ============================================
// COOKIE FUNCTIONS
// ============================================

const getTokenFromCookie = () => {
  if (typeof document === "undefined") return null;
  const name = "token=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");
  for (let cookie of cookieArray) {
    cookie = cookie.trim();
    if (cookie.indexOf(name) === 0) {
      const token = cookie.substring(name.length);
      return token;
    }
  }
  return null;
};

const setTokenInCookie = (token, expiryDays = 30) => {
  if (!token) {
    console.error('❌ Cannot set token - token is empty/null');
    return;
  }
  const date = new Date();
  date.setTime(date.getTime() + expiryDays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = `token=${token};${expires};path=/;SameSite=Lax;Secure`;
  console.log('✅ Token saved in cookie:', token.substring(0, 20) + '...');
};

const removeTokenFromCookie = () => {
  document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
  console.log('🔄 Token removed from cookie');
};

// ============================================
// MAIN API CALL FUNCTION
// ============================================

const apiCall = async (
  endpoint,
  method = "POST",
  data = null,
  headers = {},
  isFormData = false
) => {
  try {
    const token = getTokenFromCookie();
    
    if (!token) {
      console.warn('⚠️ WARNING: No token in cookie');
    } else {
      console.log('✅ Token found in cookie');
    }

    const options = {
      method,
      headers: {
        ...headers,
      },
    };

    // Add token to header if exists
    if (token) {
      options.headers.Authorization = `Bearer ${token}`;
      console.log('✅ Authorization header added with token');
    } else {
      console.error('❌ No token - Authorization header NOT added');
    }

    // Add Content-Type for non-FormData
    if (!isFormData && method !== "GET") {
      options.headers["Content-Type"] = "application/json";
    }

    // Add body
    if (data && method !== "GET") {
      if (isFormData) {
        options.body = data;
      } else {
        options.body = JSON.stringify(data);
      }
    }

    console.log('🌐 API Call:', method, endpoint);
    const response = await fetch(endpoint, options);

    // Handle 401
    if (response.status === 401) {
      console.error('❌ 401 Unauthorized - Token invalid/expired');
      removeTokenFromCookie();
      throw new Error("Authentication failed. Please sign up again and try completing your profile immediately.");
    }

    // Handle other errors
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (e) {
        // Silent
      }
      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    console.log('✅ API Success:', response.status);
    return responseData;

  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
};

// ============================================
// SIGNUP FUNCTION - THIS IS THE KEY FIX
// ============================================

export const signUpUser = async (formData) => {
  console.log('🚀 Starting signup process');
  
  const formDataObj = new FormData();

  formDataObj.append("company_name", formData.companyName);
  formDataObj.append("email", formData.email);
  formDataObj.append("phone", formData.phone);
  formDataObj.append("country", formData.country);
  formDataObj.append("password", formData.password);
  formDataObj.append("role", formData.role.toUpperCase());
  formDataObj.append("service_policy", "true");
  formDataObj.append("terms_and_conditions", "true");

  // Transporter specific
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

  const response = await apiCall(
    API_ENDPOINTS.AUTH.SIGN_UP,
    "POST",
    formDataObj,
    {},
    true
  );

  console.log('📦 Signup response received');
  console.log('Full response:', JSON.stringify(response, null, 2));

  // ============================================
  // TOKEN EXTRACTION - CRITICAL FIX
  // ============================================
  
  if (response.success && response.data) {
    console.log('✅ Signup successful - now extracting token');
    
    // Print all keys in response.data to see what's available
    console.log('📋 Available keys in response.data:', Object.keys(response.data));
    console.log('📋 Full response.data:', JSON.stringify(response.data, null, 2));

    // Try multiple possible token field names
    let token = null;
    
    // Check all possible token field names
    const tokenFieldNames = [
      'token',
      'access',
      'access_token',
      'accessToken',
      'Authorization',
      'auth_token',
      'jwt',
      'bearer'
    ];

    for (const fieldName of tokenFieldNames) {
      if (response.data[fieldName]) {
        token = response.data[fieldName];
        console.log(`✅ Token found in field: "${fieldName}"`);
        break;
      }
    }

    // Also check top-level response object
    if (!token) {
      for (const fieldName of tokenFieldNames) {
        if (response[fieldName]) {
          token = response[fieldName];
          console.log(`✅ Token found in response: "${fieldName}"`);
          break;
        }
      }
    }

    // Final check - look for any field containing 'token' or 'auth'
    if (!token) {
      for (const key in response.data) {
        if (key.toLowerCase().includes('token') || key.toLowerCase().includes('auth')) {
          token = response.data[key];
          console.log(`✅ Token found by pattern match: "${key}"`);
          break;
        }
      }
    }

    // If still no token, log detailed debug info
    if (!token) {
      console.error('❌ TOKEN NOT FOUND!');
      console.error('Response structure:', response);
      console.error('Response.data:', response.data);
    } else {
      // Store token
      setTokenInCookie(token, 30);
      if (typeof window !== "undefined") {
        localStorage.setItem('auth_token', token);
        console.log('✅ Token stored in cookie and localStorage');
      }
    }

    // ============================================
    // USER ID EXTRACTION
    // ============================================

    const userId = response.data.user_id || 
                   response.data.id || 
                   response.data._id ||
                   response.data.userId;
    
    const userRole = response.data.role || formData.role.toUpperCase();
    
    console.log('👤 User ID:', userId);
    console.log('👥 User Role:', userRole);

    if (userId) {
      if (userRole === 'SHIPPER' || userRole === 'shipper') {
        localStorage.setItem('shipper_id', userId);
        console.log('✅ STORED shipper_id:', userId);
      } else if (userRole === 'TRANSPORTER' || userRole === 'transporter') {
        localStorage.setItem('transporter_id', userId);
        console.log('✅ STORED transporter_id:', userId);
      }
    }
  } else {
    console.error('❌ Signup failed or no data in response');
  }

  return response;
};

// ============================================
// LOGIN FUNCTION
// ============================================

export const loginUser = async (email, password) => {
  console.log('🚀 Login attempt');
  
  const response = await apiCall(API_ENDPOINTS.AUTH.SIGN_IN, "POST", {
    email,
    password,
  });

  if (response.success && response.data) {
    // Try to find token
    let token = response.data.access || 
                response.data.token || 
                response.data.access_token ||
                response.data.accessToken;
    
    if (!token) {
      // Try to find by pattern
      for (const key in response.data) {
        if (key.toLowerCase().includes('token') || key.toLowerCase().includes('access')) {
          token = response.data[key];
          break;
        }
      }
    }

    if (token) {
      setTokenInCookie(token, 30);
      if (typeof window !== "undefined") {
        localStorage.setItem('auth_token', token);
      }
      console.log('✅ Login token stored');
    }

    // Store user IDs
    const userId = response.data.user_id || response.data.id;
    const userRole = response.data.role;
    
    if (userId && typeof window !== "undefined") {
      if (userRole === 'SHIPPER' || userRole === 'shipper') {
        localStorage.setItem('shipper_id', userId);
      } else if (userRole === 'TRANSPORTER' || userRole === 'transporter') {
        localStorage.setItem('transporter_id', userId);
      }
    }
  }

  return response;
};

// ============================================
// FORGOT PASSWORD FUNCTIONS (NEW)
// ============================================

export const forgotPasswordRequest = async (email) => {
  console.log('🚀 Forgot password request for:', email);
  
  const response = await apiCall(
    API_ENDPOINTS.AUTH.FORGOT_PASSWORD, 
    "POST", 
    { email }
  );

  console.log('✅ Forgot password response:', response);
  return response;
};

export const verifyOTPForReset = async (email, otp) => {
  console.log('🚀 Verifying OTP for:', email);
  
  const response = await apiCall(
    API_ENDPOINTS.AUTH.VERIFY_OTP, 
    "POST", 
    { email, otp }
  );

  console.log('✅ OTP verification response:', response);
  return response;
};

export const resetPasswordWithToken = async (verificationToken, newPassword, confirmPassword) => {
  console.log('🚀 Resetting password with verification token');
  
  const response = await apiCall(
    API_ENDPOINTS.AUTH.RESET_PASSWORD, 
    "POST", 
    {
      verification_token: verificationToken,
      new_password: newPassword,
      confirm_password: confirmPassword
    }
  );

  console.log('✅ Password reset response:', response);
  return response;
};

// ============================================
// OTHER AUTH FUNCTIONS (EXISTING)
// ============================================

export const sendOTP = async (email) => {
  return apiCall(API_ENDPOINTS.AUTH.SEND_OTP, "POST", { email });
};

export const verifyOTP = async (email, otp) => {
  return apiCall(API_ENDPOINTS.AUTH.VERIFY_OTP, "POST", { email, otp });
};

export const resetPassword = async (email, otp, newPassword, newPassword2) => {
  return apiCall(API_ENDPOINTS.AUTH.RESET_PASSWORD, "POST", {
    email,
    otp,
    new_password: newPassword,
    new_password2: newPassword2,
  });
};

export const changePassword = async (oldPassword, newPassword, newPassword2) => {
  return apiCall(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, "POST", {
    old_password: oldPassword,
    new_password: newPassword,
    new_password2: newPassword2,
  });
};

export const verifyEmail = async (email) => {
  return apiCall(API_ENDPOINTS.AUTH.VERIFY_EMAIL, "POST", { email });
};

export const logoutUser = () => {
  removeTokenFromCookie();
  if (typeof window !== "undefined") {
    localStorage.removeItem('shipper_id');
    localStorage.removeItem('transporter_id');
    localStorage.removeItem('auth_token');
  }
  window.location.href = "/login";
};

export const getToken = () => {
  return getTokenFromCookie();
};

export default apiCall;