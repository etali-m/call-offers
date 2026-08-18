<template>
    <Loader v-if="isLoading" />
    <div v-else>
        <HeaderPiece numero_piece="4" :numero_dossier="dao.numero_appel_offre" :moe="dao.maitre_ouvrage" :description_travaux="dao.objet_appel"/>

        <PieceNavigator :project-id="dao.id" :current-piece-name="$route.name" />

        <div class="form-container">
            <form @submit.prevent="handleSubmit" style="padding-left:10px;">
                <StepperForm :totalSteps="11" v-slot="{ currentStep, nextStep, prevStep, isLastStep }">

                <div v-if="currentStep === 0">
                    <h5 class="text-center">CHAPITRE I : GENERALITES</h5>
                    <h5 class="fw-bold mb-3 mt-3">Article 3. Attributions et nantissement</h5>
                    <h6 class="fw-bold">3.1. Attributions</h6>
                    <div class="row">
                        <div class="col-md-6 mt-2"><label class="label-custom">L'organisme chargé du contrôle externe est :</label><input class="input-custom" v-model="control_externe"></div>
                        <div class="col-md-6 mt-2"><label class="label-custom">Le Chef de service du marché est :</label><input class="input-custom" v-model="chef_service_marche"></div>
                        <div class="col-md-6 mt-2"><label class="label-custom">L'Ingénieur du marché est :</label><input class="input-custom" v-model="ing_marche"></div>
                        <div class="col-md-6 mt-2"><label class="label-custom">Le contractant est :</label><input class="input-custom" v-model="contractant"></div>
                        <div class="col-md-6 mt-2"><label class="label-custom">Le cocontractant de l'Administration est :</label><input class="input-custom" v-model="cocontractant"></div>
                    </div>
                    <div class="mt-3"><h6 class="fw-bold">La Maîtrise d'Œuvre de la phase de conception est assurée par :</h6><RichTextarea v-model="maitrise_oeuvre_conception"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Le Maître d'Œuvre de la phase de réalisation est :</h6><RichTextarea v-model="maitre_oeuvre_realisation"/></div>
                    <div class="mt-3"><h6 class="fw-bold">L'Assistant à Maîtrise d'Ouvrage est :</h6><RichTextarea v-model="assistant_maitrise_ouvrage"/></div>

                    <h6 class="fw-bold mt-4">3.2. Nantissement</h6>
                    <div class="row">
                        <div class="col-md-6 mt-2"><label class="label-custom">L'autorité chargée de l'ordonnancement des paiements est :</label><input class="input-custom" v-model="autorite_ordonnancement"></div>
                        <div class="col-md-6 mt-2"><label class="label-custom">L'autorité chargée de la liquidation des dépenses est :</label><input class="input-custom" v-model="autorite_liquidation"></div>
                        <div class="col-md-6 mt-2"><label class="label-custom">L'organisme ou le responsable chargé du paiement est :</label><input class="input-custom" v-model="organisme_paiment"></div>
                        <div class="col-md-6 mt-2"><label class="label-custom">Le responsable compétent pour les renseignements est :</label><input class="input-custom" v-model="responsable_renseignement"></div>
                    </div>
                </div>

                <div v-else-if="currentStep === 1">
                    <div class="mt-3"><h5 class="fw-bold mb-3">Article 6. Pièces constitutives du marché</h5><RichTextarea v-model="pieces_constitutive_marche"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-3">Article 7. Textes généraux applicables</h5><RichTextarea v-model="textes_applicables"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-3">Article 8. Communication</h5><RichTextarea v-model="communication"/></div>
                </div>

                <div v-else-if="currentStep === 2">
                    <h5 class="text-center">CHAPITRE II : EXECUTION DES PRESTATIONS</h5>
                    <h5 class="fw-bold mb-3 mt-3">Article 9. Consistance des prestations</h5>
                    <div class="mt-3"><h6 class="fw-bold">Phase 1 : Conception ou Études</h6><RichTextarea v-model="consistance_phase_conception"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Phase 2 : Réalisation des travaux</h6><RichTextarea v-model="consistance_phase_realisation"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-3">Article 10. Délais d'exécution du marché</h5><RichTextarea v-model="delai_execution"/></div>
                </div>

                <div v-else-if="currentStep === 3">
                    <div class="mt-3"><h5 class="fw-bold mb-3">Article 14. Marchés à tranches conditionnelles</h5><RichTextarea v-model="marche_a_tranche"/></div>
                    <h5 class="fw-bold mb-3 mt-3">Article 15. Personnel et Matériel du cocontractant</h5>
                    <div class="mt-3"><h6 class="fw-bold">15.1. Personnel clé du cocontractant</h6><RichTextarea v-model="personnel_entreprise"/></div>
                    <div class="mt-3"><h6 class="fw-bold">15.2. Remplacement du personnel clé</h6><RichTextarea v-model="replacement_personnel"/></div>
                </div>

                <div v-else-if="currentStep === 4">
                    <h5 class="fw-bold mb-3">Article 16. Pièces à fournir par le cocontractant</h5>
                    <div class="mt-3"><h6 class="fw-bold">16.1./16.2. Programmes d'action et des travaux (phase 1 et phase 2)</h6><RichTextarea v-model="programme_travaux"/></div>
                    <div class="mt-3"><h6 class="fw-bold">16.3. Projet d'exécution des travaux</h6><RichTextarea v-model="projet_execution"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-3">Article 20. Laboratoire de chantier et essais</h5><RichTextarea v-model="labo_chantier"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-3">Article 21. Réunions de chantier</h5><RichTextarea v-model="reunion_chantier"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-3">Article 22. Utilisation des explosifs</h5><RichTextarea v-model="utilisation_explosifs"/></div>
                </div>

                <div v-else-if="currentStep === 5">
                    <h5 class="text-center">CHAPITRE III : DE LA RECEPTION</h5>
                    <h5 class="fw-bold mb-3 mt-3">Article 23. Réception des prestations</h5>
                    <div class="mt-3"><h6 class="fw-bold">23.1. Commission de suivi et de recette technique de la phase conception</h6><RichTextarea v-model="commission_suivi_recette_conception"/></div>
                    <div class="mt-3"><h6 class="fw-bold">23.2.2. Opérations préalables à la réception</h6><RichTextarea v-model="operation_prealable_reception"/></div>
                    <div class="mt-3"><h6 class="fw-bold">23.2.3. Réception provisoire</h6><RichTextarea v-model="reception_provisoire"/></div>
                    <div class="mt-3"><h6 class="fw-bold">23.2.4. Composition de la commission de réception</h6><RichTextarea v-model="commission_reception"/></div>
                    <div class="mt-3"><h6 class="fw-bold">23.2.5. Réceptions partielles</h6><RichTextarea v-model="reception_partielle"/></div>
                </div>

                <div v-else-if="currentStep === 6">
                    <div class="mt-3"><h5 class="fw-bold mb-3">Article 24. Documents à fournir après exécution</h5><RichTextarea v-model="documente_a_fournir"/></div>
                    <h5 class="fw-bold mb-3 mt-3">Article 25. Garantie contractuelle / Entretien pendant la période de garantie</h5>
                    <div class="mt-3"><h6 class="fw-bold">25.1. Délai de garantie</h6><RichTextarea v-model="delai_garantie"/></div>
                    <div class="mt-3"><h6 class="fw-bold">25.2. Entretien pendant la période de garantie</h6><RichTextarea v-model="periode_garantie"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-3">Article 26. Réception définitive</h5><RichTextarea v-model="reception_definitive"/></div>
                </div>

                <div v-else-if="currentStep === 7">
                    <h5 class="text-center">CHAPITRE IV : CLAUSES FINANCIERES</h5>
                    <div class="mt-3"><h5 class="fw-bold mb-3">Article 28. Montant du marché</h5><RichTextarea v-model="montant_marche"/></div>
                    <h5 class="fw-bold mb-3 mt-3">Article 30. Garanties et cautions</h5>
                    <div class="mt-3"><h6 class="fw-bold">30.1. Cautionnement définitif</h6><RichTextarea v-model="cautionnement_definitif"/></div>
                    <div class="mt-3"><h6 class="fw-bold">30.2. Cautionnement d'avance de démarrage</h6><RichTextarea v-model="cautionnement_avance_demarrage"/></div>
                    <div class="mt-3"><h6 class="fw-bold">30.3. Cautionnement de bonne exécution</h6><RichTextarea v-model="cautionnement_garantie"/></div>
                </div>

                <div v-else-if="currentStep === 8">
                    <div class="mt-3"><h5 class="fw-bold mb-3">Article 31. Variation des prix</h5><RichTextarea v-model="variation_prix"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-3">Article 32. Formules de révision des prix</h5><RichTextarea v-model="revision_prix"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-3">Article 33. Formules d'actualisation des prix</h5><RichTextarea v-model="actualisation_prix"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-3">Article 34. Travaux en régie</h5><RichTextarea v-model="travaux_regie"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-3">Article 35. Valorisation des approvisionnements</h5><RichTextarea v-model="valorisation_approvisionnement"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-3">Article 36. Avances</h5><RichTextarea v-model="avances"/></div>
                </div>

                <div v-else-if="currentStep === 9">
                    <h5 class="fw-bold mb-3">Article 37. Règlement des travaux</h5>
                    <div class="mt-3"><h6 class="fw-bold">37.2. Décomptes provisoires</h6><RichTextarea v-model="decompte_provisoir"/></div>
                    <div class="mt-3"><h6 class="fw-bold">37.3. Décompte final</h6><RichTextarea v-model="decompte_final"/></div>
                    <div class="mt-3"><h6 class="fw-bold">37.4. Décompte général et définitif</h6><RichTextarea v-model="decompte_defintif"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-3">Article 40. Règlement en cas de groupement d'entreprises et de sous-traitance</h5><RichTextarea v-model="reglement_groupement"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-3">Article 41. Régime fiscal et douanier</h5><RichTextarea v-model="regime_fiscal"/></div>
                </div>

                <div v-else-if="currentStep === 10">
                    <h5 class="text-center">CHAPITRE V : DISPOSITIONS DIVERSES</h5>
                    <div class="mt-3"><h5 class="fw-bold mb-3">Article 43. Résiliation du marché</h5><RichTextarea v-model="resiliation_marche"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-3">Article 44. Cas de force majeure</h5><RichTextarea v-model="force_majeure"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-3">Article 45. Différends et litiges</h5><RichTextarea v-model="differends_litiges"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-3">Article 46. Édition et diffusion du présent marché</h5><RichTextarea v-model="edition_marche"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-3">Article 47. Et dernier : Validité et entrée en vigueur du marché</h5><RichTextarea v-model="entree_en_vigueur"/></div>
                </div>

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
import { useRoute, useRouter } from 'vue-router';
import Loader from '@/components/Loader.vue';
import HeaderPiece from '@/components/HeaderPiece.vue'
import StepperForm from '@/components/StepperForm.vue'
import PieceNavigator from '@/components/PieceNavigator';
import RichTextarea from '@/components/RichTextarea.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useAppelOffre } from '@/composables/useAppelOffre';
import { usePiece } from '@/composables/usePiece';
import { useConceptionRealisation } from '@/composables/useConceptionRealisation';

