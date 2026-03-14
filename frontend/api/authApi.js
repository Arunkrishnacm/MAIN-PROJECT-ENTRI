import axios from "../api/axios.js";


export const register = async (userData) => {
  try {
    const response = await axios.post('/api/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const loginApi = async (credentials) => {
  try {
    const response = await axios.post('/api/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const logout = async () => {
  try {
    await axios.post('/api/auth/logout');
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const CustomerBooking = async (bookingData) => {
  try {
    const response = await axios.post('/api/services/create', bookingData); 
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};



