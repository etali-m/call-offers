<template>
    <Loader v-if="isLoading" />
    <div v-else>
        <HeaderPiece numero_piece="3" :numero_dossier="dao.numero_appel_offre" :moe="dao.maitre_ouvrage" :description_travaux="dao.objet_appel"/>

        <PieceNavigator :project-id="dao.id" :current-piece-name="$route.name" />

        <div class="form-container">
            <form @submit.prevent="handleSubmit" style="padding-left:10px;">
              <StepperForm :totalSteps="14" v-slot="{ currentStep, nextStep, prevStep, isLastStep }">

                <div v-if="currentStep === 0">
                    <h5 class="fw-bold mb-4">Référence 1.1</h5>
                    <div class="row">
                        <div class="col-md-12">
                            <label>Descriptif de l'opération :</label>
                            <RichTextarea v-model="ref_1_1"/>
                        </div>
                    </div> <br>

                    <h5 class="fw-bold mb-4">Référence 1.2</h5>
                    <div class="row">
                        <div class="col-md-12">
                            <label>Étendue de la consultation (concours, mode de sélection, coût et délai globaux) :</label>
                            <RichTextarea v-model="ref_1_2"/>
                        </div>
                    </div>
                </div>

                <div v-else-if="currentStep === 1">
                    <h5 class="fw-bold mb-4">Référence 1.4</h5>
                    <div class="col-md-12">
                        <label>Répartition en phase conception et phase travaux :</label>
                        <RichTextarea v-model="ref_1_4"/>
                    </div> <br>

                    <h5 class="fw-bold mb-4">Référence 1.5</h5>
                    <div class="col-md-12">
                        <label>Conférence préalable à l'établissement des offres :</label>
                        <RichTextarea v-model="ref_1_5"/>
                    </div> <br>

                    <h5 class="fw-bold mb-4">Référence 1.6</h5>
                    <div class="col-md-12">
                        <label>Responsable(s) du Maître d'Ouvrage à contacter :</label>
                        <RichTextarea v-model="ref_1_6"/>
                    </div>
                </div>

                <div v-else-if="currentStep === 2">
                    <h5 class="fw-bold mb-4">Référence 2</h5>
                    <div class="col-md-12">
                        <label>Source(s) de financement :</label>
                        <RichTextarea v-model="ref_2"/>
                    </div> <br>

                    <h5 class="fw-bold mb-4">Référence 4.2</h5>
                    <div class="col-md-12">
                        <label>Candidats admis à participer :</label>
                        <RichTextarea v-model="ref_4_2"/>
                    </div>
                </div>

                <div v-else-if="currentStep === 3">
                    <h5 class="fw-bold mb-4">Référence 5.1</h5>
                    <div class="col-md-12">
                        <label>Provenance des matériaux, matériels et fournitures :</label>
                        <RichTextarea v-model="ref_5_1"/>
                    </div> <br>

                    <h5 class="fw-bold mb-4">Référence 6.2</h5>
                    <div class="col-md-12">
                        <label>Pièces à produire uniquement par le mandataire du groupement :</label>
                        <RichTextarea v-model="ref_6_2"/>
                    </div> <br>

                    <h5 class="fw-bold mb-4">Référence 7</h5>
                    <div class="col-md-12">
                        <label>Visite du site :</label>
                        <RichTextarea v-model="ref_7"/>
                    </div>
                </div>

                <div v-else-if="currentStep === 4">
                    <h5 class="fw-bold mb-4">Référence 9</h5>
                    <div class="col-md-12">
                        <label>Éclaircissements / renseignements complémentaires :</label>
                        <RichTextarea v-model="ref_9"/>
                    </div> <br>

                    <h5 class="fw-bold mb-4">Référence 11</h5>
                    <div class="col-md-12">
                        <label>Délai de dépôt des offres :</label>
                        <RichTextarea v-model="ref_11"/>
                    </div>
                </div>

                <div v-else-if="currentStep === 5">
                    <h5 class="fw-bold mb-4">Référence 13.2</h5>
                    <div class="col-md-12">
                        <label>Volumes de soumission (4 enveloppes) :</label>
                        <RichTextarea v-model="ref_13_2"/>
                    </div> <br>

                    <h5 class="fw-bold mb-4">Référence 13.3</h5>
                    <div class="col-md-12">
                        <label>Soumission électronique :</label>
                        <RichTextarea v-model="ref_13_3"/>
                    </div>
                </div>

                <div v-else-if="currentStep === 6">
                    <h5 class="fw-bold mb-4">Référence 13.4</h5>
                    <div class="col-md-12">
                        <label>Lieu, date et heure limite de dépôt :</label>
                        <RichTextarea v-model="ref_13_4"/>
                    </div> <br>

                    <h5 class="fw-bold mb-4">Référence 13.7</h5>
                    <div class="col-md-12">
                        <label>Ouverture des plis (deux temps) :</label>
                        <RichTextarea v-model="ref_13_7"/>
                    </div> <br>

                    <h5 class="fw-bold mb-4">Référence 14</h5>
                    <div class="col-md-12">
                        <label>Langue de l'offre et volumes attendus :</label>
                        <RichTextarea v-model="ref_14"/>
                    </div>
                </div>

                <div v-else-if="currentStep === 7">
                    <h5 class="fw-bold mb-4">Référence 15.1</h5>
                    <div class="col-md-12">
                        <label>Caution de soumission et dossier administratif détaillé :</label>
                        <RichTextarea v-model="ref_15_1"/>
                    </div> <br>

                    <h5 class="fw-bold mb-4">Référence 16.1</h5>
                    <div class="col-md-12">
                        <label>Montant de l'offre / coût global du projet :</label>
                        <RichTextarea v-model="ref_16_1"/>
                    </div>
                </div>

                <div v-else-if="currentStep === 8">
                    <h5 class="fw-bold mb-4">Référence 16.4</h5>
                    <div class="col-md-12">
                        <label>Variation des prix :</label>
                        <RichTextarea v-model="ref_16_4"/>
                    </div> <br>

                    <h5 class="fw-bold mb-4">Référence 17</h5>
                    <div class="col-md-12">
                        <label>Monnaie de soumission et taux de change :</label>
                        <RichTextarea v-model="ref_17"/>
                    </div>
                </div>

                <div v-else-if="currentStep === 9">
                    <h5 class="fw-bold mb-4">Référence 18</h5>
                    <div class="col-md-12">
                        <label>Délai de validité des offres :</label>
                        <RichTextarea v-model="ref_18"/>
                    </div> <br>

                    <h5 class="fw-bold mb-4">Référence 19</h5>
                    <div class="col-md-12">
                        <label>Montant de la caution de soumission :</label>
                        <RichTextarea v-model="ref_19"/>
                    </div> <br>

                    <h5 class="fw-bold mb-4">Référence 20.3</h5>
                    <div class="col-md-12">
                        <label>Variantes :</label>
                        <RichTextarea v-model="ref_20_3"/>
                    </div>
                </div>

                <div v-else-if="currentStep === 10">
                    <h5 class="fw-bold mb-4">Référence 22.5</h5>
                    <div class="col-md-12">
                        <label>Mode de soumission (en ligne / hors ligne) :</label>
                        <RichTextarea v-model="ref_22_5"/>
                    </div>
                </div>

                <div v-else-if="currentStep === 11">
                    <h5 class="fw-bold mb-4">Référence 24</h5>
                    <div class="col-md-12">
                        <label>Critères d'évaluation (éliminatoires et essentiels) :</label>
                        <RichTextarea v-model="ref_24"/>
                    </div> <br>

                    <h6 class="fw-bold mb-2">Critères éliminatoires</h6>
                    <div class="col-md-12">
                        <RichTextarea v-model="criteres_eliminatoires"/>
                    </div> <br>

                    <h6 class="fw-bold mb-2">Critères essentiels</h6>
                    <div class="col-md-12">
                        <RichTextarea v-model="criteres_essentiels"/>
                    </div> <br>

                    <h5 class="fw-bold mb-4">Référence 25</h5>
                    <div class="col-md-12">
                        <label>Grille détaillée des critères et sous-critères (NA, NT, NF, NG) :</label>
                        <RichTextarea v-model="ref_25"/>
                    </div>

                    <div class="row mt-3">
                        <div class="col-md-4 form-check">
                            <input type="checkbox" class="form-check-input" id="formation_element_majeur" v-model="formation_element_majeur">
                            <label class="form-check-label" for="formation_element_majeur">Formation, élément majeur de la mission</label>
                        </div>
                        <div class="col-md-4">
                            <label class="label-custom">Pondération artistique (%)</label>
                            <input type="number" step="0.01" class="input-custom" v-model="poids_artistique">
                        </div>
                        <div class="col-md-4">
                            <label class="label-custom">Pondération technique (%)</label>
                            <input type="number" step="0.01" class="input-custom" v-model="poids_technique">
                        </div>
                        <div class="col-md-4 mt-2">
                            <label class="label-custom">Pondération financière (%)</label>
                            <input type="number" step="0.01" class="input-custom" v-model="poids_financiere">
                        </div>
                    </div>
                </div>

                <div v-else-if="currentStep === 12">
                    <h5 class="fw-bold mb-4">Référence 30</h5>
                    <div class="col-md-12">
                        <label>Cautionnement définitif :</label>
                        <RichTextarea v-model="ref_30"/>
                    </div> <br>

                    <h5 class="fw-bold mb-4">Référence 35</h5>
                    <div class="col-md-12">
                        <label>Attribution du marché :</label>
                        <RichTextarea v-model="ref_35"/>
                    </div>
                </div>

                <div v-else-if="currentStep === 13">
                    <h5 class="fw-bold mb-4">Référence 36</h5>
                    <div class="col-md-12">
                        <label>Principes Éthiques :</label>
                        <RichTextarea v-model="ref_36"/>
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
import Loader from '@/components/Loader.vue';
import PieceNavigator from '@/components/PieceNavigator.vue';
import { useAppelOffre } from '@/composables/useAppelOffre'; 
import { usePiece } from '@/composables/usePiece';
import { useConceptionRealisation } from '@/composables/useConceptionRealisation';

