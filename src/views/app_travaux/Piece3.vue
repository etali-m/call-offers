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
          <StepperForm :totalSteps="14" v-slot="{ currentStep, nextStep, prevStep, isLastStep }">
            <div v-if="currentStep === 0">
              <h5 class="fw-bold mb-4">Reférence 1.1</h5>
              <div class="row"> 
                  <RichTextarea v-model="consistenceTravaux"/>
                  <!-- <div v-html="consistenceTravaux"></div> -->
              </div> <br>  
            </div>

            <div v-else-if="currentStep === 1">
                <h5 class="fw-bold mb-4">Reférence 4.2 </h5>
                <div class="row">
                    <div class="col-md-12">   
                        <label for="consistence_travaux">Liste des candidats pré-qualifiés :</label>
                        <RichTextarea v-model="liste_prequalifie" />
                    </div>
                </div> 

                <h5 class="fw-bold mb-4">Reférence 5.1 </h5>
                <div class="row">
                    <div class="col-md-12">   
                        <label for="consistence_travaux">Provenance des matériels et founitures d'équipement et services :</label>
                        <RichTextarea v-model="provenance_materiaux" />
                    </div>
                </div> 

                <h5 class="fw-bold mb-4">Reférence 6.4 </h5>
                <div class="row">
                    <div class="col-md-12">   
                        <label for="consistence_travaux">Renseignements nécessaires à produire</label>
                        <RichTextarea v-model="renseignements_necessaires" />
                    </div>
                </div>
            </div>

            <div v-else-if="currentStep === 2">
                <h5 class="fw-bold mb-4">Reférence 7.3</h5>
                <RichTextarea v-model="visite_travaux" /> 
                <!-- <div class="row">
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
                </div> --><br>
                <h5 class="fw-bold mb-4">Reférence 9</h5>
                <div class="row">
                  <RichTextarea v-model="renseignements_complementaires" /> 
                </div> <br>
                <h5 class="fw-bold mb-4">Reférence 12. </h5>
                <div class="row">
                    <div class="col-md-12">   
                        <label for="consistence_travaux">Langue de soumission : </label> 
                        <RichTextarea v-model="langue_soumission" />
                    </div>
                </div> 
            </div>

            <div v-else-if="currentStep === 3">
                <h5 class="fw-bold mb-4">Reférence 13.1 </h5>
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
                          <RichTextarea v-model="refSoumissionnaire" />
                        </div>

                        <div class="mt-3">
                          <p class="mb-1">b.3 - Personnel :</p>
                          <RichTextarea v-model="personnel" />
                        </div>

                        <div class="mt-3">
                          <p class="mb-1">b.4 - Matériels à mobiliser pour l'exécution des travaux :</p>
                          <RichTextarea v-model="materiels" />
                        </div>

                        <div class="mt-3">
                          <p class="mb-1">b.5 - Organisation et méthodologie :</p>
                          <RichTextarea v-model="organisation_methodologie" />
                        </div>

                        <div class="mt-3">
                          <p class="mb-1">b.6 - Respect du formulaire proposé dans le DAO :</p>
                          <RichTextarea v-model="respect_formulaire" />
                        </div>

                        <div class="mt-3">
                          <p class="mb-1">b.7 - Les preuves d'accepation des conditions du marché :</p>
                          <RichTextarea v-model="preuve_acceptation" />
                        </div>

                        <div class="mt-3">
                          <p class="mb-1">b.8 - Commentaires CCAP et CCTP :</p>
                          <RichTextarea v-model="commentaire_ccap" />
                        </div>

                        <div class="mt-3">
                          <p class="mb-1">b.9 - La capacité financière :</p>
                          <RichTextarea v-model="capacite_financiere" />
                        </div>

                      </div> 
                  </div>

                </div> 
            </div>

            <div v-else-if="currentStep === 4">
              <!-- Volume III (à compléter si nécessaire) -->
              <div class="mt-5">
                  <h6 class="fw-bold">C - Volume III : Offre financière</h6>
                  <p class="mb-1">C.1 - Description de l’offre financière :</p>
                  <RichTextarea v-model="offreFinanciere" />
              </div>
            </div>

            <div v-else-if="currentStep === 5"> 

                <div class="row">
                    <h5 class="fw-bold mb-4">Reférence 14.3 </h5>
                    <div class="col-md-12">   
                        <label for="consistence_travaux">Impôts et taxes :</label>
                        <RichTextarea v-model="impots_taxes" />
                    </div>
                </div> 

                <div class="row mt-3">
                    <h5 class="fw-bold mb-4">Reférence 14.4 </h5>
                    <div class="col-md-12">   
                        <label for="consistence_travaux">Prix :</label>
                        <RichTextarea v-model="prix_marche" />
                    </div>
                </div>

                <div class="row mt-3">
                    <h5 class="fw-bold mb-4">Reférence 15.1 </h5>
                    <div class="col-md-12">   
                        <label for="consistence_travaux">Monnaies de soumission et règlement :</label>
                        <RichTextarea v-model="monnaies_soumission" /> 
                    </div>
                </div>

                <div class="row mt-3">
                    <h5 class="fw-bold mb-4">Reférence 15.2 </h5>
                    <div class="col-md-12">   
                        <label for="taux_change">Taux d'échange :</label>
                        <RichTextarea id="taux_change" v-model="taux_change" />
                    </div>
                </div>
            </div>
            
            <div v-else-if="currentStep === 6">
                <div class="mt-3">
                    <h5 class="fw-bold mb-2">Reférence 16.1 </h5>
                    <div class="col-md-12">   
                        <label for="consistence_travaux">Validité des offres :</label>
                        <RichTextarea v-model="validite_offre" />
                    </div>
                </div> 

                <div class="mt-3">
                    <h5 class="fw-bold mb-2">Reférence 17.1 </h5>
                    <div class="col-md-12">   
                        <label for="consistence_travaux">Montant du cautionnement :</label>
                        <RichTextarea v-model="montant_cautionnement" />
                    </div>
                </div>

                <div class="mt-3">
                    <h5 class="fw-bold mb-2">Reférence 18.1 </h5>
                    <div class="col-md-12">   
                        <label for="consistence_travaux">Evaluation des offres:</label>
                        <RichTextarea v-model="evaluation_offres" />
                    </div>
                </div>

                <div class="mt-3">
                    <h5 class="fw-bold mb-4">Reférence 18.3 </h5>
                    <div class="col-md-12">   
                        <label for="consistence_travaux">Variante techniques :</label>
                        <RichTextarea v-model="variante_techniques" />
                    </div>
                </div>

                <div class="mt-3">
                    <h5 class="fw-bold mb-2">Reférence 19.1 </h5>
                    <div class="col-md-12">   
                        <label for="consistence_travaux">Réunion préparatoire :</label>
                        <RichTextarea v-model="reunion_preparatoire" />
                    </div>
                </div>
            </div>

            <div v-else-if="currentStep === 7"> 
                <div class="mt-3">
                    <h5 class="fw-bold mb-2">Reférence 20. </h5>
                    <div class="col-md-12">   
                        <label for="consistence_travaux">Soumission en ligne Forme :</label>
                        <RichTextarea v-model="soumission_en_ligne" />
                    </div>
                </div>

                <div class="mt-3">
                    <h5 class="fw-bold mb-2">Reférence 20.1 </h5>
                    <div class="col-md-12">   
                        <label for="consistence_travaux">Date et heure limites:</label>
                        <RichTextarea v-model="date_heure_limite" />
                    </div>
                </div>

                <div class="mt-3">
                    <h5 class="fw-bold mb-4">Reférence 22.2 </h5>
                    <div class="col-md-12">   
                        <label for="consistence_travaux">MODE DE SOUMISSION :</label>
                        <RichTextarea v-model="mode_soumission" />
                    </div>
                </div>
            </div>

            <div v-else-if="currentStep === 8"> 
                <div class="mt-3">
                    <h5 class="fw-bold mb-2">Reférence 25.1 </h5>
                    <div class="col-md-12">   
                        <label for="consistence_travaux">Ouverture de plis :</label>
                        <RichTextarea v-model="ouverture_plis" />
                    </div>
                </div> 
            </div>

            <div v-else-if="currentStep === 9"> 
                <div class="mt-3">
                    <h5 class="fw-bold mb-2">Reférence 29.1 </h5>
                    <div class="col-md-12">   
                        <label for="consistence_travaux">Qualification du soumissionnaire :</label>
                        <RichTextarea v-model="qualification_soumissionaire"/>
                    </div>
                </div> 
            </div>

            <div v-else-if="currentStep === 10"> 
                <div class="mt-3">
                    <h5 class="fw-bold mb-2">Reférence 29.1 </h5>
                    <h5><strong>Critères et Sous critères pour l'évaluation détaillée des offres.</strong></h5>
                    <div class="col-md-12">   
                        <label for="consistence_travaux"><strong>Critères éliminatoires</strong></label>
                        <RichTextarea v-model="criteres_eliminatoires"/>
                    </div>
                </div> 
            </div>

            <div v-else-if="currentStep === 11"> 
                <div class="mt-3">
                    <h5 class="fw-bold mb-2">Reférence 29.1 </h5>
                    <h5><strong>Critères et Sous critères pour l'évaluation détaillée des offres.</strong></h5>
                    <div class="col-md-12">   
                        <label for="consistence_travaux"><strong>Critères essentiels</strong></label>
                        <RichTextarea v-model="criteres_essentiels"/>
                    </div>
                </div> 
            </div>

            <div v-else-if="currentStep === 12"> 
                <div class="mt-3">
                    <h5 class="fw-bold mb-2">Reférence 31.2 </h5>
                    <div class="col-md-12">   
                        <label for="consistence_travaux">Monnaie retenue</label>
                        <RichTextarea v-model="monnaie_retenu"/>
                    </div>
                </div> 
                <div class="mt-3">
                    <h5 class="fw-bold mb-2">Reférence 32.2(b) </h5>
                    <div class="col-md-12">    
                        <RichTextarea v-model="mode_evaluation"/>
                    </div>
                </div> 
                <div class="mt-3">
                    <h5 class="fw-bold mb-2">Reférence 32.2(e) </h5>
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

            <div v-else-if="currentStep === 13"> 
                <h5><strong>ATTRIBUTION</strong></h5>
                <div class="mt-3">
                    <h5 class="fw-bold mb-2">Reférence 34.1 </h5>
                    <div class="col-md-12">    
                        <RichTextarea v-model="ref_34_1"/>
                    </div>
                </div> 
                <div class="mt-3">
                    <h5 class="fw-bold mb-2">Reférence 34.2 </h5>
                    <div class="col-md-12">    
                        <RichTextarea v-model="ref_34_2"/>
                    </div>
                </div> 
                <div class="mt-3">
                    <h5 class="fw-bold mb-2">Reférence 39.2 </h5>
                    <div class="col-md-12">    
                        <RichTextarea v-model="ref_39_2"/>
                    </div>
                </div> 
                <div class="mt-3">
                    <h5 class="fw-bold mb-2">Reférence 40 </h5>
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
import { toast } from 'vue3-toastify';
import { useRoute, useRouter } from 'vue-router';
import Loader from "@/components/Loader.vue";
import PieceNavigator from "@/components/PieceNavigator.vue";
import { useAppelOffre } from '@/composables/useAppelOffre';
import { usePiece } from '@/composables/usePiece';

