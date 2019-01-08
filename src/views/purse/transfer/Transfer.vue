<template>
    <div>
        <mt-popup :closeOnClickModal="true" :position="'bottom'" v-model="popupVisible" style="width: 100%;z-index: 2003;">
            <div class="popup-title pk-1px-b">
                <span @click="cancel()">取消</span>
                <span></span>
                <span @click="sure()">确定</span>
            </div>
            <mt-picker :itemHeight="itemHeight" valueKey="show" :slots="vidList" @change="onValuesChange"></mt-picker>
        </mt-popup>
    
        <Header rooter="-1" title="额度转换" :hasNoBack="true" iFontsize=".58667rem"></Header>
        <div class="transfer">
            <mt-navbar class="page-part pk-1px-b" v-model="selected">
                <mt-tab-item @click.native="changeTab(2)" id="1">转入视讯</mt-tab-item>
                <mt-tab-item @click.native="changeTab(1)" id="2">转出钱包</mt-tab-item>
            </mt-navbar>
            <!-- tab-container -->
            <mt-tab-container v-model="selected">
                <!--转入视讯-->
                <mt-tab-container-item class="chooseIn" id="1">
                    <ul class="select">
                        <li class="left">
                            <div class="top pk-1px-b">系统余额</div>
                            <input class="bottom text-dots" readonly required type="text" v-model="balance" placeholder="视讯余额">
                        </li>
                        <li class="center">
                            <div class="top">转入</div>
                            <div class="bottom">
                                <i class="iconfont icon-qb-eduzh-jt"></i>
                            </div>
                        </li>
                        <li class="right" @click="chooseIn()">
                            <div class="top pk-1px-b">
                                <input readonly required type="text" v-model="chooseVid.name" placeholder="点击选择视讯">
                            </div>
                            <div class="bottom text-dots">
                                <input readonly required type="text" v-model="chooseVid.balance" placeholder="视讯余额">
                            </div>
                        </li>
                    </ul>
                    <div class="choose-money">
                        <div class="in-money">
                            <h2 class="pk-1px-b">
                                <span class="must">转入金额</span>
                                <input @focus="iNow = -1" required type="tel" v-model="money" placeholder="请输入转入金额">
                            </h2>
                            <ul>
                                <li :class="{'active':iNow === index}" v-for="(item,index) in fastMoneyArr" :key="index" @click="handleFast(index)">{{item}}元</li>
                            </ul>
                        </div>
                    </div>
                    <div class="submit">
                        <p>温馨提示：单笔转入最低为<span>{{balance <= 1?'1':`1~${balance}`}}</span>元</p>
                        <button @click="handleConversion(2)" :disabled="balance<1">点击转入</button>
                        <button class="quick" @click="getFastSettingInfo">设置快捷转入</button>
                    </div>
                    <div v-show="popupQuick" class="quickBox">
                        <div class="quickCont">
                            <div class="title">设置快捷转入</div>
                            <div class="input">
                                <div class="input-top pk-1px-b">
                                    <div class="input-left">快捷转入比例</div>
                                    <div class="input-right"><input maxlength="3" type="tel" v-model="balanceRatio" placeholder="请输入正整数">%</div>
                                </div>
                                <div class="input-bottom">
                                    <div class="input-left">当天首次</div>
                                    <div class="input-right">
                                        <mt-switch v-model="dayFirst"></mt-switch>
                                    </div>
                                </div>
                            </div>
                            <p>
                                *设置比例后，每次进入游戏直接按照所设置余额比例自动 转入游戏中；
                                <br> *勾选“当天首次”，为当天首次进入游戏时按余额比例转入， 随后进入不再自动转入。
                            </p>
                            <div class="button">
                                <div class="button-left">
                                    <button @click="cancelFastSetting" type="button">取消</button>
                                </div>
                                <div class="button-right">
                                    <button @click="saveFastSetting" type="button">保存设置</button>
                                </div>
                            </div>
                        </div>
                        <div class="box-mask" @click="cancelFastSetting"></div>
                    </div>
                </mt-tab-container-item>
                <!--转出钱包-->
                <mt-tab-container-item class="chooseOut" id="2">
                    <ul class="select">
                        <li class="left">
                            <div class="top pk-1px-b">系统余额</div>
                            <input class="bottom text-dots" readonly required type="text" v-model="balance" placeholder="视讯余额">
                        </li>
                        <li class="center">
                            <div class="top">转出</div>
                            <div class="bottom">
                                <i class="iconfont icon-qb-eduzh-jt"></i>                                
                            </div>
                        </li>
                        <li class="right" @click="chooseOut()">
                            <div class="top pk-1px-b">
                                <input readonly required type="text" v-model="chooseVid.name" placeholder="点击选择视讯">
                            </div>
                            <div class="bottom text-dots">
                                <input readonly required type="text" v-model="chooseVid.balance" placeholder="视讯余额">
                            </div>
                        </li>
                    </ul>
                    <div class="choose-money">
                        <div class="in-money">
                            <h2 class="pk-1px-b">
                                <span class="must">转出金额</span>
                                <input @focus="iNow = -1" required type="tel" v-model="money" placeholder="请输出转出金额">
                            </h2>
                            <ul>
                                <li :class="{'active':iNow === index}" v-for="(item,index) in fastMoneyArr" :key="index" @click="handleFast(index)">{{item}}元</li>
                            </ul>
                        </div>
                    </div>
                    <div class="submit">
                        <p>温馨提示：单笔转出最低为<span>{{chooseVid.balance?`1~${chooseVid.balance}`:'1'}}</span>元</p>
                        <button @click="handleConversion(1)" :disabled="vidList[0].values.length<1">点击转出</button>
                        <button @click="allTransfer()" :disabled="vidList[0].values.length<1" class="quick">一键归户</button>
                    </div>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
    </div>
