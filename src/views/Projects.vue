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
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="projet in paginatedProjets" :key="projet.id">
                            <td>
                                <router-link
                                    :to="{ name: 'edit', params: { project_id: projet.id } }"
                                    class="project-name"
                                >
                                    {{ projet.objet_appel }}
                                </router-link>
                                <div class="project-owner">{{ projet.maitre_ouvrage }}</div>
                            </td>

                            <td>
                                <span class="badge-pill">{{ projet.type_marche_nom }}</span>
                            </td>

                            <td>
                                <span class="badge-pill badge-success">
                                    <i class="bi bi-check-circle-fill"></i>
                                    Réalisé
                                </span>
                            </td>

                            <td class="project-date">{{ projet.date_creation }}</td>
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

    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Loader from '@/components/Loader.vue'
import { useAppelOffre } from '@/composables/useAppelOffre'

// NB : je réutilise get_callOffers (déjà utilisé sur la page d'accueil) comme
// source de données. S'il existe côté backend un filtre dédié aux dossiers
// "réalisés" (statut, champ booléen, etc.), remplace l'appel ci-dessous par
// celui-ci pour ne récupérer que les projets concernés.
const { get_callOffers } = useAppelOffre()

const projets = ref([])
const isLoading = ref(true)

const currentPage = ref(1)
const itemsPerPage = 10

onMounted(async () => {
    try {
        isLoading.value = true
        const response = await get_callOffers()
        projets.value = response || []
    } catch (error) {
        console.error("Erreur lors de la récupération des projets :", error)
    } finally {
        isLoading.value = false
    }
})

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

// Construit une liste compacte de numéros de page (avec "…" si nécessaire)
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
</script>

<style scoped>
.history-page {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: var(--ink);
    max-width: 1180px;
}

/* ===== En-tête ===== */
.page-header {
    margin-bottom: 24px;
}
.page-title {
    font-size: 22px;
    font-weight: 700;
    margin: 0 0 6px;
    color: var(--ink);
}
.page-sub {
    font-size: 13.5px;
    color: var(--ink-soft);
    margin: 0;
}

/* ===== Tableau ===== */
.table-responsive {
    overflow-x: auto;
}

.history-table {
    width: 100%;
    border-collapse: collapse;
}

.history-table thead th {
    text-align: left;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--ink-soft);
    background: var(--orange-50);
    padding: 12px 16px;
    border-bottom: 1px solid var(--line);
}

.history-table tbody tr {
    transition: background 0.15s ease;
}
.history-table tbody tr:hover {
    background: var(--orange-50);
}
.history-table tbody tr:not(:last-child) td {
    border-bottom: 1px solid var(--line);
}

.history-table td {
    padding: 14px 16px;
    vertical-align: middle;
    font-size: 13.5px;
}

.project-name {
    font-weight: 700;
    color: var(--ink);
    text-decoration: none;
}
.project-name:hover {
    color: var(--orange-600);
}

.project-owner {
    font-size: 12px;
    color: var(--ink-soft);
    margin-top: 2px;
}

.project-date {
    color: var(--ink-soft);
    white-space: nowrap;
}

.empty-state {
    padding: 40px 20px;
    text-align: center;
    color: var(--ink-soft);
    font-size: 13.5px;
}

/* ===== Pagination ===== */
.pagination-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 16px;
    border-top: 1px solid var(--line);
}

.page-btn {
    min-width: 32px;
    height: 32px;
    padding: 0 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1.5px solid var(--line);
    border-radius: 8px;
    background: var(--white);
    color: var(--ink-soft);
    font-size: 12.5px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}
.page-btn:hover:not(:disabled) {
    background: var(--orange-50);
    border-color: var(--orange-100);
    color: var(--orange-700);
}
.page-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}
.page-btn-active {
    background: var(--orange-500);
    border-color: var(--orange-500);
    color: var(--white);
}
.page-btn-active:hover {
    background: var(--orange-500) !important;
    color: var(--white) !important;
}

.page-ellipsis {
    color: var(--ink-soft);
    font-size: 13px;
    padding: 0 4px;
}
</style>