<template>
  <HeaderPiece numero_piece="1" nom_piece="AVIS D'APPEL D'OFFRE" numero_dossier="0089/AONO/MINEE/CIPM/2024" moe="Ministère de l'eau et de l'energie" description_travaux="TRAVAUX DE CONSTRUCTION DES CANIVEAUX BETONNES DANS LA COMMUNE DE YAOUNDE 4"/>

   <div class="form-container">
    <form @submit.prevent="handleSubmit">

      <!-- Champ dynamique -->
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

      <!-- Boutons navigation -->
      <div class="buttons mt-4">
        <button type="button" @click="prevStep" :disabled="currentStep === 0">Précédent</button>
        <button type="button" v-if="currentStep < stepsCount - 1" @click="nextStep">Suivant</button>
        <button type="submit" v-else>Soumettre</button>
      </div>

    </form>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
import HeaderPiece from '@/components/HeaderPiece.vue';

export default {
    components:{ HeaderPiece },
    setup() {
      // état
      const currentStep = ref(0)

      const formData = reactive({
        nom: '',
        email: '',
        telephone: '',
      })

      // nombre total d'étapes
      const stepsCount = 3

      // méthodes
      const nextStep = () => {
        if (currentStep.value < stepsCount - 1) {
          currentStep.value++
        }
      }

      const prevStep = () => {
        if (currentStep.value > 0) {
          currentStep.value--
        }
      }

      const handleSubmit = () => {
        console.log("Données envoyées :", formData)
        alert('Formulaire soumis !')
        // ici tu peux envoyer formData vers ton API
      }

      return{
        handleSubmit,
        prevStep,
        nextStep,
        stepsCount,
        currentStep,
        formData,
      }
    }
}
</script>

<style>

</style>