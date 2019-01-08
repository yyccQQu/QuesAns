<template>
    <div>
        <Header title="活动中心" :showBack="true" :showRight="true"></Header>
        <!--<Footer :activeIndex="1"></Footer>-->
        <!--redbag-->
        <Redbag v-show="bagSwitch === 1"></Redbag>
        <div class="content">
            <router-link tag="div" :to="{name:'luckdraw',query:{id:turnlist.id}}" v-show="turntable" class="activity-list">
                <div>
                    <img src="../../assets/img/huodong-dzp.png">
                </div>
                <div class="activity-status">
                    <span>进行中</span>
                </div>
                <div class="activity-list-fotter">
                    <div class="title">
                        <span>{{turnlist.title}}</span>
                    </div>
                    <div class="button">
                        <div>
                            <span>立即抽奖</span>
                        </div>
                    </div>
                </div>
            </router-link>
            <div v-for="actLists in actList" :key="actLists.id" class="activity-list">
                <div v-if="actLists.status === 3" @click="details(actLists.status,actLists.id)" class="maxMask"></div>
                <img :src="actLists.wapImg" @click="details(actLists.status,actLists.id)">
                <div class="activity-status" :class="{'over':actLists.status === 3}">
                    <span v-if="actLists.status === 1">进行中</span>
                    <span v-else-if="actLists.status === 2">未开始</span>
                    <span v-else-if="actLists.status === 3">已结束</span>
                </div>
                <div class="activity-list-fotter">
                    <!-- <div v-if="actLists.status === 2" class="minMask"></div> -->
                    <div class="title">
                        <span>{{actLists.title}}</span>
                    </div>
                    <div class="button" @click="receive(actLists.id)" :style="{'opacity':actLists.status === 2?'0.6':'1'}">
                        <div>
                            <span v-show="actLists.status === 1">立即领取</span>
                            <span v-show="actLists.status === 2">未开始</span>
                            <span v-show="actLists.status === 3">已结束</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--弹窗-->
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
                    <div class="tit"><i class="iconfont icon-sy-pop-shibai fs-35"></i><span>领取失败!</span></div>
                    <div class="text">
                        活动时间{{resData.beginTime |filterDate}}至{{resData.endTime | filterDate}}内，<br> 消费{{resData.againBet}}元即可领取{{resData.againMoney}}元奖励。
                    </div>
                    <div class="close" @click="actPop = false">关闭</div>
                </div>
            </div>
            <div class="box-mask" @click="close"></div>
        </div>
        <div class="bg"></div>
    </div>
</template>

