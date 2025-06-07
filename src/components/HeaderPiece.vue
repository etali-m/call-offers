<template>
<div class="header-box w-100">
    <div class="d-flex flex-column w-75"> 
        <h4 class="header-box-title mb-0">Dossier d'Appel d'Offre N˚ <router-link :to="{ name:'edit', params:{ project_id: id } }">{{ numero_dossier }}</router-link> </h4>
        <span style="color:#8a4e009c">{{ moe }}</span>
        <span>POUR: {{ description_travaux }}</span> 
    </div>
</div> <br>

</template>

<script>
export default {
    props: ['id', 'numero_dossier', 'moe', 'description_travaux']
}

</script>

<style scoped>
    .header-box {
        max-width: 100%;
        margin: 0 auto;
        padding: 20px;
        padding-left: 30px;
        border-radius: 15px;
        box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
        border: 1px solid  var(--secondary);
        background: white;
    }
    .header-box-title{
        font-size: 22px;
        font-weight: bold;
        color:rgb(51, 51, 51);
    }
</style>