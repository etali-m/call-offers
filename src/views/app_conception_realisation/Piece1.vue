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
                <ErrorSummary
                    :errors="errors"
                    :general-error="generalError"
                    :field-meta="fieldMeta"
                    @jump-to-step="(step) => stepperRef?.goToStep(step)"
                />

                <StepperForm ref="stepperRef" :totalSteps="13" :step-errors="stepErrors" v-slot="{ currentStep, nextStep, prevStep, isLastStep }">
                <div v-if="currentStep === 0">
                    <div class="mt-3">
                        <h5 class="fw-bold mb-2">1. Objet de l'appel d'offres</h5>
                        <div class="col-md-12">
                            <RichTextarea v-model="objet_appel" :error="errors.objet_appel"/>
                        </div>
                    </div>

                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">2. Consistance des prestations</h5>
                        <div class="col-md-12">
                            <RichTextarea v-model="consistence_travaux" :error="errors.consistence_travaux"/>
                        </div>
                    </div>

                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">5. Délais d'exécution</h5>
                        <div class="col-md-12">
                            <RichTextarea v-model="delai_previsionnel" :error="errors.delai_previsionnel"/>
                        </div>
                    </div>

                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">3. Allotissement</h5>
                        <div class="col-md-12">
                            <RichTextarea v-model="tranches" :error="errors.tranches"/>
                        </div>
                    </div>
                </div>

                <div v-else-if="currentStep === 1">
                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">4. Coût prévisionnel</h5>
                        <div class="col-md-12">
                            <RichTextarea v-model="cout_previsionnel" :error="errors.cout_previsionnel"/>
                        </div>
                    </div>

                     <div class="mt-3">
                        <h5 class="fw-bold mb-4">6. Participation et origine</h5>
                        <div class="col-md-12">
                            <RichTextarea v-model="participation_origine" :error="errors.participation"/>
                        </div>
                    </div>

                </div>

                <div v-else-if="currentStep === 2">

                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">7. Financement</h5>
                        <div class="col-md-12">
                            <RichTextarea v-model="financement" :error="errors.financement"/>
                        </div>
                    </div>
                </div>

                <div v-else-if="currentStep === 3">
                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">8. Mode de soumission</h5>
                        <div class="col-md-12">
                            <RichTextarea v-model="mode_soumission" :error="errors.mode_soumission"/>
                        </div>
                    </div>

                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">9. Cautionnement provisoire</h5>
                        <div class="col-md-12">
                            <RichTextarea v-model="cautionnement" :error="errors.caution_soumission"/>
                        </div>
                    </div>
                </div>

                <div v-else-if="currentStep === 4">
                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">10. Consultation du Dossier d'Appel d'Offres</h5>
                        <div class="col-md-12">
                            <RichTextarea v-model="consultation" :error="errors.consultation_dossier"/>
                        </div>
                    </div>
                </div>

                <div v-else-if="currentStep === 5">
                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">11. Acquisition du Dossier d'Appel d'Offres</h5>
                        <div class="col-md-12">
                            <RichTextarea v-model="acquisition_dao" :error="errors.acquisition_dao"/>
                        </div>
                    </div>
                </div>

                <div v-else-if="currentStep === 6">
                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">12. Remise des offres</h5>
                        <div class="col-md-12">
                            <RichTextarea v-model="remise_offre" :error="errors.remise_offre"/>
                        </div>
                    </div>
                </div>

                <div v-else-if="currentStep === 7">
                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">13. Recevabilité des offres</h5>
                        <div class="col-md-12">
                            <RichTextarea v-model="recevabilite_plis" :error="errors.recevabilite_plis"/>
                        </div>
                    </div>
                </div>

                <div v-else-if="currentStep === 8">
                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">14. Ouverture des plis</h5>
                        <div class="col-md-12">
                            <RichTextarea v-model="ouverture_plis" :error="errors.ouverture_plis"/>
                        </div>
                    </div>
                </div>

                <div v-else-if="currentStep === 9">
                    <h5 class="fw-bold mb-4">15. Critères d'évaluation</h5>
                    <div class="row">
                        <div class="col-md-12">
                            <h6 class="fw-bold mb-2">15.1 Critères éliminatoires</h6>
                            <div class="col-md-12">
                                <RichTextarea v-model="critere_eliminatoire" :error="errors.critere_eliminatoire"/>
                            </div>
                        </div> <br />
                        <div class="col-md-12 mt-4">
                            <h6 class="fw-bold mb-2">15.2 Critères essentiels</h6>
                            <div class="col-md-12">
                                <RichTextarea v-model="critere_essentiels" :error="errors.critere_essentielles"/>
                            </div>
                        </div>
                        <div class="col-md-12 mt-4">
                            <label class="label-custom">Note artistique minimale requise (sur 100)</label>
                            <input type="number" step="0.01" class="input-custom" :class="{ 'is-invalid': errors.note_artistique_minimale }" v-model="note_artistique_minimale" placeholder="70">
                            <small v-if="errors.note_artistique_minimale" class="text-danger d-block mt-1">{{ errors.note_artistique_minimale }}</small>
                        </div>
                    </div>
                </div>

                <div v-else-if="currentStep === 10">
                    <div class="col-md-12 mt-4">
                        <h5 class="fw-bold mb-4">16. Attribution</h5>
                         <div class="col-md-12">
                            <RichTextarea v-model="attributions" :error="errors.attribution"/>
                        </div>
                    </div>
                </div>

                <div v-else-if="currentStep === 11">
                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">17. Nombre maximum de lots</h5>
                        <div class="col-md-12">
                            <label>Nombre de lots maximum</label>
                            <input type="number" class="input-custom" :class="{ 'is-invalid': errors.nombre_max_lots }" v-model="nombre_lots" placeholder="2">
                            <small v-if="errors.nombre_max_lots" class="text-danger d-block mt-1">{{ errors.nombre_max_lots }}</small>
                        </div>
                    </div>

                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">18. Durée de validité des offres</h5>
                        <div class="col-md-12">
                            <label>Durée d'engagement en jours</label>
                            <input type="number" class="input-custom" :class="{ 'is-invalid': errors.duree_validite }" v-model="duree_engagement" placeholder="90">
                            <small v-if="errors.duree_validite" class="text-danger d-block mt-1">{{ errors.duree_validite }}</small>
                        </div>
                    </div>
                </div>

                <div v-else-if="currentStep === 12">
                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">19. Renseignements complémentaires</h5>
                         <div class="col-md-12">
                            <RichTextarea v-model="renseignements" :error="errors.renseignement_complementaires"/>
                        </div>
                    </div>

                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">20. Lutte contre la corruption et les mauvaises pratiques</h5>
                        <div class="row">
                            <div class="col-md-12">
                                <p>Pour toute dénonciation pour des pratiques, faits ou actes de corruption ou faits de mauvaises pratiques, bien vouloir appeler la CONAC au numéro 1517, l'Autorité chargée des Marchés Publics (MINMAP) (SMS ou appel) aux numéros : (+237) 673 20 57 25 et 699 37 07 48, l'ARMP au numéro</p>
                                <label>Numéro maître d'ouvrage ou maître d'ouvrage délégué</label>
                                <input type="number" class="input-custom" :class="{ 'is-invalid': errors.numero_moa }" v-model="numero_moa" placeholder="678 45 14 35">
                                <small v-if="errors.numero_moa" class="text-danger d-block mt-1">{{ errors.numero_moa }}</small>
                            </div>
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

