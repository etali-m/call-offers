<template>
  <div v-if="hasErrors" class="error-summary" role="alert">
    <div class="error-summary-header">
      <AlertTriangleIcon :size="18" />
      <span>{{ items.length > 1 || generalError ? 'Corrigez les erreurs suivantes avant d\'enregistrer :' : 'Corrigez l\'erreur suivante avant d\'enregistrer :' }}</span>
    </div>

    <p v-if="generalError" class="error-summary-general">{{ generalError }}</p>

    <ul v-if="items.length" class="error-summary-list">
      <li v-for="item in items" :key="item.field">
        <button
          v-if="item.step !== null"
          type="button"
          class="error-summary-link"
          @click="$emit('jump-to-step', item.step)"
        >
          <strong>{{ item.label }}</strong> — {{ item.message }}
        </button>
        <span v-else><strong>{{ item.label }}</strong> — {{ item.message }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { AlertTriangleIcon } from 'lucide-vue-next'

const props = defineProps({
  // { nomDuChamp: "message" } — typiquement le ref `errors` de useFormErrors()
  errors: {
    type: Object,
    default: () => ({}),
  },
  // Erreur générale (réseau, etc.) — typiquement le ref `generalError` de useFormErrors()
  generalError: {
    type: String,
    default: '',
  },
  // { nomDuChamp: { label: "Libellé lisible", step: 0 } }
  // `step` (index 0-based du StepperForm) est optionnel : si absent, l'entrée n'est pas cliquable.
  fieldMeta: {
    type: Object,
    default: () => ({}),
  },
})

defineEmits(['jump-to-step'])

const items = computed(() => {
  return Object.entries(props.errors).map(([field, message]) => {
    const meta = props.fieldMeta[field]
    return {
      field,
      message,
      label: meta?.label || field,
      step: meta && typeof meta.step === 'number' ? meta.step : null,
    }
  })
})

const hasErrors = computed(() => items.value.length > 0 || !!props.generalError)
</script>

<style scoped>
.error-summary {
  background: #fff5f5;
  border: 1px solid #f5c2c7;
  border-left: 4px solid #dc3545;
  border-radius: 8px;
  padding: 14px 16px;
  margin-bottom: 20px;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

.error-summary-header {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #842029;
  font-weight: 600;
  font-size: 0.92rem;
}

.error-summary-general {
  margin: 8px 0 0 26px;
  color: #842029;
  font-size: 0.88rem;
}

.error-summary-list {
  margin: 8px 0 0;
  padding-left: 26px;
  list-style: disc;
}

.error-summary-list li {
  margin-bottom: 4px;
  font-size: 0.88rem;
  color: #58151c;
}

.error-summary-link {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  color: #58151c;
  text-align: left;
  cursor: pointer;
  text-decoration: underline;
  text-decoration-color: rgba(88, 21, 28, 0.35);
  font-size: inherit;
}

.error-summary-link:hover {
  color: #dc3545;
}
</style>
