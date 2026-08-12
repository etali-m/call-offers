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

// ===== Champs du RPAO (ref_X_Y = ligne "X.Y" du tableau du RPAO conception-réalisation) =====
const ref_1_1 = ref(`<p>Faire une description précise du projet. Le concours est organisé sur la base d'un programme établi par le Maître d'Ouvrage ou le Maître d'Ouvrage Délégué qui indique les besoins auxquels doit répondre la prestation. Le contenu des prestations est détaillé dans le programme.</p><p>Lieu d'exécution : <i>[préciser le lieu d'exécution du projet]</i></p><p>Nom, objectifs et description de la mission : <i>[à préciser]</i></p>`)

const ref_1_2 = ref(`<p>La procédure de passation du marché est celle de « l'appel d'offres avec concours », décrite aux articles 79 et 119 du Code des marchés publics.</p><p>Mode de sélection : le marché sera attribué au soumissionnaire ayant produit l'offre évaluée la mieux-disante, par combinaison des critères techniques, financiers et esthétiques.</p><p>Le coût global prévisionnel du projet (conception et réalisation) est estimé à <i>[préciser le montant prévisionnel de l'enveloppe]</i>.</p><p>Le délai global prévisionnel d'exécution des prestations est de : ……"Dg"…. jours calendaires ou mois, dont …"Dc"…. pour la phase de conception et …"Dt"… pour la phase des travaux, sachant que "Dg = Dc + Dt".</p>`)

const ref_1_4 = ref(`<p>Les prestations à exécuter sont réparties en deux (02) phases : la phase de Conception et la phase des Travaux. Pour chacune des phases, le délai court à compter de la date de notification de l'ordre de service de commencer les prestations concernées.</p>`)

const ref_1_5 = ref(`<p>Toutes les informations relatives à la conférence préalable à l'établissement des offres seront présentées ici <i>[à préciser, le cas échéant]</i>.</p>`)

const ref_1_6 = ref(`<p>Nom(s), adresse(s), et numéro(s) de téléphone du/des responsable(s) des Services du Maître d'Ouvrage ou du Maître d'Ouvrage Délégué : <i>[à préciser]</i></p>`)

const ref_2 = ref(`<p>Les prestations objet du présent Appel d'Offres sont financées par : Budget : …………………… Exercice ….……………Ligne ………….</p><p><i>[Insérer pour les marchés sur financement extérieur, le nom de l'Emprunteur et indiquer le cas échéant, quelle est sa relation avec le Maître d'Ouvrage ou le Maître d'Ouvrage Délégué. Indiquer aussi le nom exact du Projet]</i></p>`)

const ref_4_2 = ref(`<p>Tout Appel d'Offres relatif aux Marchés de Conception Réalisation est ouvert aux soumissionnaires (opérateurs économiques) organisés en groupement d'entreprises solidaires. Néanmoins, pour les seuls marchés de conception réalisation portant sur les seuls ouvrages d'infrastructure, le groupement n'est pas obligatoire, conformément aux dispositions de l'arrêté N°168/A/MINMAP du 11 août 2021.</p><p>Il est interdit à toute personne ayant pris part à l'organisation et à l'élaboration du programme du concours, ainsi qu'aux membres du Jury, de concourir et de participer directement ou indirectement aux travaux.</p>`)

const ref_5_1 = ref(`<p>Aucun matériau, matériel ni fourniture destiné à l'utilisation dans le cadre de ce projet ne devra provenir des lieux ci-après : <i>[indiquer les pays non éligibles, le cas échéant]</i>. Privilégier autant que possible l'utilisation du matériau produit localement.</p>`)

const ref_6_2 = ref(`<p>Chaque membre du groupement doit présenter un dossier administratif complet. Toutefois, l'attestation de domiciliation bancaire, la quittance d'achat du DAO, le cautionnement de soumission, la charte d'intégrité et l'engagement à respecter les clauses environnementales et sociales sont présentées uniquement par le mandataire du groupement.</p>`)

const ref_7 = ref(`<p>La visite du site des travaux sera organisée par le Maître d'Ouvrage ou le Maître d'Ouvrage Délégué au plus tard <i>[date à insérer, le cas échéant]</i> après la publication de l'Avis d'Appel d'Offres. Il est conseillé à chaque soumissionnaire de visiter et d'inspecter le site des travaux à ses propres frais et sous sa propre responsabilité.</p>`)

const ref_9 = ref(`<p>Des éclaircissements peuvent être demandés au plus tard <i>[indiquer le nombre de jours]</i> jours avant la date de remise des offres, à l'adresse suivante : <i>[insérer l'adresse complète]</i>.</p><p>Les renseignements complémentaires peuvent être obtenus aux heures ouvrables à <i>[service (SIGAMP), numéro de porte, BP, téléphone, fax, e-mail]</i> ou en ligne sur la plateforme COLEPS.</p>`)

const ref_11 = ref(`<p>Les offres des soumissionnaires devront être déposées dans un délai de quatre-vingt-dix (90) jours à compter de la date de publication de l'avis d'appel d'offres dans le Journal des Marchés Publics.</p>`)

