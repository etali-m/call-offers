<template>
  <HeaderPiece numero_piece="1" nom_piece="AVIS D'APPEL D'OFFRE" numero_dossier="0089/AONO/MINEE/CIPM/2024" moe="Ministère de l'eau et de l'energie" description_travaux="TRAVAUX DE CONSTRUCTION DES CANIVEAUX BETONNES DANS LA COMMUNE DE YAOUNDE 4"/>

  <div class="form-container">
    <form @submit.prevent="handleSubmit">
      <StepperForm :totalSteps="3" v-slot="{ currentStep, nextStep, prevStep, isLastStep }">
        <div v-if="currentStep === 0">
          <label>Nom :</label>
          <input v-model="formData.nom" type="text" required />
        </div>

        <div v-else-if="currentStep === 1">
          <label>Email :</label>
          <input v-model="formData.email" type="email" required />
        </div>

        <div v-else-if="currentStep === 2">
          <label>Téléphone :</label>
          <input v-model="formData.telephone" type="text" required />
        </div>

        <!-- Navigation -->
        <div class="buttons mt-4">
          <button type="button" @click="prevStep" :disabled="currentStep === 0">Précédent</button>
          <button type="button" v-if="!isLastStep" @click="nextStep">Suivant</button>
          <button type="submit" v-else>Soumettre</button>
        </div>
      </StepperForm>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import HeaderPiece from '@/components/HeaderPiece.vue'
import StepperForm from '@/components/StepperForm.vue'

const formData = reactive({
  nom: '',
  email: '',
  telephone: '',
})

const handleSubmit = () => {
  console.log("Formulaire soumis :", formData)
  alert('Formulaire soumis !')
  // Appel à une API si besoin
}
</script>
