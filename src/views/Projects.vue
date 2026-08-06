<template>
    <Loader v-if="isLoading" />
    <div v-else class="history-page">

        <div class="page-header">
            <h1 class="page-title">Historique des projets réalisés</h1>
            <p class="page-sub">{{ projets.length }} projet{{ projets.length > 1 ? 's' : '' }} au total</p>
        </div>

        <div class="shadow-custom">
            <div class="table-responsive">
                <table class="history-table">
                    <thead>
                        <tr>
                            <th>Projet</th>
                            <th>Type</th>
                            <th>Statut</th>
                            <th>Date</th>
                            <th class="text-end">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="projet in paginatedProjets" :key="projet.id">
                            <td>
                                <router-link
                                    v-if="!projet.archived"
                                    :to="{ name: 'edit', params: { project_id: projet.id } }"
                                    class="project-name"
                                >
                                    {{ projet.objet_appel }}
                                </router-link>
                                <span v-else class="project-name project-name-locked">
                                    {{ projet.objet_appel }}
                                </span>
                                <div class="project-owner">{{ projet.maitre_ouvrage }}</div>
                            </td>

                            <td>
                                <span class="badge-pill">{{ projet.type_marche_nom }}</span>
                            </td>

                            <td>
                                <span v-if="projet.archived" class="badge-pill badge-archived">
                                    <i class="bi bi-lock-fill"></i>
                                    Archivé
                                </span>
                                <span v-else class="badge-pill badge-success">
                                    <i class="bi bi-check-circle-fill"></i>
                                    Réalisé
                                </span>
                            </td>

                            <td class="project-date">{{ projet.date_creation }}</td>

                            <td class="text-end">
                                <div class="row-actions">
                                    <button
                                        v-if="!projet.archived"
                                        type="button"
                                        class="row-action-btn"
                                        title="Modifier"
                                        @click="openEditModal(projet)"
                                    >
                                        <i class="bi bi-pencil-square"></i>
                                    </button>

                                    <button
                                        v-if="!projet.archived"
                                        type="button"
                                        class="row-action-btn"
                                        title="Archiver"
                                        :disabled="archivingId === projet.id"
                                        @click="handleArchive(projet)"
                                    >
                                        <span v-if="archivingId === projet.id" class="row-action-spinner"></span>
                                        <i v-else class="bi bi-archive"></i>
                                    </button>

                                    <button
                                        type="button"
                                        class="row-action-btn row-action-btn-danger"
                                        title="Supprimer"
                                        @click="confirmDelete(projet)"
                                    >
                                        <i class="bi bi-trash3"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div v-if="!projets.length" class="empty-state">
                    Aucun projet réalisé pour le moment.
                </div>
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="pagination-bar">
                <button
                    type="button"
                    class="page-btn"
                    :disabled="currentPage === 1"
                    @click="goToPage(currentPage - 1)"
                >
                    <i class="bi bi-chevron-left"></i>
                </button>

                <template v-for="(page, index) in pageNumbers" :key="index">
                    <span v-if="page === '...'" class="page-ellipsis">…</span>
                    <button
                        v-else
                        type="button"
                        class="page-btn"
                        :class="{ 'page-btn-active': page === currentPage }"
                        @click="goToPage(page)"
                    >
                        {{ page }}
                    </button>
                </template>

                <button
                    type="button"
                    class="page-btn"
                    :disabled="currentPage === totalPages"
                    @click="goToPage(currentPage + 1)"
                >
                    <i class="bi bi-chevron-right"></i>
                </button>
            </div>
        </div>

        <!-- ===== Confirmation de suppression ===== -->
        <transition name="fade-slide">
            <div v-if="showDeleteModal" class="modal-overlay" @click.self="cancelDelete">
                <div class="modal-card">
                    <div class="modal-icon">
                        <i class="bi bi-exclamation-triangle-fill"></i>
                    </div>
                    <h3 class="modal-title">Supprimer ce projet ?</h3>
                    <p class="modal-text">
                        Le projet <strong>« {{ projectToDelete?.objet_appel }} »</strong> sera définitivement supprimé.
                        Cette action est irréversible.
                    </p>
                    <div class="modal-actions">
                        <button type="button" class="modal-btn modal-btn-ghost" @click="cancelDelete" :disabled="isDeleting">
                            Annuler
                        </button>
                        <button type="button" class="modal-btn modal-btn-danger" @click="handleDelete" :disabled="isDeleting">
                            <span v-if="isDeleting" class="row-action-spinner row-action-spinner-light"></span>
                            <span v-else>Supprimer</span>
                        </button>
                    </div>
                </div>
            </div>
        </transition>

        <!-- ===== Modal de modification ===== -->
        <transition name="fade-slide">
            <div v-if="showEditModal" class="modal-overlay" @click.self="closeEditModal">
                <div class="modal-card modal-card-form">
                    <div class="modal-form-header">
                        <h3 class="modal-title text-start mb-0">Modifier le projet « {{projectToEdit.objet_appel}} » </h3>
                        <button type="button" class="modal-close-btn" @click="closeEditModal" :disabled="isUpdating">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>

                    <form @submit.prevent="handleUpdate" class="modal-form-body">

                        <!-- Logo -->
                        <div class="mb-3">
                            <label class="label-custom">Logo du Maître d'Ouvrage</label>
                            <div class="logo-upload-wrapper">
                                <div v-if="logoPreview" class="logo-preview">
                                    <img :src="logoPreview" alt="Logo MOA" width="90" height="90" />
                                    <button type="button" class="btn-remove-logo" @click="supprimerLogo">✕</button>
                                </div>
                                <label v-else class="logo-upload-area">
                                    <input type="file" accept="image/*" @change="onLogoChange" hidden />
                                    <span class="upload-icon">📁</span>
                                    <span>Cliquez pour ajouter un logo</span>
                                    <small>PNG, JPG — max 2 Mo</small>
                                </label>
                            </div>
                        </div>

                        <!-- Objet -->
                        <div class="mb-3">
                            <label class="label-custom">Objet de l'Appel d'Offre <span class="required">*</span></label>
                            <textarea
                                v-model="objet"
                                class="textarea-custom"
                                placeholder="Entrez l'objet de l'appel d'offre"
                                rows="3"
                                required
                            ></textarea>
                        </div>

                        <!-- Nom + Dénomination -->
                        <div class="row">
                            <div class="col-md-9 mb-3">
                                <label class="label-custom">Nom du Maître d'Ouvrage ou délégué <span class="required">*</span></label>
                                <input v-model="moa" type="text" class="input-custom" required placeholder="Ex : Ministère des Travaux Publics" />
                            </div>
                            <div class="col-md-3 mb-3">
                                <label class="label-custom">Dénomination <span class="required">*</span></label>
                                <input v-model="denomination" type="text" class="input-custom" required placeholder="Ex : MINTP" />
                            </div>
                        </div>

                        <!-- Région + Département -->
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="label-custom">Région</label>
                                <select v-model="region" class="input-custom">
                                    <option value="" disabled>-- Sélectionnez une région --</option>
                                    <option v-for="r in regions" :key="r" :value="r">{{ r }}</option>
                                </select>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="label-custom">Département</label>
                                <input v-model="departement" type="text" class="input-custom" placeholder="Ex : Mfoundi" />
                            </div>
                        </div>

                        <!-- Service -->
                        <div class="mb-3">
                            <label class="label-custom">Service</label>
                            <input v-model="service" type="text" class="input-custom" placeholder="Ex : Direction des Infrastructures Routières" />
                        </div>

                        <!-- Commission -->
                        <div class="mb-3">
                            <label class="label-custom">Commission de passation des marchés</label>
                            <select v-model="commission" class="select-custom">
                                <option value="cipm">Commission interne de passation des marchés</option>
                                <option value="crpm">Commission régionale de passation des marchés</option>
                                <option value="cdpm">Commission départementale de passation des marchés</option>
                                <option value="cspm">Commission spéciale de passation des marchés</option>
                            </select> 
                        </div>

                        <!-- Type dossier / mode passation / numéro -->
                        <div class="row">
                            <div class="col-md-4 mb-3">
                                <label class="label-custom">Type de dossier</label>
                                <select v-model="type_dao" class="select-custom">
                                    <option value="national">National</option>
                                    <option value="international">International</option>
                                </select>
                            </div>
                            <div class="col-md-4 mb-3">
                                <label class="label-custom">Mode de passation</label>
                                <select v-model="mode_dao" class="select-custom">
                                    <option value="ouvert">Ouvert</option>
                                    <option value="restreint">Restreint</option>
                                </select> 
                            </div>
                            <div class="col-md-4 mb-3">
                                <label class="label-custom">Numéro du dossier</label>
                                <input type="number" v-model="numero_dossier" class="input-custom" placeholder="N°00083" />
                            </div>
                        </div>

                        <!-- Exercice / financement -->
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="label-custom">Exercice budgétaire</label>
                                <input type="number" v-model="exercice_budgetaire" min="2024" class="input-custom" placeholder="2024" required />
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="label-custom">Financement</label>
                                <input type="text" v-model="financement" class="input-custom" placeholder="Source du financement" required />
                            </div>
                        </div>

                        <!-- Imputation -->
                        <div class="mb-3">
                            <label class="label-custom">Imputation</label>
                            <input type="text" v-model="imputation" class="input-custom" required placeholder="Détails de l'imputation budgétaire" />
                        </div>

                        <div class="modal-actions">
                            <button type="button" class="modal-btn modal-btn-ghost" @click="closeEditModal" :disabled="isUpdating">
                                Annuler
                            </button>
                            <button type="submit" class="modal-btn modal-btn-primary" :disabled="isUpdating">
                                <span v-if="isUpdating" class="row-action-spinner row-action-spinner-light"></span>
                                <span v-else>Enregistrer les modifications</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </transition>

    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Loader from '@/components/Loader.vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { useAppelOffre } from '@/composables/useAppelOffre'
