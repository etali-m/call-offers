<template>
<nav class="navbar navbar-light bg-white mb-4" style="padding: 15px;"> 
    <a class="navbar-brand d-flex flex-column" style="font-size: 12px;">
        <span>
            Système Informatique de Gestion
        </span>
        <span>
            et d'Elaboration des Dossiers d'Appel d'Offres
        </span>
    </a>
    <div class="d-flex">
        <div class="border-end navbar-user">
            <small>John</small>
        </div> &nbsp;
        <a href=""><i class="bi bi-person-circle navbar-icon"></i></a>
        <!--<a href=""><i class="bi bi-gear navbar-icon"></i></a>-->
    </div> 
</nav> 
</template>

<script>
export default {

}
</script>

<style scoped>
.navbar {
    margin-left: 130px;
    position: fixed;
    top: 0;
    width: calc(100% - 130px);
    background-color: #333;
    color: white;
    z-index: 999;
    padding: 10px;
}

.navbar-icon{
    color:rgb(95, 95, 95);
    font-size: 20px;
    margin-right: 15px;
}

.navbar-user{
    color: var(--second);
    padding-right: 8px;
    display: flex;
    align-items: center;
}
</style>