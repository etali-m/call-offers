<template>
    <Loader v-if="isLoading" />
    <div v-else>
        <HeaderPiece numero_piece="4" :numero_dossier="dao.numero_appel_offre" :moe="dao.maitre_ouvrage" :description_travaux="dao.objet_appel"/>

        <PieceNavigator :project-id="dao.id" :current-piece-name="$route.name" />

        <div class="form-container">
            <form @submit.prevent="handleSubmit" style="padding-left:10px;">
                <StepperForm :totalSteps="10" v-slot="{ currentStep, nextStep, prevStep, isLastStep }">

                <div v-if="currentStep === 0">
                    <h5 class="fw-bold mb-3">Intervenants</h5>
                    <div class="row">
                        <div class="col-md-6 mt-2"><label class="label-custom">Chef de service du marché</label><input class="input-custom" v-model="chef_service_marche"></div>
                        <div class="col-md-6 mt-2"><label class="label-custom">Contractant</label><input class="input-custom" v-model="contractant"></div>
                        <div class="col-md-6 mt-2"><label class="label-custom">Ingénieur du marché</label><input class="input-custom" v-model="ing_marche"></div>
                        <div class="col-md-6 mt-2"><label class="label-custom">Contrôle externe</label><input class="input-custom" v-model="control_externe"></div>
                        <div class="col-md-6 mt-2"><label class="label-custom">Cocontractant</label><input class="input-custom" v-model="cocontractant"></div>
                        <div class="col-md-6 mt-2"><label class="label-custom">Autorité d'ordonnancement</label><input class="input-custom" v-model="autorite_ordonnancement"></div>
                        <div class="col-md-6 mt-2"><label class="label-custom">Autorité de liquidation</label><input class="input-custom" v-model="autorite_liquidation"></div>
                        <div class="col-md-6 mt-2"><label class="label-custom">Organisme payeur</label><input class="input-custom" v-model="organisme_paiment"></div>
                        <div class="col-md-6 mt-2"><label class="label-custom">Responsable des renseignements</label><input class="input-custom" v-model="responsable_renseignement"></div>
                    </div>
                </div>

                <div v-else-if="currentStep === 1">
                    <h5 class="fw-bold mb-3">Maîtrise d'œuvre (bi-phase)</h5>
                    <div class="mt-3"><h6 class="fw-bold">Maîtrise d'œuvre de la phase conception</h6><RichTextarea v-model="maitrise_oeuvre_conception"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Maître d'œuvre de la phase réalisation</h6><RichTextarea v-model="maitre_oeuvre_realisation"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Assistant à maîtrise d'ouvrage</h6><RichTextarea v-model="assistant_maitrise_ouvrage"/></div>
                </div>

                <div v-else-if="currentStep === 2">
                    <h5 class="fw-bold mb-3">Consistance et montants par phase</h5>
                    <div class="mt-3"><h6 class="fw-bold">Consistance de la phase conception</h6><RichTextarea v-model="consistance_phase_conception"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Consistance de la phase réalisation</h6><RichTextarea v-model="consistance_phase_realisation"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Montant de la phase 1 (conception)</h6><RichTextarea v-model="montant_phase1"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Montant de la phase 2 (réalisation)</h6><RichTextarea v-model="montant_phase2"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Commission de suivi et de recette de la conception</h6><RichTextarea v-model="commission_suivi_recette_conception"/></div>
                </div>

                <div v-else-if="currentStep === 3">
                    <div class="mt-3"><h6 class="fw-bold">Pièces constitutives du marché</h6><RichTextarea v-model="pieces_constitutive_marche"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Textes applicables</h6><RichTextarea v-model="textes_applicables"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Communication</h6><RichTextarea v-model="communication"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Délai d'exécution</h6><RichTextarea v-model="delai_execution"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Marché à tranches</h6><RichTextarea v-model="marche_a_tranche"/></div>
                </div>

                <div v-else-if="currentStep === 4">
                    <div class="mt-3"><h6 class="fw-bold">Personnel de l'entreprise</h6><RichTextarea v-model="personnel_entreprise"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Remplacement du personnel</h6><RichTextarea v-model="replacement_personnel"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Programme des travaux</h6><RichTextarea v-model="programme_travaux"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Projet d'exécution</h6><RichTextarea v-model="projet_execution"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Laboratoire de chantier</h6><RichTextarea v-model="labo_chantier"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Réunion de chantier</h6><RichTextarea v-model="reunion_chantier"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Utilisation d'explosifs</h6><RichTextarea v-model="utilisation_explosifs"/></div>
                </div>

                <div v-else-if="currentStep === 5">
                    <div class="mt-3"><h6 class="fw-bold">Opérations préalables à la réception</h6><RichTextarea v-model="operation_prealable_reception"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Commission de réception</h6><RichTextarea v-model="commission_reception"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Réception partielle</h6><RichTextarea v-model="reception_partielle"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Période de garantie</h6><RichTextarea v-model="periode_garantie"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Documents à fournir</h6><RichTextarea v-model="documente_a_fournir"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Délai de garantie</h6><RichTextarea v-model="delai_garantie"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Réception définitive</h6><RichTextarea v-model="reception_definitive"/></div>
                </div>

                <div v-else-if="currentStep === 6">
                    <div class="mt-3"><h6 class="fw-bold">Cautionnement définitif</h6><RichTextarea v-model="cautionnement_definitif"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Cautionnement de garantie</h6><RichTextarea v-model="cautionnement_garantie"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Cautionnement d'avance de démarrage</h6><RichTextarea v-model="cautionnement_avance_demarrage"/></div>
                </div>

                <div v-else-if="currentStep === 7">
                    <div class="mt-3"><h6 class="fw-bold">Variation des prix</h6><RichTextarea v-model="variation_prix"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Révision des prix</h6><RichTextarea v-model="revision_prix"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Actualisation des prix</h6><RichTextarea v-model="actualisation_prix"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Travaux en régie</h6><RichTextarea v-model="travaux_regie"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Valorisation des approvisionnements</h6><RichTextarea v-model="valorisation_approvisionnement"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Avances</h6><RichTextarea v-model="avances"/></div>
                </div>

                <div v-else-if="currentStep === 8">
                    <div class="mt-3"><h6 class="fw-bold">Décompte provisoire</h6><RichTextarea v-model="decompte_provisoir"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Décompte final</h6><RichTextarea v-model="decompte_final"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Décompte définitif</h6><RichTextarea v-model="decompte_defintif"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Règlement des groupements</h6><RichTextarea v-model="reglement_groupement"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Régime fiscal</h6><RichTextarea v-model="regime_fiscal"/></div>
                </div>

                <div v-else-if="currentStep === 9">
                    <div class="mt-3"><h6 class="fw-bold">Résiliation du marché</h6><RichTextarea v-model="resiliation_marche"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Force majeure</h6><RichTextarea v-model="force_majeure"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Différends et litiges</h6><RichTextarea v-model="differends_litiges"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Édition du marché</h6><RichTextarea v-model="edition_marche"/></div>
                    <div class="mt-3"><h6 class="fw-bold">Entrée en vigueur</h6><RichTextarea v-model="entree_en_vigueur"/></div>
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