import { utils } from '@/composables/utils'

const { get_callOffers, delete_callOffer, update_callOffer } = useAppelOffre()
const { getImageUrl } = utils()

const projets = ref([])
const isLoading = ref(true)

const currentPage = ref(1)
const itemsPerPage = 10

const regions = [
    'Adamaoua', 'Centre', 'Est', 'Extrême-Nord',
    'Littoral', 'Nord', 'Nord-Ouest', 'Ouest', 'Sud', 'Sud-Ouest'
]

// ===== Chargement de la liste =====
onMounted(async () => {
    try {
        isLoading.value = true
        const response = await get_callOffers()
        projets.value = response || []
    } catch (error) {
        console.error("Erreur lors de la récupération des projets :", error)
        toast.error('Impossible de charger les projets.', { theme: 'colored', autoClose: 2000 })
    } finally {
        isLoading.value = false
    }
})

// ===== Pagination =====
const totalPages = computed(() =>
    Math.max(1, Math.ceil(projets.value.length / itemsPerPage))
)

const paginatedProjets = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    return projets.value.slice(start, start + itemsPerPage)
})

const goToPage = (page) => {
    if (page < 1 || page > totalPages.value) return
    currentPage.value = page
}

const pageNumbers = computed(() => {
    const total = totalPages.value
    const current = currentPage.value
    const delta = 1
    const pages = []

    for (let i = 1; i <= total; i++) {
        if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
            pages.push(i)
        } else if (pages[pages.length - 1] !== '...') {
            pages.push('...')
        }
    }
    return pages
})

