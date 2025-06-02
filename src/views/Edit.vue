<template>
    <HeaderDossier :type_dossier="dao.type_dossier" :passation="dao.mode_passation" :numero_dossier="dao.numero_appel_offre" :ministere="dao.maitre_ouvrage" :description_travaux="dao.objet_appel" :financement="dao.financement" :imputation="dao.imputation"/> 

    <div class="row">
        <div class="col-md-12 d-flex justify-content-end">
            <button class="btn btn-sm btn-success"><i class="bi bi-download"></i> Générer le document</button>
        </div>
    </div>
    <br>
    <div class="row g-2">
        <Card v-for="(piece, index) in pieces" :key="(index)" :titre="piece.titre" :numero="index+1" :lien="{ name: piece.nom_composant, params: { project_id: dao.id } }"/> 
    </div>
</template>

<script> 
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import HeaderDossier from '@/components/HeaderDossier.vue';
import Card from '@/components/Card.vue';
import { useAppelOffre } from '@/composables/useAppelOffre';
import { usePiece } from '@/composables/usePiece';

export default {
  components: {
    HeaderDossier,
    Card,
  },

  setup() {
    const cards = ref([
      { id: 1, title: "Avis D'Appel D'Offres (AAO)", description: "AAO", link: "/formulaire/aao",completed: false },
      { id: 2, title: "Règlement Général de l'Appel d'Offres (RGAO)", description: "RGAO", link: "/formulaire/rgao", completed: false },
      { id: 3, title: "Règlement Particulier de l'Appel d'Offres (RPAO)", description: "RPAO", link: "/formulaire/rpao", completed: false },
      { id: 4, title: "Cahier des Clauses Administratives Particulières (CCAP)", description: "CCAP", link: "/formulaire/ccap", completed: false },
    ])

    const route = useRoute();
    const router = useRouter();
    const dossier = route.params.project_id      //recuperation de l'identifiant du projet
    const dao = ref({})
    const pieces = ref([])
    const numero = ref('')

    const { getDAO } = useAppelOffre()
    const { get_pieces } =  usePiece()

    onMounted(async () => {
      try {
        const responseDAO = await getDAO(dossier)
        dao.value = responseDAO[0];  // affectation des données récupérées 
        const responsePiece = await get_pieces(dao.value.type_marche)
        pieces.value = responsePiece 
 
        console.log(dao.value);
      } catch (error) {
        console.error("Erreur lors de la récupération du DAO :", error) 
      }
    }) 
 

    return {
      cards,
      dao,
      pieces,
    }
  }
}

</script>

<style scoped>
  .card {
    border-radius: 15px;
  }
</style>