const route = useRoute();
const router = useRouter();
const dossier = route.params.project_id
const dao = ref({})
const pieces = ref([])
const isLoading = ref(true)
const current_piece = route.name
const id_piece = ref()
const trouve = ref(false)
const message = ref('');
const errors = ref({});

const { getDAO } = useAppelOffre()
const { get_pieces, update_piece } = usePiece()
const { get_ccap, create_ccap, update_ccap } = useConceptionRealisation()

// ===== Article 3 : Attributions et nantissement =====
const chef_service_marche = ref('')
const contractant = ref('')
const ing_marche = ref('')
const control_externe = ref('')
const cocontractant = ref('')
const maitrise_oeuvre_conception = ref(`<p> la commission de 
suivi et de recette technique dont la composition est prévue par les dispositions de l’article <em> [ à préciser ]</em>  du présent Marché ; </p>`)
const maitre_oeuvre_realisation = ref(`<p> <em>[A préciser le cas échéant]</em> ci
après désigné Maître d’Œuvre ; <em>[Préciser s’il s’agit d’une maîtrise d’œuvre de droit public ou privé] </em> : il est chargé d’assurer la défense des intérêts du Maître d’Ouvrage ou du Maître d’Ouvrage Délégué aux 
stades de la définition, de l’élaboration, de l’exécution et de la réception des prestations objet du 
marché ; </p>`)
const assistant_maitrise_ouvrage = ref('<p><i>[à préciser]</i></p>')
const autorite_ordonnancement = ref('')
const autorite_liquidation = ref('')
const organisme_paiment = ref('')
const responsable_renseignement = ref('')

// ===== Articles 6, 7, 8 =====
const pieces_constitutive_marche = ref(`<p>Les pièces contractuelles constitutives du présent marché sont complémentaires. Elles sont par ordre de priorité : <i>[à adapter en fonction de la nature des travaux]</i>.</p>
<ol>
<li>la soumission ou l'acte d'engagement ;</li>
<li>L'offre du cocontractant et ses annexes dans toutes les dispositions non contraires au Cahier des Clauses Administratives particulières (CCAP), aux Cahiers des Clauses Techniques Particulières (CCTP), ou aux clauses techniques des travaux, le cas échéant ;</li>
<li>le cahier des clauses administratives particulières (CCAP) ;</li>
<li>les termes de références (TDR) ;</li>
<li>les spécifications techniques ou Cahiers des Clauses Techniques Particulières (ST ou CCTP) ;</li>
<li>Les éléments propres à la détermination du montant du marché / coût Global du Projet, tels que, par ordre de priorité :
  <ol type="a">
  <li>le détail ou le devis quantitatif et estimatif ;</li>
  <li>les bordereaux des prix unitaires et forfaitaires ;</li>
  <li>l'état des prix forfaitaires ;</li>
  <li>la décomposition des prix forfaitaires et/ou le sous-détail des prix unitaires ;</li>
  </ol>
</li>
<li>l'Avant-Projet Détaillé (APD) ;</li>
<li>Le projet/programme d'exécution ou plan d'action, etc ;</li>
<li>les cahiers des clauses administratives générales (CCAG) auxquels il est spécifiquement assujetti (CCAG–SPI et CCAG-Travaux) ;</li>
<li>Le ou les Cahiers des Clauses Techniques Générales (CCTG) applicables aux prestations faisant l'objet du marché. <i>[Insérer et indiquer, le cas échéant, les noms et références]</i> ;</li>
<li>tout autre document utile : les Procès-Verbaux (PV) de négociation, les Plans, les Stratégies de gestion et Plans de mise en œuvre Environnemental Social, Hygiène et Sécurité (ESHS), le Code de Conduite ESHS, l'analyse de la valeur du projet le cas échéant, plans, notes de calcul, cahiers de sondages et dossiers géotechniques, <i>[Insérer et indiquer, le cas échéant, les noms et références]</i>, etc. ;</li>
<li>la charte d'intégrité ;</li>
<li>la déclaration d'engagement social et environnemental.</li>
</ol>`)
const textes_applicables = ref(`<p>Le présent marché est soumis aux textes généraux ci-après : <i>[liste non exhaustive, à adapter selon les cas]</i></p>
<ol>
<li>La Loi N° 75/15 du 08 Décembre 1975 portant assurance obligatoire des risques de construction ;</li>
<li>La Loi n° 92/007 du 14 août 1992 portant Code de travail ;</li>
<li>la loi n° 096/12 du 05 août 1996 portant loi-cadre relative à la gestion de l'environnement ;</li>
<li>La loi n°2016/17 du 14 décembre 2016 portant Code minier ;</li>
<li>La loi N° 2018/011 du 11 juillet 2018, portant Code de Transparence et de Bonne Gouvernance dans la Gestion des Finances Publique au Cameroun ;</li>
<li>La loi n° 2018/012 du 11 juillet 2018 portant régime financier de l'Etat ;</li>
<li>La loi n° …… du … décembre 20XX portant loi des finances de la République du Cameroun pour le compte de l'exercice 20X(X+1) ;</li>
<li>Le Décret n° 77-318 du 17 Août 1977 portant application de la loi n° 75-15 du 08 Décembre 1975 rendant obligatoire l'assurance des risques relatifs à la construction ;</li>
<li>Le décret n° 2001/048 du 23 février 2001 portant organisation et fonctionnement de l'Agence de Régulation des Marchés Publics et ses textes modificatifs subséquents ;</li>
<li>Le Décret n° 2005/577 du 23 février 2005 fixant les modalités de réalisation des études d'impact environnemental ;</li>
<li>Décret n° 2011/408 du 9 décembre 2011 portant organisation du Gouvernement modifié et complété par le décret n° 2018/190 du 02 mars 2018 ;</li>
<li>Le décret n° 2012/075 du 08 mars 2012 portant organisation du Ministère des Marchés Publics dans ses dispositions non contraires au code des marchés publics ;</li>
<li>Le Décret n° 2014/0611/PM du 24 mars 2014 fixant les conditions de recours et d'application de l'approche HIMO ;</li>
<li>Le Décret n° 2018/366 du 20 juin 2018 portant Code des Marchés Publics et ses textes d'application ;</li>
<li>le Décret n°2019/002 du 04 janvier 2019 portant réaménagement du Gouvernement ;</li>
<li>L'Arrêté N° 168/A/MINMAP du 11 août 2021 fixant les conditions et modalités de passation et d'exécution des marchés de conception-réalisation ;</li>
<li>L'arrêté mettant en vigueur les Cahiers des Clauses Administratives Générales (CCAG) applicables aux Marchés Publics de travaux en vigueur ;</li>
<li>La circulaire <i>[à indiquer en tant que de besoin]</i> portant instruction relative à l'exécution, au suivi et au contrôle de l'exécution du budget de l'Etat, des Etablissements Publics Administratifs, des Collectivités Territoriales Décentralisées et des autres organismes subventionnés pour l'exercice <i>[à indiquer en tant que de besoin]</i> ;</li>
<li>Les textes régissant les autres corps de métier ;</li>
<li>D'autres textes spécifiques au domaine concerné par le marché ;</li>
<li>Les normes en vigueur.</li>
</ol>`)

