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
          <StepperForm :totalSteps="13" v-slot="{ currentStep, nextStep, prevStep, isLastStep }">
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

            <div v-else-if="currentStep === 8"> 
                <div class="mt-3">
                    <h5 class="fw-bold mb-2">29.1 </h5>
                    <div class="col-md-12">   
                        <label for="consistence_travaux">Qualification du soumissionnaire :</label>
                        <RichTextarea v-model="qualification_soumissionaire"/>
                    </div>
                </div> 
            </div>

            <div v-else-if="currentStep === 9"> 
                <div class="mt-3">
                    <h5 class="fw-bold mb-2">29.1 </h5>
                    <h5><strong>Critères et Sous critères pour l'évaluation détaillée des offres.</strong></h5>
                    <div class="col-md-12">   
                        <label for="consistence_travaux"><strong>Critères éliminatoires</strong></label>
                        <RichTextarea v-model="criteres_eliminatoires"/>
                    </div>
                </div> 
            </div>

            <div v-else-if="currentStep === 10"> 
                <div class="mt-3">
                    <h5 class="fw-bold mb-2">29.1 </h5>
                    <h5><strong>Critères et Sous critères pour l'évaluation détaillée des offres.</strong></h5>
                    <div class="col-md-12">   
                        <label for="consistence_travaux"><strong>Critères essentiels</strong></label>
                        <RichTextarea v-model="criteres_essentiels"/>
                    </div>
                </div> 
            </div>

            <div v-else-if="currentStep === 11"> 
                <div class="mt-3">
                    <h5 class="fw-bold mb-2">31.2 </h5>
                    <div class="col-md-12">   
                        <label for="consistence_travaux">Monnaie retenue</label>
                        <RichTextarea v-model="monnaie_retenu"/>
                    </div>
                </div> 
                <div class="mt-3">
                    <h5 class="fw-bold mb-2">32.2(b) </h5>
                    <div class="col-md-12">    
                        <RichTextarea v-model="mode_evaluation"/>
                    </div>
                </div> 
                <div class="mt-3">
                    <h5 class="fw-bold mb-2">32.2(e) </h5>
                    <div class="col-md-12">    
                        <RichTextarea v-model="ref_32_2_e"/>
                    </div>
                </div> 
                <div class="mt-3">
                    <h5 class="fw-bold mb-2">32.2(g) </h5>
                    <div class="col-md-12">    
                        <RichTextarea v-model="ref_32_2_g"/>
                    </div>
                </div> 
                <div class="mt-3">
                    <h5 class="fw-bold mb-2">33.1 </h5>
                    <div class="col-md-12">    
                        <RichTextarea v-model="ref33_1"/>
                    </div>
                </div> 
            </div>

            <div v-else-if="currentStep === 12"> 
                <h5><strong>ATTRIBUTION</strong></h5>
                <div class="mt-3">
                    <h5 class="fw-bold mb-2">34.1 </h5>
                    <div class="col-md-12">    
                        <RichTextarea v-model="ref_34_1"/>
                    </div>
                </div> 
                <div class="mt-3">
                    <h5 class="fw-bold mb-2">34.2 </h5>
                    <div class="col-md-12">    
                        <RichTextarea v-model="ref_34_2"/>
                    </div>
                </div> 
                <div class="mt-3">
                    <h5 class="fw-bold mb-2">39.2 </h5>
                    <div class="col-md-12">    
                        <RichTextarea v-model="ref_39_2"/>
                    </div>
                </div> 
                <div class="mt-3">
                    <h5 class="fw-bold mb-2">40 </h5>
                    <div class="col-md-12">  
                        <label for="">Principe Ethiques</label>  
                        <RichTextarea v-model="ref_40"/>
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
import { ref, onMounted } from 'vue'; 
import RichTextarea from '@/components/RichTextarea.vue';
import HeaderPiece from '@/components/HeaderPiece.vue';
import StepperForm from '@/components/StepperForm.vue'; 

import { useRoute, useRouter } from 'vue-router';
import Loader from "@/components/Loader.vue";
import PieceNavigator from "@/components/PieceNavigator.vue";
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


//VARIABLES QUI CONSTITUENT LES ELEMENTS DE LA PIECE
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