// ===== Archiver =====
// NB : pas de champ "archived" côté modèle AppelOffre pour l'instant.
// On désactive l'appel réel en attendant l'ajout du champ côté backend.
const archivingId = ref(null)
const handleArchive = async (projet) => {
    toast.info("L'archivage n'est pas encore disponible pour le moment.", {
        theme: 'colored',
        autoClose: 2500,
    })
}

// ===== Supprimer (avec confirmation) =====
const isDeleting = ref(false)
const showDeleteModal = ref(false)
const projectToDelete = ref(null)

const confirmDelete = (projet) => {
    projectToDelete.value = projet
    showDeleteModal.value = true
}

const cancelDelete = () => {
    if (isDeleting.value) return
    showDeleteModal.value = false
    projectToDelete.value = null
}

const handleDelete = async () => {
    if (!projectToDelete.value) return
    try {
        isDeleting.value = true
        await delete_callOffer(projectToDelete.value.id)
        projets.value = projets.value.filter(p => p.id !== projectToDelete.value.id)

        if (paginatedProjets.value.length === 0 && currentPage.value > 1) {
            currentPage.value -= 1
        }

        toast.success('Le projet a été supprimé.', { theme: 'colored', autoClose: 2000 })
    } catch (error) {
        console.error("Erreur lors de la suppression :", error)
        toast.error('Erreur lors de la suppression du projet.', { theme: 'colored', autoClose: 2000 })
    } finally {
        isDeleting.value = false
        showDeleteModal.value = false
        projectToDelete.value = null
    }
}

