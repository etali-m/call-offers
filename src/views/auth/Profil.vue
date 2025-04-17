<template>
<div class="row">
    <div v-if="message" class="alert alert-success">
        <b>{{ message }}</b>
    </div>
    <div v-if="errorMessage" class="alert alert-danger">
        <b>{{ errorMessage }}</b>
    </div>
    <div class="col-md-3"> 
        <div class="card shadow-custom mb-4 mt-4">
            <div class="card-body text-center">
                <img class="img-profile rounded-circle"
            src="@/assets/img/undraw_profile_1.svg">
                <span><b>{{ email }}</b></span>
            </div> 
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Abonnement</li>
                <li class="list-group-item">Changer le mot de passe</li> 
            </ul>
        </div>
    </div>
    <div class="col-md-9 card shadow-custom p-4 mb-2 mt-4"> 
        <h3>Paramètres utilisateur</h3>
        <div class="card-body mt-1">
            <form @submit.prevent="handleSubmit"> 
                <div class="row">
                    <div class="col-md-6">
                        <label for=""><b>Nom</b></label>
                        <input type="text" v-model="first_name">
                    </div>
                    <div class="col-md-6">
                        <label for=""><b>Prénom</b></label>
                        <input type="text" v-model="last_name" placeholder="Mathias">
                    </div>
                    <div class="col-md-6">
                        <label for=""><b>Téléphone</b></label>
                        <vue-tel-input
                            v-model="phone_number"
                            defaultCountry="CM"
                            mode="international"
                            :autoFormat="true"
                            :inputOptions="{ placeholder: 'Votre numéro de téléphone' }"
                            styleClasses="custom_phone"
                            @validate="validatePhoneNumber"
                        /> 
                        <small v-if="phoneError" class="text-danger">{{ phoneError }}</small>
                    </div>
                    <div class="col-md-6">
                        <label for=""><b>Entreprise</b></label>
                        <input type="text" v-model="company" placeholder="OCTAL GROUP">
                    </div>
                </div> 
                <div class="d-grid gap-2 mt-5">
                  <button class="btn-custom" type="submit" :disabled="isLoading">
                    <span v-if="isLoading">
                      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Chargement...
                    </span>
                    <span v-else>Enregistrer</span>
                  </button>
                </div> 
            </form>
        </div>
    </div> 
</div>
</template>

<script>
import { VueTelInput } from 'vue-tel-input';
import { ref, onMounted } from 'vue';
import { useProfil } from '@/composables/useProfil'

export default {
    components: {
      VueTelInput,
    },

    setup() {
        const email = ref('')
        const first_name = ref('')
        const last_name = ref('')
        const phone_number = ref('')
        const company = ref('')
        const isLoading = ref(false)
        const message = ref('')
        const errorMessage = ref("");
        const phoneError = ref('')

        const { getProfil, updateProfil } = useProfil()

        //lors du chargement du profil on récupère les informations sur l'utilisateur
        onMounted(async() =>{
            const userData = await getProfil();
            if (userData) {
                email.value = userData.email;
                first_name.value = userData.first_name;
                last_name.value = userData.last_name;
                phone_number.value = userData.phone_number;
                company.value = userData.company;
            }
            getProfil()
        })
        //Valider le numéro de téléphone
        const validatePhoneNumber = (phoneObject) => {
            if (!phoneObject.valid && phone_number.value != '') {
                phoneError.value = 'Numéro de téléphone invalide.';
            } else {
                phoneError.value = '';
            }
        };

        //fonctin pour mettre à jour le profil
        const handleSubmit = async() => {
            isLoading.value = true;
            if (phoneError.value) {
                return; // Ne pas soumettre si le numéro de téléphone est invalide
            }

            try{
                const userData = {
                    email: email.value,
                    first_name: first_name.value,
                    last_name: last_name.value,
                    phone_number: phone_number.value,
                    company: company.value
                }
                const response = await updateProfil(userData)
                if(response.data){
                    setTimeout(() => {
                        message.value = "Votre profil a bien été mis à jour !"
                    }, 5000);
                }
            } catch(error) {
                console.log(error);
                errorMessage.value = "Veuillez réessayer.";
            } finally {
                isLoading.value = false;
            }
            
        }

        return {
            email,
            first_name,
            last_name,
            phone_number,
            company,
            message,
            errorMessage,
            handleSubmit,
            validatePhoneNumber,
            phoneError,
            isLoading
        }

    }
}
</script>

<style scoped>
    .shadow-custom {
        max-width: 100%;
        margin: 0 auto; 
        box-shadow: 1px 2px 3px rgba(50,50,50,0.05);  
    }

    .custom_phone{
        border: none !important;
        border-bottom: 2px solid var(--secondary) !important;
        border-radius: 5px !important;
        outline: none !important;
        box-shadow: none !important; 
        margin: 10px auto !important; 
    }

    ::v-deep .vti__input {
        padding: 10px !important; 
    }

    ::v-deep .vti__input:focus { 
        border-bottom: 2px solid #f38b04;
        background-color: var(--secondary);
    }

    .custom_phone:focus{
        outline: none !important; 
        box-shadow: none !important; 
    }

    input, textarea, select {
        border: 0;
        border-radius: 5px;
        border-bottom: 2px solid var(--secondary);
        padding: 10px;
        outline: none;
        display: block;
        width: 100%;
        box-sizing: border-box;
        margin: 10px auto; 
    }
    select {
        border-radius: 8px;
    }

    input:focus, textarea:focus {  
        border-bottom: 2px solid #f38b04;
        background-color: var(--secondary);
    }

    input[type="file"] {
        border: 0;
        padding: 0;
    }

    label {
        font-size: 13px;
        display: block;
        margin-top: 30px;
    }

    .btn-custom { 
        background: var(--secondary);
        border-radius: 8px;
        border: 0;
        padding: 8px 12px;
        font-weight: 600;
        cursor: pointer;
        display: inline-block;
    }

    .btn-custom:hover{
        background: var(--primary);
        color: white;
    }

    button:disabled {
        opacity: 0.5;
        color: var(--primary);
        background: var(--secondary);
        cursor: not-allowed;
        margin-top: 20px;
    }
</style>