<template>
    <Loader v-if="isLoading" />
    <div v-else>
      <div class="row mb-3">
        <div class="col-12">
          <HeaderDossier :type_dossier="dao.type_dossier" :passation="dao.mode_passation" :numero_dossier="dao.numero_appel_offre" :ministere="dao.maitre_ouvrage" :description_travaux="dao.objet_appel" :financement="dao.financement" :imputation="dao.imputation"/>
        </div> 

        <div class="col-12">
          <ProgressBar :percentage="progression" />
        </div>
      </div> 

      <div class="row">
          <div class="col-md-12 d-flex justify-content-end">
              <button class="btn btn-sm btn-success"><i class="bi bi-download"></i> Générer le document</button>
          </div>
      </div>
      <br>
      <div class="row g-2">
          <Card v-for="(statut, index) in pieces" :key="(index)" :titre="statut.piece.titre" :numero="index+1" :lien="{ name: statut.piece.nom_composant, params: { project_id: dao.id } }" :statut="statut.is_complete"/> 
      </div>
    </div>
    
</template>

<script> 
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import HeaderDossier from '@/components/HeaderDossier.vue';
import Card from '@/components/Card.vue';
import Loader from '@/components/Loader.vue';
import ProgressBar from '@/components/ProgressBar.vue'; 
import { useAppelOffre } from '@/composables/useAppelOffre';
import { usePiece } from '@/composables/usePiece';

export default {
  components: {
    HeaderDossier,
    Card,
    Loader,
    ProgressBar,
  },

  setup() { 
    const route = useRoute();
    const router = useRouter();
    const dossier = route.params.project_id      //recuperation de l'identifiant du projet
    const dao = ref({}) //INformation sur le DAO encours d'édition
    const pieces = ref([]) //Liste des pieces à editer pour le type de DAO
    const isLoading = ref(true)
    const progression = ref(0) //taux d'éditino du dossier d'appel d'offre
    const piece_remplie = ref(0) //nombre de pièce avec le statut is_complete à true

    const { getDAO } = useAppelOffre()
    const { get_pieces } =  usePiece()

    onMounted(async () => {
      try {
        isLoading.value = true;
        const responseDAO = await getDAO(dossier)
        dao.value = responseDAO[0];  // affectation des données récupérées 
        const responsePiece = await get_pieces(dossier)
        pieces.value = responsePiece 
        
        //Calcule du taux d'édidtion du DAO
        const total = pieces.value.length;
        const completed = pieces.value.filter(p => p.is_complete).length;

        piece_remplie.value = completed;
        progression.value = total > 0 ? Math.round((completed / total) * 100) : 0; 
      } catch (error) {
        console.error("Erreur lors de la récupération du DAO :", error) 
      } finally{
        isLoading.value = false;
      }
    }) 
    return {
      isLoading, 
      dao,
      pieces,
      progression,
    }
  }
}

</script>

<style scoped>
  .card {
    border-radius: 15px;
  }
</style>