<template>
    <Loader v-if="isLoading" />
    <div v-else>
        <HeaderPiece numero_piece="1" nom_piece="AVIS D'APPEL D'OFFRE" :numero_dossier="dao.numero_appel_offre" :moe="dao.maitre_ouvrage" :description_travaux="dao.objet_appel"/>
  
        <PieceNavigator
            :pieces="pieces"
            :project-id="dao.id"
            :current-piece-name="$route.name"
            />

        <div class="form-container">  
            <form @submit.prevent="handleSubmit" style="padding-left:10px;">
                <StepperForm :totalSteps="20" v-slot="{ currentStep, nextStep, prevStep, isLastStep }">
                <div v-if="currentStep === 0"> 
                    <div class="mt-3">
                        <h5 class="fw-bold mb-2">{{ currentStep + 1 }}. Objet de l'appel d'offre</h5>
                        <div class="col-md-12">    
                            <RichTextarea v-model="objet_appel"/>
                        </div>
                    </div>
                </div>

                <div v-else-if="currentStep === 1"> 
                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">{{ currentStep + 1 }}. Consistence des travaux</h5>
                        <div class="col-md-12">    
                            <RichTextarea v-model="constence_travaux"/>
                        </div>
                    </div>
                </div>

                <div v-else-if="currentStep === 2"> 
                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">{{ currentStep + 1 }}. Tranches/Allotissement</h5>
                        <div class="col-md-12">    
                            <RichTextarea v-model="tranches"/>
                        </div>
                    </div>
                </div>

                <div v-else-if="currentStep === 3"> 
                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">{{ currentStep + 1 }}. Coût prévisionnel</h5>
                        <div class="col-md-12">    
                            <RichTextarea v-model="cout_previsionnel"/>
                        </div>
                    </div>
                </div>

                <div v-else-if="currentStep === 4"> 
                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">{{ currentStep + 1 }}. Délai prévisionnel d’exécution</h5>
                        <div class="col-md-12">    
                            <RichTextarea v-model="delai_previsionnel"/>
                        </div>
                    </div>
                </div>

                <div v-else-if="currentStep === 5"> 
                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">{{ currentStep + 1 }}. Participation et origine</h5>
                        <div class="col-md-12">    
                            <RichTextarea v-model="participation_origine"/>
                        </div>
                    </div>
                </div>

                <div v-else-if="currentStep === 6"> 
                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">{{ currentStep + 1 }}. Financement</h5>
                        <div class="col-md-12">    
                            <RichTextarea v-model="financement"/>
                        </div>
                    </div>
                </div>

                <div v-else-if="currentStep === 7">
                    <h5 class="fw-bold mb-4">{{ currentStep + 1 }}. Mode de soumission</h5>
                    <div class="row">
                        <div class="col-md-12">   
                            <label for="consistence_travaux">Le mode de soumission retenu pour cette consultation est </label>
                            <select class="select-custom">
                                <option value="en ligne">En ligne</option>
                                <option value="hors ligne">Hors ligne</option>
                                <option value="en ligne ou hors ligne">En ligne ou hors ligne</option>
                            </select>  
                        </div>
                    </div> 
                </div>

                <div v-else-if="currentStep === 8"> 
                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">{{ currentStep + 1 }}. Cautionnement de soumission</h5>
                        <div class="col-md-12">    
                            <RichTextarea v-model="cautionnement"/>
                        </div>
                    </div> 
                </div>

                <div v-else-if="currentStep === 9"> 
                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">{{ currentStep + 1 }}. Consultation du Dossier d'Appel d'Offres</h5>
                        <div class="col-md-12">    
                            <RichTextarea v-model="consultation"/>
                        </div>
                    </div>  
                </div>

                <div v-else-if="currentStep === 10"> 
                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">{{ currentStep + 1 }}. Acquisition du Dossier d'Appel d'Offres</h5>
                        <div class="col-md-12">    
                            <RichTextarea v-model="acquisition_dao"/>
                        </div>
                    </div>  
                </div>

                <div v-else-if="currentStep === 11">
                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">{{ currentStep + 1 }}. Remise des offres</h5>
                        <div class="col-md-12">    
                            <RichTextarea v-model="remise_offre"/>
                        </div>
                    </div>   
                </div>

                <div v-else-if="currentStep === 12"> 
                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">{{ currentStep + 1 }}. Recevabilité des plis</h5>
                        <div class="col-md-12">    
                            <RichTextarea v-model="recevabilite_plis"/>
                        </div>
                    </div>   
                </div>

                <div v-else-if="currentStep === 13"> 
                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">{{ currentStep + 1 }}. Ouverture des plis</h5>
                        <div class="col-md-12">    
                            <RichTextarea v-model="ouverture_plis"/>
                        </div>
                    </div>   
                </div>

                <div v-else-if="currentStep === 14">
                    <h5 class="fw-bold mb-4">{{ currentStep + 1 }}. Critères d’évaluation</h5>
                    <div class="row">
                        <div class="col-md-12">   
                            <h6 class="fw-bold mb-2">{{ currentStep + 1 }}.1 Critères éliminatoires</h6> 
                            <div class="col-md-12">    
                                <RichTextarea v-model="critere_eliminatoire"/>
                            </div>
                        </div> <br>
                        <div class="col-md-12 mt-4">
                            <h6 class="fw-bold mb-2">{{ currentStep + 1 }}.2 Critères essentielles</h6>
                            <div class="col-md-12">    
                                <RichTextarea v-model="critere_essentiels"/>
                            </div>
                        </div>
                    </div> 
                </div>

                <div v-else-if="currentStep === 15">
                    <h5 class="fw-bold mb-4">{{ currentStep + 1 }}. Attributions</h5>
                    <div class="row">
                        <div class="col-md-12">   
                            <label for="consistence_travaux">À qui sera attribué le marché</label>
                            <textarea class="textarea-custom" value="Le Maitre d’Ouvrage ou le Maitre d’Ouvrage Délégué attribue le marché au soumissionnaire ayant présenté une offre remplissant les critères de qualification technique et financière requises et dont l’offre est évaluée la moins disante en incluant le cas échéant les remises proposées."></textarea>
                            <p>
                                (En cas d’allotissement, indiquer le nombre maximum de lots dont le candidat peut être attributaire)
                            </p>
                        </div>
                    </div> 
                </div>

                <div v-else-if="currentStep === 16">
                    <h5 class="fw-bold mb-4">{{ currentStep + 1 }}. Nombre maximum de lots</h5>
                    <div class="row">
                        <div class="col-md-12">   
                            <label for="consistence_travaux">Nombre de lots maximum</label>
                            <input type="number" class="input-custom" placeholder="2">
                            <p>
                                (En cas d’allotissement, indiquer le nombre maximum de lots dont le candidat peut être attributaire)
                            </p>
                        </div>
                    </div> 
                </div>

                <div v-else-if="currentStep === 17">
                    <h5 class="fw-bold mb-4">{{ currentStep + 1 }}. Durée de validité des offres</h5>
                    <div class="row">
                        <div class="col-md-12">   
                            <label for="consistence_travaux">Durée d'engagement en jours</label>
                            <input type="number" class="input-custom" placeholder="90">
                            <p>
                                à partir de la date limite initiale fixée pour la remise des offres.
                            </p>
                        </div>
                    </div> 
                </div>

                <div v-else-if="currentStep === 18">
                    <h5 class="fw-bold mb-4">{{ currentStep + 1 }}. Renseignements complémentaires</h5>
                    <div class="row">
                        <div class="col-md-12">    
                            <p>
                                Les renseignements complémentaires peuvent être obtenus aux heures ouvrables à [service (SIGAMP), numéro de porte, BP, téléphone, fax, e-mail] ou en ligne sur la plateforme COLEPS aux adresses http://www.marchespublics.cm et http://www.publiccontracts.cm, ou tout autres moyens de communication électronique indiqué par le Maître d’Ouvrage.
                            </p>
                        </div>
                    </div> 
                </div>

                <div v-else-if="currentStep === 19">
                    <h5 class="fw-bold mb-4">{{ currentStep + 1 }}. Lutte contre la corruption et les mauvaises pratiques</h5>
                    <div class="row">
                        <div class="col-md-12">   
                            <p for="consistence_travaux">Pour toute dénonciation pour des pratiques, faits ou actes de corruption ou faits de mauvaises pratiques, bien vouloir appeler la CONAC au numéro 1517, l’Autorité chargée des Marchés Publics (MINMAP) (SMS ou appel) aux numéros : (+237) 673 20 57 25 et 699 37 07 48, l’ARMP au numéro</p>
                            <label for="">Numéro maître d'ouvrage ou maître d'ouvrage délégué</label>
                            <input type="number" class="input-custom" placeholder="678 45 14 35"> 
                        </div>
                    </div> 
                </div>

                <!-- Navigation -->
                <div class="buttons mt-4 text-center">
                    <button type="button" class="btn-custom" @click="prevStep" :disabled="currentStep === 0"><i class="bi bi-arrow-left-circle"></i> Précédent</button> &nbsp;
                    <button type="button" class="btn-custom" v-if="!isLastStep" @click="nextStep">Suivant <i class="bi bi-arrow-right-circle"></i></button>
                    <button class="btn-custom" type="submit" v-else>Enregister</button>
                </div>
                </StepperForm>
            </form> 
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Loader from '@/components/Loader.vue';
import HeaderPiece from '@/components/HeaderPiece.vue'
import StepperForm from '@/components/StepperForm.vue'
import PieceNavigator from '@/components/PieceNavigator';
import RichTextarea from '@/components/RichTextarea.vue';
import { useAppelOffre } from '@/composables/useAppelOffre';
import { usePiece } from '@/composables/usePiece';
    
