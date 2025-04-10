import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Remplace par l'URL de ton API

export function useAuth() {
  const register = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/signup/`, userData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
      } else {
        return Promise.reject({ detail: error.message });
      }
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login/`, credentials);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
      } else {
        return Promise.reject({ detail: error.message });
      }
    }
  };

  return {
    register,
    login,
  };
}
