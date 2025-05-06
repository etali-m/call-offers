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
              </div> <br>
              <h5 class="fw-bold mb-4">12. </h5>
              <div class="row">
                  <div class="col-md-12">   
                      <label for="consistence_travaux">La langue de soumission est l'Anglais ou le Français</label> 
                  </div>
              </div> 
          </div>

          <div v-else-if="currentStep === 3">
              <h5 class="fw-bold mb-4">13.1 </h5>
              <div class="row">
                <div class="col-12">
                    <label class="form-label fw-bold">Le soumissionnaire devra produire une offre regroupée en trois volumes et présentée comme suit :</label>

                    <!-- Volume I -->
                    <div class="mt-4">
                      <h6 class="fw-bold">A - Volume I : Pièces administratives</h6>

                      <div class="mt-2">
                        <p class="mb-1">A.1 - Pour les soumissionnaires installés au Cameroun :</p>
                        <RichTextarea v-model="piecesAdminLocales" />
                      </div>

                      <div class="mt-3">
                        <p class="mb-1">A.2 - Pour les soumissionnaires non installés au Cameroun :</p>
                        <RichTextarea v-model="piecesAdminEtrangeres" />
                      </div>
                    </div>

                    <!-- Volume II -->
                    <div class="mt-5">
                      <h6 class="fw-bold">B - Volume II : Offre technique</h6>

                      <div class="mt-2">
                        <p class="mb-1">b.1 - La lettre de soumission de la proposition technique :</p>
                        <p class="mb-1">b.2 - Références du soumissionnaire :</p>
                        <RichTextarea v-model="offreTechLocale" />
                      </div>

                      <div class="mt-3">
                        <p class="mb-1">b.3 - Personnel :</p>
                        <RichTextarea v-model="offreTechEtrangere" />
                      </div>

                      <div class="mt-3">
                        <p class="mb-1">b.4 - Matériels à mobiliser pour l'exécution des travaux :</p>
                        <RichTextarea v-model="offreTechEtrangere" />
                      </div>

                      <div class="mt-3">
                        <p class="mb-1">b.5 - Organisation et méthodologie :</p>
                        <RichTextarea v-model="offreTechEtrangere" />
                      </div>

                      <div class="mt-3">
                        <p class="mb-1">b.6 - Respect du formaulaire proposé dans le DAO :</p>
                        <RichTextarea v-model="offreTechEtrangere" />
                      </div>

                      <div class="mt-3">
                        <p class="mb-1">b.7 - Les preuves d'accepation des conditions du marché :</p>
                        <RichTextarea v-model="offreTechEtrangere" />
                      </div>

                      <div class="mt-3">
                        <p class="mb-1">b.8 - Commentaires CCAP et CCTP :</p>
                        <RichTextarea v-model="offreTechEtrangere" />
                      </div>

                      <div class="mt-3">
                        <p class="mb-1">b.9 - La capacité financière :</p>
                        <RichTextarea v-model="offreTechEtrangere" />
                      </div>

                      <div class="mt-3">
                        <p class="mb-1">b.10 - L'attestation de non abandon de chantier au cours des trois dernières années :</p>
                        <RichTextarea v-model="offreTechEtrangere" />
                      </div>

                    </div>

                    <!-- Volume III (à compléter si nécessaire) -->
                    <div class="mt-5">
                      <h6 class="fw-bold">C - Volume III : Offre financière</h6>
                      <p class="mb-1">C.1 - Description de l’offre financière :</p>
                      <RichTextarea v-model="offreFinanciere" />
                    </div>
                </div>

              </div> 
          </div>

          <div v-else-if="currentStep === 4">
              <div class="row">
                  <h5 class="fw-bold mb-4">14.3 </h5>
                  <div class="col-md-12">   
                      <label for="consistence_travaux">Impôts et taxes :</label>
                      <textarea class="textarea-custom" value="Les prix proposés doivent être libellés Toutes taxes comprises"></textarea>
                  </div>
              </div> 

              <div class="row">
                  <h5 class="fw-bold mb-4">14.4 </h5>
                  <div class="col-md-12">   
                      <label for="consistence_travaux">Prix :</label>
                      <textarea class="textarea-custom" value="Les prix du marché ne seront pas révisables."></textarea>
                  </div>
              </div>

              <div class="row">
                  <h5 class="fw-bold mb-4">15.1 </h5>
                  <div class="col-md-12">   
                      <label for="consistence_travaux">Monnaies de soumission et règlement :</label>
                      <textarea class="textarea-custom" value="Dans le cadre de la présente consultation, la(les) monnaie(s) de l’offre est (sont) définie(s) suivant.l’option A (monnaie locale uniquement) ou l’option B (Monnaies locale et étrangères) de l’article 15.1 du RGAO"></textarea>
                  </div>
              </div>

              <div class="row">
                  <h5 class="fw-bold mb-4">15.2 </h5>
                  <div class="col-md-12">   
                      <label for="consistence_travaux">Taux d'échange :</label>
                      <RichTextarea v-model="taux_change" />
                  </div>
              </div>
          </div>
          
          <div v-else-if="currentStep === 5">
              <div class="mt-3">
                  <h5 class="fw-bold mb-2">16.1 </h5>
                  <div class="col-md-12">   
                      <label for="consistence_travaux">Validité des offres :</label>
                      <RichTextarea v-model="validite_offre" />
                  </div>
              </div> 

              <div class="mt-3">
                  <h5 class="fw-bold mb-2">17.1 </h5>
                  <div class="col-md-12">   
                      <label for="consistence_travaux">Montant du cautionnement :</label>
                      <RichTextarea v-model="montant_cautionnement" />
                  </div>
              </div>

              <div class="mt-3">
                  <h5 class="fw-bold mb-2">18.1 </h5>
                  <div class="col-md-12">   
                      <label for="consistence_travaux">Evaluation des offres:</label>
                      <RichTextarea v-model="evaluation_offres" />
                  </div>
              </div>

              <div class="mt-3">
                  <h5 class="fw-bold mb-4">18.3 </h5>
                  <div class="col-md-12">   
                      <label for="consistence_travaux">Variante techniques :</label>
                      <RichTextarea v-model="variante_techniques" />
                  </div>
              </div>

              <div class="mt-3">
                  <h5 class="fw-bold mb-2">19.1 </h5>
                  <div class="col-md-12">   
                      <label for="consistence_travaux">Réunion préparatoire :</label>
                      <RichTextarea v-model="reunion_preparatoire" />
                  </div>
              </div>
          </div>

          <div v-else-if="currentStep === 6"> 
              <div class="mt-3">
                  <h5 class="fw-bold mb-2">20. </h5>
                  <div class="col-md-12">   
                      <label for="consistence_travaux">Soumission en ligne Forme :</label>
                      <RichTextarea v-model="soumission_en_ligne" />
                  </div>
              </div>

              <div class="mt-3">
                  <h5 class="fw-bold mb-2">20.1 </h5>
                  <div class="col-md-12">   
                      <label for="consistence_travaux">Date et heure limites:</label>
                      <RichTextarea v-model="date_heure_limite" />
                  </div>
              </div>

              <div class="mt-3">
                  <h5 class="fw-bold mb-4">22.2 </h5>
                  <div class="col-md-12">   
                      <label for="consistence_travaux">MODE DE SOUMISSION :</label>
                      <RichTextarea v-model="mode_soumission" />
                  </div>
              </div>
          </div>

          <div v-else-if="currentStep === 7"> 
              <div class="mt-3">
                  <h5 class="fw-bold mb-2">25.1 </h5>
                  <div class="col-md-12">   
                      <label for="consistence_travaux">Ouverture de plis :</label>
                      <RichTextarea v-model="ouverture_plis" />
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
const taux_change = ref("<p>Le taux de change pour convertir l'offre du soumissionaire en monnaie locale ainsi que pour convertir les futures décomptes en monnaies étrangère, sera celui du FCFA</p>")
const variante_techniques = ref("<p>Les offres seront évaluées sur la base d’un délai prévisionnel d’exécution des travaux compris entre jours (ou mois) au minimum et_______ jours (ou mois) au maximum. La méthode d’évaluation figure à l’article 32.2(e) du RGAO..</p>")
const reunion_preparatoire = ref("<p>La réunion préparatoire à l’établissement des offres se tiendra [préciser le Lieu, la date et l’heure]: [Indiquer l’adresse de la réunion, ou préciser qu’il n’y aura pas de réunion. La réunion doit avoir lieu au moins deux (2) semaines avant la date limite de dépôt des offres, et en même temps que la visite du site des travaux, si elle est prévue (Clause 7.3 du RGAO).]</p>")

