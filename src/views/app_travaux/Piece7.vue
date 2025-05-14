<template>
      <HeaderPiece numero_piece="7" nom_piece="CADRE DU DETAIL QUANTITATIF ET ESTIMATIF" numero_dossier="0089/AONO/MINEE/CIPM/2024" moe="Ministère de l'eau et de l'energie" description_travaux="TRAVAUX DE CONSTRUCTION DES CANIVEAUX BETONNES DANS LA COMMUNE DE YAOUNDE 4"/>

      <div class="form-container">  
      <form @submit.prevent="handleSubmit" style="padding-left:10px;">
        <StepperForm :totalSteps="1" v-slot="{ currentStep, nextStep, prevStep, isLastStep }">
          <div v-if="currentStep === 0">
            <div class="mt-3">
                  <h5 class="fw-bold mb-2"> DEVIS ESTIMATIF ET QUANTITATIF DES TRAVAUX</h5>
                  <div class="col-md-12">    
                        <RichTextarea v-model="dqe"/>
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

const dqe = ref(`
<table>
  <thead>
    <tr>
      <th>N°</th>
      <th>Désignation</th>
      <th>Unité</th>
      <th>Quantités</th>
      <th>Prix Unitaire</th>
      <th>Prix Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="6"></td> 
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td colspan="4"><strong>MONTANT HTVA</strong></td> 
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td colspan="4"><strong>TVA(19.25%)</strong></td> 
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td colspan="4"><strong>AIR</strong></td> 
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td colspan="4"><strong>TOTAL GÉNÉRAL (FCFA/TTC)</strong></td> 
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td colspan="4"><strong>NET À MANDATER</strong></td> 
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table> 
`)

</script>