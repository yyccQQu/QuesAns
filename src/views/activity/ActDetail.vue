<template>
    <div>
        <Header :rooter="'-1'" :title="info.title" :hasNoBack="true" :iFontsize="'.58667rem'"></Header>
        <div class="act-detail">
            <div class="self-img">
                <img :src="info.wapImg">
            </div>
            <div class="self-title">
                <h2>{{info.title}}</h2>
            </div>
            <div class="selfdetail-content" v-html="info.content"></div>
            <div class="self-btn" @click="receive">
                <div>
                    <span>点击领取</span>
                </div>
            </div>
        </div>
        <div class="actPop" v-show="actPop">
            <div class="actpopBox">
                <div class="btnpopContent" v-if="stusta ==1">
                    <div class="giftPic"><img src="../../assets/img/icon_liwu.png" alt=""></div>
                    <div class="tit">恭喜!</div>
                    <div class="text">成功领取奖励，奖励金额<span>{{resData.rewardMoney}}</span>元。</div>
                    <div class="close" @click="actPop = false">关闭</div>
                </div>
                <div class="btnpopContent" v-if="stusta ==2">
                    <div class="giftPic"><img src="../../assets/img/icon_liwu.png" alt=""></div>
                    <div class="tit">恭喜!</div>
                    <div class="text">成功领取奖励，奖励金额<span>{{resData.rewardMoney}}</span>元。<br> 活动时间{{resData.beginTime |filterDate}}至{{resData.endTime | filterDate}}内，<br> 再次消费{{resData.againBet}}元即可领取{{resData.againMoney}}元奖励。</div>
                    <div class="close" @click="actPop = false">关闭</div>
                </div>
                <div class="btnpopContent fail" v-if="stusta ==3">
                    <div class="tit"><i class="iconfont icon-sy-pop-shibai"></i><span>领取失败!</span></div>
                    <div class="text">
                        活动时间{{resData.beginTime |filterDate}}至{{resData.endTime | filterDate}}内，<br> 消费{{resData.againBet}}元即可领取{{resData.againMoney}}元奖励。
                    </div>
                    <div class="close" @click="actPop = false">关闭</div>
                </div>
            </div>
            <div class="box-mask" @click="actPop = false"></div>
        </div>
        <div class="bg"></div>
    </div>
</template>

<script>
    import Header from "../../components/Header"
    import {
        activityInfo,
        receiveActivity
    } from '@/api/activity'
    
    export default {
        name: "actDetail",
        components: {
            Header
        },
        data() {
            return {
                id: this.$route.query.id,
                info: {},
                stusta: 1,
                actPop: false,
                resData: {}
            }
        },
        mounted() {
            this.getInfo();
        },
        watch: {
            actPop(newVal, oldVal) {
                // if (newVal) {
                //     this.ModalHelper.open();
                // } else {
                //     this.ModalHelper.close();
                // }
            }
        },
        methods: {
            getInfo() {
                const _this = this;
                activityInfo(this.id).then(res => {
                    this.info = res;
                    // console.log(res);
                    setTimeout(() => {
                        // cosnt 
                        // _this.$('.selfdetail-content img').css({
                        //     'max-width': "100%"
                        // });
                    }, 1);
                }).catch(err => {
                    this.$toast({
                        message: err,
                        duration: 2000
                    });
                });
            },
            receive() {
                if (this.info.status == 2) {
                    this.$toast({
                        message: '活动未开始',
                        duration: 1000
                    });
                    return;
                }
                receiveActivity(this.id).then(resData => {
                    if (resData.rewardMoney <= 0 && resData.againMoney != 0 && resData.againBet != 0) {
                        //未满足
                        this.stusta = 3;
                    } else if (resData.rewardMoney > 0 && resData.againMoney != 0 && resData.againBet != 0) {
                        //满足1个梯度
                        this.stusta = 2;
                    } else if (resData.rewardMoney > 0 && resData.againMoney == 0 && resData.againBet == 0) {
                        this.stusta = 1;
                    }
                    this.resData = resData;
                    this.actPop = true;
                }).catch(err => {
                    this.$toast({
                        message: err,
                        duration: 2000
                    });
                });
            },
            close() {
                this.actPop = false;
            },
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../components/less/common.less');
    img {
        max-width: 100%;
    }
    
    .act-detail {
        z-index: 1;
        position: relative;
        padding-top: 1.22667rem;
        padding-bottom: 0.5333rem;
        // background: @color-252232;
        .self-img {
            width: 100%;
            height: 4rem;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .self-title {
            padding-top: .53333rem /* 40/75 */;
            background: #fff;
            h2 {
                padding-left: 0.4rem;
                font-size:.48rem /* 36/75 */;
                color: @color-252232;
            }
        }
        .selfdetail-content {
            background: #fff;
            padding: .4rem /* 30/75 */ 0.4rem .53333rem /* 40/75 */ 0.4rem;
            overflow: hidden;
        }
        .self-btn {
            font-size: .37333rem /* 28/75 */;
            margin-top: .4rem /* 30/75 */;
            margin-left: 0.4rem;
            margin-right: 0.4rem;
            width: 9.2rem;
            height: 1.067rem;
            background-color: @color-green;
            color:#fff;
            border-radius: 0.133rem;
            text-align: center;
            line-height: 1.067rem;
            box-shadow:0px 2px 5px 0px rgba(0,216,151,0.3);
        }
    }
    
    .actPop {
        .actpopBox {
            z-index: 1000;
            position: fixed;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            width: 7.2rem;
            margin: 0 auto;
            padding-bottom: 0.8rem;
            border-radius: 0.267rem;
            color: #fff;
            background: @color-ECB341;
            background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, @color-ECB341), color-stop(100%, @color-F97526));
            background: -webkit-linear-gradient(top, @color-ECB341 0%, @color-F97526 100%);
            background: linear-gradient(to bottom, @color-ECB341 0%, @color-F97526 100%);
            .btnpopContent {
                text-align: center;
                .giftPic {
                    position: absolute;
                    top: -1rem;
                    left: 50%;
                    margin-left: -1.07rem;
                    width: 2.133rem;
                    height: 2rem;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .tit {
                    margin-top: 1.52rem;
                    font-weight: bold;
                    font-size: 0.48rem;
                    i{
                        font-size:.93333rem /* 70/75 */;
                    }
                }
                .text {
                    padding: 0 0.2667rem;
                    margin: 0.3rem 0 0.433rem;
                    line-height: 0.5rem;
                    font-size: 0.373rem;
                }
                .close {
                    margin: 0 auto;
                    width: 3.12rem;
                    height: 0.8rem;
                    line-height: 0.8rem;
                    background-color: @color-ff3b30;
                    box-shadow: 0 0.027rem 0.067rem 0 rgba(0, 0, 0, 0.12);
                    border-radius: 0.133rem;
                }
            }
            .fail {
                .tit {
                    margin-top: 0.8rem;
                    line-height: 0.933rem;
                    font-weight: bold;
                    i {
                        vertical-align: middle;
                        color: @color-red;
                    }
                    span {
                        position: relative;
                        display: inline-block;
                        padding-left: 0.2667rem;
                        height: 0.933rem;
                        .tired {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 0.933rem;
                            height: 0.933rem;
                        }
                    }
                }
            }
        }
        .box-mask {
            z-index: 999;
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.4);
        }
    }
    
    .bg {
        z-index: 0;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        // background: @color-252232;
    }
</style>