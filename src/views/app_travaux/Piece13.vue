<template>
    <HeaderPiece numero_piece="13" nom_piece="JUSTIFICATIF DES ETUDES PREALABLES" numero_dossier="0089/AONO/MINEE/CIPM/2024" moe="Ministère de l'eau et de l'energie" description_travaux="TRAVAUX DE CONSTRUCTION DES CANIVEAUX BETONNES DANS LA COMMUNE DE YAOUNDE 4"/>

    <div class="form-container">  
        <div style="padding:0px 100px;">
                <PDF src="/modeles_pieces/VISA_MATURITE_TRAVAUX.pdf" />
        </div>
    </div>
</template>

<script setup>
import PDF from "pdf-vue3"; 
import HeaderPiece from '@/components/HeaderPiece.vue'  

</script>