const soumission_en_ligne = ref(`
  <h5 class="text-center fw-bold">Soumission en ligne <span class="fw-normal">FORME, <strong>FORMAT</strong> ET SIGNATURE DE L’OFFRE</span></h5>
   
  <p>Pour la soumission par voie électronique, les tailles maximales des documents qui vont transiter sur la plateforme et constituant l’offre du soumissionnaire sont les suivantes :</p>
  <ul class="ms-4">
    <li>5 MO pour l’Offre Administrative ;</li>
    <li>15 MO pour l’Offre Technique ;</li>
    <li>5 MO pour l’Offre Financière.</li>
  </ul>

  <p>Les formats acceptés sont les suivants :</p>
  <ul class="ms-4">
    <li>Format PDF pour les documents textuels ;</li>
    <li>JPEG pour les images.</li>
  </ul>

  <p><em>Le candidat veillera à utiliser des logiciels de compression afin de réduire éventuellement la taille des fichiers à transmettre.</em></p>

  <p>Pour la soumission par voie électronique, l’offre devra être transmise par le soumissionnaire sur la plateforme <strong>COLEPS</strong> <em>ou tout autre moyen de communication électronique indiqué par le Maître d’Ouvrage dans le DAO</em>. Une copie de sauvegarde de l’offre enregistrée sur clé USB ou CD/DVD devra être déposée dans les services du MO/MOD ou AC concernée sous pli scellé avec la mention claire et lisible « copie de sauvegarde » et les références de l’appel d’offres dans les délais impartis.] [pour la soumission en ligne, elles seront transmises par voie électronique via la plateforme COLEPS disponible à l’adresse <a href="http://www.marchespublics.cm">http://www.marchespublics.cm</a> ou <a href="http://www.publiccontracts.cm">http://www.publiccontracts.cm</a></p>

  <h5 class="text-center fw-bold">Soumission hors ligne</h5>
  <p>Chaque offre rédigée en français ou en anglais en [indiquer le nombre d'exemplaire] exemplaires dont un original et [indiquer le nombre de copies et tenir compte de l’exemplaire à transmettre séance tenante après l’ouverture des offres au point focal désigné par l’organisme chargé de la régulation des marchés publics] de chaque proposition marquées comme tels, devra parvenir [Lieu d’enregistrement des offres], au plus tard le [Date limite de réception des offres] à [Heure limite] et devra porter la mention suivante sur les enveloppes fermées :</p>

`)

