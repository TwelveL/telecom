<template>
  <div class="radio-wrap">
    <div class="radio-group">
      <span v-for="(tab ,index) in tabs" :class="{cur:iscur==index}" @click="iscur=index,tabChange('select' + (index + 1))" :key="index">{{tab.name}}</span>
    </div>
    <div class="login-content">
      <Transition>
        <component v-bind:is="tabView"></component>
      </Transition>
    </div>
  </div>
</template>
<script>
  import select1 from './tab1'
  import select2 from './tab2'
  export default {
    name: '',
    data() {
      return {
        tabView: 'select1',
        tabs: [{ name: "二维码登录" }, { name: "账号登录" }],
        iscur: 0
      }
    },
    beforeRouteEnter(to, from, next) {
    },
    components: {
      select1,
      select2
    },
    methods: {
      tabChange: function (tab) {
        this.tabView = tab;
      }
    }
  } 
</script>
<style scoped>
  .radio-wrap {
    position: absolute;
    ;
    bottom: 173px;
    right: 102px;
    margin-top: 0;
    width: 245px;
    height: 378px;
  }

  .radio-group {
    margin: 0;
    display: flex;
    width: 100%;
    height: 50px;
    background-color: #ccc;
  }

  .radio-group>span {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
  }

  .cur {
    background: #fff;
  }

  .v-enter {
    transform: translate3d(10%, 0, 0)
  }

  .v-enter-to {
    transform: translate3d(0, 0, 0)
  }

  .v-enter-active,
  .v-enter-active {
    transition: transform linear 0.5s;
  }

  .v-leave {
    transform: translate3d(0, 0, 0)
  }

  .v-leave-to {
    transform: translate3d(100%, 0, 0)
  }

  .login-content {
    position: relative;
  }

  .login-content div {
    width: 100%;
    top: 0;
    position: absolute;
  }
</style>