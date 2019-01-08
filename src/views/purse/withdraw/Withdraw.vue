<template>
    <div class="withdraw">
        <Header rooter="-1" title="取款" :hasNoBack="true" iFontsize=".58667rem"></Header>
        <div class="content">
            <div class="person-info clearfix">
                <div class="left iconfont icon-sidebar_head"></div>
                <div class="center">
                    <h2>{{infoData.account}}</h2>
                    <p v-show="isShowMoney">{{infoData.balance}}</p>
                    <mt-spinner v-show="!isShowMoney" type="fading-circle" color="#00d897" :size="size"></mt-spinner>
                </div>
                <div class="right">
                    <a @click="refush()">
                        <i class="iconfont icon-wallet-refresh"></i>
                        <span>刷新余额</span>
                    </a>
                </div>
            </div>
            <div class="widthdraw-top">
                <div class="title">
                    <span class="must">收款账户</span>
                </div>
                <router-link tag="div" :to="{name:'bankCardadd'}" v-show="infoData.has===1" class="no-bankCard">
                    <p>您还未添加银行卡</p>
                    <div class="add-card">
                        <i class="iconfont icon-qb-bank-add"></i>
                        <span>点击添加银行卡</span>
                    </div>
                </router-link>
                <div v-show="infoData.has===2" class="has-bankCard">
                    <swiper :options="swiperOption" ref="mySwiper">
                        <swiper-slide v-for="(item, index) in swiperSlides" :key="index">
                            <div class="card-list clearfix">
                                <div class="left">
                                    <h2 class="text-dots">{{item.bankName}}
                                        <i class="iconfont icon-bank-normal" v-show="item.isDefault === 1"></i>
                                    </h2>
                                    <h3 class="text-dots">{{item.subbranch}}</h3>
                                    <p>{{item.card | filterBankNum}}</p>
                                </div>
                                <div class="right">
                                    <i class="iconfont icon-qb-bank-tongyong1"></i>
                                </div>
                            </div>
                        </swiper-slide>
                        <div class="swiper-pagination" slot="pagination"></div>
                    </swiper>
                </div>
                <div class="width-form">
                    <ul>
                        <li class="pk-1px-tb">
                            <span class="must">取款金额</span>
                            <input type="number" v-model="postData.outMoney" placeholder="请输入取款金额">
                        </li>
                        <li>
                            <span class="must">取款密码</span>
                            <input type="password" v-model="postData.drawPassword" placeholder="请输入取款密码">
                        </li>
                    </ul>
                </div>
            </div>
            <div class="widthdraw-bottom">
                <h2 v-show="infoData.hasP===1">忘记取款密码请<router-link tag="a" :to="{name:'contactus'}">联系客服</router-link></h2>
                <h2 v-show="infoData.hasP===2">您还未设置取款密码请
                    <router-link tag="a" :to="{name:'password'}">点击设置</router-link>
                </h2>

                <button @click="handleWithdraw" :disabled="infoData.has===1">取款</button>
                <div class="hint">
                    <h3>温馨提示</h3>
                    <p>1.单笔取款金额为<span>{{infoData.min}}~{{infoData.max}}</span>元</p>
                    <p>2.取款金额需为整数，否则可能延长出款。</p>
                    <p>3.有未完成的取款订单时，无法提交第二笔订单。</p>
                    <p>4.出款出现以下情况将会扣除一定费用：</p>
                    <p>1）未满足常态稽核 将扣除入款金额{{infoData.lineAuditAdminRate}}%行政费用与优惠金额。</p>
                    <p>2) 未满足综合稽核 将扣除优惠金额。</p>
                    <p>*常态稽核 = 会员入款金额 * 常态稽核倍数</p>
                    <p>*综合稽核=（会员入款金额+入款优惠金额）*综合稽核倍数+优惠金额*相应综合稽核倍数</p>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    import Header from '@/components/Header'
    import 'swiper/dist/css/swiper.css'
    import {
        swiper,
        swiperSlide
    } from 'vue-awesome-swiper'
    import func from '@/api/purse'

    export default {
        name: 'withdraw',
        components: {
            Header,
            swiper,
            swiperSlide
        },
        data() {
            return {
                isShowMoney: true,
                size: parseInt(this.HTML_FONT_SIZE * 0.4),
                swiperOption: {
                    spaceBetween: '5%',
                    pagination: {
                        el: '.swiper-pagination'
                    },
                },
                swiperSlides: [],
                infoData: {},
                postData: {
                    outMoney: '',
                    drawPassword: "",
                    bankId: "",
                }
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        mounted() {
            this.refush(1);
        },
        methods: {
            //获取取款信息/刷新
            refush(t) {
                this.isShowMoney = false;
                func.getWithdrawInfo().then((res) => {
                    console.log(res)
                    this.infoData = res;
                    this.swiperSlides = res.bankList;
                    this.isShowMoney = true;
                    if (!t) {
                        this.$toast({
                            message: '刷新成功',
                            duration: 2000
                        });
                    }
                }).catch(err =>{
                    this.$toast({
                        message: err,
                        duration: 2000
                    });
                })
            },
            //取款提交
            handleWithdraw() {
                if (!this.APP_CONFIG.RegExp.number.test(this.postData.outMoney)) {
                    this.$toast({
                        message: '取款金额为正整数',
                        duration: 2000
                    });
                    return;
                }
                if (this.postData.outMoney > this.infoData.max || this.postData.outMoney < this.infoData.min) {
                    this.$toast({
                        message: `取款金额为${this.infoData.min}-${this.infoData.max}`,
                        duration: 2000
                    });
                    return;
                }
                if (!this.APP_CONFIG.RegExp.outMoneyPwd.test(this.postData.drawPassword)) {
                    this.$toast({
                        message: '取款密码为6位数字',
                        duration: 2000
                    });
                    return;
                }
                let postData = {
                    outMoney:this.postData.outMoney * 1,
                    drawPassword:this.postData.drawPassword,
                    bankId:this.swiperSlides[this.swiper.activeIndex].id
                }
                // console.log(postData)
                func.postWithdraw(postData).then((res) => {
                    // console.log(res)
                    this.$router.push({
                        name: 'withdrawAudit',
                        query: res
                    });
                }).catch(err =>{
                     this.$toast({
                        message: err,
                        duration: 2000
                    });
                })

                // let postData = new withdraw.WithDrawAuditReq();
                // postData.setOutmoney(parseInt(this.postData.outMoney));
                // postData.setDrawpassword(this.postData.drawPassword);
                // postData.setBankid(this.swiperSlides[this.swiper.activeIndex].id);
                // let datas = postData.serializeBinary();
                // this.ajax('PURSE_WITHDRAW_OUT',withdraw.AuditInfoResp, datas).then((res) =>{
                    
                // }).catch(err =>{})
            }
        }
    }
</script>

<style lang="less" scoped>
    @import url("../../../components/less/common.less");
    .content {
        padding-top: 1.22667rem/* 92/75 */
        ;
    }

    .person-info {
        background: #252232 url("../../../assets/img/headbg.png") center 30px no-repeat;
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
                margin-bottom: 0.26667rem/* 20/75 */
                ;
                font-size: 0.48rem/* 36/75 */
                ;
            }
            p {
                font-size: 0.4rem/* 30/75 */
                ;
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

    .widthdraw-top {
        background: #fff;
        margin-top: .26667rem/* 20/75 */
        ;
        padding: .4rem/* 30/75 */
        ;
        padding-bottom: 0;
        .title {
            font-size: .37333rem/* 28/75 */
            ;
            color: @color-323233;
            margin-bottom: .26667rem/* 20/75 */
            ;
        }
        .no-bankCard {
            p {
                text-align: center;
                font-size: .32rem/* 24/75 */
                ;
                color: @color-969699;
            }
            .add-card {
                width: 100%;
                border: 1px dashed @color-c8c8cc;
                border-radius: .13333rem/* 10/75 */
                ;
                margin: .4rem/* 30/75 */
                0;
                height: 2.66667rem/* 200/75 */
                ;
                font-size: .37333rem/* 28/75 */
                ;
                color: @color-646466;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                i{
                    font-size: .8rem /* 60/75 */;
                    color: @color-c8c8cc;
                }

            }
        }
        .has-bankCard {
            position: relative;
            .card-list {
                width: 100%;
                height: 2.66667rem/* 200/75 */
                ;
                border-radius: .13333rem/* 10/75 */
                ;
                box-sizing: border-box;
                font-size: .37333rem/* 28/75 */
                ;
                background-image: linear-gradient(-90deg, #ff3b30 0%, #ff746c 100%), linear-gradient( #ff3b30, #ff3b30);
                color: #fff;
                
                .left {
                    padding-left: .53333rem/* 40/75 */
                    ;
                    padding-top: .4rem/* 30/75 */
                    ;
                    float: left;
                    max-width: 65%;
                    h2 {
                        font-size: .48rem/* 36/75 */;
                        position:relative;
                        .icon-bank-normal{
                            position: absolute;
                            top: -.26667rem /* 20/75 */;
                            font-size:1rem;
                            margin-left:.32rem /* 24/75 */;
                            color:rgba(255,255,255,0.6);
                        }
                    }
                    h3 {
                        margin: .4rem/* 30/75 */
                        0 .26667rem/* 20/75 */
                        0;
                    }
                }
                .right {
                    float: right;
                    position: relative;
                    i{
                        font-size: 3.8rem;
                        opacity: 0.2;
                        position: absolute;
                        right: -0.26667rem;
                        top: -.26667rem /* 20/75 */;
                    }
                }
            }
        }
        .width-form {
            margin-top: 0.8rem;
            ul {
                li {
                    height: 1.06667rem/* 80/75 */
                    ;
                    line-height: 1.06667rem/* 80/75 */
                    ;
                    display: flex;
                    justify-content: space-between;
                    span {
                        flex: 2;
                        font-size: .37333rem/* 28/75 */
                        ;
                    }
                    input {
                        flex: 8;
                        border: none;
                        text-align: right;
                        font-size: .37333rem/* 28/75 */
                        ;
                        color: @color-323233;
                        &::-webkit-input-placeholder {
                            color: @color-c8c8cc;
                            font-size: .32rem/* 24/75 */
                            ;
                        }
                    }
                }
            }
        }
    }

    .widthdraw-bottom {
        padding: 0 .4rem/* 30/75 */
        .53333rem/* 40/75 */
        ;
        h2 {
            height: .98667rem/* 74/75 */
            ;
            line-height: .98667rem/* 74/75 */
            ;
            font-size: .32rem/* 24/75 */
            ;
            text-align: right;
            color: @color-969699;
            a {
                color: @color-8976cc;
                text-decoration: underline;
            }
        }
        button {
            width: 100%;
            height: 1.2rem/* 90/75 */
            ;
            line-height: 1.2rem/* 90/75 */
            ;
            font-size: .48rem/* 36/75 */
            ;
            border-radius: .13333rem/* 10/75 */
            ;
            background: @color-green;
            border: none;
            color: #fff;
            text-align: center;
            box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.12);
            &:active {
                background: @color-00cc8f;
            }
            &:disabled {
                background: @color-add9cc;
                box-shadow: none;
                color: @color-c8c8cc;
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
                    color: @color-green;
                }
            }
            h3 {
                line-height: 1.5;
                font-size: .34667rem/* 26/75 */
                ;
            }
        }
    }
</style>


