<template>
    <div class="my_application">
        <div v-for="(item,index) in applyfor" :key="index">
            <router-link :to="{name:item.to}">{{item.name}}</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                applyfor: [{
                    to: "rename",
                    name: '发起更名流程工单'
                },
                {
                    to: "rename",
                    name: '发起过户流程工单'
                },
                {
                    to: "rename",
                    name: '工程维护单'
                },
                {
                    to: "rename",
                    name: '其他类型工单'
                }
                ]
            }

        }

    }
</script>
<style scoped>
.my_application {
        width: 100%;
        height: 100%;
    }
.my_application>div {
        text-align: center;
        line-height: 120px;
        margin-left: 10px;
        margin-top: 10px;
        height: 45%;
        float: left;
        background-color: #efefef;
        border: 1px solid #ccc;
        width: 25%;

    }
</style>