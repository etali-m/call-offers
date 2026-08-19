<template>
  <Loader v-if="isLoading" />

  <div v-else>
    <HeaderPiece numero_piece="8" :numero_dossier="dao.numero_appel_offre" :moe="dao.maitre_ouvrage" :description_travaux="dao.objet_appel"/>

    <PieceNavigator
                :project-id="dao.id"
                :current-piece-name="$route.name"
                />

    <div class="form-container mt-4">
      <StepperForm :totalSteps="1" v-slot="{ currentStep }">
        <div v-if="currentStep === 0" class="container">
          <h4 class="my-4 text-center text-uppercase">Détail Quantitatif et Estimatif (DQE)</h4>

          <table class="table">
            <thead>
              <tr>
                <th>N° Prix</th>
                <th>Désignation</th>
                <th>Unité</th>
                <th>Quantité</th>
                <th>Prix Unitaire</th>
              </tr>
            </thead>

            <tbody>
              <template v-for="(row, index) in rows" :key="index">
                <tr v-if="row.type === 'section'" class="section-row">
                  <td colspan="5">{{ row.title }}</td>
                </tr>
                <tr v-else>
                  <td>{{ row.code }}</td>
                  <td>{{ row.designation }}</td>
                  <td>{{ row.unit }}</td>
                  <td>{{ row.quantity }}</td>
                  <td>{{ row.price }}</td>
                </tr>
              </template>
              <tr>
                <td></td>
                <td><b>A- Total général HT</b></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td><b>B- Montant TVA  (% de A)</b></td>
                <td>19.25%</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td><b>C- Montant TTC  (A+B)</b></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </StepperForm>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HeaderPiece from '@/components/HeaderPiece.vue'
import StepperForm from '@/components/StepperForm.vue'
import { useRoute, useRouter } from 'vue-router';
import PieceNavigator from "@/components/PieceNavigator.vue";
import Loader from "@/components/Loader.vue";
import { useAppelOffre } from '@/composables/useAppelOffre';
import { useConceptionRealisation } from '@/composables/useConceptionRealisation';

const route = useRoute();
const router = useRouter();
const dossier = route.params.project_id
const dao = ref({});
const isLoading = ref(true);
const rows = ref([]);

const { getDAO } = useAppelOffre()
const { get_bpu_dqe } = useConceptionRealisation()

onMounted(async () => {
    try {
        isLoading.value = true;
        const responseDAO = await getDAO(dossier)
        dao.value = responseDAO[0];

        const responseBPU = await get_bpu_dqe(dossier)
        if (responseBPU && responseBPU.length > 0) {
          rows.value = responseBPU
        }
    } catch (error) {
        console.error("Erreur lors de la récupération du DAO :", error)
    } finally{
        isLoading.value = false;
    }
})
</script>
