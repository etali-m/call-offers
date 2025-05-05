import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue from 'vue'


//importation des fichiers necessaires pour boostrap 
import './assets/css/bootstrap/bootstrap.css'
import './assets/js/bootstrap.bundle.min.js' 

//style globale utilisé dans l'application
import './assets/css/main.css'
import './assets/css/style.css'

//rich texte-editor component

//phone number package
import VueTelInput from 'vue3-tel-input'
import VOtpInput from 'vue3-otp-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'

const app = createApp(App)
app.use(VueTelInput)
app.component('v-otp-input', VOtpInput) 

app.use(router).mount('#app')
