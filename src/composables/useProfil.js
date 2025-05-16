import axios from 'axios'

const API_URL = 'http://localhost:8000/api'; 

export function useProfil(){ 
    const getProfil = async() => {
        const token = localStorage.getItem('access_token')
        console.log(token);
        if (token) {
            try{
                const response = await axios.get(`${API_URL}/profil`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }) 
                return response.data
            } catch(error){
                console.log("Erreur lors de la récupération des informations")
            }
        }
    }

    const updateProfil = async(userData) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            try{
                const response = await axios.put(`${API_URL}/profil/`, userData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log('Profil mis à jour avec succès', response.data);
                return response.data;
            } catch(error){
                console.log("Erreur lors de la mise à jour du profil", error); 
            }
        }
    }

    return {
        getProfil,
        updateProfil
    }
}