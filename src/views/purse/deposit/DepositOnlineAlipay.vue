<template>
    <div class="alipay">
        <!-- 44px .58667rem-->
        <Header rooter="-1" title="线上存款" :hasNoBack="true" iFontsize=".58667rem"></Header>
        <div v-html="html"></div>
        <div class="content">
            <div class="title clearfix">
                <span>支付方式</span>
                <span>{{baseInfoData.payName}}</span>

            </div>
            <div class="choose-depositMoney">
                <div class="sys-depositMoney pk-1px-b">
                    <span>系统余额</span>
                    <span>{{baseInfoData.balance}}</span>
                </div>
                <div class="in-depositMoney">
                    <h2>
                        <span>存款金额</span>
                        <input @focus="iNow = -1" type="tel" v-model="depositMoney" placeholder="请输入存款金额">
                    </h2>
                    <ul class="pk-1px-b">
                        <li :class="{'active':iNow === index}" v-for="(item,index) in fastMoneyArr" :key="index" @click="handleFast(index)">{{item}}元</li>
                    </ul>
                </div>
                <div class="remark">
                    <span>备注</span>
                    <input type="text" v-model="remark" placeholder="请输入其他备注信息">
                </div>
            </div>
            <div class="submit">
                <button @click="handleDeposit()">立即存款</button>
                <p>温馨提示：单笔存款金额为<span>{{baseInfoData.singleMin}}~{{baseInfoData.singleMax}}</span>元</p>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '@/components/Header'
    import func from '@/api/purse'

    export default {
        name: 'onlineAlipay',
        components: {
            Header
        },
        created() {
            this.getBaseInfo();
        },
        data() {
            return {
                iNow:-1,
                fastMoneyArr:[1000,500,200,100],
                depositMoney:'',
                remark:'',
                html:'',
                baseInfoData:{
                    balance: 0
                }
            }
        },
        methods: {
            getBaseInfo(){
                func.getOnlineInfo({
                    setId:this.$route.query.setId * 1,
                    payType:this.$route.query.payType * 1
                }).then((res) => {
                    // console.log(res);
                    this.baseInfoData = res;
                }).catch(err => {
                    this.$toast({
                        message: err,
                        duration: 2000
                    });
                })
            },
            //快捷选择存款金额
            handleFast(index) {
                //系统余额小于所选的快捷金额
                if (this.fastMoneyArr[index] > this.baseInfoData.singleMax) {
                    this.$toast({
                        message: `存款金额不得高于${this.baseInfoData.singleMax}元`,
                        duration: 2000
                    });
                    return;
                }
                this.iNow = index;
                this.depositMoney = this.fastMoneyArr[index];
            },
            //立即存款
            handleDeposit() {
                if (!this.depositMoney) {
                    this.$toast({
                        message: '请输入存款金额',
                        duration: 2000
                    });
                    return;
                }
    
                if (this.depositMoney > this.baseInfoData.singleMax || this.depositMoney < this.baseInfoData.singleMin) {
                    this.$toast({
                        message: `存款金额为${this.baseInfoData.singleMin}-${this.baseInfoData.singleMax}`,
                        duration: 2000
                    });
                    return;
                }
                let postData = {
                    setId: this.$route.query.setId * 1,
                    depositMoney: this.depositMoney * 1,
                    remark: this.remark,
                    paidType: this.$route.query.payType * 1,
                    isFast: 2,
                }
                func.postOnline(postData).then((res) => {
                    console.log(res)
                    this.goThree(res);
                }).catch(err =>{
                    this.$toast({
                        message: err,
                        duration: 2000
                    });
                })
            },
            goThree(item){
                let postData={
                    order:item.order,
                    amount:this.depositMoney.toString(),
                    payway:this.$route.query.payType * 1,
                    payType:this.baseInfoData.payId *1,
                    merId:this.baseInfoData.merId * 1,
                    businessnum:this.baseInfoData.businessNum
                }
                console.log(postData);
                func.goThreeWay(postData).then((res) => {
                    console.log(res,'---')
                    this.html = res.url;
                    this.$nextTick(()=>{
                        document.getElementById("form1").submit();
                        this.$router.push({
                            'name': 'payResult'
                        })
                    })
                }).catch(err =>{
                    this.$toast({
                        message: err,
                        duration: 2000
                    });
                })
            },
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../../components/less/common.less');
    .alipay {
        .content {
            padding-top: 1.22667rem/* 92/75 */
            ;
        }
        .title {
            padding: .32rem/* 24/75 */
            .4rem/* 30/75 */
            ;
            font-size: .42667rem/* 32/75 */
            ;
            color: @color-323233;
            span {
                float: left;
                &:last-child {
                    float: right;
                }
            }
        }
        .choose-depositMoney {
            background: #fff;
            .sys-depositMoney {
                padding: .34667rem/* 26/75 */
                .4rem/* 30/75 */
                .34667rem/* 26/75 */
                0;
                margin-left: .4rem/* 30/75 */
                ;
                display: flex;
                justify-content: space-between;
                span {
                    font-size: .37333rem/* 28/75 */
                    ;
                    color: @color-323233;
                    &:last-child {
                        color: @color-green;
                    }
                }
            }
            .in-depositMoney {
                h2 {
                    .sys-depositMoney;
                    span {
                        flex: 3;
                    }
                    input {
                        flex: 10;
                        text-align: right;
                        border: none;
                        color: @color-323233;
                        font-size: .37333rem;
                    }
                    input::-webkit-input-placeholder {
                        color: @color-c8c8cc;
                        font-size: 0.32rem;
                    }
                }
                ul {
                    padding: .34667rem/* 26/75 */
                    .4rem/* 30/75 */
                    .34667rem/* 26/75 */
                    0;
                    margin-left: .4rem/* 30/75 */
                    ;
                    display: flex;
                    justify-content: space-between;
                    li {
                        font-size: .37333rem/* 28/75 */
                        ;
                        color: @color-green;
                        width: 2.13333rem/* 160/75 */
                        ;
                        height: 1.06667rem/* 80/75 */
                        ;
                        text-align: center;
                        line-height: 1.06667rem/* 80/75 */
                        ;
                        border: 1px solid @color-green;
                        border-radius: .13333rem/* 10/75 */
                        ;
                        box-sizing: border-box;
                        &.active {
                            color: #fff;
                            background: @color-green;
                        }
                    }
                }
            }
            .remark {
                .sys-depositMoney;
                span {
                    flex: 1;
                }
                input {
                    flex: 10;
                    text-align: right;
                    border: none;
                    color: @color-323233;
                    font-size: .32rem/* 24/75 */
                    ;
                }
                input::-webkit-input-placeholder {
                    color: @color-c8c8cc;
                }
            }
        }
        .submit {
            padding: .4rem/* 30/75 */
            ;
            button {
                width: 100%;
                border: none;
                background: @color-green;
                padding: .36rem/* 27/75 */
                0;
                font-size: .37333rem/* 28/75 */
                ;
                color: #fff;
                border-radius: .13333rem/* 10/75 */
                ;
                margin-bottom: .26667rem/* 20/75 */
                ;
                box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.12);
                &:active {
                    background: @color-00cc8f;
                }
            }
            p {
                font-size: .32rem/* 24/75 */
                ;
                color: @color-969699;
                span {
                    color: @color-green;
                }
            }
        }
    }
</style>


