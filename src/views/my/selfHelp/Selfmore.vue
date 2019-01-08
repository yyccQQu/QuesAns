<template>
    <div id="selfHelp">
    
        <Header :rooter="'-1'" :title="'优惠申请记录'" :hasNoBack="true" :iFontsize="'.58667rem'" :isShowHome="false"></Header>
        <div class="self-total">
            <span>最近一个月累计获得<span class="money">{{money}}元优惠</span>申请金额</span>
        </div>
        <div class="more-content">
            <div class="list">
                <div class="more-title">
                    <div class="name">
                        <span>活动名称</span>
                    </div>
                    <div class="progress">
                        <span>申请进度</span>
                    </div>
                    <div class="amount">
                        <span>实际金额</span>
                    </div>
                </div>
                <div class="more-list" v-for="data in list" :key="data.id" v-if="list.length > 0">
                    <div class="list-name">
                        <span>{{data.activityTitle}}</span>
                        <span class="time">{{data.createTime | filterDate}}</span>
                    </div>
                    <div class="list-progress">
                        <span>{{data.status == 1?'申请中':data.status == 2?"成功":"失败"}}</span>
                        <span>{{data.depositMoney}}</span>
                    </div>
                    <div class="list-amount">
                        <span>{{data.actualMoney}}</span>
                    </div>
                </div>
                <div v-show="list.length <= 0 " class="no-data">
                    <div class="no-data-img">
                        <i class="iconfont icon-list-zanwusj"></i>
                    </div>
                    <p class="no-data-text">当前还没有投注记录</p>
                </div>
    
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "../../../components/Header";
    import {
        getList
    } from "@/api/Selfmore";
    
    export default {
        name: "selfmore",
        components: {
            Header
        },
        data() {
            return {
                list: [],
                money: 0
            };
        },
        mounted() {
            this.getList();
        },
        methods: {
            getList() {
                getList()
                    .then(res => {
                        // console.log(res);
                        this.list = res.promotionRecord;
                        this.money = res.money;
                    }).catch({
                        msg: '信息获取失败',
                        duration: 2000
                    });
    
            }
        }
    };
</script>

<style lang="less" scoped>
    #selfHelp {
        box-sizing: border-box;
        line-height: 1;
        .self-total {
            padding-top: 1.22667rem;
            /* 92/75 */
            height: 1.067rem;
            background-color: #ffffff;
            padding-left: 0.4rem;
            line-height: 1.067rem;
            span {
                .money {
                    color: #00d897;
                }
            }
        }
        .more-content {
            // margin-top: .4rem;
            background-color: #ffffff;
            .list {
                padding-left: 0.4rem;
                padding-right: 0.4rem;
                .more-title {
                    display: flex;
                    height: 1.067rem;
                    border-bottom: solid 0.013rem #c8c8cc;
                    .name {
                        flex: 1;
                        text-align: center;
                        line-height: 1.067rem;
                    }
                    .progress {
                        flex: 1;
                        text-align: center;
                        line-height: 1.067rem;
                    }
                    .amount {
                        flex: 1;
                        text-align: center;
                        line-height: 1.067rem;
                    }
                }
                .more-list {
                    display: flex;
                    border-bottom: solid 0.013rem #c8c8cc;
                    .list-name {
                        padding: 0.3rem;
                        text-align: center;
                        flex: 1;
                        span {
                            display: inline-block;
                            padding-top: 0.2rem;
                        }
                        .time {
                            font-size: 0.32rem;
                            color: #969699;
                        }
                    }
                    .list-progress {
                        padding: 0.3rem;
                        text-align: center;
                        flex: 1;
                        span {
                            display: block;
                            padding-top: 0.2rem;
                        }
                    }
                    .list-amount {
                        padding: 0.3rem;
                        text-align: center;
                        flex: 1;
                        span {
                            display: block;
                            padding-top: 0.2rem;
                            color: #00d897;
                            font-weight: normal;
                            font-size: 0.427rem;
                        }
                    }
                }
            }
        }
    }
</style>