</template>

<script>
    import Header from '../../../components/Header'
    import func from '@/api/purse'

    export default {
        name: "transfer",
        components: {
            Header,
        },
        created() {
            this.getSelectData(() =>{ 
                this.isFastTransfer();
            });
        },
        data() {
            return{
                itemHeight : parseInt(this.HTML_FONT_SIZE * 1.06667),
                selected: '1',//控制tab切换
                balance: 0,//系统余额、最大转入额
                tab:2,//2是转入视讯，1是转出钱包 这个跟后端接口doType字段对应

                //控制选择视讯
                popupVisible: false,
                chooseVid: "",
                chooseVidval: "",
                vidList: [{
                    flex: 1,
                    values: [],
                    className: 'chooseVideo',
                    textAlign: 'center',
                    defaultIndex: 0,
                }],
    
                iNow: -1, //控制快捷选择转入，转出金额
                fastMoneyArr: [1000, 500, 200, 100],
                money: '', //转入,转出金额
    
                popupQuick: false, //是否显示设置快捷转入
                balanceRatio: 0, //系统余额比例
                dayFirst: false, //当天首存 1选中 2未选中
            }
        },
       
        methods: {
            isFastTransfer(){
                if(this.$route.params.id){
                    this.vidList[0].values.map((v,i)=>{
                        if(this.$route.params.id == v.id){
                            this.chooseVid = v;
                            this.vidList[0].defaultIndex = i;
                        }
                    })
                }
            },
    
            //获取系统余额和视讯下拉框
            getSelectData(cb){
                func.getWalletInfo().then((res) => {
                    // console.log(res)
                    this.balance = res.walletCenterResp.balance;
                    this.list = [];
                    res.walletCenterResp.gameBalance.forEach((v)=>{
                        this.list.push({
                            show:v.name+" "+v.balance,
                            name:v.name,
                            balance:v.balance,
                            id:v.id,
                            platformName:v.platformName
                        })
                    })
                    if(this.tab ===2){//转入视讯
                        this.vidList[0].values = this.list;
                    }else { //转出钱包-将视讯下拉金额小于等于0的过滤掉
                        let newList = this.list.filter(({balance})=>{
                            return balance >0;
                        });
                        this.vidList[0].values = newList;
                    }
                    cb?cb():"";

                }).catch(err => {
                    this.$toast({
                        message: "刷新成功",
                        duration: 2000
                    });
                });
            },
    
            //转入，转出，tab切换
            changeTab(type) {
                this.tab = type;
                this.reset();
                this.getSelectData();
            },
    
            //tab切换重置
            reset() {
                this.chooseVid = "";
                this.money = "";
                this.iNow = -1;
            },
    
    
            //快捷选择转换金额
            handleFast(index) {
                if (this.tab === 1) {
                    if (this.fastMoneyArr[index] > this.chooseVid.balance) {
                        this.$toast({
                            message: `转出金额不得高于${this.chooseVid.balance}元`,
                            duration: 2000
                        });
                        return;
                    }
                } else {
                    if (this.fastMoneyArr[index] > this.balance) {
                        this.$toast({
                            message: `转入金额不得高于系统余额元`,
                            duration: 2000
                        });
                        return;
                    }
                }
                this.iNow = index;
                this.money = this.fastMoneyArr[index];
            },
            onValuesChange(picker, values) {
                this.chooseVidval = values[0];
            },
            cancel() {
                this.popupVisible = false;
                this.chooseVid = '';
            },
            sure() {
                this.chooseVid = this.chooseVidval;
                this.popupVisible = false;
            },
            chooseIn(){
                if(this.balance<1){
                    this.$toast({
                        message: '系统余额不足，无法转入',
                        duration: 2000
                    });
                }else {
                    this.popupVisible = true;
                }
            },
            chooseOut(){
                if(this.vidList[0].values.length<1){
                    this.$toast({
                        message: '暂无视讯余额转出',
                        duration: 2000
                    });
                }else {
                    this.popupVisible = true;
                }
            },
    
            //转入、转出
            handleConversion(type) {
                if (!this.validateTrans()) return;
                let postData = {
                    doType:type,
                    money:this.money * 1,
                    platformId:this.chooseVid.id,
                    platformName:this.chooseVid.platformName,
                }
                func.postTransfer(postData).then((res) => {
                    // console.log(res)
                    this.reset();
                    this.getSelectData();
                    this.transSuccess();
                }).catch(err => {
                    this.$toast({
                        message: err,
                        duration: 2000
                    });
                });
            },
    
            //转换成功
            transSuccess() {
                this.$messagebox({
                    title: ' ',
                    message: '额度转换成功',
                    showCancelButton: true,
                    confirmButtonText: "继续",
                    cancelButtonText: "查看订单"
                }).then(action => {
                    if (action == 'confirm') {
                    }else{
                        this.$router.push({name: 'depositRecord',query:{fromType:4}})
                    }
                })
            },
    
    
            //取消设置快捷转入
            cancelFastSetting() {
                this.popupQuick = false;
                this.dayFirst = false;
                this.balanceRatio = 0;
            },
    
            //获取快捷转入设置信息
            getFastSettingInfo() {
                this.popupQuick = true;
                func.getFastSettingInfo().then((res) => {
                    this.balanceRatio = res.balanceRatio;
                    this.dayFirst = res.dayFirst === 1;
                }).catch(err => {
                    this.$toast({
                        message: err,
                        duration: 2000
                    });
                });
            },
            //保存快捷转入设置
            saveFastSetting() {
                let reg = /^([1-9]\d?|100)$/;
                if (!reg.test(this.balanceRatio)) {
                    this.$toast({
                        message: `请输入1-100的正整数`,
                        duration: 2000
                    });
                    return;
                }
                let postData = {
                    dayFirst :this.dayFirst ? 1 : 2,//当天首存 1选中 2未选中
                    balanceRatio: this.balanceRatio *1,
                }
                func.postFastSetting(postData).then((res) => {
                    this.popupQuick = false;
                    this.$toast({message:'设置成功',duration: 2000});
                }).catch(err => {
                    this.$toast({
                        message: err,
                        duration: 2000
                    });
                });
            },
    
            //一键归户
            allTransfer() {
                this.$messagebox({
                    title: ' ',
                    message: '您确定将所有视讯余额转出吗？',
                    showCancelButton: true,
                    confirmButtonText: "确定",
                    cancelButtonText: "取消"
                }).then(action => {
                    if(action == 'confirm'){
                        func.postAllTransfer().then((res) => {
                            this.$toast({message:'转出成功',duration: 2000});
                            this.getSelectData();
                        }).catch(err => {
                            this.$toast({
                                message: err,
                                duration: 2000
                            });
                        });
                    }
                })
            },
    
            //表单验证-转入、转出
            validateTrans() {
                if (!this.chooseVid) {
                    this.$toast({
                        message: '请选择视讯',
                        duration: 2000
                    });
                    return false;
                }
    
                if (this.tab === 1) {
                    if (!this.APP_CONFIG.RegExp.number.test(this.money)) {
                        this.$toast({
                            message: '转出金额为正整数',
                            duration: 2000
                        });
                        return false;
                    }
    
                    if (this.money > this.chooseVid.balance || this.money < 1) {
                        this.$toast({
                            message: `转出金额为1-${this.chooseVid.balance}`,
                            duration: 2000
                        });
                        return false;
                    }
                } else {
                    if (!this.APP_CONFIG.RegExp.number.test(this.money)) {
                        this.$toast({
                            message: '转入金额为正整数',
                            duration: 2000
                        });
                        return false;
                    }
    
                    if (this.money > this.balance || this.money < 1) {
                        this.$toast({
                            // message: `转入金额为1-${this.balance}`,
                            message:this.balance<=1?'转入金额至少为1元':`转入金额为1-${this.balance}元`,
                            duration: 2000
                        });
                        return false;
                    }
                }
                return true
            },
        }
    }
