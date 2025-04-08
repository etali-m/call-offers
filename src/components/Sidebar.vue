<template>
    <div class="sidebar text-center">
        <h4 class="sidebar-title">e-DAO</h4>
        <ul class="text-center">
            <li class="active"> 
                <router-link :to="{ name:'home' }">
                    <i class="bi bi-house-door-fill sidebar-icon"></i> 
                    Accueil
                </router-link>
            </li> 
            <li><a href="#">
                <i class="bi bi-folder2-open sidebar-icon"></i>
                Mes appels d'offre
                </a>
            </li>
            <li><a href="#">
                <i class="bi bi-bell sidebar-icon"></i>
                Notifications
                </a>
            </li> <br> <br>
            <a class="support" href="#">
                <i class="bi bi-question-circle sidebar-icon"></i>
                Support/aide
            </a>
        </ul>
    </div> 
</template>

<script>
export default {

}
</script>

<style scoped>
.sidebar {
    width: 130px;
    height: 100vh; 
    color: white; 
    position: fixed;
    top: 0;
    left: 0;
    background-color: #F38B04;  
    background-image: 
        linear-gradient(45deg, rgba(255, 165, 0, 0.1) 50%, transparent 50%),
        linear-gradient(-45deg, rgba(255, 140, 0, 0.15) 50%, transparent 50%),
        linear-gradient(135deg, rgba(255, 120, 0, 0.2) 50%, transparent 50%),
        linear-gradient(-135deg, rgba(255, 100, 0, 0.1) 50%, transparent 50%);
    
    background-size: 
        80px 80px,
        120px 120px,
        160px 160px,
        200px 200px;
    
    background-position: 
        var(--pos-1), 
        var(--pos-2), 
        var(--pos-3), 
        var(--pos-4);
    z-index: 1000;
    animation: float 25s linear infinite; 
    overflow: hidden;
}

.sidebar ul{
    list-style-type: none;
    padding:0;
}
.sidebar ul>li{
    padding:15px; 
}
.sidebar ul > li:hover{
    background-color: #8a4e009c;
    color:red;
}
.sidebar a {
    color: white;
    text-decoration: none;
    display: block;
    margin: 10px 0;
}
.sidebar-icon{
    display: block;
    font-size: 30px;
}
.sidebar-title{
    margin:20px;
}
.active {
    background-color: var(--second);
}
</style>