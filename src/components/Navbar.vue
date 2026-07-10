<template>
<nav class="navbar" :style="{ '--sidebar-w': sidebarWidth }">
    <a class="navbar-brand">
        <span class="brand-line">Système Informatique de Gestion</span>
        <span class="brand-line">et d'Élaboration des Dossiers d'Appel d'Offres</span>
    </a>
    <div class="navbar-actions">
        <div class="navbar-user" v-if="user">
            <small>{{ user }}</small>
        </div>
        <div v-if="user" class="dropdown">
            <span class="dropdown-toggle user-trigger" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-person-circle navbar-icon"></i>
            </span>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li><router-link :to="{ name: 'profil' }" class="dropdown-item">Mon profil</router-link></li>
                <li><button class="dropdown-item" @click="handleLogout"><i class="bi bi-box-arrow-in-right"></i> Se déconnecter</button></li>
            </ul>
        </div>

        <!--<a href=""><i class="bi bi-gear navbar-icon"></i></a>-->
    </div>
</nav>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { useSidebar } from '@/composables/useSidebar';

export default {
    setup () {
        const { getUser, logout } = useAuth();
        const user = getUser() // on récupère l'utilisateur connecté
        const router = useRouter()
        const { sidebarWidth } = useSidebar()

        const handleLogout = async() => {
            try {
                await logout(router);
                router.push({ name: 'login' })
            } catch(error) {
                console.log(error);
            }
        }

        return { user, handleLogout, sidebarWidth }
    }
}
</script>

<style scoped>
.navbar {
    --ink:        #241505;
    --ink-soft:   #6b5847;
    --orange-50:  #FFF4EC;
    --orange-100: #FFE4D1;
    --orange-500: #FF6A1A;
    --orange-600: #F0560A;
    --orange-700: #C4460A;
    --white:      #FFFFFF;
    --line:       rgba(36, 21, 5, 0.08);

    /* aligné sur la largeur de la Sidebar via --sidebar-w (240px ouverte / 76px réduite) */
    margin-left: var(--sidebar-w, 240px);
    width: calc(100% - var(--sidebar-w, 240px));
    height: 72px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 28px;
    background: var(--white);
    border-bottom: 1px solid var(--line);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    transition: margin-left 0.25s ease, width 0.25s ease;
}
.navbar *, .navbar *::before, .navbar *::after { box-sizing: border-box; }

/* ===== Brand ===== */
.navbar-brand {
    display: flex;
    flex-direction: column;
    gap: 1px;
    text-decoration: none;
    cursor: default;
}
.brand-line {
    font-size: 11.5px;
    line-height: 1.4;
    font-weight: 600;
    color: var(--ink-soft);
}
.brand-line:first-child {
    color: var(--ink);
    font-weight: 700;
}

/* ===== Actions ===== */
.navbar-actions {
    display: flex;
    align-items: center;
    gap: 16px;
}

.navbar-user {
    padding-right: 16px;
    border-right: 1px solid var(--line);
    display: flex;
    align-items: center;
}
.navbar-user small {
    font-size: 13px;
    font-weight: 600;
    color: var(--ink);
}

.dropdown-toggle::after { display: none; }

.user-trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: var(--orange-50);
    cursor: pointer;
    transition: background 0.15s ease;
}
.user-trigger:hover {
    background: var(--orange-100);
}

.navbar-icon {
    color: var(--orange-600);
    font-size: 20px;
}

/* ===== Dropdown menu ===== */
.dropdown-menu {
    margin-top: 10px;
    padding: 6px;
    border: 1px solid var(--line);
    border-radius: 12px;
    box-shadow: 0 16px 32px -12px rgba(36, 21, 5, 0.22);
}
.dropdown-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 9px 12px;
    border-radius: 8px;
    font-size: 13.5px;
    font-weight: 600;
    color: var(--ink-soft);
}
.dropdown-item:hover,
.dropdown-item:focus {
    background: var(--orange-50);
    color: var(--orange-700);
}

@media (max-width: 940px) {
    .navbar {
        margin-left: 0;
        width: 100%;
    }
    .brand-line { font-size: 10.5px; }
}
</style>