// ===== Modifier (modal) =====
const showEditModal = ref(false)
const isUpdating = ref(false)
const projectToEdit = ref(null)

const objet = ref('')
const moa = ref('')
const denomination = ref('')
const region = ref('')
const departement = ref('')
const service = ref('')
const logo = ref(null)          // nouveau fichier sélectionné (File) ou null
const logoPreview = ref(null)   // aperçu (URL existante ou base64 du nouveau fichier)
const commission = ref('')
const type_dao = ref('')
const mode_dao = ref('')
const numero_dossier = ref('')
const exercice_budgetaire = ref('')
const financement = ref('')
const imputation = ref('')

const openEditModal = (projet) => {
    projectToEdit.value = projet

    objet.value = projet.objet_appel || ''
    moa.value = projet.maitre_ouvrage || ''
    denomination.value = projet.denomination || ''
    region.value = projet.region || ''
    departement.value = projet.departement || ''
    service.value = projet.service || ''
    commission.value = projet.commission_marche || ''
    type_dao.value = projet.type_dossier || ''
    mode_dao.value = projet.mode_passation || ''
    numero_dossier.value = projet.numero_dossier || ''
    exercice_budgetaire.value = projet.exercice_budgetaire || ''
    financement.value = projet.financement || ''
    imputation.value = projet.imputation || ''

    logo.value = null
    logoPreview.value = projet.logo ? projet.logo : null

    showEditModal.value = true
}

const closeEditModal = () => {
    if (isUpdating.value) return
    showEditModal.value = false
    projectToEdit.value = null
}

function onLogoChange(event) {
    const fichier = event.target.files[0]
    if (!fichier) return

    if (fichier.size > 2 * 1024 * 1024) {
        toast.error('Le fichier est trop volumineux (max 2 Mo)', { theme: 'colored', autoClose: 2000 })
        return
    }

    logo.value = fichier

    const reader = new FileReader()
    reader.onload = (e) => { logoPreview.value = e.target.result }
    reader.readAsDataURL(fichier)
}

function supprimerLogo() {
    logo.value = null
    logoPreview.value = null
}

const handleUpdate = async () => {
    if (!projectToEdit.value) return

    isUpdating.value = true
    const formData = new FormData()

    formData.append('objet_appel', objet.value)
    formData.append('maitre_ouvrage', moa.value)
    formData.append('denomination', denomination.value)
    formData.append('region', region.value)
    formData.append('departement', departement.value)
    formData.append('service', service.value)
    formData.append('commission_marche', commission.value)
    formData.append('type_dossier', type_dao.value)
    formData.append('mode_passation', mode_dao.value)
    formData.append('numero_dossier', numero_dossier.value)
    formData.append('exercice_budgetaire', exercice_budgetaire.value)
    formData.append('financement', financement.value)
    formData.append('imputation', imputation.value)

    // On n'envoie le logo que si un nouveau fichier a été choisi
    if (logo.value instanceof File) {
        formData.append('logo', logo.value, logo.value.name)
    }

    try {
        const response = await update_callOffer(projectToEdit.value.id, formData)

        // On met à jour l'entrée dans la liste locale sans tout recharger
        const index = projets.value.findIndex(p => p.id === projectToEdit.value.id)
        if (index !== -1) {
            projets.value[index] = { ...projets.value[index], ...response.data }
        }

        toast.success(response.message || 'Le projet a été mis à jour.', { theme: 'colored', autoClose: 2000 })
        showEditModal.value = false
        projectToEdit.value = null
    } catch (error) {
        console.error("Erreur lors de la mise à jour :", error)
        toast.error(error.detail || 'Erreur lors de la mise à jour du projet.', { theme: 'colored', autoClose: 2000 })
    } finally {
        isUpdating.value = false
    }
}
</script>

