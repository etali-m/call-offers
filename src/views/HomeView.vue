<template>
    <Loader v-if="isLoading"/>
    <div v-else>
        <h3>Bonjour, John</h3>
        <p>Créez un nouveau dossier d'appel d'offre</p>

        <div class="row mt-3">
            <!-- Debut de la boucle -->
                <div v-for="type in typesMarche" :key="type.id" class="col-md-3 template-box">
                    <div class="template-card">   
                        <router-link :to="{ name: 'create', params: { slug: type.slug } }">
                            <img :src="getImageUrl(type.image_garde)" :alt="type.nom">
                            <p class="template-title">{{ type.nom }}</p>
                        </router-link>
                    </div>
                </div>
            <!-- fin de la boucle -->
            <div class="d-flex justify-content-end">
                <span class="text-primary" id="more_template" style="cursor:pointer;">Plus de modèle <i class="bi bi-arrow-down-short"></i></span>
            </div>
        </div> <br><br>

        <h4 class="mt-4">Projets recents</h4>
        <table class="table mb-4">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Type de marché</th>
                    <th>Date de création</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="projet in projets" :key="projet.id">
                    <td>
                        <span class="text-primary" style="cursor:pointer;"> <router-link :to="{ name: 'edit', params: { project_id: projet.id } }"> {{ projet.objet_appel }} </router-link> </span> <br>
                        <small>{{ projet.maitre_ouvrage }}</small>
                    </td>
                    <td>{{ projet.type_marche_nom }}</td>
                    <td>{{ projet.date_creation }}</td>
                </tr>
            </tbody>
        </table>
        <br>
    </div>
   
</template>

<script>

import axios from 'axios'
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { utils } from '@/composables/utils';
import { useAppelOffre } from '@/composables/useAppelOffre';
import Loader from '@/components/Loader.vue';

export default {
    name: 'HomeView',
    components: { Loader },
    setup () {
        const email = ref('')
        const route = useRoute()
        const API_URL = 'http://localhost:8000/api'
        const typesMarche = ref([]);
        const projets = ref([]);
        const isLoading = ref(true);

        //recupération de la fonctio pour le chemin image
        const { getImageUrl } = utils()
        const { get_callOffers } = useAppelOffre()


        //fonction pour récuperer tout les types de marché
        const getTypesMarche = async() => {
            const token = localStorage.getItem('access_token')
            if (token) {
                try{
                    const response = await axios.get(`${API_URL}/type-marche`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    })
                    typesMarche.value = response.data
                    console.log(typesMarche)
                } catch(error){
                    console.log("Erreur lors de la récupération des informations: ", error)
                }
            }
        }

        onMounted(async() => {
            email.value = route.query.email;
            getTypesMarche()
            
            try {
                isLoading.value = true;
                const responseDAO = await get_callOffers()
                projets.value = responseDAO;    
            } catch (error) {
                console.error("Erreur lors de la récupération du DAO :", error) 
            } finally{
                isLoading.value = false;
            }
        }) 

        return {
            email,
            typesMarche, 
            projets,
            isLoading,
            getImageUrl
        }
    }
}
</script>

<style scoped>
.template-card a{
    color: #202124;
    text-decoration: none;
}

.template-title{
    font-weight: bold;
    font-size: 14px;
    margin-top: 5px;
}

.template-card img {
    width: 200px;
    height: auto; 
    border: 1px solid rgb(218, 220, 224);
    border-radius: 5px;
}

.template-card img:hover {
    border: 1px solid #f38b04;
    margin-bottom:1px;
}

#template_list{
    display: none;
}
</style>