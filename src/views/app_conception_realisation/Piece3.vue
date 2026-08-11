<template>
    <Loader v-if="isLoading" />
    <div v-else>
        <HeaderPiece numero_piece="3" :numero_dossier="dao.numero_appel_offre" :moe="dao.maitre_ouvrage" :description_travaux="dao.objet_appel"/>

        <PieceNavigator :project-id="dao.id" :current-piece-name="$route.name" />

        <div class="form-container">
            <form @submit.prevent="handleSubmit" style="padding-left:10px;">
                <StepperForm :totalSteps="9" v-slot="{ currentStep, nextStep, prevStep, isLastStep }">

                <div v-if="currentStep === 0">
                    <div class="mt-3"><h5 class="fw-bold mb-2">Descriptif de l'opération</h5><RichTextarea v-model="descriptif_operation"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-2">Lieu d'exécution</h5><RichTextarea v-model="lieu_execution"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-2">Objectifs de la mission</h5><RichTextarea v-model="objectifs_mission"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-2">Source de financement</h5><RichTextarea v-model="source_financement_rpao"/></div>
                </div>

                <div v-else-if="currentStep === 1">
                    <div class="mt-3"><h5 class="fw-bold mb-2">Délai phase conception</h5><RichTextarea v-model="delai_phase_conception"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-2">Délai phase réalisation</h5><RichTextarea v-model="delai_phase_realisation"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-2">Délai global</h5><RichTextarea v-model="delai_global"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-2">Coût global prévisionnel</h5><RichTextarea v-model="cout_global_previsionnel"/></div>
                </div>

                <div v-else-if="currentStep === 2">
                    <div class="mt-3"><h5 class="fw-bold mb-2">Provenance des matériaux</h5><RichTextarea v-model="provenance_materiaux"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-2">Visite des lieux</h5><RichTextarea v-model="visite_travaux"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-2">Renseignements nécessaires</h5><RichTextarea v-model="renseignements_necessaires"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-2">Renseignements complémentaires</h5><RichTextarea v-model="renseignements_complementaires"/></div>
                </div>

                <div v-else-if="currentStep === 3">
                    <div class="mt-3"><h5 class="fw-bold mb-2">Langue de soumission</h5><RichTextarea v-model="langue_soumission"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-2">Pièces administratives (candidats locaux)</h5><RichTextarea v-model="piecesAdminLocales"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-2">Pièces administratives (candidats étrangers)</h5><RichTextarea v-model="piecesAdminEtrangeres"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-2">Références du soumissionnaire</h5><RichTextarea v-model="refSoumissionnaire"/></div>
                </div>

                <div v-else-if="currentStep === 4">
                    <div class="mt-3"><h5 class="fw-bold mb-2">Personnel</h5><RichTextarea v-model="personnel"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-2">Matériels</h5><RichTextarea v-model="materiels"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-2">Organisation et méthodologie</h5><RichTextarea v-model="organisation_methodologie"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-2">Avant-Projet Sommaire (APS) attendu</h5><RichTextarea v-model="avant_projet_sommaire"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-2">Liste des études de conception à mener</h5><RichTextarea v-model="liste_etudes_conception"/></div>
                </div>

                <div v-else-if="currentStep === 5">
                    <div class="mt-3"><h5 class="fw-bold mb-2">Coût des études</h5><RichTextarea v-model="cout_etudes"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-2">Coût estimatif du projet</h5><RichTextarea v-model="cout_estimatif_projet"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-2">Coût global du projet</h5><RichTextarea v-model="cout_global_projet"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-2">Preuves d'acceptation des conditions du marché</h5><RichTextarea v-model="preuve_acceptation"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-2">Commentaires sur le CCAP</h5><RichTextarea v-model="commentaire_ccap"/></div>
                </div>

                <div v-else-if="currentStep === 6">
                    <div class="row mt-3">
                        <div class="col-md-4">
                            <label class="label-custom">Nb exemplaires - Dossier admin.</label>
                            <input type="number" class="input-custom" v-model="nombre_exemplaires_dossier_administratif">
                        </div>
                        <div class="col-md-4">
                            <label class="label-custom">Nb exemplaires - Proposition artistique</label>
                            <input type="number" class="input-custom" v-model="nombre_exemplaires_proposition_artistique">
                        </div>
                        <div class="col-md-4">
                            <label class="label-custom">Nb exemplaires - Proposition technique</label>
                            <input type="number" class="input-custom" v-model="nombre_exemplaires_proposition_technique">
                        </div>
                    </div>
                    <div class="mt-3"><h5 class="fw-bold mb-2">Adresse de dépôt des offres</h5><RichTextarea v-model="adresse_depot_offres"/></div>
                </div>

                <div v-else-if="currentStep === 7">
                    <div class="mt-3"><h5 class="fw-bold mb-2">Prix du marché</h5><RichTextarea v-model="prix_marche"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-2">Monnaies de soumission</h5><RichTextarea v-model="monnaies_soumission"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-2">Taux de change</h5><RichTextarea v-model="taux_change"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-2">Monnaie retenue</h5><RichTextarea v-model="monnaie_retenu"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-2">Validité des offres</h5><RichTextarea v-model="validite_offre"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-2">Montant du cautionnement</h5><RichTextarea v-model="montant_cautionnement"/></div>
                    <div class="mt-3">
                        <label class="label-custom">Taux de cautionnement définitif (%)</label>
                        <input type="number" step="0.01" class="input-custom" v-model="taux_cautionnement_definitif_rpao">
                    </div>
                </div>

                <div v-else-if="currentStep === 8">
                    <div class="mt-3"><h5 class="fw-bold mb-2">Variantes techniques</h5><RichTextarea v-model="variante_techniques"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-2">Réunion préparatoire</h5><RichTextarea v-model="reunion_preparatoire"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-2">Soumission en ligne</h5><RichTextarea v-model="soumission_en_ligne"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-2">Mode de soumission</h5><RichTextarea v-model="mode_soumission"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-2">Date et heure limites</h5><RichTextarea v-model="date_heure_limite"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-2">Critères éliminatoires</h5><RichTextarea v-model="criteres_eliminatoires"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-2">Critères essentiels</h5><RichTextarea v-model="criteres_essentiels"/></div>
                    <div class="mt-3"><h5 class="fw-bold mb-2">Mode d'évaluation</h5><RichTextarea v-model="mode_evaluation"/></div>
                    <div class="mt-3 form-check">
                        <input type="checkbox" class="form-check-input" id="formation_element_majeur" v-model="formation_element_majeur">
                        <label class="form-check-label" for="formation_element_majeur">La formation est un élément majeur de la mission</label>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-4">
                            <label class="label-custom">Pondération artistique (%)</label>
                            <input type="number" step="0.01" class="input-custom" v-model="poids_artistique">
                        </div>
                        <div class="col-md-4">
                            <label class="label-custom">Pondération technique (%)</label>
                            <input type="number" step="0.01" class="input-custom" v-model="poids_technique">
                        </div>
                        <div class="col-md-4">
                            <label class="label-custom">Pondération financière (%)</label>
                            <input type="number" step="0.01" class="input-custom" v-model="poids_financiere">
                        </div>
                    </div>
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
        const { get_rpao, create_rpao, update_rpao } = useConceptionRealisation()

        const descriptif_operation = ref('')
        const lieu_execution = ref('')
        const objectifs_mission = ref('')
        const source_financement_rpao = ref('')
        const delai_phase_conception = ref('')
        const delai_phase_realisation = ref('')
        const delai_global = ref('')
        const cout_global_previsionnel = ref('')
        const provenance_materiaux = ref('')
        const visite_travaux = ref('')
        const renseignements_necessaires = ref('')
        const renseignements_complementaires = ref('')
        const langue_soumission = ref('')
        const piecesAdminLocales = ref('')
        const piecesAdminEtrangeres = ref('')
        const refSoumissionnaire = ref('')
        const personnel = ref('')
        const materiels = ref('')
        const organisation_methodologie = ref('')
        const avant_projet_sommaire = ref('')
        const liste_etudes_conception = ref('')
        const cout_etudes = ref('')
        const cout_estimatif_projet = ref('')
        const cout_global_projet = ref('')
        const preuve_acceptation = ref('')
        const commentaire_ccap = ref('')
        const nombre_exemplaires_dossier_administratif = ref()
        const nombre_exemplaires_proposition_artistique = ref()
        const nombre_exemplaires_proposition_technique = ref()
        const adresse_depot_offres = ref('')
        const prix_marche = ref('')
        const monnaies_soumission = ref('')
        const taux_change = ref('')
        const monnaie_retenu = ref('')
        const validite_offre = ref('')
        const montant_cautionnement = ref('')
        const taux_cautionnement_definitif_rpao = ref()
        const variante_techniques = ref('')
        const reunion_preparatoire = ref('')
        const soumission_en_ligne = ref('')
        const mode_soumission = ref('')
        const date_heure_limite = ref('')
        const criteres_eliminatoires = ref('')
        const criteres_essentiels = ref('')
        const mode_evaluation = ref('')
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

                const responseRPAO = await get_rpao(dossier)
                if (responseRPAO && responseRPAO.length > 0) {
                    trouve.value = true
                    const r = responseRPAO[0]
                    descriptif_operation.value = r.descriptif_operation
                    lieu_execution.value = r.lieu_execution
                    objectifs_mission.value = r.objectifs_mission
                    source_financement_rpao.value = r.source_financement_rpao
                    delai_phase_conception.value = r.delai_phase_conception
                    delai_phase_realisation.value = r.delai_phase_realisation
                    delai_global.value = r.delai_global
                    cout_global_previsionnel.value = r.cout_global_previsionnel
                    provenance_materiaux.value = r.provenance_materiaux
                    visite_travaux.value = r.visite_travaux
                    renseignements_necessaires.value = r.renseignements_necessaires
                    renseignements_complementaires.value = r.renseignements_complementaires
                    langue_soumission.value = r.langue_soumission
                    piecesAdminLocales.value = r.piecesAdminLocales
                    piecesAdminEtrangeres.value = r.piecesAdminEtrangeres
                    refSoumissionnaire.value = r.refSoumissionnaire
                    personnel.value = r.personnel
                    materiels.value = r.materiels
                    organisation_methodologie.value = r.organisation_methodologie
                    avant_projet_sommaire.value = r.avant_projet_sommaire
                    liste_etudes_conception.value = r.liste_etudes_conception
                    cout_etudes.value = r.cout_etudes
                    cout_estimatif_projet.value = r.cout_estimatif_projet
                    cout_global_projet.value = r.cout_global_projet
                    preuve_acceptation.value = r.preuve_acceptation
                    commentaire_ccap.value = r.commentaire_ccap
                    nombre_exemplaires_dossier_administratif.value = r.nombre_exemplaires_dossier_administratif
                    nombre_exemplaires_proposition_artistique.value = r.nombre_exemplaires_proposition_artistique
                    nombre_exemplaires_proposition_technique.value = r.nombre_exemplaires_proposition_technique
                    adresse_depot_offres.value = r.adresse_depot_offres
                    prix_marche.value = r.prix_marche
                    monnaies_soumission.value = r.monnaies_soumission
                    taux_change.value = r.taux_change
                    monnaie_retenu.value = r.monnaie_retenu
                    validite_offre.value = r.validite_offre
                    montant_cautionnement.value = r.montant_cautionnement
                    taux_cautionnement_definitif_rpao.value = r.taux_cautionnement_definitif_rpao
                    variante_techniques.value = r.variante_techniques
                    reunion_preparatoire.value = r.reunion_preparatoire
                    soumission_en_ligne.value = r.soumission_en_ligne
                    mode_soumission.value = r.mode_soumission
                    date_heure_limite.value = r.date_heure_limite
                    criteres_eliminatoires.value = r.criteres_eliminatoires
                    criteres_essentiels.value = r.criteres_essentiels
                    mode_evaluation.value = r.mode_evaluation
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
                    descriptif_operation: descriptif_operation.value,
                    lieu_execution: lieu_execution.value,
                    objectifs_mission: objectifs_mission.value,
                    source_financement_rpao: source_financement_rpao.value,
                    delai_phase_conception: delai_phase_conception.value,
                    delai_phase_realisation: delai_phase_realisation.value,
                    delai_global: delai_global.value,
                    cout_global_previsionnel: cout_global_previsionnel.value,
                    provenance_materiaux: provenance_materiaux.value,
                    visite_travaux: visite_travaux.value,
                    renseignements_necessaires: renseignements_necessaires.value,
                    renseignements_complementaires: renseignements_complementaires.value,
                    langue_soumission: langue_soumission.value,
                    piecesAdminLocales: piecesAdminLocales.value,
                    piecesAdminEtrangeres: piecesAdminEtrangeres.value,
                    refSoumissionnaire: refSoumissionnaire.value,
                    personnel: personnel.value,
                    materiels: materiels.value,
                    organisation_methodologie: organisation_methodologie.value,
                    avant_projet_sommaire: avant_projet_sommaire.value,
                    liste_etudes_conception: liste_etudes_conception.value,
                    cout_etudes: cout_etudes.value,
                    cout_estimatif_projet: cout_estimatif_projet.value,
                    cout_global_projet: cout_global_projet.value,
                    preuve_acceptation: preuve_acceptation.value,
                    commentaire_ccap: commentaire_ccap.value,
                    nombre_exemplaires_dossier_administratif: nombre_exemplaires_dossier_administratif.value || null,
                    nombre_exemplaires_proposition_artistique: nombre_exemplaires_proposition_artistique.value || null,
                    nombre_exemplaires_proposition_technique: nombre_exemplaires_proposition_technique.value || null,
                    adresse_depot_offres: adresse_depot_offres.value,
                    prix_marche: prix_marche.value,
                    monnaies_soumission: monnaies_soumission.value,
                    taux_change: taux_change.value,
                    monnaie_retenu: monnaie_retenu.value,
                    validite_offre: validite_offre.value,
                    montant_cautionnement: montant_cautionnement.value,
                    taux_cautionnement_definitif_rpao: taux_cautionnement_definitif_rpao.value || null,
                    variante_techniques: variante_techniques.value,
                    reunion_preparatoire: reunion_preparatoire.value,
                    soumission_en_ligne: soumission_en_ligne.value,
                    mode_soumission: mode_soumission.value,
                    date_heure_limite: date_heure_limite.value,
                    criteres_eliminatoires: criteres_eliminatoires.value,
                    criteres_essentiels: criteres_essentiels.value,
                    mode_evaluation: mode_evaluation.value,
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

        return {
            handleSubmit, dao, pieces, isLoading,
            descriptif_operation, lieu_execution, objectifs_mission, source_financement_rpao,
            delai_phase_conception, delai_phase_realisation, delai_global, cout_global_previsionnel,
            provenance_materiaux, visite_travaux, renseignements_necessaires, renseignements_complementaires,
            langue_soumission, piecesAdminLocales, piecesAdminEtrangeres, refSoumissionnaire,
            personnel, materiels, organisation_methodologie, avant_projet_sommaire, liste_etudes_conception,
            cout_etudes, cout_estimatif_projet, cout_global_projet, preuve_acceptation, commentaire_ccap,
            nombre_exemplaires_dossier_administratif, nombre_exemplaires_proposition_artistique, nombre_exemplaires_proposition_technique,
            adresse_depot_offres, prix_marche, monnaies_soumission, taux_change, monnaie_retenu,
            validite_offre, montant_cautionnement, taux_cautionnement_definitif_rpao,
            variante_techniques, reunion_preparatoire, soumission_en_ligne, mode_soumission, date_heure_limite,
            criteres_eliminatoires, criteres_essentiels, mode_evaluation, formation_element_majeur,
            poids_artistique, poids_technique, poids_financiere,
        }
    }
}
</script>
