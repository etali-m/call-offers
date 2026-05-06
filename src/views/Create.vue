<template>
   <div class="row gx-2">
        <div class="col-md-4">
            <div class="new_project_image_block text-center">
                <img :src="getImageUrl(marche.image_garde)" alt="Image"> 
            </div>  
        </div>
        <div class="col-md-8 card shadow-custom p-4">
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
                <!-- Section Maître d'Ouvrage --> 
                <div class="section-body">

                    <!-- Objet -->
                    <div class="row">
                        <div class="col-md-12">
                            <label class="label-custom">Objet de l'Appel d'Offre <span class="required">*</span></label>
                            <textarea
                            v-model="objet"
                            class="textarea-custom"
                            placeholder="Entrez l'objet de l'appel d'offre"
                            rows="4"
                            ></textarea>
                        </div>
                    </div>

                    <!-- Logo -->
                    <div class="row">
                    <div class="col-md-12">
                        <label class="label-custom">Logo du Maître d'Ouvrage</label>
                        <div class="logo-upload-wrapper">
                        <div v-if="logoPreview" class="logo-preview">
                            <img :src="logoPreview" alt="Logo MOA" width="100" height="100"/>
                            <button type="button" class="btn-remove-logo" @click="supprimerLogo">✕</button>
                        </div>
                        <label v-else class="logo-upload-area">
                            <input type="file" accept="image/*" @change="onLogoChange" hidden />
                            <span class="upload-icon">📁</span>
                            <span>Cliquez pour ajouter un logo</span>
                            <small>PNG, JPG — max 2 Mo</small>
                        </label>
                        </div>
                    </div>
                    </div>

                    <!-- Nom + Dénomination -->
                    <div class="row">
                    <div class="col-md-10">
                        <label class="label-custom">Nom du Maître d'Ouvrage ou délégué <span class="required">*</span></label>
                        <input
                        v-model="moa"
                        type="text"
                        class="input-custom"
                        required
                        placeholder="Ex : Ministère des Travaux Publics"
                        />
                    </div>
                    <div class="col-md-2">
                        <label class="label-custom">Dénomination <span class="required">*</span></label>
                        <input
                        v-model="denomination"
                        type="text"
                        class="input-custom"
                        required
                        placeholder="Ex : MINTP"
                        />
                    </div>
                    </div>

                    <!-- Région + Département -->
                    <div class="row">
                    <div class="col-md-6">
                        <label class="label-custom">Région</label>
                        <select v-model="region" class="input-custom">
                        <option value="" disabled>-- Sélectionnez une région --</option>
                        <option v-for="r in regions" :key="r" :value="r">{{ r }}</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label class="label-custom">Département</label>
                        <input
                        v-model="departement"
                        type="text"
                        class="input-custom"
                        placeholder="Ex : Mfoundi"
                        />
                    </div>
                    </div>

                    <!-- Service -->
                    <div class="row">
                    <div class="col-md-12">
                        <label class="label-custom">Service</label>
                        <input
                        v-model="service"
                        type="text"
                        class="input-custom"
                        placeholder="Ex : Direction des Infrastructures Routières"
                        />
                    </div>
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
                            <option value="National" selected>National</option>
                            <option value="International">International</option> 
                        </select>
                    </div>
                    <div class="col">
                        <label class="label-custom" for="mode_passation">Mode de passation</label>
                        <select v-model="mode_dao" class="select-custom" id="mode_passation"> 
                            <option value="Ouvert">Ouvert</option>
                            <option value="Restreint">Restreint</option>
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
                        <label class="label-custom" for="dossier">Financement</label>
                        <input type="text" v-model="financement" class="input-custom" placeholder="source du financement" required>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <label class="label-custom" for="dossier">Imputation</label>
                        <input type="text" v-model="imputation" class="input-custom" required placeholder="Détails de l'imputation budgétaire">
                    </div>
                </div> 

                <button type="submit" class="btn-custom mt-3">
                    <span v-if="isLoading">
                      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Chargement...
                    </span>
                    <span v-else>Créer le dossier</span>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { utils } from '@/composables/utils'
