import api from '@/utils/api'

const API_URL = 'http://localhost:8000/api/marche-conception-realisation';

export function useConceptionRealisation() {
    // ===== AAO =====
    const get_aao = async (id_projet) => {
        try {
            const response = await api.get(`${API_URL}/${id_projet}/aao`);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject({ detail: error.message });
            }
        }
    }

    const create_aao = async (id_projet, aaoData) => {
        try {
            const response = await api.post(`${API_URL}/${id_projet}/aao`, aaoData);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject({ detail: error.message });
            }
        }
    }

    const update_aao = async (id_projet, aaoData) => {
        try {
            const response = await api.put(`${API_URL}/${id_projet}/aao`, aaoData);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject({ detail: error.message });
            }
        }
    }

    // ===== RPAO =====
    const get_rpao = async (id_projet) => {
        try {
            const response = await api.get(`${API_URL}/${id_projet}/rpao`);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject({ detail: error.message });
            }
        }
    }

    const create_rpao = async (id_projet, rpaoData) => {
        try {
            const response = await api.post(`${API_URL}/${id_projet}/rpao`, rpaoData);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject({ detail: error.message });
            }
        }
    }

    const update_rpao = async (id_projet, rpaoData) => {
        try {
            const response = await api.put(`${API_URL}/${id_projet}/rpao`, rpaoData);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject({ detail: error.message });
            }
        }
    }

    // ===== Grille de notation (concours) =====
    const get_grille_notation = async (id_projet) => {
        try {
            const response = await api.get(`${API_URL}/${id_projet}/grille_notation`);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject({ detail: error.message });
            }
        }
    }

    const create_grille_notation = async (id_projet, grilleData) => {
        try {
            const response = await api.post(`${API_URL}/${id_projet}/grille_notation`, grilleData);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject({ detail: error.message });
            }
        }
    }

    const update_grille_notation = async (id_projet, grilleData) => {
        try {
            const response = await api.put(`${API_URL}/${id_projet}/grille_notation`, grilleData);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject({ detail: error.message });
            }
        }
    }

    // ===== CCAP =====
    const get_ccap = async (id_projet) => {
        try {
            const response = await api.get(`${API_URL}/${id_projet}/ccap`);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject({ detail: error.message });
            }
        }
    }

    const create_ccap = async (id_projet, ccapData) => {
        try {
            const response = await api.post(`${API_URL}/${id_projet}/ccap`, ccapData);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject({ detail: error.message });
            }
        }
    }

    const update_ccap = async (id_projet, ccapData) => {
        try {
            const response = await api.put(`${API_URL}/${id_projet}/ccap`, ccapData);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject({ detail: error.message });
            }
        }
    }

    // ===== TDR (Termes de référence) =====
    const get_tdr = async (id_projet) => {
        try {
            const response = await api.get(`${API_URL}/${id_projet}/tdr`);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject({ detail: error.message });
            }
        }
    }

    const create_tdr = async (id_projet, tdrData) => {
        try {
            const response = await api.post(`${API_URL}/${id_projet}/tdr`, tdrData);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject({ detail: error.message });
            }
        }
    }

    const update_tdr = async (id_projet, tdrData) => {
        try {
            const response = await api.put(`${API_URL}/${id_projet}/tdr`, tdrData);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject({ detail: error.message });
            }
        }
    }

    // ===== CCTP =====
    const get_cctp = async (id_projet) => {
        try {
            const response = await api.get(`${API_URL}/${id_projet}/cctp`);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject({ detail: error.message });
            }
        }
    }

    const create_cctp = async (id_projet, cctpData) => {
        try {
            const response = await api.post(`${API_URL}/${id_projet}/cctp`, cctpData);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject({ detail: error.message });
            }
        }
    }

    const update_cctp = async (id_projet, cctpData) => {
        try {
            const response = await api.put(`${API_URL}/${id_projet}/cctp`, cctpData);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject({ detail: error.message });
            }
        }
    }

    // ===== BPU / DQE (table dynamique) =====
    const get_bpu_dqe = async (id_projet) => {
        try {
            const response = await api.get(`${API_URL}/${id_projet}/bpu_dqe`);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject({ detail: error.message });
            }
        }
    }

    const create_bpu_dqe = async (id_projet, dqeData) => {
        try {
            const response = await api.post(`${API_URL}/${id_projet}/bpu_dqe`, dqeData);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject({ detail: error.message });
            }
        }
    }

    const update_bpu_dqe = async (id_projet, dqeData) => {
        try {
            const response = await api.put(`${API_URL}/${id_projet}/bpu_dqe`, dqeData);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject({ detail: error.message });
            }
        }
    }

    // ===== Modèle de marché =====
    const get_modele_marche = async (id_projet) => {
        try {
            const response = await api.get(`${API_URL}/${id_projet}/modele_marche`);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject({ detail: error.message });
            }
        }
    }

    const create_modele_marche = async (id_projet, modeleData) => {
        try {
            const response = await api.post(`${API_URL}/${id_projet}/modele_marche`, modeleData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject({ detail: error.message });
            }
        }
    }

    const update_modele_marche = async (id_projet, modeleData) => {
        try {
            const response = await api.put(`${API_URL}/${id_projet}/modele_marche`, modeleData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject({ detail: error.message });
            }
        }
    }

    // ===== Justificatifs des études préalables =====
    const get_etude_prealable = async (id_projet) => {
        try {
            const response = await api.get(`${API_URL}/${id_projet}/etude_prealable`);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject({ detail: error.message });
            }
        }
    }

    const create_etude_prealable = async (id_projet, etudeData) => {
        try {
            const response = await api.post(`${API_URL}/${id_projet}/etude_prealable`, etudeData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject({ detail: error.message });
            }
        }
    }

    const update_etude_prealable = async (id_projet, etudeData) => {
        try {
            const response = await api.put(`${API_URL}/${id_projet}/etude_prealable`, etudeData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject({ detail: error.message });
            }
        }
    }

    return {
        get_aao, create_aao, update_aao,
        get_rpao, create_rpao, update_rpao,
        get_grille_notation, create_grille_notation, update_grille_notation,
        get_ccap, create_ccap, update_ccap,
        get_tdr, create_tdr, update_tdr,
        get_cctp, create_cctp, update_cctp,
        get_bpu_dqe, create_bpu_dqe, update_bpu_dqe,
        get_modele_marche, create_modele_marche, update_modele_marche,
        get_etude_prealable, create_etude_prealable, update_etude_prealable,
    }
}
