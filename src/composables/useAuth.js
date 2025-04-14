import axios from 'axios';
import { ref } from 'vue';

const API_URL = 'http://localhost:8000/api'; // Remplace par l'URL de ton API
const user = ref(null); 

export function useAuth() {
  //Inscription
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

  //configurer l'utilisateur
  const setUser = (userData) => {
    user.value = userData;
    localStorage.setItem('user', JSON.stringify(userData))
  }
  
  //Recuperer l'utilisateur
  const getUser = () => {
    const userData = localStorage.getItem('user')
    if (!user.value && userData && userData !== 'undefined') {
      try {
        user.value = JSON.parse(userData)
      } catch (e) {
        console.error('Erreur lors du parsing JSON :', e)
        localStorage.removeItem('user')
      }
    }
    return user 
  }

  //Connexion
  const login = async (credentials) => {
    try { 
      const response = await axios.post(`${API_URL}/login/`, credentials);
      console.log(response);
      const userData = response.data.email
      const tokens = {
        access: response.data.access_token,
        refresh: response.data.refresh_token
      }

      setUser(userData)
      localStorage.setItem('access_token', tokens.access)
      localStorage.setItem('refresh_token', tokens.refresh)

      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
      } else {
        return Promise.reject({ detail: error.message });
      }
    }
  };

  //Déconnexion
  const logout = async () => {
    try {
      const refresh = localStorage.getItem('refresh_token')
      console.log(refresh);
      if (!refresh) throw new Error("Token manquant")

      await axios.post(`${API_URL}/logout/`, { refresh_token: refresh })

      user.value = null
      localStorage.removeItem('user')
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token') 

    } catch (error) {
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
      } else {
        return Promise.reject({ detail: error.message });
      }
    }
  }

  return {
    register,
    login,
    logout,
    setUser,
    getUser,
    user,
  };
}
