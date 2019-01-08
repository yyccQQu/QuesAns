<template>
    <div class="order-cent">
        <div class="popup">
            <div class="popup-name">视讯</div>
            <div class="popup-btn">
                <input @click="popupVisible = true" readonly v-model="chooseMainVal.name" type="text" placeholder="全部" :isShowHome="false">
            </div>
            <div class="popup-name">时间</div>
            <div class="popup-btn">
                <input @click="popupTime = true" readonly v-model="chooseTimeVal.value" type="text" placeholder="今天">
            </div>
            <div class="popup-name" v-if="chooseMainVal.value">彩种</div>
            <div class="popup-btn" v-if="chooseMainVal.value">
                <input @click="popupCard = true" readonly v-model="chooseCardVal.fcName" type="text" placeholder="全部彩种">
            </div>
        </div>
        <div v-if="list.length != 0" class="order-list">
            <div class="order-list-title">
                <div class="left">购彩名称</div>
                <div class="right">盈利</div>
                <div class="right">可赢</div>
                <div class="right">投注</div>
            </div>
            <ul>
                <li class="pk-1px-t" @click="toggle(lotteryLists)" v-for="lotteryLists in list" :key="lotteryLists.id">
                    <div class="top clearfix">
                        <div class="text-dots left">{{lotteryLists.gameTranslatedName}}</div>
                        <div class="text-dots right winlose">{{lotteryLists.gameResult?lotteryLists.gameResult:'未结算'}}</div>
                        <div class="text-dots right">{{lotteryLists.betAll}}</div>
                        <div class="text-dots right">{{lotteryLists.win}}</div>
                    </div>
                    <div class="center clearfix">
                        <div class="left">{{lotteryLists.productName}}</div>
                    </div>
                    <div class="bottom clearfix">
                        <div class="text-dots left">注单号：{{lotteryLists.orderId}}</div>
                        <div class="text-dots right">{{lotteryLists.betTime|filterDate}}</div>
                        <div class="text-dots right">{{lotteryLists.periodsOrTable}}期</div>
                    </div>
                    <div class="noteShow clearfix" v-show="lotteryLists.show">
                        <div class="details">
                            <div class="details-tit">投注明细：</div>
                            <div class="details-cont">{{lotteryLists.betDetail}}</div>
                        </div>
                    </div>
                    <div class="arrowIcon iconfont icon-order-moreinfo fs-10" v-bind:class="{'up':lotteryLists.show,'down':!lotteryLists.show}"></div>
                </li>
            </ul>
        </div>
        <div v-else-if="list.length === 0" class="no-data">
            <div class="no-data-img">
                <i class="iconfont icon-list-zanwusj"></i>
            </div>
            <p class="no-data-text">当前还没有投注记录</p>
        </div>
        <mt-popup :closeOnClickModal="true" :position="'bottom'" v-model="popupVisible" style="width: 100%;z-index: 2003;">
            <div class="popup-title pk-1px-b">
                <span @click="cancelGame()">取消</span>
                <span></span>
                <span @click="sureGame()">确定</span>
            </div>
            <mt-picker :itemHeight="itemHeight" valueKey="name" :slots="mainType" @change="onGameValuesChange"></mt-picker>
        </mt-popup>
        <mt-popup :closeOnClickModal="true" :position="'bottom'" v-model="popupTime" style="width: 100%;z-index: 2003;">
            <div class="popup-title pk-1px-b">
                <span @click="cancelTime()">取消</span>
                <span></span>
                <span @click="sureTime()">确定</span>
            </div>
            <mt-picker :itemHeight="itemHeight" valueKey="value" :slots="mainTimeType" @change="onTimeValuesChange"></mt-picker>
        </mt-popup>
        <mt-popup :closeOnClickModal="true" :position="'bottom'" v-model="popupCard" style="width: 100%;z-index: 2003;">
            <div class="popup-title pk-1px-b">
                <span @click="cancelKind()">取消</span>
                <span></span>
                <span @click="sureKind()">确定</span>
            </div>
            <mt-picker :itemHeight="itemHeight" valueKey="fcName" :slots="mainKindType" @change="onKindValuesChange"></mt-picker>
        </mt-popup>
    </div>
