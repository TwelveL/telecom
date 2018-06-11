<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>
import Start from './components/Start/start.vue'
export default {
  name: 'App',
  components:{
    Start
  }
}
</script>

<style>
html,body{
  margin: 0;
  padding: 0;
 width: 100%;
 height: 100%;
}
#app{
  width: 100%;
  height: 100%;
}
</style>
