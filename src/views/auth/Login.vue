<template>
    <div class="register login" ref="login">
        <Header :reHeadMid="false" :isShowHome="false">
            <div slot="head_mid" class="auth-logo">
                <img src="../../assets/img/icon_top_logo.png" alt="">
            </div>
            <!-- <div slot="head_right">
                                    <router-link class="header-record" tag="span" :to="'/register'">
                                        <span class="f28">进入试玩</span>
                                    </router-link>
                                </div> -->
        </Header>
        <div class="hasbox"></div>
        <div class="register-cent">
            <h3 class="fs-24">用户登录</h3>
            <div class="register-from">
                <form>
                    <div class="pk-input">
                        <label class="title must fs-14">账号</label>
                        <div class="input fs-12">
                            <input name="account" autocomplete="off" v-model="name" v-validate="'required|alpha_num|max:12|min:5'" :class="{'input': true, 'is-danger': errors.has('account') }" type="text" placeholder="5-12位字母和数字组合">
                            <i v-show="errors.has('account')" class="fs-16 iconfont icon-czsb icon-style  error-icon"></i>
                            <span v-show="errors.has('account')" class="help fds-12 is-danger">{{errors.first('account')}}</span>
                        </div>
                    </div>
                    <div class="pk-input">
                        <label class="title must fs-14">密码</label>
                        <div class="input fs-12">
                            <input type="password" name="password" autocomplete="off" v-model="password" v-validate="'required|alpha_num|max:20|min:6'" :class="{'input': true, 'is-danger': errors.has('password') }" placeholder="6-20位字母和数字组合">
                            <i v-show="errors.has('password')" class="fs-16 iconfont icon-czsb icon-style  error-icon"></i>
                            <span v-show="errors.has('password')" class="help fds-12 is-danger">{{errors.first('password')}}</span>
                        </div>
                    </div>
                    <div class="pk-input pk-input-code">
                        <label class="title must fs-14">验证码</label>
                        <div class="pk-input pk-input-code">
                            <label class="title must fs-14">验证码</label>
                            <div class="input fs-12 input-code">
                                <input name="captcha" autocomplete="off" v-model="code" v-validate="'required|numeric'" :class="{'input': true, 'is-danger': errors.has('captcha') }" type="text" placeholder="请输入验证码">
                                <i v-show="errors.has('captcha')" class="fs-16 iconfont icon-czsb icon-style  error-icon"></i>
                                <span v-show="errors.has('captcha')" class="help fds-12 is-danger">{{errors.first('captcha')}}</span>
                            </div>
                            <div class="input-code-img">
                                <img :src="codeImg" @click="getCode">
                            </div>
                        </div>
                    </div>
                    <div class="register-protocol">
                        <div class="mgl0">
                            <div @click="remember=!remember">
                                <div class="ps fl">
                                    <div class="ju">
                                        <img v-show="!remember" src="./icon_will.png" alt="" class="imgs">
                                        <img v-show="remember" src="./icon_ok.png" alt="" class="imgs">
                                    </div>
                                </div>
                                <div class="fs-14 fl j98">记住密码</div>
                            </div>
                            <div class="forget fs-14 j98 color-726a99">忘记密码请<router-link tag="span" :to="{name:'contactus'}" class="service">联系客服</router-link></div>
                        </div>
                    </div>
                    <div class="pk-btn fs-14" @click="myLogin">
                        立即登录
                    </div>
                </form>
                <p class="has-account fs-14" @click="toRegister">
                    没有账号？立即注册
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "../../components/Header";
    import {
        getCaptcha,
        login
    } from '@/api/login'
    export default {
        components: {
            Header
        },
        data() {
            return {
                remember: false,
                message: "11",
                name: localStorage.getItem("name") || "",
                password: localStorage.getItem("pwd") || "",
                code: "",
                codeImg: "",
                codeId: "",
                showPositionValue: false,
                remember: localStorage.getItem("pwd") && localStorage.getItem("name")
            };
        },
        mounted() {
            const session = sessionStorage.getItem('session');
            if (session) {
                sessionStorage.removeItem('session');
            }
            this.$refs.login.style.height = window.innerHeight + "px";
            this.getCode();
        },
        methods: {
            getCode() {
                getCaptcha().then((res) => {
                    this.codeImg = "data:image/png;base64," + res.Code;
                    this.codeId = res.ID;
                }).catch((res) => {
                    this.$toast({
                        message: res,
                        duration: 2000
                    });
                });
            },
            myLogin() {
                const _this = this;
                this.$validator.validateAll().then(result => {
                    if (result) {
                        login(this.name, this.password, this.codeId, this.code).then((res) => {
                            sessionStorage.setItem("session", res.sessionId);
                            if (_this.remember) {
                                localStorage.setItem("name", _this.name);
                                localStorage.setItem("pwd", _this.password);
                            } else {
                                localStorage.removeItem("name");
                                localStorage.removeItem("pwd");
                            }
                            _this.$router.push("/");
                        }).catch((err) => {
                            _this.getCode();
                            _this.code = "";
                            setTimeout(() => {
                                _this.$validator.errors.clear();
    
                            }, 0);
                            _this.$toast({
                                message: err,
                                duration: 1000
                            });
                        });
                    }
                });
            },
            toRegister() {
                this.$router.push("register");
            }
        }
    };
</script>

<style lang="less" scoped>
    @import url("../../components/less/common.less");
    @import url("./auth.less");
</style>
