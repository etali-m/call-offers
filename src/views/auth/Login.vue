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

          <div class="doc-panel">
            <div class="doc-card doc-1">
              <span class="doc-corner"></span>
              <span class="doc-line w-70"></span>
              <span class="doc-line w-45"></span>
              <span class="doc-line w-60"></span>
              <span class="doc-line w-30"></span>
              <span class="doc-tag">Cahier des charges</span>
            </div>

            <div class="doc-card doc-2">
              <span class="doc-corner"></span>
              <span class="doc-line w-60"></span>
              <span class="doc-line w-80"></span>
              <span class="doc-line w-40"></span>
              <span class="doc-tag doc-tag-alt">AO N°2024-158</span>
            </div>

            <div class="doc-badge doc-3">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Dossier complet
            </div>

            <svg class="doc-folder" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
              <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/>
            </svg>
          </div>

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


<style scoped>
/* ============ Tokens ============ */
.auth-root {
  --ink:        #241505;
  --ink-soft:   #6b5847;
  --orange-50:  #FFF4EC;
  --orange-100: #FFE4D1;
  --orange-500: #FF6A1A;
  --orange-600: #F0560A;
  --orange-700: #C4460A;
  --cream:      #FFFAF6;
  --white:      #FFFFFF;
  --line:       rgba(36, 21, 5, 0.08);
  --shadow-card: 0 30px 60px -20px rgba(196, 70, 10, 0.35), 0 10px 24px -12px rgba(36, 21, 5, 0.12);

  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: stretch;
  justify-content: center;
  background: var(--orange-600);
  overflow: hidden;
  box-sizing: border-box;
}

*, *::before, *::after { box-sizing: border-box; }

/* ============ Ambient background ============ */
.bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--line) 1px, transparent 1px),
    linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 40%, black 20%, transparent 80%);
  pointer-events: none;
}

.bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  opacity: 0.55;
}
.orb-1 {
  width: 480px;
  height: 480px;
  top: -160px;
  left: -140px;
  background: radial-gradient(circle at 30% 30%, var(--orange-500), transparent 70%);
}
.orb-2 {
  width: 420px;
  height: 420px;
  bottom: -180px;
  right: -120px;
  background: radial-gradient(circle at 60% 60%, #FFB199, transparent 70%);
}

/* ============ Shell ============ */
.auth-wrapper {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  background:
    radial-gradient(120% 140% at 15% 0%, rgba(255,255,255,0.16), transparent 55%),
    linear-gradient(160deg, var(--orange-500) 0%, var(--orange-600) 55%, var(--orange-700) 100%);
  overflow: hidden;
}

/* ============ Left panel ============ */
.left-panel {
  position: relative;
  padding: 56px clamp(48px, 6vw, 96px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: var(--white); 
  background: transparent;
}
.left-panel::after {
  content: "";
  position: absolute;
  right: -120px;
  bottom: -140px;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  background: rgba(255,255,255,0.08);
}
.left-panel::before {
  content: "";
  position: absolute;
  left: -80px;
  top: 45%;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.18);
}

.brand {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 9px;
}
.brand-dot {
  width: 10px;
  height: 10px;
  border-radius: 3px;
  background: var(--white);
  box-shadow: 0 0 0 4px rgba(255,255,255,0.22);
}
.brand-name {
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0.01em;
}

.left-content {
  position: relative;
  z-index: 1;
  margin: auto 0;
}

.badge-pill {
  display: inline-block;
  padding: 7px 14px;
  border-radius: 999px;
  background: rgba(255,255,255,0.16);
  border: 1px solid rgba(255,255,255,0.28);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  margin-bottom: 22px;
  backdrop-filter: blur(6px);
}

.left-title {
  font-size: 34px;
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin: 0 0 14px;
}
.left-title em {
  font-style: normal;
  position: relative;
  white-space: nowrap;
}
.left-title em::after {
  content: "";
  position: absolute;
  left: -2px;
  right: -2px;
  bottom: 3px;
  height: 9px;
  background: rgba(255,255,255,0.28);
  border-radius: 4px;
  z-index: -1;
}

.left-sub {
  font-size: 15px;
  line-height: 1.6;
  color: rgba(255,255,255,0.85);
  max-width: 380px;
  margin: 0 0 34px;
}

/* ============ Documents illustration ============ */
.doc-panel {
  position: relative;
  height: 190px;
  margin: 8px 0 34px;
}

.doc-card {
  position: absolute;
  width: 148px;
  padding: 14px 14px 40px;
  background: var(--white);
  border-radius: 10px;
  box-shadow: 0 20px 34px -14px rgba(36, 21, 5, 0.35);
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.doc-corner {
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 16px 16px 0;
  border-color: transparent var(--orange-100) transparent transparent;
}
.doc-line {
  display: block;
  height: 6px;
  border-radius: 3px;
  background: var(--orange-100);
}
.doc-line.w-70 { width: 70%; }
.doc-line.w-80 { width: 80%; }
.doc-line.w-60 { width: 60%; }
.doc-line.w-50 { width: 50%; }
.doc-line.w-45 { width: 45%; }
.doc-line.w-40 { width: 40%; }
.doc-line.w-30 { width: 30%; background: var(--orange-500); }

.doc-tag {
  position: absolute;
  left: 14px;
  bottom: 12px;
  font-size: 10.5px;
  font-weight: 700;
  color: var(--orange-700);
  background: var(--orange-50);
  padding: 4px 8px;
  border-radius: 6px;
  white-space: nowrap;
}
.doc-tag-alt { color: var(--orange-600); }

.doc-1 {
  top: 6px;
  left: 6px;
  transform: rotate(-7deg);
  z-index: 1;
}
.doc-2 {
  top: 30px;
  left: 128px;
  transform: rotate(5deg);
  z-index: 2;
}

.doc-badge {
  position: absolute;
  bottom: 6px;
  left: 46px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 12px;
  background: var(--white);
  color: var(--orange-700);
  font-size: 11.5px;
  font-weight: 700;
  border-radius: 999px;
  box-shadow: 0 14px 24px -10px rgba(36, 21, 5, 0.35);
  transform: rotate(-3deg);
  z-index: 3;
}
.doc-badge svg { flex-shrink: 0; color: var(--orange-500); }

.doc-folder {
  position: absolute;
  top: 22px;
  right: 18px;
  color: rgba(255,255,255,0.5);
  transform: rotate(8deg);
}

.stat-row {
  display: flex;
  align-items: center;
  gap: 18px;
}
.stat {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.stat-num {
  font-size: 20px;
  font-weight: 700;
}
.stat-label {
  font-size: 11.5px;
  color: rgba(255,255,255,0.75);
}
.stat-divider {
  width: 1px;
  height: 30px;
  background: rgba(255,255,255,0.25);
}

.left-footer {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13.5px;
  color: rgba(255,255,255,0.85);
}
.signup-link {
  color: var(--white);
  font-weight: 700;
  text-decoration: none;
}
.signup-link:hover { text-decoration: underline; }

/* ============ Right panel ============ */
.right-panel {
  display: flex;
  align-items: center;
  justify-content: center; 
  padding: 48px clamp(32px, 5vw, 80px);
  background: var(--white);
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  background-color: var(--white);
}

.form-card {
  width: 100%;
  max-width: 360px;
}

.form-header { margin-bottom: 26px; }
.form-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--ink);
  margin: 0 0 6px;
}
.form-sub {
  font-size: 14px;
  color: var(--ink-soft);
  margin: 0;
}

.error-banner {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 14px;
  margin-bottom: 18px;
  border-radius: 12px;
  background: #FFF0EA;
  border: 1px solid #FFD3BC;
  color: var(--orange-700);
  font-size: 13px;
  font-weight: 500;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.field-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--ink);
}

