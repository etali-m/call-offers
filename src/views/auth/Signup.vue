<template>
    <div class="container-fluid vh-100">
      <div class="row h-100">
        <div class="col-md-6 right-section d-flex align-items-center justify-content-center bg-white">
          <div class="login-form text-center">
            <h2>Bienvenu sur Tendersuite</h2> <br>
            <h3>Inscription</h3>
            <p>Remplissez le formulaire avec vos informations</p>
            <p v-if="error">{{ error }}</p>
            <form @submit.prevent="handleRegister">
              <div class="row g-2">
                <div class="col">
                  <input type="text" v-model="first_name" class="form-control custom-input" placeholder="Nom" required>
                </div>
                <div class="col">
                  <input type="text" v-model="last_name" class="form-control custom-input" placeholder="Prénom" required>
                </div>
                <div class="col-12">
                  <input type="email" v-model="email" class="form-control custom-input" placeholder="Email" required>
                </div>
                <div class="col">
                  <vue-tel-input
                    v-model="phone_number"
                    defaultCountry="CM"
                    :inputOptions="{ placeholder: 'Votre numéro de téléphone' }"
                  />
                </div>
                <div class="col">
                  <input type="text" v-model="company" class="form-control custom-input" placeholder="Entreprise" required>
                </div>
                <div class="col-12">
                  <input type="password" v-model="password" class="form-control custom-input" placeholder="Mot de passe" required>
                </div>
                <div class="col-12">
                  <input type="password" v-model="password2" class="form-control custom-input" placeholder="Confirmer mot de passe" required>
                </div>
                <div class="d-grid gap-2">
                  <button class="btn signin-link" type="submit">S'inscrire</button>
                </div>
              </div>
            </form>
            <div class="signup-link mt-2">
              <p>Vous avez déjà un compte ? <router-link :to="{ name: 'login' }">Connectez-vous</router-link></p>
            </div>
          </div>
        </div>
        <div class="col-md-6 left-section d-flex align-items-center justify-content-center">
          <img src="@/assets/img/login-image.png" alt="" width="350" height="350">
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { VueTelInput } from 'vue-tel-input';
  import { ref } from 'vue';
  import { useAuth } from '@/composables/useAuth';
  
  export default {
    components: {
      VueTelInput,
    },
  
    setup() {
      const first_name = ref('');
      const last_name = ref('');
      const email = ref('');
      const phone_number = ref('');
      const company = ref('');
      const password = ref('');
      const password2 = ref('');
      const error = ref('');
  
      const { register } = useAuth();
  
      const handleRegister = async () => {
        if (!first_name.value || !last_name.value || !email.value || !phone_number.value || !password.value || !password2.value) {
            error.value = 'Tous les champs sont requis';
            return;
        }

        // Vérification de la correspondance des mots de passe
        if (password.value !== password2.value) {
            error.value = 'Les mots de passe ne correspondent pas';
            return;
        }

        try {
          const userData = {
            first_name: first_name.value,
            last_name: last_name.value,
            email: email.value,
            phone_number: phone_number.value,
            company: company.value,
            password: password.value,
            password2: password2.value
          };
          await register(userData);
          // Rediriger ou afficher un message de succès
        } catch (err) {
            if (err.response && err.response.data) {
            // Afficher les erreurs retournées par le serveur
                if (typeof err.response.data === 'string') {
                    error.value = err.response.data;
                } else {
                    error.value = Object.values(err.response.data).flat().join(' ');
                }
            } else {
                error.value = 'Une erreur est survenue';
            }
        }
      };
  
      return {
        first_name,
        last_name,
        email,
        phone_number,
        company,
        password,
        password2,
        error,
        handleRegister,
      };
    }
  };
  </script>
  
  <style scoped src="@/assets/css/auth/login.css"></style>
  