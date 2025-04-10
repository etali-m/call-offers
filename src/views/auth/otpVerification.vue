<template>
    <div class="contenu">
        <div class="container">
            <div class="row">
              <div class="col-md-12 text-center">
                  <div v-if="error" class="alert alert-danger">{{ error }}</div>
                  <img src="@/assets/img/password.png" width="100" height="100" alt="">
                  <h3>Vérification de votre adresse Email</h3>
                  <p>Veillez entrer le code envoyé à votre adresse Email.</p>
                  <div style="display: flex; flex-direction: row; justify-content:center;">
                      <v-otp-input
                          ref="otpInput"
                          input-classes="otp-input"
                          :conditionalClass="['one', 'two', 'three', 'four']"
                          separator=""
                          inputType="letter-numeric"
                          :num-inputs="6"
                          v-model:value="otp_code"
                          :should-auto-focus="true"
                          :should-focus-order="true" 
                      />
                  </div> <br>
                  <button class="btn btn-warning" @click="verifyOtp">Vérifier</button> 
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const otp_code = ref('');
    const email = ref('');
    const error = ref('');
    const route = useRoute();
    const router = useRouter();

    onMounted(() => {
      email.value = route.query.email;
    });

    const verifyOtp = async () => {
      try {
        const response = await axios.post('http://localhost:8000/api/verify-email/', {
          email: email.value,
          otp: otp_code.value
        });
        alert("Email vérifié avec succès");
        router.push({ name: 'login' });
      } catch (err) {
        console.log(err);
        error.value = err.response.data.message;
      }
    };

    return { otp_code, email, error, verifyOtp };
  }
}
</script>


<style>
.contenu{
    height: 100vh;
    width: 100vw;
    background-color: white; 
    padding-top: 60px;
}
.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}
input:focus {
  border:2px solid #f38b04;
  outline: none;
}
/* Background colour of an input field with value */
.otp-input.is-complete {
  background-color: #e4e4e4;
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input::placeholder {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
}
</style>