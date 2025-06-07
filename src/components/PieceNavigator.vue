<template>
  <div class="piece-navigator">
    <div class="navigation-controls d-flex justify-content-between align-items-center my-3">
      <div class="btn-custom" :class="{ disabled: currentIndex === 0 }" @click="goToPrevious">
        <i class="bi bi-arrow-left-circle"></i> Précédente
      </div>
      <h5 class="text-center text-uppercase title-piece">
        Pièce {{ currentIndex + 1 }} / {{ pieces.length }} :
        {{ currentPiece?.piece?.titre }}
      </h5>
      <div class="btn-custom" :class="{ disabled: currentIndex === pieces.length - 1 }" @click="goToNext">
        Suivante <i class="bi bi-arrow-right-circle"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePiece } from '@/composables/usePiece';

export default {
  name: 'PieceNavigator',
  props: { 
    projectId: {
      type: [String, Number],
      required: true
    },
    currentPieceName: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const router = useRouter();
    const currentIndex = ref(0);
    const pieces = ref([]);

    const { get_pieces } = usePiece();

    onMounted(async () => {
      try {
        const response = await get_pieces(props.projectId);
        pieces.value = response;

        // Une fois les pièces chargées, on met à jour l’index courant
        const index = pieces.value.findIndex(p => p.piece.nom_composant === props.currentPieceName);
        if (index !== -1) currentIndex.value = index;
      } catch (error) {
        console.error("Erreur lors de la récupération des pièces :", error);
      }
    });

    const goToNext = () => {
      if (currentIndex.value < pieces.value.length - 1) {
        const next = pieces.value[currentIndex.value + 1];
        router.push({ name: next.piece.nom_composant, params: { project_id: props.projectId } });
      }
    };

    const goToPrevious = () => {
      if (currentIndex.value > 0) {
        const prev = pieces.value[currentIndex.value - 1];
        router.push({ name: prev.piece.nom_composant, params: { project_id: props.projectId } });
      }
    };

    const currentPiece = computed(() => pieces.value[currentIndex.value]);

    return {
      pieces,
      currentIndex,
      goToNext,
      goToPrevious,
      currentPiece
    };
  }
};
</script>

<style scoped>
.piece-navigator {
  padding: 1rem;
  background-color: #fff;
  box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
  border-radius: 10px;
}
.title-piece {
  font-weight: bold;
  color: var(--second);
}
.btn-custom.disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
