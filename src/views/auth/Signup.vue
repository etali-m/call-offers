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
            Rejoignez les entreprises qui<br>gagnent <em>plus d'appels d'offres</em>
          </h1>
          <p class="left-sub">
            Créez votre compte et générez vos premiers dossiers en quelques minutes.
          </p>

          <div class="growth-panel">
            <div class="chart-card">
              <span class="chart-card-label">Taux de réussite</span>
              <div class="chart-bars">
                <span class="bar" style="--h:38%"></span>
                <span class="bar" style="--h:52%"></span>
                <span class="bar" style="--h:44%"></span>
                <span class="bar" style="--h:70%"></span>
                <span class="bar bar-active" style="--h:92%"></span>
              </div>
            </div>

            <div class="trophy-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4z"/>
                <path d="M7 5H4a3 3 0 0 0 3 5M17 5h3a3 3 0 0 1-3 5"/>
              </svg>
              +35 % de dossiers gagnés
            </div>

            <div class="check-card">
              <div class="check-row">
                <span class="check-dot"></span>
                Éligibilité validée
              </div>
              <div class="check-row">
                <span class="check-dot"></span>
                Pièces conformes
              </div>
              <div class="check-row check-row-pending">
                <span class="check-dot check-dot-pending"></span>
                Dossier en cours
              </div>
            </div>

            <svg class="growth-spark" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
              <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l2.8 2.8M16.2 16.2 19 19M5 19l2.8-2.8M16.2 7.8 19 5"/>
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


      </div>

      <!-- ── Panneau droit ── -->
      <div class="right-panel">
        <div class="form-card form-card-wide">

          <div class="form-header">
            <h2 class="form-title">Bienvenue 👋</h2>
            <p class="form-sub">Remplissez le formulaire pour créer votre espace de travail</p>
          </div>

          <transition name="fade-slide">
            <div v-if="message" class="success-banner">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
                <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ message }}
            </div>
          </transition>

          <transition name="fade-slide">
            <div v-if="errors.non_field_errors" class="error-banner">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7.5" stroke="currentColor"/>
                <path d="M8 4.5v4M8 10.5v1" stroke="currentColor" stroke-linecap="round"/>
              </svg>
              {{ errors.non_field_errors[0] }}
            </div>
          </transition>

          <transition name="fade-slide">
            <div v-if="errors.email" class="error-banner">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7.5" stroke="currentColor"/>
                <path d="M8 4.5v4M8 10.5v1" stroke="currentColor" stroke-linecap="round"/>
              </svg>
              {{ errors.email[0] }}
            </div>
          </transition>

          <form @submit.prevent="handleRegister" class="auth-form">

            <div class="field-row">
              <div class="field-group">
                <label class="field-label">Nom</label>
                <div class="field-wrap">
                  <svg class="field-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                    <circle cx="12" cy="8" r="4"/>
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                  </svg>
                  <input type="text" v-model="first_name" class="field-input" placeholder="Nom" required>
                </div>
                <span v-if="errors.first_name" class="error">{{ errors.first_name[0] }}</span>
              </div>

              <div class="field-group">
                <label class="field-label">Prénom</label>
                <div class="field-wrap">
                  <svg class="field-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                    <circle cx="12" cy="8" r="4"/>
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                  </svg>
                  <input type="text" v-model="last_name" class="field-input" placeholder="Prénom" required>
                </div>
                <span v-if="errors.last_name" class="error">{{ errors.last_name[0] }}</span>
              </div>
            </div>

            <div class="field-group">
              <label class="field-label">Adresse e-mail</label>
              <div class="field-wrap">
                <svg class="field-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m2 7 10 7 10-7"/>
                </svg>
                <input type="email" v-model="email" class="field-input" placeholder="vous@exemple.com" required>
              </div>
            </div>

            <div class="field-row">
              <div class="field-group">
                <label class="field-label">Numéro de téléphone</label>
                <vue-tel-input
                  v-model="phone_number"
                  defaultCountry="CM"
                  :inputOptions="{ placeholder: 'Numéro de téléphone' }"
                  styleClasses="signup__custom_phone"
                  @validate="validatePhoneNumber"
                />
                <span v-if="phoneError && phone_number" class="error">{{ phoneError }}</span>
              </div>

              <div class="field-group">
                <label class="field-label">Entreprise <em class="optional">(optionnel)</em></label>
                <div class="field-wrap">
                  <svg class="field-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                    <rect x="4" y="3" width="16" height="18" rx="1.5"/>
                    <path d="M8 8h1M8 12h1M8 16h1M15 8h1M15 12h1M15 16h1"/>
                  </svg>
                  <input type="text" v-model="company" class="field-input" placeholder="Nom de votre entreprise">
                </div>
              </div>
            </div>


            <div class="field-group">
              <label class="field-label">Mot de passe</label>
              <div class="field-wrap">
                <svg class="field-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <rect x="5" y="11" width="14" height="10" rx="2"/>
                  <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
                </svg>
                <input type="password" v-model="password" class="field-input" placeholder="••••••••" required>
              </div>
              <span v-if="errors.password" class="error">{{ errors.password2[0] }}</span>
            </div>

            <div class="field-group">
              <label class="field-label">Confirmer le mot de passe</label>
              <div class="field-wrap">
                <svg class="field-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <rect x="5" y="11" width="14" height="10" rx="2"/>
                  <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
                </svg>
                <input type="password" v-model="password2" class="field-input" placeholder="••••••••" @input="checkPasswords" required>
              </div>
              <small v-if="passwordMismatch" class="error">Les mots de passe ne correspondent pas.</small>
              <span v-if="errors.password2" class="error">{{ errors.password2[0] }}</span>
            </div>

            <button type="submit" class="submit-btn" :disabled="isLoading">
              <span v-if="isLoading" class="btn-inner">
                <span class="spinner"></span>
                Chargement…
              </span>
              <span v-else class="btn-inner">
                S'inscrire
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </button>

          </form>

          <p class="form-footer-note signup-link">
            Vous avez déjà un compte ?
            <router-link :to="{ name: 'login' }">Connectez-vous</router-link>
          </p>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { VueTelInput } from 'vue-tel-input';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

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

        //toast pour informer l'utilisateur
        toast.success(message, {
          theme: 'colored',
          autoClose: 1000,
        });

        setTimeout(() => {
          router.push({ name: 'otp-verification', query: { email: userData.email} });
        }, 3000);
      } catch (err) {
        toast.error(err, {
            theme: 'colored',
            autoClose: 2000,
        });
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
      phoneError,
      validatePhoneNumber,
    };
  }
};
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

  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: stretch;
  justify-content: center;
  background: var(--cream);
  overflow: hidden;
  box-sizing: border-box;
}

