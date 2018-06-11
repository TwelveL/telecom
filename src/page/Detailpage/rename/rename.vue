<template>
    <h1>{{msg}}</h1>
</template>
<script>
export default {
    data(){
        console.log(this.$route.params)
        return {
            msg:"这是发起更名流程工单"
        }
    }

}
</script>
<style>
    
    
</style>