import { useTravaux } from '@/composables/useTravaux';

const route = useRoute();
const router = useRouter();
const dossier = route.params.project_id      //recuperation de l'identifiant du projet
const dao = ref({});    //informations sur le dossier d'appel d'offre
const aao = ref({});    //informations sur l'avis d'appel d'offre
const isLoading = ref(true);
const pieces = ref([])  
const current_piece = route.name
const id_piece = ref()
const trouve = ref(false) //permet de savoir si le dossier est trouvé

const message = ref(''); //message d'enregistrement reussi
const errors = ref({});

const { getDAO } = useAppelOffre() 
const { get_pieces, update_piece } =  usePiece()
const { get_aao, get_rpao, create_rpao, update_rpao } = useTravaux() 

//VARIABLE DU RPAO
const consistenceTravaux = ref('')

const taux_change = ref("<p>Le taux de change pour convertir l'offre du soumissionaire en monnaie locale ainsi que pour convertir les futures décomptes en monnaies étrangère, sera celui du FCFA</p>")

const visite_travaux = ref("<p>Aux fins de la visite du site des travaux à organiser au plus [date à insérer, le cas échéant] après la publication de l’Avis d’Appel d’Offres, le service du Maître d’Ouvrage ou Maître d’ouvrage Délégué à contacter est le suivant</p>")

