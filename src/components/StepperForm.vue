<template> 
  <ul class="timeline">
    <li 
      v-for="n in totalSteps" 
      :key="n" 
      :class="{ active: currentStep === n - 1 }"
      @click="handleStep(n)"
    >
      <span>{{ n }}</span>
    </li>
  </ul>

  <div class="shadow-custom mt-4 p-4">
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
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 20px 0;
  position: relative;
}

.timeline li {
  position: relative;
  flex: 1;
  text-align: center;
  cursor: pointer;
}

.timeline li::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  height: 2px;
  width: 100%;
  background: #ccc;
  z-index: 0;
  transform: translateY(-50%);
}

.timeline li:first-child::before {
  width: 50%;
  left: 50%;
}

.timeline li:last-child::before {
  width: 50%;
}

.timeline li span {
  display: inline-block;
  width: 35px;
  height: 35px;
  line-height: 35px;
  border-radius: 50%;
  background: #ddd;
  font-weight: bold;
  color: #333;
  z-index: 1;
  position: relative;
}

.timeline li.active span {
  background: #ffb800;
  color: white;
  transform: scale(1.1);
  box-shadow: 0 0 8px #ffb7007e;
}
</style>
