<template>
    <div class="setting">
        <Header :title="'系统设置'" :rooter="'-1'" :hasNoBack="true" :iFontsize="'.58667rem'"></Header>
        <Footer></Footer>
        <ul>
            <li>
                <div class="left">
                    <i class="iconfont icon-wd-yuyan"></i>
                </div>
                <div class="right pk-1px-b">
                    <span>选择语言</span>
                    <i class="iconfont icon-list-more"></i>
                </div>
            </li>
            <router-link tag="li" :to="{name:'contactus'}">
                <div class="left">
                    <i class="iconfont icon-wd-lianxi"></i>
                </div>
                <div class="right pk-1px-b">
                    <span>联系我们</span>
                    <i class="iconfont icon-list-more"></i>
                </div>
            </router-link>
            <li>
                <div class="left">
                    <i class="iconfont icon-wd-banben"></i>
                </div>
                <div class="right pk-1px-b">
                    <span>版本检测</span>
                    <i class="iconfont icon-list-more"></i>
                </div>
            </li>
            <router-link tag="li" :to="{name:'more'}">
                <div class="left">
                    <i class="iconfont icon-wd-gdinfo"></i>
                </div>
                <div class="right">
                    <span>更多</span>
                    <i class="iconfont icon-list-more"></i>
                </div>
            </router-link>
        </ul>
        <ul>
            <li v-show="isLogin" @click="loginOut">
                <div class="left">
                    <i class="iconfont icon-wd-out"></i>
                </div>
                <div class="right">
                    <span>退出登录</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import Header from "../../components/Header";
    import {
        MessageBox
    } from 'mint-ui';
    import func from "@/api/my";
    export default {
        name: "settings",
        data() {
            return {
                isLogin: sessionStorage.getItem('session')
            }
        },
        components: {
            Header,
            MessageBox,
        },
        data(){
            return {
                isLogin:sessionStorage.getItem("session")?true:false
            }
        },
        methods:{
            loginOut() {
                MessageBox({
                    title: " ",
                    message: "确认退出登录?",
                    showCancelButton: true
                }).then(resp => {
                    if (resp === "confirm") {
                        func.postLoginOut()
                            .then(res => {
                                sessionStorage.removeItem("session");
                                this.$router.push({
                                    name: "login"
                                });
                            })
                            .catch(err => {
                                this.$toast({
                                    message: err,
                                    duration: 2000
                                });
                            });
                    }
                });
            },
        }
    }
</script>

<style lang="less" scoped>
    @import url("../../components/less/common.less");
    .setting {
        padding: 1.22667rem 0 1.30667rem;
        .icon-wd-yuyan {
            color: #a3629e;
        }
        .icon-wd-lianxi {
            color: #a58bb9;
        }
        .icon-wd-banben {
            color: #da70a0;
        }
        .icon-wd-gdinfo {
            color: #1b4797;
        }
        .icon-wd-out {
            color: #94cac8;
        }
        ul {
            li {
                background-color: #fff;
                display: flex;
                &:active {
                    background: rgba(162, 100, 85, 0.2);
                }
                .left {
                    flex: 1;
                    padding: 0.27rem 0.4rem/* 30/75 */
                    ;
                    .iconfont {
                        font-size: 0.53333rem/* 40/75 */
                        ;
                        display: block;
                    }
                }
                .right {
                    color: @color-323233;
                    flex: 10;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-right: 0.4rem/* 30/75 */
                    ;
                    font-size: 0.42667rem/* 32/75 */
                    ;
                    .iconfont {
                        font-size: 0.32rem/* 24/75 */
                        ;
                        color: @color-818181;
                    }
                    .has-msg {
                        position: relative;
                        &::before {
                            content: "";
                            display: block;
                            position: absolute;
                            width: 0.18667rem/* 14/75 */
                            ;
                            height: 0.18667rem/* 14/75 */
                            ;
                            background-color: @color-red;
                            right: 0.45333rem/* 34/75 */
                            ;
                            border-radius: 50%;
                            top: 50%;
                            margin-top: -0.09333rem/* 7/75 */
                            ;
                        }
                    }
                }
                &:last-child {
                    .right {
                        border-bottom: none;
                    }
                }
            }
            &:last-child {
                margin-top: 0.26667rem/* 20/75 */
                ;
            }
        }
    }
</style>