const liste_prequalifie = ref('')
const provenance_materiaux = ref(`<p>Les matériaux, matériels et fournitures d’équipement et services doivent provenir du marché intérieur ou du marché international.</p>`)
const monnaies_soumission = ref(`<p>le montant de la soumission est libellé entièrement en monnaie nationale</p>`)
const renseignements_necessaires = ref('')

const renseignements_complementaires =  ref("<p>Les renseignements complémentaires peuvent être obtenus aux heures ouvrables à [service (SIGAMP), numéro de porte, BP, téléphone, fax, e-mail] ou en ligne sur la plateforme COLEPS aux adresses http://www.marchespublics.cm et http://www.publiccontracts.cm, ou tout autres moyens de communication électronique indiqué par le Maître d’Ouvrage.</p>")

const langue_soumission = ref("<p>La langue de soumission est l'Anglais ou le Français</p>")

const piecesAdminLocales = ref(`<ol>
  <li>La déclaration d’intention de soumissionner timbrée signée du représentant légal ou du mandataire dument désigné ;</li>
  <li>Le cautionnement de soumission (suivant modèle joint) d’un montant de ____francs CFA et d’une durée de validité de ________mois, établi par une banque de premier ordre ou un organisme financier de première catégorie habilité par le Ministre en charge des Finances du Cameroun pour émettre des cautions dans le cadre des marchés publics ou toute autre forme prévue par la règlementation en vigueur (Chèque certifié, chèque banque, hypothèque légale), sauf dispositions contraires prévues par la convention de financement et relative à l’objet de l’appel d’offres concerné. Le délai de validité du cautionnement de soumission doit excéder de trente (30) jours celui des offres.</li>
  <li>
    L’accord de groupement -----------------------(préciser la forme du groupement notarié ou sousseing privé) et spécifiant le mandataire le cas échéant (le Maître d’Ouvrage devra privilégier les groupements solidaires);
  </li>
  <li>
    Le pouvoir de signature, le cas échéant ;
    </li> 
    <li>L’attestation de non-redevance délivrée par l’administration fiscale;</li>
    <li>Une attestation de non-faillite établie par le Tribunal de Première Instance ou tout autre document établi par l’institution compétente du pays de résidence du soumissionnaire étranger;</li>
    <li>L’attestation de domiciliation bancaire du soumissionnaire, délivrée par un établissement bancaire ou organisme habilité par le Ministre en charge des Finances du Cameroun sauf dispositions contraires prévues par la convention de financement ;</li>
    <li>La quittance d’achat du Dossier d’Appel d’Offres d’une somme non remboursable de…….............................…. francs CFA de …….............................….. francs CFA [insérer le montant en chiffres et en lettres ] payable à [Lieu de paiement des frais d’achat du DAO :[au Trésor Public pour les Administrations publiques et dans le Compte spécial CAS- ARMP pour les autres Maîtres d’Ouvrage sauf dérogation expresse] .</li>
    <li>Une attestation de non-exclusion des marchés publics délivrée par l’organisme chargé de la régulation des marchés publics portant le numéro et l’objet de l’Appel d’Offres ;</li>
    <li>Une attestation délivrée par la Caisse Nationale de Prévoyance Sociale certifiant que le soumissionnaire a satisfait à ses obligations sociales vis-à-vis de ladite caisse datant de moins de trois mois à compter de la date de signature de ladite attestation ;</li>
    <li>L’attestation de catégorisation, le cas échéant ;</li>
  </ol>`)

