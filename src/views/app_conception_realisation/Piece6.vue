<template>
    <Loader v-if="isLoading" />
    <div v-else>
        <HeaderPiece numero_piece="6" :numero_dossier="dao.numero_appel_offre" :moe="dao.maitre_ouvrage" :description_travaux="dao.objet_appel"/>

        <PieceNavigator :project-id="dao.id" :current-piece-name="$route.name" />

        <div class="form-container">
            <form @submit.prevent="handleSubmit" style="padding-left:10px;">
                <div class="container">
                    <div class="d-flex justify-content-between align-items-center my-4">
                        <h4 class="text-uppercase mb-0">Cahier des Clauses Techniques Particulières</h4>
                        <button type="button" class="btn-custom" data-bs-toggle="offcanvas" data-bs-target="#cctpConsignes" aria-controls="cctpConsignes">
                            <i class="bi bi-info-circle"></i> Consignes de rédaction
                        </button>
                    </div>

                    <div class="mt-3">
                        <RichTextarea v-model="clauses_techniques"/>
                    </div>
                    <div class="buttons my-4 text-center">
                        <button class="btn-custom" type="submit">Enregister</button>
                    </div>
                </div>
            </form>
        </div>

        <div class="offcanvas offcanvas-end" tabindex="-1" id="cctpConsignes" aria-labelledby="cctpConsignesLabel" style="width: 480px;">
            <div class="offcanvas-header border-bottom">
                <h5 class="offcanvas-title" id="cctpConsignesLabel">Consignes de rédaction — CCTP</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Fermer"></button>
            </div>
            <div class="offcanvas-body" style="font-size: 0.9em;">
                <h6 class="fw-bold">Principes à suivre</h6>
                <p>1. Pour que les soumissionnaires puissent répondre d'une façon réaliste et compétitive aux conditions posées par le Maître d'Ouvrage ou Maître d'Ouvrage Délégué, et sans avoir à assortir leurs soumissions de réserves ou de conditions particulières, il faut un ensemble de Clauses Techniques Particulières et de plans à la fois clairs et précis. Dans le cas d'un Appel d'Offres International, ces spécifications et plans doivent être établis de façon à permettre une concurrence aussi large que possible, tout en énonçant clairement les critères auxquels devront répondre les travaux, ouvrages, matériaux et services faisant l'objet du Marché. C'est à cette condition seulement que les objectifs d'économie, d'efficacité et d'équité dans la passation du marché pourront être atteints, que la conformité des soumissions sera assurée et que le travail ultérieur d'évaluation des soumissions sera facilité. Les Clauses Techniques Particulières devront exiger que l'ensemble des fournitures et matériaux nécessaires à l'exécution des Travaux soient neufs, non usagés et du modèle le plus récent ou courant et, à moins que le Marché n'en dispose autrement, qu'ils englobent toutes les dernières améliorations apportées à la conception ou aux matériaux.</p>
                <p>2. En principe, la plupart des Clauses Techniques Particulières sont choisies et définies par le Maître d'Ouvrage ou le Maître d'Ouvrage Délégué en fonction des travaux prévus dans le Marché en question. Il n'y a donc pas de modèle type de spécifications techniques applicables dans tous les cas, quel que soit le secteur considéré, mais il existe des principes et pratiques bien établis, et ces documents en sont le reflet.</p>
                <p>Le Maître d'Ouvrage ou le Maître d'Ouvrage Délégué doit veiller à ce que les spécifications ne soient pas limitatives. En spécifiant les critères auxquels devront répondre les travaux, ouvrages, matériaux et services faisant l'objet du Marché, il convient d'utiliser, dans toute la mesure du possible, des critères reconnus au plan international. Si l'on utilise d'autres critères particuliers, les spécifications devront préciser que des types de fournitures, matériaux et travaux répondant à d'autres critères généralement admis et permettant d'assurer un niveau de qualité égal ou supérieur à celui visé par les critères mentionnés seront également acceptables.</p>
                <p>Les Clauses Techniques Particulières comprendront en particulier les informations détaillées concernant les facteurs suivants :</p>
                <ul>
                    <li>i. Description et consistance des travaux et des ouvrages ;</li>
                    <li>ii. Organisation du chantier et travaux préparatoires ;</li>
                    <li>iii. Provenance, qualité et préparation des matériaux ;</li>
                    <li>iv. Mode d'exécution des travaux.</li>
                </ul>

                <h6 class="fw-bold mt-3">Variantes techniques</h6>
                <p>3. En accord avec le Règlement Général de l'Appel d'Offres, le Maître d'Ouvrage décidera, le cas échéant, s'il permet aux soumissionnaires d'inclure dans leur offre des variantes techniques. Celles-ci sont justifiées dans les cas où il est concevable d'envisager des options qui pourraient s'avérer moins coûteuses que les solutions techniques indiquées dans le Dossier d'Appel d'offres. Le Maître d'Ouvrage indiquera normalement les types et/ou sections de travaux pour lesquels des variantes pourraient présenter un avantage comparatif du fait des compétences particulières des soumissionnaires. Il s'agit, par exemple, des types de travaux suivants :</p>
                <ul>
                    <li>Fondations (utilisation de procédés brevetés et matériaux spéciaux ; type, diamètre, longueur et densité des pieux ; détails constructifs ; etc.) ;</li>
                    <li>Piliers, poutres, planchers (béton armé, précontraints, etc.) ;</li>
                    <li>Procédés brevetés de mise sous tension des structures bétonnées ;</li>
                    <li>Couverture de surface des ouvrages ;</li>
                    <li>Matériaux hydrauliques, couvertures et joints des tuyauteries et conduites, forage, puits ;</li>
                    <li>Structures et matériaux des chaussées (grave-bitume, grave-ciment, asphalte, béton, etc.) ;</li>
                    <li>Configuration et montage des pylônes des lignes de transmission électrique, barrages hydroélectriques ;</li>
                    <li>Éclairage des chaussées…</li>
                </ul>
                <p>Le Dossier contiendra une description des travaux pour lesquels des variantes sont permises avec les références nécessaires à des plans, spécifications, bordereaux de prix et coûts unitaires, et critères de conception, d'essais et contrôle. Il sera également précisé que les variantes seront au moins équivalentes, dans leur structure et fonctionnement, aux paramètres de conception et aux spécifications indiquées dans le Dossier. Enfin, il sera requis que les variantes soient accompagnées de toutes les informations nécessaires pour permettre au Maître d'Ouvrage ou au Maître d'Ouvrage Délégué d'en faire l'évaluation.</p>
                <p>Le Soumissionnaire devra par conséquent être invité à inclure dans son offre, les plans, notes de calculs, spécifications techniques, détails des prix, méthodes et procédés de construction et tout autre détail approprié. Comme spécifié, le cas échéant, dans le Règlement Général de l'Appel d'Offres, les variantes techniques soumises de cette manière seront considérées et évaluées par le Maître d'Ouvrage ou le Maître d'Ouvrage Délégué suivant leur propre mérite, et indépendamment du fait que le Soumissionnaire a offert ou non un prix pour la solution de base définie dans le Dossier d'Appel d'Offres.</p>

                <h6 class="fw-bold mt-3">Plans et dossiers</h6>
                <p>4. Le Dossier d'Appel d'Offres inclura normalement une série de plans et dossiers comprenant, entre autres, un plan de situation indiquant l'emplacement du site en relation avec la géographie locale. Une indication des principales routes, aéroports, chemins de fer et réseaux électriques est également utile. Les plans de construction, même s'ils ne sont pas détaillés, doivent fournir suffisamment d'information pour permettre aux soumissionnaires de comprendre le type et la complexité des travaux envisagés, et de pouvoir chiffrer les prix demandés au Bordereau des prix et Détail quantitatif et estimatif.</p>
                <p>5. De manière générale, les plans et dossiers seront rassemblés dans une section spécifique du Dossier d'Appel d'Offres et sous forme d'un volume séparé, d'un format pouvant être différent des autres documents du dossier. Ce format sera dicté par l'échelle des cartes et plans, qui ne doivent pas être réduits au point de rendre les détails illisibles.</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Loader from '@/components/Loader.vue';
import HeaderPiece from '@/components/HeaderPiece.vue'
import PieceNavigator from '@/components/PieceNavigator.vue';
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
const { get_cctp, create_cctp, update_cctp } = useConceptionRealisation()

const clauses_techniques = ref('')

onMounted(async () => {
    try {
        isLoading.value = true;
        const responseDAO = await getDAO(dossier)
        dao.value = responseDAO[0];
        const responsePiece = await get_pieces(dossier)
        pieces.value = responsePiece
        const index = pieces.value.findIndex(p => p.piece.nom_composant === current_piece);
        id_piece.value = pieces.value[index].id;

        const responseCCTP = await get_cctp(dossier)
        if (responseCCTP && responseCCTP.length > 0) {
            trouve.value = true
            clauses_techniques.value = responseCCTP[0].clauses_techniques
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
        const cctpData = { clauses_techniques: clauses_techniques.value };

        if (trouve.value) {
            const response = await update_cctp(dossier, cctpData)
            message.value = response.message
        } else {
            const response = await create_cctp(dossier, cctpData)
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
