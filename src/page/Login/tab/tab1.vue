<template>
    <div class="tab1">
        <div slot="select01">
            <h6>手机扫码安全防盗</h6>
            <img src="../../../../static/img/2.png" alt="">
        </div>
    </div>
</template>
<script>
    export default {
        name: 'tab',
        data() {
            return {
                msg: "select01"
            }
        }
    }
</script>
<style scoped>
.select01 {
        width: 100%;
        height: 80%;
        }

h6 {
    margin: 0;
    margin-top: 20px;
    height: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    }
img {
    width: 80%;
    margin-top: 20px;
    margin-left: 25px;
    }
</style>