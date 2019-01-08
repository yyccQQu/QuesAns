<template>
    <div class="auditQuery">
        <Header rooter="-1" title="即时稽核查询" :hasNoBack="true" iFontsize=".58667rem"></Header>
        <div class="content">
            <div class="title">稽核时间</div>
            <div class="audit-details">
                <ul>
                    <li>
                        <span>{{queryData.beginTime | filterDate('YYYY-MM-DD HH:mm:ss')}} ~ {{queryData.endTime | filterDate('YYYY-MM-DD HH:mm:ss')}}</span>
                    </li>
                </ul>
            </div>
            <div class="title">稽核明细</div>
            <div class="audit-details">
                <ul>
    
                    <li>
                        <span>存款金额</span>
                        <span>{{queryData.deposit}}</span>
                    </li>
                    <li class="pk-1px-tb">
                        <span>存款优惠</span>
                        <span>{{queryData.offer}}</span>
                    </li>
                    <li class="h114">
                        <span>总实际有效投注</span>
                        <span class="details" @click="isShowDetails = !isShowDetails">
                                <b>{{queryData.bet}}</b>
                                <a>投注明细</a>
                            </span>
                    </li>
                    <div v-show="isShowDetails" class="details-content">
                        <ol>
                            <li>
                                <span class="pk-1px-b">彩票</span>
                                <span class="text-dots">{{queryData.gameLottery}}</span>
                            </li>
                            <li class="pk-1px-l pk-1px-r">
                                <span class="pk-1px-b">棋牌</span>
                                <span class="text-dots">{{queryData.gameChess}}</span>
                            </li>
                            <li>
                                <span class="pk-1px-b">视讯</span>
                                <span class="text-dots">{{queryData.gameVideo}}</span>
                            </li>
                            <li class="pk-1px-l pk-1px-r">
                                <span class="pk-1px-b">电子</span>
                                <span class="text-dots">{{queryData.gameElectronics}}</span>
                            </li>
                            <li>
                                <span class="pk-1px-b">体育</span>
                                <span class="text-dots">{{queryData.gameSports}}</span>
                            </li>
                        </ol>
                    </div>
                </ul>
            </div>
            <div class="isConditions">
                <p class="pk-1px-b">
                    {{queryData.isNormal != 1?'未':''}}满足常态性稽核（{{queryData.normal}}-放款额度{{queryData.relax}}）<span>{{queryData.normal-queryData.relax<=0?0:queryData.normal-queryData.relax}}</span>元 ， 需扣除行政费
                    <span>{{queryData.adminFee}}</span>元。
                </p>
                <p>
                    {{queryData.isMultiple != 1?'未':''}}满足综合稽核<span>{{queryData.multiple}}</span>元， 扣除优惠
                    <span>{{queryData.offer}}</span>元。
                </p>
            </div>
            <div class="auditQuery-bottom">
                <div class="submit-btn">
                    <button class="close" @click="$router.go(-1)">确认</button>
                </div>
                <div class="hint">
                    <h3>温馨提示：</h3>
                    <p>常态稽核=会员入款金额*常态稽核倍数-放宽额度</p>
                    <p>综合稽核=（会员入款金额+入款优惠金额）*综合稽核倍数+优惠金额*相应综合稽核倍数</p>
                    <p>出款出现以下情况将会扣除一定费用：</p>
                    <p>1.未满足常态稽核将扣除入款金额<span>{{queryData.lineAuditAdminRate}}%</span>的行政费用。</p>
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
        name: 'auditQuery',
        components: {
            Header,
        },
        data() {
            return {
                isShowDetails: false,
                queryData: {},
            }
        },
        created() {
            this.getQueryData();
        },
        methods: {
            getQueryData() {
                func.getAuditInfo().then((res) => {
                    console.log(res)
                    this.queryData = res;
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
        .isConditions {
            background: #fff;
            margin-top: .26667rem/* 20/75 */
            ;
            padding: 0 .4rem/* 30/75 */
            ;
            p {
                padding: .33333rem/* 25/75 */
                0;
                font-size: .4rem/* 30/75 */
                ;
                line-height: 1.5;
                span {
                    font-size: .4rem/* 30/75 */
                    ;
                    color: @color-8976cc;
                }
            }
        }
        .auditQuery-bottom {
            overflow: hidden;
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