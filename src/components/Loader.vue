<template>
    <div class="overlay">
        <span class="spinner-border" role="status" aria-hidden="true"></span>
    </div>
</template>

<script>
    export default {
        name: 'Loader'
    }
</script>

<style scoped>
    .overlay{
        position: fixed;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
        background-color: rgba(49, 49, 49, 0.9);
        display:flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        color: var(--main);
    }
</style>
