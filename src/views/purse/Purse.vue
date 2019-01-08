<template>
    <div class="purse">
        <Header :showBack="true" :showRight="true" title="钱包"></Header>
    
        <div class="person-info clearfix">
            <div class="left iconfont icon-sidebar_head"></div>
            <div class="center">
                <h2>{{account}}</h2>
                <router-link tag='p' :to="{name:'auditQuery'}">即时稽核查询</router-link>
            </div>
            <div class="right">
                <a @click="refush()">
                    <i class="iconfont icon-wallet-refresh"></i>
                    <span>刷新余额</span>
                </a>
            </div>
        </div>
        <div class="content-box">
            <div class="content">
                <div class="title">
                    <ul>
                        <li>
                            <span>系统余额</span>
                            <p v-show="isShowMoney" class="text-dots">{{balance}}</p>
                            <mt-spinner v-show="!isShowMoney" type="fading-circle" color="#00d897" :size="size"></mt-spinner>
                        </li>
    
                        <li>
                            <span>游戏总余额</span>
                            <p v-show="isShowMoney" class="text-dots">{{gameTotalBalance}}</p>
                            <mt-spinner v-show="!isShowMoney" type="fading-circle" color="#00d897" :size="size"></mt-spinner>
                        </li>
                    </ul>
                </div>
                <ul class="money-table clearfix">
                    <li @click="goTransfer(item)" v-for="(item,index) in gameBalance" :key="index" :class="{'pk-1px-b':index<=2,'pk-1px-l':index===1 || index===2|| index===4 }">
                        <span>{{item.name}}</span>
                        <p v-show="isShowMoney" class="text-dots">{{item.balance}}</p>
                        <mt-spinner v-show="!isShowMoney" type="fading-circle" color="#00d897" :size="size"></mt-spinner>
                    </li>
                    <router-link tag="li" :to="{name:'purseDeposit'}" class="pk-1px-l">
                        <span class="more">查看更多</span>
                        <i class="iconfont icon-wallet-more"></i>
                    </router-link>
                </ul>
                <div class="line"></div>
    
                <ul class="info-table clearfix">
                    <router-link tag="li" :to="{name:'deposit'}" class="pk-1px-b">
                        <a class="in"><i class="iconfont icon-qb-cunkuan"></i></a>
                        <p>存款</p>
                    </router-link>
                    <router-link tag="li" :to="{name:'withdraw'}" class="pk-1px-b pk-1px-l">
                        <a class="out"><i class="iconfont icon-qb-qukuan"></i></a>
                        <p>取款</p>
                    </router-link>
                    <router-link tag="li" :to="{name:'transfer'}" class="pk-1px-b pk-1px-l">
                        <a class="trans"><i class="iconfont icon-qb-eduzh"></i></a>
                        <p>额度转换</p>
                    </router-link>
                    <router-link tag="li" :to="{name:'depositRecord',query:{fromType:1}}" class="pk-1px-b">
                        <a class="in"><i class="iconfont icon-qb-cunkuanjl"></i></a>
                        <p>存款记录</p>
                    </router-link>
                    <router-link tag="li" :to="{name:'depositRecord',query:{fromType:3}}" class="pk-1px-b pk-1px-l">
                        <a class="out"><i class="iconfont icon-qb-qukuanjl"></i></a>
                        <p>取款记录</p>
                    </router-link>
                    <router-link tag="li" :to="{name:'depositRecord',query:{fromType:4}}" class="pk-1px-b pk-1px-l">
                        <a class="trans"><i class="iconfont icon-qb-eduzhjl"></i></a>
                        <p>额度转换记录</p>
                    </router-link>
                    <router-link tag="li" :to="{name:'backwater'}" v-show="isShow.isWaterSelf">
                        <a class="backShui"><i class="iconfont icon-qb-fanshui"></i></a>
                        <p>自助返水</p>
                    </router-link>
                    <router-link tag="li" :to="{name:'backCommission'}" v-show="isShow.isSpread" :class="{'pk-1px-l':isShow.isWaterSelf}">
                        <a class="backYong"><i class="iconfont icon-qb-fanyong"></i></a>
                        <p>会员返拥</p>
                    </router-link>
                    <router-link tag="li" :to="{name:'moneyWater'}" :class="{'pk-1px-l':isShow.isSpread}">
                        <a class="liuShui"><i class="iconfont icon-qb-xjliushui"></i></a>
                        <p>现金流水</p>
                    </router-link>
                </ul>
            </div>
        </div>
    
    </div>
