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
                    <div class="mt-3">
                        <h5 class="fw-bold mb-2">1. Objet de l'appel d'offres</h5>
                        <div class="col-md-12">
                            <RichTextarea v-model="objet_appel"/>
                        </div>
                    </div>

                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">2. Consistance des prestations</h5>
                        <div class="col-md-12">
                            <RichTextarea v-model="consistence_travaux"/>
                        </div>
                    </div>

                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">3. Allotissement</h5>
                        <div class="col-md-12">
                            <RichTextarea v-model="tranches"/>
                        </div>
                    </div>
                </div>

                <div v-else-if="currentStep === 1">
                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">4. Coût prévisionnel</h5>
                        <div class="col-md-12">
                            <RichTextarea v-model="cout_previsionnel"/>
                        </div>
                    </div>

                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">5. Délais d'exécution</h5>
                        <div class="col-md-12">
                            <RichTextarea v-model="delai_previsionnel"/>
                        </div>
                    </div>
                </div>

                <div v-else-if="currentStep === 2">
                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">6. Participation et origine</h5>
                        <div class="col-md-12">
                            <RichTextarea v-model="participation_origine"/>
                        </div>
                    </div>

                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">7. Financement</h5>
                        <div class="col-md-12">
                            <RichTextarea v-model="financement"/>
                        </div>
                    </div>
                </div>

                <div v-else-if="currentStep === 3">
                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">8. Mode de soumission</h5>
                        <div class="row">
                            <div class="col-md-12">
                                <label>Le mode de soumission retenu pour cette consultation est </label>
                                <select class="select-custom" v-model="mode_soumission">
                                    <option value="en ligne">En ligne</option>
                                    <option value="hors ligne">Hors ligne</option>
                                    <option value="en ligne ou hors ligne">En ligne ou hors ligne</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">9. Cautionnement provisoire</h5>
                        <div class="col-md-12">
                            <RichTextarea v-model="cautionnement"/>
                        </div>
                    </div>
                </div>

                <div v-else-if="currentStep === 4">
                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">10. Consultation du Dossier d'Appel d'Offres</h5>
                        <div class="col-md-12">
                            <RichTextarea v-model="consultation"/>
                        </div>
                    </div>
                </div>

                <div v-else-if="currentStep === 5">
                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">11. Acquisition du Dossier d'Appel d'Offres</h5>
                        <div class="col-md-12">
                            <RichTextarea v-model="acquisition_dao"/>
                        </div>
                    </div>
                </div>

                <div v-else-if="currentStep === 6">
                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">12. Remise des offres</h5>
                        <div class="col-md-12">
                            <RichTextarea v-model="remise_offre"/>
                        </div>
                    </div>
                </div>

                <div v-else-if="currentStep === 7">
                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">13. Recevabilité des offres</h5>
                        <div class="col-md-12">
                            <RichTextarea v-model="recevabilite_plis"/>
                        </div>
                    </div>
                </div>

                <div v-else-if="currentStep === 8">
                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">14. Ouverture des plis</h5>
                        <div class="col-md-12">
                            <RichTextarea v-model="ouverture_plis"/>
                        </div>
                    </div>
                </div>

                <div v-else-if="currentStep === 9">
                    <h5 class="fw-bold mb-4">15. Critères d'évaluation</h5>
                    <div class="row">
                        <div class="col-md-12">
                            <h6 class="fw-bold mb-2">15.1 Critères éliminatoires</h6>
                            <div class="col-md-12">
                                <RichTextarea v-model="critere_eliminatoire"/>
                            </div>
                        </div> <br>
                        <div class="col-md-12 mt-4">
                            <h6 class="fw-bold mb-2">15.2 Critères essentiels</h6>
                            <div class="col-md-12">
                                <RichTextarea v-model="critere_essentiels"/>
                            </div>
                        </div>
                        <div class="col-md-12 mt-4">
                            <label class="label-custom">Note artistique minimale requise (sur 100)</label>
                            <input type="number" step="0.01" class="input-custom" v-model="note_artistique_minimale" placeholder="70">
                        </div>
                    </div>
                </div>

                <div v-else-if="currentStep === 10">
                    <div class="col-md-12 mt-4">
                        <h5 class="fw-bold mb-4">16. Attribution</h5>
                         <div class="col-md-12">
                            <RichTextarea v-model="attributions"/>
                        </div>
                    </div>
                </div>

                <div v-else-if="currentStep === 11">
                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">17. Nombre maximum de lots</h5>
                        <div class="col-md-12">
                            <label>Nombre de lots maximum</label>
                            <input type="number" class="input-custom" v-model="nombre_lots" placeholder="2">
                        </div>
                    </div>

                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">18. Durée de validité des offres</h5>
                        <div class="col-md-12">
                            <label>Durée d'engagement en jours</label>
                            <input type="number" class="input-custom" v-model="duree_engagement" placeholder="90">
                        </div>
                    </div>
                </div>

                <div v-else-if="currentStep === 12">
                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">19. Renseignements complémentaires</h5>
                         <div class="col-md-12">
                            <RichTextarea v-model="renseignements"/>
                        </div>
                    </div>

                    <div class="mt-3">
                        <h5 class="fw-bold mb-4">20. Lutte contre la corruption et les mauvaises pratiques</h5>
                        <div class="row">
                            <div class="col-md-12">
                                <p>Pour toute dénonciation pour des pratiques, faits ou actes de corruption ou faits de mauvaises pratiques, bien vouloir appeler la CONAC au numéro 1517, l'Autorité chargée des Marchés Publics (MINMAP) (SMS ou appel) aux numéros : (+237) 673 20 57 25 et 699 37 07 48, l'ARMP au numéro</p>
                                <label>Numéro maître d'ouvrage ou maître d'ouvrage délégué</label>
                                <input type="number" class="input-custom" v-model="numero_moa" placeholder="678 45 14 35">
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
    components: {
        HeaderPiece,
        StepperForm,
        RichTextarea,
        PieceNavigator,
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
        const errors = ref({});

        const { getDAO } = useAppelOffre()
        const { get_pieces, update_piece } =  usePiece()
        const { get_aao, create_aao, update_aao } = useConceptionRealisation()

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

                objet_appel.value = `<p>Dans le cadre de........................, le ${dao.value.maitre_ouvrage}, lance un Appel d'Offres avec concours ${dao.value.type_dossier} ${dao.value.mode_passation} pour la conception-réalisation de ${dao.value.objet_appel}</p>`;
                consistence_travaux.value = `<p>Les prestations comprennent notamment les études de conception (Avant-Projet Sommaire) et la réalisation des travaux correspondants :</p>`;
                cout_previsionnel.value = `<p>Le coût prévisionnel de l'opération à l'issue des études préalables est de</p>`;
                delai_previsionnel.value = `<p>Le délai maximum prévu pour la réalisation des prestations est séquencé selon le programme défini par le Maître d'Ouvrage ou le Maître d'Ouvrage Délégué.</p>`;
                participation_origine.value = `<p>La participation au présent appel d'offres est ouverte à <b>[préciser le cas échéant, la qualité des prestataires concernés]</b>.</p>`;
                financement.value = `<p>Les prestations objet du présent appel d'offres sont financées par <b>${dao.value.financement}</b>.</p>`;
                consultation.value = `<p>Le dossier physique peut être consulté gratuitement dans les services du MO / MOD aux heures ouvrables à <b>[Lieu de consultation du DAO]</b> dès publication du présent avis. Il peut également être consulté en ligne sur la plateforme COLEPS.</p>`;
                acquisition_dao.value = `<p>La version physique du dossier d'appel d'offres peut être obtenue au <b>[Lieu de retrait du DAO]</b> dès publication du présent avis, contre versement d'une somme non remboursable des frais d'achat du DAO.</p>`;
                remise_offre.value = `<p>Pour la soumission hors ligne, l'offre en sept (07) exemplaires dont un (01) original et six (06) copies marqués comme tels, devra parvenir [Lieu d'enregistrement des offres], au plus tard le [Date limite de réception des offres] à [Heure limite].</p>`;
                recevabilite_plis.value = `<p>Les pièces administratives, la proposition artistique, la proposition technique et la proposition financière doivent être placées dans des enveloppes différentes séparées et remises sous pli scellé.</p>`;
                ouverture_plis.value = `<p>L'ouverture des plis se fera en deux temps : d'abord les pièces administratives et les propositions artistiques, puis les propositions techniques et financières des soumissionnaires ayant atteint la note artistique minimale requise.</p>`;
                attributions.value = `<p>Le Maître d'Ouvrage ou le Maître d'Ouvrage Délégué attribue le marché au soumissionnaire ayant obtenu la meilleure note globale, en combinant les notes artistique, technique et financière.</p>`;

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
            errors.value = {}
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

        return {
            handleSubmit,
            dao,
            pieces,
            isLoading,
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