const route = useRoute();
const router = useRouter();
const dossier = route.params.project_id
const dao = ref({})
const aao = ref({})
const isLoading = ref(true)
const pieces = ref([])
const current_piece = route.name
const id_piece = ref()
const trouve = ref(false)
const message = ref('');
const errors = ref({});

const { getDAO } = useAppelOffre()
const { get_pieces, update_piece } = usePiece()
const { get_aao, get_rpao, create_rpao, update_rpao } = useConceptionRealisation()

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

// ===== Champs du RPAO (ref_X_Y = ligne "X.Y" du tableau du RPAO conception-réalisation) =====
const ref_1_1 = ref(`<p>Faire une description précise du projet. Le concours est organisé sur la base d'un programme établi par le Maître d'Ouvrage ou le Maître d'Ouvrage Délégué qui indique les besoins auxquels doit répondre la prestation. Le contenu des prestations est détaillé dans le programme.</p><p>Lieu d'exécution : <i>[préciser le lieu d'exécution du projet]</i></p><p>Nom, objectifs et description de la mission : <i>[à préciser]</i></p>`)

const ref_1_2 = ref(`<p>La procédure de passation du marché est celle de « l'appel d'offres avec concours », décrite aux articles 79 et 119 du Code des marchés publics.</p><p>Mode de sélection : le marché sera attribué au soumissionnaire ayant produit l'offre évaluée la mieux-disante, par combinaison des critères techniques, financiers et esthétiques.</p><p>Le coût global prévisionnel du projet (conception et réalisation) est estimé à <i>[préciser le montant prévisionnel de l'enveloppe]</i>.</p><p>Le délai global prévisionnel d'exécution des prestations est de : ……"Dg"…. jours calendaires ou mois, dont …"Dc"…. pour la phase de conception et …"Dt"… pour la phase des travaux, sachant que "Dg = Dc + Dt".</p>`)

const ref_1_4 = ref(`<p>Le délai global prévisionnel d’exécution des prestations est de : <em> ……"Dg"…</em>. Jours calendaires ou mois, dont <em>…"Dc"….</em> pour la phase de conception et <em>…"Dt"</em> pour la phase des travaux, sa
chant que "Dg = Dc + Dt". </p>
<p>Pour chacune des phases, le délai court à compter de la date de notification de l’ordre de ser
vice de commencer les prestations concernées. </p>`)

const ref_1_5 = ref(`<p>Les prestations à exécuter sont réparties en deux (02) phases : la phase de Conception et la  phase des Travaux. </p> <br />
<p>Conférence préalable à l’établissement des offres :  </p>
<p><em>Toutes les informations relatives à la conférence préalable à l'établissement des offres seront présentées ici.</em></p>
`)

const ref_1_6 = ref(`<p>Le Maître d’Ouvrage ou le Maître d’Ouvrage Délégué fournit les informations suivantes : </p>
<ul>
<li></li>
</ul>
`)

const ref_2 = ref('')

const ref_4_2 = ref(`<p>Tout Appel d'Offres relatif aux Marchés de Conception Réalisation est ouvert aux soumissionnaires (opérateurs économiques) organisés en groupement d'entreprises solidaires. Néanmoins, pour les seuls marchés de conception réalisation portant sur les seuls ouvrages d'infrastructure, le groupement n'est pas obligatoire, conformément aux dispositions de l'arrêté N°168/A/MINMAP du 11 août 2021.</p><p>Il est interdit à toute personne ayant pris part à l'organisation et à l'élaboration du programme du concours, ainsi qu'aux membres du Jury, de concourir et de participer directement ou indirectement aux travaux.</p>`)

const ref_5_1 = ref(`<p>Provenance des matériaux, materiels et fournitures : </p>
<p>Aucun matériau, matériel ni fourniture destiné à l'utilisation dans le cadre de ce projet ne devra provenir des lieux ci-après : <i>[indiquer les pays non éligibles, le cas échéant]</i>. Privilégier autant que possible l'utilisation du matériau produit localement.</p>`)

const ref_6_2 = ref(`<p>Le mandataire d’un groupement ne peut se présenter comme membre d'une autre équipe candidate pour la présente consultation. Par contre, les autres membres peuvent se présenter 
dans d’autres équipes.  </p>
<p>Chaque membre du groupement doit présenter un dossier administratif complet. Toutefois, l'attestation de domiciliation bancaire, la quittance d'achat du DAO, le cautionnement de soumission, la charte d'intégrité et l'engagement à respecter les clauses environnementales et sociales sont présentées uniquement par le mandataire du groupement.</p> <br />
<p>le Maître d’Ouvrage devra préciser les autres informations à fournir par le groupement 
(mandataire) et celles à fournir par chaque membre du groupement le cas échéant.</p>
`)

