<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  totalSteps: {
    type: Number,
    required: true
  }
})

const currentStep = ref(0)

const nextStep = () => {
  if (currentStep.value < props.totalSteps - 1) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const isLastStep = computed(() => currentStep.value === props.totalSteps - 1)
</script>

<template>
  <slot 
    :currentStep="currentStep" 
    :nextStep="nextStep" 
    :prevStep="prevStep" 
    :isLastStep="isLastStep" 
  />
</template>
