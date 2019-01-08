<template>
    <div>
        <mt-popup :closeOnClickModal="true" :position="'bottom'" v-model="popupVisible" style="width: 100%;z-index: 2003;">
            <div class="popup-title pk-1px-b">
                <span @click="cancel()">取消</span>
                <span></span>
                <span @click="sure()">确定</span>
            </div>
            <mt-picker :itemHeight="itemHeight" :slots="weeks" @change="onValuesChange"></mt-picker>
        </mt-popup>
    
        <Header :title="'报表'" :rooter="'-1'" :hasNoBack="true" :iFontsize="'.58667rem'"></Header>
        <div class="formOutbox" :class="nodata">
            <div class="form-popup">
                <!--<input @click="popupVisible = true" v-model="chooseWeek" type="text" value="" placeholder="最近一周" readonly>-->
                <span @click="popupVisible = true" class="iconfont icon-list-time input">{{chooseWeek}}</span>
            </div>
            <div v-if="reportform.length != 0" class="formList">
                <div class="title">
                    <div class="flex-demo before">下注总额</div>
                    <div class="flex-demo">有效下注总额</div>
                    <div class="flex-demo after">盈利</div>
                </div>
                <ul>
                    <li v-for="(orderList,index) in reportform" :key="index" class="pk-1px-t">
                        <div class="top">
                            <div class="text-dots flex-demo before">{{orderList.betAll}}</div>
                            <div class="text-dots flex-demo">{{orderList.betValid}}</div>
                            <div class="text-dots flex-demo after">{{orderList.win}}</div>
                        </div>
                        <div class="bottom">
                            <div class="text-dots flex-demo before">{{orderList.betTime | filterDate('YYYY-MM-DD')}} {{orderList.weekday}}</div>
                            <div class="text-dots flex-demo after">注单量:{{orderList.betNum}}</div>
                        </div>
                    </li>
                </ul>
                <div v-if="total.totalBetAll != 0" class="pk-1px-t total">
                    <div class="top">
                        <div class="text-dots flex-demo before">{{total.totalBetAll}}</div>
                        <div class="text-dots flex-demo">{{total.totalBetValid}}</div>
                        <div class="text-dots flex-demo after">{{total.totalWin}}</div>
                    </div>
                    <div class="bottom">
                        <div class="text-dots flex-demo before">总计</div>
                        <div class="text-dots flex-demo after">注单量:{{total.totalBetNum}}</div>
                    </div>
                </div>
            </div>
            <div v-else-if="reportform.length === 0" class="no-data">
                <div class="no-data-img iconfont icon-list-zanwusj"></div>
                <p class="no-data-text">您还未进行游戏哦~</p>
                <!-- <Advcommon></Advcommon> -->
            </div>
        </div>
    
    </div>
</template>

<script>
    import Header from "../../components/Header";
    // import Advcommon from "../../components/Advcommon";
    // import wallet from '@/proto/wallet_pb'
    // const wallet = proto.pb;
    
    import {
        getReportform
    } from "@/api/Order";
    export default {
        components: {
            Header,
            // Advcommon
        },
        created() {
            this.itemHeight = parseInt(this.HTML_FONT_SIZE * 1.06667);
        },
        name: "reportform",
        data() {
            return {
                nodata: '',
                popupVisible: false,
                itemHeight: 36,
                chooseWeek: "最近一周",
                chooseWeekVal: '',
                time: 3,
                totalist: [],
                reportform: [],
                weeks: [{
                    flex: 1,
                    values: ['昨天', '今天', '最近一周', '最近一个月'],
                    className: 'week',
                    textAlign: 'center'
                }]
            }
        },
        mounted() {
            this.order(this.time);
        },
        methods: {
            closeadv: function() {
                this.isAdv = !this.isAdv;
            },
            onValuesChange(picker, values) {
                this.chooseWeekVal = values[0];
            },
            cancel() {
                this.popupVisible = false;
            },
            sure() {
                this.chooseWeek = this.chooseWeekVal;
                this.popupVisible = false;
                let valist = this.weeks[0];
                for (var i in valist.values) {
                    if (valist.values[i] == this.chooseWeek) {
                        this.time = i * 1 + 1
                    }
                }
                this.order(this.time);
            },
            order(time) {
                getReportform(time).then(res => {
                    this.total = res;
                    this.reportform = res.betReportAccount
                    if (this.reportform.length === 0) {
                        this.nodata = 'nodatapd'
                    }
                }).catch(err => {});
            },
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../components/less/common.less');
    .popup-title {
        height: 1.06667rem;
        padding: 0 .4rem;
        font-size: .4rem;
        color: @color-323233;
        text-align: center;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
            flex: 1;
            height: 1.06667rem;
            line-height: 1.06667rem;
        }
        span:first-child {
            color: @color-323233;
            text-align: left;
        }
        span:last-child {
            color: @color-green;
            text-align: right;
        }
    }
    
    .formOutbox {
        padding-top: 1.22667rem;
        .form-popup {
            padding-right: 0.4rem;
            height: 0.91rem;
            span.iconfont {
                float: right;
                line-height: 0.91rem;
                font-size: 0.373rem;
                color: @color-646466;
                &:before {
                    padding-right: 0.1rem;
                }
            }
        }
        .formList {
            .title {
                padding: 0 0.4rem;
                background-color: #fff;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                line-height: 1rem;
                font-weight: bold;
                font-size: 0.43rem;
                color: @color-323233;
            }
            .flex-demo {
                text-align: center;
                -webkit-box-flex: 1;
                -ms-flex: 1;
                flex: 1;
            }
            .before {
                text-align: left;
            }
            .after {
                text-align: right;
            }
            ul {
                padding: 0 0.4rem;
                background-color: #fff;
                li {
                    padding: 0.37rem 0 0.33rem;
                    .top {
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        font-weight: bold;
                        font-size: 0.37rem;
                        color: @color-323233;
                        .after {
                            color: @color-green;
                        }
                    }
                    .bottom {
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        margin-top: 0.31rem;
                        font-size: 0.32rem;
                        color: @color-969699;
                    }
                }
            }
            .total {
                background-color: #fff;
                margin-top: 0.267rem;
                padding: 0.37rem 0.4rem 0.33rem;
                .top {
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    font-weight: bold;
                    font-size: 0.37rem;
                    color: @color-323233;
                    .after {
                        color: @color-green;
                    }
                }
                .bottom {
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    margin-top: 0.31rem;
                    font-size: 0.32rem;
                    color: @color-969699;
                    .before {
                        color: @color-green;
                        font-weight: bold;
                    }
                }
            }
        }
    }
    
    .no-data {
        height: 3.73rem;
        padding-top: 0.8rem;
        text-align: center;
        .no-data-img {
            margin: 0 auto;
            width: 2.533rem;
            height: 2.267rem;
            opacity: 0.5;
            font-size: 2.533rem;
            color: @color-8976cc;
        }
        .no-data-text {
            padding: 0.25rem 0 0.8rem;
            font-size: 0.427rem;
            color: @color-8976cc;
        }
    }
</style>
