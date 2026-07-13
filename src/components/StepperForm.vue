<template>
  <ul class="timeline">
    <li
      v-for="n in totalSteps"
      :key="n"
      class="timeline-step"
      :class="{ active: currentStep === n - 1, 'timeline-completed': n - 1 < currentStep }"
      @click="handleStep(n)"
    >
      <span class="step-circle">
        <i v-if="n - 1 < currentStep" class="bi bi-check-lg"></i>
        <template v-else>{{ n }}</template>
      </span>
    </li>
  </ul>

  <div class="step-panel mt-4 p-4">
    <slot
      :currentStep="currentStep"
      :nextStep="nextStep"
      :prevStep="prevStep"
      :isLastStep="isLastStep"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  totalSteps: {
    type: Number,
    required: true
  }
})

const currentStep = ref(0)

const handleStep = (n) => {
  currentStep.value = n-1
}

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

<style scoped>
.timeline {
  --ink:        #241505;
  --ink-soft:   #6b5847;
  --orange-50:  #FFF4EC;
  --orange-100: #FFE4D1;
  --orange-500: #FF6A1A;
  --orange-600: #F0560A;
  --line:       rgba(36, 21, 5, 0.08);

  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 20px 0;
  position: relative;
}

.timeline-step {
  position: relative;
  flex: 1;
  text-align: center;
  cursor: pointer;
}

.timeline-step::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  height: 2px;
  width: 100%;
  background: var(--line);
  z-index: 0;
  transform: translateY(-50%);
  transition: background 0.2s ease;
}

.timeline-step:first-child::before {
  width: 50%;
  left: 50%;
}

.timeline-step:last-child::before {
  width: 50%;
}

.timeline-step.timeline-completed::before,
.timeline-step.active::before {
  background: var(--orange-500);
}

.step-circle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--orange-50);
  border: 1.5px solid var(--line);
  font-weight: 700;
  font-size: 13px;
  color: var(--ink-soft);
  z-index: 1;
  position: relative;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.timeline-step.timeline-completed .step-circle {
  background: var(--orange-500);
  border-color: var(--orange-500);
  color: #fff;
  font-size: 15px;
}

.timeline-step.active .step-circle {
  background: var(--orange-600);
  border-color: var(--orange-600);
  color: #fff;
  transform: scale(1.12);
  box-shadow: 0 0 0 5px var(--orange-100);
}

.step-panel {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 14px;
  box-shadow: 0 12px 28px -20px rgba(36, 21, 5, 0.25);
}
</style>