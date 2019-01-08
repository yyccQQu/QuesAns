<template>
    <div class="register" ref="register">
        <Header :reHeadMid="false" :isShowHome="false">
            <div slot="head_mid" class="auth-logo">
                <img src="../../assets/img/icon_top_logo.png" alt="">
            </div>
        </Header>
        <div class="hasbox"></div>
        <div class="announcement fs-12" v-if="announcement">
            <i class="iconfont icon-laba icon-style fs-12"></i>
            <div class="announcement-cent">
                <marquee direction="left" align="bottom" height="100%" width="100%" scrollamount="3" scrolldelay="1" v-html="announcement"></marquee>
            </div>
        </div>
        <div class="register-cent">
            <h3 class="fs-24">用户注册</h3>
            <h5>
                <p>一键注册，尊享好礼！</p>
                <p>体验精美游戏，赢取终极大奖！</p>
            </h5>
            <div class="register-from">
                <form>
                    <div class="pk-input">
                        <label class="title must fs-14">账号</label>
                        <div class="input fs-12">
                            <input name="account" autocomplete="off" v-model="name" v-validate="'required|alpha_num|max:20|min:6'" :class="{'input': true, 'is-danger': errors.has('account') }" type="text" placeholder="6-20位字母和数字组合">
                            <i v-show="errors.has('account')" class="fs-16 iconfont icon-czsb icon-style  error-icon"></i>
                            <span v-show="errors.has('account')" class="help fds-12 is-danger">{{ errors.first('account') }}</span>
                        </div>
                    </div>
                    <div class="pk-input">
                        <label class="title must fs-14">密码</label>
                        <div class="input fs-12">
                            <input type="password" name="password" autocomplete="off" v-model="password" v-validate="'required|pwd'" :class="{'input': true, 'is-danger': errors.has('password') }" placeholder="6-20位字母和数字组合">
                            <i v-show="errors.has('password')" class="fs-16 iconfont icon-czsb icon-style  error-icon"></i>
                            <span v-show="errors.has('password')" class="help fds-12 is-danger">{{ errors.first('password') }}</span>
                        </div>
                    </div>
                    <div class="pk-input">
                        <label class="title must fs-14">确认密码</label>
                        <div class="input fs-12">
                            <input name="confirmPassword" type="password" autocomplete="off" v-model="repassword" v-validate="{'required': 'true', 'is': password}" :class="{'input': true, 'is-danger': errors.has('confirmPassword') }" placeholder="请再次输入您的登录密码">
                            <i v-show="errors.has('confirmPassword')" class="fs-16 iconfont icon-czsb icon-style  error-icon"></i>
                            <span v-show="errors.has('confirmPassword')" class="help fds-12 is-danger">{{ errors.first('confirmPassword') }}</span>
                        </div>
                    </div>
                    <div class="pk-input">
                        <label class="title must fs-14">介绍人</label>
                        <div class="input fs-12">
                            <input name="introducer" autocomplete="off" v-model="spreadId" v-validate="'required|alpha_num'" :class="{'input': true, 'is-danger': errors.has('introducer') }" type="text" placeholder="请输入您的介绍人">
                            <i v-show="errors.has('introducer')" class="fs-16 iconfont icon-czsb icon-style  error-icon"></i>
                            <span v-show="errors.has('introducer')" class="help fds-12 is-danger">{{ errors.first('introducer') }}</span>
                        </div>
                    </div>
                    <div class="pk-input pk-input-code">
                        <label class="title must fs-14">验证码</label>
                        <div class="input fs-12 input-code">
                            <input name="captcha" autocomplete="off" v-model="code" v-validate="'required|numeric'" :class="{'input': true, 'is-danger': errors.has('captcha') }" type="text" placeholder="请输入验证码">
                            <i v-show="errors.has('captcha')" class="fs-16 iconfont icon-czsb icon-style  error-icon"></i>
                            <span v-show="errors.has('captcha')" class="help fds-12 is-danger">{{ errors.first('captcha') }}</span>
                        </div>
                        <div class="input-code-img">
                            <img :src="codeImg" @click="getCode">
                        </div>
                    </div>
                    <div class="register-protocol">
                        <div @click="readAgree=!readAgree">
                            <div class="fl">
                                <div class="ju">
                                    <img v-show="!readAgree" src="./icon_will.png" alt="" class="imgs">
                                    <img v-show="readAgree" src="./icon_ok.png" alt="" class="imgs">
                                </div>
                            </div>
                            <p>
                                <span class="fs-14">已阅读并同意</span>
                                <a @click="showReadAgree($event)" class="fs-14">《注册协议》</a>
                            </p>
                        </div>
                    </div>
                    <div class="pk-btn fs-14" @click="toSub">
                        立即注册
                    </div>
                </form>
                <p class="has-account fs-14" @click="toLogin">
                    已有账号，直接登录
                </p>
            </div>
        </div>
        <div class="read-agree-modal" v-if="readAgreeBox">
            <div class="modal-mask" @click="readAgreeBox=false"></div>
            <div class="modal-body">
                <div class="modal-cent">
                    <h5 class="fs-16">{{readAgreeData.title}}</h5>
                    <div v-html="readAgreeData.content" class="fs-14 modal-cent-box"></div>
                </div>
                <div class="pk-btn fs-14" @click="readAgreeBox=false;readAgree=true">
                    确认
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "../../components/Header";
    
    import {
        getNotice,
        getCaptcha,
        getReadAgree,
        register
    } from '@/api/login'
    
    export default {
        components: {
            Header
        },
        data() {
            return {
                announcement: "",
                name: "",
                password: "",
                repassword: "",
                spreadId:'',//介绍人(代理推广a+id,会员推广m+id)
                code: "",
                codeImg: "",
                codeId: "",
                showPositionValue: false,
                readAgree: false,
                readAgreeBox: false,
                readAgreeData: {}
            };
        },
        mounted() {
            this.$refs.register.style.height = window.innerHeight + "px";
            this.getNotice();
            this.getCode();
            this.getReadAgree();
        },
        methods: {
            getNotice() {
                getNotice(-2, -1, 0).then(res => {
                    res.noticeList.map(v => {
                        this.announcement += v.content + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                    });
                    this.announcement = this.announcement.substring(0, this.announcement.length - 1);
                }).catch(err => {});
            },
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
            getReadAgree() {
                getReadAgree().then(res => {
                    this.readAgreeData = res;
                }).catch(err => {});
            },
            toLogin() {
                this.$router.push("login");
            },
            toSub() {
                let _this = this;
                this.$validator.validateAll().then(result => {
                    if (result) {
                        let spreadIdStrat = ['a','m']
                        if(!spreadIdStrat.includes(this.spreadId.substr(0, 1))){
                            this.$toast({
                                message: '介绍人必须以a或m开头',
                                duration: 3000
                            });
                            return ;
                        }
                        register(this.name, this.password, this.repassword, this.spreadId, this.code, this.codeId, this.readAgree).then(res => {
                            sessionStorage.setItem("session", res.sessionId);
                            _this.$router.push('/');
                        }).catch(err => {
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
                    this.showPositionValue = true;
                });
            },
            showReadAgree(event) {
                event.stopPropagation();
                this.readAgreeBox = true;
            }
        }
    };
</script>

<style lang="less" scoped>
    @import url("../../components/less/common.less");
    @import url("./auth.less");
</style>