const piecesAdminEtrangeres = ref(`<p> a) produire les documents attestant :</p>
  <ul>
    <li>qu’ils ne sont pas en état de liquidation judiciaire ou en faillite ;</li>
    <li>qu’ils ne sont pas frappés de l'une des interdictions ou déchéances prévues par les lois et règlements en vigueur, aussi bien au plan national qu'international ;</li>
    <li>qu’ils ont souscrit les déclarations prévues par les lois et règlements en vigueur.</li>
  </ul>
  <p>
    b) En cas de production d’un cautionnement de soumission émis par un établissement financier étranger, ce dernier est acceptable sous réserve que cet établissement financier désigne un correspondant local habilité par le Ministre chargé des finances qui se porte garant en cas d’appel.
  </p>
  <p><strong>NB :</strong> Sous peine de rejet, les pièces du dossier administratif requises doivent être produites en originaux ou en copies certifiées conformes par le service émetteur ou l’autorité administrative compétente, conformément aux dispositions du Règlement Particulier de l’Appel d’Offres. Elles doivent être valides à la date limite originelle de dépôt des offres.</p>`)  ;

const refSoumissionnaire = ref(`<div>
  <ul>
    <li>
    La liste des marchés réalisés (Maître d’Ouvrage, Objet, Montant, Date de réception) par le
    soumissionnaire en tant qu’entrepreneur principal (ou sous-traitant) au cours des 
    <em>[à préciser]</em> dernières années.</li>
  </ul>
  
  <p>Ces références devront être accompagnées des pièces justificatives, en l’occurrence :</p>
  <ul>
    <li>Copies des première, deuxième et dernière pages du contrat ;</li>
    <li>PV de réception définitive ou provisoire, ou l’Attestation de bonne fin ;</li>
    <li>Autres justificatifs le cas échéant et à préciser.</li>
  </ul>

  <p>
    Dans le cadre de la passation des marchés relevant du seuil des lettres-commandes, et
    lorsqu'il est expressément prévu par le dossier de consultation, les références du
    promoteur ou d'un responsable technique d'une Petite et Moyenne Entreprise nationale
    nouvellement constituée, se substituent à celles de la personne morale lorsque celle-ci
    ne dispose pas encore du nombre d'années d'expérience ou des références requises.
  </p>

  <p>Ces références devront être accompagnées des pièces justificatives, en l’occurrence :</p>
  <ol>
    <li>CV ;</li>
    <li>Contrats de travail ;</li>
    <li>Divers actes de promotion intervenus dans la carrière ;</li>
  </ol>
</div>`);

const personnel = ref(`<div>
  <p>
    Qualification et expérience du personnel affecté au projet.
  </p> 
  <table border="1" cellpadding="8" cellspacing="0">
  <thead>
    <tr>
      <th>Poste</th>
      <th>Qualification</th>
      <th>Expérience</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td></td>
      <td></td>
      <td></td>
    </tr> 
  </tbody>
  </table>
  <p><strong>NB :</strong> Joindre, pour le personnel proposé, une copie du diplôme et les justificatifs de l’expérience, à savoir :</p>
  <ul>
    <li>Copie certifiée conforme du diplôme datant de moins de trois (03) mois ;</li>
    <li>Attestation d’inscription aux ordres nationaux le cas échéant ;</li>
    <li>Curriculum vitae signé et daté de l’expert ;</li>
    <li>Attestation de disponibilité signée et datée de l’expert ;</li>
    <li>Une attestation ou contrat de travail, ou journal de chantier justifiant l’expérience le cas échéant.</li>
  </ul>

  <p><strong>NB :</strong> Toutes les pièces citées ci-dessus devront être conformes, signées et datées de moins de trois mois pour compter de la date limite originelle de dépôt des offres.</p>

</div>`);

