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

                    <!-- Afficher les erreurs --> 

                    <div v-if="error" class="error">{{ error }}</div>

                    <form @submit.prevent="handleSubmit"> 
                        <div class="row gy-3">
                            <div class="col-12">
                                <input type="email" v-model="email" class="form-control auth-input" placeholder="Email" required>
                            </div>
                            <div class="col-12">
                                <input type="password" v-model="password" class="form-control auth-input" placeholder="Mot de passe" required> 
                            </div> 
                            <div class="col-12 d-flex justify-content-between">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="gridCheck">
                                    <label class="form-check-label" for="gridCheck">
                                        Rester connecté
                                    </label>
                                </div>
                                <div>
                                    <a href="#">mot de passe oublié ?</a>
                                </div>
                            </div>
                            <div class="d-grid gap-2 mt-2">
                                <button class="btn signin-link" type="submit">
                                    <span v-if="isLoading">
                                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        Chargement...
                                    </span>
                                    <span v-else>
                                        Se connecter
                                    </span>
                                </button>
                            </div>
                        </div> 
                    </form> 
                </div> 
            </div>
        </div>
    </div>
</template>

<script> 
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

export default {
    setup() {
        const email = ref('');
        const password = ref(''); 
        const error = ref('');
        const isLoading = ref(false);

        const router = useRouter();
        const { login } = useAuth();

        const handleSubmit = async () => { 
            isLoading.value = true;

            if (!email.value || !password.value){ 
                error.value = "Veillez renseigner votre e-mail et votre mot de passe";
                return;
            }

            try {
                const userData = {
                    email: email.value,
                    password: password.value
                };
                const response = await login(userData)
                //rediriger vers la page d'acceuil
                router.push({ name:'home'});
            } catch (err) {  

                if (err?.value?.detail) {
                    error.value = err.value.detail; // Pour afficher "Invalide credential ! try again"
                } else if (err?.detail) {
                    error.value = err.detail;
                } else {
                    error.value = "Une erreur est survenue. Veuillez réessayer.";
                }
 
            } finally {
                isLoading.value = false; //
            }

        };

        return {
            email,
            password,
            handleSubmit,
            isLoading,
            error, 
        }
    }
}
</script>

<style scoped src="@/assets/css/auth/login.css"></style>
 