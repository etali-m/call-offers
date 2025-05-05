<template>
  <HeaderPiece numero_piece="1" nom_piece="AVIS D'APPEL D'OFFRE" numero_dossier="0089/AONO/MINEE/CIPM/2024" moe="Ministère de l'eau et de l'energie" description_travaux="TRAVAUX DE CONSTRUCTION DES CANIVEAUX BETONNES DANS LA COMMUNE DE YAOUNDE 4"/>

  <div class="form-container">  
      <form @submit.prevent="handleSubmit" style="padding-left:10px;">
        <StepperForm :totalSteps="20" v-slot="{ currentStep, nextStep, prevStep, isLastStep }">
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
              <h5 class="fw-bold mb-4">{{ currentStep + 1 }}. Tranches/Allotissement</h5>
              <div class="row">
                  <div class="col-md-12">   
                      <label for="consistence_travaux">Les travaux sont subdivisés en tranches et/ou en lots ci-après définis [à préciser] :</label>
                      <textarea class="textarea-custom" placeholder="Description succinte des travaux à exécuter"></textarea>
                  </div>
              </div> 
          </div>

          <div v-else-if="currentStep === 3">
              <h5 class="fw-bold mb-4">{{ currentStep + 1 }}. Coût prévisionnel</h5>
              <div class="row">
                  <div class="col-md-12">   
                      <label for="consistence_travaux">Le coût prévisionnel de l’opération à l’issue des études préalables est de : </label>
                      <textarea class="textarea-custom" placeholder="Description succinte des travaux à exécuter"></textarea>
                  </div>
              </div> 
          </div>

          <div v-else-if="currentStep === 4">
              <h5 class="fw-bold mb-4">{{ currentStep + 1 }}. Délai prévisionnel d’exécution</h5>
              <div class="row">
                  <div class="col-md-12">   
                      <label for="consistence_travaux">Le délai maximum prévu par le Maître d’Ouvrage ou le Maître d’Ouvrage Délégué pour la réalisation des travaux, objet du présent appel d’offres est de </label>
                      <textarea class="textarea-custom" placeholder="Description succinte des travaux à exécuter"></textarea>
                      <p>
                        Ce délai court à compter de la date de notification de l’ordre de service de commencer les prestations.
                      </p>
                  </div>
              </div> 
          </div>

          <div v-else-if="currentStep === 5">
              <h5 class="fw-bold mb-4">{{ currentStep + 1 }}. Participation et origine</h5>
              <div class="row">
                  <div class="col-md-12">   
                      <label for="consistence_travaux">La participation au présent appel d’offres est ouverte à </label>
                      <textarea class="textarea-custom" placeholder="Description succinte des travaux à exécuter"></textarea>
                      <p>
                        Ce délai court à compter de la date de notification de l’ordre de service de commencer les prestations.
                      </p>
                  </div>
              </div> 
          </div>

          <div v-else-if="currentStep === 6">
              <h5 class="fw-bold mb-4">{{ currentStep + 1 }}. Financement</h5>
              <div class="row">
                  <div class="col-md-12">   
                      <label for="consistence_travaux">Les travaux objet du présent appel d'offres sont financés par </label>
                      <textarea class="textarea-custom" placeholder="Description succinte des travaux à exécuter"></textarea>
                      <p>
                        sur la ligne d’imputation budgétaire n°5465646
                      </p>
                  </div>
              </div> 
          </div>

          <div v-else-if="currentStep === 7">
              <h5 class="fw-bold mb-4">{{ currentStep + 1 }}. Mode de soumission</h5>
              <div class="row">
                  <div class="col-md-12">   
                      <label for="consistence_travaux">Le mode de soumission retenu pour cette consultation est </label>
                      <textarea class="textarea-custom" placeholder="Description succinte des travaux à exécuter"></textarea>
                      <p>
                        Toutefois, lorsque les deux possibilités sont ouvertes, un soumissionnaire ne peut utiliser à la fois le mode en ligne et le mode hors ligne.
                      </p>
                  </div>
              </div> 
          </div>

          <div v-else-if="currentStep === 8">
              <h5 class="fw-bold mb-4">{{ currentStep + 1 }}. Cautionnement de soumission</h5>
              <div class="row">
                  <div class="col-md-12">   
                      <label for="consistence_travaux">Chaque soumissionnaire doit joindre à ses pièces administratives un cautionnement de soumission , acquitté à la main, délivrée par un organisme ou une institution financière agréée par le Ministre chargé des finances pour émettre les cautions dans le domaines des marchés publics dont la liste figure dans la pièce 14 du DAO dont le montant s’élève à</label>
                      <textarea class="textarea-custom" placeholder="Description succinte des travaux à exécuter"></textarea>
                      <p>
                        et valable jusqu'à trente (30) jours au-delà de la date initiale de validité des offres. L’absence de la caution de soumission délivrée par une banque de premier ordre ou un organisme financier de première catégorie autorisé par le Ministère chargé des Finances à émettre des cautions dans le cadre des marchés publics, entraînera le rejet pur et simple de l'offre. Une caution de soumission produite mais n'ayant aucun rapport avec la consultation concernée est considérée comme absente. La caution de soumission présentée par un soumissionnaire au cours de la séance d’ouverture des plis est irrecevable.
                      </p>
                  </div>
              </div> 
          </div>

          <div v-else-if="currentStep === 9">
              <h5 class="fw-bold mb-4">{{ currentStep + 1 }}. Consultation du Dossier d'Appel d'Offres</h5>
              <div class="row">
                  <div class="col-md-12">   
                      <label for="consistence_travaux">Le dossier physique peut être consulté gratuitement dans les services du MO / MOD aux heures ouvrables à </label>
                      <textarea class="textarea-custom" placeholder="Description succinte des travaux à exécuter"></textarea>
                      <p>
                        dès publication du présent avis. <br>
                        Il peut également être consulté en ligne sur la plateforme COLEPS aux adresses http://www.marchespublics.cm et http://www.publiccontracts.cm sur le site internet de l'ARMP(www.armp.cm) ou sur tout autre moyen de communication électronique indiqué par le Maître d’Ouvrage (à préciser).
                      </p>
                  </div>
              </div> 
          </div>

          <div v-else-if="currentStep === 10">
              <h5 class="fw-bold mb-4">{{ currentStep + 1 }}. Acquisition du Dossier d'Appel d'Offres</h5>
              <div class="row">
                  <div class="col-md-12">   
                      <label for="consistence_travaux">La version physique du dossier d’appel d’offres peut être obtenue au [Lieu de retrait du DAO (service, numéro 13de porte, BP, téléphone, fax, e-mail)] dès publication du présent avis, contre versement d’une somme non remboursable des frais d’achat du DAO de </label>
                      <textarea class="textarea-custom" placeholder="Description succinte des travaux à exécuter"></textarea>
                      <p>
                        Il est également possible d’obtenir la version électronique du dossier par téléchargement gratuit aux adresses sus indiquées pour la version électronique. Toutefois, la soumission par voie physique ou électronique est conditionnée par le paiement des frais d’achat du DAO.
                      </p>
                  </div>
              </div> 
          </div>

          <div v-else-if="currentStep === 11">
              <h5 class="fw-bold mb-4">{{ currentStep + 1 }}. Remise des offres</h5>
              <div class="row">
                  <div class="col-md-12">   
                      <label for="consistence_travaux">Pour la soumission hors ligne, l'offre en sept (07) exemplaires dont un (01) original et six (06) copies marqués comme tels, devra parvenir [Lieu d’enregistrement des offres], au plus tard le [Date limite de réception des offres] à [Heure limite] et devra porter la mention : </label>
                      <textarea class="textarea-custom" placeholder="Description succinte des travaux à exécuter"></textarea>
                      <p>
                        Il est également possible d’obtenir la version électronique du dossier par téléchargement gratuit aux adresses sus indiquées pour la version électronique. Toutefois, la soumission par voie physique ou électronique est conditionnée par le paiement des frais d’achat du DAO.
                      </p>
                  </div>
              </div> 
          </div>

          <div v-else-if="currentStep === 12">
              <h5 class="fw-bold mb-4">{{ currentStep + 1 }}. Recevabilité des plis</h5>
              <div class="row">
                  <div class="col-md-12">   
                      <label for="consistence_travaux">Pour la soumission hors ligne, l'offre en sept (07) exemplaires dont un (01) original et six (06) copies marqués comme tels, devra parvenir [Lieu d’enregistrement des offres], au plus tard le [Date limite de réception des offres] à [Heure limite] et devra porter la mention : </label>
                      <textarea class="textarea-custom" placeholder="Description succinte des travaux à exécuter"></textarea>
                      <p>
                        Il est également possible d’obtenir la version électronique du dossier par téléchargement gratuit aux adresses sus indiquées pour la version électronique. Toutefois, la soumission par voie physique ou électronique est conditionnée par le paiement des frais d’achat du DAO.
                      </p>
                  </div>
              </div> 
          </div>

          <div v-else-if="currentStep === 13">
              <h5 class="fw-bold mb-4">{{ currentStep + 1 }}. Ouverture des plis</h5>
              <div class="row">
                  <div class="col-md-12">   
                      <label for="consistence_travaux">L’ouverture des plis se fait en un temps et aura lieu le</label>
                      <textarea class="textarea-custom" placeholder="Description succinte des travaux à exécuter"></textarea>
                      <p>
                         
                      </p>
                  </div>
              </div> 
          </div>

          <div v-else-if="currentStep === 14">
              <h5 class="fw-bold mb-4">{{ currentStep + 1 }}. Critères d’évaluation</h5>
              <div class="row">
                  <div class="col-md-12">   
                      <h6 class="fw-bold mb-2">{{ currentStep + 1 }}.1 Critères éliminatoires</h6>
                      <p for="consistence_travaux">Il s'agit notamment:</p>
                      <div class="form-check">
                        <label><input type="checkbox" class="form-check-input" name="motif" value="absence_cautionnement"> De l’absence du cautionnement de soumission à l’ouverture des plis</label><br>

                        <label><input type="checkbox" class="form-check-input" name="motif" value="non_production_piece"> De la non-production au-delà du délai de 48 h après l’ouverture des plis, d’une pièce du dossier administratif jugée non conforme ou absente lors de l’ouverture des plis (excepté le cautionnement de soumission)</label><br>

                        <label><input type="checkbox" class="form-check-input" name="motif" value="fausses_declarations"> Des fausses déclarations, manœuvres frauduleuses ou des pièces falsifiées</label><br>

                        <label><input type="checkbox" class="form-check-input" name="motif" value="absence_declaration_honneur"> De l’absence de la déclaration sur l’honneur de non abandon des chantiers au cours des trois dernières années</label><br>

                        <label><input type="checkbox" class="form-check-input" name="motif" value="non_respect_format"> Du non-respect du format de fichier des offres</label><br>

                        <label><input type="checkbox" class="form-check-input" name="motif" value="absence_prix_unitaire"> L’absence d’un prix unitaire quantifié dans l’Offre financière</label><br>

                        <label><input type="checkbox" class="form-check-input" name="motif" value="absence_prospectus"> De l’absence de prospectus accompagné des fiches techniques du fabricant, le cas échéant</label><br>

                        <label><input type="checkbox" class="form-check-input" name="motif" value="absence_agrement"> De l’absence de l’agrément ou de l’autorisation du fabricant, le cas échéant</label><br>

                        <label><input type="checkbox" class="form-check-input" name="motif" value="absence_materiel"> De l’absence de possession en propre ou en location d’un matériel minimum (à préciser par le maître d’Ouvrage)</label><br>

                        <label><input type="checkbox" class="form-check-input" name="motif" value="absence_categorisation"> De l’absence de l’attestation de catégorisation le cas échéant</label><br>

                        <label><input type="checkbox" class="form-check-input" name="motif" value="absence_element_financier"> De l’absence d’un élément de l’offre financière (la soumission, les BPU, le DQE)</label><br>

                        <label><input type="checkbox" class="form-check-input" name="motif" value="absence_charte_integrite"> De l’absence de la charte d’intégrité datée et signée</label><br> <br>  
                      </div>
                      <div class="mt-2">
                          <label for="autre_critere"><b>Ajouter un nouveau critére</b></label><br>
                          <input type="text" class="input-custom" id="autre_critere" name="autre_critere" placeholder="Écrire un autre critère ici..."> <br>
                      </div>
                  </div> <br>
                  <div class="col-md-12">
                    <h6 class="fw-bold mb-2">{{ currentStep + 1 }}.2 Critères essentielles</h6>
                    <div class="mt-2">
                          <label for="autre_critere"><b>Ajouter un nouveau critére</b></label><br>
                          <input type="text" class="input-custom" id="autre_critere" name="autre_critere" placeholder="Écrire un autre critère ici..."> <br>
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
