<template>
    <div id="addBankcard">
        <F-header title="添加银行卡" rooter="-1" :hasNoBack="true" :isShowHome="false"></F-header>
        <mt-popup :closeOnClickModal="true" :position="'bottom'" v-model="popupVisible" style="width: 100%;z-index: 2003;">
            <div class="popup-title pk-1px-b">
                <span @click="cancel()">取消</span>
                <span></span>
                <span @click="sure()">确定</span>
            </div>
            <mt-picker ref="picker" value-key="title" :itemHeight="itemHeight" :slots="mainType" @change="onValuesChange"></mt-picker>
        </mt-popup>
        <div class="hasbox"></div>
        <div class="gray"></div>
    
        <div class="content">
            <div class="pk-input pk-inputpro ">
                <label class="title muster fs-14">银行</label>
                <div class="input fs-12 input_pro">
                    <input @click="popupVisible = true" v-model="chooseMain" readonly type="text" placeholder="请选择银行" v-validate="'required'">
                    <i class="fs-15 iconfont icon-jt-y tj color-84"></i>
                </div>
            </div>
            <div class="pk-input pk-inputpro ">
                <label class="title muster fs-14">户主</label>
                <div class="input fs-12 input_pro">
                    <input name="bankUser" class="relative" autocomplete="off" v-model="bankAdd.username" v-validate="'required|min:1|max:20'" :class="{'input': true, 'is-danger': errors.has('bankUser') }" type="text" placeholder="请输入银行卡开户姓名">
                    <i type="clear" v-show="errors.has('bankUser')" class="fs-15 iconfont icon-czsb tj"></i>
                </div>
            </div>
    
            <div class="pk-input pk-inputpro ">
                <label class="title muster fs-14">开户行网点</label>
                <div class="input fs-12 input_pro">
                    <input type="text" class="relative" name="bankLocal" autocomplete="off" v-model="bankAdd.subbranch" v-validate="'required|max:20|min:1'" :class="{'input': true, 'is-danger': errors.has('密码') }" placeholder="请输入银行卡开户网点">
                    <i type="clear" v-show="errors.has('bankLocal')" class="fs-15 iconfont icon-czsb tj"></i>
                </div>
            </div>
    
            <div class="pk-input pk-inputpro no-bod-bot">
                <label class="title muster fs-14">银行卡号</label>
                <div class="input fs-12 input_pro no-bod-bot">
                    <input name="bankId" class="relative" autocomplete="off" v-model="bankAdd.card" v-validate="'required|numeric|max:20|min:16'" :class="{'input': true, 'is-danger': errors.has('bankId') }" type="text" placeholder="请输入银行卡卡号">
                    <i type="clear" v-show="errors.has('bankId')" class="fs-15 iconfont icon-czsb tj"></i>
                </div>
            </div>
        </div>
        <div class="else pdl30">
            <div class="divs">
                <p v-show="errors.has('bankUser')&&!vali" class="errs help fds-12 is-danger">{{ errors.first('bankUser') }}</p>
                <p v-show="errors.has('bankLocal')&&!vali&&!errors.has('bankUser')" class="errs help fds-12 is-danger">{{ errors.first('bankLocal') }}</p>
                <p v-show="errors.has('bankId')&&!vali&&!errors.has('bankUser')&&!errors.has('bankLocal')" class="errs help fds-12 is-danger">{{ errors.first('bankId') }}</p>
            </div>
            <div class="btn">
                <mt-button class="btn-green" type="default" @click="validateBeforeSubmit">确认</mt-button>
            </div>
        </div>
    </div>
</template>