const ref_7 = ref(`<p>La visite du site des travaux sera organisée par le Maître d'Ouvrage ou le Maître d'Ouvrage Délégué au plus tard <em>[date à insérer, le cas échéant]</em> après la publication de l'Avis d'Appel d'Offres.  Le service du Maître d’Ouvrage ou Maître d’ouvrage Délégué à contacter est le 
suivant <em>[à indiquer]</em> :
<ul>
<li>BP: <em>[à insérer]</em> </li>
<li>Tel: <em>[à insérer]</em></li>
<li>Fax: <em>[à insérer]</em></li>
<li>Email: <em>[à insérer]</em></li>
</ul>
<p>Il est conseillé à chaque soumissionnaire de visiter et d’inspecter le site des travaux et ses 
environs et d’obtenir par lui-même, et sous sa propre responsabilité, tous les renseignements 
qui peuvent être nécessaires pour la préparation de l’offre et l’exécution des études et des 
travaux. Les coûts liés à la visite du site sont à la charge du Soumissionnaire.</p>`)

const ref_9 = ref(`<p>Des éclaircissements peuvent être demandés au plus tard <em>[indiquer le nombre de jours]</em> jours avant la date de remise des offres.</p>
<p>Les demandes d’éclaircissement doivent mentionner le nom et l’adresse complète du requérant 
et être expédiées à l’adresse suivante : <em>[Inserer l'adresse complète]</em> 
</p>
<br />
<p>Les renseignements complémentaires peuvent être obtenus aux heures ouvrables à  [service 
(SIGAMP), numéro de porte, BP, téléphone, fax, e-mail] ou en ligne sur la plateforme COLEPS 
aux adresses http://www.marchespublics.cm et http://www.publiccontracts.cm, ou tout autre 
moyen de communication électronique indiqué par le Maître d’Ouvrage </p>`)

const ref_11 = ref(`<p>Les offres des soumissionnaires, contenues dans un pli, devront être déposées dans un délai de quatre-vingt-dix (90) jours à compter de la date publication de l'avis d'appels d'offres dans le Journal des Marchés Publics de l'organisme chargé de la régulation des marchés publics. 
Tout pli parvenu au Maître d’Ouvrage ou au Maître d’Ouvrage Délégué après les date et heure 
limites fixées pour le dépôt des offres conformément à l’Article 13 du RGAO sera déclaré hors 
délai et ne sera pas réceptionné. </p>`)

const ref_13_2 = ref('')

const ref_13_3 = ref(`<p>Si la soumission est faite par voie électronique, l'offre devra être transmise sur la plateforme COLEPS au plus tard le ……..à……… Une copie de sauvegarde enregistrée sur clé USB ou CD/DVD devra être transmise sous pli scellé avec la mention « copie de sauvegarde ».</p>`)

const ref_13_4 = ref(`<p>Les plis devront être déposés contre récépissé dans les services du Maître d'Ouvrage ou du Maître d'Ouvrage Délégué à/au <em> [préciser le lieu de dépôt] </em>, au plus tard le …… <em>[date limite]</em> à ….. <em>[heure limite]</em>, en présence des soumissionnaires ou de leurs représentants dûment mandatés.</p>`)

const ref_13_7 = ref(`<p>L'ouverture des plis se fera en deux (02) temps : </p>

<p> <u>dans un premier temps</u> </p>
Les enveloppes contenant les pièces administratives et les propositions artistiques seront 
ouvertes par la commission de passation des marchés le …...... <em>[préciser la date]</em> ................ à …......<em>[préciser l’heure]</em>...... heures précises, dans la salle de.............. sise à.......... 
….......<em>[préciser le lieu]</em>...........…. en présence des représentants des soumissionnaires dûment 
mandatés qui souhaitent y assister. <br />

<p>Les propositions techniques restent cachetées et sont confiées au Président de la Commission 
de Passation des Marchés compétente qui les conserve jusqu’à la séance d’ouverture desdites 
propositions. </p>

<strong>Sous peine de rejet, les pièces du dossier administratif requises doivent être produites en 
originaux ou en copies certifiées conformes par le service émetteur ou autorité 
administrative compétente, conformément aux stipulations du Règlement Particulier de 
l’Appel d’Offres. Elles doivent être valide au moment du dépôt de l’Offre dater de moins 
de trois (03) mois à compter de la date limite originelle d’ouverture des offres ou avoir été 
établies postérieurement à la date de signature de l’avis d’appel d’offres. </strong>

<p>En cas d’absence ou de non-conformité d’une pièce du dossier administratif lors de l’ouverture 
des plis, un délai de quarante-huit heures est accordé aux soumissionnaires concernés pour 
produire ou remplacer la pièce en question. </p>
<p></p>
<p>Est déclarée irrecevable et rejetée par la Commission de Passation des Marchés :</p>
<ul>
<li>Toute offre produite en nombre insuffisant ou uniquement en copies</li>
<li>Les plis portant les indications sur l’identité des soumissionnaires, </li>
<li>Les plis parvenus postérieurement aux dates et heures limites de dépôt.   </li>
<li>Les plis sans indication de l’identité de l’Appel d’Offres</li>
<li>Les plis non-conformes au mode de soumission</li>
<li>Toute offre non conforme aux prescriptions du DAO</li>
<li> L’absence de la caution de soumission délivrée par un organisme ou une 
institution financière agréée par le Ministre en charge des finances pour émettre 
les cautions dans le domaine des marchés publics ou le non-respect des modèles 
des pièces du Dossier d'Appel d'Offres, entraînera le rejet pur et simple de l'offre 
sans aucun recours.  Une caution de soumission produite mais n'ayant aucun rapport 
avec la consultation concernée est considérée comme absente. La caution de 
soumission présentée par un soumissionnaire au cours de la séance d’ouverture des 
plis est irrecevable. ;  
</li>
<li>le défaut de présentation du septième exemplaire de l’offre technique, dans une 
enveloppe scellée et marquée « offre témoin » pour servir d’offre témoin destiné à 
l’organisme chargé de la régulation des Marchés Publics, entraîne l’irrecevabilité de 
l’offre du candidat concerné, dès l’ouverture des plis par la Commission de Passation 
des Marchés </li>
</ul>

<p> <u>Dans un second temps :</u> </p>
<p>Seules les propositions techniques des soumissionnaires ayant obtenu la note minimale requise 
à l’issue de l’évaluation des dossiers administratifs et des propositions artistiques seront ouvertes par la Commission de Passation des Marchés à la date et au lieu qui leur seront 
communiqués par le Maître d’Ouvrage ou Maître d’Ouvrage Délégué, en présence des 
représentants des soumissionnaires dûment mandatés qui souhaitent y assister.</p>

<p>
<strong>NB : </strong>
A l’issue de la séance de dépouillement des dossiers administratifs et des offres 
artistiques, la proposition technique témoin scellée contenant une copie de la proposition 
technique, est paraphée et cachetée par le Président de la Commission de Passation des 
Marchés et remise à l’assistant de régulation (collecteur de l’organisme en charge de la 
régulation des marchés publics) désigné à cet effet.
</p>

 `)

const ref_14 = ref(`<p>L'offre est rédigée en français ou en anglais.</p>`)

