<template>
  <Loader v-if="isLoading" />

  <div v-else>
    <HeaderPiece numero_piece="17" :numero_dossier="dao.numero_appel_offre" :moe="dao.maitre_ouvrage" :description_travaux="dao.objet_appel"/>

    <PieceNavigator
      :project-id="dao.id"
      :current-piece-name="$route.name"
      />

    <div class="form-container mt-4">
      <form @submit.prevent="handleSubmit" style="padding-left:10px;">
        <StepperForm :totalSteps="1" v-slot="{ currentStep }">
        <div v-if="currentStep === 0" class="container">
          <h4 class="my-4 text-center text-uppercase">Justificatifs des études préalables</h4>
          <p class="text-muted">(le cas échéant)</p>

          <div class="row">
            <div class="col-md-6 mt-2">
              <label class="label-custom">Date de l'étude</label>
              <input type="date" class="input-custom" v-model="etude_prealable_date">
            </div>
            <div class="col-md-6 mt-2">
              <label class="label-custom">Maître d'œuvre ayant réalisé l'étude</label>
              <input class="input-custom" v-model="etude_prealable_maitre_oeuvre">
            </div>
            <div class="col-md-6 mt-2">
              <label class="label-custom">Références du marché d'étude</label>
              <input class="input-custom" v-model="etude_prealable_references_marche">
            </div>
            <div class="col-md-6 mt-2">
              <label class="label-custom">Type d'opération</label>
              <select class="select-custom" v-model="etude_prealable_type">
                <option value="entretien">Entretien</option>
                <option value="rehabilitation">Réhabilitation</option>
                <option value="travaux_neufs">Travaux neufs</option>
              </select>
            </div>
            <div class="col-md-12 mt-3">
              <label class="label-custom">Description des études (APS / APD)</label>
              <RichTextarea v-model="etude_prealable_description"/>
            </div>
            <div class="col-md-12 mt-3">
              <label class="label-custom">Pièce jointe</label>
              <input type="file" class="input-custom" @change="handleFileChange">
            </div>
          </div>

          <div class="buttons my-4 text-center">
            <button class="btn-custom" type="submit">Enregister</button>
          </div>
        </div>
        </StepperForm>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HeaderPiece from '@/components/HeaderPiece.vue'
import StepperForm from '@/components/StepperForm.vue'
import RichTextarea from '@/components/RichTextarea.vue';
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
const trouve = ref(false)
const message = ref('');
const errors = ref({});

const { getDAO } = useAppelOffre()
const { get_pieces, update_piece } = usePiece()
const { get_etude_prealable, create_etude_prealable, update_etude_prealable } = useConceptionRealisation()

const etude_prealable_date = ref('')
const etude_prealable_maitre_oeuvre = ref('')
const etude_prealable_references_marche = ref('')
const etude_prealable_type = ref('')
const etude_prealable_description = ref('')
const etude_prealable_fichier = ref(null)

onMounted(async () => {
    try {
        isLoading.value = true;
        const responseDAO = await getDAO(dossier)
        const responsePiece = await get_pieces(dossier)
        pieces.value = responsePiece
        dao.value = responseDAO[0];

        const responseEtude = await get_etude_prealable(dossier)

        const index = pieces.value.findIndex(p => p.piece.nom_composant === current_piece);
        id_piece.value = pieces.value[index].id;

        if(responseEtude && responseEtude.length > 0){
          trouve.value = true
          const e = responseEtude[0]
          etude_prealable_date.value = e.etude_prealable_date
          etude_prealable_maitre_oeuvre.value = e.etude_prealable_maitre_oeuvre
          etude_prealable_references_marche.value = e.etude_prealable_references_marche
          etude_prealable_type.value = e.etude_prealable_type
          etude_prealable_description.value = e.etude_prealable_description
          etude_prealable_fichier.value = e.etude_prealable_fichier
        }

    } catch (error) {
        console.error("Erreur lors de la récupération du DAO :", error)
    } finally{
        isLoading.value = false;
    }
})

const handleFileChange = (event) => {
  etude_prealable_fichier.value = event.target.files[0]
}

const handleSubmit = async () => {
  errors.value = {}
  isLoading.value = true;

  try {
      const etudeData = {
        etude_prealable_date : etude_prealable_date.value || null,
        etude_prealable_maitre_oeuvre : etude_prealable_maitre_oeuvre.value,
        etude_prealable_references_marche : etude_prealable_references_marche.value,
        etude_prealable_type : etude_prealable_type.value,
        etude_prealable_description : etude_prealable_description.value,
        etude_prealable_fichier : etude_prealable_fichier.value,
      };

      if(trouve.value){
          const response = await update_etude_prealable(dossier, etudeData)
          message.value = response.message
      }else {
          const response = await create_etude_prealable(dossier, etudeData)
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
</script>