</script>

<style lang="less" scoped>
    @import url("../../../components/less/common.less");
    .transfer {
        padding-top: 1.22667rem/* 92/75 */
        ;
        .page-part {
            line-height: 1.067rem;
            a {
                padding: 0;
                font-size: 0.427rem;
                color: @color-323233;
            }
            a.is-selected {
                position: relative;
                font-weight: bold;
                &:after {
                    position: absolute;
                    left: 50%;
                    bottom: 0;
                    width: 1.333rem;
                    height: 0.067rem;
                    content: '';
                    background-color: @color-green;
                    border-radius: 0.027rem;
                    -webkit-transform: translateX(-50%);
                    transform: translateX(-50%);
                }
            }
        }
        .box-mask {
            z-index: 999;
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.4);
        }
        .chooseOut {
            ul.select {
                li.center {
                    .bottom {
                        -webkit-transform: rotateY(180deg);
                        transform: rotateY(180deg);
                    }
                }
            }
        }
        .mint-tab-container {
            .mint-tab-container-item {
                ul.select {
                    display: -webkit-flex;
                    display: flex;
                    padding: 0.4rem;
                    -webkit-box-pack: justify;
                    justify-content: space-between;
                    li {
                        .top,
                        .bottom {
                            height: 1.34rem;
                        }
                    }
                    li.left {
                        font-size: 0.48rem;
                        line-height: 1.34rem;
                        background-color: @color-f5f5fa;
                        .bottom {
                            width: 100%;
                            text-align: center;
                            font-weight: bold;
                            color: @color-green;
                            background: none;
                            border: 0;
                        }
                    }
                    li.right {
                        font-size: 0.427rem;
                        line-height: 1.34rem;
                        color: @color-c8c8cc;
                        background-color: #fff;
                        input {
                            width: 100%;
                            background: none;
                            border: 0;
                            text-align: center;
                        }
                    }
                    li.center {
                        .top {
                            height: 1.34rem;
                            display: table-cell;
                            vertical-align: bottom;
                            font-size: 0.373rem;
                            font-weight: bold;
                            color: @color-green;
                        }
                        .bottom {
                            i{
                                font-size: .8rem /* 60/75 */;
                                color: @color-green;
                            }
                        }
                    }
                    &>li:first-child,
                    &>li:last-child {
                        width: 3.76rem;
                        height: 2.707rem;
                        text-align: center;
                        border-radius: 0.133rem;
                        border: 1px solid @color-c8c8cc;
                    }
                }
                .choose-money {
                    background: #fff;
                    .in-money {
                        h2 {
                            padding: .34667rem 0 .34667rem;
                            margin: 0 .4rem;
                            display: flex;
                            justify-content: space-between;
                            span {
                                flex: 3;
                                font-size: .37333rem;
                                color: @color-323233;
                                &:last-child {
                                    color: @color-green;
                                }
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
                                font-size: .32rem/* 24/75 */
                                ;
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
                }
                .submit {
                    padding: .26667rem 0.4rem .4rem/* 30/75 */
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
                        margin-bottom: .4rem/* 20/75 */
                        ;
                        box-shadow: 0 0.027rem 0.067rem 0 rgba(0, 0, 0, 0.12);
                        &:active {
                            background: @color-00cc8f;
                        }
                        &:disabled {
                            background: @color-add9cc;
                            box-shadow: none;
                            color: @color-c8c8cc;
                        }
                    }
                    button.quick {
                        background: #fff;
                        color: @color-green;
                        border: solid .013rem @color-green;
                        &:disabled {
                            background: @color-f5f5fa;
                            box-shadow: none;
                            color: @color-c8c8cc;
                        }
                    }
                    p {
                        margin-bottom: 0.4rem;
                        font-size: .32rem/* 24/75 */
                        ;
                        color: @color-969699;
                        span {
                            color: @color-green;
                        }
                    }
                }
                .quickBox {
                    .quickCont {
                        z-index: 1000;
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        margin: 0 auto;
                        width: 9.2rem;
                        height: 7.12rem;
                        color: #fff;
                        background-color: @color-f5f5fa;
                        border-radius: 0.133rem;
                        -webkit-transform: translate(-50%, -50%);
                        transform: translate(-50%, -50%);
                        overflow: hidden;
                        .title {
                            padding: 0 0.4rem;
                            height: 1.2rem;
                            line-height: 1.2rem;
                            font-weight: bold;
                            font-size: 0.427rem;
                            color: @color-323233;
                        }
                        .input {
                            padding: 0 0.4rem;
                            background-color: #fff;
                            .input-top,
                            .input-bottom {
                                display: -webkit-flex;
                                display: flex;
                                -webkit-box-pack: justify;
                                justify-content: space-between;
                                height: 1.067rem;
                                line-height: 1.067rem;
                                overflow: hidden;
                                .input-left {
                                    font-size: 0.373rem;
                                    color: @color-323233;
                                }
                                .input-right {
                                    font-weight: bold;
                                    font-size: 0.373rem;
                                    color: @color-green;
                                    input {
                                        border: 0;
                                        text-align: right;
                                    }
                                    .mint-switch {
                                        margin-top: 0.213rem;
                                        width: 1.333rem;
                                        height: 0.64rem;
                                    }
                                }
                            }
                        }
                        p {
                            padding: 0.24rem 0.4rem;
                            height: 1.693rem;
                            line-height: 0.42rem;
                            font-size: 0.32rem;
                            color: @color-646466;
                        }
                        .button {
                            display: -webkit-flex;
                            display: flex;
                            -webkit-box-pack: justify;
                            justify-content: space-between;
                            .button-left,
                            .button-right {
                                width: 50%;
                                button {
                                    display: block;
                                    margin: 0 auto;
                                    width: 3.2rem;
                                    height: 1.067rem;
                                    font-size: 0.373rem;
                                    color: @color-646466;
                                    box-shadow: 0 0.027rem 0.067rem 0 rgba(0, 0, 0, 0.12);
                                    border-radius: 0.133rem;
                                    border: 0;
                                }
                            }
                            .button-right {
                                button {
                                    background-color: @color-green;
                                    color: #fff;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
