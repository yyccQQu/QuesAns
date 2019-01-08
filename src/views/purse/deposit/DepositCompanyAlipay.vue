<template>
    <div class="company-alipay">
        <Header rooter="-1" title="公司存款" :hasNoBack="true" iFontsize=".58667rem"></Header>
        <date-picker ref="picker" v-model="dataVal" @confirm="handleConfirm">
        </date-picker>
        <div class="content">
            <div class="deposit-account">
                <h2 class="title">存款账户</h2>
                <div class="deposit-account-box">
                    <div class="left">
                        <h2 @click="copy(baseInfoData.bankNum)">
                            <p>存款账号</p>
                            <span>{{baseInfoData.bankNum}}  <i class="iconfont icon-qb-copy"></i></span>
                        </h2>
                        <h2>
                            <p>收款人</p>
                            <span>{{baseInfoData.bankUser}}</span>
                        </h2>
                        <h2>
                            <p>备注码</p>
                            <span>{{randomNum}}</span>                            
                        </h2>
                        <h3>
                            <span>您在转账时填写备注码，</span>
                            <span>会提高您存款到账速度</span>
                        </h3>
                    </div>
                    <div class="right">
                        <h3>扫码转账</h3>
                        <img :src="baseInfoData.payImg" alt="">
                        <a>下载二维码</a>
                    </div>
                </div>
            </div>
            <div class="deposit-info">
                <h2 class="title">填写存款信息</h2>
                <ul>
                    <li class="pk-1px-b">
                        <span class="must">存款金额</span>
                        <input name="money" type="tel" v-model="postData.depositMoney"   v-validate="`required|between:${baseInfoData.lineDepositMin},${baseInfoData.lineDepositMax}`" placeholder="请输入存款金额" :class="{'input': true, 'is-danger': errors.has('money') }">
                        <i @click="postData.depositMoney=''" v-show="errors.has('money')" class="fs-16 iconfont icon-login-error icon-style  error-icon"></i>
                    </li>
                    <li class="pk-1px-b">
                        <span class="must">存款账号</span>
                        <input name="inAccount" type="text" v-model="postData.depositAccount" v-validate="'required'" placeholder="请输入存款账号" :class="{'input': true, 'is-danger': errors.has('inAccount')}">
                        <i @click="postData.depositAccount=''" v-show="errors.has('inAccount')" class="fs-16 iconfont icon-login-error icon-style  error-icon"></i>
                    </li>
                    <li class="pk-1px-b">
                        <span class="must">存款时间</span>
                        <input  name="inTime"  @click="openPicker()" type="text" v-model="postData.depositTime" v-validate="'required'" readonly placeholder="请选择时间">
                        <i class="iconfont icon-qb-time"></i>
                        <i @click="postData.depositTime=''" v-show="errors.has('inTime')" class="fs-16 iconfont icon-login-error icon-style  error-icon"></i>
                    </li>
                   
                    <li>
                        <span>备注</span>
                        <input type="text" v-model="postData.remark" placeholder="可输入订单号后四位">
                    </li>
                </ul>
            </div>
            <div class="error-hint">
                <span v-show="errors.has('money')">{{ errors.first('money') }}</span>
                <span v-show="!errors.has('money') && errors.has('inAccount')">{{ errors.first('inAccount') }}</span>
                <span v-show="!errors.has('money') && !errors.has('inAccount') && errors.has('inTime')">{{ errors.first('inTime') }}</span>
            </div>
            <div class="deposit-submit">
                <button @click="handleDeposit()">立即存款</button>
                <div class="hint">
                    <p>温馨提示：</p>
                    <p>1、公司银行账号不定期更换。请每次存款前，务必先至[公司存款]查看账号。</p>
                    <p>2、在金额转出之后请务必准确填写存款信息，以便财务能够及时确认并添加金额到您的会员帐户中。</p>
                    <p>3、单笔存款金额为<span>{{baseInfoData.lineDepositMin}}~{{baseInfoData.lineDepositMax}}</span>元</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '@/components/Header'
    import datePicker from '@/components/DatePicker'
    import func from '@/api/purse'

    export default {
        name: 'companyAlipay',
        components: {
            Header,
            datePicker
        },
        mounted() {
            this.getBaseInfo();
        },
        data() {
            return {
                dataVal: new Date(),
                baseInfoData: {},
                postData: {
                    depositMoney: "",
                    depositAccount: "",
                    depositTime: "",
                    remark: "",
                    orderNum: "",
                },
                randomNum:parseInt(Math.random()*10000)
            }
        },
        methods:{
             openPicker() {
                this.$refs.picker.open();
            },
            handleConfirm(value){
                this.postData.depositTime = this.filterDate(value);
            },
            copy(msg){
                this.$copyText(msg).then((e) =>{
                    this.$toast({
                        message:'复制成功',
                        duration: 2000
                    })
                }, (e) =>{
                    this.$toast({
                        message:'复制失败',
                        duration: 2000
                    })
                })
            },
            getBaseInfo(){
                func.getCompanyInfo({id:this.$route.query.id * 1}).then((res) => {
                    // console.log(res);
                    this.baseInfoData = res;
                })
            },
            handleDeposit(){
                const rex = ['money', 'inAccount', 'inTime'];
                for (var i = 0; i < rex.length; i++) {
                    this.$validator.validate(rex[i]).then(result => {});
                }
                setTimeout(() => {
                    if (this.$validator.errors.count() <= 0) {
                        let postData = {
                            setId:parseInt(this.baseInfoData.id),
                            depositAccount:this.postData.depositAccount,
                            depositMoney:parseFloat(this.postData.depositMoney),
                            depositTime:+new Date(this.postData.depositTime)/1000,
                            remark:this.postData.remark,
                        }
                        // console.log(postData);
                        func.postCompany(postData).then((res) => {
                            // console.log(res);
                            this.$router.push({
                                'name': 'paySuccess',
                                query:{
                                    fromType:2,
                                    order:res.order,
                                }})
                        }).catch(err => {
                            this.$toast({
                                message:err,
                                duration: 2000
                            })
                        })
                
                    }
                }) 
            }
        }
    
    }
