<template>
      <HeaderPiece numero_piece="6" nom_piece="CADRE DU BORDEREAU DES PRIX UNITAIRES" numero_dossier="0089/AONO/MINEE/CIPM/2024" moe="Ministère de l'eau et de l'energie" description_travaux="TRAVAUX DE CONSTRUCTION DES CANIVEAUX BETONNES DANS LA COMMUNE DE YAOUNDE 4"/>

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
      
</template>

<script setup>
import { ref } from 'vue'
import RichTextarea from '@/components/RichTextarea.vue';
import HeaderPiece from '@/components/HeaderPiece.vue'
import StepperForm from '@/components/StepperForm.vue' 

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