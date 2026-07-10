<template>
    <div class="progress-wrap">
        <div class="progress-top" v-if="label">
            <span class="progress-label">{{ label }}</span>
            <span class="progress-value">{{ percentage }}%</span>
        </div>

        <div
            class="progress-track"
            role="progressbar"
            :aria-valuenow="percentage"
            aria-valuemin="0"
            aria-valuemax="100"
        >
            <div class="progress-fill" :style="{ width: percentage + '%' }">
                <span v-if="!label" class="progress-fill-value">{{ percentage }}%</span>
            </div>
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
    },
    label: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.progress-wrap {
    --ink:        #241505;
    --ink-soft:   #6b5847;
    --orange-50:  #FFF4EC;
    --orange-500: #FF6A1A;
    --orange-600: #F0560A;
    --white:      #FFFFFF;

    width: 100%;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.progress-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
}
.progress-label {
    font-size: 13px;
    font-weight: 600;
    color: var(--ink);
}
.progress-value {
    font-size: 13px;
    font-weight: 700;
    color: var(--orange-600);
}

.progress-track {
    position: relative;
    width: 100%;
    height: 20px;
    border-radius: 999px;
    background: var(--orange-50);
    overflow: hidden;
}

.progress-fill {
    position: relative;
    height: 100%;
    min-width: 10px;
    border-radius: 999px;
    background: linear-gradient(90deg, var(--orange-500), var(--orange-600));
    transition: width 0.4s ease;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

/* variante sans label : le pourcentage s'affiche dans la barre quand elle est assez large */
.progress-fill-value {
    font-size: 10.5px;
    font-weight: 700;
    color: var(--white);
    padding-right: 8px;
    white-space: nowrap;
}
</style>