<script>
    import Footer from "../../components/Footer";
    import Header from "../../components/Header";
    import Redbag from "../../components/RedBag";
    import {
        getActivityList,
        getTurntable,
        receiveActivity,
    } from '@/api/activity'
    export default {
        name: "activity",
        components: {
            Footer,
            Header,
            Redbag
        },
        data() {
            return {
                bagSwitch:sessionStorage.getItem('bag')*1,
                turntable: false,
                reHeadLeft: false,
                reHeadRight: false,
                actPop: false,
                rooter: "rooter-jianpuzhai",
                actList: [],
                turnlist: [],
                stusta: 0,
                resData: {},
                isLogin: sessionStorage.getItem('session')
            };
        },
        watch: {
            actPop(newVal, oldVal) {
                if (newVal) {
                    this.ModalHelper.open();
                } else {
                    this.ModalHelper.close();
                }
            }
        },
        mounted() {
            this.getList();
            if (this.isLogin) {
                this.getTurntable();
            }
        },
        methods: {
            details(status, id) {
                if (status === 1) {
                    //正
                    this.$router.push({
                        name: "actDetail",
                        query: {
                            id: id
                        }
                    });
                } else if (status === 2) {
                    this.$toast({
                        message: "活动未开始",
                        duration: 1000
                    });
                } else if (status === 3) {
                    //结束
                    this.$toast({
                        message: "活动已结束",
                        duration: 1000
                    });
                }
            },
            quickApply(status) {
                if (status === 1) {
                    //正
                    this.actPop = true;
                } else if (status === 2) {
                    //未开始
                    this.$toast({
                        message: "活动未开始",
                        duration: 1000
                    });
                }
            },
            close() {
                this.actPop = false;
            },
            getList() {
                getActivityList()
                    .then(res => {
                        this.actList = res.activityList;
                    })
                    .catch(err => {
                        this.$toast({
                            message: err,
                            duration: 2000
                        });
                    });
            },
            receive(id) {
                if(!this.isLogin){
                     this.$router.push("/login");
                    return;
                }
                receiveActivity(id).then(
                        resData => {
                            // console.log(resData,'===')
                            if (
                                resData.rewardMoney <= 0 &&
                                resData.againMoney != 0 &&
                                resData.againBet != 0
                            ) {
                                //未满足
                                this.stusta = 3;
                            } else if (
                                resData.rewardMoney > 0 &&
                                resData.againMoney != 0 &&
                                resData.againBet != 0
                            ) {
                                //满足1个梯度
                                this.stusta = 2;
                            } else if (
                                resData.rewardMoney > 0 &&
                                resData.againMoney == 0 &&
                                resData.againBet == 0
                            ) {
                                this.stusta = 1;
                            }
                            this.resData = resData;
                            this.actPop = true;
                        })
                    .catch(err => {
                        this.$toast({
                            message: err,
                            duration: 1200
                        });
                    });
            },
            getTurntable() {
                getTurntable().then(res => {
                    // console.log('res',res)
                    if (res.prize.length > 0) {
                        this.turntable = true;
                        this.turnlist = res;
                    }
                });
            }
        }
    };
</script>

<style lang="less" scoped>
    @import url("../../components/less/common.less");
    .content {
        padding-top: 1.22667rem;
        /* 92/75 */
        padding-bottom: 1.30667rem;
        // background: @color-252232;
        overflow-y: scroll;
        .activity-list {
            z-index: 1;
            margin: 0.4rem auto;
            width: 9.2rem;
            height: 4.8rem;
            border-radius: 0.267rem;
            overflow: hidden;
            position: relative;
            box-shadow: 0 0.053rem 0.133rem 0 rgba(0, 0, 0, 0.1);
            img {
                width: 100%;
                height: 4rem;
                border-radius: 0.267rem 0.267rem 0 0;
                display:block;
            }
            .activity-status {
                position: absolute;
                top:0.4rem;
                right: 0;
                width:1.6rem /* 120/75 */;
                height:.58667rem /* 44/75 */;
                line-height: .58667rem /* 44/75 */;
                background-color: rgba(0, 0, 0, 0.7);
                border-radius: .29333rem /* 22/75 */ 0 0 .29333rem /* 22/75 */;
                color: #fff;
                text-align: center;
                span {
                    font-size: 0.32rem;
                    line-height: 0.48rem;
                }
                
            }
            .activity-list-fotter {
                position: absolute;
                width: 100%;
                height: .8rem /* 60/75 */;
                background: #fff;
                bottom: 0;
                display: flex;
                .minMask {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.4);
                }
                .title {
                    flex: 4;
                    color: @color-252232;
                    line-height: 0.8rem;
                    padding-left: 0.3rem;
                    font-size: 0.32rem;
                }
                .button {
                    background: @color-fc4e02;
                    color:#fff;
                    // flex: 1;
                    width:1.86667rem /* 140/75 */;
                    text-align: center;
                    line-height: 0.8rem;
                    font-size: 0.32rem;
                }
            }
            .maxMask {
                z-index: 999;
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.4);
            }
        }
        &::-webkit-scrollbar {
            display: none;
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
            background: -webkit-gradient( linear, left top, left bottom, color-stop(0%, @color-ECB341), color-stop(100%, @color-F97526));
            background: -webkit-linear-gradient( top, @color-ECB341 0%, @color-F97526 100%);
            background: linear-gradient( to bottom, @color-ECB341 0%, @color-F97526 100%);
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
                }
                .text {
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
                        vertical-align: middle;
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
