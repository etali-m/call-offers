import axios from 'axios'
import { ref } from 'vue'

const API_URL = 'http://localhost:8000/api/marche-de-travaux'; 
const user = ref(null); 

export function useTravaux() {
    // fonction pour récupérer les données d'un avis d'appel d'offre
    const get_aao = async (id_projet) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            try {
                const response = await axios.get(`${API_URL}/${id_projet}/aao`,
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

    //créer un avis d'appel d'offre
    const create_aao = async (id_projet, aaoData) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            try {
                const response = await axios.post(`${API_URL}/${id_projet}/aao`, aaoData,
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

    //mettre à jour un avis d'appel d'offre
    const update_aao = async (id_projet, aaoData) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            try {
                const response = await axios.put(`${API_URL}/${id_projet}/aao`, aaoData,
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

    //fonction pour récupérer les données d'un RPAO
    const get_rpao = async (id_projet) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            try {
                const response = await axios.get(`${API_URL}/${id_projet}/rpao`,
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

    //créer le règlement de l'appel d'offre
    const create_rpao = async (id_projet, rpaoData) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            try {
                const response = await axios.post(`${API_URL}/${id_projet}/rpao`, rpaoData,
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

    //mettre à jour un rpao
    const update_rpao = async (id_projet, rpaoData) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            try {
                const response = await axios.put(`${API_URL}/${id_projet}/rpao`, rpaoData,
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

    //fonction pour récupérer les données d'un CCAP
    const get_ccap = async (id_projet) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            try {
                const response = await axios.get(`${API_URL}/${id_projet}/ccap`,
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

    //créer le règlement de l'appel d'offre
    const create_ccap = async (id_projet, ccapData) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            try {
                const response = await axios.post(`${API_URL}/${id_projet}/ccap`, ccapData,
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

    //mettre à jour un ccap
    const update_ccap = async (id_projet, ccapData) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            try {
                const response = await axios.put(`${API_URL}/${id_projet}/ccap`, ccapData,
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

    //fonctions pour récupérer les données du cctp
    const get_cctp = async (id_projet) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            try {
                const response = await axios.get(`${API_URL}/${id_projet}/cctp`,
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

    //créer le règlement de l'appel d'offre
    const create_cctp = async (id_projet, cctpData) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            try {
                const response = await axios.post(`${API_URL}/${id_projet}/cctp`, cctpData,
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

    //mettre à jour un ccap
    const update_cctp = async (id_projet, cctpData) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            try {
                const response = await axios.put(`${API_URL}/${id_projet}/ccap`, cctpData,
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

    //fonctions pour récupérer les données d'un BPU
    const get_bpu = async (id_projet) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            try {
                const response = await axios.get(`${API_URL}/${id_projet}/bpu`,
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

    //créer le bordereau des prix unitaires
    const create_bpu = async (id_projet, bpuData) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            try {
                const response = await axios.post(`${API_URL}/${id_projet}/bpu`, bpuData,
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

    //mettre à jour un bpu
    const update_bpu = async (id_projet, bpuData) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            try {
                const response = await axios.put(`${API_URL}/${id_projet}/bpu`, bpuData,
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

    //Fonction pour la gestion du DQE 
    //Récupérer les informations sur le DQE
    const get_dqe = async (id_projet) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            try {
                const response = await axios.get(`${API_URL}/${id_projet}/dqe`,
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

    //créer le devis estimatif et quantitatif
    const create_dqe = async (id_projet, dqeData) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            try {
                const response = await axios.post(`${API_URL}/${id_projet}/dqe`, dqeData,
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

    //mettre à jour un dqe
    const update_dqe = async (id_projet, dqeData) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            try {
                const response = await axios.put(`${API_URL}/${id_projet}/dqe`, dqeData,
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

    //recuperer les données sur le modèle de marché
    const get_modele_marche = async (id_projet) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            try {
                const response = await axios.get(`${API_URL}/${id_projet}/modele_marche`,
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

    //créer le modèle de marché
    const create_modele_marche = async (id_projet, modeleData) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            try {
                const response = await axios.post(`${API_URL}/${id_projet}/modele_marche`, modeleData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data',
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

    //mettre à jour un dqe
    const update_modele_marche = async (id_projet, modeleData) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            try {
                const response = await axios.put(`${API_URL}/${id_projet}/modele_marche`, modeleData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data',
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
        update_aao,
        get_rpao,
        create_rpao,
        update_rpao,
        get_ccap,
        create_ccap,
        update_ccap,
        get_cctp,
        create_cctp,
        update_cctp,
        get_bpu,
        create_bpu,
        update_bpu,
        get_dqe,
        create_dqe,
        update_dqe,
        get_modele_marche,
        create_modele_marche,
        update_modele_marche,
    }
}