const communication = ref(`<p>Toutes les communications au titre du présent marché sont écrites et les notifications faites aux adresses ci-après :</p>
<p><strong>a)</strong> Dans le cas où le cocontractant est le destinataire : Madame/Monsieur : <i>[à préciser]</i></p>
<ul>
<li>BP : _________________</li>
<li>Téléphone : ____________________________________</li>
<li>Fax : _______________________</li>
</ul>
<p>Passé le délai de 15 jours fixé dans le CCAG pour faire connaître au Maître d'Ouvrage ou au Maître d'Ouvrage Délégué, au chef de service son domicile, les correspondances seront valablement adressées à la mairie de : <i>[à préciser, celle-ci doit être dans la sphère géographique du projet]</i>.</p>
<p><strong>b)</strong> Dans le cas où le Maître d'Ouvrage ou Maître d'Ouvrage Délégué en est le destinataire : Madame/Monsieur le : <i>[à préciser]</i></p>
<ul>
<li>BP : _________________</li>
<li>Téléphone : ____________________________________</li>
<li>Fax : _______________________</li>
</ul>
<p>avec copie adressée dans les mêmes délais au Chef de service, et à l'ingénieur.</p>`)

// ===== Article 9, 10 =====
const consistance_phase_conception = ref(`<p>Le cocontractant mènera les études sur la base de l'Avant-Projet Sommaire (APS) proposé dans son offre, en vue de déboucher sur un Avant-Projet Détaillé, comprenant les principales rubriques ci-après : <i>[à définir]</i>.</p>`)

const consistance_phase_realisation = ref(`<p>Le cocontractant exécutera les travaux tels que décrits dans l'Avant-Projet Détaillé validé par le Maître d'Ouvrage à l'issue de la phase 1, et comprenant les principales rubriques ci-après : <i>[à définir]</i>.</p>`)

const delai_execution = ref(`<p>9.1. Le délai global d'exécution des prestations objet du présent marché est de :</p>
<table border="1" cellpadding="5" cellspacing="0">
<thead><tr><th>Phases</th><th>Délais d'exécution (en mois)</th></tr></thead>
<tbody>
<tr><td>Phase 1 : Conception ou Etudes</td><td><i>[à préciser en lettres et en chiffres]</i></td></tr>
<tr><td>Phase 2 : Réalisation des travaux</td><td><i>[à préciser en lettres et en chiffres]</i></td></tr>
<tr><td>Délai global (Phase 1 + Phase 2)</td><td><i>[à préciser en lettres et en chiffres]</i></td></tr>
</tbody>
</table>
<p>9.2. Le délai d'exécution de la phase 1 court à compter de la date de notification de l'ordre de service de commencer les prestations de ladite phase, sauf stipulation contraire <i>[à préciser]</i>.</p>
<p>Le délai d'exécution de la phase 2 court à compter de la date de notification de l'ordre de service de commencer les travaux, sauf stipulation contraire <i>[à préciser]</i>.</p>
<p>Pour les marchés à tranches conditionnelles, le délai de chaque tranche, qui court à compter de la date de notification de l'ordre de service de commencer les travaux de la tranche considérée est de :</p>
<table border="1" cellpadding="5" cellspacing="0">
<thead><tr><th>Tranche</th><th>Délai (en mois)</th></tr></thead>
<tbody>
<tr><td>Tranche ferme</td><td></td></tr>
<tr><td>Tranche conditionnelle 1</td><td></td></tr>
<tr><td>Tranche conditionnelle n</td><td></td></tr>
</tbody>
</table>
<p>L'exécution de la phase 2 est conditionnée par la réception des prestations de la phase 1 à la satisfaction du Maître d'Ouvrage.</p>`)

// ===== Article 14, 15 =====
const marche_a_tranche = ref(`<p><strong>14.1.</strong> <i>[Préciser si le marché comporte une ou plusieurs tranches et les conditions de notification de chacune des tranches]</i>. A la fin d'une tranche, le Maître d'Ouvrage ou le Maître d'Ouvrage Délégué procèdera à la réception des prestations de la tranche considérée et délivrera une attestation de bonne exécution au Cocontractant à l'année d'exécution du contrat. Cette réception conditionnera le début de la tranche conditionnelle suivante.</p>
<p><strong>14.2.</strong> Le délai à compter de la date de réception provisoire de la tranche précédente pour la signature et la notification par le Maître d'Ouvrage ou le Maître d'Ouvrage Délégué de l'ordre de service de commencer une tranche conditionnelle est de : <i>[nombre de jours à préciser le cas échéant]</i>.</p>
<p><strong>14.3.</strong> Le délai de notification de cet ordre de service par le Chef de service du marché est de quinze (15) jours maximum. Ce délai est le même que celui de la tranche ferme.</p>`)

const personnel_entreprise = ref(`<p>Le cocontractant est tenu d'utiliser le personnel proposé dans son offre, qui se compose comme suit : <i>[à préciser]</i></p>
<ol>
<li>Chef de Projet : <i>[indiquer le nom]</i></li>
<li>Personnel clé pour les études :
  <ul>
  <li>2.1. Chef de mission : <i>[indiquer le nom]</i></li>
  <li>2.2. Autres personnels clés : <i>[indiquer les noms]</i></li>
  </ul>
</li>
<li>Personnel clé pour l'exécution des travaux :
  <ul>
  <li>3.1. Conducteur des travaux : <i>[indiquer le nom]</i></li>
  <li>3.2. Autres personnels clés : <i>[indiquer les noms]</i></li>
  </ul>
</li>
</ol>
<p><i>Indiquer par ailleurs le personnel à recruter dans le cas de l'approche HIMO le cas échéant, ainsi que le mode de leur rémunération.</i></p>`)

const replacement_personnel = ref(`<p>Toute modification, même partielle, apportée aux propositions de l'offre technique n'interviendra qu'après agrément écrit du Maître d'Ouvrage ou du Maître d'Ouvrage Délégué ou du Chef de service du marché après avis du Maître d'Œuvre. En cas de modification, le cocontractant le fera remplacer par un personnel de compétence (qualifications et expérience) au moins égale ou par un matériel de performance similaire et en bon état de marche.</p>
<p>En tout état de cause, les listes du personnel d'encadrement à mettre en place seront préalablement soumises à l'agrément écrit du Maître d'Œuvre ou de l'ingénieur le cas échéant dans les jours <strong>x_________________</strong> jours <em>[à préciser]</em> qui suivent la notification de l'ordre de service de commencer les travaux. Passé ce délai, les listes seront considérées comme approuvées.</p>
<p>Le Maître d'Œuvre ou l'ingénieur le cas échéant disposera de <strong>x………</strong> jours <em>(à préciser)</em> pour notifier par écrit son avis au Chef de service du Marché. Le Maître d'Ouvrage se réserve la possibilité de refuser son agrément à une personne proposée par le cocontractant dont la qualification serait insuffisante.</p>
<p>Toute modification unilatérale apportée aux propositions en personnel d'encadrement de l'offre technique, avant et pendant l'exécution des prestations constitue un motif de résiliation du marché tel que visé à l'article 43 ci-dessous ou d'application de pénalités <i>[à préciser]</i>.</p>
<p>Toute modification apportée sera notifiée au Maître d'Ouvrage pour approbation préalable.</p>`)

