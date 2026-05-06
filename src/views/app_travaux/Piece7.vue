<template>
  <Loader v-if="isLoading" />

  <div v-else>
    <HeaderPiece numero_piece="1" :numero_dossier="dao.numero_appel_offre" :moe="dao.maitre_ouvrage" :description_travaux="dao.objet_appel"/>
      
    <PieceNavigator 
          :project-id="dao.id"
          :current-piece-name="$route.name"
          />

    <div class="form-container">   
        <div class="mt-3 bg-white p-4" style="border-radius: 10px;">
              <h4 class="my-4 text-center"> DETAILS ESTIMATIF ET QUANTITATIF DES TRAVAUX</h4>
              <div class="col-md-12">     
                    <!-- ========================= -->
                    <!-- APERCU DQE -->
                    <!-- ========================= --> 

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

                        <template
                          v-for="(row, index) in rows"
                          :key="'dqe-' + index"
                        >

                          <!-- SERIE -->
                          <tr
                            v-if="row.type === 'section'"
                            class="section-row"
                          >
                            <td colspan="5">
                              {{ row.title }}
                            </td>
                          </tr>

                          <!-- LIGNE -->
                          <tr v-else>

                            <td>{{ row.code }}</td>

                            <td>{{ row.designation }}</td>

                            <td>{{ row.unit }}</td>

                            <!-- QUANTITE AJOUTEE -->
                            <td>
                              {{ row.quantity }}
                            </td>

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
        </div>      
    </div>

  </div> 
      
</template>

<script setup>
import { ref, onMounted } from 'vue'
import RichTextarea from '@/components/RichTextarea.vue';
import HeaderPiece from '@/components/HeaderPiece.vue'
import StepperForm from '@/components/StepperForm.vue' 
import { toast } from 'vue3-toastify'; 
import { useRoute, useRouter } from 'vue-router';
import PieceNavigator from "@/components/PieceNavigator.vue";
import Loader from "@/components/Loader.vue";
import { useAppelOffre } from '@/composables/useAppelOffre'; 
import { usePiece } from '@/composables/usePiece';
import { useTravaux } from '@/composables/useTravaux';

const route = useRoute();
const router = useRouter();
const dossier = route.params.project_id      //recuperation de l'identifiant du projet
const dao = ref({}); 
const isLoading = ref(true);
const pieces = ref([])  
const current_piece = route.name
const id_piece = ref()
const trouve = ref(false) 
const message = ref(''); //message d'enregistrement reussi
const errors = ref({});
const rows = ref([]);

const { getDAO } = useAppelOffre() 
const { get_pieces, update_piece } =  usePiece()
const { get_bpu_dqe, create_bpu_dqe, update_bpu_dqe } = useTravaux()


const dqe = ref(`
<table>
  <thead>
    <tr>
      <th>N°</th>
      <th>Désignation</th>
      <th>Unité</th>
      <th>Quantités</th>
      <th>Prix Unitaire</th>
      <th>Prix Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="6"></td> 
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td colspan="4"><strong>MONTANT HTVA</strong></td> 
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td colspan="4"><strong>TVA(19.25%)</strong></td> 
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td colspan="4"><strong>AIR</strong></td> 
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td colspan="4"><strong>TOTAL GÉNÉRAL (FCFA/TTC)</strong></td> 
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td colspan="4"><strong>NET À MANDATER</strong></td> 
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table> 
`)


onMounted(async () => {
    try {
        isLoading.value = true;
        const responseDAO = await getDAO(dossier)
        const responsePiece = await get_pieces(dossier)
        pieces.value = responsePiece 
        //récuperer les informations sur le dossier d'appel d'offre.
        dao.value = responseDAO[0];    

        const responseDQE = await get_bpu_dqe(dossier)

        // Une fois les pièces chargées, on met à jour l’index courant
        const index = pieces.value.findIndex(p => p.piece.nom_composant === current_piece);
        id_piece.value = pieces.value[index].id;   

        if(responseDQE && responseDQE.length > 0){
          trouve.value = true
          rows.value = responseDQE
        }
 
    } catch (error) {
        console.error("Erreur lors de la récupération du DAO :", error) 
    } finally{
        isLoading.value = false;
    }
})


</script>