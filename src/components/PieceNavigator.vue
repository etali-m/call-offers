<template>
  <div class="piece-navigator">
    <div class="navigation-controls d-flex justify-content-between align-items-center my-3">
      <div class="btn-custom" :disabled="currentIndex === 0" @click="goToPrevious"><i class="bi bi-arrow-left-circle"></i> Précédente</div>
      <h5 class="text-uppercase title-piece">Pièce {{ currentIndex + 1 }} / {{ pieces.length }} : {{ currentPiece?.piece.titre }}</h5>
      <div class="btn-custom" :disabled="currentIndex === pieces.length - 1" @click="goToNext">Suivante <i class="bi bi-arrow-right-circle"></i></div>
    </div>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'PieceNavigator',
  props: {
    pieces: {
      type: Array,
      required: true
    },
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

    // Met à jour currentIndex quand le composant actif change
    watch(() => props.currentPieceName, (newVal) => {
      const index = props.pieces.findIndex(p => p.piece.nom_composant === newVal);
      if (index !== -1) currentIndex.value = index;
    }, { immediate: true });

    const goToNext = () => {
      if (currentIndex.value < props.pieces.length - 1) {
        const next = props.pieces[currentIndex.value + 1];
        router.push({ name: next.piece.nom_composant, params: { project_id: props.projectId } });
      }
    };

    const goToPrevious = () => {
      if (currentIndex.value > 0) {
        const prev = props.pieces[currentIndex.value - 1];
        router.push({ name: prev.piece.nom_composant, params: { project_id: props.projectId } });
      }
    };

    const currentPiece = computed(() => props.pieces[currentIndex.value]);

    return {
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
  box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
  border-radius: 10px;
}
.title-piece{
  font-weight: bold;
  color: var(--second);
}
</style>
