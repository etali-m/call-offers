<template>
  <div class="auth-root">

    <div class="bg-grid"></div>
    <div class="bg-orb orb-1"></div>
    <div class="bg-orb orb-2"></div>

    <div class="auth-wrapper">

      <!-- ── Panneau gauche ── -->
      <div class="left-panel">

        <div class="brand">
          <span class="brand-dot"></span>
          <span class="brand-name">Tendersuite</span>
        </div>

        <div class="left-content">
          <div class="badge-pill">Plateforme N°1 en Afrique Centrale</div>

          <h1 class="left-title">
            Gérez vos dossiers d'appels<br>d'offres <em>sans effort</em>
          </h1>
          <p class="left-sub">
            Générez, organisez et téléchargez vos dossiers complets en quelques clics.
          </p>

          <div class="stat-row">
            <div class="stat">
              <span class="stat-num">2 400+</span>
              <span class="stat-label">Dossiers générés</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-num">98 %</span>
              <span class="stat-label">Satisfaction</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-num">150+</span>
              <span class="stat-label">Entreprises</span>
            </div>
          </div>
        </div>

        <div class="left-footer">
          <span>Pas encore de compte ?</span>
          <router-link :to="{ name: 'signup' }" class="signup-link">
            Créer un compte →
          </router-link>
        </div>

      </div>

      <!-- ── Panneau droit ── -->
      <div class="right-panel">
        <div class="form-card">

          <div class="form-header">
            <h2 class="form-title">Bon retour 👋</h2>
            <p class="form-sub">Connectez-vous à votre espace de travail</p>
          </div>

          <transition name="fade-slide">
            <div v-if="error" class="error-banner">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7.5" stroke="currentColor"/>
                <path d="M8 4.5v4M8 10.5v1" stroke="currentColor" stroke-linecap="round"/>
              </svg>
              {{ error }}
            </div>
          </transition>

          <form @submit.prevent="handleSubmit" class="auth-form">

            <div class="field-group">
              <label class="field-label">Adresse e-mail</label>
              <div class="field-wrap">
                <svg class="field-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m2 7 10 7 10-7"/>
                </svg>
                <input
                  type="email"
                  v-model="email"
                  class="field-input"
                  placeholder="vous@exemple.com"
                  required
                  autocomplete="email"
                />
              </div>
            </div>

            <div class="field-group">
              <div class="field-top-row">
                <label class="field-label">Mot de passe</label>
                <a href="#" class="forgot-link">Oublié ?</a>
              </div>
              <div class="field-wrap">
                <svg class="field-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <rect x="5" y="11" width="14" height="10" rx="2"/>
                  <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
                </svg>
                <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="password"
                  class="field-input"
                  placeholder="••••••••"
                  required
                  autocomplete="current-password"
                />
                <button type="button" class="toggle-pw" @click="showPassword = !showPassword">
                  <svg v-if="!showPassword" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                </button>
              </div>
            </div>

            <div class="remember-row">
              <label class="checkbox-label">
                <input type="checkbox" v-model="rememberMe" class="checkbox-input" />
                <span class="checkbox-custom"></span>
                Rester connecté
              </label>
            </div>

            <button
              type="submit"
              class="submit-btn"
              :disabled="isLoading"
            >
              <span v-if="isLoading" class="btn-inner">
                <span class="spinner"></span>
                Connexion en cours…
              </span>
              <span v-else class="btn-inner">
                Se connecter
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </button>

          </form>

          <p class="form-footer-note">
            En vous connectant, vous acceptez nos
            <a href="#">Conditions</a> et notre <a href="#">Politique de confidentialité</a>.
          </p>

        </div>
      </div>

    </div>
  </div>
</template> 


<script>
import '@/assets/css/auth/login.css'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default {
  setup() {
    const email        = ref('')
    const password     = ref('')
    const error        = ref('')
    const isLoading    = ref(false)
    const rememberMe   = ref(false)
    const showPassword = ref(false)

    const router = useRouter()
    const { login } = useAuth()

    const handleSubmit = async () => {
      isLoading.value = true
      error.value = ''

      if (!email.value || !password.value) {
        error.value = 'Veuillez renseigner votre e-mail et votre mot de passe.'
        isLoading.value = false
        return
      }

      try {
        await login({ email: email.value, password: password.value })
        toast.success('Connexion réussie', { theme: 'colored', autoClose: 2000 })
        router.push({ name: 'home' })
      } catch (err) {
        if (err?.value?.detail)  error.value = err.value.detail
        else if (err?.detail)    error.value = err.detail
        else                     error.value = 'Une erreur est survenue. Veuillez réessayer.'
      } finally {
        isLoading.value = false
      }
    }

    return { email, password, error, isLoading, rememberMe, showPassword, handleSubmit }
  }
}
</script>