<style scoped>
.history-page {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: var(--ink);
    max-width: 1180px;
}

.fade-slide-enter-active, .fade-slide-leave-active {
    transition: opacity 0.18s ease;
}
.fade-slide-enter-from, .fade-slide-leave-to {
    opacity: 0;
}

/* ===== En-tête ===== */
.page-header { margin-bottom: 24px; }
.page-title { font-size: 22px; font-weight: 700; margin: 0 0 6px; color: var(--ink); }
.page-sub { font-size: 13.5px; color: var(--ink-soft); margin: 0; }

/* ===== Tableau ===== */
.table-responsive { overflow-x: auto; }
.history-table { width: 100%; border-collapse: collapse; }
.history-table thead th {
    text-align: left; font-size: 11px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.04em; color: var(--ink-soft); background: var(--orange-50);
    padding: 12px 16px; border-bottom: 1px solid var(--line);
}
.history-table tbody tr { transition: background 0.15s ease; }
.history-table tbody tr:hover { background: var(--orange-50); }
.history-table tbody tr:not(:last-child) td { border-bottom: 1px solid var(--line); }
.history-table td { padding: 14px 16px; vertical-align: middle; font-size: 13.5px; }

.project-name { font-weight: 700; color: var(--ink); text-decoration: none; }
.project-name:hover { color: var(--orange-600); }
.project-owner { font-size: 12px; color: var(--ink-soft); margin-top: 2px; }
.project-date { color: var(--ink-soft); white-space: nowrap; }

.empty-state { padding: 40px 20px; text-align: center; color: var(--ink-soft); font-size: 13.5px; }

/* ===== Pagination ===== */
.pagination-bar { display: flex; align-items: center; justify-content: center; gap: 6px; padding: 16px; border-top: 1px solid var(--line); }
.page-btn {
    min-width: 32px; height: 32px; padding: 0 8px; display: inline-flex; align-items: center; justify-content: center;
    border: 1.5px solid var(--line); border-radius: 8px; background: var(--white); color: var(--ink-soft);
    font-size: 12.5px; font-weight: 700; cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}
.page-btn:hover:not(:disabled) { background: var(--orange-50); border-color: var(--orange-100); color: var(--orange-700); }
.page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.page-btn-active { background: var(--orange-500); border-color: var(--orange-500); color: var(--white); }
.page-btn-active:hover { background: var(--orange-500) !important; color: var(--white) !important; }
.page-ellipsis { color: var(--ink-soft); font-size: 13px; padding: 0 4px; }

/* ===== Statut archivé ===== */
.badge-archived { background: var(--line); color: var(--ink-soft); }
.project-name-locked { color: var(--ink-soft); cursor: default; }