const materiels = ref(`
<p>Le Candidat doit établir qu’il dispose en propriété ou en location les matériels ci-après :</p>
<table border="1" cellspacing="0">
  <thead>
    <tr>
      <th>No.</th>
      <th>Type et caractéristiques du matériel</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>01</td>
      <td></td> 
    </tr> 
  </tbody>
</table>`);

const respect_formulaire = ref(`<ul>
  <li>La charte d'intégrité</li>
  <li>La déclaration d'engagement de respect des clauses sociales et environnementales</li>
  </ul>`);

const organisation_methodologie = ref(`
  <p>Le soumissionnaire devra produire une note descriptive ou méthodologique présentant de manière détaillé les éléments constitutifs de sa proposition technique, notamment:</p>
  <table border="1" cellpadding="8" cellspacing="0"> 
  <tbody>
    <tr> 
      <td>Note méthodologique sur la compréhension, l’organisation et l’exécution
        des travaux</td> 
    </tr> 
    <tr> 
      <td>Planning d’exécution des travaux</td> 
    </tr> 
  </tbody>
</table>
`);

const preuve_acceptation = ref(`
<p>Le soumissionnaire remettra les copies dûment paraphées sur chaque page et signée à la dernière
  précédée de la mention « lu et approuvé »., des documents ci-après :</p>
<table border="1" cellpadding="8" cellspacing="0"> 
  <tbody>
    <tr> 
      <td>Le Cahier des CLauses Administratives Particulières (CCAP) paraphé à chaque
        page et signé à la dernière page.</td> 
    </tr> 
    <tr> 
      <td>Les Cahiers de CLauses Techniques Particulières paraphé à chaque
        page et signé à la dernière page.</td> 
    </tr> 
  </tbody>
</table>`);

const impots_taxes = ref(`<p>Les prix figurant au bordereau des prix unitaires sont réputés avoir été établis sur la base des conditions économiques en vigueur en République du Cameroun au mois précédant celui de la soumission</p>`)

const prix_marche = ref(`<p>Les prix du marché sont éventuellement révisables et actualisables conformément aux dispositions du Code des Marchés Publics en vigueur.</p>`)

const commentaire_ccap = ref("<p>Le soumissionnaire devra joindre la note d’observation sur les CCAP et/ou les CCTP, assortie d'éventuelles propositions.</p>")

const capacite_financiere = ref(`
<table border="1" cellspacing="0">
  <thead>
    <tr>
      <th>No.</th>
      <th>DOCUMENT</th>
      <th>OPERATION À REALISER</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>01</td>
      <td>Chiffre d’affaires (bilan comptable)</td>
      <td>Bilan des trois (03) dernières
      annéestd </td> 
    </tr> 
    <tr>
      <td>02</td>
      <td>Attestation de solvabilité</td>
      <td>L'accès à une ligne de crédit ou autres ressources financières supérieure ou égale au tiers du montant prévisionnel.</td> 
    </tr>
  </tbody>
</table>
`);

const offreFinanciere = ref(`<p>Cette enveloppe comprendra les documents ci-après: </p>    <p><strong>c.1.</strong> La soumission proprement dite, en original rédigée selon le modèle joint, timbré au tarif en vigueur, signée et datée ;</p>
  <p><strong>c.2.</strong> Le Bordereau des prix unitaires et/ou forfaitaires dûment rempli ;</p>
  <p><strong>c.3.</strong> Le Détail quantitatif et estimatif dûment rempli ;</p>
  <p><strong>c.4.</strong> Le Sous-détail des prix unitaires et/ou la décomposition des prix forfaitaires ;</p> 
  <p>Les soumissionnaires utiliseront à cet effet les pièces et modèles ou formulaires types prévus dans le Dossier d’Appel d’Offres.</p>

  <h4>Evaluation des offres financières</h4>
  <p>La sous-commission d’analyse vérifiera si les offres financières sont conformes et complètes. Elle procèdera en outre à la vérification des opérations de calculs et des erreurs éventuelles y afférentes.</p>

  <p>Les offres financières des soumissionnaires seront vérifiées et éventuellement corrigées sur la base suivante :</p>

  <ul>
    <li>En cas de différence entre le montant en chiffres et le montant en lettres, c’est le montant en lettres qui fera foi ;</li>
    <li>En cas d’omission d’un prix unitaire dans le bordereau des prix unitaires, cette offre sera purement et simplement éliminée ;</li>
    <li>S’il y a une différence entre le prix du sous-détail et celui du bordereau des prix unitaires, celui du sous-détail fera foi ;</li>
    <li>Lorsqu’il y a une incohérence entre le prix unitaire et le prix total obtenu en multipliant le prix unitaire par la quantité, le prix unitaire cité fera foi, à moins qu’il soit estimé qu’il s’agit d’une erreur grossière de virgule dans le prix unitaire, auquel cas le prix total tel qu’il est présenté fera foi et le prix unitaire corrigé ;</li>
    <li>En ajustant de façon appropriée sur des bases techniques ou financières, toute autre modification, divergence ou réserve quantifiable ;</li>
    <li>En prenant en considération les différents délais d’exécution proposés par les soumissionnaires, s’ils sont autorisés ;</li>
    <li>L’offre dans laquelle il existe des postes du détail estimatif pour lesquels le soumissionnaire n’a pas indiqué de prix unitaires est purement rejetée.</li>
  </ul>

  <p>Le montant de la soumission sera alors corrigé. Si l’attributaire provisoire n’accepte pas cette correction, son offre sera rejetée et sa caution de soumission pourra être saisie dans ce cas.</p>

  <p>L'offre la moins disante sera celle ayant obtenu la meilleure note globale et satisfaisant au meilleur rapport qualité-prix et aux règlements de la Commission Interne de Passation des Marchés.</p>

  <p>L’Autorité Contractante se réserve le droit d’annuler la procédure d’Appel d’Offres et de rejeter toutes les offres, à tout moment avant attribution du marché, sans encourir de responsabilité à l’égard du ou des soumissionnaires affectés par sa décision, ni l’obligation de les informer des raisons de sa décision.</p>
  `)