const qualification_soumissionaire = ref(` 
<p>L’évaluation des offres se fera sur la base des critères ci-après pour chaque lot retenu par le soumissionnaire :</p>
<p><em>(Étant entendu qu’un critère ne peut être à la fois éliminatoire et essentiel.)</em></p>

<h6>Critères éliminatoires</h6>
<p>Les <b>critères éliminatoires</b> fixent les conditions minimales à remplir pour être admis à l’évaluation selon les critères essentiels. Ils ne doivent pas faire l’objet de notation. Le non-respect de ces critères entraîne le rejet de l’offre du soumissionnaire. Il s'agit notamment de :</p>
<ul>
  <li>L’absence du cautionnement de soumission à l’ouverture des plis ;</li>
  <li>La non-production, au-delà du délai de 48 h après l’ouverture des plis, d’une pièce du dossier administratif jugée non conforme ou absente ;</li>
  <li>Les fausses déclarations, manœuvres frauduleuses ou pièces falsifiées ;</li>
  <li>Le non-respect de X critères essentiels (X renvoyant au seuil de qualification des offres techniques) ;</li>
  <li>L’absence de la déclaration sur l’honneur de non abandon des chantiers au cours des trois dernières années ;</li>
  <li>Le non-respect du format de fichier des offres ;</li>
  <li>L’absence d’un prix unitaire quantifié dans l’offre financière ;</li>
  <li>L’absence de prospectus accompagné des fiches techniques du fabricant, le cas échéant ;</li>
  <li>L’absence de l’agrément ou de l’autorisation du fabricant, le cas échéant ;</li>
  <li>L’absence de possession d’un matériel minimum (liste à préciser par le Maître d’Ouvrage et à déterminer en propre ou en location) ;</li>
  <li>L’absence de la charte d’intégrité ;</li>
  <li>L’absence de la déclaration d’engagement au respect des clauses sociales et environnementales.</li>
</ul>
<p><strong>NB :</strong> En fonction de la spécificité de la prestation, d’autres critères pertinents pourront être ajoutés lors de l’élaboration des DAO.</p>

<h6>Critères essentiels</h6>
<p>Les <b>critères dits essentiels</b> (primordiaux ou clés) attestent de la capacité technico-financière des candidats à exécuter les prestations, objet de l’appel d’offres. Ceux-ci doivent être déterminés en fonction de la nature et de la consistance des prestations à réaliser.</p>
<p>Il convient de préciser formellement les modalités de validation d’un critère à partir du nombre de sous-critères respectés.</p>

<p>Les critères essentiels à la qualification des soumissionnaires porteront à titre indicatif sur :</p>
<ul>
  <li>La présentation de l’offre ;</li>
  <li>Les références du soumissionnaire ;</li>
  <li>Le service après-vente (disponibilité des pièces de rechange, atelier de réparation, personnel technique), le cas échéant ;</li>
  <li>La capacité financière (accès à une ligne de crédit ou autres ressources financières, chiffre d’affaires, attestation de solvabilité financière) ;</li>
  <li>La qualification et l’expérience du personnel ;</li>
  <li>Les moyens logistiques ;</li>
  <li>La méthodologie ;</li>
  <li>Les preuves d’acceptation des conditions du marché.</li>
</ul>

<p><strong>NB :</strong> Indiquer les principaux critères de qualification qui montrent que le soumissionnaire dispose des capacités techniques et des ressources requises pour mener à bien l’exécution du marché.</p>
<p><strong>Important :</strong> Le système de notation des offres par attribution de points est proscrit au profit du mode binaire (<em>oui ou non</em>).</p>

<strong>Le système de notation des offres par attribution des points est proscrit au profit du mode
binaire (oui ou non)</strong>

<h5>Critères et Sous critères pour l’évaluation détaillée des offres</h5>

`)

const criteres_eliminatoires = ref(`
<h5>Critères éliminatoires</h5>
<p>Les critères éliminatoires seront à titre indicatifs évalués en fonction des sous critères ci-après:</p>
<table border="1" cellpadding="5" cellspacing="0">
  <thead>
    <tr>
      <th>N°</th>
      <th>Rubrique</th>
      <th>Oui/Non</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="3"><strong>I- Critères éliminatoires relatifs au dossier administratif</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td>
         
      </td>
      <td>Oui/Non</td>
    </tr> 
    <tr>
      <td colspan="3"><strong>II- Critères éliminatoires relatifs à l’offre technique</strong></td>
    </tr>
    <tr>
      <td>2</td>
      <td> </td>
      <td>Oui/Non</td>
    </tr> 
    <tr>
      <td colspan="3"><strong>III- Critères éliminatoires relatifs à l’offre financière</strong></td>
    </tr>
    <tr>
      <td>3</td>
      <td> </td>
      <td>Oui/Non</td>
    </tr>
    <tr>
      <td colspan="3"><strong>IV- Critères éliminatoires d’ordre général</strong></td>
    </tr>
    <tr>
      <td>4</td>
      <td> </td>
      <td>Oui/Non</td>
    </tr>  
  </tbody>
</table>
`)

