<template>
    <Loader v-if="isLoading" />
    <div v-else>
        <HeaderPiece numero_piece="5" :numero_dossier="dao.numero_appel_offre" :moe="dao.maitre_ouvrage" :description_travaux="dao.objet_appel"/>

        <PieceNavigator :project-id="dao.id" :current-piece-name="$route.name" />

        <div class="form-container">
            <form @submit.prevent="handleSubmit" style="padding-left:10px;">
                <ErrorSummary
                    :errors="errors"
                    :general-error="generalError"
                    :field-meta="fieldMeta"
                    @jump-to-step="(step) => stepperRef?.goToStep(step)"
                />

                <StepperForm ref="stepperRef" :totalSteps="4" :step-errors="stepErrors" v-slot="{ currentStep, nextStep, prevStep, isLastStep }">
                    <h4 class="my-4 text-center text-uppercase">Termes de référence</h4>

                    <div v-if="currentStep === 0">
                        <h5 class="fw-bold mb-2">I. Contexte et justification</h5>
                        <p class="text-muted" style="font-size: 0.9em;">Décrivez le contexte général du projet : la situation actuelle, les besoins identifiés, les enjeux techniques, socio-économiques et environnementaux qui justifient le lancement de cet appel d'offres, ainsi que les études ou décisions antérieures ayant conduit à ce projet.</p>
                        <RichTextarea v-model="contexte_justification" :error="errors.contexte_justification"/>
                    </div>

                    <div v-else-if="currentStep === 1">
                        <h5 class="fw-bold mb-2">II. Objectif de la conception</h5>
                        <p class="text-muted" style="font-size: 0.9em;">Précisez l'objectif global de la mission de conception : ce que le Maître d'Ouvrage attend du concours (fonctionnalité, performance, capacité, intégration dans le site...), ainsi que les objectifs spécifiques que devra atteindre la proposition artistique et technique.</p>
                        <RichTextarea v-model="objectif_conception" :error="errors.objectif_conception"/>
                    </div>

                    <div v-else-if="currentStep === 2">
                        <h5 class="fw-bold mb-2">III. Résultats attendus (propositions artistique et technique)</h5>
                        <p class="text-muted" style="font-size: 0.9em;">Listez les livrables attendus des soumissionnaires pour chaque proposition (documents graphiques, plans, notes explicatives, Avant-Projet Sommaire, méthodologie, calendrier...) en précisant le niveau de détail requis pour chacun.</p>
                        <RichTextarea v-model="resultats_attendus" :error="errors.resultats_attendus"/>
                    </div>

                    <div v-else-if="currentStep === 3">
                        <h5 class="fw-bold mb-2">IV. Qualification des consultants</h5>
                        <p class="text-muted" style="font-size: 0.9em;">Indiquez les qualifications, expériences et compétences requises pour l'équipe du soumissionnaire (architecte, ingénieurs, spécialités techniques...), ainsi que les références de projets similaires exigées.</p>
                        <RichTextarea v-model="qualification_consultants" :error="errors.qualification_consultants"/>
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
import { ref, computed, nextTick, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Loader from '@/components/Loader.vue';
import HeaderPiece from '@/components/HeaderPiece.vue'
import StepperForm from '@/components/StepperForm.vue'
import PieceNavigator from '@/components/PieceNavigator.vue';
import RichTextarea from '@/components/RichTextarea.vue';
import ErrorSummary from '@/components/ErrorSummary.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useAppelOffre } from '@/composables/useAppelOffre';
import { usePiece } from '@/composables/usePiece';
import { useConceptionRealisation } from '@/composables/useConceptionRealisation';
import { useFormErrors } from '@/composables/useFormErrors';

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
const { get_pieces, update_piece } = usePiece()
const { get_tdr, create_tdr, update_tdr } = useConceptionRealisation()
const { errors, generalError, parseErrors, clearErrors } = useFormErrors()

// Associe chaque champ à son step (index 0-based du StepperForm) et à un libellé
// lisible, pour que le résumé d'erreurs puisse afficher/pointer vers le bon step.
const fieldMeta = {
    contexte_justification: { label: 'I. Contexte et justification', step: 0 },
    objectif_conception: { label: 'II. Objectif de la conception', step: 1 },
    resultats_attendus: { label: 'III. Résultats attendus', step: 2 },
    qualification_consultants: { label: 'IV. Qualification des consultants', step: 3 },
}

const stepErrors = computed(() =>
    [0, 1, 2, 3].map((step) =>
        Object.keys(errors.value).some((field) => fieldMeta[field]?.step === step)
    )
)

const contexte_justification = ref('')
const objectif_conception = ref('')
const resultats_attendus = ref('')
const qualification_consultants = ref('')

onMounted(async () => {
    try {
        isLoading.value = true;
        const responseDAO = await getDAO(dossier)
        dao.value = responseDAO[0];
        const responsePiece = await get_pieces(dossier)
        pieces.value = responsePiece
        const index = pieces.value.findIndex(p => p.piece.nom_composant === current_piece);
        id_piece.value = pieces.value[index].id;

        const responseTDR = await get_tdr(dossier)
        if (responseTDR && responseTDR.length > 0) {
            trouve.value = true
            contexte_justification.value = responseTDR[0].contexte_justification
            objectif_conception.value = responseTDR[0].objectif_conception
            resultats_attendus.value = responseTDR[0].resultats_attendus
            qualification_consultants.value = responseTDR[0].qualification_consultants
        }
    } catch (error) {
        console.error("Erreur lors de la récupération du DAO :", error)
    } finally {
        isLoading.value = false;
    }
})

const handleSubmit = async () => {
    clearErrors()
    isLoading.value = true;
    try {
        const tdrData = {
            contexte_justification: contexte_justification.value,
            objectif_conception: objectif_conception.value,
            resultats_attendus: resultats_attendus.value,
            qualification_consultants: qualification_consultants.value,
        };

        if (trouve.value) {
            const response = await update_tdr(dossier, tdrData)
            message.value = response.message
        } else {
            const response = await create_tdr(dossier, tdrData)
            await update_piece(id_piece.value, true);
            message.value = response.message
        }

        toast.success(message, { theme: 'colored', autoClose: 2000 });
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
    } finally {
        isLoading.value = false;
    }
}
</script>
