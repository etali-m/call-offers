<template>
   <div class="row gx-2">
        <div class="col-md-4">
            <div class="new_project_image_block text-center">
                <img :src="getImageUrl(marche.image_garde)" alt="Image"> 
            </div>  
        </div>
        <div class="col-md-8 card shadow-custom">
            <form @submit.prevent="handleSubmit">
                <h4 class="fw-bold">Nouveau dossier d'appel d'offre</h4>
                <div class="d-flex justify-content-between">
                    <small>- {{ marche.nom }}  </small> 
                    <!-- Button trigger modal -->
                    <a type="button" class="text-info" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <i class="bi bi-info-circle"></i>
                    </a>
                    
                    <!-- Modal information sur le type de marché -->
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel"> {{ marche.nom }} </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                {{ marche.description }}
                            </div>
                            <div class="modal-footer">
                            <button type="button" class="btn btn-sm btn-danger" data-bs-dismiss="modal">Fermer</button> 
                            </div>
                        </div>
                        </div>
                    </div>

                </div>
                <div class="row">
                    <div class="col-md-12">
                        <label class="label-custom" for="">Objet de l'appel d'offre</label>
                        <textarea v-model="objet" class="textarea-custom" placeholder="Entrez l'objet de l'appel d'offre"></textarea>
                    </div>
                    <div class="col-md-10">
                        <label class="label-custom" for="">Nom du Maître d'ouvrage ou du maître d'ouvrage délégué</label>
                        <input v-model="moa" type="text" class="input-custom" required placeholder="Ministère des travaux publics">
                    </div>
                    <div class="col-md-2">
                        <label class="label-custom" for="">Dénomination</label>
                        <input v-model="denomination" type="text" class="input-custom" required placeholder="MINTP">
                    </div>
                </div>
                <label class="label-custom" for="commission">Commission de passation des marchés</label>
                <select id="commission" v-model="commission" class="select-custom">
                    <option value="cipm" selected>Commission interne de passation des marchés</option>
                    <option value="crpm">Commission régionale de passation des marchés</option>
                    <option value="cdpm">Commission départementale de passation des marchés</option>
                    <option value="cspm">Commission spéciale de passation des marchés</option>
                </select>

                <div class="row">
                    <div class="col">
                        <label class="label-custom" for="dossier">Type de dossier d'appel d'offre</label>
                        <select v-model="type_dao" class="select-custom" id="dossier">
                            <option value="national" selected>National</option>
                            <option value="international">International</option>
                            <option value="ouver">Ouvert</option>
                            <option value="restreint">Restreint</option>
                        </select>
                    </div>
                    <div class="col">
                        <label class="label-custom" for="dossier">Numéro du dossier</label>
                        <input type="number" v-model="numero_dossier" class="input-custom" required placeholder="N°00083">
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <label class="label-custom" for="dossier">Exercice budgétaire</label>
                        <input type="number" v-model="exercice_budgetaire" min="2024" class="input-custom" placeholder="2024" required>
                    </div>
                    <div class="col">
                        <label class="label-custom" for="dossier">Date de signature de l'avis d'appel d'offre</label>
                        <input type="date" v-model="date" class="input-custom" required>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <label class="label-custom" for="dossier">Financement</label>
                        <input type="text" v-model="financement" class="input-custom" placeholder="source du financement" required>
                    </div>
                    <div class="col">
                        <label class="label-custom" for="dossier">Imputation</label>
                        <input type="text" v-model="imputation" class="input-custom" required placeholder="Détails de l'imputation budgétaire">
                    </div>
                </div>
                
                
                <button type="submit" class="btn-custom mt-3">Créer le dossier</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { utils } from '@/composables/utils'

export default {
    setup() {
        const marche = ref({})
        const route = useRoute()
        const slug = route.params.slug 
        const API_URL = 'http://localhost:8000/api'

        const { getImageUrl } = utils()

        //fonction pour récuperer le type de marché choisi
        const getMarche = async() => {
            const token = localStorage.getItem('access_token') 
            if (token) {
                try{
                    const response = await axios.get(`${API_URL}/type-marche?slug=${slug}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    })
                    marche.value = response.data[0]
                    console.log(marche)
                } catch(error){
                    console.log("Erreur lors de la récupération des informations: ", error)
                }
            }
        }

        //chargment de lapage
        onMounted(() => {
            getMarche()
        })

        return {
            marche,
            getImageUrl
        }
    }
}
</script>

<style scoped>
    .new_project_image_block img{
            width: 95%;
            height: auto;
            border: 1px solid var(--border);
            border-radius: 8px;
        }  
</style>