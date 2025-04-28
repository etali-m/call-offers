const API_URL = 'http://localhost:8000'; 

export function utils() {
    //fonction pour obtenir le chemin url
    const getImageUrl = (imagePath) => {
        //on va ajouter l'adresse du backent au chemin de l'image enregistrée.
        return imagePath ? `${API_URL}${imagePath}` : ''
    }

    return {
        getImageUrl,
    }
}