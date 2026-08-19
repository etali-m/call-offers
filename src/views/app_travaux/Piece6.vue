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
          <StepperForm :totalSteps="1" v-slot="{ currentStep, nextStep, prevStep, isLastStep }">
            <div v-if="currentStep === 0">
              <!-- <div class="mt-3">
                    <h5 class="fw-bold mb-2"> Définition des prix unitaires - Montants HT en lettres et en chiffres</h5>
                    <div class="col-md-12">    
                          <RichTextarea v-model="prix_unitaires"/>
                    </div>
              </div> -->
              <div class="container">
                <div class="d-flex justify-content-between align-items-center my-4">
                  <h4 class="text-uppercase mb-0">Edition du Bordereau des Prix Unitaires et du Devis Quantitatif et Estimatif</h4>
                  <button type="button" class="btn-custom" data-bs-toggle="offcanvas" data-bs-target="#bpuConsignesTravaux" aria-controls="bpuConsignesTravaux">
                    <i class="bi bi-info-circle"></i> Consignes de rédaction
                  </button>
                </div>
                <!-- ========================= -->
                <!-- FORMULAIRE BPU -->
                <!-- ========================= -->

                  <table class="table">
                    <thead>
                      <tr>
                        <th>N° Prix</th>
                        <th>Désignation</th>
                        <th>Unité</th>
                        <th>Qté</th>
                        <th>Prix Unitaire</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>

                      <template v-for="(row, index) in rows" :key="index">

                        <!-- SERIE -->
                        <tr
                          v-if="row.type === 'section'"
                          class="section-row"
                        >
                          <td colspan="5">
                            <input
                              v-model="row.title"
                              class="section-input"
                            />
                          </td>
                          <td class="actions-cell">

                            <button
                              class="action-btn add-btn"
                              @click.prevent="insertItemAfter(index)"
                            >
                              <i class="bi bi-plus-lg"></i> Ligne
                            </button>

                            <button
                              class="action-btn section-btn"
                              @click.prevent="insertSectionAfter(index)"
                            >
                              <i class="bi bi-plus-lg"></i> Série
                            </button>

                            <button
                              class="action-btn delete-btn"
                              @click.prevent="removeRow(index)"
                            >
                              ✕
                            </button>

                          </td>
                        </tr>

                        <!-- LIGNE -->
                        <tr v-else>

                          <td>
                            <input v-model="row.code" />
                          </td>

                          <td>
                            <textarea cols="50"
                              v-model="row.designation"
                            ></textarea>
                          </td>

                          <td>
                            <select v-model="row.unit" class="unit-select">
                              <option value="">Unité</option>
                              <option v-for="u in UNITES" :key="u.abbr" :value="u.abbr">{{ u.label }} ({{ u.abbr }})</option>
                            </select>
                          </td>

                          <td>
                            <input v-model="row.quantity" />
                          </td>

                          <td>
                            <input v-model="row.price" />
                          </td>

                          <td class="text-center">
                            <button
                              class="action-btn add-btn"
                              @click.prevent="insertItemAfter(index)"
                            >
                              <i class="bi bi-plus-lg"></i> Ligne
                            </button>

                            <button
                              class="action-btn section-btn"
                              @click.prevent="insertSectionAfter(index)"
                            >
                              <i class="bi bi-plus-lg"></i> Série
                            </button>

                            <button
                              class="action-btn delete-btn"
                              @click.prevent="removeRow(index)"
                            >
                              ✕
                            </button>
                          </td>

                        </tr>

                      </template>

                    </tbody>
                  </table>

                 <!-- ACTIONS -->
                <!-- <div class="actions">
                  <button class="btn btn-success btn-sm " @click.prevent="addSection">Ajouter une série</button>
                  <button class="btn btn-secondary btn-sm" @click.prevent="addItem">Ajouter une ligne</button>
                </div> -->

                <!-- Navigation -->
                <div class="buttons my-4 text-center">
                  <button type="button" class="btn-custom" @click="prevStep" :disabled="currentStep === 0"><i class="bi bi-arrow-left-circle"></i> Précédent</button> &nbsp;
                  <button type="button" class="btn-custom" v-if="!isLastStep" @click="nextStep">Suivant <i class="bi bi-arrow-right-circle"></i></button>
                  <button class="btn-custom" type="submit" v-else>Enregister</button>
                </div>
                <br><br>
                <div>
                    <!-- ========================= -->
                    <!-- APERCU DQE -->
                    <!-- ========================= -->

                    <h4 class="text-center">BORDEREAU DES PRIX UNITAIRES (BPU)</h4>

                    <table class="table">
                      <thead>
                        <tr>
                          <th>N° Prix</th>
                          <th>Désignation</th>
                          <th>Unité</th> 
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


                            <td>{{ row.price }}</td>

                          </tr>

                        </template>

                      </tbody>
                    </table>
                </div>

              </div>  
            </div> 
 
          </StepperForm>
        </form>
      </div>

      <div class="offcanvas offcanvas-end" tabindex="-1" id="bpuConsignesTravaux" aria-labelledby="bpuConsignesTravauxLabel" style="width: 420px;">
        <div class="offcanvas-header border-bottom">
          <h5 class="offcanvas-title" id="bpuConsignesTravauxLabel">Consignes de rédaction — BPU</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Fermer"></button>
        </div>
        <div class="offcanvas-body" style="font-size: 0.9em;">
          <h6 class="fw-bold">Objectifs</h6>
          <p>Les objectifs du Bordereau des prix sont :</p>
          <p>a. De permettre une bonne comparaison des prix des offres à évaluer sur la base d'une nomenclature définissant ces prix en fonction des tâches élémentaires constituant un poste de prix ;</p>
          <p>b. De permettre, une fois le marché conclu, l'évaluation et le paiement des travaux exécutés. Pour atteindre ces objectifs, le Bordereau des prix doit répertorier les travaux de façon suffisamment détaillée pour distinguer entre différentes natures de travaux, ou entre travaux de même nature exécutés dans des endroits différents, ou entre toutes autres conditions susceptibles de donner lieu à des variations de coûts, sans oublier que les prix comprennent également toutes suggestions découlant de l'application des dispositions administratives et techniques prévues dans les pièces écrites.</p>

          <h6 class="fw-bold mt-3">Séries de prix</h6>
          <p>Dans un bordereau des prix, les prix sont groupés en rubriques de façon à distinguer entre les parties de travaux qui par nature, accès, calendrier ou toute autre caractéristique peuvent donner lieu à des variations sur les méthodes de construction, ou séquence des travaux, ou considérations de coût. Ces rubriques constituent des séries de prix.</p>
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

