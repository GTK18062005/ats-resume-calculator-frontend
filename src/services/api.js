import axios from 'axios';

// Change this line:
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://ats-resume-calculator-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const analyzeResume = async (formData) => {
  try {
    const response = await api.post('/resume/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const analyzeWithAllModels = async (formData) => {
  try {
    const response = await api.post('/resume/analyze-all', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getSupportedFormats = async () => {
  try {
    const response = await api.get('/resume/supported-formats');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const healthCheck = async () => {
  try {
    const response = await api.get('/resume/health');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