const criteres_essentiels = ref(`
  <p>L'évalution des critères essentiels ou relatifs à la qualification des soumissionaires portera à titre indicatif sur : </p>
`)

const monnaie_retenu =  ref(`
  <p>La monnaie retenue pour la conversion en une seule monnaie est le franc CFA, la source du taux de change étant la Banque des Etats de l’Afrique Centrale (BEAC).</p>
  <p>La date du taux d'échange est: </p>
`)

const mode_evaluation = ref(`<p>Le mode d’évaluation des travaux en régie à chiffrer de façon compétitive est défini comme suit : [à préciser le cas échéant] et le pourcentage desdits travaux devra être précisé </p>`)

const ref33_1 = ref(`<p>Les soumissionnaires nationaux [bénéficient ou ne bénéficient pas] d’une marge de préférence nationale au cours de l’évaluation.</p>`)

const ref_32_2_e = ref(`<p>Le délai d’exécution sera évalué comme suit:(à préciser le cas échéant)</p>`)
const ref_32_2_g = ref(`<p>La méthode d’évaluation des variantes techniques est la suivante:</p>`)

const ref_34_1 = ref(`<p>Le Maitre d’Ouvrage ou le Maitre d’Ouvrage Délégué attribue le marché au soumissionnaire dont l’offre a été reconnue conforme pour l’essentiel au Dossier d’Appel d’offres et qui dispose des capacités techniques et financières requises pour exécuter le marché de façon satisfaisante et dont l’offre a été évaluée la moins disante après application des remises proposées le cas échéant.</p>`)

const ref_34_2 = ref(`<p>La combinaison à appliquer en cas d’attribution simultanée de plusieurs lots est la suivante le Maître d’Ouvrage ou le Maître d’Ouvrage Délégué tiendra compte des rabais proposés et se basera sur la combinaison qui lui est la plus avantageuse économiquement afin d’arrêter la liste d’attributaires par lot: ans le cas contraire, [préciser le cas échéant, un autre mode que celui le plus économiquement avantageux pour le Maître d’Ouvrage ou Maître d’Ouvrage Délégué]</p>`)

const ref_39_2 = ref(`<p>Le taux du cautionnement définitif est de : _________________________ [à préciser (entre 2 et 5%)] du montant toutes taxes comprises du marché</p>
<p>Dans un délai de vingt (20) jours à compter de la date de notification du marché par le Maître d’ouvrage,le cocontractant fournira un cautionnement définitif suivant le modèle joint au Dossier d’appel d’offres. La non production dudit cautionnement dans les délais et conditions de l’article 28 du CCAP expose le soumissionnaire aux sanctions prévues par l’article 37 dudit CCAP</p>
`)

const ref_40 = ref(`<p>Les Présidents et Membres de commission, les Soumissionnaires et les autres intervenants de la procédure doivent observer en tout temps, les règles d’éthique professionnelle les plus strictes. Ils doivent notamment s’interdire toute corruption ou toute autre forme de manœuvres frauduleuses. En vertu de ce principe, les expressions sont définies de la façon suivante </p>
<p>(i) Est coupable de “<strong>corruption</strong>” quiconque offre, donne, sollicite ou accepte directement ou indirectement un quelconque avantage en vue d’influencer l’action d’un agent public au cours de l’attribution ou de l’exécution d’un marché ou d’une lettre commande, et</p>

<p>(ii) est coupable de “<strong>corruption</strong>” quiconque fournit, sollicite ou accepte plusieurs offres émises par le même soumissionnaire sous des noms des sociétés différentes et/ou sur
des numéros d’enregistrement différents </p>

<p>(iii) se livre à des “manœuvres frauduleuses” quiconque déforme ou dénature des faits afin
d’influencer l’attribution ou l’exécution d’un marché ou d’une lettre commande de manière préjudiciable au Maître d’Ouvrage ou au Maître d’Ouvrage Délégué. Les “Manœuvres frauduleuses” comprennent notamment toute entente ou manœuvre collusoire des soumissionnaires (avant ou après la remise de l’offre) visant à maintenir artificiellement les prix des cotations à des niveaux ne correspondant pas à ceux qui résulteraient du jeu d’une concurrence libre et ouverte, et à priver ainsi le Maître d’Ouvrage ou le Maître d’Ouvrage Délégué des avantages de cette dernière.</p>
`)
 

</script>
