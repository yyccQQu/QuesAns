<template>
    <div v-show="state" class="gameInto">
        <div class="popBox">
            <div class="popTit">快速转账 <div @click="closepop()" class="close iconfont icon-sykszz-close"></div></div>
            <ul class="quotaBox mui-clearfix">
                <li class="pk-1px-b">
                    <div class="left">系统余额</div>
                    <div class="right">
                        <span class="systemBalance">{{allmoney}}</span>
                        <router-link :to="{name:'deposit'}" tag="span" class="goWithdraw">去存款</router-link>
                    </div>
                </li>
                <li class="pk-1px-b">
                    <div class="left">{{gameName}}余额</div>
                    <div class="right systemBalance">{{balances}}</div>
                </li>
                <li>
                    <div class="left">即时转入</div>
                    <div class="right">
                        <input id="qtransfer" v-model="money" type="number" placeholder="请输入您要转入的金额">
                    </div>
                </li>
            </ul>
            <button @click="getForm()" type="button" class="mui-btn popBtn confirm active" data-loading-text="loading...">确认转账</button>
            <button @click="intoGame()" type="button" class="mui-btn popBtn goGame" data-loading-text="loading...">进入游戏</button>
        </div>
        <div class="box-mask"></div>
    </div>
</template>

<script>
    import {
        ratios,
        gameInto,
    } from '@/api/index'
    import func from '@/api/purse'
    export default {
        props:{
            state:{
                type:Boolean,
                default:false,
            },
            allmoney:{
                type:Number,
                default: 0,
            },
            platformId:{
                type: Number,
                default:0,
            },
            platformName:{
                type: String,
                default: '',
            },
            gameName:{
                type: String,
                default: '',
            },
            balances:{
                type: Number,
                default: 0,
            },
        },
        name: "gamepop",
        watch: {
            state(newVal, oldVal) {
                if (newVal) {
                    this.ModalHelper.open();
                } else {
                    this.ModalHelper.close();
                }
            }
        },
        data(){
            return{
                money: null,
            }
        },
        methods:{
            closepop(){
                this.states = false;
                this.$emit('returnState',this.states);
                this.money = ''
            },
            validateTrans(){//验证
                if (!this.APP_CONFIG.RegExp.number.test(this.money)) {
                    this.$toast({
                        message: '转入金额为正整数',
                        duration: 2000
                    });
                    return false;
                }
                if (this.money > this.allmoney || this.money < 1) {
                    this.$toast({
                        message: `转入金额不得高于${this.allmoney}元`,
                        duration: 2000
                    });
                    return false;
                }
                return true
            },
            getForm(){
                if (!this.validateTrans()) return;
                let postData = {
                    doType:2,
                    money:this.money * 1,
                    platformId:this.platformId,
                    platformName:this.platformName,
                };
                func.postTransfer(postData).then((res) => {
                    this.$toast({
                        message: '转入成功',
                        duration: 2000
                    });

                }).catch(err => {
                    this.$toast({
                        message: err,
                        duration: 2000
                    });
                });
            },
            intoGame(){
                gameInto(this.platformName,this.platformId).then((res) => {
                    window.open(res.loginUrl, '_blank', 'toolbar=yes, width=1300, height=900')
                }).catch((err) => {
                    this.$toast({
                        message: err,
                        duration: 2000
                    });
                });
            },
        }
    }
</script>

<style lang="less" scoped>
    @import url("../../components/less/common.less");
    .gameInto{
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        width: 100%;
        height: 100%;
        .popBox{
            z-index: 999;
            position: absolute;
            top: 50%;
            left: 50%;
            width: 9.2rem;
            height: 7.867rem;
            background-color: @color-f5f5fa;
            border-radius: 0.133rem;
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            overflow: visible;
            margin: 0 auto;
            .popTit {
                position: relative;
                line-height: 1.213rem;
                font-size: 0.427rem;
                font-weight: bold;
                padding-left: 0.4rem;
                color: @color-323233;
                .close{
                    position: absolute;
                    right: 0.4rem;
                    top: 0;
                    font-size: 0.32rem;
                    color: @color-969699;
                }
            }
            ul.quotaBox {
                padding: 0 0.4rem;
                height: 3.253rem;
                overflow: hidden;
                background-color: #fff;
                li{
                    height: 1.08rem;
                    line-height: 1.08rem;
                    font-size: 0.373rem;
                    overflow: hidden;
                    .left{
                        float: left;
                        color: @color-323233;
                    }
                    .systemBalance{
                        font-weight: bold;
                    }
                    .right{
                        float: right;
                        text-align: right;
                        color: @color-green;
                        span{
                            display: inline-block;
                        }
                        .goWithdraw {
                            margin-left: 0.12rem;
                            width: 1.06667rem;
                            height: 0.5333rem;
                            line-height: 0.5333rem;
                            text-align: center;
                            font-weight: normal;
                            font-size: 0.2667rem;
                            border: 1px solid @color-green;
                            color: @color-green;
                            border-radius: 0.08rem;
                        }
                        input {
                            margin: 0;
                            padding: 0;
                            background: none;
                            border: none;
                            height: 0.506667rem;
                            text-align: right;
                            color:@color-green;
                            &::-webkit-input-placeholder{
                                font-size: 0.32rem;
                                color:@color-green;
                            }
                        }
                    }
                }
            }
            .popBtn {
                display: block;
                margin: 0.4rem auto;
                width: 8.4rem;
                height: 1.067rem;
                line-height: 1.067rem;
                font-size: 0.373rem;
                border-radius: 0.133rem;
                border: 1px solid @color-green;
                color: @color-green;
                background: transparent;
            }
            .popBtn.mui-btn.active {
                color: #fff;
                background: @color-green;
            }
        }
        .box-mask {
            z-index: 998;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, .4);
        }
    }
</style>
