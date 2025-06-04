<template>
<li class="list-group-item d-flex align-items-center justify-content-between">
  <div class="d-flex align-items-center">
    <div class="d-flex align-items-center justify-content-center me-3 card-icon">
      <i class="bi bi-file-earmark-text" style="font-size: 22px;"></i>
    </div>
    <h5 class="mb-0 fw-bold me-3 card-title">{{ numero }}.</h5>
    <p class="mb-0">{{ titre }}</p>
  </div>

  <div class="d-flex align-items-center">
    <router-link :to="lien" class="btn btn-custom btn-sm me-2">
      <i class="bi bi-pencil-square me-1"></i> Editer
    </router-link>
    <i v-if="statut" class="bi bi-check-circle-fill text-warning"  title="Pièce remplie" style="font-size: 1.2rem;"></i> 
  </div>
</li>
</template>

<script>
export default {
    props: ['titre', 'numero', 'lien', 'statut'],
}
</script>

<style scoped>
    li {
        border-left:2px solid var(--second); 
        border-radius:15px !important;
    } 
    .card-icon{
        width: 40px; 
        height: 40px; 
        border-radius: 50%; 
        background-color: #f5f5f5;
    }
</style>