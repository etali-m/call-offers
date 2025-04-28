<template>
<div class="header-box w-100">
    <div class="d-flex flex-column w-80">
        <h4 class="header-box-title mb-0">{{ titre_dossier }}</h4>
        <h4 class="header-box-title mb-0">N˚{{ numero_dossier }}</h4>
        <span style="color:#8a4e009c">{{ ministere }}</span>
        <span>POUR: {{ description_travaux }}</span>
        <div class=""> 
            <b>Financement</b> : {{ financement }} &nbsp;&nbsp;
            <b>Imputation</b> : {{ imputation }}
        </div>
    </div>
</div> <br>

</template>

<script>
export default {
    props: ['titre_dossier', 'numero_dossier', 'ministere', 'description_travaux', 'financement', 'imputation'],
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