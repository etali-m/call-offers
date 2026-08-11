<template>
    <Loader v-if="isLoading" />
    <div v-else>
        <HeaderPiece numero_piece="6" :numero_dossier="dao.numero_appel_offre" :moe="dao.maitre_ouvrage" :description_travaux="dao.objet_appel"/>

        <PieceNavigator :project-id="dao.id" :current-piece-name="$route.name" />

        <div class="form-container">
            <form @submit.prevent="handleSubmit" style="padding-left:10px;">
                <div class="container">
                    <h4 class="my-4 text-center text-uppercase">Cahier des Clauses Techniques Particulières</h4>
                    <div class="mt-3">
                        <RichTextarea v-model="clauses_techniques"/>
                    </div>
                    <div class="buttons my-4 text-center">
                        <button class="btn-custom" type="submit">Enregister</button>
                    </div>
                </div>
            </form>
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
