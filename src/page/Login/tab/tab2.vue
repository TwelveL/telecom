<template>
    <div slot="select02" class="select02">
        <!-- <p>登录账号</p>
         <p><span></span><input type="text"></p>
         <p><span>重新发送</span><span>邮箱获取动态验证码</span></p>
         <p>动态密码</p>
         <p><span></span><input type="text" placeholder="请输入动态密码"></p>
         <p>登录</p> -->
        <el-form :model="loginmodel" class="from" ref="form">
            <el-form-item class="number" prop="account" :rules="rules" label="账号登录">
                <el-input class="inp1" v-model="loginmodel.account" placeholder="请输入手机号或邮箱"></el-input>
            </el-form-item>
            <el-form-item class="number">
                <el-button class="w_phone" :disabled="isPhoneDisabled" type="primary" @click="checkValidate('phone')">{{ponemsg}}</el-button>
                <el-button class="w_emil" :disabled="isEmailDisabled" type="primary" @click="checkValidate('email')">{{emailmsg}}</el-button>
            </el-form-item>
            <el-form-item class="number" label="动态密码">
                <el-input placeholder="请输入动态密码"></el-input>
            </el-form-item>
            <el-form-item class="number">
                <el-button class="goLogin" type="primary" @click="goLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>
<script>
    export default {
        name: 'tab',
        data() {
            return {
                loginmodel: {
                    account: ''
                },
                rules: [
                    {
                        required: true, message: '请输入账户信息'
                    }
                ],
                ponemsg: "手机号获取动态密码",
                emailmsg: "邮箱获取动态密码",
                timer: null,
                isPhoneDisabled: false,
                isEmailDisabled: false
            }
        },
        methods: {
            countDown(type) {
                let start = 60;
                this.timer = setInterval(() => {
                    start--;
                    type == 'phone' ? (
                        this.isPhoneDisabled = true,
                        this.ponemsg = start
                    ) : (
                            this.isEmailDisabled = true,
                            this.emailmsg = start
                        );
                    if (start < 0) {
                        type == 'phone' ? this.ponemsg = "重新发送验证码" : this.emailmsg = "重新发送验证码";
                        clearInterval(this.timer);
                        type == 'phone' ? this.isPhoneDisabled = false : this.isEmailDisabled = false;
                    }
                }, 1000)
            },
            goLogin() {
                if(this.loginmodel.account){
                 sessionStorage.setItem('islogin', 1);
                 this.$router.push('/home')   
                }else{
                    alert('您还未输入手机号/动态码')
                }
                
            },
            checkValidate(type) {
                if (this.rules.length > 1) {
                    this.rules.pop()
                }
                if (type == 'phone') {
                    this.rules.push({
                        validator: (rule, value, callback) => {
                            if (/^1[3578]\d{9}$/.test(value)) {
                                callback()
                            } else {
                                callback(new Error('请输入正确格式的手机号'))
                            }
                        }, message: '请输入正确的手机号'
                    });
                } else if (type == 'email') {
                    this.rules.push({ type, message: '请输入正确的邮箱' });
                }
                this.$refs.form.validate((isValid, rules) => {
                    if (isValid) {
                        this.countDown(type)
                        //     this.$http.post('',{account:loginmodel.account}).then(res =>{
                        //        console.log(res)
                        //    })
                    }
                })
            }
        }
    }
</script>
<style scoped>
    .select02 {
        width: 100%;
    }

    el-form {
        width: 100%;
    }

    .from {
        padding: 0;
        margin: 0;
        width: 100%;
    }

    .number {
        width: 80% !important;
        color: rgba(0, 81, 255, 0.692) !important;
        padding: 0 !important;
        margin: 0 !important;
        margin-left: 20px !important;
    }

    .el-form-item .el-form-item__label {
        font-size: 12px !important;
        color: rgba(0, 81, 255, 0.692) !important;
    }

    .el-form-item__label {
        font-size: 12px !important;
        color: rgba(0, 81, 255, 0.692) !important;
    }

    .number:nth-child(1) {
        font-size: 12px !important;
        color: rgba(0, 81, 255, 0.692) !important;

    }

    .number:nth-child(3) {
        font-size: 12px !important;
        color: rgba(0, 81, 255, 0.692) !important;
    }

    .el-form-item__label {

        height: 50px !important;
    }

    .goLogin {
        border-radius: 5px !important;
        width: 100% !important;
        height: 40px !important;
        font-size: 12px !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        margin-top: 20px !important;
    }

    .number:nth-child(2) {
        height: 50px !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
    }

    .w_phone {
        border-radius: 2% !important;
        font-size: 5px !important;
        padding: 0 !important;
        margin: 0 !important;
        width: 80px !important;
        height: 20px !important;
        color: rgb(3, 42, 126) !important;
        background-color: #fff !important;
        background-color: rgb(121, 179, 255) !important;
        margin-right: 20px !important;
    }

    .w_emil {
        border-radius: 2% !important;
        font-size: 5px !important;
        padding: 0 !important;
        margin: 0 !important;
        width: 80px !important;
        height: 20px !important;
        color: rgb(3, 42, 126) !important;
        background-color: #fff !important;
        background-color: rgb(121, 179, 255) !important;
    }

    .select02 p:nth-child(3) {
        height: 50px;
        line-height: 50px;
        padding: 0;
        width: 80%;
        margin-left: 20px;

    }

    .select02 p:nth-child(2) {
        width: 78%;

    }

    .select02 p:nth-child(2)>input {
        width: 100%;
        height: 90%;
        ;

    }

    .select02 p:nth-child(3)>span {
        padding: 2px;
        font-size: 10px;
        border: 1px solid rgba(0, 81, 255, 0.692);
        background-color: rgb(121, 179, 255);
        color: rgb(3, 42, 126);

    }

    .select02 p:nth-child(3)>span:nth-child(1) {
        margin-right: 20px;
    }

    .select02 p:nth-child(4) {
        line-height: 30px;
        font-size: 12px;
        color: rgba(0, 81, 255, 0.692);
        margin-top: 20px;
    }

    input {
        height: 10px;
    }

    .select02 p:nth-child(5) {
        width: 78%;

    }

    .select02 p:nth-child(5)>input {
        width: 100%;
        height: 90%;
        ;

    }

    .select02 p:nth-child(6) {
        padding: 0;
        text-align: center;
        line-height: 30px;
        width: 80%;
        height: 30px;
        background-color: rgba(0, 81, 255, 0.692);
        margin-left: 20px;
        border-radius: 3px;
        color: #fff;
    }
</style>