<template>
    <Navbar />
    <Sidebar />
    <div class="content">
        <div class="container mb-4">
            <router-view></router-view>
        </div>
    </div>
    <footer>
        <div class="row">
            <div class="col-md-12 bg-white d-flex justify-content-center p-3">
                <span>copyright &copy;2025 <a href="">OGIVE solution-experts</a> </span>
            </div>
        </div>
    </footer>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
    components: { Navbar, Sidebar }
}
</script>

<style scoped>
    .content {
        margin-left: 130px; 
        margin-right: 0;
        padding-top: 100px;
    }
    
</style>