const date_heure_limite = ref(`<p>Date et heure limite de dépôt des offres le ________________ à 11 heures.</p>`)

const mode_soumission = ref(`<p>e mode de soumission retenu pour cette consultation est [Indiquer l’un des trois modes de soumission ci-après : en ligne, hors ligne, en ligne et hors ligne].</p>`)

const ouverture_plis = ref(`
  <p>L’ouverture des plis se fait en un temps et aura lieu le______ [à préciser] à________[à préciser] heures par la Commission de Passation des Marchés du Maître d’Ouvrage ou du Maître d’Ouvrage Délégué dans la salle de ______[à préciser] sise à ______ [à préciser]</p>

  <p>Seuls les soumissionnaires peuvent assister à cette séance d'ouverture ou s'y faire représenter par une seule personne de leur choix dûment mandatée même en cas de groupement d’entreprises.<br/>
  Sous peine de rejet, les pièces du dossier administratif requises doivent être produites en originaux ou en copies certifiées conformes par le service émetteur ou autorité administrative compétente, conformément aux stipulations du Règlement Particulier de l’Appel d’Offres. Elles doivent être valide au moment du dépôt de l’Offre dater de moins de trois (03) mois à compter de la date limite originelle d’ouverture des offres ou avoir été établies postérieurement à la date de signature de l’avis d’appel d’offres. 
    </p>
  <p>En cas d’absence ou de non-conformité d’une pièce du dossier administratif lors de l’ouverture des plis, un délai de quarante-huit heures est accordé aux soumissionnaires concernés pour produire ou remplacer la pièce en question.</p>
  Est déclarée irrecevable et rejetée par la commission de passation des Marchés:
  <ul>
  <li>Toute offre produite en nombre insuffisant ou uniquement en copies pour la soumission physique,</li>
  <li>Toute offre en noir sur blanc ;</li>
  <li>Les plis portant les indications sur l’identité des soumissionnaires ;</li>
  <li>Les plis parvenus postérieurement aux dates et heures limites de dépôt ;</li>
  <li>Les plis sans indication de l’identité de l’Appel d’Offres ;</li>
  <li>Les plis non-conformes au mode de soumission ;</li>
  <li>Toute offre non conforme aux prescriptions du DAO ;</li>
  <li>
    L’absence de la caution de soumission délivrée par un organisme ou une institution financière agréée par le Ministre en charge des finances pour émettre les cautions dans le domaine des marchés publics,
    ou le non-respect des modèles des pièces du Dossier d'Appel d'Offres, entraînera le rejet pur et simple de l'offre sans aucun recours.
    Une caution de soumission produite mais n'ayant aucun rapport avec la consultation concernée est considérée comme absente.
    La caution de soumission présentée par un soumissionnaire au cours de la séance d’ouverture des plis est irrecevable.
  </li>
  <li>
    En cas d’appel d’offres restreint, le défaut de présentation du septième exemplaire de l’offre financière,
    dans une enveloppe scellée et marquée « offre témoin » pour servir d’offre témoin destiné à l’organisme chargé de la régulation des Marchés Publics,
    entraîne l’irrecevabilité de l’offre du candidat concerné, dès l’ouverture des plis par la Commission de Passation des Marchés.
  </li>
  <li>
    La Commission de Passation des Marchés établira un procès-verbal de la séance d’ouverture des plis,
    dont une copie sera remise à tous les soumissionnaires.
  </li>
</ul>
`)

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