</template>

<script>
    import Header from '@/components/Header'
    import func from "@/api/purse";
    import funcOther from "@/api/my"
    
    export default {
        name: 'purse',
        components: {
            Header,
        },
        data() {
            return {
                isShowMoney: true,
                size: parseInt(this.HTML_FONT_SIZE * 0.48),
                account: '',
                balance: 0, //系统余额
                gameTotalBalance: 0, //游戏总余额
                gameBalance: [], //游戏总余额数组
                isShow: {},
            }
        },
        created() {
            this.getWalletInfo();
        },
        methods: {
            getWalletInfo(t) {
                func.getWalletInfo().then((res) => {
                    this.isShowMoney = true;
                    this.account = res.walletCenterResp.account;
                    this.balance = res.walletCenterResp.balance;
                    this.gameTotalBalance = res.walletCenterResp.gameTotalBalance;
                    this.gameBalance = res.walletCenterResp.gameBalance.slice(0, 5);
                    this.isShow = res.memberSwitchInfo;
                    if (t) {
                        this.$toast({
                            message: '刷新成功',
                            duration: 2000
                        });
                    }
                }).catch(err => {
                    this.$toast({
                        message: err,
                        duration: 2000
                    });
                });
            },
            refush(){
                this.isShowMoney = false;
                this.getWalletInfo(1);
            },
            //去额度转换
            goTransfer(item) {
                this.$router.push({
                    name: 'transfer',
                    params: {
                        id: item.id
                    }
                })
            }
        }
    }
</script>

