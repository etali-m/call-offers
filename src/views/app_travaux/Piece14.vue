<template>
    <HeaderPiece numero_piece="14" nom_piece="LISTE DES ORGANISMES HABILITES A EMETTRE DES CAUTIONS DANS LE CADRE DES MARCHES PUBLICS" numero_dossier="0089/AONO/MINEE/CIPM/2024" moe="Ministère de l'eau et de l'energie" description_travaux="TRAVAUX DE CONSTRUCTION DES CANIVEAUX BETONNES DANS LA COMMUNE DE YAOUNDE 4"/>

    <div class="form-container">  
        <div style="padding:0px 100px;">
                <PDF src="/modeles_pieces/LISTE_BANQUES.pdf" />
        </div>
    </div>
</template>

<script setup>
import PDF from "pdf-vue3"; 
import HeaderPiece from '@/components/HeaderPiece.vue'  

</script>
