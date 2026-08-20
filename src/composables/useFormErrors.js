import { ref } from 'vue'

// Le backend (Django REST Framework) n'est pas localisé en français
// (LANGUAGE_CODE reste 'en-us' pour des raisons propres au pipeline de
// traduction des marchés, sans lien avec l'UI) : ses messages de validation
// génériques sortent donc en anglais. On les traduit ici côté client plutôt
// que de toucher à la config i18n globale du backend, qui a un tout autre usage.
const DRF_MESSAGE_TRANSLATIONS = {
  'this field is required.': 'Ce champ est requis.',
  'this field may not be blank.': 'Ce champ ne peut pas être vide.',
  'this field may not be null.': 'Ce champ ne peut pas être vide.',
  'a valid integer is required.': 'Un nombre entier valide est requis.',
  'a valid number is required.': 'Un nombre valide est requis.',
  'enter a number.': 'Veuillez entrer un nombre.',
  'this field must be unique.': 'Cette valeur est déjà utilisée.',
  'not a valid string.': 'Cette valeur est invalide.',
}

const translateMessage = (message) => {
  return DRF_MESSAGE_TRANSLATIONS[message.trim().toLowerCase()] || message
}

// Normalise les erreurs renvoyées par les composables CRUD (useConceptionRealisation,
// useTravaux, etc.), qui rejettent soit avec le corps d'erreur DRF brut
// ({ champ: ["message", ...] }), soit avec { detail: "message" } en cas d'erreur réseau.
export function useFormErrors() {
  const errors = ref({})       // { nomDuChamp: "message lisible" }
  const generalError = ref('') // message global (erreur réseau, non liée à un champ précis)

  const parseErrors = (err) => {
    errors.value = {}
    generalError.value = ''

    if (!err || typeof err !== 'object') {
      generalError.value = "Une erreur inattendue s'est produite. Veuillez réessayer."
      return
    }

    if (typeof err.detail === 'string') {
      generalError.value = err.detail
      return
    }

    const fieldErrors = {}
    let hasFieldError = false

    for (const [key, value] of Object.entries(err)) {
      const rawMessage = Array.isArray(value) ? value.join(' ') : String(value)
      const message = rawMessage.split('. ').map(translateMessage).join('. ')
      if (key === 'non_field_errors' || key === 'detail') {
        generalError.value = generalError.value ? `${generalError.value} ${message}` : message
        continue
      }
      fieldErrors[key] = message
      hasFieldError = true
    }

    errors.value = fieldErrors

    if (!hasFieldError && !generalError.value) {
      generalError.value = "Une erreur inattendue s'est produite. Veuillez réessayer."
    }
  }

  const clearErrors = () => {
    errors.value = {}
    generalError.value = ''
  }

  return { errors, generalError, parseErrors, clearErrors }
}
