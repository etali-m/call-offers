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
                  <input type="text" v-model="first_name" class="form-control auth-input" placeholder="Nom" required>
                  <div v-if="errors.first_name" class="error">{{ errors.first_name[0] }}</div>
                </div>
                <div class="col">
                  <input type="text" v-model="last_name" class="form-control auth-input" placeholder="Prénom" required>
                  <div v-if="errors.last_name" class="error">{{ errors.last_name[0] }}</div>
                </div>
                <div class="col-12">
                  <input type="email" v-model="email" class="form- auth-input" placeholder="Email" required>
                </div>
                <div class="col">
                  <vue-tel-input
                    v-model="phone_number"
                    defaultCountry="CM"
                    :inputOptions="{ placeholder: 'Numéro de téléphone' }"
                    styleClasses="signup__custom_phone"
                    @validate="validatePhoneNumber"
                  />
                  <div v-if="phoneError" class="error">{{ phoneError }}</div>
                </div>
                <div class="col">
                  <input type="text" v-model="company" class="form-control auth-input" placeholder="Entreprise">
                </div>
                <div class="col-12">
                  <input type="password" v-model="password" class="form-control auth-input" placeholder="Mot de passe" required>
                  <span v-if="errors.password" class="error">{{ errors.password2[0] }}</span>
                </div>
                <div class="col-12">
                  <input type="password" v-model="password2" class="form-control auth-input" placeholder="Confirmer mot de passe" @input="checkPasswords" required>
                  <small v-if="passwordMismatch" class="error">Les mots de passe ne correspondent pas.</small>
                  <span v-if="errors.password2" class="error">{{ errors.password2[0] }}</span>
                </div>
                <div class="d-grid gap-2 mt-3">
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
      const phoneError = ref('');

      const router = useRouter();
  
      const { register } = useAuth();
      
      const checkPasswords = () => {
        if (password2.value) {
          passwordMismatch.value = password.value !== password2.value;
        } else {
          passwordMismatch.value = false; // réinitialise si l'utilisateur efface le champ
        }
      };

      const validatePhoneNumber = (phoneObject) => {
          if (!phoneObject.valid) {
              phoneError.value = 'Numéro de téléphone invalide.';
          } else {
              phoneError.value = '';
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
  
<style scoped>
    .left-section { 
        color: white; 
        width: 45%; 
        background-color: #F38B04;  
        background-image: 
            linear-gradient(45deg, rgba(255, 165, 0, 0.1) 50%, transparent 50%),
            linear-gradient(-45deg, rgba(255, 140, 0, 0.15) 50%, transparent 50%),
            linear-gradient(135deg, rgba(255, 120, 0, 0.2) 50%, transparent 50%),
            linear-gradient(-135deg, rgba(255, 100, 0, 0.1) 50%, transparent 50%);
        
        background-size: 
            80px 80px,
            120px 120px,
            160px 160px,
            200px 200px;
        
        background-position: 
            var(--pos-1), 
            var(--pos-2), 
            var(--pos-3), 
            var(--pos-4);
        
        animation: float 25s linear infinite;
        position: relative;
        overflow: hidden;
    }

    .left-section h2 {
        color: #fff;
        text-align: center;
        font-size: 48px;
        font-weight: bolder;
    }

    .right-section { 
        width: 55%;  
        padding: 30px; 

        background-image: 
        /* Cercle petit en haut à gauche */
        radial-gradient(circle at 20% 20%, rgba(243, 139, 4, 0.1) 15%, transparent 15%),
        /* Cercle moyen en bas à droite */
        radial-gradient(circle at 80% 70%, rgba(243, 139, 4, 0.1)  25%, transparent 25%),
        /* Cercle intermédiaire en bas à gauche */
        radial-gradient(circle at 30% 80%, rgba(243, 139, 4, 0.1)  20%, transparent 20%);
      background-repeat: no-repeat;
    }

    .errorlist{
        list-style-type: none !important;
    }

    .right-section h2 { 
        text-align: center;
        font-size: 36px;
        font-weight: bolder;
    }

    .login-form {
        width: 80%;  
    }

    .login-form h2 { 
        margin-bottom: 10px;
        font-weight: bold;
    }

    .login-form p { 
        margin-bottom: 30px;
        font-size: 14px;
    }

    .auth-input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ced4da;
        border-radius: 5px; 
        padding-left: 20px;
        outline: none;   
    }

    .auth-input:focus{ 
        border: 2px solid #F38B04;
        outline: none;
        box-shadow: none;
    }

    .signup__custom_phone:focus {
        outline: none !important;
        box-shadow: none !important;
        border: none !important;
    }

    .login-form .btn-primary {
        width: 100%;
    }

    .login-form .signup-link {
        text-align: center;
    }

    .signin-link{
        background-color: #F38B04;
        color:white;
        border-radius: 5px;
    }

    .login-link{
        background-color: white;
        color:black;
        font-weight: 600;
        border-radius: 30px;
        padding: 8px 25px;
        border:none;
    }

    .login-link:focus{
        outline: none !important;
        box-shadow: none;
    }

    .signin-link:hover{
        color: white;
    }

    .signin-link:focus {
        outline: none !important;
        box-shadow: none;
    }
    
    #msg {
        position:absolute;
        top:20px;
        left: 22%;
        width: 500px;
    }

    input::placeholder,
    textarea::placeholder {
      text-align: left;
      opacity: 1;
    }

    .signup__custom_phone{ 
        border: 2px solid var(--secondary) !important;
        border-radius: 5px !important;
        outline: none !important;
        box-shadow: none !important; 
        margin:0;
    }

    ::v-deep .vti__input {
        padding: 9px !important; 
    } 
</style>
  