<style lang='less' scoped>
    @import url('../../components/less/common.less');
    .purse {
        padding-top: 1.22667rem/* 92/75 */
        ;
    }
    
    .person-info {
        background: #252232 url("../../assets/img/headbg.png") center 30px no-repeat;
        overflow: hidden;
        background-size: cover;
        padding-bottom: .85333rem/* 64/75 */
        ;
        .left {
            margin: 0.4rem/* 30/75 */
            ;
            float: left;
            font-size: 1.70667rem;
            color: @color-green;
        }
        .center {
            float: left;
            color: @color-green;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            height: 2.50667rem/* 188/75 */
            ;
            h2 {
                margin-bottom: 0.26667rem/* 20/75 */
                ;
                font-size: 0.48rem/* 36/75 */
                ;
            }
            p {
                font-size: .37333rem/* 28/75 */
                ;
                color: @color-8976cc;
            }
        }
        .right {
            float: right;
            height: 2.50667rem/* 188/75 */
            ;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-right: 0.4rem/* 30/75 */
            ;
            a {
                color: @color-green;
                border: 1px solid @color-green;
                border-radius: 0.08rem/* 6/75 */
                ;
                height: 0.58667rem/* 44/75 */
                ;
                line-height: 0.58667rem/* 44/75 */
                ;
                padding: 0 0.13333rem/* 10/75 */
                ;
                box-sizing: border-box;
                text-decoration: none;
                span {
                    color: @color-green;
                    font-size: .32rem/* 24/75 */
                    ;
                }
                .iconfont {
                    font-size: 0.32rem/* 24/75 */
                    ;
                }
            }
        }
    }
    
    .content-box {
        padding-bottom: .53333rem/* 40/75 */
        ;
    }
    
    .content {
        padding-top: 1.33333rem/* 100/75 */
        ;
        background: #fff;
        position: relative;
        .title {
            left: 0;
            top: -.85333rem/* 64/75 */
            ;
            position: absolute;
            width: 100%;
            padding: 0 30px;
            box-sizing: border-box;
            ul {
                display: flex;
                justify-content: space-between;
                background: #fff;
                box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.06);
                border-radius: .13333rem/* 10/75 */
                ;
                li {
                    flex: 1;
                    width: 50%;
                    text-align: center;
                    height: 1.84rem/* 138/75 */
                    ;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    span {
                        font-size: .4rem/* 30/75 */
                        ;
                        color: @color-323233;
                        &:first-child {
                            margin-bottom: .26667rem/* 20/75 */
                            ;
                        }
                    }
                    p {
                        font-size: .53333rem/* 40/75 */
                        ;
                        color: @color-green;
                    }
                    &:first-child {
                        position: relative;
                    }
                    &:first-child::before {
                        position: absolute;
                        content: "";
                        width: 1px;
                        transform: scaleX(0.5);
                        height: 1.06667rem/* 80/75 */
                        ;
                        display: block;
                        right: 0;
                        background: @color-c7c7cc;
                    }
                }
            }
        }
        .money-table {
            padding: 0 .4rem/* 30/75 */
            .26667rem/* 20/75 */
            ;
            li {
                float: left;
                width: 33.333%;
                text-align: center;
                height: 1.6rem/* 120/75 */
                ;
                display: flex;
                flex-direction: column;
                justify-content: center;
                &:nth-child(n+4) {
                    padding-top: .33333rem/* 25/75 */
                    ;
                    box-sizing: border-box;
                }
                span {
                    font-size: .4rem/* 30/75 */
                    ;
                    color: @color-969699;
                    &:first-child {
                        margin-bottom: .26667rem/* 20/75 */
                        ;
                    }
                    &.more {
                        margin-bottom: -.26667rem/* 20/75 */
                        ;
                    }
                }
                i {
                    font-size: 1.06667rem/* 80/75 */
                    ;
                    color: @color-8976cc;
                    opacity: 0.6;
                    position: relative;
                    bottom: -.13333rem/* 10/75 */
                    ;
                }
                p {
                    font-size: .48rem/* 36/75 */
                    ;
                    color: @color-323233;
                }
                &:last-child {
                    p {
                        margin-top: .13333rem/* 10/75 */
                        ;
                    }
                }
            }
        }
        .line {
            width: 100%;
            height: .26667rem/* 20/75 */
            ;
            background-color: @color-f0f0f5;
        }
        .info-table {
            margin-top: .26667rem/* 20/75 */
            ;
            padding: 0 .4rem/* 30/75 */
            .26667rem/* 20/75 */
            ;
            li {
                float: left;
                width: 33.333%;
                text-align: center;
                padding: .33333rem/* 25/75 */
                0;
                text-align: center;
                a {
                    display: inline-block;
                    margin-bottom: .26667rem/* 20/75 */
                    ;
                    width: 1.2rem/* 90/75 */
                    ;
                    height: 1.2rem/* 90/75 */
                    ;
                    line-height: 1.2rem/* 90/75 */
                    ;
                    border-radius: 50%;
                    &.in {
                        background-image: linear-gradient(@color-00b7ee, @color-00b7ee), linear-gradient(@color-e60012, @color-e60012);
                        background-blend-mode: normal, normal;
                    }
                    &.out {
                        background-image: linear-gradient(@color-f19149, @color-f19149), linear-gradient(@color-e60012, @color-e60012);
                        background-blend-mode: normal, normal;
                    }
                    &.trans {
                        background-image: linear-gradient(@color-ad5da1, @color-ad5da1), linear-gradient(@color-e60012, @color-e60012);
                        background-blend-mode: normal, normal;
                    }
                    &.backYong {
                        background-image: linear-gradient(@color-57d9b2, @color-57d9b2), linear-gradient(@color-e60012, @color-e60012);
                        background-blend-mode: normal, normal;
                        i {
                            font-size: .72rem/* 54/75 */
                            ;
                        }
                    }
                    &.backShui {
                        background-image: linear-gradient(@color-green, @color-green), linear-gradient(@color-e60012, @color-e60012);
                        background-blend-mode: normal, normal;
                        i {
                            font-size: .72rem/* 54/75 */
                            ;
                        }
                    }
                    &.liuShui {
                        background-image: linear-gradient(@color-39dceb, @color-39dceb), linear-gradient(@color-e60012, @color-e60012);
                        background-blend-mode: normal, normal;
                        i {
                            font-size: .72rem/* 54/75 */
                            ;
                        }
                    }
                    i {
                        font-size: .58667rem/* 44/75 */
                        ;
                        color: #fff;
                    }
                }
                p {
                    font-size: .32rem/* 24/75 */
                    ;
                    color: @color-323233;
                }
            }
        }
    }
</style>

