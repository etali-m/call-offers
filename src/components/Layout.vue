<template>
    <Navbar />
    <Sidebar />
    <div class="app-body" :style="{ '--sidebar-w': sidebarWidth }">
        <div class="content">
            <div class="container mb-4">
                <router-view></router-view>
            </div>
        </div>
        <footer class="app-footer">
            <div class="row">
                <div class="col-md-12 d-flex justify-content-center p-3">
                    <span>copyright &copy;2025 <a class="copyright" href="">OGIVE solution-experts</a> </span>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import { useSidebar } from '@/composables/useSidebar'

export default {
    components: { Navbar, Sidebar },
    setup() {
        const { sidebarWidth } = useSidebar()
        return { sidebarWidth }
    }
}
</script>

<style scoped>
    /* aligné sur la largeur de la Sidebar via --sidebar-w (240px ouverte / 76px réduite) */
    .app-body {
        margin-left: var(--sidebar-w, 240px);
        min-height: 100vh;
        display: flex;
        flex-direction: column; 
        transition: margin-left 0.25s ease;
    }

    .content {
        flex: 1;
        padding-top: 96px;
        padding-left: 4px;
        padding-right: 4px;
    }

    .app-footer {
        background: #FFFFFF;
        border-top: 1px solid rgba(36, 21, 5, 0.08);
        color: #6b5847;
        font-size: 13px;
    }

    .copyright {
        text-decoration: none;
        color: #F0560A;
        font-weight: 600;
    }

    @media (max-width: 940px) {
        .app-body {
            margin-left: 0;
        }
    }
</style>