const montant_cautionnement =  ref(`<p>Le montant de la caution de soumission est de : </p>`)

const evaluation_offres = ref("<p>Les offres seront évaluées sur la base d’un délai prévisionnel d’exécution des travaux compris entre________jours (ou mois) au minimum et_______ jours (ou mois) au maximum. La méthode d’évaluation figure à l’article 32.2(e) du RGAO.</p>")

const variante_techniques = ref("<p>Les variantes techniques sur la ou les parties des travaux spécifiés ci-dessous sont permises dans le cadre des spécifications techniques du présent appel d’offres.</p>")

const reunion_preparatoire = ref("<p>La réunion préparatoire à l’établissement des offres se tiendra <i>[préciser le Lieu, la date et l’heure]: [Indiquer l’adresse de la réunion, ou préciser qu’il n’y aura pas de réunion. La réunion doit avoir lieu au moins deux (2) semaines avant la date limite de dépôt des offres, et en même temps que la visite du site des travaux, si elle est prévue (Clause 7.3 du RGAO).]</i></p>")

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

`);

const date_heure_limite = ref(`<p>Date et heure limite de dépôt des offres le ________________ à 11 heures.</p>`)

const validite_offre = ref('');

const mode_soumission = ref('')

const ouverture_plis = ref(`
  <p>L’ouverture des plis se fait en un temps et aura lieu le <b>_______</b>[à préciser] à <b>_______</b> [à préciser] heures par la Commission de Passation des Marchés du Maître d’Ouvrage ou du Maître d’Ouvrage Délégué dans la salle de ______[à préciser] sise à ______ [à préciser]</p>

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

const mode_evaluation = ref(`<p>Le mode d’évaluation des travaux en régie à chiffrer de façon compétitive est défini comme suit : <i>[à préciser le cas échéant]</i> et le pourcentage desdits travaux devra être précisé </p>`)

const ref33_1 = ref(`<p>Les soumissionnaires nationaux <i>[bénéficient ou ne bénéficient pas]</i> d’une marge de préférence nationale au cours de l’évaluation.</p>`)

const ref_32_2_e = ref(`<p>Le délai d’exécution sera évalué comme suit:(à préciser le cas échéant)</p>`)
const ref_32_2_g = ref(`<p>La méthode d’évaluation des variantes techniques est la suivante:</p>`)

const ref_34_1 = ref(`<p>Le Maitre d’Ouvrage ou le Maitre d’Ouvrage Délégué attribue le marché au soumissionnaire dont l’offre a été reconnue conforme pour l’essentiel au Dossier d’Appel d’offres et qui dispose des capacités techniques et financières requises pour exécuter le marché de façon satisfaisante et dont l’offre a été évaluée la moins disante après application des remises proposées le cas échéant.</p>`)

const ref_34_2 = ref(`<p>La combinaison à appliquer en cas d’attribution simultanée de plusieurs lots est la suivante le Maître d’Ouvrage ou le Maître d’Ouvrage Délégué tiendra compte des rabais proposés et se basera sur la combinaison qui lui est la plus avantageuse économiquement afin d’arrêter la liste d’attributaires par lot: ans le cas contraire, <i>[préciser le cas échéant, un autre mode que celui le plus économiquement avantageux pour le Maître d’Ouvrage ou Maître d’Ouvrage Délégué]</i></p>`)

const ref_39_2 = ref(`<p>Le taux du cautionnement définitif est de : _________________________ <i>[à préciser (entre 2 et 5%)]</i> du montant toutes taxes comprises du marché</p>
<p>Dans un délai de vingt (20) jours à compter de la date de notification du marché par le Maître d’ouvrage,le cocontractant fournira un cautionnement définitif suivant le modèle joint au Dossier d’appel d’offres. La non production dudit cautionnement dans les délais et conditions de l’article 28 du CCAP expose le soumissionnaire aux sanctions prévues par l’article 37 dudit CCAP</p>
`)

