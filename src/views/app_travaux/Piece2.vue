<template>
  <Loader v-if="isLoading"/>
  <div v-else>
    <HeaderPiece numero_piece="1" :numero_dossier="dao.numero_appel_offre" :moe="dao.maitre_ouvrage" :description_travaux="dao.objet_appel"/>

  <PieceNavigator 
            :project-id="dao.id"
            :current-piece-name="$route.name"
            />

    <div class="form-container mt-4">  
        <div style="padding:0px 100px;">
              <PDF src="/modeles_pieces/RGPAO_TRAVAUX.pdf" />
        </div>
    </div>
  </div>
  
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Loader from '@/components/Loader.vue';
import PDF from "pdf-vue3"; 
import HeaderPiece from '@/components/HeaderPiece.vue';  
import PieceNavigator from "@/components/PieceNavigator.vue";
import { useAppelOffre } from '@/composables/useAppelOffre';

const route = useRoute();
const router = useRouter();
const dossier = route.params.project_id      //recuperation de l'identifiant du projet
const dao = ref({});
const pieces = ref([]) ;
const isLoading = ref(true);

const { getDAO } = useAppelOffre() 
 

onMounted(async () => {
    try {
        isLoading.value = true;
        const responseDAO = await getDAO(dossier)
        dao.value = responseDAO[0];   
 
    } catch (error) {
        console.error("Erreur lors de la récupération du DAO :", error) 
    } finally{
        isLoading.value = false;
    }
}) 


</script>