.auth-root *, .auth-root *::before, .auth-root *::after { box-sizing: border-box; }

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
  grid-template-columns: 1.2fr 1fr;
  background:
    radial-gradient(120% 140% at 15% 0%, rgba(255,255,255,0.16), transparent 55%),
    linear-gradient(160deg, var(--orange-500) 0%, var(--orange-600) 55%, var(--orange-700) 100%); 
}

/* ============ Left panel ============ */
.left-panel {
  position: relative;
  order: 2;
  padding: 48px clamp(40px, 5.5vw, 88px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: var(--white);
  overflow: hidden;
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
  font-size: 32px;
  line-height: 1.22;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin: 0 0 14px;
}
.left-title em {
  font-style: normal;
  position: relative;
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
  margin: 0 0 26px;
}

/* Growth / success illustration */
.growth-panel {
  position: relative;
  height: 190px;
  margin: 8px 0 30px;
}

.chart-card {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 168px;
  padding: 14px 16px 16px;
  background: var(--white);
  border-radius: 14px;
  box-shadow: 0 20px 34px -14px rgba(36, 21, 5, 0.35);
  transform: rotate(-4deg);
  z-index: 1;
}
.chart-card-label {
  display: block;
  font-size: 10.5px;
  font-weight: 700;
  color: var(--ink-soft);
  margin-bottom: 10px;
}
.chart-bars {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  height: 54px;
}
.bar {
  flex: 1;
  height: var(--h);
  border-radius: 4px 4px 1px 1px;
  background: var(--orange-100);
}
.bar-active { background: var(--orange-500); }

.trophy-badge {
  position: absolute;
  top: 20px;
  right: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: var(--white);
  color: var(--orange-700);
  font-size: 11px;
  font-weight: 700;
  border-radius: 999px;
  box-shadow: 0 14px 24px -10px rgba(36, 21, 5, 0.35);
  transform: rotate(4deg);
  z-index: 2;
  white-space: nowrap;
}
.trophy-badge svg { flex-shrink: 0; color: var(--orange-500); }

.check-card {
  position: absolute;
  bottom: 2px;
  left: 92px;
  width: 172px;
  padding: 12px 14px;
  background: var(--white);
  border-radius: 12px;
  box-shadow: 0 20px 34px -14px rgba(36, 21, 5, 0.35);
  display: flex;
  flex-direction: column;
  gap: 8px;
  transform: rotate(3deg);
  z-index: 3;
}
.check-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11.5px;
  font-weight: 600;
  color: var(--ink);
}
.check-dot {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--orange-500);
  position: relative;
}
.check-dot::after {
  content: "";
  position: absolute;
  left: 4px;
  top: 2.5px;
  width: 4px;
  height: 7px;
  border: solid var(--white);
  border-width: 0 1.6px 1.6px 0;
  transform: rotate(40deg);
}
.check-row-pending { color: var(--ink-soft); }
.check-dot-pending {
  background: var(--orange-50);
  border: 1.5px solid var(--orange-100);
}
.check-dot-pending::after { display: none; }

