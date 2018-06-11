<template>
    <h2>{{this.$route.params.name}}</h2>
</template>
<script>
export default {
    data(){
        console.log(this.$route.params)
        return{

        }
    }
    
}
</script>
<style scoped>
</style>


