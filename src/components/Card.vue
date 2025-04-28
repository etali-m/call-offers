<template>
<div class="card"> 
    <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-2">
            <div class="card-icon d-flex align-items-center justify-content-center">
                <i class="bi bi-file-earmark-text" style="font-size: 22px;"></i>
            </div>
            <h5 class="mb-0 fw-bold card-title">{{ numero }}.</h5>
        </div>
        <p class="card-text">{{ titre }}</p> 
        <div class="d-flex justify-content-between align-items-center">
            <router-link :to="lien" class="btn btn-custom btn-sm">
                <i class="bi bi-pencil-square me-1"></i> Editer
            </router-link>
            <i class="bi bi-check-circle-fill text-success ms-2" title="Pièce remplie" style="font-size: 1.2rem;"></i>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['titre', 'numero', 'lien'],
}
</script>

<style scoped>
    .card {
        width: 16.5rem;
        border-top:2px solid var(--second);
    }
    .card-icon{
        width: 40px; 
        height: 40px; 
        border-radius: 50%; 
        background-color: #f5f5f5;
    }
</style>