import { useAppelOffre } from '@/composables/useAppelOffre'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    setup() {
        const marche = ref({})
        const route = useRoute() //pour récupérer les paramètres de routes
        const router = useRouter() //Router pour redirection
        const slug = route.params.slug 
        const API_URL = 'http://localhost:8000/api'

        const message = ref(''); //message d'inscription réussi
        const isLoading = ref(false);
        const errors = ref({});
        const objet = ref('')
        const moa = ref('')
        const denomination = ref('')
        const region       = ref('')
        const departement  = ref('')
        const service      = ref('') 
        const logo         = ref(null)       // fichier File
        const logoPreview  = ref(null)
        // Régions du Cameroun
        const regions = [
        'Adamaoua', 'Centre', 'Est', 'Extrême-Nord',
        'Littoral', 'Nord', 'Nord-Ouest', 'Ouest', 'Sud', 'Sud-Ouest'
        ]
        const commission = ref('')
        const type_dao = ref('')
        const mode_dao = ref('')
        const numero_dossier = ref('')
        const exercice_budgetaire = ref('')
        const financement = ref('')
        const imputation = ref('')

        function onLogoChange(event) {
            const fichier = event.target.files[0]
            if (!fichier) return

            if (fichier.size > 2 * 1024 * 1024) {
                alert('Le fichier est trop volumineux (max 2 Mo)')
                return
            }

            logo.value = fichier

            // Générer l'aperçu base64
            const reader = new FileReader()
            reader.onload = (e) => { logoPreview.value = e.target.result }
            reader.readAsDataURL(fichier)
        }

        function supprimerLogo() {
            logo.value        = null
            logoPreview.value = null
        }


        const { getImageUrl } = utils() //fontion pour réguperer l'image
        const { create_callOffer } = useAppelOffre()

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

        //enregistrement d'un DAO
        const handleSubmit = async () => {
            errors.value = {}
            isLoading.value = true; 
            const formData = new FormData()

            formData.append('type_marche',         marche.value.id)
            formData.append('objet_appel',         objet.value)
            formData.append('maitre_ouvrage',      moa.value)
            formData.append('region',              region.value)
            formData.append('departement',         departement.value)
            formData.append('service',             service.value)
            formData.append('denomination',        denomination.value)
            formData.append('commission_marche',   commission.value)
            formData.append('type_dossier',        type_dao.value)
            formData.append('mode_passation',      mode_dao.value)
            formData.append('numero_dossier',      numero_dossier.value)
            formData.append('exercice_budgetaire', exercice_budgetaire.value)
            formData.append('financement',         financement.value)
            formData.append('imputation',          imputation.value)

            // ✅ Vérification stricte avant d'ajouter le logo
            if (logo.value && logo.value instanceof File) {
                formData.append('logo', logo.value, logo.value.name)
                console.log('Logo ajouté au FormData:', logo.value.name)
            } else {
                console.log('ℹPas de logo, champ ignoré')
                // Ne pas envoyer le champ du tout si pas de fichier
                // car logo est blank=True, null=True dans le modèle
            }

            try {
                
                console.log(formData);
                const response = await create_callOffer(formData);

                // Récupération des données renvoyées par l'API
                const projectId = response.data.id; 

                //Définition du message
                message.value = response.message

                //toast pour informer l'utilisateur
                toast.success(message, {
                    theme: 'colored',
                    autoClose: 2000,
                });

                //rediriger vers la page de gestion du dossier d'appel d'offre
                setTimeout(() => {
                    router.push({ name: 'edit', params: { project_id: projectId } }); 
                }, 3000);
                
            } catch (err) { 
                toast.error(err, {
                    theme: 'colored',
                    autoClose: 2000,
                });
                errors.value = err;
            }finally {
                isLoading.value = false; //
            }
      };

        return {
            marche,
            getImageUrl,
            objet,
            moa,
            denomination,
            commission,
            region,
            departement,
            service,
            logo,
            logoPreview,
            regions,
            type_dao,
            mode_dao,
            numero_dossier,
            exercice_budgetaire,
            financement,
            imputation, 
            errors,
            isLoading,
            onLogoChange,
            supprimerLogo,
            handleSubmit,
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