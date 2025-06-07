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
                    <h5 class="fw-bold mb-2"> Définition des prix unitaires - Montants HT en lettres et en chiffres</h5>
                    <div class="col-md-12">    
                          <RichTextarea v-model="prix_unitaires"/>
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

import { useRoute, useRouter } from 'vue-router';
import PieceNavigator from "@/components/PieceNavigator.vue";
import Loader from "@/components/Loader.vue";
import { useAppelOffre } from '@/composables/useAppelOffre';

const route = useRoute();
const router = useRouter();
const dossier = route.params.project_id      //recuperation de l'identifiant du projet
const dao = ref({}); 
const isLoading = ref(true);

const { getDAO } = useAppelOffre() 
 

onMounted(async () => {
    try {
        isLoading.value = true;
        const responseDAO = await getDAO(dossier)
        dao.value = responseDAO[0];    
 
    } catch (error) {
        console.error("Erreur lors de la récupération du DAO :", error) 
    } finally{
        isLoading.value = false;
    }
})



const prix_unitaires = ref(`
<table>
  <thead>
    <tr>
      <th>N°</th>
      <th>Désignation</th>
      <th>Unité</th>
      <th>PU HT en chiffre</th>
      <th>PU HT en lettre</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

`)

</script>