// ===== Article 16, 20, 21, 22 =====
const programme_travaux = ref(`<p><strong>16.1. Programmes d'action et des travaux, Plan d'assurance qualité et autres <i>[à préciser]</i> pour la phase 1 (Conception ou études)</strong></p>
<p>Dans un délai maximum de <i>[trente (30) jours]</i> à compter de la notification de l'ordre de service de commencer les prestations de la phase 1, le cocontractant soumettra, en <i>[cinq (05) ou six (06)]</i> exemplaires, à l'approbation du Chef de service du marché après avis de l'Ingénieur du marché, le programme d'exécution des prestations, son calendrier d'exécution, son projet de Plan d'Assurance Qualité (PAQ) et son Plan de Gestion Environnementale, le cas échéant.</p>
<p>Ce programme sera exclusivement présenté selon les modèles fournis. Deux (02) exemplaires de ces pièces lui seront retournés dans un délai de huit (08) à quinze (15) jours à partir de leur réception avec :</p>
<ul>
<li>Soit la mention d'approbation « BON POUR EXECUTION » ;</li>
<li>Soit la mention de leur rejet accompagnée des motifs dudit rejet.</li>
</ul>
<p>En cas de rejet, le Cocontractant disposera de huit (08) jours pour présenter un nouveau projet. Le Chef de Service du marché disposera alors d'un délai de cinq (05) jours pour donner son approbation ou faire d'éventuelles remarques. Les délais d'approbation du programme d'exécution sont suspensifs du délai d'exécution.</p>
<p>L'approbation donnée par le Chef de Service du marché n'atténuera en rien la responsabilité du Cocontractant. Cependant les prestations exécutées avant l'approbation du programme ne seront ni constatées ni rémunérées. Le planning actualisé et approuvé deviendra le planning contractuel.</p>
<p>Le Cocontractant mettra constamment à jour, un planning des prestations qui tiendra compte de l'avancement réel des prestations. Des modifications importantes ne pourront être apportées au programme contractuel qu'après avoir reçu l'accord du Chef de service du marché. Après approbation du programme d'exécution par le Chef de service du marché, celui-ci le transmettra dans un délai de cinq (05) jours au Maître d'Ouvrage, sans effet suspensif de son exécution.</p>
<p>Toutefois s'il est constaté des modifications importantes dénaturant l'objet du marché ou la consistance des prestations, le Maître d'Ouvrage retournera le programme d'exécution accompagné des réserves à lever dans un délai de quinze (15) jours à compter de sa date de réception.</p>
<p><strong>16.2. Programmes d'action et des travaux, Plan d'assurance qualité et autres <i>[à préciser]</i> pour la phase 2 (Réalisation des travaux)</strong></p>
<p><strong>a)</strong> Dans un délai maximum de <i>[à préciser]</i> à compter de la notification de l'ordre de service de commencer les travaux objets de la phase 2, le cocontractant de l'administration soumettra, en <i>[à préciser]</i> exemplaires, à l'approbation du Chef de service du marché après avis du Maître d'Œuvre (ou de l'Ingénieur du marché), le programme d'exécution des travaux, son calendrier d'approvisionnement, son projet de Plan d'Assurance Qualité (PAQ) et son Plan de Gestion Environnementale, le cas échéant.</p>
<p>Ce programme sera exclusivement présenté selon les modèles fournis et comprenant notamment :</p>
<ul>
<li>Le PV de définition des tâches à exécuter, le cas échéant ;</li>
<li>La liste des travaux à sous-traiter ;</li>
<li>La description des modalités de maintien de la circulation le cas échéant ;</li>
<li>Etc.</li>
</ul>
<p>Deux (02) exemplaires de ces pièces lui seront retournés dans un délai de <i>[à préciser]</i> à partir de leur réception avec :</p>
<ul>
<li>Soit la mention d'approbation « BON POUR EXECUTION » ;</li>
<li>Soit la mention de leur rejet accompagnée des motifs dudit rejet.</li>
</ul>
<p>Le cocontractant de l'administration disposera alors de <i>[à préciser]</i> pour présenter un nouveau projet. Le Chef de Service ou le Maître d'Œuvre disposera alors d'un délai de <i>[à préciser]</i> pour donner son approbation ou faire d'éventuelles remarques. Les délais d'approbation du projet d'exécution sont suspensifs du délai d'exécution.</p>
<p>L'approbation donnée par le Chef de Service ou le Maître d'Œuvre n'atténuera en rien la responsabilité du cocontractant. Cependant les travaux exécutés avant l'approbation du programme ne seront ni constatés ni rémunérés sauf s'ils ont été expressément ordonnés. Le planning actualisé et approuvé deviendra le planning contractuel.</p>
<p>Le cocontractant de l'administration mettra constamment à jour, sur le chantier, un planning des travaux qui tiendra compte de l'avancement réel des travaux. Des modifications importantes ne pourront être apportées au programme contractuel qu'après avoir reçu l'accord du Chef de service du Marché. Après approbation du programme d'exécution par le Chef de service du Marché, celui-ci le transmettra dans un délai de <i>[à préciser]</i> au Maître d'Ouvrage ou au Maître d'Ouvrage Délégué, sans effet suspensif de son exécution. Toutefois, s'il est constaté des modifications importantes dénaturant l'objectif du marché ou la consistance des travaux, le Maître d'Ouvrage ou le Maître d'Ouvrage Délégué retournera le programme d'exécution accompagné des réserves à lever dans un délai de quinze (15) jours à compter de sa date de réception.</p>
<p><strong>b)</strong> Le Plan de Gestion Environnemental et Social fera ressortir notamment les conditions de choix des sites techniques et de base vie, les conditions d'emprunt de sites d'extraction et les conditions de remise en état des sites de travaux et d'installation.</p>
<p><strong>c)</strong> Le cocontractant indiquera dans ce programme les matériels et méthodes qu'il compte utiliser ainsi que les effectifs du personnel qu'il compte employer.</p>`)

const projet_execution = ref(`<p><strong>a.</strong> Dans un délai maximum de <i>[à préciser]</i> jours, à compter de la date de notification de l'ordre de service de commencer les travaux de la phase 2, le Cocontractant soumettra à l'approbation de l'Ingénieur du marché ou du Maître d'œuvre le cas échéant, un projet d'exécution en <i>[à préciser]</i> exemplaires comprenant notamment :</p>
<ul>
<li>le procès-verbal de définition des tâches à exécuter ;</li>
<li>le relevé des dégradations le cas échéant ;</li>
<li>le schéma itinéraire ou le linéaire des travaux à exécuter, le cas échéant ;</li>
<li>la description des procédés et des méthodes d'exécution des travaux envisagés avec les prévisions d'emploi du personnel, du matériel et des matériaux ;</li>
<li>les plans d'exécution des ouvrages et les notes de calcul y afférentes ;</li>
<li>les plans d'approvisionnement ;</li>
<li>le planning graphique des travaux ;</li>
<li>la liste des travaux que le cocontractant fera le cas échéant, exécuter par des sous-traitants.</li>
</ul>
<p>Le planning actualisé et approuvé deviendra le planning contractuel. Il doit faire apparaître les tâches critiques. Le cocontractant tiendra constamment à jour sur le chantier, un planning actualisé des travaux qui tiendra compte de l'avancement réel du chantier.</p>
<p>En cas d'inobservation des délais d'approbation des documents ci-dessus par l'Administration, ceux-ci sont réputés approuvés.</p>`)

const labo_chantier = ref(`<p>Le cocontractant est tenu d'avoir sur le chantier son propre laboratoire permettant d'exécuter tous les essais d'identification et/ou d'étude des matériaux définis dans le CCTP contenu dans l'APD. Le personnel et le matériel de ce laboratoire doivent recevoir l'agrément du Maître d'œuvre du marché ou de l'Ingénieur dans un délai de <i>[à préciser]</i>.</p>
<p>20.1. Les essais le cas échéant, prévus dans le cadre du présent marché comprennent : <i>[à préciser]</i>.</p>
<p>20.2. Les équipements et matériels de laboratoire nécessaires sont : <i>[à préciser]</i></p>
<p>20.3. Les modalités de mise en œuvre de ces essais sont : <i>[à préciser]</i></p>
<p>Les frais inhérents à ces essais et contrôles sont à la charge du Cocontractant.</p>`)

const reunion_chantier = ref(`<p>Outre les réunions régulières de chantier à l'initiative du maître d'œuvre, des réunions périodiques devront être tenues en présence du Chef de service du marché et de l'Ingénieur du marché ou leur représentant. <i>[Préciser la fréquence]</i>.</p>
<p>Les réunions de chantier feront l'objet d'un procès-verbal signé par tous les participants.</p>`)

const utilisation_explosifs = ref('<p><i>[Préciser les éventuelles restrictions ou interdictions]</i></p>')

// ===== Article 23 =====
const commission_suivi_recette_conception = ref(`<ul>
<li>L'assistance à maîtrise d'ouvrage ;</li>
<li>Le Maître d'Ouvrage ou son représentant, Président ;</li>
<li>Le Chef de Service du marché ou son représentant, Membre ;</li>
<li>Les Représentants du Ministère en charge des Marchés Publics (observateurs) ;</li>
<li>L'Ingénieur du Marché, rapporteur ;</li>
<li>Membres externes.</li>
</ul>
<p>Les membres de la commission sont convoqués à la réception par courrier au moins <i>[préciser la durée]</i> avant la date de réception.</p>`)

