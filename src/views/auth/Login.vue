<template>
   <div class="container-fluid vh-100">
        <div class="row h-100">
            <div class="col-md-6 left-section d-flex align-items-center">
                <div class="text-center p-5">
                    <h2>Vous êtes nouveau ?</h2>
                    <p>Créez un compte pour accéder à toutes les fonctionnalités extraordinaires de notre plateforme</p> <br>
                    <router-link class="btn login-link" :to="{ name: 'signup'}">S'inscrire</router-link> 
                </div>
            </div>
            <div class="col-md-6 right-section d-flex align-items-center justify-content-center bg-white">
                 
                <div class="login-form text-center"> 
                    <h2>Tendersuite</h2> <br>
                    <h3>Connexion</h3> 
                    <p>Entrez vos indentifiants pour continuer</p>
                    <form method=""> 
                        <div class="form-group">
                            <input type="email" name="" id="email" class="form-control custom-input" placeholder="Email" required>
                        </div>
                        <div class="form-group">
                            <input type="password" name=" " id="password" class="form-control custom-input" placeholder="Mot de passe" required> 
                        </div>
                        <div class="col-12 text-start">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="gridCheck">
                                <label class="form-check-label" for="gridCheck">
                                Rester connecté
                                </label>
                            </div>
                        </div>
                        <div class="d-grid gap-2 mt-2">
                            <button class="btn signin-link" type="submit">Se connecter</button>
                        </div>
                    </form> 
                </div> 
            </div>
        </div>
    </div>
</template>

<script> 

export default {

}
</script>

<style scoped src="@/assets/css/auth/login.css"></style>
 