.growth-spark {
  position: absolute;
  bottom: 30px;
  right: 30px;
  color: rgba(255,255,255,0.5);
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
.left-footer .signup-link {
  color: var(--white);
  font-weight: 700;
  text-decoration: none;
}
.left-footer .signup-link:hover { text-decoration: underline; }

/* ============ Right panel ============ */
.right-panel {
  order: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px clamp(28px, 4.5vw, 72px);
  background: var(--white);
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  overflow-y: auto;
}

.form-card {
  width: 100%;
  max-width: 360px;
}
.form-card-wide {
  max-width: 420px;
}

.form-header { margin-bottom: 22px; }
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

.success-banner, .error-banner {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 14px;
  margin-bottom: 14px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 500;
}
.success-banner {
  background: #EFFBF1;
  border: 1px solid #BFE9C6;
  color: #1E7B34;
}
.error-banner {
  background: #FFF0EA;
  border: 1px solid #FFD3BC;
  color: var(--orange-700);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
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
.field-label .optional {
  font-style: normal;
  font-weight: 500;
  color: var(--ink-soft);
  font-size: 11.5px;
}

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

.error {
  font-size: 12px;
  font-weight: 500;
  color: var(--orange-700);
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
  margin-top: 20px;
  font-size: 12.5px;
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

/* ============ vue-tel-input theming ============ */
:deep(.signup__custom_phone) {
  border: 1.5px solid var(--line) !important;
  border-radius: 12px !important;
  background: var(--orange-50) !important;
  box-shadow: none !important;
  outline: none !important;
  min-height: 46px;
}
:deep(.signup__custom_phone.vue-tel-input:focus-within) {
  border-color: var(--orange-500) !important;
  background: var(--white) !important;
  box-shadow: 0 0 0 4px rgba(255, 106, 26, 0.14) !important;
}
:deep(.signup__custom_phone .vti__input) {
  padding: 9px 12px !important;
  font-size: 14px;
  background: transparent;
}
:deep(.signup__custom_phone .vti__dropdown) {
  border-radius: 12px 0 0 12px;
}
:deep(.signup__custom_phone .vti__dropdown:hover) {
  background: var(--orange-100);
}

/* ============ Responsive ============ */
@media (max-width: 940px) {
  .auth-root { height: auto; min-height: 100vh; }
  .auth-wrapper {
    grid-template-columns: 1fr;
    height: auto;
    min-height: 100vh;
  }
  .left-panel {
    padding: 32px;
    min-height: 260px;
  }
  .left-title { font-size: 26px; }
  .growth-panel { display: none; }
  .stat-row { gap: 14px; }
  .right-panel { padding: 36px 24px; }
  .field-row { grid-template-columns: 1fr; }
}
</style>