import axios from 'axios'
import { ref } from 'vue'

const API_URL = 'http://localhost:8000/api'; // Remplace par l'URL de ton API
const user = ref(null); 

export function useAppelOffre() {
    //Récuperer les appels d'offres crée par l'utilisateur
    const get_callOffers = async () => {
        const token = localStorage.getItem('access_token')
        if (token) {
            try {
                const response = await axios.get(`${API_URL}/appel-offre`,
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

    //créer un dossier d'appel d'offre
    const create_callOffer = async (callOfferData) => {
        const token = localStorage.getItem('access_token')
        if(token){
            try {
                const response = await axios.post(`${API_URL}/appel-offre`, callOfferData,
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
        create_callOffer,
        get_callOffers
    };
}