const ref_15_1 = ref(`<p>L’offre présentée par le soumissionnaire comprendra notamment les documents détaillés ci-après, dûment remplis et regroupés en quatre (04) volumes : </p>

<div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.7; color: #222; text-align: justify;">

  <!-- ==================== VOLUME 1 ==================== -->

  <h2 style="font-size: 16px; font-weight: 700; margin: 25px 0 15px 0; color: #111;">
    Volume 1 : Dossier administratif
  </h2>

  <p style="margin: 0 0 12px 0;">
    Le dossier administratif devra contenir les pièces ci-après :
  </p>

  <p style="margin: 0 0 10px 0;">
    <strong>a)</strong>
    Une lettre de soumission de l’offre (tableau 12A), signée et datée ;
  </p>

  <p style="margin: 0 0 10px 0;">
    <strong>b)</strong>
    La caution de soumission (suivant modèle joint) d’un montant de
    <span style="border-bottom: 1px dotted #555; display: inline-block; min-width: 100px;">&nbsp;</span>
    francs CFA et d’une durée de validité de
    <span style="border-bottom: 1px dotted #555; display: inline-block; min-width: 80px;">&nbsp;</span>
    mois, établie par <em>une banque de premier ordre</em> ou un organisme financier de
    <em>première catégorie</em> habilité par le Ministre en charge des Finances du Cameroun
    pour émettre des cautions dans le cadre des marchés publics ou toute autre forme prévue
    par la réglementation en vigueur (Chèque certifié, chèque banque, hypothèque légale),
    sauf dispositions contraires prévues par la convention de financement et relative à
    l’objet de l’appel d’offres concerné.
  </p>

  <p style="margin: 0 0 12px 0;">
    La validité du cautionnement de soumission doit excéder de trente (30) jours
    celle des offres.
  </p>

  <p style="margin: 0 0 10px 0;">
    <strong>c)</strong>
    L’accord de groupement
    <span style="border-bottom: 1px dotted #555; display: inline-block; min-width: 180px;">&nbsp;</span>
    (préciser la forme du groupement notarié ou sous seing privé) et spécifiant le mandataire
    le cas échéant (le Maître d’Ouvrage devra privilégier les groupements solidaires) ;
  </p>

  <p style="margin: 0 0 10px 0;">
    <strong>d)</strong>
    Le pouvoir de signature, le cas échéant ;
  </p>

  <p style="margin: 0 0 10px 0;">
    <strong>e)</strong>
    Une attestation de non redevance délivrée par l’autorité compétente de l’administration
    fiscale dont la date de validité est postérieure à la date de lancement de la consultation,
    certifiant que le soumissionnaire a effectué les déclarations réglementaires en matière
    d'impôts pour l'exercice en cours ;
  </p>

  <p style="margin: 0 0 10px 0;">
    <strong>f)</strong>
    Une attestation de non-faillite établie par le Tribunal de Première Instance ou tout autre
    document établi par l’institution compétente du pays de résidence du soumissionnaire
    étranger dont la date de validité est postérieure à la date de lancement de la consultation ;
  </p>

  <p style="margin: 0 0 10px 0;">
    <strong>g)</strong>
    L’attestation de domiciliation bancaire du soumissionnaire, délivrée par un établissement
    bancaire ou organisme habilité par le Ministre en charge des Finances du Cameroun,
    sauf dispositions contraires prévues par la convention de financement ;
  </p>

  <p style="margin: 0 0 10px 0;">
    <strong>h)</strong>
    La quittance d’achat du Dossier d’Appel d’Offres ou toute autre preuve prévue par le
    Maître d’Ouvrage de versement d’une somme non remboursable de
    <span style="border-bottom: 1px dotted #555; display: inline-block; min-width: 180px;">&nbsp;</span>
    francs CFA ;
  </p>

  <p style="margin: 0 0 10px 0;">
    <strong>i)</strong>
    Une attestation de non exclusion des marchés publics délivrée par l’autorité compétente
    de l’organisme chargé de la régulation des marchés publics ;
  </p>

  <p style="margin: 0 0 10px 0;">
    <strong>j)</strong>
    Une attestation délivrée par la Caisse Nationale de Prévoyance Sociale certifiant que le
    soumissionnaire a satisfait à ses obligations sociales vis-à-vis de ladite caisse dont la
    date de validité est postérieure à la date de lancement de la consultation ;
  </p>

  <p style="margin: 0 0 10px 0;">
    <strong>k)</strong>
    L’attestation de catégorisation, le cas échéant ;
  </p>

  <p style="margin: 0 0 18px 0;">
    <strong>l)</strong>
    Le document relatif à la géographie du capital.
  </p>


  <p style="margin: 0 0 10px 0;">
    <strong>Pour les soumissionnaires non installés au Cameroun</strong>, ils devront fournir
    les documents « a », « b », « c », « d », « g », « h », « i », « k », « l », ainsi que
    les documents attestant :
  </p>

  <ul style="margin: 0 0 15px 30px; padding: 0;">
    <li style="margin-bottom: 8px;">
      qu’ils ne sont pas en état de liquidation judiciaire ou en faillite, en remplacement
      du document « e » ;
    </li>

    <li style="margin-bottom: 8px;">
      qu’ils ne sont pas frappés de l'une des interdictions ou déchéances prévues par les
      lois et règlements en vigueur, aussi bien au plan national qu’international, en
      remplacement des documents « e » et « j » ci-dessus ;
    </li>

    <li style="margin-bottom: 8px;">
      qu’ils ont souscrit les déclarations prévues par les lois et règlements en vigueur,
      en remplacement des documents « e » et « j » ci-dessus.
    </li>
  </ul>

  <p style="margin: 0 0 12px 0;">
    En cas de production d’un cautionnement de soumission émis par un établissement financier
    étranger, ce dernier est acceptable sous réserve que cet établissement financier désigne
    un correspondant local habilité par le Ministre chargé des finances qui délivre au
    soumissionnaire un acte par lequel il se porte garant en cas d’appel.
  </p>

  <p style="margin: 0 0 12px 0;">
    <strong>NB :</strong> En cas de groupement, chaque membre du groupement devra produire
    un dossier administratif complet. Néanmoins, seuls les mandataires produisent les
    pièces a et c ; les pièces f et g sont produites par le mandataire uniquement.
  </p>

  <p style="margin: 0 0 20px 0;">
    <strong>NB :</strong> En cas de catégorisation, le Maître d’Ouvrage ou Maître d’Ouvrage
    Délégué définit les exigences complémentaires à demander aux entreprises catégorisées.
  </p>


  <!-- ==================== VOLUME 2 ==================== -->

  <h2 style="font-size: 16px; font-weight: 700; margin: 25px 0 15px 0; color: #111;">
    Volume 2 : Proposition Artistique
  </h2>

  <p style="margin: 0 0 12px 0;">
    La proposition artistique devra contenir les pièces ci-après :
  </p>

  <p style="margin: 0 0 10px 0;">
    <strong>a)</strong> L’Avant-Projet Sommaire (APS) comportant notamment :
  </p>

  <div style="margin-left: 25px;">

    <p style="margin: 0 0 10px 0;">
      <strong>a.1)</strong>
      un mémoire explicatif et descriptif présentant un projet technique en adéquation
      avec le programme à l’instar de l’évaluation du contexte général après visite du site,
      analyse des besoins spécifiés dans le programme ;
    </p>

    <p style="margin: 0 0 10px 0;">
      <strong>a.2)</strong>
      un mémoire explicatif et descriptif présentant notamment le projet retenu en plan et
      en volumétrie, l'implantation dans le site et dans le strict respect de la réglementation,
      le principe d'ossature, les principes d'organisation fonctionnelle ;
    </p>

    <p style="margin: 0 0 12px 0;">
      <strong>a.3)</strong>
      un dossier de pièces-graphiques présentant le projet proposé.
    </p>

  </div>

  <p style="margin: 0 0 10px 0;">
    <strong>b)</strong>
    La Méthodologie : elle portera sur une analyse des travaux et précisera l’organisation
    et le programme que le soumissionnaire compte mettre en place ou en œuvre pour leur
    réalisation (installations, planning, PAQ, sous-traitance, attestation de visite du site
    le cas échéant, etc.) ;
  </p>

  <p style="margin: 0 0 10px 0;">
    <strong>c)</strong>
    Les preuves d’acceptation des conditions du marché : le soumissionnaire remettra les
    copies dûment paraphées des documents à caractère administratif et technique régissant
    le marché, à savoir :
  </p>

  <ol style="margin: 0 0 12px 45px; padding: 0;">
    <li style="margin-bottom: 5px;">
      Le Cahier des Clauses Administratives Particulières (CCAP) ;
    </li>
    <li style="margin-bottom: 5px;">
      Le Cahier des Clauses Techniques Particulières (CCTP), le cas échéant ;
    </li>
    <li style="margin-bottom: 5px;">
      Les Termes de Référence.
    </li>
  </ol>

  <p style="margin: 0 0 10px 0;">
    <strong>d)</strong>
    Les Commentaires (facultatifs) : un commentaire des choix techniques du projet et
    d’éventuelles propositions.
  </p>

  <p style="margin: 0 0 10px 0;">
    <strong>e)</strong>
    Un descriptif de la méthodologie et du plan de travail proposé pour accomplir la mission
    (Tableau 12D) ;
  </p>

  <p style="margin: 0 0 10px 0;">
    <strong>f)</strong>
    La composition par spécialités de l'équipe proposée, ainsi que la description des tâches
    confiées à chacun des membres (Tableau 12E).
  </p>

  <p style="margin: 0 0 10px 0;">
    <strong>g)</strong>
    La liste complète et détaillée des études à mener durant la phase de conception.
  </p>

  <p style="margin: 0 0 20px 0;">
    <strong>NB :</strong> Le Maître d’Ouvrage pourra compléter cette liste par d’autres
    rubriques, le cas échéant.
  </p>


  <!-- ==================== VOLUME 3 ==================== -->

  <h2 style="font-size: 16px; font-weight: 700; margin: 25px 0 15px 0; color: #111;">
    Volume 3 : Proposition Technique
  </h2>

  <p style="margin: 0 0 12px 0;">
    La proposition technique porte sur la proposition du coût Global du Projet, les références
    générales, les ressources humaines, le planning de travail, les matériels et outils.
    Elle devra contenir les pièces ci-après :
  </p>

  <p style="margin: 0 0 10px 0;">
    <strong>3.1.</strong>
    La lettre de soumission de la proposition financière indiquant le coût Global (CG) du projet
    (Études et Réalisation), le Coût des études et le Coût Estimatif du Projet (coût de réalisation).
    Cette lettre devra être signée, datée et timbrée (pièce 13A).
  </p>

  <p style="margin: 0 0 10px 0;">
    <strong>3.2.</strong>
    La présentation de l’expérience récente du candidat dans le cadre des missions similaires
    (tableau 12B) au cours des dix (10) dernières années. Pour chacune des missions, il faut
    indiquer le type de projet, le lieu, le coût de réalisation, la consistance des prestations
    exécutées, le Maître d'Ouvrage, la durée de la mission, le nom du Cabinet/Groupement,
    le rôle (Maître d'œuvre principal, participant à un Groupement, sous-traitant), le nom
    et les fonctions des principaux responsables (Directeur, Chef de projet, etc.), l'énumération
    des principaux personnels et matériels utilisés pour le projet.
  </p>

  <p style="margin: 0 0 10px 0;">
    Ces références devront être accompagnées des pièces justificatives, en l’occurrence :
  </p>

  <ul style="margin: 0 0 12px 30px; padding: 0;">
    <li style="margin-bottom: 5px;">Copies des première, deuxième et dernière pages du contrat ;</li>
    <li style="margin-bottom: 5px;">PV de réception définitive ou provisoire, ou l’Attestation de bonne fin ;</li>
    <li style="margin-bottom: 5px;">Autres justificatifs le cas échéant et à préciser.</li>
  </ul>

  <p style="margin: 0 0 12px 0;">
    Dans le cadre de la passation des marchés relevant du seuil des lettres-commandes, et
    lorsqu'il est expressément prévu par le dossier de consultation, les références du
    promoteur ou d'un responsable technique d'une Petite et Moyenne Entreprise nationale
    nouvellement constituée, se substituent à celles de la personne morale lorsque celle-ci
    ne dispose pas encore du nombre d'années d'expérience ou des références requises.
  </p>

  <p style="margin: 0 0 10px 0;">
    Ces références devront être accompagnées des pièces justificatives, en l’occurrence :
  </p>

  <ul style="margin: 0 0 15px 30px; padding: 0;">
    <li style="margin-bottom: 5px;">CV ;</li>
    <li style="margin-bottom: 5px;">Contrats de travail ;</li>
    <li style="margin-bottom: 5px;">Divers actes de promotion intervenus dans la carrière.</li>
  </ul>

  <p style="margin: 0 0 10px 0;">
    <strong>3.3.</strong>
    Toutes observations ou suggestions éventuelles sur les termes de référence et les données
    fournies par le Maître d'ouvrage (Tableau 12C).
  </p>

  <p style="margin: 0 0 10px 0;">
    <strong>3.4.</strong>
    Les curricula vitae datés et signés du personnel clé proposé ayant une expérience générale
    d’au moins dix (10) ans dans le domaine de leurs spécialités respectives (Tableau 12F).
    Parmi les informations à fournir, doivent figurer, pour chacun : la qualification, les
    réalisations effectuées et les responsabilités exercées. Joindre l'attestation d'inscription
    à l'ordre professionnel respectif (le cas échéant), la copie certifiée conforme du diplôme,
    l'attestation de disponibilité signée et datée de l’expert et tout autre document justificatif
    de l'expérience annoncée (une attestation ou contrat de travail, ou journal de chantier
    justifiant l’expérience le cas échéant).
  </p>

  <p style="margin: 0 0 10px 0;">
    <strong>3.5.</strong>
    L’indication des délais : global d’exécution des prestations (Dg), de la phase de conception
    (Dc) et de la phase des travaux (Dt), sachant que « Dg = Dc + Dt ».
  </p>

  <p style="margin: 0 0 10px 0;">
    <strong>3.6.</strong>
    La présentation du planning des activités et les personnels utilisés par le candidat et
    nécessaires à l'accomplissement des missions sous la forme de diagrammes à barres indiquant
    la répartition du temps de travail (Tableau 12G).
  </p>

  <p style="margin: 0 0 10px 0;">
    <strong>3.7.</strong>
    La présentation du calendrier des activités ou programme de travail (Tableau 12H).
  </p>

  <p style="margin: 0 0 10px 0;">
    <strong>3.8.</strong>
    La détermination du coût Global (CG) du projet, comprenant le Coût des Études (CE) et le
    Coût Estimatif du Projet (CEP) ou Coût de la réalisation des travaux :
    <strong>(CG = CE + CEP).</strong>
  </p>

  <div style="margin-left: 25px;">

    <p style="margin: 0 0 8px 0;"><strong>h)</strong> L’état récapitulatif des coûts (Tableau 13B) ;</p>

    <p style="margin: 0 0 8px 0;"><strong>i)</strong> La ventilation des coûts par activité (Tableau 13C) ;</p>

    <p style="margin: 0 0 8px 0;"><strong>j)</strong> Les coûts unitaires du personnel clé et d’exécution (Tableaux 13D et 13E) ;</p>

    <p style="margin: 0 0 8px 0;"><strong>k)</strong> Le cadre de sous-détail des prix, le cas échéant (Tableau 13K) ;</p>

    <p style="margin: 0 0 8px 0;"><strong>l)</strong> La ventilation de la rémunération par activité (Tableau 13F) ;</p>

    <p style="margin: 0 0 8px 0;"><strong>m)</strong> Les frais remboursables par activité (Tableau 13G) ;</p>

    <p style="margin: 0 0 8px 0;"><strong>n)</strong> Les frais divers (Tableau 13H) ;</p>

    <p style="margin: 0 0 8px 0;"><strong>o)</strong> Le cadre du bordereau des prix unitaires (Tableau 13I) ;</p>

    <p style="margin: 0 0 8px 0;"><strong>p)</strong> Le cadre du détail quantitatif et estimatif (Tableau 13J) ;</p>

    <p style="margin: 0 0 15px 0;"><strong>q)</strong> L’échéancier prévisionnel de paiements, le cas échéant.</p>

  </div>

  <p style="margin: 0 0 10px 0;">
    <strong>3.9.</strong>
    La capacité financière pour couvrir le coût Global du Projet, ou le montant déterminé
    par le MO/MOD (l’accès à une ligne de crédit ou autres ressources financières, le chiffre
    d’affaires, attestation de solvabilité financière).
  </p>

  <p style="margin: 0 0 10px 0;">
    <strong>3.10.</strong> La Charte d’intégrité ;
  </p>

  <p style="margin: 0 0 10px 0;">
    <strong>3.11.</strong> L’engagement à respecter les clauses environnementales et sociales ;
  </p>

  <p style="margin: 0 0 10px 0;">
    <strong>3.12.</strong> L’Attestation de non abandon de marché au cours des trois dernières années.
  </p>

  <p style="margin: 0 0 10px 0;">
    <strong>3.13.</strong>
    En établissant la Proposition technique, les Candidats doivent prêter particulièrement
    attention aux considérations suivantes :
  </p>

  <ul style="margin: 0 0 15px 30px; padding: 0;">
    <li style="margin-bottom: 7px;">
      Il est souhaitable que le personnel clé proposé soit composé en majorité de salariés
      permanents du Candidat ou entretienne avec lui une relation de travail stable de longue date ;
    </li>
    <li style="margin-bottom: 7px;">
      Il ne peut être proposé de choix de personnel clé ;
    </li>
    <li style="margin-bottom: 7px;">
      Il n’est autorisé de soumettre qu’un curriculum vitae (CV) par poste.
    </li>
  </ul>

  <p style="margin: 0 0 12px 0;">
    <strong>3.14.</strong>
    La Proposition technique doit comporter toutes les informations financières qui doivent
    être présentées au moyen des Tableaux types (Pièce 13). Elle énumère tous les coûts
    afférents à la mission. Si besoin est, toutes les charges peuvent être ventilées par activité.
  </p>

  <p style="margin: 0 0 12px 0;">
    Elle doit présenter séparément les impôts, droits (y compris cotisations de sécurité sociale),
    taxes et autres charges fiscales applicables en vertu de la législation en vigueur sur les
    candidats, les sous-traitants et leur personnel (autre que les ressortissants ou résidents
    permanents du Cameroun), sauf indication contraire dans le RPAO.
  </p>

  <p style="margin: 0 0 12px 0;">
    <strong>3.15.</strong>
    Les commissions et primes, éventuellement réglées ou devant être réglées par les
    Candidats en rapport avec la mission, sont précisées dans la lettre de soumission de la
    Proposition financière (pièce 13.A).
  </p>

  <p style="margin: 0 0 12px 0;">
    <strong>3.16.</strong>
    Les soumissionnaires utiliseront les pièces et modèles prévus dans le Dossier d’Appel
    d’Offres, sous réserve des dispositions de l’Article 19.2 du RGAO concernant les autres
    formes possibles de Caution de Soumission.
  </p>

  <p style="margin: 0 0 12px 0;">
    <strong>3.17.</strong>
    Si, conformément aux dispositions du RPAO, les soumissionnaires présentent des offres
    pour plusieurs lots du même Appel d’offres, ils pourront indiquer les rabais offerts en
    cas d’attribution de plus d’un lot conformément à la réglementation en vigueur.
  </p>

  <p style="margin: 0 0 12px 0;">
    <strong>3.18.</strong>
    La formation constitue un élément majeur de cette mission :
    <strong>Oui ___ Non ___</strong> [Si oui, préciser].
  </p>

  <p style="margin: 0 0 20px 0;">
    <strong>3.19.</strong>
    Autres renseignements à fournir dans la proposition technique :
    [Si oui, préciser].
  </p>


  <!-- ==================== VOLUME 4 ==================== -->

  <h2 style="font-size: 16px; font-weight: 700; margin: 25px 0 15px 0; color: #111;">
    Volume 4 : Proposition technique Témoin
  </h2>

  <p style="margin: 0 0 12px 0;">
    Le candidat présentera séparément une proposition technique témoin sous forme d’une
    enveloppe scellée contenant une copie de la proposition technique (soumission hors ligne)
    ou l’offre enregistrée sur clé USB ou CD/DVD sous pli scellé (soumission en ligne).
  </p>

  <p style="margin: 0 0 12px 0;">
    Cette offre témoin doit être déposée dans les services du MO/MOD ou AC concernée dans
    les délais impartis avec la mention claire et lisible « copie de sauvegarde » et les
    références de l’appel d’offres et sera remise par le Président de la Commission de
    Passation des Marchés à l’Assistant de Régulation (Collecteur) de l’organisme chargé de
    la Régulation des Marchés Publics à la séance d’ouverture des plis.
  </p>

  <p style="margin: 0 0 12px 0;">
    Le défaut de présentation du septième exemplaire de l’offre technique, dans une enveloppe
    scellée et marquée « offre témoin » pour servir d’offre témoin, entraîne l’irrecevabilité
    par la Commission de Passation des Marchés de l’offre du candidat concerné, dès
    l’ouverture des plis.
  </p>

  <p style="margin: 0;">
    <strong>
      [L’ouverture de la séance de dépouillement doit se faire au plus tard une heure après
      celle limite de réception des offres fixée dans le Dossier d’Appel d’Offres].
    </strong>
  </p>

</div>

`)

