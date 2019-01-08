<template>
    <div>
        <F-header title="银行卡管理" rooter="-1" :hasNoBack="true" :isShowHome="false">
        </F-header>
        <div class="hasbox"></div>
        <mt-popup v-model="popupVisible" position="bottom">
            <div class="cards">
                <div>
                    <div type="default" class="li pk-1px-tb" @click="setDefault()">设为默认</div>
                    <div type="default" class="li pk-1px-b" @click="popupVisible = false">取消</div>
                </div>
            </div>
        </mt-popup>
        <div class="content">
            <div class="acctCard" v-for="(item,i) in bankList" :key="i" @click="open(item)">
                
                <div class="bankName text-dots">{{item.bankName}}
                    <i class="iconfont icon-bank-normal" v-show="item.isDefault === 1"></i>
                </div>
                <div class="bankPlace text-dots">{{item.subbranch}}</div>
                <div class="bankNumb">{{item.card | filterBankNum}}</div>
                <!-- <img class="acctBg" src="./img_bankall3.png" alt=""> -->
                <div class="acctBg dis-inb">
                    <i class="iconfont icon-qb-bank-tongyong1 f200"></i>
                </div>
            </div>
        </div>
        <div class="contentf" v-show="bankList.length<3">
            <router-link to="/bankCardadd" tag="div" class="dntAcct">
                <div class="dntAcctBox">
                    <div class="divbox"><i class="iconfont icon-qb-bank-add f70"></i></div>
                    <p>点击添加银行卡</p>
                </div>
            </router-link>
        </div>
    </div>
</template>


<script>
    import FHeader from "../../../components/Header";
    import {
        Picker,
        Button
    } from "mint-ui";
    import {
        todoBankCard,
        bankCardList
    } from '@/api/bankCard';
    export default {
        components: {
            Picker,
            FHeader,
            Button
        },
        data() {
            return {
                bankList: [],
                itemHeight: parseInt(this.HTML_FONT_SIZE * 1.06667),
                popupVisible: false,
                chooseMainVal: "",
                chooseMain: "",
                sixId: 0,
                makeShow: false
            };
        },
    
        mounted() {
            this.hasBankMsg();
        },
        methods: {
            hasBankMsg() {
                bankCardList().then(res => {
                    console.log(res, 'res')
                    this.bankList = res.memberBankList;
                }).catch(err => {
                    this.$toast({
                        message: err,
                        duration: 1000
                    });
                });
            },
            open(item) {
                //如果是默认的就不能显示弹框设置
                if(item.isDefault === 1){
                    return;
                }
                this.popupVisible = true;
                this.sixId = item.id;
            },
            setDefault() {
                todoBankCard(this.sixId).then(res => {
                    this.$toast({
                        message: '设置成功',
                        duration: 2000
                    });
                    this.popupVisible = false;
                    this.hasBankMsg();
                }).catch(err => {
                    this.popupVisible = false;
                    this.$toast({
                        message: err,
                        duration: 2000
                    });
                });
            }
        }
    };
</script>



<style lang="less" scoped>
    @import url("../../../components/less/common.less");
    .mint-popup-bottom{
        width:100%;
    }
    .cards {
        width:100%;
        padding: 0.26667rem 0;
        text-align: center;
        height: 4rem/* 300/75 */;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .li {
            width: 100%;
            height: 1.06667rem/* 80/75 */
            ;
            line-height: 1.06667rem;
            border-radius: 0;
            color: #656b79;
            background: #fff;
        }
    }
    
    //
    .hasbox {
        width: 100%;
        height: 1.22667rem !important/* 92/75 */
        ;
    }
    
    .contentf {
        padding-left: 0.4rem/* 30/75 */
        !important;
        padding-right: 0.4rem !important;
        max-width: 100%;
        overflow: hidden;
    }
    
    .dntAcct {
        text-align: center;
        max-width: 100%;
        height: 3.06667rem/* 230/75 */
        ;
        padding-top: 0.4rem/* 30/75 */
        ;
        &:first-child {
            padding-top: 0;
        }
    }
    
    .f70 {
        font-size: .93333rem/* 70/75 */
        ;
    }
    
    .f200 {
        font-size: 2.66667rem/* 200/75 */
        ;
        color: #fbfbfb;
    }
    
    .dntAcct .dntAcctBox {
        padding-top: 1.62667rem/* 122/75 */;
        height: 1.01333rem/* 76/75 */;
        font-size: 0.37333rem/* 28/75 */
        ;
        color: #646466;
        border-radius: 0.06667rem/* 5/75 */
        ;
        border: 1px dashed #c8c8cc;
        box-shadow: 0 1px 0.04rem rgba(0, 0, 0, 0.15);
        background-size: 0.8rem/* 60/75 */
        ;
        .divbox {
            margin-top: -1.01333rem/* 76/75 */
            ;
            margin-bottom: .26667rem/* 20/75 */
            ;
        }
    }
    
    .content {
        padding: 0.4rem 0.4rem/* 30/75 */ 0;
    }
    
    .acctCard {
        position: relative;
        height: 2.66667rem/* 200/75 */
        ;
        padding-left: 0.54667rem/* 41/75 */
        ;
        background-image: linear-gradient(-90deg, #ff3b30 0%, #ff746c 100%);
        box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 0.13333rem/* 10/75 */
        ;
        margin-bottom: 0.4rem/* 30/75 */
        ;
        .bankName {
            max-width: 68%;
            padding-top: 0.4rem/* 30/75 */
            ;
            font-size: 0.48rem/* 36/75 */
            ;
            color: #fff;
            margin-bottom: 0.4rem/* 30/75 */;
            position:relative;
            .icon-bank-normal{
                position: absolute;
                top: .13333rem /* 10/75 */;
                font-size:1rem;
                margin-left:.32rem /* 24/75 */;
                color:rgba(255,255,255,0.6);
            }
        }
        .bankPlace,
        .bankNumb {
            max-width: 68%;
            height: 0.36rem/* 27/75 */
            ;
            font-family: PingFangSC-Regular;
            font-size: 0.37333rem/* 28/75 */
            ;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #ffffff;
            margin-bottom: 0.26667rem/* 20/75 */
            ;
            line-height: 0.4rem;
            word-wrap:break-word;
        }
        .bankPlace{
            margin-top: -.2rem /* 15/75 */;
        }
        .bankNumb{
           padding-top: .26667rem /* 20/75 */;
        }
        .acctBg {
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            width: 40%;
            text-align: right;
            i{
                position: absolute;
                right: -.26667rem /* 20/75 */;
                top: -.26667rem /* 20/75 */;
                font-size: 3.8rem;
                opacity: .2;
            }
        }
        &:nth-child(2n) {
            background-image: linear-gradient(-90deg, #3064ff 0%, #6ba9ff 100%);
            box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.12);
        }
        &:nth-child(3n) {
            background-image: linear-gradient(-90deg, #10c3b4 0%, #2dd99e 100%);
            box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.12);
        }
    }
    
   
</style>
