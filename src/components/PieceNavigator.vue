<template>
  <div class="piece-navigator">
    <div class="nav-controls">
      <button
        type="button"
        class="nav-btn"
        :class="{ 'nav-btn-disabled': currentIndex === 0 }"
        @click="goToPrevious"
      >
        <i class="bi bi-arrow-left"></i>
        Précédente
      </button>

      <div class="nav-title-wrap">
        <span class="nav-step">Pièce {{ currentIndex + 1 }} / {{ pieces.length }}</span>
        <h5 class="nav-title text-uppercase">{{ currentPiece?.piece?.titre }}</h5>
      </div>

      <button
        type="button"
        class="nav-btn nav-btn-next"
        :class="{ 'nav-btn-disabled': currentIndex === pieces.length - 1 }"
        @click="goToNext"
      >
        Suivante
        <i class="bi bi-arrow-right"></i>
      </button>
    </div>

    <div class="nav-progress">
      <div
        class="nav-progress-fill"
        :style="{ width: (pieces.length ? ((currentIndex + 1) / pieces.length) * 100 : 0) + '%' }"
      ></div>
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
  --ink:        #241505;
  --ink-soft:   #6b5847;
  --orange-50:  #FFF4EC;
  --orange-100: #FFE4D1;
  --orange-500: #FF6A1A;
  --orange-600: #F0560A;
  --orange-700: #C4460A;
  --white:      #FFFFFF;
  --line:       rgba(36, 21, 5, 0.08);

  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  padding: 18px 22px;
  background-color: var(--white);
  border: 1px solid var(--line);
  box-shadow: 0 12px 28px -20px rgba(36, 21, 5, 0.25);
  border-radius: 14px;
}

.nav-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.nav-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px;
  border: 1.5px solid var(--orange-500);
  border-radius: 10px;
  background: var(--white);
  color: var(--orange-600);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s ease, color 0.15s ease;
}
.nav-btn:hover {
  background: var(--orange-500);
  color: var(--white);
}
.nav-btn i {
  font-size: 15px;
}

.nav-btn-disabled {
  opacity: 0.45;
  pointer-events: none;
  border-color: var(--line);
  color: var(--ink-soft);
}

.nav-title-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  min-width: 0;
  text-align: center;
}

.nav-step {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--orange-600);
}

.nav-title {
  margin: 0;
  font-weight: bold;
  color: var(--ink);
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

.nav-progress {
  margin-top: 16px;
  height: 5px;
  border-radius: 999px;
  background: var(--orange-50);
  overflow: hidden;
}
.nav-progress-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--orange-500), var(--orange-600));
  transition: width 0.3s ease;
}

@media (max-width: 640px) {
  .nav-controls {
    flex-wrap: wrap;
    justify-content: center;
  }
  .nav-title-wrap {
    order: -1;
    width: 100%;
  }
  .nav-title {
    white-space: normal;
  }
}
</style>