const operation_prealable_reception = ref(`<p>Avant la réception provisoire, le cocontractant demande par écrit au Maître d'Ouvrage ou au Maître d'Ouvrage Délégué, avec copie à l'ingénieur, l'organisation d'une visite technique préalable à la réception. Cette visite comprend entre autres opérations : <i>[lister les opérations]</i></p>
<ul>
<li>La commission de réception ou un technicien désigné à cet effet, procède aux vérifications en qualité et en quantités <i>(à préciser pour les marchés avec les équipements inclus le cas échéant, soit dans les usines de fabrication et les modalités, ateliers d'essais, magasins ou lieux d'exécution des prestations du cocontractant, soit dans les sites du Maître d'Ouvrage ou du Maître d'Ouvrage Délégué)</i>.</li>
</ul>
<p>Ces opérations font l'objet d'un procès-verbal dressé sur le champ et signé par le Maître d'œuvre le cas échéant, l'Ingénieur et le Cocontractant.</p>
<p>Lorsque ces opérations sont effectuées par un technicien, celui-ci établit un procès-verbal portant proposition d'acceptation, de mise à réparer, à bonifier ou de rejet, qui est transmis à la commission pour décision.</p>
<p>La commission de réception technique ou le technicien commis à cette tâche, doit vérifier la conformité qualitative, technique et quantitative des travaux.</p>
<p>En matière de réception technique, la commission prend une des décisions suivantes concernant tout ou partie de la prestation :</p>
<ul>
<li>Elle accepte en qualité et en quantité les travaux et, dans ce cas, sa décision est immédiatement exécutoire ;</li>
<li>Elle constate que les travaux ne sont pas conformes et en prononce le rejet. Toutefois, dans cette hypothèse, elle peut admettre soit que la prestation soit mise en conformité, soit qu'elle fasse l'objet d'une réfaction. Le rejet de la prestation est notifié au Cocontractant par lettre recommandée ou simple lettre contre décharge s'il n'a pas signé le procès-verbal concluant à cette décision.</li>
</ul>`)

const reception_provisoire = ref(`<p>Le cocontractant est tenu de faire connaître au Chef de service du marché au plus tard <i>[à préciser]</i> jours avant l'expiration du délai contractuel, la date à laquelle il souhaite que soient réceptionnés les travaux. La réception provisoire sera prononcée aussitôt à la fin de l'exécution des travaux objet du présent marché et après les opérations préalables à la réception. Pour les marchés comportant plusieurs tranches, le Maître d'Ouvrage ou le Maître d'Ouvrage Délégué procèdera à la réception provisoire des travaux de la tranche considérée, ce qui conditionnera le début de la tranche conditionnelle suivante. La visite de réception est sanctionnée par la signature, séance tenante par tous les participants, d'un procès-verbal de réception mentionnant si elle est prononcée ou non et, le cas échéant, les réserves à lever, assorties de délais. Pour être valable, le procès-verbal de réception doit être signé par les deux tiers (2/3) au moins des membres, dont le Président.</p>`)

const commission_reception = ref(`<p>La Commission de réception sera composée des membres suivants <i>[à titre indicatif]</i> :</p>
<ul>
<li>Le Maître d'Ouvrage ou le Maître d'Ouvrage Délégué ou son représentant (Président) ;</li>
<li>L'Ingénieur, Membre <i>[au cas où il y a une maîtrise d'œuvre]</i> / Rapporteur <i>[en cas d'absence de maîtrise d'œuvre]</i> ;</li>
<li>Membres :
  <ul>
  <li>Le Chef de Service ou son représentant ;</li>
  <li>Le comptable matière du Maître d'Ouvrage ou du Maître d'Ouvrage Délégué conformément à la circulaire portant application de la loi des finances de l'année <i>[à préciser]</i> ;</li>
  <li>L'Ingénieur du marché (en cas de présence de Maîtrise d'œuvre) / Rapporteur <i>[en cas d'absence de maîtrise d'œuvre]</i> ;</li>
  <li>Autres membres <i>[à préciser]</i> ;</li>
  </ul>
</li>
<li>Le Représentant du MINMAP, observateur ;</li>
<li>Invité : Le Cocontractant.</li>
</ul>`)

const reception_partielle = ref(`<p>Le cocontractant pourra, selon que la nature des prestations l'exige ou pour cas de force majeure, demander des réceptions partielles. Dans ce cas, la commission chargée des réceptions partielles sera la même que celle devant effectuer la réception provisoire. Un procès-verbal de réception partielle sera rédigé et signé par toutes les parties. <i>[Indiquer s'il est prévu des réceptions partielles]</i></p>`)

// ===== Articles 24, 25, 26 =====
const documente_a_fournir = ref(`<p>Le Cocontractant remettra au Maître d'œuvre ou l'ingénieur du marché dans les trente jours suivant la date de réception provisoire de l'ensemble des travaux, le plan de récolement.</p>
<p>24.1. <i>[Indiquer la liste des autres documents à fournir dans un délai de 30 jours après la réception provisoire]</i>.</p>
<p>24.2. <i>[Indiquer le montant à retenir sur la caution en termes de pénalité pour non-fourniture desdits documents]</i>.</p>`)

const delai_garantie = ref(`<p>La durée de garantie est de <i>[à préciser]</i> à compter de la date de réception provisoire des travaux ou de la réception partielle le cas échéant <i>(à préciser)</i>.</p>
<p>Le Cocontractant garantit que les équipements livrés (le cas échéant) en exécution du marché sont neufs et que les travaux sont exécutés dans les règles de l'art et les normes requises.</p>`)

const periode_garantie = ref(`<p>Pendant le délai de garantie, le cocontractant exécutera à ses frais et en temps utile, tous les travaux et réparations nécessaires pour maintenir en bon état l'ouvrage, c'est-à-dire assurer dans les dix (10) jours de la notification du défaut par l'Administration et sur le lieu d'emploi, la remise en état de l'ouvrage pour tous les défauts ou réparations consécutifs pour remédier à tous les désordres du fait de malfaçons qui apparaîtraient dans les ouvrages et les équipements le cas échéant, et signalées par le Chef de service du marché ou le Maître d'œuvre le cas échéant.</p>
<p>Si après réception provisoire, le cocontractant ne s'est pas conformé dans un délai de quinze (15) jours aux prescriptions d'un ordre de service concernant les réparations ou réfections éventuelles, le Chef de service du marché sera en droit de les faire exécuter par ses propres ouvriers ou par un autre entrepreneur et d'en recouvrer le montant aux dépens du cocontractant par déduction sur toutes sommes dues ou à devoir à ce dernier dans le cadre du marché.</p>`)

const reception_definitive = ref(`<ol>
<li>La réception définitive s'effectuera dans un délai maximal <i>[de quinze (15) jours]</i> à compter de l'expiration du délai de garantie.</li>
<li>Le Maître d'Œuvre <i>[sera ou ne sera pas]</i> membre de la commission.</li>
<li>La procédure de la réception définitive est la même que celle de la réception provisoire.</li>
<li>Le marché est clôturé définitivement dans les conditions fixées à l'article 37 alinéa 4 du présent CCAP concernant le Décompte général et définitif.</li>
</ol>`)

// ===== Article 28, 30 =====
const montant_marche = ref(`<p style="padding-left:12pt;text-align:justify;">Le montant du présent marché, tel qu'il ressort du détail ou devis estimatif, est de : ________________________________ (en chiffres) (en lettres) francs CFA Toutes Taxes Comprises (TTC). Ce montant est réparti entre les deux phases de prestations ainsi qu'il suit :</p>
<table border="1" cellpadding="5" cellspacing="0">
<thead>
<tr>
<th></th>
<th>Coûts de la Phase 1 (conception ou études)</th>
<th>Coûts de la Phase 2 (réalisation des travaux)</th>
<th>Coûts Globaux du Marché</th>
</tr>
</thead>
<tbody>
<tr><td>Montant HTVA (francs CFA)</td><td></td><td></td><td></td></tr>
<tr><td>Montant de la TVA (francs CFA)</td><td></td><td></td><td></td></tr>
<tr><td>Montant TTC (francs CFA)</td><td></td><td></td><td></td></tr>
<tr><td>Montant de l'AIR ou de la TSR le cas échéant</td><td></td><td></td><td></td></tr>
</tbody>
</table>
<p style="padding-left:12pt;text-align:justify;"><i>[L'AIR est applicable aux entreprises dont le siège est basé au Cameroun ; la TSR n'est applicable que pour les marchés passés avec les cocontractants dont le siège est basé à l'étranger. Les montants TTC doivent être inscrits en chiffres et en lettres.]</i></p>`)

const cautionnement_definitif = ref(`<p><strong>a)</strong> le cautionnement sera constitué pour chaque phase du marché.</p>
<p><strong>b)</strong> Il est constitué par le titulaire du Marché et transmis au Chef Service du marché dans un délai maximum de vingt (20) jours calendaires à compter de la date de notification de la phase concernée du marché, et en tout cas, avant le premier paiement relatif à ladite phase.</p>
<p><strong>c)</strong> Son montant est fixé à : __________________ <i>[à préciser. Il est compris entre 2 et 5% maximum]</i> du montant TTC de chaque phase augmenté le cas échéant du montant des avenants.</p>
<p><strong>d)</strong> La garantie sera libellée dans la ou les monnaie(s) du Marché, ou dans une monnaie librement convertible satisfaisant le Maître d'ouvrage ou le Maître d'Ouvrage Délégué, et devra suivre l'un des modèles fournis dans le Dossier d'appel d'offres, comme indiqué par le Maître d'ouvrage ou le Maître d'Ouvrage Délégué dans le CCAP, ou tout autre document satisfaisant le Maître d'ouvrage ou le Maître d'Ouvrage Délégué.</p>
<p><strong>e)</strong> Les modes de substitution du cautionnement sont prévus à l'article 140 du code des marchés publics.</p>
<p><strong>f)</strong> Le cautionnement définitif de chaque phase sera restitué consécutivement par le Maître d'Ouvrage ou le Maître d'Ouvrage Délégué dans un délai d'un mois suivant la date de réception provisoire des prestations, à la suite d'une mainlevée délivrée par le Maître d'Ouvrage ou le Maître d'Ouvrage Délégué après demande du Cocontractant.</p>
<p><strong>g)</strong> Les petites et moyennes entreprises à capitaux et dirigeants nationaux ainsi que les organisations de la société civile peuvent produire, à la place du cautionnement, soit un chèque certifié, soit un chèque banque, soit une hypothèque légale, soit une caution d'un établissement bancaire ou d'un organisme financier agréé conformément aux textes en vigueur.</p>`)

