<template>
    <div class="progress" style="height: 25px; width:100%">
      <div
        class="progress-bar bg-warning"
        role="progressbar"
        :style="{ width: percentage + '%' }"
        :aria-valuenow="percentage"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {{ percentage }}%
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProgressBar',
    props: {
      percentage: {
        type: Number,
        required: true,
        validator: value => value >= 0 && value <= 100
      }
    }
  }
  </script>
  