const UNITES = [
  { abbr: 'm', label: 'mètre' },
  { abbr: 'ha', label: 'hectare' },
  { abbr: 'l', label: 'litre' },
  { abbr: 'kg', label: 'kilogramme' },
  { abbr: 's', label: 'seconde' },
  { abbr: 'cm', label: 'centimètre' },
  { abbr: 'm2', label: 'mètre carré' },
  { abbr: 'm3', label: 'mètre cube' },
  { abbr: 't', label: 'tonne' },
  { abbr: 'h', label: 'heure' },
  { abbr: 'mm', label: 'millimètre' },
  { abbr: 'mm2', label: 'millimètre carré' },
  { abbr: 'u', label: 'unité' },
  { abbr: 'ft', label: 'forfait' },
]


const prix_unitaires = ref(`
<table>
  <thead>
    <tr>
      <th>N°</th>
      <th>Désignation</th>
      <th>Unité</th>
      <th>PU HT en chiffre</th>
      <th>PU HT en lettre</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td></td>
      <td></td>
      <td></td>
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

        const responseBPU = await get_bpu_dqe(dossier)

        console.log(responseBPU);

        // Une fois les pièces chargées, on met à jour l’index courant
        const index = pieces.value.findIndex(p => p.piece.nom_composant === current_piece);
        id_piece.value = pieces.value[index].id;  

        if(responseBPU && responseBPU.length > 0){
          trouve.value = true
          rows.value = responseBPU
        } else {
          rows.value.push({
            type: "section",
            title: "SERIE 000",
            code: null,
            designation: null,
            unit: null,
            price: null,
            quantity: 1.00
          });
        }

 
    } catch (error) {
        console.error("Erreur lors de la récupération du DAO :", error) 
    } finally{
        isLoading.value = false;
    }
})


//soumission du formulaire
const handleSubmit = async () => {
    errors.value = {}
    isLoading.value = true; 

    try {
        const bpuData = {  
          prix_unitaires : prix_unitaires.value
        };
        console.log(rows.value);
 
        if(trouve.value){
            const response = await update_bpu_dqe(dossier, rows.value)
            message.value = response.message
        }else {
            const response = await create_bpu_dqe(dossier, rows.value)
            //mise à jour du statut de la piece
            const update = await update_piece(id_piece.value, true);

            //Définition du message
            message.value = response.message 
        }
        console.log(message);  
        //toast pour informer l'utilisateur
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

const addSection = () => {
  rows.value.push({
    type: "section",
    title: "NOUVELLE SERIE",
    code: null,
    designation: null,
    unit: null,
    price: null,
    quantity: 1.00
  });
};

const addItem = () => {
  rows.value.push({
    type: "item",
    title: null,
    code: "",
    designation: "",
    unit: "",
    price: "",
    quantity: 1.00
  });
};

const insertItemAfter = (index) => {

  rows.value.splice(index + 1, 0, {
    type: "item",
    title: null,
    code: "",
    designation: "",
    unit: "",
    price: "",
    quantity: 1.00
  });

};

const insertSectionAfter = (index) => {

  rows.value.splice(index + 1, 0, {
    type: "section",
    title: "NOUVELLE SERIE",
    code: null,
    designation: null,
    unit: null,
    price: "",
    quantity: 1.00
  });

};

const removeRow = (index) => {
  rows.value.splice(index, 1);
};

</script>

<style scoped>

.actions-cell {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
}

.action-btn {
  border: none;
  outline: none;
  padding: 7px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;

  transition: all 0.2s ease;

  background: #f3f4f6;
  color: #374151;
}

/* Hover général */
.action-btn:hover {
  transform: translateY(-1px);
}


/* Ajouter ligne */
.add-btn {
  background: #eef2ff;
  color: #4338ca;
}

.add-btn:hover {
  background: #e0e7ff;
}


/* Ajouter série */
.section-btn {
  background: #ecfeff;
  color: #0f766e;
}

.section-btn:hover {
  background: #cffafe;
}


/* Supprimer */
.delete-btn {
  background: #fef2f2;
  color: #dc2626;
  padding-inline: 10px;
}

.delete-btn:hover {
  background: #fee2e2;
}

.unit-select {
  width: 100%;
  font-size: 13px;
  font-weight: 400;
  color: #374151;
  padding: 6px 8px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: #fff;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.unit-select:hover {
  border-color: #9ca3af;
}

.unit-select:focus {
  outline: none;
  border-color: #4338ca;
  box-shadow: 0 0 0 2px rgba(67, 56, 202, 0.15);
}

</style>