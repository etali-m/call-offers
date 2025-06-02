import axios from 'axios'
import { ref } from 'vue'

const API_URL = 'http://localhost:8000/api'; 

export function usePiece() {
    //Récuperer toutes les pièces d'un type d'appel d'offre
    const get_pieces = async (id) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            try {
                const response = await axios.get(`${API_URL}/pieces/${id}`,
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
        get_pieces,
    }
}