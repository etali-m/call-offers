<template>
    <div class="sidebar" :class="{ 'sidebar-collapsed': isCollapsed }" :style="{ '--sidebar-w': sidebarWidth }">

        <button class="collapse-btn" @click="toggleSidebar" :aria-label="isCollapsed ? 'Agrandir le menu' : 'Réduire le menu'">
            <i class="bi" :class="isCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'"></i>
        </button>

        <div class="sidebar-brand">
            <span class="brand-dot"></span>
            <span class="sidebar-title" v-show="!isCollapsed">e-DAO</span>
        </div>

        <nav class="sidebar-nav">
            <ul>
                <li>
                    <router-link :to="{ name:'home' }" class="nav-item" active-class="nav-item-active" :title="isCollapsed ? 'Accueil' : null">
                        <i class="bi bi-house-door-fill nav-icon"></i>
                        <span v-show="!isCollapsed">Accueil</span>
                    </router-link>
                </li>
                <li>
                    <a href="#" class="nav-item" :title="isCollapsed ? 'Mes appels d\'offre' : null">
                        <i class="bi bi-folder2-open nav-icon"></i>
                        <span v-show="!isCollapsed">Mes appels d'offre</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="nav-item" :title="isCollapsed ? 'Notifications' : null">
                        <i class="bi bi-bell nav-icon"></i>
                        <span v-show="!isCollapsed">Notifications</span>
                    </a>
                </li>
            </ul>
        </nav>

        <div class="sidebar-footer">
            <a href="#" class="nav-item nav-item-support" :title="isCollapsed ? 'Support/aide' : null">
                <i class="bi bi-question-circle nav-icon"></i>
                <span v-show="!isCollapsed">Support/aide</span>
            </a>
        </div>

    </div>
</template>

<script>
import { useSidebar } from '@/composables/useSidebar'

export default {
    setup() {
        const { isCollapsed, toggleSidebar, sidebarWidth } = useSidebar()
        return { isCollapsed, toggleSidebar, sidebarWidth }
    }
}
</script>

<style scoped>
.sidebar {
    --orange-500: #FF6A1A;
    --orange-600: #F0560A;
    --orange-700: #C4460A;
    --white:      #FFFFFF;

    width: var(--sidebar-w, 240px);
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    color: var(--white);
    background:
        radial-gradient(120% 60% at 10% 0%, rgba(255,255,255,0.14), transparent 55%),
        linear-gradient(180deg, var(--orange-500) 0%, var(--orange-600) 60%, var(--orange-700) 100%);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    box-sizing: border-box;
    padding: 22px 16px;
    overflow: hidden;
    transition: width 0.25s ease, padding 0.25s ease;
}
.sidebar *, .sidebar *::before, .sidebar *::after { box-sizing: border-box; }

.sidebar-collapsed {
    padding: 22px 12px;
    align-items: center;
}

/* ===== Toggle button ===== */
.collapse-btn {
    position: absolute;
    top: 26px;
    right: -13px;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 1px solid rgba(36, 21, 5, 0.08);
    background: var(--white);
    color: var(--orange-600);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    cursor: pointer;
    box-shadow: 0 6px 16px -6px rgba(36, 21, 5, 0.4);
    z-index: 1001;
    transition: transform 0.15s ease, color 0.15s ease;
}
.collapse-btn:hover {
    color: var(--orange-700);
    transform: scale(1.08);
}

/* ===== Brand ===== */
.sidebar-brand {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 4px 10px 26px;
    white-space: nowrap;
}
.sidebar-collapsed .sidebar-brand {
    padding-left: 0;
    padding-right: 0;
    justify-content: center;
}
.brand-dot {
    width: 10px;
    height: 10px;
    border-radius: 3px;
    background: var(--white);
    box-shadow: 0 0 0 4px rgba(255,255,255,0.22);
    flex-shrink: 0;
}
.sidebar-title {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.01em;
}

/* ===== Nav ===== */
.sidebar-nav {
    width: 100%;
}
.sidebar-nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 11px 12px;
    border-radius: 10px;
    color: rgba(255,255,255,0.8);
    font-size: 13.5px;
    font-weight: 600;
    text-decoration: none;
    white-space: nowrap;
    transition: background 0.15s ease, color 0.15s ease;
}
.sidebar-collapsed .nav-item {
    justify-content: center;
    padding: 11px;
    width: 44px;
}

.nav-icon {
    font-size: 17px;
    width: 18px;
    text-align: center;
    flex-shrink: 0;
}

.nav-item:hover {
    background: rgba(255,255,255,0.14);
    color: var(--white);
}

.nav-item-active {
    background: rgba(255,255,255,0.18);
    color: var(--white);
    position: relative;
}
.nav-item-active::before {
    content: "";
    position: absolute;
    left: -16px;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 18px;
    border-radius: 0 3px 3px 0;
    background: var(--white);
}
.sidebar-collapsed .nav-item-active::before {
    left: -12px;
}

/* ===== Footer ===== */
.sidebar-footer {
    margin-top: auto;
    padding-top: 14px;
    border-top: 1px solid rgba(255,255,255,0.16);
    width: 100%;
    display: flex;
}
.sidebar-collapsed .sidebar-footer {
    justify-content: center;
}
.nav-item-support {
    color: rgba(255,255,255,0.8);
}
.nav-item-support:hover {
    background: rgba(255,255,255,0.14);
    color: var(--white);
}
</style>