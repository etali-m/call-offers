import { ref, computed } from 'vue'

// État partagé (singleton) : tous les composants qui importent ce composable
// lisent/écrivent le même état, sans avoir besoin d'un store dédié.
const isCollapsed = ref(false)

const EXPANDED_WIDTH  = 240
const COLLAPSED_WIDTH = 76

export function useSidebar() {
    const toggleSidebar = () => {
        isCollapsed.value = !isCollapsed.value
    }

    const sidebarWidth = computed(() =>
        isCollapsed.value ? `${COLLAPSED_WIDTH}px` : `${EXPANDED_WIDTH}px`
    )

    return {
        isCollapsed,
        toggleSidebar,
        sidebarWidth,
        EXPANDED_WIDTH,
        COLLAPSED_WIDTH,
    }
}