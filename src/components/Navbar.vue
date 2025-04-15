<template>
<nav class="navbar navbar-light bg-white mb-4" style="padding: 15px;"> 
    <a class="navbar-brand d-flex flex-column" style="font-size: 12px;">
        <span>
            Système Informatique de Gestion
        </span>
        <span>
            et d'Elaboration des Dossiers d'Appel d'Offres
        </span>
    </a>
    <div class="d-flex">
        <div class="border-end navbar-user">
            <small v-if="user">{{ user }}</small>
        </div> &nbsp;  &nbsp; 
        <div v-if="user" class="dropdown">
            <span href="#" class="dropdown-toggle d-flex align-items-center text-decoration-none" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-person-circle navbar-icon fs-4"></i>
            </span>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li><router-link :to="{ name: 'profil' }" class="dropdown-item" >Mon profil</router-link></li> 
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

export default { 
    setup () {
        const { getUser, logout } = useAuth();
        const user = getUser()
        const router = useRouter()

        const handleLogout = async() => {
            try {
                await logout(router);
                router.push({ name: 'login' })
            } catch(error) {
                console.log(error);
            }
        }

        return { user, handleLogout }
    }
}
</script>

<style scoped>
.navbar {
    margin-left: 130px;
    position: fixed;
    top: 0;
    width: calc(100% - 130px);
    background-color: #333;
    color: white;
    z-index: 999;
    padding: 10px;
}

.navbar-icon{
    color:rgb(95, 95, 95);
    font-size: 20px;
    margin-right: 15px;
}

.navbar-user{
    color: var(--second);
    padding-right: 8px;
    display: flex;
    align-items: center;
}
</style>