const ref_40 = ref(`<p>Les Présidents et Membres de commission, les Soumissionnaires et les autres intervenants de la procédure doivent observer en tout temps, les règles d’éthique professionnelle les plus strictes. Ils doivent notamment s’interdire toute corruption ou toute autre forme de manœuvres frauduleuses. En vertu de ce principe, les expressions sont définies de la façon suivante </p>
<p>(i) Est coupable de “<strong>corruption</strong>” quiconque offre, donne, sollicite ou accepte directement ou indirectement un quelconque avantage en vue d’influencer l’action d’un agent public au cours de l’attribution ou de l’exécution d’un marché ou d’une lettre commande, et</p>

<p>(ii) est coupable de “<strong>corruption</strong>” quiconque fournit, sollicite ou accepte plusieurs offres émises par le même soumissionnaire sous des noms des sociétés différentes et/ou sur
des numéros d’enregistrement différents </p>

<p>(iii) se livre à des “manœuvres frauduleuses” quiconque déforme ou dénature des faits afin
d’influencer l’attribution ou l’exécution d’un marché ou d’une lettre commande de manière préjudiciable au Maître d’Ouvrage ou au Maître d’Ouvrage Délégué. Les “Manœuvres frauduleuses” comprennent notamment toute entente ou manœuvre collusoire des soumissionnaires (avant ou après la remise de l’offre) visant à maintenir artificiellement les prix des cotations à des niveaux ne correspondant pas à ceux qui résulteraient du jeu d’une concurrence libre et ouverte, et à priver ainsi le Maître d’Ouvrage ou le Maître d’Ouvrage Délégué des avantages de cette dernière.</p>
`)


onMounted(async () => {
    try {
        isLoading.value = true;
        const responsePiece = await get_pieces(dossier)
        pieces.value = responsePiece 
        //récuperer les informations sur le dossier d'appel d'offre.
        const responseDAO = await getDAO(dossier)
        dao.value = responseDAO[0]; 
        // RECUPERER les informations sur l'aao.
        const responseAAO = await get_aao(dossier) 
        aao.value = responseAAO[0] 

        const responseRPAO = await get_rpao(dossier)

        // Une fois les pièces chargées, on met à jour l’index courant
        const index = pieces.value.findIndex(p => p.piece.nom_composant === current_piece);
        id_piece.value = pieces.value[index].id; 

        

        consistenceTravaux.value = `<h5><b>Définition des travaux</b></h5><p>Le présent Appel d'Offre a pour objet : ${dao.value.objet_appel} </p> <p>${aao.value.consistence_travaux} </p> <p><b>Autorité contractante : </b> ${dao.value.maitre_ouvrage} </p><p><b>Références de l’Appel d’Offres : </b> « ${dao.value.titre_complet} » </p>`

        validite_offre.value =  `<p>La période de validité des offres est <b>${aao.value.duree_validite} jours</b> à partir de la date limite de dépôt des offres.</p>`;

        mode_soumission.value = `<p>Le mode de soumission retenu pour cette consultation est <b>${aao.value.mode_soumission}</b>.</p>`;

        //Si le RPAO existe déja on récupère les valeur qu'on affecte aux différent champs du formulaire 
        if(responseRPAO && responseRPAO.length > 0){
          trouve.value = true
          consistenceTravaux.value = responseRPAO[0].consistenceTravaux
          taux_change.value = responseRPAO[0].taux_change
          visite_travaux.value = responseRPAO[0].visite_travaux
          liste_prequalifie = responseRPAO[0].liste_prequalifie
          provenance_materiaux = responseRPAO[0].provenance_materiaux
          monnaies_soumission = responseRPAO[0].monnaies_soumission
          renseignements_necessaires = responseRPAO[0].renseignements_necessaires
          renseignements_complementaires.value = responseRPAO[0].renseignements_complementaires
          langue_soumission.value = responseRPAO[0].langue_soumission
          piecesAdminLocales.value = responseRPAO[0].piecesAdminLocales
          piecesAdminEtrangeres.value = responseRPAO[0].piecesAdminEtrangeres
          refSoumissionnaire.value = responseRPAO[0].refSoumissionnaire
          personnel.value = responseRPAO[0].personnel
          materiels.value = responseRPAO[0].materiels
          respect_formulaire.value = responseRPAO[0].respect_formulaire
          organisation_methodologie.value = responseRPAO[0].organisation_methodologie
          preuve_acceptation.value = responseRPAO[0].preuve_acceptation
          impots_taxes.value = responseRPAO[0].impots_taxes
          prix_marche.value = responseRPAO[0].prix_marche
          commentaire_ccap.value = responseRPAO[0].commentaire_ccap
          capacite_financiere.value = responseRPAO[0].capacite_financiere
          offreFinanciere.value = responseRPAO[0].offreFinanciere
          montant_cautionnement.value = responseRPAO[0].montant_cautionnement
          evaluation_offres.value = responseRPAO[0].evaluation_offres
          variante_techniques.value = responseRPAO[0].variante_techniques
          reunion_preparatoire.value = responseRPAO[0].reunion_preparatoire
          soumission_en_ligne.value = responseRPAO[0].soumission_en_ligne
          date_heure_limite.value = responseRPAO[0].date_heure_limite
          validite_offre.value = responseRPAO[0].validite_offre
          mode_soumission.value = responseRPAO[0].mode_soumission
          ouverture_plis.value = responseRPAO[0].ouverture_plis
          qualification_soumissionaire.value = responseRPAO[0].qualification_soumissionaire
          criteres_eliminatoires.value = responseRPAO[0].criteres_eliminatoires
          criteres_essentiels.value = responseRPAO[0].criteres_essentiels
          monnaie_retenu.value = responseRPAO[0].monnaie_retenu
          mode_evaluation.value = responseRPAO[0].mode_evaluation
          ref33_1.value = responseRPAO[0].ref33_1
          ref_32_2_e.value = responseRPAO[0].ref_32_2_e
          ref_32_2_g.value = responseRPAO[0].ref_32_2_g
          ref_34_1.value = responseRPAO[0].ref_34_1
          ref_34_2.value = responseRPAO[0].ref_34_2
          ref_39_2.value = responseRPAO[0].ref_39_2
          ref_40.value = responseRPAO[0].ref_40
        } 
 
    } catch (error) {
        console.error("Erreur lors de la récupération du DAO :", error) 
    } finally{
        isLoading.value = false;
    }
}) 


