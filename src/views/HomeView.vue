<template>
    <Loader v-if="isLoading"/>
    <div v-else class="home-view">

        <div class="page-header">
            <h1 class="page-title">Bonjour, John 👋</h1>
            <p class="page-sub">Créez un nouveau dossier d'appel d'offre</p>
        </div>

        <section class="templates-section">
            <div class="templates-grid">
                <!-- Debut de la boucle -->
                <div v-for="type in typesMarche" :key="type.id" class="template-card">
                    <router-link :to="{ name: 'create', params: { slug: type.slug } }" class="template-link">
                        <div class="template-thumb">
                            <img :src="getImageUrl(type.image_garde)" :alt="type.nom">
                        </div>
                        <p class="template-title">{{ type.nom }}</p>
                    </router-link>
                </div>
                <!-- fin de la boucle -->
            </div>

            <div class="templates-more">
                <span class="more-link" id="more_template">
                    Plus de modèles
                    <i class="bi bi-arrow-down-short"></i>
                </span>
            </div>
        </section>

        <!-- PROJETS RECENTS -->
        <section class="projects-section">
            <h2 class="section-title">Projets récents</h2>

            <div class="projects-card">
                <div class="table-responsive">
                    <table class="projects-table">
                        <thead>
                            <tr>
                                <th>Projet</th>
                                <th>Type</th>
                                <th>Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="projet in projets" :key="projet.id">

                                <td>
                                    <router-link
                                        :to="{ name: 'edit', params: { project_id: projet.id } }"
                                        class="project-name"
                                    >
                                        {{ projet.objet_appel }}
                                    </router-link>
                                    <div class="project-owner">
                                        {{ projet.maitre_ouvrage }}
                                    </div>
                                </td>

                                <td>
                                    <span class="type-badge">
                                        {{ projet.type_marche_nom }}
                                    </span>
                                </td>

                                <td class="project-date">
                                    {{ projet.date_creation }}
                                </td>

                            </tr>
                        </tbody>
                    </table>

                    <div v-if="!projets.length" class="empty-state">
                        Aucun projet pour le moment.
                    </div>
                </div>
            </div>
        </section>

    </div>

</template>

<script>

import api from '@/utils/api'
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { utils } from '@/composables/utils';
import { useAppelOffre } from '@/composables/useAppelOffre';
import Loader from '@/components/Loader.vue';

export default {
    name: 'HomeView',
    components: { Loader },
    setup () {
        const email = ref('')
        const route = useRoute()
        const API_URL = 'http://localhost:8000/api'
        const typesMarche = ref([]);
        const projets = ref([]);
        const isLoading = ref(true);

        //recupération de la fonctio pour le chemin image
        const { getImageUrl } = utils()
        const { get_callOffers } = useAppelOffre()


        //fonction pour récuperer tout les types de marché
        const getTypesMarche = async() => {
            const token = localStorage.getItem('access_token')
            if (token) {
                try{
                    const response = await api.get(`${API_URL}/type-marche`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    })
                    typesMarche.value = response.data
                    console.log(typesMarche)
                } catch(error){
                    console.log("Erreur lors de la récupération des informations: ", error)
                }
            }
        }

        onMounted(async() => {
            email.value = route.query.email;
            getTypesMarche()
            
            try {
                isLoading.value = true;
                const responseDAO = await get_callOffers()
                projets.value = responseDAO;    
            } catch (error) {
                console.error("Erreur lors de la récupération du DAO :", error) 
            } finally{
                isLoading.value = false;
            }
        }) 

        return {
            email,
            typesMarche, 
            projets,
            isLoading,
            getImageUrl
        }
    }
}
</script>

<style scoped>
.home-view {
    --ink:        #241505;
    --ink-soft:   #6b5847;
    --orange-50:  #FFF4EC;
    --orange-100: #FFE4D1;
    --orange-500: #FF6A1A;
    --orange-600: #F0560A;
    --orange-700: #C4460A;
    --white:      #FFFFFF;
    --line:       rgba(36, 21, 5, 0.08);

    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: var(--ink);
    max-width: 1180px;
}

/* ===== Header ===== */
.page-header {
    margin-bottom: 30px;
}
.page-title {
    font-size: 24px;
    font-weight: 700;
    margin: 0 0 6px;
    color: var(--ink);
}
.page-sub {
    font-size: 14px;
    color: var(--ink-soft);
    margin: 0;
}

/* ===== Templates grid ===== */
.templates-section {
    margin-bottom: 40px;
}
.templates-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 18px;
}

.template-card {
    background: var(--white);
    border: 1px solid var(--line);
    border-radius: 14px;
    overflow: hidden;
    transition: border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;
}
.template-card:hover {
    border-color: var(--orange-500);
    box-shadow: 0 16px 30px -16px rgba(240, 86, 10, 0.35);
    transform: translateY(-2px);
}

.template-link {
    display: block;
    color: var(--ink);
    text-decoration: none;
}

.template-thumb {
    width: 100%;
    aspect-ratio: 4 / 3;
    background: var(--orange-50);
    overflow: hidden;
}
.template-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.2s ease;
}
.template-card:hover .template-thumb img {
    transform: scale(1.04);
}

.template-title {
    margin: 0;
    padding: 12px 14px 14px;
    font-weight: 600;
    font-size: 13.5px;
    color: var(--ink);
}

.templates-more {
    display: flex;
    justify-content: flex-end;
    margin-top: 14px;
}
.more-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    font-weight: 600;
    color: var(--orange-600);
    cursor: pointer;
    padding: 6px 10px;
    border-radius: 8px;
    transition: background 0.15s ease;
}
.more-link:hover {
    background: var(--orange-50);
}

/* ===== Projets récents ===== */
.section-title {
    font-size: 16px;
    font-weight: 700;
    color: var(--ink);
    margin: 0 0 14px;
}

.projects-card {
    background: var(--white);
    border: 1px solid var(--line);
    border-radius: 16px;
    box-shadow: 0 12px 28px -20px rgba(36, 21, 5, 0.25);
    overflow: hidden;
}

.table-responsive {
    overflow-x: auto;
}

.projects-table {
    width: 100%;
    border-collapse: collapse;
}

.projects-table thead th {
    text-align: left;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--ink-soft);
    background: var(--orange-50);
    padding: 12px 20px;
    border-bottom: 1px solid var(--line);
}

.projects-table tbody tr {
    transition: background 0.15s ease;
}
.projects-table tbody tr:hover {
    background: var(--orange-50);
}
.projects-table tbody tr:not(:last-child) td {
    border-bottom: 1px solid var(--line);
}

.projects-table td {
    padding: 14px 20px;
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

.type-badge {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 999px;
    background: var(--orange-100);
    color: var(--orange-700);
    font-size: 11.5px;
    font-weight: 700;
}

.project-date {
    color: var(--ink-soft);
}

.empty-state {
    padding: 36px 20px;
    text-align: center;
    color: var(--ink-soft);
    font-size: 13.5px;
}
</style>