</script>

<style lang="less" scoped>
    @import url('../../../components/less/common.less');
    .company-alipay {
        .content {
            padding-top: 1.22667rem/* 92/75 */
            ;
            .deposit-account {
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
                .deposit-account-box {
                    padding: .32rem/* 24/75 */
                    .4rem/* 30/75 */
                    ;
                    background: #fff;
                    display: flex;
                    justify-content: space-between;
                    .left {
                        h2 {
                            line-height: 1.5;
                            p {
                                font-size: .37333rem/* 28/75 */
                                ;
                                color: @color-646466;
                                display: inline-block;
                                width: 2rem/* 150/75 */
                                ;
                            }
                            span {
                                display: inline-block;
                                font-size: .37333rem/* 28/75 */
                                ;
                                color: @color-323233;
                                i {
                                    font-size: .37333rem /* 28/75 */;
                                    margin-left: .13333rem /* 10/75 */;
                                }
                            }
                        }
                        h3 {
                            line-height: 1.5;
                            color: @color-969699;
                            font-size: .32rem/* 24/75 */
                            ;
                            span {
                                display: block;
                            }
                        }
                    }
                    .right {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        h3 {
                            font-size: .32rem/* 24/75 */
                            ;
                            color: #000;
                            text-align: center;
                        }
                        img {
                            width: 1.86667rem/* 140/75 */
                            ;
                            height: 1.86667rem/* 140/75 */
                            ;
                            display: block;
                            margin: .13333rem/* 10/75 */
                            0;
                        }
                        a {
                            font-size: .32rem/* 24/75 */
                            ;
                            color: @color-7c71ab;
                            text-decoration: underline;
                            text-align: center;
                        }
                    }
                }
            }
            .deposit-info {
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
                ul {
                    background: #fff;
                    li {
                        margin-left: .4rem/* 30/75 */
                        ;
                        padding-right: .4rem/* 30/75 */
                        ;
                        height: 1.06667rem/* 80/75 */
                        ;
                        line-height: 1.06667rem/* 80/75 */
                        ;
                        display: flex;
                        justify-content: space-between;
                        font-size: .37333rem/* 28/75 */
                        ;
                        span {
                            flex: 3;
                        }
                        i {
                            font-size: .37333rem/* 28/75 */
                            ;
                            color: @color-c8c8cc;
                            vertical-align: middle;
                        }
                        input {
                            flex: 7;
                            text-align: right;
                            border: none;
                            color: @color-323233;
                        }
                        input::-webkit-input-placeholder {
                            color: @color-c8c8cc;
                            font-size: .32rem/* 24/75 */
                            ;
                        }
                    }
                }
            }
        }
        .deposit-info{
            .title{
                height: 1.06667rem /* 80/75 */;
                line-height: 1.06667rem /* 80/75 */;
                padding-left: .4rem /* 30/75 */;
                font-size: .42667rem /* 32/75 */;
                color: @color-323233;
            }
            ul{
                background: #fff;
                li{
                    margin-left: .4rem /* 30/75 */;
                    padding-right: .4rem /* 30/75 */;
                    height: 1.06667rem /* 80/75 */;
                    line-height: 1.06667rem /* 80/75 */;
                    display: flex;
                    justify-content: space-between;
                    font-size: .37333rem /* 28/75 */;
                    position: relative;
                    span{
                        flex: 3;
                    }
                    i{
                        font-size: .37333rem /* 28/75 */;
                        color: @color-c8c8cc;
                        vertical-align: middle;
                    }
                    input{
                        flex: 7;
                        text-align: right;
                        border: none;
                        color: @color-323233;
                    }
                    input::-webkit-input-placeholder{
                        color:@color-c8c8cc;
                        font-size: .32rem /* 24/75 */;
                    }
                    i.error-icon{
                        position: absolute;
                        right:  0;
                        font-size:  .4rem /* 30/75 */;
                        color: @color-red;
                    }
                   
                }
            }
        }
        .error-hint{
            font-size: .32rem /* 24/75 */;
            color:@color-red;
            padding-left: .4rem /* 30/75 */;
            height: .8rem /* 60/75 */;
            line-height: .8rem /* 60/75 */;
        }
        .deposit-submit{
            padding:.4rem /* 30/75 */;
            padding-top: 0;

            button{
                width: 100%;
                height: 1.06667rem /* 80/75 */;
                line-height: 1.06667rem /* 80/75 */;
                border-radius: .13333rem /* 10/75 */;
                font-size: .37333rem /* 28/75 */;
                color:#fff;
                background: @color-green;
                border:none;
                text-align: center;
                box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.12); 
                &:active{
                    background: @color-00cc8f;
                }              
            }
            .hint{
                margin-top: .26667rem /* 20/75 */;
                p{
                    font-size: .32rem /* 24/75 */;
                    color: @color-c8c8cc;
                    line-height: .48rem /* 36/75 */;
                    span{
                        color: @color-green;
                    }
                }
            }
        }
    }
</style>


