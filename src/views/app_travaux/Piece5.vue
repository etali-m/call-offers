<template>
      <HeaderPiece numero_piece="5" nom_piece="CAHIER DES CLAUSES TECHNIQUES PARTICULIERES" numero_dossier="0089/AONO/MINEE/CIPM/2024" moe="Ministère de l'eau et de l'energie" description_travaux="TRAVAUX DE CONSTRUCTION DES CANIVEAUX BETONNES DANS LA COMMUNE DE YAOUNDE 4"/>

      <div class="form-container">  
      <form @submit.prevent="handleSubmit" style="padding-left:10px;">
        <StepperForm :totalSteps="5" v-slot="{ currentStep, nextStep, prevStep, isLastStep }">
          <div v-if="currentStep === 0">
            <div class="mt-3">
                  <h5 class="fw-bold mb-2">I. Description et consistance des travaux et des ouvrages </h5>
                  <div class="col-md-12">    
                        <RichTextarea v-model="description_travaux"/>
                  </div>
            </div>  
          </div> 

          <div v-else-if="currentStep === 1">
            <div class="mt-3">
                  <h5 class="fw-bold mb-2">II. Organisation du chantier et travaux préparatoires </h5>
                  <div class="col-md-12">    
                        <RichTextarea v-model="organisation_chantier"/>
                  </div>
            </div>  
          </div>

          <div v-else-if="currentStep === 2">
            <div class="mt-3">
                  <h5 class="fw-bold mb-2">III. Provenance, qualité et préparation des matériaux </h5>
                  <div class="col-md-12">    
                        <RichTextarea v-model="provenance_materiaux"/>
                  </div>
            </div>  
          </div>

          <div v-else-if="currentStep === 3">
            <div class="mt-3">
                  <h5 class="fw-bold mb-2">IV. Mode d’exécution des travaux </h5>
                  <div class="col-md-12">    
                        <RichTextarea v-model="mode_execution"/>
                  </div>
            </div>  
          </div>

          <div v-else-if="currentStep === 4">
            <div class="mt-3">
                  <h5 class="fw-bold mb-2">V. Protection de l'environnement </h5>
                  <div class="col-md-12">    
                        <RichTextarea v-model="mode_execution"/>
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
      
</template>

<script setup>
import { ref } from 'vue'
import RichTextarea from '@/components/RichTextarea.vue';
import HeaderPiece from '@/components/HeaderPiece.vue'
import StepperForm from '@/components/StepperForm.vue' 

const mode_execution = ref(``)
const provenance_materiaux = ref(``)
const organisation_chantier = ref(``)
const description_travaux = ref(``)

</script>