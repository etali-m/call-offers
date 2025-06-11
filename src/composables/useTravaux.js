import axios from 'axios'
import { ref } from 'vue'

const API_URL = 'http://localhost:8000/api/marche-de-travaux'; 
const user = ref(null); 

export function useTravaux() {
    // fonction pour récupérer les données d'un avis d'appel d'offre
    const get_aao = async () => {
        const token = localStorage.getItem('access_token')
        if (token) {
            try {
                const response = await axios.get(`${API_URL}/aao`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
                return response.data;
            } catch (error) {
                if (error.response && error.response.data) {
                    return Promise.reject(error.response.data);
                } else {
                    return Promise.reject({ detail: error.message });
                }
            }
        }
    }

    const create_aao = async (aaoData) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            try {
                const response = await axios.post(`${API_URL}/aao`, aaoData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
                return response.data;
            } catch (error) {
                if (error.response && error.response.data) {
                    return Promise.reject(error.response.data);
                } else {
                    return Promise.reject({ detail: error.message });
                }
            }
        }
    }

    return {
        get_aao,
        create_aao,
    }
}