<script>
import { ref, computed, nextTick, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Loader from '@/components/Loader.vue';
import HeaderPiece from '@/components/HeaderPiece.vue'
import StepperForm from '@/components/StepperForm.vue'
import PieceNavigator from '@/components/PieceNavigator';
import RichTextarea from '@/components/RichTextarea.vue';
import ErrorSummary from '@/components/ErrorSummary.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useAppelOffre } from '@/composables/useAppelOffre';
import { usePiece } from '@/composables/usePiece';
import { useConceptionRealisation } from '@/composables/useConceptionRealisation';
import { useFormErrors } from '@/composables/useFormErrors';

// Associe chaque champ (nom du champ côté API/serializer) à son step (index
// 0-based du StepperForm) et à un libellé lisible, pour le résumé d'erreurs.
const fieldMeta = {
    objet_appel: { label: "1. Objet de l'appel d'offres", step: 0 },
    consistence_travaux: { label: '2. Consistance des prestations', step: 0 },
    delai_previsionnel: { label: "5. Délais d'exécution", step: 0 },
    tranches: { label: '3. Allotissement', step: 0 },
    cout_previsionnel: { label: '4. Coût prévisionnel', step: 1 },
    participation: { label: '6. Participation et origine', step: 1 },
    financement: { label: '7. Financement', step: 2 },
    mode_soumission: { label: '8. Mode de soumission', step: 3 },
    caution_soumission: { label: '9. Cautionnement provisoire', step: 3 },
    consultation_dossier: { label: "10. Consultation du Dossier d'Appel d'Offres", step: 4 },
    acquisition_dao: { label: "11. Acquisition du Dossier d'Appel d'Offres", step: 5 },
    remise_offre: { label: '12. Remise des offres', step: 6 },
    recevabilite_plis: { label: '13. Recevabilité des offres', step: 7 },
    ouverture_plis: { label: '14. Ouverture des plis', step: 8 },
    critere_eliminatoire: { label: '15.1 Critères éliminatoires', step: 9 },
    critere_essentielles: { label: '15.2 Critères essentiels', step: 9 },
    note_artistique_minimale: { label: 'Note artistique minimale requise', step: 9 },
    attribution: { label: '16. Attribution', step: 10 },
    nombre_max_lots: { label: '17. Nombre maximum de lots', step: 11 },
    duree_validite: { label: '18. Durée de validité des offres', step: 11 },
    renseignement_complementaires: { label: '19. Renseignements complémentaires', step: 12 },
    numero_moa: { label: "Numéro maître d'ouvrage ou délégué", step: 12 },
}

export default {
    components: {
        HeaderPiece,
        StepperForm,
        RichTextarea,
        PieceNavigator,
        ErrorSummary,
        Loader
    },

    setup() {
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
        const stepperRef = ref(null)

        const { getDAO } = useAppelOffre()
        const { get_pieces, update_piece } =  usePiece()
        const { get_aao, create_aao, update_aao } = useConceptionRealisation()
        const { errors, generalError, parseErrors, clearErrors } = useFormErrors()

        const stepErrors = computed(() =>
            Array.from({ length: 13 }, (_, step) =>
                Object.keys(errors.value).some((field) => fieldMeta[field]?.step === step)
            )
        )

        const objet_appel = ref('')
        const consistence_travaux = ref('')
        const tranches = ref('')
        const cout_previsionnel = ref('')
        const delai_previsionnel = ref('')
        const participation_origine = ref('')
        const financement = ref('')
        const mode_soumission = ref('')
        const cautionnement = ref('')
        const consultation = ref('')
        const acquisition_dao = ref('')
        const remise_offre = ref('')
        const recevabilite_plis = ref('')
        const ouverture_plis = ref('')
        const critere_eliminatoire = ref('')
        const critere_essentiels = ref('')
        const note_artistique_minimale = ref()
        const attributions = ref('')
        const nombre_lots = ref()
        const duree_engagement = ref()
        const renseignements = ref('')
        const numero_moa = ref()

        onMounted(async () => {
            try {
                isLoading.value = true;
                const responseDAO = await getDAO(dossier)
                dao.value = responseDAO[0];
                const responsePiece = await get_pieces(dossier)
                pieces.value = responsePiece

                const index = pieces.value.findIndex(p => p.piece.nom_composant === current_piece);
                id_piece.value = pieces.value[index].id;

                objet_appel.value = `<p>Dans le cadre de <em>[à préciser]</em>, le ${dao.value.maitre_ouvrage}, lance un Appel d'Offres avec ${dao.value.type_dossier} ${dao.value.mode_passation} pour ${dao.value.objet_appel}.</p>`;
                consistence_travaux.value = `<p><em>[Le concours est organisé sur la base d'un programme établi par le Maître d'Ouvrage ou le Maître d'Ouvrage Délégué qui indique dans le Règlement Particulier de l'Appel d'Offres, les besoins auxquels doit répondre la prestation.]</em></p>`;
                tranches.value = `<p>Les prestations sont subdivisées en <em>[…………]</em> lots ci-après définis :</p>`;
                cout_previsionnel.value = `<p>Le coût prévisionnel est de <em>[……………]</em> (en cas d'allotissement indiquer ce coût pour chaque lot).</p><p><b>NB :</b> Cet Appel d'offres (conception-réalisation) n'est pas assorti de primes.</p>`;
                delai_previsionnel.value = `<p>Le délai maximum prévu pour la réalisation des prestations objet du présent appel d'offres est séquencé selon le programme défini par le Maître d'Ouvrage ou le Maître d'Ouvrage Délégué <em>[Indiquer le délai par lot le cas échéant]</em> mois.</p>`;
                participation_origine.value = `<p>La participation au présent appel d'offres est ouverte à <em>[préciser la qualité et l'origine des prestataires concernés]</em>.</p>`;
                financement.value = `<p>Les travaux objet du présent appel d'offres sont financés par ${dao.value.financement} de l'exercice <em>[……………]</em>. Sur la ligne d'imputation budgétaire n° <em>[……………]</em>.</p>`;
                mode_soumission.value = `<p>Le mode de soumission retenu pour cette consultation est <em>[Indiquer l'un des trois modes de soumission ci-après : en ligne, hors ligne, en ligne ou hors ligne]</em>. Toutefois, lorsque les deux possibilités sont ouvertes, le soumissionnaire ne peut utiliser à la fois le mode en ligne et le mode hors ligne.</p>`;
                cautionnement.value = `<p>Chaque soumissionnaire doit joindre à ses pièces administratives, une caution de soumission établie par une banque de premier ordre agréée par le Ministère chargé des finances et dont la liste figure dans la pièce 17 du DAO, précisant [montant forfaitaire en FCFA pour chaque lot le cas échéant ; il est au plus égal à 2% du coût prévisionnel toutes taxes comprises (TTC) du marché conformément à l’arrêté en vigueur, le Maître d’Ouvrage ou le Maître d’Ouvrage Délégué, les conditions d’appel.] et valable pendant trente (30) jours audelà de la date originale de validité des offres. L’absence de la caution de soumission délivrée par une banque de premier ordre ou un organisme financier de première catégorie autorisé par le Ministère chargé des Finances à émettre des cautions dans le cadre des marchés publics, entraînera le rejet pur et simple de l'offre. Une caution de soumission produite mais n'ayant aucun rapport avec la consultation concernée est considérée comme absente. La caution de soumission présentée par un soumissionnaire au cours de la séance d’ouverture des plis est irrecevable. `;
                consultation.value = `<p>Le dossier physique peut être consulté gratuitement dans les services du MO / MOD aux heures et jours ouvrables à <em>[Lieu de consultation du DAO (service (SIGAMP), numéro de porte, BP, téléphone, fax, e-mail)]</em> dès publication du présent avis.</p><p>Il peut également être consulté en ligne sur la plateforme COLEPS aux adresses http://www.marchespublics.cm et http://www.publiccontracts.cm sur le site internet de l'ARMP (www.armp.cm) ou sur tout autre moyen de communication électronique indiqué par le Maître d'Ouvrage <em>[à préciser]</em>.</p>`;
                acquisition_dao.value = `<p>La version physique du dossier peut être obtenue au <em>[Lieu de retrait du DAO (service (SIGAMP), numéro de porte, BP, téléphone, fax, e-mail)]</em> dès publication du présent avis, contre présentation d'une quittance de versement ou toute autre preuve (prévue par le Maître d'Ouvrage) de versement d'une somme non remboursable de <em>[……………]</em> Francs CFA <em>[en chiffres et en lettres conformément à la règlementation en vigueur]</em>, payable à <em>[Lieu de paiement des frais d'achat du DAO au Trésor Public pour les Administrations publiques et dans le Compte spécial CAS-ARMP pour les autres Maîtres d'Ouvrage, sauf dérogation expresse]</em>.</p><p>Il est également possible d'obtenir la version électronique du dossier par téléchargement gratuit aux adresses sus indiquées. Toutefois, la soumission par voie physique ou électronique est conditionnée par le paiement des frais d'achat du DAO.</p>`;

                remise_offre.value = `<p>Pour la soumission hors ligne, l'offre en sept (07) exemplaires dont un (01) original et six (06) copies marqués comme tels, devra parvenir <em>[Lieu d'enregistrement des offres]</em>, au plus tard le <em>[Date limite de réception des offres]</em> à <em>[Heure limite]</em> et devra porter la mention :</p><p style="text-align:center;"><b>« ${dao.value.titre_complet} »</b><br />A n'ouvrir qu'en séance de dépouillement</p><p>Pour la soumission en ligne, l'offre devra être transmise par le soumissionnaire sur la plateforme COLEPS ou tout autre moyen de communication électronique officiel à préciser par le Maître d'Ouvrage au plus tard le <em>[date limite de réception des offres]</em> à <em>[Heure limite]</em>. Une copie de sauvegarde de l'offre enregistrée sur clé USB ou CD/DVD devra être transmise sous pli scellé avec l'indication claire et lisible « copie de sauvegarde », en plus de la mention ci-dessus dans les délais impartis.</p> <br />
                <strong>NB : </strong> Taille et format de fichiers<br />
                Pour la soumission en ligne, les tailles maximales des documents qui vont transiter sur la plateforme et constituant l’offre du soumissionnaire sont les suivantes :  
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
                Le candidat veillera à utiliser des logiciels de compression afin de réduire éventuellement la taille des fichiers à transmettre conformément aux tailles sus-indiquées.
                `;

                recevabilite_plis.value = `<p>Les pièces administratives, l'offre technique et l'offre financière doivent être placées dans des enveloppes différentes séparées et remises sous pli scellé.</p><p>Seront irrecevables par le Maître d'Ouvrage :</p><ul><li>Les plis portant les indications sur l'identité du soumissionnaire ;</li><li>Les plis parvenus postérieurement aux dates et heures limites de dépôt ;</li><li>Les plis non-conformes au mode de soumission ;</li><li>Les plis sans indication de l'identité de l'Appel d'Offres ;</li><li>Le non-respect du nombre d'exemplaires indiqué dans le RPAO ou offre uniquement en copies.</li></ul><p>Toute offre incomplète conformément aux prescriptions du Dossier d'Appel d'Offres sera déclarée irrecevable. Notamment l'absence de la caution de soumission délivrée par un organisme ou une institution financière agréée par le Ministre en charge des finances pour émettre les cautions dans le domaine des marchés publics ou le non-respect des modèles des pièces du Dossier d'Appel d'Offres, entraînera le rejet pur et simple de l'offre sans aucun recours. Une caution de soumission produite mais n'ayant aucun rapport avec la consultation concernée est considérée comme absente. La caution de soumission présentée par un soumissionnaire au cours de la séance d'ouverture des plis est irrecevable.</p>`;

                ouverture_plis.value = `<p>L'ouverture des plis se fera en deux (02) temps.</p><p>Dans un premier temps les enveloppes contenant les pièces administratives et les propositions artistiques seront ouvertes par la commission de passation de marché le <em>[……………]</em> à <em>[……………]</em> heures, dans la salle de <em>[……………]</em> sise à <em>[……………]</em>.</p><p>Dans un deuxième temps seules les propositions techniques comprenant le coût estimatif du projet, les références du soumissionnaire et le coût global du projet des soumissionnaires ayant atteint la note minimale requise pour le concours proprement dit sont ouvertes en présence des soumissionnaires concernés.</p> <br />
                <strong>NB : </strong>  à l’issue de la séance de dépouillement des dossiers administratifs et des offres techniques, l’enveloppe scellée contenant l’offre financière témoin, est paraphée et cachetée par le Président de la CIPM et remise au collecteur désigné à cet effet pour dépôt à l’organisme en charge de la régulation des marchés publics. <br /><br />
                <p style="text-align:center;font-weight:bold">
                Sous peine de rejet, les pièces du dossier administratif requises doivent être produites en originaux ou en copies certifiées conformes par le service émetteur ou l’autorité administrative compétente,  conformément aux stipulations du Règlement Particulier de l’Appel d’Offres. Elles doivent dater de moins de trois (03) mois à compter de la date originelle de dépôt des offres ou avoir été établies postérieurement à la date de signature de l’avis d’appel d’offres.  
                </p>
                <p>
                    En cas d’absence ou de non-conformité d’une pièce du dossier administratif lors de l’ouverture des plis, après un délai de quarante-huit heures accordé aux soumissionnaires concernés pour produire ou remplacer la pièce en question, l'offre sera rejetée. 
                </p>
                `;

                critere_eliminatoire.value = `<p><em>[Les critères éliminatoires fixent les conditions minimales à remplir pour être admis à l'évaluation selon les critères essentiels. Ils ne doivent pas faire l'objet de notation. Le non-respect de ces critères entraîne le rejet de l'offre du soumissionnaire.]</em></p><p>Il s'agit notamment :</p><ul><li>A. L'absence du cautionnement de soumission à l'ouverture des plis ;</li><li>B. La non-production, au-delà du délai de 48h après l'ouverture des plis, d'une pièce du dossier administratif jugée non conforme ou absente ;</li><li>C. Des fausses déclarations, manœuvres frauduleuses ou des pièces falsifiées ;</li><li>D. La non-conformité de l'offre (absence d'un ou de plusieurs éléments constitutifs des volumes 2, 3 et 4) ;</li><li>E. La non-obtention de la note Artistique Minimale requise ;</li><li>F. L'absence de la déclaration sur l'honneur de non abandon des chantiers au cours des trois dernières années ;</li><li>G. Le non-respect du format de fichier des offres (en cas de soumission par voie électronique).</li></ul>`;

                critere_essentiels.value = `<p><em>[Ces critères doivent être détaillés par des sous-critères au niveau du RPAO. Les critères essentiels à la qualification des soumissionnaires porteront sur les propositions artistique et technique.]</em></p><p><b>Pour l'évaluation de la Proposition artistique :</b></p><ul><li>A. L'Avant-Projet Sommaire (APS) : mémoires explicatifs et descriptifs, dossier de pièces graphiques, méthodologie ;</li><li>B. Les preuves d'acceptation des conditions du marché (CCAP, Termes de Référence) ;</li><li>C. Un descriptif de la méthodologie et du plan de travail proposé (Tableau 12D) ;</li><li>D. La composition par spécialités de l'équipe proposée (Tableau 12E) ;</li><li>E. La liste complète et détaillée des études à mener durant la phase de conception.</li></ul><p><b>Pour l'évaluation de la Proposition technique :</b></p><ul><li>A. Les références du soumissionnaire dans les domaines des études, de la réalisation des travaux et de la conception-réalisation ;</li><li>B. Les qualifications et l'expérience du personnel (Chef de Projet, personnel clé études et travaux) ;</li><li>C. La justification de la disponibilité du matériel proposé ;</li><li>D. Le respect des délais et la cohérence avec la mobilisation du personnel clé ;</li><li>E. La capacité financière pour couvrir le coût Global du Projet ou le montant déterminé par le MO/MOD (l’accès à une ligne de crédit ou autres ressources financières, le chiffre d’affaires, attestation de solvabilité financière).</li></ul>`;

                attributions.value = `<p>Le Maître d'Ouvrage ou le Maître d'Ouvrage Délégué attribue le marché au soumissionnaire ayant présenté une offre conforme pour l'essentiel au DAO et évaluée la mieux-disante, par combinaison des critères techniques, financiers et esthétiques, c'est-à-dire à celui ayant obtenu la Note Générale la plus élevée.</p> <br /> Un candidat peut soumissionner pour un ou plusieurs lots, mais ne peut être attributaire de plus de <em>[_____________]</em>  lots. Au cas où un soumissionnaire serait le moins disant pour plus de   <em>[_____________]</em>  lots, le Maître d’Ouvrage ou le Maître d’Ouvrage Délégué lui attribuera les <em>[_____________]</em> lots selon les conditions prévues dans le RPAO.`;

                renseignements.value = `<p>Les renseignements complémentaires peuvent être obtenus aux heures ouvrables à <em>[service (SIGAMP), numéro de porte, BP, téléphone, fax, e-mail]</em> ou en ligne sur la plateforme COLEPS aux adresses http://www.marchespublics.cm et http://www.publiccontracts.cm, ou tout autre moyen de communication électronique indiqué par le Maître d'Ouvrage.</p>`;

                const responseAAO = await get_aao(dossier)
                if(responseAAO && responseAAO.length > 0){
                    trouve.value = true
                    objet_appel.value = responseAAO[0].objet_appel;
                    consistence_travaux.value = responseAAO[0].consistence_travaux;
                    tranches.value = responseAAO[0].tranches;
                    cout_previsionnel.value = responseAAO[0].cout_previsionnel;
                    delai_previsionnel.value = responseAAO[0].delai_previsionnel;
                    participation_origine.value = responseAAO[0].participation;
                    financement.value = responseAAO[0].financement;
                    mode_soumission.value = responseAAO[0].mode_soumission;
                    cautionnement.value = responseAAO[0].caution_soumission;
                    consultation.value = responseAAO[0].consultation_dossier;
                    acquisition_dao.value = responseAAO[0].acquisition_dao;
                    remise_offre.value = responseAAO[0].remise_offre;
                    recevabilite_plis.value = responseAAO[0].recevabilite_plis;
                    ouverture_plis.value = responseAAO[0].ouverture_plis;
                    critere_eliminatoire.value = responseAAO[0].critere_eliminatoire;
                    critere_essentiels.value = responseAAO[0].critere_essentielles;
                    note_artistique_minimale.value = responseAAO[0].note_artistique_minimale;
                    attributions.value = responseAAO[0].attribution;
                    nombre_lots.value = responseAAO[0].nombre_max_lots;
                    duree_engagement.value = responseAAO[0].duree_validite;
                    renseignements.value = responseAAO[0].renseignement_complementaires;
                    numero_moa.value = responseAAO[0].numero_moa;
                }

            } catch (error) {
                console.error("Erreur lors de la récupération du DAO :", error)
            } finally{
                isLoading.value = false;
            }
        })

        const handleSubmit = async () => {
            clearErrors()
            isLoading.value = true;

            try {
                const aaoData = {
                    objet_appel: objet_appel.value,
                    consistence_travaux: consistence_travaux.value,
                    tranches: tranches.value,
                    cout_previsionnel: cout_previsionnel.value,
                    delai_previsionnel: delai_previsionnel.value,
                    participation: participation_origine.value,
                    financement: financement.value,
                    mode_soumission: mode_soumission.value,
                    caution_soumission: cautionnement.value,
                    consultation_dossier: consultation.value,
                    acquisition_dao: acquisition_dao.value,
                    remise_offre: remise_offre.value,
                    recevabilite_plis: recevabilite_plis.value,
                    ouverture_plis: ouverture_plis.value,
                    critere_eliminatoire: critere_eliminatoire.value,
                    critere_essentielles: critere_essentiels.value,
                    note_artistique_minimale: note_artistique_minimale.value || null,
                    attribution: attributions.value,
                    nombre_max_lots: nombre_lots.value,
                    duree_validite: duree_engagement.value,
                    renseignement_complementaires: renseignements.value,
                    numero_moa: numero_moa.value,
                };

                if(trouve.value){
                    const response = await update_aao(dossier, aaoData)
                    message.value = response.message
                }else {
                    const response = await create_aao(dossier, aaoData)
                    const update = await update_piece(id_piece.value, true);
                    message.value = response.message
                }

                toast.success(message, {
                    theme: 'colored',
                    autoClose: 2000,
                });

            } catch (err) {
                parseErrors(err)
                // isLoading conditionne le v-if/v-else qui monte le StepperForm : il faut
                // le repasser à false et attendre le prochain tick avant de pouvoir lui
                // demander de sauter à un step, sinon stepperRef pointe vers une instance
                // pas encore (re)montée et l'appel ne fait rien.
                isLoading.value = false;
                await nextTick()
                const firstErrorField = Object.keys(errors.value)[0]
                if (firstErrorField && fieldMeta[firstErrorField]) {
                    stepperRef.value?.goToStep(fieldMeta[firstErrorField].step)
                }
                toast.error(
                    Object.keys(errors.value).length
                        ? 'Veuillez corriger les erreurs indiquées dans le formulaire'
                        : generalError.value,
                    { theme: 'colored', autoClose: 3000 }
                );
            }finally {
                isLoading.value = false;
            }
        }

        return {
            handleSubmit,
            dao,
            pieces,
            isLoading,
            errors,
            generalError,
            fieldMeta,
            stepErrors,
            stepperRef,
            objet_appel,
            consistence_travaux,
            tranches,
            cout_previsionnel,
            delai_previsionnel,
            participation_origine,
            financement,
            mode_soumission,
            cautionnement,
            consultation,
            acquisition_dao,
            remise_offre,
            recevabilite_plis,
            ouverture_plis,
            critere_eliminatoire,
            critere_essentiels,
            note_artistique_minimale,
            attributions,
            nombre_lots,
            duree_engagement,
            renseignements,
            numero_moa
        }
    }
}
</script>
