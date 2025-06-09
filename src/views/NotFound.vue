<template>
    <div class="justify-content-center align-items-center not-found ">
        <img src="@/assets/img/error-404.png" width="200" height="200" alt="404">
        <h1>Page non trouvée</h1>
        <p>La page que vous cherchez n'existe pas.</p>
        <router-link :to="{ name:'home' }">Retour à l'accueil</router-link>
    </div>
</template>
 

<style scoped>
.not-found {
  text-align: center;
  margin-top: 100px;
}
</style>