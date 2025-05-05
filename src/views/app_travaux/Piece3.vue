<template>
  <HeaderPiece numero_piece="3" nom_piece="REGLEMENT PARTICULIER DE L'APPEL D'OFFRE" numero_dossier="0089/AONO/MINEE/CIPM/2024" moe="Ministère de l'eau et de l'energie" description_travaux="TRAVAUX DE CONSTRUCTION DES CANIVEAUX BETONNES DANS LA COMMUNE DE YAOUNDE 4"/>

  <div class="form-container">  
      <form @submit.prevent="handleSubmit" style="padding-left:10px;">
        <StepperForm :totalSteps="20" v-slot="{ currentStep, nextStep, prevStep, isLastStep }">
          <div v-if="currentStep === 0">
            <h5 class="fw-bold mb-4">1.1 Définition des travaux</h5>
            <div class="row">
                <div class="col-md-12">  
                    <label for="objet_appel">Les travaux consistent à :</label>
                </div>
                <RichTextarea v-model="consistenceTravaux" />
                <!-- <div v-html="consistenceTravaux"></div> -->
            </div> <br>
            <h5 class="fw-bold mb-4">1.2 Délai d'exécution des travaux: </h5>
            <div class="row">
                <div class="col-md-12">  
                    <label for="objet_appel">Le délai prévisionnel d'exécution des travaux est de : </label>
                     <textarea class="textarea-custom" placeholder="6 mois"></textarea> 
                </div> 
            </div> <br>
            <h5 class="fw-bold mb-4">1.4  </h5>
            <div class="row g-3">
              <!-- Nom et objet des travaux -->
              <div class="col-12">
                <label for="objet_appel" class="form-label fw-bold">Nom et objet des travaux :</label>
                <textarea id="objet_appel" class="textarea-custom" placeholder="TRAVAUX DE CONSTRUCTION DES CANIVEAUX BETONNES DANS LA COMMUNE DE YAOUNDE 4"></textarea>
              </div>

              <!-- Plusieurs phases -->
              <div class="col-12">
                <label class="form-label fw-bold">Les travaux comportent-ils plusieurs phases :</label>
                <div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="phase" id="phaseOui" value="oui">
                    <label class="form-check-label" for="phaseOui">Oui</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="phase" id="phaseNon" value="non">
                    <label class="form-check-label" for="phaseNon">Non</label>
                  </div>
                </div>
              </div>

              <!-- Conférence préalable -->
              <div class="col-12">
                <label class="form-label fw-bold">Conférence préalable à l’établissement des propositions :</label>
                <div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="conference" id="confOui" value="oui">
                    <label class="form-check-label" for="confOui">Oui</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="conference" id="confNon" value="non">
                    <label class="form-check-label" for="confNon">Non</label>
                  </div>
                </div>
              </div>
            </div> <br>

            <h5 class="fw-bold mb-4">2.Source(s) de financement: </h5>
            <div class="row g-3">
              <!-- Nom et objet des travaux -->
              <div class="col-12">
                <p>Budget:................ Exxercice.......... Ligne ................</p>
              </div> 
            </div>
          </div>

          <div v-else-if="currentStep === 1">
              <h5 class="fw-bold mb-4">4. </h5>
              <div class="row">
                  <div class="col-md-12">   
                      <label for="consistence_travaux">Les travaux comprennent notamment :</label>
                      <textarea class="textarea-custom" placeholder="Description succinte des travaux à exécuter"></textarea>
                  </div>
              </div> 

              <h5 class="fw-bold mb-4">5.1 </h5>
              <div class="row">
                  <div class="col-md-12">   
                      <label for="consistence_travaux">Provenance des matériels et founitures d'équipement et services :</label>
                      <textarea class="textarea-custom" placeholder="description de la provenance des matériaux"></textarea>
                  </div>
              </div> 

              <h5 class="fw-bold mb-4">6.2 </h5>
              <div class="row">
                  <div class="col-md-12">    
                      <p>
                        En cas de groupement d'entreprises, chaque membre du groupement doit présenter un dossier
                        administratif complet, les pièces " L’attestation de domiciliation bancaire (sauf cas de cotraitance conjointe) , La quittance d’achat du DAO et le cautionnement de soumission" prévues au point 13.1 du RPAO étant uniquement présentés par le mandataire du groupement.
                      </p>
                  </div>
              </div> 

              <h5 class="fw-bold mb-4">6.4 </h5>
              <div class="row">
                  <div class="col-md-12">   
                      <label for="consistence_travaux">Renseignements nécessaires à produire</label>
                      <textarea class="textarea-custom" placeholder="Description à produire"></textarea>
                  </div>
              </div>
          </div>

          <div v-else-if="currentStep === 2">
              <h5 class="fw-bold mb-4">7.3</h5>
              <span>Aux fins de la visite du site des travaux à organiser au plus [date à insérer, le cas échéant] après la publication de l’Avis d’Appel d’Offres, le service du Maître d’Ouvrage ou Maître d’ouvrage Délégué à contacter est le suivant</span>
              <div class="row">
                  <div class="col-md-3">
                      <label class="label-custom" for="">Boite postal</label>
                      <input v-model="moa" type="text" class="input-custom" required placeholder="Ministère des travaux publics">
                  </div>
                  <div class="col-md-3">
                      <label class="label-custom" for="">Téléphone</label>
                      <input v-model="moa" type="text" class="input-custom" required placeholder="670 869 782">
                  </div>
                  <div class="col-md-3">
                      <label class="label-custom" for="">Fax</label>
                      <input v-model="denomination" type="text" class="input-custom" required placeholder="MINTP">
                  </div>
                  <div class="col-md-3">
                      <label class="label-custom" for="">Email</label>
                      <input v-model="denomination" type="email" class="input-custom" required placeholder="MINTP">
                  </div>
              </div> <br>
              <h5 class="fw-bold mb-4">7.4</h5>
              <div class="row">
                <p>
                  Les renseignements complémentaires peuvent être obtenus aux heures ouvrables à [service (SIGAMP), numéro de porte, BP, téléphone, fax, e-mail] ou en ligne sur la plateforme COLEPS aux adresses http://www.marchespublics.cm et http://www.publiccontracts.cm, ou tout autres moyens de communication électronique indiqué par le Maître d’Ouvrage.
                </p>
              </div>
          </div>

          <div v-else-if="currentStep === 3">
              <h5 class="fw-bold mb-4">12. </h5>
              <div class="row">
                  <div class="col-md-12">   
                      <label for="consistence_travaux">La langue de soumission est l'Anglais ou le Français</label>
                      <textarea class="textarea-custom" placeholder="Description succinte des travaux à exécuter"></textarea>
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
import { reactive, ref } from 'vue'
import RichTextarea from '@/components/RichTextarea.vue'
import HeaderPiece from '@/components/HeaderPiece.vue'
import StepperForm from '@/components/StepperForm.vue' 


const consistenceTravaux = ref('')
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