</template>

<script>
    import {
        getDrop,
        lotteryList,
        getKindDrop
    } from "@/api/Order";
    export default {
        name: "lottery",
        data() {
            return {
                popupVisible: false,
                popupTime: false,
                popupCard: false,
                itemHeight: 36,
                chooseMain: "",
                chooseMainOld: "",
                chooseTime: {
                    key: 4,
                    name: "今天"
                },
                chooseTimeOld: "",
                chooseCard: "",
                chooseCardOld: "",
                chooseMainVal: {
                    value: ''
                },
                chooseTimeVal: {
                    key: 2
                },
                chooseCardVal: {
                    fcHref: ""
                },
                page: 1,
                pageSize: 10,
                list: [],
                mainType: [{
                    flex: 1,
                    values: [],
                    className: "mainType",
                    textAlign: "center"
                }],
                mainTimeType: [{
                    flex: 1,
                    values: this.APP_CONFIG.constant.timerDrop,
                    className: "mainType",
                    textAlign: "center"
                }],
                mainKindType: [{
                    flex: 1,
                    values: [],
                    className: "mainType",
                    textAlign: "center"
                }]
            };
        },
        created() {
            this.itemHeight = parseInt(this.HTML_FONT_SIZE * 1.06667);
        },
        mounted() {
            this.getList();
            this.getDrop();
        },
        methods: {
            getDrop() {
                getDrop(4)
                    .then(res => {
                        // console.log(res);
                        res.betType.unshift({
                            name: "全部",
                            value: ""
                        });
                        this.mainType[0].values = res.betType;
                    })
                    .catch(err => {
                        this.$toast({
                            message: err,
                            duration: 2000
                        });
                    });
            },
            toggle(lotteryLists) {
                lotteryLists.show = !lotteryLists.show;
            },
            getList() {
                lotteryList(4, this.chooseTimeVal.key, this.chooseMainVal.value, this.page, this.pageSize, this.chooseCardVal.fcHref)
                    .then(res => {
                        // console.log(res.BetReportInfo, "res");
                        if (res.BetReportInfo.length > 0) {
                            res.BetReportInfo.map(v => {
                                v.show = false;
                            });
                            this.list = res.BetReportInfo;
                        } else {
                            this.list = [];
                        }
                    })
                    .catch(err => {
                        // console.log(err);
                        this.$toast({
                            message: err,
                            duration: 2000
                        });
                    });
            },
            //选择器
            onGameValuesChange(picker, values) {
                if (values[0]) {
                    this.chooseMain = values[0];
                }
            },
            cancelGame() {
                this.popupVisible = false;
            },
            sureGame() {
                this.popupVisible = false;
                if (this.chooseMainOld.value != this.chooseMain.value) {
                    this.chooseMainOld = this.chooseMain;
                    this.chooseMainVal = this.chooseMain;
                    this.getList();
                    if (this.chooseMainVal.topId) {
                        this.getKindDrop();
                    }
                }
            },
            getKindDrop() {
                getKindDrop(this.chooseMainVal.topId)
                    .then(res => {
                        // console.log(res, 'res')
                        res.lotteryTicketType.unshift({
                            fcHref: "",
                            fcName: "全部彩种",
                            id: 0
                        });
                        this.mainKindType[0].values = res.lotteryTicketType;
                        // console.log(this.mainKindType[0].values);
                    })
                    .catch(err => {
                        this.$toast({
                            message: err,
                            duration: 2000
                        });
                    });
            },
    
            onTimeValuesChange(picker, values) {
                if (values[0]) {
                    this.chooseTime = values[0];
                }
            },
            cancelTime() {
                this.popupTime = false;
            },
            sureTime() {
                this.popupTime = false;
                if (this.chooseTimeOld.key != this.chooseTime.value) {
                    this.chooseTimeOld = this.chooseTime;
                    this.chooseTimeVal = this.chooseTime;
                    this.getList();
                }
            },
            onKindValuesChange(picker, values) {
                if (values[0]) {
                    this.chooseCard = values[0];
                }
            },
            cancelKind() {
                this.popupCard = false;
            },
            sureKind() {
                this.popupCard = false;
                if (this.chooseCardOld.id != this.chooseCard.id) {
                    this.chooseCardOld = this.chooseCard;
                    this.chooseCardVal = this.chooseCard;
                    this.getList();
                }
            }
        }
    };
