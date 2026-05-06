<!-- PdfPreview.vue -->
<template>
  <!-- Bouton déclencheur -->
  <button @click="ouvrirModal" class="btn btn-sm btn-success">
    <i class="bi bi-eye"></i> Prévisualiser le PDF
  </button>

  <!-- Modal -->
  <Teleport to="body">
    <div v-if="modalOuverte" class="modal-overlay" @click.self="fermerModal">
      <div class="modal-container">

        <!-- Header -->
        <div class="modal-header">
          <h3>Aperçu de l'Appel d'Offre</h3>
          <div class="modal-actions">
            <button @click="telecharger" class="btn-telecharger">
              <i class="bi bi-download"></i> Télécharger
            </button>
            <button @click="fermerModal" class="btn-fermer"> ✕ </button>
          </div>
        </div>

        <!-- Contenu -->
        <div class="modal-body">
          <!-- Chargement -->
          <div v-if="chargement" class="loading-state">
            <div class="spinner"></div>
            <p>Génération du PDF en cours...</p>
          </div>

          <!-- Erreur -->
          <div v-else-if="erreur" class="erreur-msg">
            <p><i class="bi bi-x text-warning"></i> {{ erreur }}</p>
            <button @click="chargerApercu" class="btn-retry">Réessayer</button>
          </div>

          <!-- PDF -->
          <iframe
            v-else-if="pdfUrl"
            :src="pdfUrl"
            type="application/pdf"
            width="100%"
            height="100%"
            frameborder="0"
          >
            <p>
              Votre navigateur ne supporte pas l'affichage PDF.
              <a :href="pdfUrl" target="_blank">Ouvrir dans un nouvel onglet</a>
            </p>
          </iframe>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

const props = defineProps({
  projectId: {
    type: Number,
    required: true
  }
})

const API_URL = 'http://localhost:8000/api/marche-de-travaux'

const pdfUrl     = ref(null)
const chargement = ref(false)
const erreur     = ref(null)
const modalOuverte = ref(false)

async function chargerApercu() {
  chargement.value = true
  erreur.value     = null

  if (pdfUrl.value) {
    URL.revokeObjectURL(pdfUrl.value)
    pdfUrl.value = null
  }

  try {
    const response = await fetch(`${API_URL}/${props.projectId}/apercu/`)

    if (!response.ok) {
      throw new Error(`Erreur ${response.status} : impossible de générer l'aperçu`)
    }

    const blob = await response.blob()
    pdfUrl.value = URL.createObjectURL(blob)

  } catch (err) {
    erreur.value = err.message
  } finally {
    chargement.value = false
  }
}

function ouvrirModal() {
  modalOuverte.value = true
  document.body.style.overflow = 'hidden' // bloque le scroll du fond
  chargerApercu()
}

function fermerModal() {
  modalOuverte.value = false
  document.body.style.overflow = '' // restaure le scroll
}

function telecharger() {
  const lien = document.createElement('a')
  lien.href     = `${API_URL}/${props.projectId}/telecharger`
  lien.download = 'appel_offre.pdf'
  document.body.appendChild(lien)
  lien.click()
  document.body.removeChild(lien)
}

onUnmounted(() => {
  if (pdfUrl.value) URL.revokeObjectURL(pdfUrl.value)
  document.body.style.overflow = ''
})
</script>

<style scoped> 

/* Overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

/* Conteneur modal */
.modal-container {
  background: white;
  border-radius: 12px;
  width: 90vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
}

/* Header */
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.modal-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #111827;
}

.modal-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.btn-telecharger {
  padding: 8px 16px;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}

.btn-telecharger:hover {
  background-color: #059669;
}

.btn-fermer {
  padding: 8px 12px;
  background: none;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  color: #6b7280;
  line-height: 1;
}

.btn-fermer:hover {
  background-color: #f3f4f6;
  color: #111827;
}

/* Corps */
.modal-body {
  flex: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-body iframe {
  display: block;
}

/* Chargement */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  color: #6b7280;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #e5e7eb;
  border-top-color: #4f46e5;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Erreur */
.erreur-msg {
  text-align: center;
  color: #ef4444;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.btn-retry {
  padding: 8px 16px;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.btn-retry:hover {
  background-color: #dc2626;
}
</style>