<script>
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

const FIELD_NAMES = [
    'chef_service_marche', 'contractant', 'ing_marche', 'control_externe', 'cocontractant',
    'autorite_ordonnancement', 'autorite_liquidation', 'organisme_paiment', 'responsable_renseignement',
    'maitrise_oeuvre_conception', 'maitre_oeuvre_realisation', 'assistant_maitrise_ouvrage',
    'consistance_phase_conception', 'consistance_phase_realisation', 'montant_phase1', 'montant_phase2',
    'commission_suivi_recette_conception',
    'pieces_constitutive_marche', 'textes_applicables', 'communication', 'delai_execution', 'marche_a_tranche',
    'personnel_entreprise', 'replacement_personnel', 'programme_travaux', 'projet_execution',
    'labo_chantier', 'reunion_chantier', 'utilisation_explosifs',
    'operation_prealable_reception', 'commission_reception', 'reception_partielle', 'periode_garantie',
    'documente_a_fournir', 'delai_garantie', 'reception_definitive',
    'cautionnement_definitif', 'cautionnement_garantie', 'cautionnement_avance_demarrage',
    'variation_prix', 'revision_prix', 'actualisation_prix', 'travaux_regie', 'valorisation_approvisionnement', 'avances',
    'decompte_provisoir', 'decompte_final', 'decompte_defintif', 'reglement_groupement', 'regime_fiscal',
    'resiliation_marche', 'force_majeure', 'differends_litiges', 'edition_marche', 'entree_en_vigueur',
]

export default {
    components: { HeaderPiece, StepperForm, RichTextarea, PieceNavigator, Loader },

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
        const errors = ref({});

        const { getDAO } = useAppelOffre()
        const { get_pieces, update_piece } = usePiece()
        const { get_ccap, create_ccap, update_ccap } = useConceptionRealisation()

        const fields = {}
        FIELD_NAMES.forEach((name) => { fields[name] = ref('') })

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
                    FIELD_NAMES.forEach((name) => { fields[name].value = c[name] })
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
                const ccapData = {}
                FIELD_NAMES.forEach((name) => { ccapData[name] = fields[name].value })

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

        return {
            handleSubmit, dao, pieces, isLoading,
            ...fields,
        }
    }
}
</script>