const ref_16_1 = ref(`
<strong>Montant de l'offre</strong>
<p>Le coût global du projet proposé par le candidat couvrira l'ensemble des prestations (études et travaux) décrites dans le DAO.</p> 
<p>Le coût Global (CG) du projet comprendra : le Coût des Études (CE) et le Coût Estimatif du Projet (CEP) ou Coût de la réalisation des travaux, soit CG = CE + CEP.</p>`)

const ref_16_4 = ref(`
<strong>Variation des prix du marché</strong>
<p><em>[Préciser si les prix sont fermes ou actualisables, et s'ils sont révisables ou pas].</em></p>`)

const ref_17 = ref(`<p>La monnaie de soumission est ………………………… </p> 
<p> La monnaie de règlement des prestations est …………………</p> 

<p>La monnaie retenue pour la conversion en une seule monnaie est le Franc CFA, la source du taux de change étant la Banque des États de l'Afrique Centrale (BEAC).</p>
<p> La date du taux de change est : <em>Retenir une date qui ne sera pas antérieure de plus de vingt
huit (28) jours à la date limite de dépôt des offres, ni postérieure à la date initiale d’expiration du 
délai de validité des offres.</em> </p>

<p>le taux de change pour convertir l’offre du soumissionnaire en monnaie locale ainsi que pour 
convertir les futurs décomptes en monnaie étrangère, sera celui <em>[à préciser : exemple celui de la 
BEAC trois jours ouvrables avant la date limite de dépôt des offres]</em> </p>
`)


