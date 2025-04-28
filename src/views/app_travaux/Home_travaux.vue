<template>
    <HeaderDossier titre_dossier="Dossier d'appel d'offre national ouvert" numero_dossier="0089/AONO/MINEE/CIPM/2024" ministere="Ministère de l'eau et de l'energie" description_travaux="TRAVAUX DE CONSTRUCTION DES CANIVEAUX BETONNES DANS LA COMMUNE DE YAOUNDE 4" financement="Banque mondiale" imputation="1458 0125 2568"/> 

    <div class="row">
        <div class="col-md-12 d-flex justify-content-end">
            <button class="btn btn-sm btn-success"><i class="bi bi-download"></i> Générer le document</button>
        </div>
    </div>
    <br>
    <div class="row g-2">
        <Card v-for="card in cards" :key="card.id" :titre="card.title" :numero="card.id"/> 
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import HeaderDossier from '@/components/HeaderDossier.vue';
import Card from '@/components/Card.vue';

export default {
  components: {
    HeaderDossier,
    Card,
  },
  setup() {
    const cards = ref([
      { id: 1, title: "Avis D'Appel D'Offres (AAO)", description: "AAO", link: "/formulaire/aao", completed: false },
      { id: 2, title: "Règlement Général de l'Appel d'Offres (RGAO)", description: "RGAO", link: "/formulaire/rgao", completed: false },
      { id: 3, title: "Règlement Particulier de l'Appel d'Offres (RPAO)", description: "RPAO", link: "/formulaire/rpao", completed: false },
      { id: 4, title: "Cahier des Clauses Administratives Particulières (CCAP)", description: "CCAP", link: "/formulaire/ccap", completed: false },
      { id: 5, title: "Cahier des Clauses Techniques Particulières (CCTP)", description: "", link: "/formulaire/cctp", completed: false },
      { id: 6, title: "Cadre du bordereau des prix unitaires", description: " ", link: "/formulaire/bpu", completed: false },
      { id: 7, title: "Cadre du détail quantitatif et estimatif", description: "", link: "/formulaire/dqe", completed: false },
      { id: 8, title: "Cadre du sous-détail des prix", description: "", link: "/formulaire/sdp", completed: false },
      { id: 9, title: "Modèle de marché", description: "", link: "/formulaire/mem", completed: false },
      { id: 10, title: "Modèles ou formulaires types des pièces à utiliser par les Soumissionnaires", description: "", link: "/formulaire/modeles", completed: false },
      { id: 11, title: "Le formulaire de la Charte d’Intégrité", description: "", link: "/formulaire/charte-integrite", completed: false },
      { id: 12, title: "Le formulaire de la Déclaration d’engagement social et Environnemental", description: "", link: "/formulaire/engagement-social", completed: false },
      { id: 13, title: "Le Visa de maturité ou Justificatifs des études préalables", description: "", link: "/formulaire/visa-maturite", completed: false },
      { id: 14, title: "La Liste des établissements bancaires et organismes habilités à émettre des cautions dans le cadre des Marchés Publics.", description: "", link: "/formulaire/listes-banques", completed: false },
    ])

    return {
      cards,
    }
  }
}

</script>

<style scoped>
  .card {
    border-radius: 15px;
  }
</style>