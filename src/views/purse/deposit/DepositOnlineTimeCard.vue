<template>
    <div class="timeCard">
        <mt-popup :closeOnClickModal="true" :position="'bottom'" v-model="popupVisible" style="width: 100%;z-index: 2003;">
            <div class="popup-title pk-1px-b">
                <span @click="cancel()">取消</span>
                <span>请选择点卡类型</span>
                <span @click="sure()">确定</span>
            </div>
            <mt-picker :itemHeight="itemHeight" :slots="slots" @change="onValuesChange"></mt-picker>
        </mt-popup>
    
        <Header rooter="-1" title="线上存款" :hasNoBack="true" iFontsize=".58667rem"></Header>
    
        <div class="content">
            <div class="title clearfix">
                <span>支付方式</span>
                <span>点卡支付</span>
            </div>
            <div class="choose-money">
                <div class="sys-money remark pk-1px-b">
                    <span class="must">卡类型</span>
                    <input  name="cardType" @click="popupVisible = true" v-validate="'required'" readonly v-model="postData.chooseCard" type="text" placeholder="请选择点卡类型">
                    <i class="iconfont icon-list-more"></i>
                    <i @click="postData.chooseCard=''" v-show="errors.has('cardType')" class="fs-16 iconfont icon-login-error icon-style  error-icon"></i>

                </div>
                <div class="sys-money remark pk-1px-b">
                    <span class="must">序列号</span>
                    <input name="serialNumber" type="text" v-model="postData.num" v-validate="'required'" placeholder="请输入您的点卡序列号">
                    <i @click="postData.num=''" v-show="errors.has('serialNumber')" class="fs-16 iconfont icon-login-error icon-style  error-icon"></i>

                </div>
                <div class="sys-money remark pk-1px-b">
                    <span class="must">卡密码</span>
                    <input name="password" type="password" v-model="postData.password" v-validate="'required'" placeholder="请输入您的点卡密码">
                    <i @click="postData.password=''" v-show="errors.has('password')" class="fs-16 iconfont icon-login-error icon-style  error-icon"></i>

                </div>
                <div class="sys-money remark pk-1px-b">
                    <span class="must">金额</span>
                    <input name="money"  type="number" v-model="postData.money" v-validate="'required|numeric'"  placeholder="请输入您的点卡金额">
                    <i @click="postData.money=''" v-show="errors.has('money')" class="fs-16 iconfont icon-login-error icon-style  error-icon"></i>
                </div>
                <div class="remark">
                    <span>备注</span>
                    <input  type="text" v-model="postData.remark" placeholder="请输入其他备注信息">
                </div>
            </div>
            <div class="error-hint">
                <span v-show="errors.has('cardType')">{{ errors.first('cardType') }}</span>
                <span v-show="!errors.has('cardType') && errors.has('serialNumber')">{{ errors.first('serialNumber') }}</span>
                <span v-show="!errors.has('cardType') && !errors.has('serialNumber') && errors.has('password')">{{ errors.first('password') }}</span>
                <span v-show="!errors.has('cardType') && !errors.has('serialNumber') && !errors.has('password') && errors.has('money')">{{ errors.first('money') }}</span>
            </div>
            <div class="submit">
                <button @click="handleDeposit()">立即存款</button>
                <p>温馨提示：单笔存款金额为<span>{{$route.query.singlemin}}~{{$route.query.singlemax}}</span>元</p>            
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '../../../components/Header'
    // import deposit from '../../../proto/member_deposit_pb'
    // const deposit = proto.pb;
    export default {
        name: 'timeCard',
        components: {
            Header
        },
        created() {
            this.getCardSelect();
        },
        data() {
            return {
                popupVisible: false,
                itemHeight: parseInt(this.HTML_FONT_SIZE * 1.06667),
                chooseCardTem: '',
                slots: [{
                    flex: 1,
                    values: ['QQ卡', 'AB卡', '财付通钱包卡', '京东迷你卡', '优惠卡', 'VIP卡'],
                    className: 'slot1',
                    textAlign: 'center'
                }],
                postData:{
                    chooseCard: '',
                    num:'',
                    password:'',
                    money:'',
                    remark:'',
                }
               

            }
        },
        methods: {
            getCardSelect(){
                let postData = new deposit.BankListReq();
                postData.setPayid(this.$route.query.paidType.toString());
                let datas = postData.serializeBinary();
                this.ajax("PURSE_ONLINE_POINT_CARD", deposit.PayPointCardResp, datas).then(res => {
                    // console.log(res)
                    this.slots[0].values = res.paypointcardList;
                });
            },
            onValuesChange(picker, values) {
                this.chooseCardTem = values[0];
            },
            cancel() {
                this.popupVisible = false;
                this.postData.chooseCard = '';
            },
            sure() {
                this.postData.chooseCard = this.chooseCardTem;
                this.popupVisible = false;
            },
            handleDeposit(){
                const rex = ['cardType', 'serialNumber', 'password', 'money'];
                let _this = this;
                for (var i = 0; i < rex.length; i++) {
                    this.$validator.validate(rex[i]).then(result => {});
                }
                setTimeout(() => {
                    if (this.$validator.errors.count() <= 0) {
                        // console.log(this.postData)
                    }
                })

                // this.$router.push({
                //     'name': 'paySuccess',
                //     query:{fromType:1}
                // })
            }
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../../components/less/common.less');
    .content{
        padding-top: 1.22667rem /* 92/75 */;
    }
    .popup-title {
        height: 1.06667rem/* 80/75 */
        ;
        padding: 0 .4rem/* 30/75 */
        ;
        font-size: .4rem/* 30/75 */
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
    
    .timeCard {
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
        .choose-money {
            background: #fff;
            .sys-money {
                padding-right: .4rem/* 30/75 */;
                line-height: 1.06667rem /* 80/75 */;
                margin-left: .4rem/* 30/75 */
                ;
                display: flex;
                justify-content: space-between;
                position: relative;
                span {
                    font-size: .37333rem/* 28/75 */
                    ;
                    color: @color-323233;
                    &:last-child {
                        color: @color-c8c8cc;
                    }
                }
                i {
                    font-size: .32rem/* 24/75 */
                    ;
                    vertical-align: middle;
                    color: @color-818181;
                }
            }
            .remark {
                .sys-money;
                span {
                    flex: 2;
                }
                input {
                    flex: 10;
                    text-align: right;
                    border: none;
                    color: @color-323233;
                    font-size: .32rem/* 24/75 */;
                }
                input::-webkit-input-placeholder {
                    color: @color-c8c8cc;
                }
                i.error-icon{
                    position: absolute;
                    right:  0;
                    font-size:  .4rem /* 30/75 */;
                    color: @color-red;
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
        .submit {
            padding: .4rem/* 30/75 */;
            padding-top: 0;
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
                &:active{
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