const ref_18 = ref(`
<strong>Délai de validité des offres</strong>
<p>La période de validité des offres est <em>[insérer la période en jours]</em> à partir de la date limite de dépôt des offres. Cette période ne doit pas excéder cent vingt (120) jours.</p>
<br />
<p> <em>[Cette période doit être réaliste et donner un temps suffisant pour l’évaluation des offres, les 
délais d’obtention des éclaircissements éventuels et les autorisations nécessaires (y compris la 
“non-objection” du Bailleur de Fonds) et la notification de l’attribution du marché. </em> </p>`)

const ref_19 = ref(`<p>Le montant de la caution de soumission est fixé à …… <i>[à préciser]</i>.</p>`)

const ref_20_3 = ref(`
<strong>Variantes</strong>
<p><em>Le Maître d'Ouvrage doit préciser si les variantes sont autorisées ou pas.</em></p>`)

const ref_22_5 = ref('')

const ref_24 = ref('')

const ref_25 = ref(`<p>Pour l'évaluation de la Proposition artistique (100 pts) : Avant-Projet Sommaire (40 pts), preuves d'acceptation des conditions du marché (04 pts), descriptif de la méthodologie (10 pts), composition de l'équipe (15 pts), liste des études de conception (20 pts).</p><p>Pour l'évaluation de la Proposition technique (100 pts) : références du soumissionnaire (30 pts), qualifications et expérience du personnel (35 pts), disponibilité du matériel (30 pts), respect des délais (03 pts), capacité financière (02 pts).</p><p>Pour la détermination de la Note Financière : NF = 100 x PFm / PF.</p><p>Note générale : NG = (a x NA) + (t x NT) + (f x NF), avec a + t + f = 1.</p>`)

