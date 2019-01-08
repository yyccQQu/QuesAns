<template>
    <div class="purseDeposit">
        <Header title="钱包余额" rooter="-1" :hasNoBack="true" iFontsize=".58667rem"></Header>
    
        <div class="person-info clearfix">
            <div class="left iconfont icon-sidebar_head"></div>   
            <div class="center">
                <h2>{{account}}</h2>
            </div>
            <router-link tag="div" :to="{name:'reportform'}" class="right">
                <a>
                    <i class="iconfont icon-qb-baobiao"></i>
                    <span>我的报表</span>
                </a>
            </router-link>
        </div>
        <div class="content-box">
            <ul class="desposit">
                <li class="pk-1px-b">
                    <span>系统余额</span>
                    <span>{{balance}}</span>
                </li>
                <li>
                    <span>游戏总余额</span>
                    <span>{{gameTotalBalance}}</span>
                </li>
            </ul>
            <ul class="lottery-list">
                <li v-for="(item,index) in gameBalance" :key="index" class="pk-1px-b">
                    <span>{{item.name}}</span>
                    <span>{{item.balance}}</span>
                </li>
    
            </ul>
        </div>
    
    
    </div>
</template>

<script>
    import Header from "@/components/Header";
    import func from "@/api/purse";

    export default {
        name: 'purseDeposit',
        components: {
            Header,
        },
        data() {
            return {
                account: '',
                balance: 0, //系统余额
                gameTotalBalance: 0, //游戏总余额
                gameBalance: [], //游戏总余额数组
            }
        },
        created() {
            this.getWalletInfo();
        },
        methods: {
            getWalletInfo() {
                func.getWalletInfo().then((res) => {
                    this.isShowMoney = true;
                    this.account = res.walletCenterResp.account;
                    this.balance = res.walletCenterResp.balance;
                    this.gameTotalBalance = res.walletCenterResp.gameTotalBalance;
                    this.gameBalance = res.walletCenterResp.gameBalance;
                    this.isShow = res.memberSwitchInfo;
                }).catch(err => {
                    this.$toast({
                        message: err,
                        duration: 2000
                    });
                });
            },
        }
    }
</script>

<style lang='less' scoped>
    @import url('../../components/less/common.less');
    .purseDeposit {
        padding-top: 1.22667rem/* 92/75 */
        ;
        padding-bottom: 1.30667rem/* 98/75 */
        ;
    }
    
    .person-info {
        background: #252232 url("../../assets/img/headbg.png") center 30px no-repeat;
        overflow: hidden;
        background-size: cover;
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
        margin-top: .26667rem/* 20/75 */
        ;
        padding-bottom: .53333rem/* 40/75 */
        ;
        .desposit {
            background: #fff;
            li {
                padding: 0 .4rem/* 30/75 */
                ;
                height: 1.06667rem/* 80/75 */
                ;
                display: flex;
                justify-content: space-between;
                align-items: center;
                span {
                    font-size: .42667rem/* 32/75 */
                    ;
                    color: @color-323233;
                }
                span:last-child {
                    color: @color-green;
                }
            }
        }
        .lottery-list {
            .desposit;
            margin-top: .26667rem/* 20/75 */
            ;
            li {
                span {
                    font-size: .37333rem/* 28/75 */
                    ;
                }
                span:last-child {
                    color: @color-323233;
                }
            }
        }
    }
</style>