const cautionnement_garantie = ref(`<p>Le cautionnement de bonne exécution concernera uniquement la phase 2. La retenue de garantie est fixée à <i>[10% maximum]</i> du montant TTC de la phase 2 augmenté le cas échéant du montant de ses avenants.</p>
<p>La restitution de la retenue de garantie ou du cautionnement de bonne exécution sera effectuée à compter de la réception définitive des travaux de la phase 2 sur mainlevée délivrée par le Maître d'Ouvrage ou le Maître d'Ouvrage Délégué après expiration du délai de garantie.</p>
<p>A l'expiration d'un délai de 30 jours calendaires, les cautionnements cessent d'avoir effet ; l'organisme compétent est tenu de restituer ces cautionnements ou de libérer la retenue de garantie ou le cautionnement de bonne exécution sur simple demande du cocontractant de l'administration ; sauf si le Maître d'Ouvrage ou le Maître d'Ouvrage Délégué a dûment signifié à l'organisme émetteur de la caution, que le cocontractant n'a pas honoré toutes ses obligations.</p>
<p>Dans ce cas, il ne peut être mis fin à l'engagement de la caution que par mainlevée délivrée par le Maître d'Ouvrage ou le Maître d'Ouvrage Délégué.</p>`)

const cautionnement_avance_demarrage = ref(`<p><i>[Préciser si l'avance de démarrage pourra être accordée, indiquer le cas échéant son taux (20% maximum du montant TTC de la phase considérée) et les modalités de sa restitution. L'avance de démarrage devra être cautionnée à 100% par un établissement bancaire de droit camerounais ou un organisme financier agréé de premier rang conformément à la réglementation en vigueur et les modalités de restitution de la caution.]</i></p>`)

// ===== Articles 31 à 36 =====
const variation_prix = ref(`<p>31.1. Les prix sont fermes ou révisables <i>[retenir l'une des deux options à préciser selon les modalités du Code]</i>. Les acomptes payés au cocontractant au titre des avances ne sont pas révisables.</p>
<p>31.2. Modalités d'actualisation des prix (le cas échéant). Les modalités d'actualisation ou de révision des prix sont celles prévues dans le Code des Marchés Publics. <i>[La révision de prix ou leur actualisation en application des clauses contractuelles ne donne pas lieu à la conclusion d'un avenant]</i>.</p>`)

const revision_prix = ref(`<p>Les prix du bordereau des prix unitaires et forfaitaires sont révisables par application de la formule suivante : <i>[Insérer la formule et définir les paramètres et indices à appliquer le cas échéant]</i>.</p>
<p>Pour chacun des paramètres, l'indice « 0 » indique la « valeur de base » à la date du mois précédent celui du dépouillement des plis. <i>[Se conformer au Code des marchés publics]</i></p>`)

const actualisation_prix = ref(`<p>Les prix du bordereau des prix unitaires et forfaitaires sont actualisables par application de la formule suivante : <i>[Insérer, le cas échéant, la formule et définir les paramètres et indices à appliquer le cas échéant]</i>. Les indices sont, le cas échéant, ceux définis pour les formules de révision des prix.</p>`)

const travaux_regie = ref(`<p>34.1. Le cocontractant sera tenu de mettre à la disposition du Maître d'Ouvrage ou du Maître d'Ouvrage Délégué, la main d'œuvre, les matériaux, ainsi que l'outillage et tous les moyens nécessaires qu'il pourra être amené à lui demander pour exécuter en régie certains travaux, à condition que la demande lui en soit faite au moins huit (8) jours à l'avance et qu'elle soit en rapport avec l'objet du marché.</p>
<p>Le montant des travaux en régie visés à l'alinéa 1 ci-dessus ne peut être supérieur à deux pour cent (2%) du montant toutes taxes comprises (TTC) de la phase concernée.</p>
<p>34.2. En cas de défaillance dûment constatée du cocontractant de l'Administration, le Maître d'Ouvrage ou le Maître d'Ouvrage Délégué peut, à défaut de prononcer la résiliation du marché, et après l'autorisation expresse de l'Autorité chargée des marchés publics, prescrire une régie totale ou partielle aux frais et risques dudit cocontractant. <i>[Se référer au texte particulier de l'Autorité chargée des marchés publics définissant les conditions d'exercice des travaux en régie]</i></p>
<p>34.3. Les travaux en régie ainsi exécutés seront rémunérés sur la base des prix unitaires de régie prévus par le marché, ou, à défaut, des salaires, indemnités, charges sociales, sommes dépensées pour les fournitures et le matériel, majorés dans les conditions fixées par le texte particulier de l'Autorité chargée des marchés publics définissant les conditions d'exercice des travaux en régie pour couvrir les frais généraux, impôts, taxes et bénéfices.</p>`)

const valorisation_approvisionnement = ref(`<p>35.1. <i>[Des avances pour approvisionnement peuvent être accordées en raison des dépenses engagées en vue de l'exécution des travaux, fournitures ou services qui font l'objet d'un marché. Les modalités de paiement desdites avances sont fixées dans le code des marchés publics.]</i></p>
<p>35.2. Il n'est pas demandé de caution pour les acomptes sur approvisionnements.</p>
<p>35.3. Dans tous les cas, le cocontractant de l'administration est responsable du gardiennage des matériaux ayant donné lieu à une avance pour approvisionnement jusqu'à la réception des travaux.</p>`)

const avances = ref(`<p>36.1. Le Maître d'Ouvrage ou le Maître d'Ouvrage Délégué <i>[accordera ou n'accordera pas]</i> une avance de démarrage <i>[n'excédant pas 20% du montant TTC de la phase concernée]</i>.</p>
<p>36.2. L'avance de démarrage peut être obtenue par le cocontractant de l'administration sur simple demande adressée au Maître d'ouvrage ou au Maître d'Ouvrage Délégué sans justificatif. Cette avance commence à être remboursée par déduction d'un pourcentage : <i>[à préciser]</i> sur chaque décompte dès lors que le cumul des travaux atteint 40% du montant de la phase concernée.</p>
<p>36.3. La totalité de l'avance doit être remboursée au plus tard dès le moment où la valeur en prix de base des prestations réalisées atteint quatre-vingt pour cent (80%) du montant de la phase concernée.</p>
<p>36.4. Au fur et à mesure du remboursement des avances, le Maître d'Ouvrage ou le Maître d'Ouvrage Délégué donnera la mainlevée de la partie de la caution correspondante, sur demande expresse du cocontractant de l'administration.</p>
<p>36.5. Le cocontractant de l'administration utilisera exclusivement l'avance de démarrage pour les acquisitions de Matériels, d'équipements, de matériaux et les dépenses de mobilisation spécialement nécessaires pour les besoins de l'exécution du Marché spécifiés dans sa demande.</p>`)

// ===== Article 37, 40, 41 =====
const decompte_provisoir = ref(`<p>Les décomptes provisoires doivent être établis en sept exemplaires à une fréquence de : <i>[à préciser, comprise entre un (01) et trois (3) mois]</i>.</p>
<p>Le Maître d'œuvre ou l'Ingénieur dispose d'un délai de : <i>[à préciser (un délai de zéro (0) à sept (7) jours)]</i> pour transmettre au Chef de service du marché, le projet de décompte qu'il a approuvé. Le chef de service quant à lui dispose d'un délai de : <i>[à préciser, de zéro (0) à vingt-et-un (21) jours]</i> pour procéder à la liquidation et sa transmission au comptable chargé du paiement avec copie à l'organisme chargé du contrôle externe.</p>
<p>Les copies des décomptes provisoires doivent être transmises au Ministère en charge des marchés publics et à l'organisme chargé de la régulation des marchés publics.</p>
<p>Le délai maximum accordé au comptable assignataire pour le règlement des acomptes est fixé à quatre-vingt-dix (90) jours à compter de la date de réception des décomptes transmis par le chef de service du marché.</p>
<p>Le montant HTVA de l'acompte à payer au cocontractant de l'administration sera mandaté comme suit :</p>
<ul>
<li>HTVA - [AIR ou TSR] versé directement au compte du cocontractant de l'administration ;</li>
<li>TVA au taux en vigueur ;</li>
<li>[AIR ou TSR] versé au Trésor public au titre de l'AIR ou de la TSR dû par le cocontractant.</li>
</ul>`)

