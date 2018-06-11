<template>
    <div class="login">
        <Tab></Tab>
    </div>
</template>
<script>
    import Tab from './tab/index.vue'
    export default {
        name: 'login',
        components: {
            Tab
        }
    }
</script>
<style scoped>
    .login {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url('../../../static/img/login1.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
</style>