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

    //fonction pour récupérer les informations sur le projet
    const getDAO = async(dossier) => {
        const token = localStorage.getItem('access_token') 
        //Si l'utilisateur est connecté
        if (token) {
            try{
                const response = await axios.get(`${API_URL}/appel-offre?dossier=${dossier}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                //renvoyer une erreur 404 si il n'y pas de projet correspondant à l'ID
                return response.data;  
            } catch(error){
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

    //mettre à jour un appel d'offre


    return {
        create_callOffer,
        get_callOffers,
        getDAO
    };
}