const decompte_final = ref(`<p><i>[Indiquer le délai dont dispose le cocontractant de l'administration pour transmettre le projet au Maître d'Œuvre, après la date de la recette des études / réception provisoire des travaux (1 mois maxi)]</i></p>
<p>Après achèvement des prestations de chaque phase et dans un délai maximum de <i>[à préciser]</i> jours après la date de la recette ou de la réception provisoire, selon le cas, le cocontractant établira à partir des constats contradictoires, le projet de décompte final des prestations effectivement réalisées qui récapitule le montant total des sommes auxquelles il peut prétendre du fait de l'exécution de l'ensemble des prestations de la phase considérée.</p>
<p>Ce projet de décompte final, une fois accepté ou rectifié par le Maître d'œuvre <i>[ou l'ingénieur du marché]</i> devient final. Il sert à l'établissement de l'acompte pour solde de la phase considérée, établi dans les mêmes conditions que celles définies pour l'établissement des décomptes mensuels.</p>
<p>37.3.2. <i>[Indiquer le délai dont dispose le Chef de service pour notifier le projet rectifié et accepté au Maître d'Œuvre, (1 mois maximum)]</i></p>
<p>37.3.4. Le cocontractant de l'administration doit dans un délai maximal d'un mois suivant la date de cette notification, renvoyer le décompte final revêtu de sa signature sans ou avec réserves, ou faire connaître les raisons pour lesquelles il refuse de signer.</p>
<p>Dans le cas où le cocontractant signe avec réserve ou ne signe pas le décompte final, les motifs de ce refus ou de ces réserves doivent être exposés par le cocontractant dans un mémoire récapitulatif de toutes les réclamations dont il revendique le paiement, accompagné des justificatifs nécessaires, et transmis au Maître d'œuvre <i>[ou l'Ingénieur le cas échéant]</i> dans le même délai que ci-dessus, sous peine de forclusion. Le règlement du différend intervient alors selon les dispositions du code des marchés publics en vigueur.</p>`)

const decompte_defintif = ref(`<p>37.4.1. <i>[Indiquer le délai dont dispose le Chef de service ou le Maître d'Œuvre (ou l'Ingénieur le cas échéant) pour établir le décompte général et définitif au cocontractant de l'administration après la réception définitive des travaux (1 mois maximum)]</i></p>
<p>A la fin de la période de garantie qui donne lieu à la réception définitive des travaux, le Chef de service du Marché dresse le décompte général et définitif du marché qu'il fait signer contradictoirement par le cocontractant et le Maître d'Ouvrage ou le Maître d'Ouvrage Délégué. Ce décompte comprend :</p>
<ul>
<li>les deux (02) décomptes finaux (phases 1 et 2) ;</li>
<li>le solde ;</li>
<li>la récapitulation des acomptes mensuels.</li>
</ul>
<p><strong>La signature du décompte général et définitif sans réserve par le cocontractant, lie définitivement les parties et met fin au marché, et libère le cocontractant et le maître d'ouvrage ou le Maître d'Ouvrage Délégué de toutes leurs obligations, sauf en ce qui concerne les intérêts moratoires.</strong></p>
<p>37.4.2. <i>[Indiquer le délai dont dispose le cocontractant pour renvoyer le décompte général et définitif revêtu de sa signature (1 mois maximum)]</i></p>
<p>La transmission du décompte général et définitif à l'Organisme payeur en vue du paiement est subordonnée au visa préalable du MINMAP. Pour cela, une copie de l'attachement correspondant et tous les décomptes provisoires devront lui être antérieurement transmis ou remis à son représentant sur le site le cas échéant.</p>
<p>Les délais et les modalités de signature ainsi que de gestion des désaccords sont les mêmes que ceux du décompte final.</p>`)

const reglement_groupement = ref(`<p>40.1. En cas de groupement d'entreprises (groupement solidaire) les paiements sont effectués dans le compte indiqué dans la soumission soit au nom du groupement, soit au nom du mandataire <i>[à préciser le cas échéant]</i>.</p>
<p>En cas de groupement conjoint, les paiements seront effectués dans les différents comptes des cotraitants de la manière suivante : <i>[à préciser le cas échéant]</i>.</p>
<p>40.2. Tout paiement d'acompte pour des prestations réalisées par des sous-traitants, est subordonné à l'exécution des prestations prévues dans le marché, et réceptionnées sous réserve de la preuve de leur paiement par le cocontractant de l'Administration aux sous-traitants.</p>
<p>En cas de non-paiement d'un sous-traitant pour des prestations déjà rémunérées par le Maître d'Ouvrage ou le Maître d'Ouvrage Délégué, ce dernier peut prendre à l'encontre du titulaire du marché des mesures coercitives, notamment le paiement direct du sous-traitant.</p>
<p>L'Entreprise principale dispose d'un délai maximal de trente (30) jours ouvrables à compter de la date de rémunération de la facture des prestations exécutées et réceptionnées pour effectuer le paiement du sous-traitant.</p>`)

const regime_fiscal = ref(`<p>Le marché est soumis au régime fiscal et douanier en vigueur en République du Cameroun. Le marché est conclu toutes taxes comprises, conformément à la loi n°…………… du …. portant loi de finances de la République du Cameroun pour l'exercice …… et au Code Général des Impôts qui définissent les modalités de mise en œuvre du régime fiscal des Marchés Publics.</p>
<p>La fiscalité applicable au présent marché comporte notamment :</p>
<ul>
<li>Des impôts et taxes relatifs aux bénéfices industriels et commerciaux, y compris l'AIR qui constitue un précompte sur l'impôt des sociétés ;</li>
<li>Des droits d'enregistrement calculés conformément aux stipulations du code des impôts ;</li>
<li>Des droits et taxes attachés à la réalisation des prestations prévues par le marché :
  <ul>
  <li>Des droits et taxes d'entrée sur le territoire camerounais (droits de douanes, TVA, taxe informatique) ;</li>
  <li>Des droits et taxes communaux ;</li>
  <li>Des droits et taxes relatifs aux prélèvements des matériaux et d'eau.</li>
  </ul>
</li>
</ul>
<p>Ces éléments doivent être intégrés dans les charges que le cocontractant impute sur ses coûts d'intervention et constituer l'un des éléments des sous-détails des prix hors taxes. Le prix TTC s'entend TVA incluse.</p>
<p>Sauf mention spécifique contraire figurant au Marché, le cocontractant devra supporter et payer tous droits, taxes, impôts et charges lui incombant ainsi qu'à ses sous-traitants.</p>`)

// ===== Articles 43 à 47 =====
const resiliation_marche = ref(`<p>43.1. Le marché est résilié de plein droit dans l'un des cas suivants :</p>
<ul>
<li>Décès du titulaire du marché. Dans ce cas, le Maître d'Ouvrage ou le Maître d'Ouvrage Délégué peut, s'il y a lieu, autoriser que soient acceptées les propositions présentées par les ayants droit pour la continuation des prestations ;</li>
<li>Faillite du titulaire du marché. Dans ce cas, le Maître d'Ouvrage peut accepter, s'il y a lieu, des propositions qui peuvent être présentées par les créanciers pour la continuation des prestations ;</li>
<li>Liquidation judiciaire, si le cocontractant de l'Administration n'est pas autorisé par le tribunal à continuer l'exploitation de son entreprise ;</li>
<li>En cas de sous-traitance, de co-traitance ou de sous-commande sans autorisation préalable du Maître d'Ouvrage ou du Maître d'Ouvrage Délégué ;</li>
<li>Défaillance du cocontractant de l'Administration dûment notifiée à ce dernier par le Maître d'Ouvrage ou le Maître d'Ouvrage Délégué par ordre de service valant mise en demeure et après évaluation et constat de la carence ;</li>
<li>Non-respect de la législation ou de la réglementation du travail ;</li>
<li>Variation importante des prix dans les conditions définies par le cahier des clauses administratives générales, suite à la modification des conditions économiques ou des quantités initiales du marché ;</li>
<li>Manœuvres frauduleuses et corruption dûment constatées.</li>
</ul>
<p>43.2. Le marché peut également être résilié dans les conditions stipulées dans le CCAG, notamment dans l'un des cas suivants :</p>
<ul>
<li>Retard dans les travaux entraînant des pénalités au-delà de 10% du montant du marché TTC ;</li>
<li>Ajournement ou interruption prolongée décidée par le Maître d'Ouvrage ou le Maître d'Ouvrage Délégué ;</li>
<li>Non-paiement persistant des prestations ;</li>
<li>Refus de la reprise des travaux mal exécutés.</li>
</ul>
<p>43.3. Le marché peut également être résilié sans tort des titulaires, notamment dans l'un des cas suivants :</p>
<ul>
<li>Force majeure et après avis de l'Autorité chargée des marchés publics en l'absence de toute responsabilité du cocontractant de l'administration sans préjudice des indemnités auxquelles ce dernier peut prétendre ;</li>
<li>Non-paiement persistant des prestations ;</li>
<li>Motif d'intérêt général.</li>
</ul>`)