export default {
    components: {
        HeaderPiece,
        StepperForm,
        RichTextarea,
        PieceNavigator,
        Loader
    },

    setup() {

        const route = useRoute();
        const router = useRouter();
        const dossier = route.params.project_id      //recuperation de l'identifiant du projet
        const dao = ref({})
        const pieces = ref([]) 
        const isLoading = ref(true) 

        const { getDAO } = useAppelOffre()
        const { get_pieces } =  usePiece()

        const objet_appel = ref('')
        const constence_travaux = ref('')

        onMounted(async () => {
            try {
                isLoading.value = true;
                const responseDAO = await getDAO(dossier)
                dao.value = responseDAO[0];  // affectation des données récupérées 
                const responsePiece = await get_pieces(dossier)
                pieces.value = responsePiece  

                // VARIABLE POUR LE TRAITEMENT DES DONNÉES POUR LA PIÈCE
                objet_appel.value = `<p>Dans le cadre de........................ , le ${dao.value.maitre_ouvrage}, lance un Appel d'Offres ${dao.value.type_dossier} ${dao.value.mode_passation} pour ${dao.value.objet_appel}</p> `;

                constence_travaux.value = `<p>Les travaux comprennent notamment :</p>`;
            } catch (error) {
                console.error("Erreur lors de la récupération du DAO :", error) 
            } finally{
                isLoading.value = false;
            }
        }) 


        const handleSubmit = () => {
            console.log("Formulaire soumis :", formData)
            alert('Formulaire soumis !')
            // Appel à une API si besoin
        }

        return {
            handleSubmit,
            dao, 
            pieces,
            isLoading,
            objet_appel,
            constence_travaux,
        }
    }
}
</script>