const handleSubmit = async () => {
    errors.value = {}
    isLoading.value = true; 

    try {
        const rpaoData = { 
          consistenceTravaux : consistenceTravaux.value,
          taux_change : taux_change.value,
          visite_travaux : visite_travaux.value,
          renseignements_complementaires : renseignements_complementaires.value,
          langue_soumission : langue_soumission.value,
          liste_prequalifie : liste_prequalifie.value,
          provenance_materiaux : provenance_materiaux.value,
          monnaies_soumission : monnaies_soumission.value,
          renseignements_necessaires : renseignements_necessaires.value,
          piecesAdminLocales : piecesAdminLocales.value,
          piecesAdminEtrangeres : piecesAdminEtrangeres.value,
          refSoumissionnaire : refSoumissionnaire.value,
          personnel : personnel.value,
          materiels : materiels.value,
          respect_formulaire : respect_formulaire.value,
          organisation_methodologie : organisation_methodologie.value,
          preuve_acceptation : preuve_acceptation.value,
          impots_taxes : impots_taxes.value,
          prix_marche : prix_marche.value,
          commentaire_ccap : commentaire_ccap.value,
          capacite_financiere : capacite_financiere.value,
          offreFinanciere : offreFinanciere.value,
          montant_cautionnement : montant_cautionnement.value,
          evaluation_offres : evaluation_offres.value,
          variante_techniques : variante_techniques.value,
          reunion_preparatoire : reunion_preparatoire.value,
          soumission_en_ligne : soumission_en_ligne.value,
          date_heure_limite : date_heure_limite.value,
          validite_offre : validite_offre.value,
          mode_soumission : mode_soumission.value,
          ouverture_plis : ouverture_plis.value,
          qualification_soumissionaire : qualification_soumissionaire.value,
          criteres_eliminatoires : criteres_eliminatoires.value,
          criteres_essentiels : criteres_essentiels.value,
          monnaie_retenu : monnaie_retenu.value,
          mode_evaluation : mode_evaluation.value,
          ref33_1 : ref33_1.value,
          ref_32_2_e : ref_32_2_e.value,
          ref_32_2_g : ref_32_2_g.value,
          ref_34_1 : ref_34_1.value,
          ref_34_2 : ref_34_2.value,
          ref_39_2 : ref_39_2.value,
          ref_40 : ref_40.value,
        }; 



        if(trouve.value){
            const response = await update_rpao(dossier, rpaoData)
            message.value = response.message
        }else {
            const response = await create_rpao(dossier, rpaoData)
            //mise à jour du statut de la piece
            const update = await update_piece(id_piece.value, true);

            //Définition du message
            message.value = response.message 
        }
          
        //toast pour informer l'utilisateur
        toast.success(message, {
            theme: 'colored',
            autoClose: 2000,
        });

        
    
        //rediriger vers la page de gestion du dossier d'appel d'offre
        /*setTimeout(() => {
            router.push({ name: 'edit', params: { project_id: projectId } }); 
        }, 5000);*/
        
    } catch (err) { 
        toast.error(err, {
            theme: 'colored',
            autoClose: 2000,
        });
        errors.value = err;
        console.log(err)
    }finally {
        isLoading.value = false; 
    }
}

</script>