const ref_30 = ref(`<p>Le taux du cautionnement définitif est de : _________________________ <i>[à préciser, entre 2 et 5%]</i> du montant toutes taxes comprises du marché. Dans un délai de vingt (20) jours à compter de la date de notification du marché, le cocontractant fournira un cautionnement définitif suivant le modèle joint au Dossier d'appel d'offres.</p>`)

const ref_35 = ref(`<p>Le marché sera attribué au soumissionnaire ayant présenté une offre conforme pour l'essentiel au DAO et évaluée la mieux-disante, par combinaison des critères techniques, financiers et esthétiques, c'est-à-dire à celui ayant obtenu la Note Générale la plus élevée.</p>`)

const ref_36 = ref(`<p>Les Présidents et Membres de commission, les Soumissionnaires et les autres intervenants de la procédure doivent observer en tout temps les règles d'éthique professionnelle les plus strictes et s'interdire toute corruption ou manœuvre frauduleuse.</p><p>(i) Est coupable de « corruption » quiconque offre, donne, sollicite ou accepte directement ou indirectement un quelconque avantage en vue d'influencer l'action d'un agent public au cours de l'attribution ou de l'exécution d'un marché.</p><p>(ii) Se livre à des « manœuvres frauduleuses » quiconque déforme ou dénature des faits afin d'influencer l'attribution ou l'exécution d'un marché de manière préjudiciable au Maître d'Ouvrage.</p>`)

const formation_element_majeur = ref(false)
const poids_artistique = ref()
const poids_technique = ref()
const poids_financiere = ref()

