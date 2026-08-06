<template>
<div class="profile-page">

    <transition name="fade-slide">
        <div v-if="message" class="banner-success mb-3">
            <i class="bi bi-check-circle-fill"></i>
            <b>{{ message }}</b>
        </div>
    </transition>
    <transition name="fade-slide">
        <div v-if="errorMessage" class="banner-error mb-3">
            <i class="bi bi-exclamation-circle-fill"></i>
            <b>{{ errorMessage }}</b>
        </div>
    </transition>

    <div class="row g-4">

        <!-- ===== Colonne profil ===== -->
        <div class="col-md-3">
            <div class="shadow-custom profile-card">
                <div class="profile-avatar-wrap">
                    <img class="profile-avatar"
                         src="@/assets/img/undraw_profile_1.svg" width="84" height="84" alt="Avatar">
                </div>
                <p class="profile-email">{{ email }}</p>

                <ul class="profile-menu">
                    <li class="profile-menu-item">
                        <i class="bi bi-person-circle"></i>
                        Profil
                    </li>
                    <li class="profile-menu-item">
                        <i class="bi bi-credit-card"></i>
                        Abonnement
                    </li>
                    <li class="profile-menu-item">
                        <i class="bi bi-key"></i>
                        Changer le mot de passe
                    </li>
                </ul>
            </div>
        </div>

        <!-- ===== Colonne formulaire ===== -->
        <div class="col-md-9">
            <div class="shadow-custom page-header-card mb-3">
                <div class="page-header-icon">
                    <i class="bi bi-person-gear"></i>
                </div>
                <h4 class="page-header-title">Paramètres utilisateur</h4>
            </div>

            <div class="shadow-custom">
                <form @submit.prevent="handleSubmit" class="profile-form">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="label-custom" for="first_name">Nom</label>
                            <input id="first_name" class="input-custom" type="text" v-model="first_name" placeholder="Etali">
                        </div>
                        <div class="col-md-6">
                            <label class="label-custom" for="last_name">Prénom</label>
                            <input id="last_name" class="input-custom" type="text" v-model="last_name" placeholder="Mathias">
                        </div>
                        <div class="col-md-6">
                            <label class="label-custom" for="phone">Téléphone</label>
                            <vue-tel-input
                                id="phone"
                                v-model="phone_number"
                                defaultCountry="CM"
                                mode="international"
                                :autoFormat="true"
                                :inputOptions="{ placeholder: 'Votre numéro de téléphone' }"
                                styleClasses="custom_phone"
                                @validate="validatePhoneNumber"
                            /> 
                            <small v-if="phoneError" class="error">{{ phoneError }}</small>
                        </div>
                        <div class="col-md-6">
                            <label class="label-custom" for="company">Entreprise</label>
                            <input id="company" class="input-custom" type="text" v-model="company" placeholder="OCTAL GROUP">
                        </div>
                    </div>

                    <div class="d-grid gap-2 mt-4">
                        <button class="btn-custom" type="submit" :disabled="isLoading">
                            <span v-if="isLoading" class="btn-inner">
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
                setTimeout(() => {
                    message.value = "Votre profil a bien été mis à jour !" 
                }, 2000);
                
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
/* ===== Layout général ===== */
.profile-page {
    color: var(--ink);
}

.fade-slide-enter-active, .fade-slide-leave-active {
    transition: opacity 0.18s ease, transform 0.18s ease;
}
.fade-slide-enter-from, .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}

/* ===== Carte profil (colonne gauche) ===== */
.profile-card {
    text-align: center;
    padding: 28px 20px;
}

.profile-avatar-wrap {
    display: flex;
    justify-content: center;
    margin-bottom: 14px;
}
.profile-avatar {
    border-radius: 50%;
    border: 3px solid var(--orange-50);
    background: var(--orange-50);
}

.profile-email {
    font-weight: 700;
    font-size: 13.5px;
    color: var(--ink);
    word-break: break-word;
    margin-bottom: 20px;
}

.profile-menu {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: left;
}
.profile-menu-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 10px;
    font-size: 13.5px;
    font-weight: 600;
    color: var(--ink-soft);
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease;
}
.profile-menu-item i {
    font-size: 15px;
    color: var(--orange-500);
    width: 18px;
    text-align: center;
}
.profile-menu-item:hover {
    background: var(--orange-50);
    color: var(--orange-700);
}

/* ===== En-tête de page ===== */
.page-header-card {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 20px 24px;
}
.page-header-icon {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--orange-50);
    color: var(--orange-600);
    font-size: 18px;
}
.page-header-title {
    margin: 0;
    font-size: 17px;
    font-weight: 700;
    color: var(--ink);
}

/* ===== Formulaire ===== */
.profile-form {
    padding: 4px;
}

.btn-inner {
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

/* ===== vue-tel-input ===== */
.custom_phone {
    border: 1.5px solid var(--line) !important;
    border-radius: 10px !important;
    background: var(--orange-50) !important;
    outline: none !important;
    box-shadow: none !important;
    margin: 10px 0 !important;
    min-height: 44px;
    transition: border-color 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
}

.custom_phone.vue-tel-input:focus-within {
    border-color: var(--orange-500) !important;
    background: var(--white) !important;
    box-shadow: 0 0 0 4px rgba(255, 106, 26, 0.14) !important;
}

::v-deep .vti__input {
    padding: 10px 12px !important;
    background: transparent;
}

::v-deep .vti__dropdown:hover {
    background: var(--orange-100);
}
</style>