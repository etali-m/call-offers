<template>
    <div class="container-fluid vh-100">
      <div class="row h-100">
        <div class="col-md-6 right-section d-flex align-items-center justify-content-center bg-white">
          <div class="login-form text-center">
            <h2>Bienvenu sur Tendersuite</h2> <br>
            <h3>Inscription</h3>
            <p>Remplissez le formulaire avec vos informations</p>

            <div v-if="message" class="alert alert-success">
              {{ message }}
            </div>
            <!-- Liste des erreurs -->
            <div v-if="errors.non_field_errors" class="col-12 error">
                {{ errors.non_field_errors[0] }}
            </div>
            <div v-if="errors.email" class="error">{{ errors.email[0] }}</div>

            <form @submit.prevent="handleRegister">
              <div class="row g-2">
                <div class="col">
                  <input type="text" v-model="first_name" class="form-control custom-input" placeholder="Nom" required>
                  <div v-if="errors.first_name" class="error">{{ errors.first_name[0] }}</div>
                </div>
                <div class="col">
                  <input type="text" v-model="last_name" class="form-control custom-input" placeholder="Prénom" required>
                  <div v-if="errors.last_name" class="error">{{ errors.last_name[0] }}</div>
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
                  <div v-if="errors.phone_number" class="error">{{ errors.phone_number[0] }}</div>
                </div>
                <div class="col">
                  <input type="text" v-model="company" class="form-control custom-input" placeholder="Entreprise">
                </div>
                <div class="col-12">
                  <input type="password" v-model="password" class="form-control custom-input" placeholder="Mot de passe" required>
                  <span v-if="errors.password" class="error">{{ errors.password2[0] }}</span>
                </div>
                <div class="col-12">
                  <input type="password" v-model="password2" class="form-control custom-input" placeholder="Confirmer mot de passe" @input="checkPasswords" required>
                  <small v-if="passwordMismatch" class="error">Les mots de passe ne correspondent pas.</small>
                  <span v-if="errors.password2" class="error">{{ errors.password2[0] }}</span>
                </div>
                <div class="d-grid gap-2">
                  <button class="btn signin-link" type="submit" :disabled="isLoading">
                    <span v-if="isLoading">
                      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Chargement...
                    </span>
                    <span v-else>S'inscrire</span>
                  </button>
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
  import { useRouter } from 'vue-router';
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
      const passwordMismatch = ref(false);
      const errors = ref({}); 
      const message = ref(''); //message d'inscription réussi
      const isLoading = ref(false);

      const router = useRouter();
  
      const { register } = useAuth();
      
      const checkPasswords = () => {
        if (password2.value) {
          passwordMismatch.value = password.value !== password2.value;
        } else {
          passwordMismatch.value = false; // réinitialise si l'utilisateur efface le champ
        }
      };

      const handleRegister = async () => {
        errors.value = {}
        isLoading.value = true;

        if (!first_name.value || !last_name.value || !email.value || !phone_number.value || !password.value || !password2.value) {
            error.value = 'Tous les champs sont requis';
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
          const response = await register(userData);
          
          message.value = response.message ;
          setTimeout(() => {
            router.push({ name: 'otp-verification', query: { email: userData.email} });
          }, 3000);
        } catch (err) {
          console.log(err);  
          errors.value = err;
        }finally {
          isLoading.value = false; //
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
        errors, 
        passwordMismatch,
        checkPasswords,
        isLoading,
        message,
        handleRegister,
      };
    }
  };
</script>
  
<style scoped src="@/assets/css/auth/login.css"></style>
  