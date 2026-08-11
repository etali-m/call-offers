<template>
  <Loader v-if="isLoading" />

  <div v-else>
    <HeaderPiece numero_piece="16" :numero_dossier="dao.numero_appel_offre" :moe="dao.maitre_ouvrage" :description_travaux="dao.objet_appel"/>

    <PieceNavigator
      :project-id="dao.id"
      :current-piece-name="$route.name"
      />

    <div class="form-container mt-4">
      <StepperForm :totalSteps="1" v-slot="{ currentStep }">
        <div v-if="currentStep === 0" class="container">
          <h4 class="my-4 text-center text-uppercase">Grilles d'évaluation</h4>

          <p v-if="!groupes.length" class="text-center text-muted">
            Aucune grille de notation n'a encore été saisie. Elle se renseigne depuis la pièce 3 (RPAO).
          </p>

          <div v-for="groupe in groupes" :key="groupe.categorie" class="mb-4">
            <h5 class="fw-bold text-uppercase">{{ libelleCategorie(groupe.categorie) }}</h5>
            <table class="table">
              <thead>
                <tr>
                  <th>Critère</th>
                  <th>Sous-critère</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(ligne, index) in groupe.lignes" :key="index">
                  <td>{{ ligne.critere }}</td>
                  <td>{{ ligne.sous_critere }}</td>
                  <td>{{ ligne.points }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="buttons my-4 text-center" v-if="groupes.length">
            <button class="btn-custom" @click="marquerComplete">Marquer cette pièce comme complète</button>
          </div>
        </div>
      </StepperForm>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import HeaderPiece from '@/components/HeaderPiece.vue'
import StepperForm from '@/components/StepperForm.vue'
import { useRoute, useRouter } from 'vue-router';
import PieceNavigator from "@/components/PieceNavigator.vue";
import Loader from "@/components/Loader.vue";
import { toast } from 'vue3-toastify';
import { useAppelOffre } from '@/composables/useAppelOffre';
import { usePiece } from '@/composables/usePiece';
import { useConceptionRealisation } from '@/composables/useConceptionRealisation';

const route = useRoute();
const router = useRouter();
const dossier = route.params.project_id
const dao = ref({});
const isLoading = ref(true);
const pieces = ref([])
const current_piece = route.name
const id_piece = ref()
const grille = ref([])

const { getDAO } = useAppelOffre()
const { get_pieces, update_piece } = usePiece()
const { get_grille_notation } = useConceptionRealisation()

const LABELS = {
  artistique: 'Proposition artistique',
  technique: 'Proposition technique',
  financiere: 'Proposition financière',
}

const libelleCategorie = (categorie) => LABELS[categorie] || categorie

const groupes = computed(() => {
  const parCategorie = {}
  grille.value.forEach((ligne) => {
    if (!parCategorie[ligne.categorie]) parCategorie[ligne.categorie] = []
    parCategorie[ligne.categorie].push(ligne)
  })
  return Object.keys(parCategorie).map((categorie) => ({
    categorie,
    lignes: parCategorie[categorie],
  }))
})

onMounted(async () => {
    try {
        isLoading.value = true;
        const responseDAO = await getDAO(dossier)
        const responsePiece = await get_pieces(dossier)
        pieces.value = responsePiece
        dao.value = responseDAO[0];

        const responseGrille = await get_grille_notation(dossier)
        if (responseGrille) grille.value = responseGrille

        const index = pieces.value.findIndex(p => p.piece.nom_composant === current_piece);
        id_piece.value = pieces.value[index].id;
    } catch (error) {
        console.error("Erreur lors de la récupération du DAO :", error)
    } finally{
        isLoading.value = false;
    }
})

const marquerComplete = async () => {
  try {
    await update_piece(id_piece.value, true);
    toast.success("Pièce marquée comme complète", { theme: 'colored', autoClose: 2000 });
  } catch (err) {
    toast.error(err, { theme: 'colored', autoClose: 2000 });
  }
}
</script>
