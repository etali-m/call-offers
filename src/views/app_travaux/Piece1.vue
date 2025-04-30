<template>
  <HeaderPiece numero_piece="1" nom_piece="AVIS D'APPEL D'OFFRE" numero_dossier="0089/AONO/MINEE/CIPM/2024" moe="Ministère de l'eau et de l'energie" description_travaux="TRAVAUX DE CONSTRUCTION DES CANIVEAUX BETONNES DANS LA COMMUNE DE YAOUNDE 4"/>

  <div class="form-container">  
      <form @submit.prevent="handleSubmit" style="padding-left:10px;">
        <StepperForm :totalSteps="14" v-slot="{ currentStep, nextStep, prevStep, isLastStep }">
          <div v-if="currentStep === 0">
            <h5 class="fw-bold mb-4">{{ currentStep + 1 }}. Objet de l'appel d'offre</h5>
            <div class="row">
                <div class="col-md-12">  
                    <label for="objet_appel">Dans le cadre de</label>
                    <textarea class="textarea-custom" name="" placeholder="Entrez le context du marché"></textarea>
                </div>
                <p>le Maître d’Ouvrage ou le Maître d’Ouvrage Délégué lance un Appel d’Offres [Type d’appel d’offres] [Objet de l’appel d’offres].</p>
            </div> 
          </div>

          <div v-else-if="currentStep === 1">
            <h5 class="fw-bold mb-4">{{ currentStep + 1 }}. Consistence des travaux</h5>
              <div class="row">
                  <div class="col-md-12">   
                      <label for="consistence_travaux">Les travaux comprennent notamment :</label>
                      <textarea class="textarea-custom" placeholder="Description succinte des travaux à exécuter"></textarea>
                  </div>
              </div> 
          </div>

          <div v-else-if="currentStep === 2">
            <label>Téléphone :</label>
            <input v-model="formData.telephone" type="text" required />
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
