<template>
      <Loader v-if="isLoading" />
      <div v-else>
            <HeaderPiece numero_piece="1" :numero_dossier="dao.numero_appel_offre" :moe="dao.maitre_ouvrage" :description_travaux="dao.objet_appel"/>

            <PieceNavigator 
                  :project-id="dao.id"
                  :current-piece-name="$route.name"
                  />

                  <div class="form-container">  
            <form @submit.prevent="handleSubmit" style="padding-left:10px;">
            <StepperForm :totalSteps="1" v-slot="{ currentStep, nextStep, prevStep, isLastStep }">
            <div v-if="currentStep === 0">
                  <div class="mt-3">
                        <h5 class="fw-bold mb-2">Clauses techniques </h5>
                        <div class="col-md-12">    
                              <RichTextarea v-model="clauses_techniques"/>
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

<script setup>
import { ref, onMounted } from 'vue'
import RichTextarea from '@/components/RichTextarea.vue';
import HeaderPiece from '@/components/HeaderPiece.vue'
import StepperForm from '@/components/StepperForm.vue' 
import { toast } from 'vue3-toastify'; 
import { useRoute, useRouter } from 'vue-router';
import PieceNavigator from "@/components/PieceNavigator.vue";
import Loader from "@/components/Loader.vue"; 
import { useAppelOffre } from '@/composables/useAppelOffre'; 
import { usePiece } from '@/composables/usePiece';
import { useTravaux } from '@/composables/useTravaux';

const route = useRoute();
const router = useRouter();
const dossier = route.params.project_id      //recuperation de l'identifiant du projet
const dao = ref({}); 
const isLoading = ref(true);
const pieces = ref([])  
const current_piece = route.name
const id_piece = ref()
const trouve = ref(false) 
const message = ref(''); //message d'enregistrement reussi
const errors = ref({});

const { getDAO } = useAppelOffre() 
const { get_pieces, update_piece } =  usePiece()
const { get_cctp, create_cctp, update_cctp} = useTravaux() 

const clauses_techniques = ref('')

onMounted(async () => {
    try {
        isLoading.value = true;
        const responseDAO = await getDAO(dossier)
        const responsePiece = await get_pieces(dossier)
        pieces.value = responsePiece 
        //récuperer les informations sur le dossier d'appel d'offre.
        dao.value = responseDAO[0];    

        const responseCCTP = await get_cctp(dossier)

        // Une fois les pièces chargées, on met à jour l’index courant
        const index = pieces.value.findIndex(p => p.piece.nom_composant === current_piece);
        id_piece.value = pieces.value[index].id;  

        if(responseCCTP && responseCCTP.length > 0){
          trouve.value = true
          dqe.value = responseCCTP[0].clauses_techniques
        }
 
    } catch (error) {
        console.error("Erreur lors de la récupération du DAO :", error) 
    } finally{
        isLoading.value = false;
    }
})


//soumission du formulaire
const handleSubmit = async () => {
    errors.value = {}
    isLoading.value = true; 

    try {
        const cctpData = {  
            clauses_techniques : clauses_techniques.value
        };
 
        if(trouve.value){
            const response = await update_cctp(dossier, cctpData)
            message.value = response.message
        }else {
            const response = await create_cctp(dossier, cctpData)
            //mise à jour du statut de la piece
            const update = await update_piece(id_piece.value, true);

            //Définition du message
            message.value = response.message 
        }
        console.log(message);  
        //toast pour informer l'utilisateur
        toast.success(message, {
            theme: 'colored',
            autoClose: 5000,
        });
        
    } catch (err) { 
        toast.error(err, {
            theme: 'colored',
            autoClose: 2000,
        });
        errors.value = err;
        console.log(err)
    }finally {
        isLoading.value = false; 
    }
}

</script>