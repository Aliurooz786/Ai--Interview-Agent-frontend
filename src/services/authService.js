import axios from 'axios';

const API_URL = 'http://localhost:8081/api/auth';

const login = async (email, password) => {
  console.log('[authService] Login function shuru hua. Email:', email);
  try {
    const response = await axios.post(API_URL + '/login', { email, password });
    console.log('[authService] Backend se response mila:', response.data);
    return response.data;
  } catch (error) {
    console.error('[authService] API call fail ho gayi:', error.response ? error.response.data : error.message);
    throw error;
  }
};

/**
 * NAYA FUNCTION: Ek naye user ko register karne ke liye request bhejega.
 * @param {string} fullName - User ka poora naam.
 * @param {string} email - User ka email.
 * @param {string} password - User ka password.
 */
const register = async (fullName, email, password) => {
  console.log('[authService] Register function shuru hua. User:', fullName);
  try {
    
    const response = await axios.post(API_URL + '/register', {
      fullName,
      email,
      password,
    });
    console.log('[authService] Registration safal hua:', response.data);
    return response.data;
  } catch (error) {
    console.error('[authService] Registration API call fail ho gayi:', error.response ? error.response.data : error.message);
    
    throw error;
  }
};

export default {
  login,
  register, 
};