onMounted(async () => {
    try {
        isLoading.value = true;
        const responseDAO = await getDAO(dossier)
        const responseAAO = await get_aao(dossier)

        dao.value = responseDAO[0];
        ref_2.value = `<p>Les prestations objet du présent Appel d'Offres sont financées par : Budget : ${dao.value.financement || ''} Exercice ${dao.value.exercice_budgetaire || ''}  Ligne ${dao.value.imputation || ''} </p><p><i>[Insérer pour les marchés sur financement extérieur, le nom de l'Emprunteur et indiquer le cas échéant, quelle est sa relation avec le Maître d'Ouvrage ou le Maître d'Ouvrage Délégué. Indiquer aussi le nom exact du Projet]</i></p>`
        ref_13_2.value = `<p>Chaque candidat soumettra une proposition constituée de quatre (04) enveloppes ainsi qu'il suit : </p>

            <ul>
            <li>Dossier Administratif : dans une enveloppe portant la mention “DOSSIER ADMINIS
            TRATIF ” et comprenant <em>[préciser le nombre d’exemplaires]</em> exemplaires dont un (01) 
            original et <em>[préciser le nombre de copies]</em> copies marquées comme telles ; </li>

            <li>Proposition Artistique :  dans une enveloppe portant la mention “ PROPOSITION ARTISTIQUE ” et comprenant <em>[préciser le nombre d’exemplaires]</em> exemplaires dont un (01) 
            original et <em>[préciser le nombre de copies]</em> copies marquées comme telles ; </li>

            <li>Proposition Technique : dans une enveloppe portant la mention “ PROPOSITION 
            TECHNIQUE” et l’avertissement “ NE PAS OUVRIR EN MEME TEMPS QUE LE DOS
            SIER ADMINISTRATIF ET LA PROPOSITION ARTISTIQUE”, comprenant le coût esti
            matif prévisionnel du projet, les références du soumissionnaire et le coût global du pro
            jet et présentée en <em>[préciser le nombre d’exemplaires]</em> exemplaires dont un (01) original 
            et <em>[préciser le nombre de copies]</em> copies marquées comme telles ;</li>

            <li>Proposition Technique Témoin : dans une enveloppe portant la mention “ PROPOSI
            TION TECHNIQUE TEMOIN” et comprenant une copie témoin  de la proposition Tech
            nique marquée comme telle ;</li> 
            </ul>

            <p>
            Les quatre enveloppes seront placées dans un pli scellé et cacheté, portant le Numéro et l’objet 
            de l’Appel d’Offres concerné et ne portant aucune mention du nom du soumissionnaire. 
            </p>

            <p>Le pli portera uniquement la mention ci-dessous : </p> 
            <p style="text-align:center;"><b>« ${dao.value.titre_complet} »</b></p>
            <p>Si la soumission est faite par voie électronique, l’offre devra être transmise par le soumissionnaire sur la plateforme COLEPS ou tout autre moyen de communication électronique indiqué par le Maître d’Ouvrage au plus tard le ……..à……… Une copie de sauvegarde de l’offre enregistrée sur clé USB ou CD/DVD devra être transmise sous pli scellé avec l’indication claire et lisible « copie de sauvegarde », en plus de la mention ci-dessus dans les délais impartis. </p> <p></p>
            <strong>NB : Taille et format des fichiers</strong>
            <p>Pour la soumission en ligne, les tailles minimales et maximales des documents devant transiter sur la plateforme et constituant l’offre du soumissionnaire doivent être précisées par le Maître d’Ouvrage au point 22 du présent RPAO. Les précisions doivent également être apportées sur l’importance d’utiliser des logiciels de compression afin de réduire éventuellement la taille des fichiers à transmettre conformément aux tailles préalablement indiquées. </p>
            `

        if (responseAAO && responseAAO.length > 0) aao.value = responseAAO[0]

        ref_22_5.value = `<strong>MODE DE SOUMISSION</strong>
        ${aao.value.mode_soumission || ''}
        <strong><u>Soumission en ligne</u></strong>
        <p>Pour la soumission en ligne, les tailles maximales des documents qui vont transiter sur la plateforme et constituant l’offre du soumissionnaire sont les suivantes :</p>
        <ul>
            <li>5 Mo pour le dossier Administratif ; </li>
            <li>15 Mo pour l’Offre Technique ;  </li>
            <li>5 Mo pour l’Offre Financière ;  </li>
        </ul>
        Les formats acceptés sont les suivants :  
        <ul>
            <li>Format PDF pour les documents textuels ;   </li>
            <li>JPEG pour les images.    </li> 
        </ul>
        <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.7; color: #222; text-align: justify;">

        <p style="margin: 0 0 12px 0;">
          Le candidat veillera à utiliser des logiciels de compression afin de réduire éventuellement
          la taille des fichiers à transmettre.
        </p>

        <p style="margin: 0 0 12px 0;">
          Aux fins de la remise des offres, l'adresse du Maître d'Ouvrage ou du Maître d'Ouvrage
          Délégué à utiliser pour l'envoi des offres est la suivante :
        </p>

        <p style="margin: 0 0 8px 0;">
          <strong>Service du Maître d’ouvrage ou du Maître d’ouvrage Délégué :</strong>
          ${dao.value.maitre_ouvrage || ''}
        </p>

        <p style="margin: 0 0 8px 0;">
          <strong>Adresse :</strong>
          <em>[insérer le nom de la rue et le numéro de l'immeuble]</em>
        </p>

        <p style="margin: 0 0 8px 0;">
          <strong>Code postal :</strong>
          <em>[insérer le numéro du code postal]</em>
        </p>

        <p style="margin: 0 0 12px 0;">
          <strong>Étage/Numéro de bureau :</strong>
          <em>[insérer l'étage et le numéro du bureau]</em>
        </p>


        <!-- SOUMISSION EN LIGNE -->
        <br />

        <strong>
          Soumission en ligne
        </strong>

        <p style="margin: 0 0 12px 0;">
          Pour la soumission en ligne, l'offre devra être transmise par le soumissionnaire sur
          la plateforme COLEPS ou <strong><em>tout autre moyen de communication électronique
          indiqué par le Maître d’Ouvrage.</em></strong>
          Une copie de sauvegarde de l'offre enregistrée sur clé USB ou CD/DVD devra être déposée
          dans les services du MO/MOD ou AC concerné sous pli scellé avec la mention claire et
          lisible « copie de sauvegarde » et les références de l'appel d'offres dans les délais impartis.
        </p>

        <p style="margin: 0 0 12px 0;">
            [pour la soumission en ligne, elles seront transmises par voie électronique via la
            plateforme COLEPS disponible à l'adresse
            <span style="text-decoration: underline;">http://www.marchespublics.cm</span>
            ou
            <span style="text-decoration: underline;">http://www.publiccontracts.cm</span>]
        </p>


        <!-- SOUMISSION HORS LIGNE -->
        <br />

        <strong>
          Soumission hors ligne
        </strong>

        <p style="margin: 0 0 12px 0;">
          Aux fins de la remise des offres, l'adresse du Maître d'Ouvrage ou du Maître d'Ouvrage
          Délégué à utiliser pour l'envoi des offres est la suivante :
        </p>

        <p style="margin: 0 0 8px 0;">
          <strong>Service du Maître d’ouvrage ou du Maître d’ouvrage Délégué :</strong>
          ${dao.value.maitre_ouvrage || ''}
        </p>

        <p style="margin: 0 0 8px 0;">
          <strong>Adresse :</strong>
          <em>[insérer le nom de la rue et le numéro de l'immeuble]</em>
        </p>

      </div>
        `

        ref_24.value = `
        <strong>Critères éliminatoires :</strong>
        ${aao.value.critere_eliminatoire || ''}
        <strong>Critères essentiels</strong>
        ${aao.value.critere_essentielles || ''}
        <br />
        <strong></strong>
        `

        const responsePiece = await get_pieces(dossier)
        pieces.value = responsePiece
        const index = pieces.value.findIndex(p => p.piece.nom_composant === current_piece);
        id_piece.value = pieces.value[index].id;

        const responseRPAO = await get_rpao(dossier)
        if (responseRPAO && responseRPAO.length > 0) {
            trouve.value = true
            const r = responseRPAO[0]
            ref_1_1.value = r.ref_1_1
            ref_1_2.value = r.ref_1_2
            ref_1_4.value = r.ref_1_4
            ref_1_5.value = r.ref_1_5
            ref_1_6.value = r.ref_1_6
            ref_2.value = r.ref_2
            ref_4_2.value = r.ref_4_2
            ref_5_1.value = r.ref_5_1
            ref_6_2.value = r.ref_6_2
            ref_7.value = r.ref_7
            ref_9.value = r.ref_9
            ref_11.value = r.ref_11
            ref_13_2.value = r.ref_13_2
            ref_13_3.value = r.ref_13_3
            ref_13_4.value = r.ref_13_4
            ref_13_7.value = r.ref_13_7
            ref_14.value = r.ref_14
            ref_15_1.value = r.ref_15_1
            ref_16_1.value = r.ref_16_1
            ref_16_4.value = r.ref_16_4
            ref_17.value = r.ref_17
            ref_18.value = r.ref_18
            ref_19.value = r.ref_19
            ref_20_3.value = r.ref_20_3
            ref_22_5.value = r.ref_22_5
            ref_24.value = r.ref_24
            criteres_eliminatoires.value = r.criteres_eliminatoires
            criteres_essentiels.value = r.criteres_essentiels
            ref_25.value = r.ref_25
            ref_30.value = r.ref_30
            ref_35.value = r.ref_35
            ref_36.value = r.ref_36
            formation_element_majeur.value = r.formation_element_majeur
            poids_artistique.value = r.poids_artistique
            poids_technique.value = r.poids_technique
            poids_financiere.value = r.poids_financiere
        }
    } catch (error) {
        console.error("Erreur lors de la récupération du DAO :", error)
    } finally {
        isLoading.value = false;
    }
})

const handleSubmit = async () => {
    errors.value = {}
    isLoading.value = true;
    try {
        const rpaoData = {
            ref_1_1: ref_1_1.value, ref_1_2: ref_1_2.value, ref_1_4: ref_1_4.value,
            ref_1_5: ref_1_5.value, ref_1_6: ref_1_6.value, ref_2: ref_2.value,
            ref_4_2: ref_4_2.value, ref_5_1: ref_5_1.value, ref_6_2: ref_6_2.value,
            ref_7: ref_7.value, ref_9: ref_9.value, ref_11: ref_11.value,
            ref_13_2: ref_13_2.value, ref_13_3: ref_13_3.value, ref_13_4: ref_13_4.value,
            ref_13_7: ref_13_7.value, ref_14: ref_14.value,
            ref_15_1: ref_15_1.value, ref_16_1: ref_16_1.value, ref_16_4: ref_16_4.value,
            ref_17: ref_17.value,
            ref_18: ref_18.value, ref_19: ref_19.value, ref_20_3: ref_20_3.value, ref_22_5: ref_22_5.value,
            ref_24: ref_24.value,
            criteres_eliminatoires: criteres_eliminatoires.value, criteres_essentiels: criteres_essentiels.value,
            ref_25: ref_25.value,
            ref_30: ref_30.value, ref_35: ref_35.value, ref_36: ref_36.value,
            formation_element_majeur: formation_element_majeur.value,
            poids_artistique: poids_artistique.value || null,
            poids_technique: poids_technique.value || null,
            poids_financiere: poids_financiere.value || null,
        };

        if (trouve.value) {
            const response = await update_rpao(dossier, rpaoData)
            message.value = response.message
        } else {
            const response = await create_rpao(dossier, rpaoData)
            await update_piece(id_piece.value, true);
            message.value = response.message
        }

        toast.success(message, { theme: 'colored', autoClose: 2000 });
    } catch (err) {
        toast.error(err, { theme: 'colored', autoClose: 2000 });
        errors.value = err;
        console.log(err)
    } finally {
        isLoading.value = false;
    }
}
</script>