const ref_13_2 = ref(`<p>Chaque candidat soumettra une proposition constituée de quatre (04) enveloppes : Dossier Administratif, Proposition Artistique, Proposition Technique et Proposition Technique Témoin, chacune présentée en <i>[préciser le nombre d'exemplaires]</i> exemplaires dont un (01) original.</p><p>Les quatre enveloppes seront placées dans un pli scellé et cacheté, portant le Numéro et l'objet de l'Appel d'Offres, sans mention du nom du soumissionnaire.</p>`)

const ref_13_3 = ref(`<p>Si la soumission est faite par voie électronique, l'offre devra être transmise sur la plateforme COLEPS au plus tard le ……..à……… Une copie de sauvegarde enregistrée sur clé USB ou CD/DVD devra être transmise sous pli scellé avec la mention « copie de sauvegarde ».</p>`)

const ref_13_4 = ref(`<p>Les plis devront être déposés contre récépissé dans les services du Maître d'Ouvrage ou du Maître d'Ouvrage Délégué à/au ……..[préciser le lieu de dépôt], au plus tard le …… [date limite] à ….. [heure limite], en présence des soumissionnaires ou de leurs représentants dûment mandatés.</p>`)

const ref_13_7 = ref(`<p>L'ouverture des plis se fera en deux (02) temps : dans un premier temps, les pièces administratives et les propositions artistiques seront ouvertes le …...... [date] à …......[heure] ; dans un second temps, seules les propositions techniques des soumissionnaires ayant obtenu la note artistique minimale seront ouvertes à la date et au lieu communiqués ultérieurement.</p>`)

const ref_14 = ref(`<p>L'offre est rédigée en français ou en anglais et comprendra notamment, dûment remplis et regroupés en quatre (04) volumes : le dossier administratif, la proposition artistique (Avant-Projet Sommaire), la proposition technique et la proposition technique témoin.</p>`)

const ref_15_1 = ref(`<p>La caution de soumission est d'un montant de ……………….. francs CFA et d'une durée de validité de ………………….mois, établie par une banque de premier ordre ou un organisme financier de première catégorie habilité par le Ministre en charge des Finances du Cameroun.</p><p>Le dossier administratif comprend notamment : la lettre de soumission, la caution de soumission, l'accord de groupement, le pouvoir de signature, l'attestation de non redevance, l'attestation de non-faillite, l'attestation de domiciliation bancaire, la quittance d'achat du DAO, l'attestation de non exclusion des marchés publics, l'attestation CNPS, l'attestation de catégorisation le cas échéant.</p>`)

const ref_16_1 = ref(`<p>Le coût global du projet proposé par le candidat couvrira l'ensemble des prestations (études et travaux) décrites dans le DAO. Le coût Global (CG) du projet comprendra : le Coût des Études (CE) et le Coût Estimatif du Projet (CEP) ou Coût de la réalisation des travaux, soit CG = CE + CEP.</p>`)

const ref_16_4 = ref(`<p><i>[Préciser si les prix sont fermes ou actualisables, et s'ils sont révisables ou pas].</i></p>`)

const ref_17 = ref(`<p>La monnaie de soumission est ………………………… La monnaie de règlement des prestations est ………………… La monnaie retenue pour la conversion en une seule monnaie est le Franc CFA, la source du taux de change étant la Banque des États de l'Afrique Centrale (BEAC).</p>`)

const ref_18 = ref(`<p>La période de validité des offres est <i>[insérer la période en jours]</i> à partir de la date limite de dépôt des offres. Cette période ne doit pas excéder cent vingt (120) jours.</p>`)

const ref_19 = ref(`<p>Le montant de la caution de soumission est fixé à …… <i>[à préciser]</i>.</p>`)

const ref_20_3 = ref(`<p>Le Maître d'Ouvrage doit préciser si les variantes sont autorisées ou pas.</p>`)

const ref_22_5 = ref(`<p>Le mode de soumission retenu pour cette consultation est <i>[indiquer : en ligne, hors ligne, ou en ligne et hors ligne]</i>. Adresse du Maître d'Ouvrage ou du Maître d'Ouvrage Délégué à utiliser pour l'envoi des offres : <i>[à préciser]</i>.</p>`)

const ref_24 = ref(`<p><b>Critères éliminatoires :</b> absence du cautionnement de soumission, non-production d'une pièce administrative dans le délai de 48h, fausses déclarations, non-conformité de l'offre, non-obtention de la note artistique minimale, non-respect du format de fichier, absence de la charte d'intégrité, absence de l'engagement environnemental et social.</p><p><b>Critères essentiels :</b> ils portent sur les propositions artistique et technique (Avant-Projet Sommaire, méthodologie, références, qualifications du personnel, moyens matériels, respect des délais, capacité financière).</p>`)

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
        dao.value = responseDAO[0];
        const responsePiece = await get_pieces(dossier)
        pieces.value = responsePiece
        const index = pieces.value.findIndex(p => p.piece.nom_composant === current_piece);
        id_piece.value = pieces.value[index].id;

        const responseAAO = await get_aao(dossier)
        if (responseAAO && responseAAO.length > 0) aao.value = responseAAO[0]

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
            ref_24: ref_24.value, ref_25: ref_25.value,
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