<script>
    import FHeader from "../../../components/Header";
    import {
        Button
    } from "mint-ui";
    import {
        hasBankMsg,
        addMemberBank
    } from '@/api/bankCard';

    export default {
        data() {
            return {
                popupVisible: false,
                itemHeight: 36,
                chooseMain: "",
                rooter: "/bankCard",
                name: "",
                password: "",
                repassword: "",
                email: "",
                code: "",
                bankList: [],
                bankObj: {},
                vali: false,
                bankAdd: {
                    bankId: "",
                    card: "",
                    subbranch: "",
                    username: ""
                }
            };
        },
        computed: {
            mainType() {
                let dateSlots = [{
                    flex: 1,
                    values: this.bankList,
                    defaultIndex: 0,
                    className: "mainType",
                    textAlign: "center"
                }];
                return dateSlots;
            }
        },
        created() {
            this.itemHeight = parseInt(this.HTML_FONT_SIZE * 1.06667);
            this.hasBankMsg();
        },
        mounted() {},
        methods: {
            hasBankMsg() {
                var _this_ = this;
                hasBankMsg().then(res => {
                    // console.log(res);
                    _this_.bankList = res.bankCardDrop;
                    _this_.chooseMain = _this_.bankList[0].title;
                    _this_.bankAdd.bankId = _this_.bankList[0].id;
                });
            },
            //选择器
            onValuesChange(picker, values) {
                this.chooseMainVal = values[0];
            },
            cancel() {
                this.popupVisible = false;
                this.chooseMain = "";
            },
            sure() {
                this.chooseMain = this.chooseMainVal.title;
                this.bankObj = this.chooseMainVal;
                this.bankAdd.bankId = this.bankObj.id;
                this.popupVisible = false;
            },
    
            validateBeforeSubmit() {
                var _this = this;
                this.$validator.validateAll().then(result => {
                    if (result) {
                        let bankAdd = this.bankAdd;
                        addMemberBank(
                            bankAdd.bankId,
                            bankAdd.card,
                            bankAdd.username,
                            bankAdd.subbranch
                        ).then(res => {
                            _this.$toast("添加银行卡成功");
                            _this.$router.push({
                                name: "bankCard"
                            });
                        })
                        return;
                    }
                    // _this.$toast("添加银行卡失败");
                });
            }
        },
    
        components: {
            FHeader,
            Button
        }
    };
</script>



<style lang="less" scoped>
    @import url("../../../components/less/common.less");
    @import url("../about/index.less");
    .errs {
        color: #ff0000 !important;
        text-align: center;
    }
    
    .else {
        background: #f0f0f5 !important;
    }
    
    .content {
        padding-left: 0.37333rem/* 28/75 */
        !important;
        max-width: 100%;
        overflow: hidden;
    }
    
    .gray {
        width: 100%;
        height: 0.26667rem/* 20/75 */
        ;
        background-color: #f0f0f5;
    }
    
    .hasbox {
        width: 100%;
        height: 1.22667rem !important/* 92/75 */
        ;
    }
    
    #addBankcard {
        background: #fff;
    }
    
    .contentf {
        padding-left: 0.37333rem/* 28/75 */
        ;
    }
    
    .haserror {
        width: 100%;
        height: 0.30667rem/* 23/75 */
        ;
        font-size: 0.32rem/* 24/75 */
        ;
        color: #ff0000;
        padding-left: 0.4rem/* 30/75 */
        ;
        margin-top: 0.4rem/* 30/75 */
        ;
    }
    
    //input
    .pk-inputpro {
        margin-bottom: 0;
        border-bottom: 0.01333rem solid #c7c7cc !important;
        .title {
            padding-left: 0.37333rem/* 28/75 */
            ;
            color: #323233;
            margin-left: -0.13333rem/* 10/75 */
            ;
        }
        .input {
            input {
                font-size: 0.37333rem/* 28/75 */
                ;
                color: #646466;
                padding-left: 52%;
            }
        }
        .muster::before {
            content: "*";
            position: absolute;
            left: 0.17333rem/* 13/75 */
            ;
            top: 50%;
            -webkit-transform: translate(0, -50%);
            transform: translate(0, -50%);
            color: #ff0000;
        }
    }
    
    .input_pro {
        background: #fff !important;
        border-bottom: 0.01333rem solid #c7c7cc !important;
    }
    
    .no-bod-bot {
        border-bottom: none !important;
    }
    
    .pk-inputpro .input input {
        padding-left: 48%;
        margin-left: 3%;
        text-align: right !important;
        font-size: 0.37333rem/* 28/75 */
        ;
        color: #646466;
    }
    
    .tj {
        right: 0.13333rem/* 10/75 */
        ;
    }
</style>