</script>

<style lang="less" scoped>
    @import url("../../components/less/common.less");
    .popup-title {
        height: 1.06667rem/* 80/75 */
        ;
        padding: 0 0.4rem/* 30/75 */
        ;
        font-size: 0.4rem/* 30/75 */
        ;
        color: @color-323233;
        text-align: center;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
            flex: 1;
            height: 1.06667rem/* 80/75 */
            ;
            line-height: 1.06667rem/* 80/75 */
            ;
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
    
    .order-list {
        padding: 0 0.4rem;
        font-size: 0.427rem;
        color: @color-323233;
        font-weight: 500;
        background-color: #fff;
        .order-list-title {
            height: 1rem;
            line-height: 1rem;
            .left {
                max-width: 3.2rem;
            }
        }
        ul {
            li {
                padding: 0.347rem 0 0.3rem;
                color: @color-323233;
                .top {
                    font-weight: bold;
                    font-size: 0.373rem;
                    .winlose {
                        color: @color-green;
                        font-weight: normal;
                        font-stretch: normal;
                    }
                }
                .center {
                    margin: 0.25rem 0;
                    font-size: 0.32rem;
                }
                .bottom {
                    color: @color-969699;
                    .left,
                    .right {
                        font-size: 0.32rem;
                        height: 0.33rem;
                        line-height: 0.33rem;
                    }
                }
                .noteShow {
                    position: relative;
                    margin-top: 0.24rem;
                    padding: 0.2rem 0.28rem;
                    font-size: 0.32rem;
                    color: @color-646466;
                    background-color: @color-f5f5f5;
                    border-radius: 0.133rem;
                    .details {
                        line-height: 0.5rem;
                        .details-tit {
                            float: left;
                            width: 1.6rem;
                            text-align: right;
                        }
                        .details-cont {
                            padding-left: 1.6rem;
                            color: @color-f78e27;
                            word-break: break-word;
                        }
                    }
                    .position {
                        position: absolute;
                        top: 0.2rem;
                        right: 0.28rem;
                    }
                }
                .arrowIcon {
                    position: absolute;
                    top: 0.933rem;
                    right: 0;
                    color: #7c71ab;
                    transition: all 0.2s;
                }
                .up {
                    transform: rotate(180deg);
                }
            }
        }
        .left {
            float: left;
            max-width: 5rem;
        }
        .right {
            float: right;
            width: 2rem;
            text-align: center;
        }
    }
    
    .no-data {
        padding-top: 0.8rem;
        text-align: center;
        // background-color: #fff;
        i {
            font-size: 2.53333rem/* 190/75 */
            ;
            color: @color-8976cc;
            opacity: 0.6;
        }
        .no-data-img {
            margin: 0 auto;
            width: 2.533rem;
            height: 2.267rem;
            img {
                width: 100%;
            }
        }
        .no-data-text {
            padding: 0.25rem 0 0.8rem;
            font-size: 0.427rem;
            color: @color-8976cc;
        }
    }
    
    .popup {
        margin: 0.267rem 0;
        padding: 0 0.4rem;
        height: 1rem;
        line-height: 1rem;
        font-size: 0.32rem;
        color: @color-green;
        background-color: #fff;
        .popup-name {
            float: left;
            font-size: 0.373rem;
        }
        .popup-btn {
            float: left;
            margin: 0 0.5rem 0 0.13rem;
            input {
                width: 1.8rem;
                height: 0.64rem;
                text-align: center;
                line-height: 0.64rem;
                background-color: #ffffff;
                border-radius: 0.133rem;
                border: solid 0.027rem @color-green;
                color: @color-green;
                &::-webkit-input-placeholder {
                    color: @color-green;
                }
            }
            &:last-child {
                margin-right: 0;
            }
        }
    }
</style>