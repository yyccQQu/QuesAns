<template>
    <div class="widthdraw-audit">
        <Header rooter="-1" title="取款" :hasNoBack="true" iFontsize=".58667rem"></Header>
        <div class="content">
            <div class="title">稽核明细</div>
            <div class="audit-details">
                <ul>
                    <li>
                        <span>存款金额</span>
                        <span>{{infoData.deposit}}</span>
                    </li>
                    <li class="pk-1px-tb">
                        <span>存款优惠</span>
                        <span>{{infoData.depositMoney}}</span>
                    </li>
                    <li class="h114">
                        <span>总实际有效投注</span>
                        <span class="details" @click="isShowDetails = !isShowDetails">
                                <b>{{infoData.betAll}}</b>
                                <a>投注明细</a>
                            </span>
                    </li>
                    <div v-show="isShowDetails" class="details-content">
                        <ol>
                            <li>
                                <span class="pk-1px-b">彩票</span>
                                <span class="text-dots">{{infoData.gameLottery}}</span>
                            </li>
                            <li class="pk-1px-l pk-1px-r">
                                <span class="pk-1px-b">棋牌</span>
                                <span class="text-dots">{{infoData.gameChess}}</span>
                            </li>
                            <li>
                                <span class="pk-1px-b">视讯</span>
                                <span class="text-dots">{{infoData.gameVideo}}</span>
                            </li>
                            <li class="pk-1px-l pk-1px-r">
                                <span class="pk-1px-b">电子</span>
                                <span class="text-dots">{{infoData.gameElectronics}}</span>
                            </li>
                            <li>
                                <span class="pk-1px-b">体育</span>
                                <span class="text-dots">{{infoData.gameSports}}</span>
                            </li>
                        </ol>
                    </div>
                </ul>
            </div>
            <div class="widthdraw-money">
                <dl>
                    <dt>
                           <span>取款金额</span>
                           <span>{{infoData.money}}</span>
                       </dt>
                    <dd class="pk-1px-tb">
                        <span>是否满足稽核</span>
                        <span>扣款项目</span>
                        <span class="special">扣款金额</span>
                    </dd>
                    <dd>
                        <span>{{infoData.normal ===2?'不':''}}满足常态性稽核</span>
                        <span>行政费</span>
                        <span class="text-dots">{{infoData.adminMoney}}</span>
                    </dd>
                    <dd class="pk-1px-tb">
                        <span>{{infoData.multiple ===2?'不':''}}满足综合稽核</span>
                        <span>优惠</span>
                        <span class="text-dots">{{infoData.depositMoney}}</span>
                    </dd>
                    <dd class="pk-1px-b">
                        <span>-</span>
                        <span>手续费</span>
                        <span class="text-dots">{{infoData.outCharge}}</span>
                    </dd>
                    <dd>
                        <span style="font-weight:400;">总扣除</span>
                        <span class="text-dots">{{infoData.adminMoney*1 + infoData.depositMoney*1 + infoData.outCharge*1}}</span>
                    </dd>
    
                </dl>
            </div>
            <div class="widthdraw-result">
                <span v-show="infoData.outMoney <=0">取款金额小于费用，无法取款</span>
    
                <span v-show="infoData.outMoney >0">最终取款金额</span>
                <p v-show="infoData.outMoney >0" class="text-dots">{{infoData.outMoney}}</p>
    
            </div>
            <div class="widthdraw-bottom">
                <div class="submit-btn">
                    <button class="close" v-show="infoData.outMoney <=0" @click="$router.go(-2)">关闭</button>
                    <button class="continue" v-show="infoData.outMoney >0" @click="handleContinue">继续取款</button>
                    <button class="cancel" v-show="infoData.outMoney >0" @click="$router.go(-1)">取消</button>
                </div>
                <div class="hint">
                    <h3>温馨提示：</h3>
                    <p>常态稽核=会员入款金额*常态稽核倍数-放宽额度</p>
                    <p>综合稽核=（会员入款金额+入款优惠金额）*综合稽核倍数+优惠金额*相应综合稽核倍数</p>
                    <p>出款出现以下情况将会扣除一定费用：</p>
                    <p>1.未满足常态稽核将扣除入款金额<span>{{infoData.lineAuditAdminRate}}%</span>的行政费用。</p>
                    <p>2.未满足综合稽核将会扣除优惠金额。</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '@/components/Header'
    import func from '@/api/purse'

    export default {
        name: 'withdrawAudit',
        components: {
            Header
        },
        created() {
        },
        data() {
            return {
                isShowDetails: false,
                infoData: this.$route.query, //从取款页面传过来的数据
            }
        },
        methods: {
            //继续出款
            handleContinue() {
                func.postWithdrawContinue({
                    key:this.infoData.key
                }).then((res) => {
                    this.$router.push({
                        name: 'withdrawSuccess',
                        query: res
                    })
                }).catch(err =>{
                     this.$toast({
                        message: err,
                        duration: 2000
                    });
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../../components/less/common.less');
    .content {
        padding: 1.22667rem/* 92/75 */
        0;
        .title {
            height: 1.06667rem/* 80/75 */
            ;
            line-height: 1.06667rem/* 80/75 */
            ;
            padding-left: .4rem/* 30/75 */
            ;
            font-size: .42667rem/* 32/75 */
            ;
            color: @color-323233;
        }
        .audit-details {
            ul {
                background: #fff;
                padding: 0 .4rem/* 30/75 */
                ;
                li {
                    height: 1.06667rem/* 80/75 */
                    ;
                    font-size: .37333rem/* 28/75 */
                    ;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .details {
                        display: flex;
                        flex-direction: column;
                        font-size: .37333rem/* 28/75 */
                        ;
                        text-align: right;
                        b {
                            font-size: .37333rem/* 28/75 */
                            ;
                            font-weight: normal;
                            color: @color-323233;
                        }
                        a {
                            color: @color-8976cc;
                            text-decoration: underline;
                            font-size: .32rem/* 24/75 */
                            ;
                            margin-top: .26667rem/* 20/75 */
                            ;
                        }
                    }
                    &.h114 {
                        height: 1.52rem/* 114/75 */
                        ;
                    }
                }
                .details-content {
                    overflow: hidden;
                    ol {
                        margin-bottom: .26667rem/* 20/75 */
                        ;
                        border-radius: .13333rem/* 10/75 */
                        ;
                        display: flex;
                        justify-content: space-between;
                        background: @color-f5f5f5;
                        li {
                            height: 2.13333rem/* 160/75 */
                            ;
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                            span {
                                flex: 1;
                                width: 100%;
                                text-align: center;
                                line-height: 1.06667rem/* 80/75 */
                                ;
                                font-size: .37333rem/* 28/75 */
                                ;
                                color: @color-646466;
                            }
                        }
                    }
                }
            }
        }
        .widthdraw-money {
            margin-top: .26667rem/* 20/75 */
            ;
            padding: 0 .4rem/* 30/75 */
            ;
            background: #fff;
            dt {
                font-size: .42667rem/* 32/75 */
                ;
                color: @color-323233;
                font-weight: bold;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 1.06667rem/* 80/75 */
                ;
                span:last-child {
                    color: @color-green;
                }
            }
            dd {
                height: 1.06667rem/* 80/75 */
                ;
                display: flex;
                justify-content: space-between;
                align-items: center;
                span {
                    // flex: 1;
                    width: 33.33333%;
                    font-size: .37333rem/* 28/75 */
                    ;
                    &:nth-child(2) {
                        text-align: center;
                    }
                    &:last-child {
                        text-align: right;
                        color: @color-8976cc;
                    }
                }
                span.special {
                    color: @color-323233;
                }
            }
        }
        .widthdraw-result {
            margin-top: .26667rem/* 20/75 */
            ;
            padding: 0 .4rem/* 30/75 */
            ;
            background: #fff;
            height: 1.06667rem/* 80/75 */
            ;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: .42667rem/* 32/75 */
            ;
            span {
                font-weight: bold;
            }
            p {
                color: @color-green;
                font-size: .48rem/* 36/75 */
                ;
                font-weight: bold;
            }
        }
        .widthdraw-bottom {
            padding: 0 .4rem/* 30/75 */
            .53333rem/* 40/75 */
            ;
            .submit-btn {
                margin-top: .4rem/* 30/75 */
                ;
                display: flex;
                justify-content: space-around;
                button {
                    height: 1.06667rem/* 80/75 */
                    ;
                    line-height: 1.06667rem/* 80/75 */
                    ;
                    border-radius: .13333rem/* 10/75 */
                    ;
                    background: @color-green;
                    color: #fff;
                    border: none;
                    text-align: center;
                    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.12);
                    &:active {
                        background: @color-00cc8f;
                    }
                }
                button.close {
                    width: 100%;
                    font-size: .48rem/* 36/75 */
                    ;
                }
                button.continue {
                    width: 3.2rem/* 240/75 */
                    ;
                    font-size: .37333rem/* 28/75 */
                    ;
                    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.12);
                }
                button.cancel {
                    width: 3.2rem/* 240/75 */
                    ;
                    font-size: .37333rem/* 28/75 */
                    ;
                    background-color: #dcdce0;
                    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.12);
                }
            }
            .hint {
                margin-top: .4rem/* 30/75 */
                ;
                font-size: .32rem/* 24/75 */
                ;
                color: @color-969699;
                p {
                    line-height: 1.5;
                    span {
                        color: @color-red;
                    }
                }
                h3 {
                    line-height: 1.5;
                    font-size: .34667rem/* 26/75 */
                    ;
                }
            }
        }
    }
</style>