const force_majeure = ref(`<p>Le titulaire du marché ne sera pas tenu responsable des retards imputables à un cas de force majeure. Dans un tel cas, le titulaire du marché avertira le Maître d'ouvrage ou le Maître d'ouvrage Délégué par écrit, dans les <i>[préciser nombre de jours]</i> suivant l'apparition du cas de force majeure et il donnera une estimation des retards en résultant. Chaque fois qu'un cas de force majeure provoquera un retard, le titulaire du marché aura droit, si le Maître d'ouvrage le juge réel, à une prorogation des délais.</p>
<p>Aux fins du présent marché, la « force majeure » désigne <i>[Préciser les dispositions du CCAG et certaines situations particulières le cas échéant]</i>.</p>
<p>Les cas de force majeure seront constatés conformément aux dispositions du CCAG. Il appartient au Maître d'Ouvrage d'apprécier le caractère de force majeure et les justificatifs fournis.</p>
<p>Dans le cas où le cocontractant invoquerait le cas de force majeure relevant des conditions météorologiques, les seuils en deçà desquels aucune réclamation ne sera admise sont :</p>
<ul>
<li>Pluie : 200 millimètres en 24 heures ;</li>
<li>Vent : 40 mètres par seconde ;</li>
<li>Crue : la crue de fréquence décennale.</li>
</ul>`)

const differends_litiges = ref(`<p>Les différends ou litiges nés de l'exécution du présent marché peuvent faire l'objet d'un règlement à l'amiable. Lorsqu'aucune solution amiable ne peut être apportée au différend, celui-ci est porté devant la juridiction camerounaise compétente, sous réserve des dispositions suivantes : <i>[à remplir, le cas échéant]</i></p>`)

const edition_marche = ref(`<p>La rédaction ou la mise en forme des documents constitutifs du marché sont assurées par le Maître d'Ouvrage. La reproduction de <i>[vingt (20)]</i> exemplaires du présent marché à faire souscrire par le cocontractant est à la charge du Maître d'Ouvrage.</p>`)

const entree_en_vigueur = ref(`<p>Le présent marché ne deviendra définitif qu'après sa signature par le Maître d'Ouvrage ou le Maître d'Ouvrage Délégué. Il entrera en vigueur dès sa notification au cocontractant de l'administration.</p>`)

onMounted(async () => {
    try {
        isLoading.value = true;
        const responseDAO = await getDAO(dossier)
        dao.value = responseDAO[0];
        const responsePiece = await get_pieces(dossier)
        pieces.value = responsePiece
        const index = pieces.value.findIndex(p => p.piece.nom_composant === current_piece);
        id_piece.value = pieces.value[index].id;

        const responseCCAP = await get_ccap(dossier)
        if (responseCCAP && responseCCAP.length > 0) {
            trouve.value = true
            const c = responseCCAP[0]
            chef_service_marche.value = c.chef_service_marche
            contractant.value = c.contractant
            ing_marche.value = c.ing_marche
            control_externe.value = c.control_externe
            cocontractant.value = c.cocontractant
            maitrise_oeuvre_conception.value = c.maitrise_oeuvre_conception
            maitre_oeuvre_realisation.value = c.maitre_oeuvre_realisation
            assistant_maitrise_ouvrage.value = c.assistant_maitrise_ouvrage
            autorite_ordonnancement.value = c.autorite_ordonnancement
            autorite_liquidation.value = c.autorite_liquidation
            organisme_paiment.value = c.organisme_paiment
            responsable_renseignement.value = c.responsable_renseignement
            pieces_constitutive_marche.value = c.pieces_constitutive_marche
            textes_applicables.value = c.textes_applicables
            communication.value = c.communication
            consistance_phase_conception.value = c.consistance_phase_conception
            consistance_phase_realisation.value = c.consistance_phase_realisation
            delai_execution.value = c.delai_execution
            marche_a_tranche.value = c.marche_a_tranche
            personnel_entreprise.value = c.personnel_entreprise
            replacement_personnel.value = c.replacement_personnel
            programme_travaux.value = c.programme_travaux
            projet_execution.value = c.projet_execution
            labo_chantier.value = c.labo_chantier
            reunion_chantier.value = c.reunion_chantier
            utilisation_explosifs.value = c.utilisation_explosifs
            commission_suivi_recette_conception.value = c.commission_suivi_recette_conception
            operation_prealable_reception.value = c.operation_prealable_reception
            reception_provisoire.value = c.reception_provisoire
            commission_reception.value = c.commission_reception
            reception_partielle.value = c.reception_partielle
            documente_a_fournir.value = c.documente_a_fournir
            delai_garantie.value = c.delai_garantie
            periode_garantie.value = c.periode_garantie
            reception_definitive.value = c.reception_definitive
            montant_marche.value = c.montant_marche
            cautionnement_definitif.value = c.cautionnement_definitif
            cautionnement_garantie.value = c.cautionnement_garantie
            cautionnement_avance_demarrage.value = c.cautionnement_avance_demarrage
            variation_prix.value = c.variation_prix
            revision_prix.value = c.revision_prix
            actualisation_prix.value = c.actualisation_prix
            travaux_regie.value = c.travaux_regie
            valorisation_approvisionnement.value = c.valorisation_approvisionnement
            avances.value = c.avances
            decompte_provisoir.value = c.decompte_provisoir
            decompte_final.value = c.decompte_final
            decompte_defintif.value = c.decompte_defintif
            reglement_groupement.value = c.reglement_groupement
            regime_fiscal.value = c.regime_fiscal
            resiliation_marche.value = c.resiliation_marche
            force_majeure.value = c.force_majeure
            differends_litiges.value = c.differends_litiges
            edition_marche.value = c.edition_marche
            entree_en_vigueur.value = c.entree_en_vigueur
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
        const ccapData = {
            chef_service_marche: chef_service_marche.value,
            contractant: contractant.value,
            ing_marche: ing_marche.value,
            control_externe: control_externe.value,
            cocontractant: cocontractant.value,
            maitrise_oeuvre_conception: maitrise_oeuvre_conception.value,
            maitre_oeuvre_realisation: maitre_oeuvre_realisation.value,
            assistant_maitrise_ouvrage: assistant_maitrise_ouvrage.value,
            autorite_ordonnancement: autorite_ordonnancement.value,
            autorite_liquidation: autorite_liquidation.value,
            organisme_paiment: organisme_paiment.value,
            responsable_renseignement: responsable_renseignement.value,
            pieces_constitutive_marche: pieces_constitutive_marche.value,
            textes_applicables: textes_applicables.value,
            communication: communication.value,
            consistance_phase_conception: consistance_phase_conception.value,
            consistance_phase_realisation: consistance_phase_realisation.value,
            delai_execution: delai_execution.value,
            marche_a_tranche: marche_a_tranche.value,
            personnel_entreprise: personnel_entreprise.value,
            replacement_personnel: replacement_personnel.value,
            programme_travaux: programme_travaux.value,
            projet_execution: projet_execution.value,
            labo_chantier: labo_chantier.value,
            reunion_chantier: reunion_chantier.value,
            utilisation_explosifs: utilisation_explosifs.value,
            commission_suivi_recette_conception: commission_suivi_recette_conception.value,
            operation_prealable_reception: operation_prealable_reception.value,
            reception_provisoire: reception_provisoire.value,
            commission_reception: commission_reception.value,
            reception_partielle: reception_partielle.value,
            documente_a_fournir: documente_a_fournir.value,
            delai_garantie: delai_garantie.value,
            periode_garantie: periode_garantie.value,
            reception_definitive: reception_definitive.value,
            montant_marche: montant_marche.value,
            cautionnement_definitif: cautionnement_definitif.value,
            cautionnement_garantie: cautionnement_garantie.value,
            cautionnement_avance_demarrage: cautionnement_avance_demarrage.value,
            variation_prix: variation_prix.value,
            revision_prix: revision_prix.value,
            actualisation_prix: actualisation_prix.value,
            travaux_regie: travaux_regie.value,
            valorisation_approvisionnement: valorisation_approvisionnement.value,
            avances: avances.value,
            decompte_provisoir: decompte_provisoir.value,
            decompte_final: decompte_final.value,
            decompte_defintif: decompte_defintif.value,
            reglement_groupement: reglement_groupement.value,
            regime_fiscal: regime_fiscal.value,
            resiliation_marche: resiliation_marche.value,
            force_majeure: force_majeure.value,
            differends_litiges: differends_litiges.value,
            edition_marche: edition_marche.value,
            entree_en_vigueur: entree_en_vigueur.value,
        };

        if (trouve.value) {
            const response = await update_ccap(dossier, ccapData)
            message.value = response.message
        } else {
            const response = await create_ccap(dossier, ccapData)
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
