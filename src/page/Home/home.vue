<template>
    <el-container>
        <el-header class="header">
            <span></span>
        </el-header>
        <el-container>
            <el-aside width="250px">
                <el-menu :default-openeds="['1']">
                    <el-submenu v-for="(item,index) in menu" :index="index+'1'" :key="index">
                        <template slot="title">
                            <i class="el-icon-message"></i>{{item.name}}</template>
                        <el-menu-item v-for="(i,idx) in item.children" :key="idx" index="index+1+'-'+idx+1">
                            <router-link :to="{name:i.type}">{{i.name}}</router-link>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        data() {
            return {

            }
        },
        computed: {
            ...mapState(["menu"]),
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath)
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath)
            },
            ...mapActions(["fetchMenu"]),
        },
        mounted() {
            this.fetchMenu();
            // this.$store.dispatch('fetchMenu')
            // this.$http.get('static/server/menu.json')
            // .then(res =>{
            //     this.menu = res.data
            // })
        }
    };
</script>
<style scoped>
header {
        height: 30px !important;
        background-image: url('../../../static/img/header.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
</style>