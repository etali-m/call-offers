import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Remplacez par l'URL de votre API

export function useAuth() {
  const register = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/signup/`, userData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login/`, credentials);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  };

  return {
    register,
    login,
  };
}