/* ===== Actions par ligne ===== */
.row-actions { display: inline-flex; align-items: center; gap: 6px; }
.row-action-btn {
    display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px;
    border-radius: 8px; border: 1.5px solid var(--line); background: var(--white); color: var(--ink-soft);
    font-size: 14px; cursor: pointer; text-decoration: none;
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}
.row-action-btn:hover:not(:disabled) { background: var(--orange-50); border-color: var(--orange-100); color: var(--orange-700); }
.row-action-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.row-action-btn-danger:hover:not(:disabled) { background: #FEF2F2; border-color: #FCA5A5; color: var(--danger); }

.row-action-spinner {
    width: 13px; height: 13px; border: 2px solid var(--orange-100); border-top-color: var(--orange-600);
    border-radius: 50%; animation: row-spin 0.7s linear infinite;
}
.row-action-spinner-light { border: 2px solid rgba(255,255,255,0.4); border-top-color: var(--white); }
@keyframes row-spin { to { transform: rotate(360deg); } }

/* ===== Modale (base) ===== */
.modal-overlay {
    position: fixed; inset: 0; background: rgba(36, 21, 5, 0.45);
    display: flex; align-items: center; justify-content: center; z-index: 2000; padding: 20px;
}
.modal-card {
    width: 100%; max-width: 380px; background: var(--white); border-radius: 16px; padding: 26px;
    text-align: center; box-shadow: 0 24px 48px -16px rgba(36, 21, 5, 0.4);
}
.modal-icon {
    width: 46px; height: 46px; margin: 0 auto 14px; border-radius: 50%; background: #FEF2F2;
    color: var(--danger); display: flex; align-items: center; justify-content: center; font-size: 20px;
}
.modal-title { font-size: 16px; font-weight: 700; color: var(--ink); margin: 0 0 8px; }
.modal-text { font-size: 13.5px; color: var(--ink-soft); line-height: 1.6; margin: 0 0 22px; }
.modal-actions { display: flex; gap: 10px; margin-top: 8px; }
.modal-btn {
    flex: 1; height: 42px; border-radius: 10px; font-size: 13.5px; font-weight: 700; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s ease, color 0.15s ease, opacity 0.15s ease;
}
.modal-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.modal-btn-ghost { background: var(--white); border: 1.5px solid var(--line); color: var(--ink); }
.modal-btn-ghost:hover:not(:disabled) { background: var(--orange-50); }
.modal-btn-danger { background: var(--danger); border: 1.5px solid var(--danger); color: var(--white); }
.modal-btn-danger:hover:not(:disabled) { background: var(--danger-dark); border-color: var(--danger-dark); }
.modal-btn-primary { background: var(--orange-500); border: 1.5px solid var(--orange-500); color: var(--white); }
.modal-btn-primary:hover:not(:disabled) { background: var(--orange-600); border-color: var(--orange-600); }

/* ===== Modale de modification (formulaire) ===== */
.modal-card-form {
    max-width: 640px;
    max-height: 88vh;
    overflow-y: auto;
    text-align: left;
    padding: 0;
}
.modal-form-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 26px; border-bottom: 1px solid var(--line); position: sticky; top: 0;
    background: var(--white); z-index: 1;
}
.modal-close-btn {
    width: 32px; height: 32px; border-radius: 8px; border: none; background: transparent;
    color: var(--ink-soft); font-size: 14px; cursor: pointer;
    display: inline-flex; align-items: center; justify-content: center;
    transition: background 0.15s ease;
}
.modal-close-btn:hover:not(:disabled) { background: var(--orange-50); color: var(--orange-700); }
.modal-form-body { padding: 22px 26px 26px; }
.modal-form-body .modal-actions { margin-top: 4px; }

/* ===== Upload logo ===== */
.logo-upload-wrapper { display: flex; }
.logo-upload-area {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 4px; width: 100%; max-width: 240px; padding: 18px; border: 1.5px dashed var(--line);
    border-radius: 10px; cursor: pointer; text-align: center; color: var(--ink-soft); font-size: 12.5px;
    transition: border-color 0.15s ease, background 0.15s ease;
}
.logo-upload-area:hover { border-color: var(--orange-300); background: var(--orange-50); }
.upload-icon { font-size: 20px; }
.logo-preview { position: relative; display: inline-block; }
.logo-preview img { border-radius: 10px; border: 1px solid var(--line); object-fit: cover; }
.btn-remove-logo {
    position: absolute; top: -8px; right: -8px; width: 22px; height: 22px; border-radius: 50%;
    border: none; background: var(--danger); color: var(--white); font-size: 11px; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
}
</style>