.field-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.forgot-link {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--orange-600);
  text-decoration: none;
}
.forgot-link:hover { text-decoration: underline; }

.field-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.field-icon {
  position: absolute;
  left: 14px;
  color: var(--ink-soft);
  pointer-events: none;
}
.field-input {
  width: 100%;
  height: 46px;
  padding: 0 14px 0 40px;
  border-radius: 12px;
  border: 1.5px solid var(--line);
  background: var(--orange-50);
  font-size: 14px;
  color: var(--ink);
  outline: none;
  transition: border-color 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
}
.field-input::placeholder { color: #C4B6A6; }
.field-input:focus {
  border-color: var(--orange-500);
  background: var(--white);
  box-shadow: 0 0 0 4px rgba(255, 106, 26, 0.14);
}

.toggle-pw {
  position: absolute;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--ink-soft);
  cursor: pointer;
  padding: 4px;
}
.toggle-pw:hover { color: var(--orange-600); }

.remember-row { margin-top: -4px; }
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--ink-soft);
  cursor: pointer;
  user-select: none;
}
.checkbox-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.checkbox-custom {
  width: 17px;
  height: 17px;
  border-radius: 5px;
  border: 1.5px solid #D8C9BB;
  background: var(--white);
  position: relative;
  flex-shrink: 0;
  transition: background 0.15s ease, border-color 0.15s ease;
}
.checkbox-input:checked + .checkbox-custom {
  background: var(--orange-500);
  border-color: var(--orange-500);
}
.checkbox-input:checked + .checkbox-custom::after {
  content: "";
  position: absolute;
  left: 5px;
  top: 1.5px;
  width: 4px;
  height: 8px;
  border: solid var(--white);
  border-width: 0 2px 2px 0;
  transform: rotate(40deg);
}

.submit-btn {
  height: 48px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(180deg, var(--orange-500), var(--orange-600));
  color: var(--white);
  font-size: 14.5px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 10px 22px -8px rgba(240, 86, 10, 0.55);
  transition: transform 0.12s ease, box-shadow 0.12s ease, opacity 0.12s ease;
  margin-top: 4px;
}
.submit-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 14px 26px -8px rgba(240, 86, 10, 0.6);
}
.submit-btn:active:not(:disabled) { transform: translateY(0); }
.submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }

.btn-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.spinner {
  width: 15px;
  height: 15px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: var(--white);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.form-footer-note {
  margin-top: 22px;
  font-size: 12px;
  line-height: 1.6;
  color: var(--ink-soft);
  text-align: center;
}
.form-footer-note a {
  color: var(--orange-600);
  font-weight: 600;
  text-decoration: none;
}
.form-footer-note a:hover { text-decoration: underline; }

/* ============ Transitions ============ */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* ============ Responsive ============ */
@media (max-width: 880px) {
  .auth-root { height: auto; min-height: 100vh; }
  .auth-wrapper {
    grid-template-columns: 1fr;
    height: auto;
    min-height: 100vh;
  }
  .left-panel {
    padding: 32px;
    min-height: 280px;
  }
  .left-title { font-size: 26px; }
  .doc-panel { display: none; }
  .stat-row { gap: 14px; }
  .right-panel { padding: 36px 28px; }
}
</style>