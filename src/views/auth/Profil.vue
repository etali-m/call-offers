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
            src="@/assets/img/undraw_profile_1.svg" width="100" height="100">
                <span><b>{{ email }}</b></span>
            </div> 
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Abonnement</li>
                <li class="list-group-item">Changer le mot de passe</li> 
            </ul>
        </div>
    </div>
    <div class="col-md-9"> 
        <div class="shadow-custom p-3 mb-2 mt-4 d-flex align-items-center justify-content-start" style="height: 90px;">
            <h4 style="color: var(--second)"><b>Paramètres utilisateur</b></h4>
        </div>

        <div class="shadow-custom p-3 mb-2 mt-2">
            <div class="card-body mt-1">
                <form @submit.prevent="handleSubmit"> 
                    <div class="row">
                        <div class="col-md-6">
                            <label class="label-custom" for=""><b>Nom</b></label>
                            <input class="input-custom" type="text" v-model="first_name" placeholder="Etali">
                        </div>
                        <div class="col-md-6">
                            <label class="label-custom" for=""><b>Prénom</b></label>
                            <input class="input-custom" type="text" v-model="last_name" placeholder="Mathias">
                        </div>
                        <div class="col-md-6">
                            <label class="label-custom" for=""><b>Téléphone</b></label>
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
                            <label class="label-custom" for=""><b>Entreprise</b></label>
                            <input class="input-custom" type="text" v-model="company" placeholder="OCTAL GROUP">
                        </div>
                    </div> 
                    <div class="d-grid gap-2 mt-4">
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
</style>