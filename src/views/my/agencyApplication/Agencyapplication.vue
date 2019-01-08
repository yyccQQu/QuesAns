<template>
    <div>
        <Header :title="title" :rooter="rooter" :hasNoBack="true" :ty="ty" @ty="findaccount" :isShowHome="false"></Header>
        <div class="hasbox"></div>
        <div class="gray"></div>
        <div class="content" v-show="ty==1">
            <div class="pk-input pk-inputpro ">
                <label class="title muster fs-14">代理账号</label>
                <div class="input fs-12 input_pro inputs">
                    <input name="agencyAccount" class="relative" autocomplete="off" v-model="addData.account" v-validate="'required|min:5|max:12'" :class="{'input': true, 'is-danger': errors.has('agencyAccount') }" type="text" placeholder="请输入5-12位英文数字组合">
                    <i type="clear" v-show="errors.has('agencyAccount')" class="fs-15 iconfont icon-login-error tj"></i>
                </div>
            </div>
    
            <div class="pk-input pk-inputpro ">
                <label class="title muster fs-14">登录密码</label>
                <div class="input fs-12 input_pro inputs">
                    <input type="password" class="relative" name="password" autocomplete="off" v-model="addData.password" v-validate="'required|max:11|min:6'" :class="{'input': true, 'is-danger': errors.has('password') }" placeholder="请输入6-11位英文数字组合">
                    <i type="clear" v-show="errors.has('password')" class="fs-15 iconfont icon-login-error tj"></i>
                </div>
            </div>
    
            <div class="pk-input pk-inputpro">
                <label class="title muster fs-14">确认密码</label>
                <div class="input fs-12 input_pro inputs">
                    <input name="confirmPassword" class="" autocomplete="off" v-model="addData.rePassword" v-validate="'required|max:11|min:6'" :class="{'input': true, 'is-danger': errors.has('confirmPassword') }" type="password" placeholder="请再次输入登录密码">
                    <i type="clear" v-show="errors.has('confirmPassword')" class="fs-15 iconfont icon-login-error tj"></i>
                </div>
            </div>
    
            <div class="pk-input pk-inputpro makd">
                <label class="title muster fs-14">验证码</label>
                <div class="input fs-12 input_pro max80b dis-inb ficon">
                    <input name="captcha" class="no-bod-bot" autocomplete="off" v-model="addData.code" v-validate="'required|max:4|min:4'" :class="{'input': true, 'is-danger': errors.has('captcha') }" type="text" placeholder="请输入验证码">
                    <i type="clear" v-show="errors.has('captcha')" class="fs-15 iconfont icon-login-error tj"></i>
                </div>
                <div class="input-code-img fr">
                    <img :src="codeImg" @click="getCode">
                </div>
            </div>
        </div>
        <div class="content" v-show="ty==2">
    
            <div class="pk-input pk-inputpro ">
                <label class="title muster fs-14">真实姓名</label>
                <div class="input fs-12 input_pro inputs">
                    <input tit="realName" name="name" class="relative" autocomweChatplete="off" v-model="addData.realName" v-validate="'required|max:20'" :class="{'input': true, 'is-danger': errors.has('name') }" type="text" placeholder="请输入您的真实姓名">
                    <i type="clear" v-show="errors.has('name')" class="fs-15 iconfont icon-login-error tj"></i>
                </div>
            </div>
            <div class="pk-input pk-inputpro">
                <label class="title muster fs-14">身份证</label>
                <div class="input fs-12 input_pro inputs ">
                    <input tit="idCard" name="IDCard" class="relative" autocomplete="off" v-model="addData.idCard" v-validate="'max:18|min:15|required'" :class="{'input': true, 'is-danger': errors.has('IDCard') }" type="text" placeholder="请输入您的身份证">
                    <i type="clear" v-show="errors.has('IDCard')" class="fs-15 iconfont icon-login-error tj"></i>
                </div>
            </div>
            <div class="pk-input pk-inputpro ">
                <label class="title titlesr fs-14">邮箱</label>
                <div class="input fs-12 input_pro inputs">
                    <input tit="email" type="text" class="relative" name="email" autocomplete="off" v-model="addData.email" v-validate="'email'" :class="{'input': true, 'is-danger': errors.has('email') }" placeholder="请输入您的邮箱地址">
                    <i type="clear" v-show="errors.has('email')" class="fs-15 iconfont icon-login-error tj"></i>
                </div>
            </div>
    
            <div class="pk-input pk-inputpro">
                <label class="title titlesr fs-14">QQ</label>
                <div class="input fs-12 input_pro inputs ">
                    <input tit="QQ" name="QQ" class="relative" autocomplete="off" v-model="addData.qq" v-validate="'numeric|max:20|min:5'" :class="{'input': true, 'is-danger': errors.has('QQ') }" type="number" placeholder="请输入您的QQ号">
                    <i type="clear" v-show="errors.has('QQ')" class="fs-15 iconfont icon-login-error tj"></i>
                </div>
            </div>
            <div class="pk-input pk-inputpro">
                <label class="title titlesr fs-14">微信</label>
                <div class="input fs-12 input_pro inputs ">
                    <input tit="wechat" name="weChat" class="relative" autocomplete="off" v-model="addData.wechat" v-validate="'max:20|min:5'" :class="{'input': true, 'is-danger': errors.has('weChat') }" type="text" placeholder="请输入您的微信号">
                    <i type="clear" v-show="errors.has('weChat')" class="fs-15 iconfont icon-login-error tj"></i>
                </div>
            </div>
            <div class="pk-input pk-inputpro">
                <label class="title titlesr fs-14">手机号</label>
                <div class="input fs-12 input_pro inputs ">
                    <input tit="telephone" name="mobilePhone" class="relative" autocomplete="off" v-model="addData.telephone" v-validate="'max:20|min:10'" :class="{'input': true, 'is-danger': errors.has('mobilePhone') }" type="text" placeholder="请输入您的手机号">
                    <i type="clear" v-show="errors.has('mobilePhone')" class="fs-15 iconfont icon-login-error tj"></i>
                </div>
            </div>
            <div class="pk-input pk-inputpro">
                <label class="title titlesr fs-14">英文昵称</label>
                <div class="input fs-12 input_pro inputs">
                    <input tit="englishNickName" name="englishNickName" class="relative" autocomplete="off" v-model="addData.englishNickName" v-validate="'max:12|min:1'" :class="{'input': true, 'is-danger': errors.has('englishNickName') }" type="text" placeholder="请输入英文昵称">
                    <i type="clear" v-show="errors.has('englishNickName')" class="fs-15 iconfont icon-login-error tj"></i>
                </div>
            </div>
            <div class="pk-input pk-inputpro">
                <label class="title titlesr fs-14">中文昵称</label>
                <div class="input fs-12 input_pro inputs ">
                    <input tit="chineseNickName" name="chineseNickName" class="relative" autocomplete="off" v-model="addData.chineseNickName" v-validate="'max:12|min:1'" :class="{'input': true, 'is-danger': errors.has('chineseNickName') }" type="text" placeholder="请输入您的中文昵称">
                    <i type="clear" v-show="errors.has('chineseNickName')" class="fs-15 iconfont icon-login-error tj"></i>
                </div>
            </div>
    
            <div class="pk-input pk-inputpro">
                <label class="title titlesr fs-14">推广网址</label>
                <div class="input fs-12 input_pro inputs ">
                    <input tit="promoteSite" name="promoteSite" class="relative" autocomplete="off" v-model="addData.promoteSite" v-validate="'http|max:20|min:5'" :class="{'input': true, 'is-danger': errors.has('promoteSite') }" type="text" placeholder="请输入完整网址,不包含http://">
                    <i type="clear" v-show="errors.has('promoteSite')" class="fs-15 iconfont icon-login-error tj"></i>
                </div>
            </div>
            <div class="pk-input pk-inputpro">
                <label class="title titlesr fs-14">其它方式</label>
                <div class="input fs-12 input_pro inputs ">
                    <input tit="otherpromoteway" name="otherpromoteway" class="relative" autocomplete="off" v-model="addData.otherpromoteway" v-validate="'max:20|min:5'" :class="{'input': true, 'is-danger': errors.has('otherpromoteway') }" type="text" placeholder="其他推广方式,请用文字描述">
                    <i type="clear" v-show="errors.has('otherpromoteway')" class="fs-15 iconfont icon-login-error tj"></i>
                </div>
            </div>
            <div class="pk-input pk-inputpro">
                <label class="title fs-14 titlesr">备注</label>
                <div class="input fs-12 input_pro ">
                    <input tit="remark" name="remark" class="no-bod-bot" autocomplete="off" v-model="addData.remark" v-validate="'max:20'" :class="{'input': true, 'is-danger': errors.has('remark') }" type="text" placeholder="请输入备注信息">
                    <i type="clear" v-show="errors.has('remark')" class="fs-15 iconfont icon-login-error tj"></i>
                </div>
            </div>
        </div>
        <div class="content" v-show="ty==3">
            <mt-popup :closeOnClickModal="true" :position="'bottom'" v-model="popupVisible" style="width: 100%;z-index: 2003;">
                <div class="popup-title pk-1px-b">
                    <span @click="cancel()">取消</span>
                    <span>请选择银行</span>
                    <span @click="sure()">确定</span>
                </div>
                <mt-picker ref="picker" value-key="title" :itemHeight="itemHeight" :slots="mainType" @change="onValuesChange"></mt-picker>
            </mt-popup>
            <mt-popup :closeOnClickModal="true" :position="'bottom'" v-model="popupVisibles" style="width: 100%;z-index: 2003;">
                <div class="popup-title pk-1px-b">
                    <span @click="cancels()">取消</span>
                    <span>请选择支行地址</span>
                    <span @click="sures()">确定</span>
                </div>
                <picker :slots="myAddressSlots" :itemHeight="itemHeight" @change="onMyAddressChange"></picker>
            </mt-popup>
            <div class="pk-input pk-inputpro ">
                <label class="title muster fs-14">银行名称</label>
                <div class="input fs-12 input_pro inputs">
                    <input @click="popupVisible = true" v-model="chooseMain" readonly type="text" placeholder="请选择银行" v-validate="'required'">
                    <i class="fs-15 iconfont icon-jt-y tj color-84"></i>
                </div>
            </div>
    
            <div class="pk-input pk-inputpro ">
                <label class="title muster fs-14">银行账号</label>
                <div class="input fs-12 input_pro inputs">
                    <input type="text" class="relative" name="bankName" autocomplete="off" v-model="addData.bankNum" v-validate="'required|max:18|min:15'" :class="{'input': true, 'is-danger': errors.has('bankName') }" placeholder="请输入您的银行账号">
                    <i type="clear" v-show="errors.has('bankName')" class="fs-15 iconfont icon-login-error tj"></i>
                </div>
            </div>
    
            <div class="pk-input pk-inputpro ">
                <label class="title muster fs-14">支行地址</label>
                <div class="input fs-12 input_pro">
                    <input type="text" readonly @click="popupVisibles = true" name="bankAddress" autocomplete="off" v-model="borthplace" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('bankAddress') }" placeholder="请选择支行地址">
                    <i class="fs-15 iconfont icon-jt-y tj color-84"></i>
                </div>
            </div>
        </div>
    
        <div class="else pdl30">
            <span v-show="ty==1">
                            <div class="divs">
                                <p v-show="errors.has('agencyAccount')" class="errs help fds-12 is-danger">{{ errors.first('agencyAccount') }}</p>
                                <p v-show="errors.has('password')&&!errors.has('agencyAccount')" class="errs help fds-12 is-danger">{{ errors.first('password') }}</p>
                                <p v-show="errors.has('confirmPassword')&&!errors.has('password')&&!errors.has('agencyAccount')" class="errs help fds-12 is-danger">{{ errors.first('confirmPassword') }}</p>
                                <p v-show="errors.has('captcha')&&!errors.has('confirmPassword')&&!errors.has('password')&&!errors.has('agencyAccount')" class="errs help fds-12 is-danger">{{ errors.first('captcha') }}</p>
                            </div>
                            <div class="btn">
                                <mt-button class="btn-green" type="default" @click="changeone()">下一步</mt-button>
                            </div>
                        </span>
            <span v-show="ty==2">
                            <div class="divs">
                                <p v-show="errors.has('name')" class="errs help is-danger">{{ errors.first('name') }}</p>
                                <p v-show="errors.has('email')&&!errors.has('name')" class="errs help is-danger">{{ errors.first('email') }}</p>
                                <p v-show="errors.has('QQ')&&!errors.has('email')&&!errors.has('name')" class="errs help is-danger">{{ errors.first('QQ') }}</p>
                                <p v-show="errors.has('weChat')&&!errors.has('QQ')&&!errors.has('email')&&!errors.has('name')" class="errs help is-danger">{{ errors.first('weChat') }}</p>
                                <p v-show="errors.has('mobilePhone')&&!errors.has('weChat')&&!errors.has('QQ')&&!errors.has('email')&&!errors.has('name')" class="errs help is-danger">{{ errors.first('mobilePhone') }}</p>
                                <p v-show="errors.has('englishNickName')&&!errors.has('mobilePhone')&&!errors.has('weChat')&&!errors.has('QQ')&&!errors.has('email')&&!errors.has('name')" class="errs help is-danger">{{ errors.first('englishNickName') }}</p>
                                <p v-show="errors.has('chineseNickName')&&!errors.has('englishNickName')&&!errors.has('mobilePhone')&&!errors.has('weChat')&&!errors.has('QQ')&&!errors.has('email')&&!errors.has('name')" class="errs help is-danger">{{ errors.first('chineseNickName') }}</p>
                                <p v-show="errors.has('IDCard')&&!errors.has('chineseNickName')&&!errors.has('englishNickName')&&!errors.has('mobilePhone')&&!errors.has('weChat')&&!errors.has('QQ')&&!errors.has('email')&&!errors.has('name')" class="errs help is-danger">{{ errors.first('IDCard') }}</p>
                                <p v-show="errors.has('promoteSite')&&!errors.has('IDCard')&&!errors.has('chineseNickName')&&!errors.has('englishNickName')&&!errors.has('mobilePhone')&&!errors.has('weChat')&&!errors.has('QQ')&&!errors.has('email')&&!errors.has('name')" class="errs help fds-12 is-danger">{{ errors.first('promoteSite') }}</p>
                                <p v-show="errors.has('remark')&&!errors.has('promoteSite')&&!errors.has('IDCard')&&!errors.has('chineseNickName')&&!errors.has('englishNickName')&&!errors.has('mobilePhone')&&!errors.has('weChat')&&!errors.has('QQ')&&!errors.has('email')&&!errors.has('name')" class="errs help fds-12 is-danger">{{ errors.first('remark') }}</p>
                            </div>
                            <div class="btn">
                                <mt-button class="btn-green btn-greens lbtn" type="default" @click="findaccount(2)">上一步</mt-button>
                                <mt-button class="btn-green btn-greens" type="default" @click="changetwo()">下一步</mt-button>
                            </div>
                        </span>
            <span v-show="ty==3">
                            <div class="divs">
                                <p v-show="errors.has('bankName')" class="errs help fds-12 is-danger">{{ errors.first('bankName') }}</p>
                                <p v-show="errors.has('bankAddress') && !errors.has('bankName')" class="errs help fds-12 is-danger">{{ errors.first('bankAddress') }}</p>
                            </div>
                            <div class="btn" style="text-align: center;">
                                <mt-button class="btn-green lbtns" type="default" @click="findaccount(3)">上一步</mt-button>
                                <mt-button class="btn-green mbtns" type="default" @click="submit">提交</mt-button>
                                <mt-button class="btn-green rbtns" type="default" @click="gomy">取消</mt-button>
                            </div>
                        </span>
        </div>
    </div>
</template>

<script>
    import Header from "../../../components/Header";
    import {
        Button
    } from "mint-ui";
    
    import {
        Picker
    } from "mint-ui";
    import myaddress from "../../../components/json/provincesCities.json";
    import {
        proxyAdd,
        getBankList,
        getSitt
    } from '@/api/Agencyapplication'
    import {
        getCaptcha
    } from '@/api/login'
    
    export default {
        components: {
            Header,
            Picker,
            Button
        },
        data() {
            return {
                rooter: "/agencyappli",
                title: "代理账号申请",
                addData: {
                    account: "",
                    password: "",
                    rePassword: "",
                    code: "",
                    realName: "",
                    email: "",
                    qq: "",
                    wechat: "",
                    telephone: "",
                    englishNickName: "",
                    chineseNickName: "",
                    idCard: "",
                    promoteSite: "",
                    remark: "",
                    bankNum: "",
                    bankName: "",
                    province: "",
                    otherpromoteway: "",
                    city: ""
                },
                dailiData:"",
                ty: 1,
                codeImg: "",
                codeId: "",
                popupVisibles: false,
                popupVisible: false,
                itemHeight: 36,
                chooseMain: "",
                chooseMainVal: "",
                borthplace: "",
                bankList: [],
                myAddressSlots: [{
                        flex: 1,
                        defaultIndex: 1,
                        values: Object.keys(myaddress), //省份数组
                        className: "slot1",
                        textAlign: "center"
                    },
                    {
                        divider: true,
                        content: "-",
                        className: "slot2"
                    },
                    {
                        flex: 1,
                        values: [],
                        className: "slot3",
                        textAlign: "center"
                    }
                    // {
                    //   divider: true,
                    //   content: "-",
                    //   className: "slot4"
                    // },
                    // {
                    //   flex: 1,
                    //   values: [],
                    //   className: "slot5",
                    //   textAlign: "center"
                    // }
                ],
                middlex: "",
                myAddressProvince: "省",
                myAddressCity: "市",
                myAddresscounty: "区/县"
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
            this.getBankList();
        },
        mounted() {
            this.getCode();
            this.itemHeight = parseInt(this.HTML_FONT_SIZE * 1.06667);
            this.getSitt();
        },
    
        methods: {
            //获取银行列表接口
            getBankList() {
                var _this = this;
                getBankList().then(res => {
                    _this.bankList = res.bankCardDrop;
                    _this.chooseMain = _this.bankList[0].title;
                    _this.addData.bankName = _this.bankList[0].title;
                });

            },
            //判断是否必填
            getSitt() {
                getSitt().then(res=>{
                    let arrts = res;
                    let inputs = this.$("input[tit!=''][tit!='undefined']");
                        inputs.map(v => {
                        var lower = this.$(inputs[v]).attr("tit");
                        if (lower) {
                            for (var i in arrts) {
                                var c = res[arrts[i]];
                                if (c == 2) {
                                    // console.log(arrts[i], c);
                                    if (lower.toLowerCase() == arrts[i]) {
                                        // console.log(arrts[i],i,this.$(inputs[v]))
                                        this.$(inputs[v])
                                            .parent()
                                            .parent()
                                            .hide();
                                    }
                                } else if (c == 1) {
                                    // console.log(arrts[i], c);
                                    if (lower.toLowerCase() == arrts[i]) {
                                        var label = this.$(inputs[v])
                                            .parent()
                                            .siblings("label");
                                        label.removeClass("muster").addClass("titlesr");
                                    }
                                } else if (c == 3) {
                                    // console.log(arrts[i], c);
                                    if (lower.toLowerCase() == arrts[i]) {
                                        var label = this.$(inputs[v])
                                            .parent()
                                            .siblings("label");
                                        label.addClass("muster").removeClass("titlesr");
                                        this.$(inputs[v]).addClass("requireds");
                                    }
                                }
                            }
                        }
                    });
                })

            },
    
            getCode() {
                getCaptcha().then((res) => {
                    this.codeImg = "data:image/png;base64," + res.Code;
                    this.codeId = res.ID;
                }).catch((res) => {
                    _this.$toast({
                        message: res,
                        duration: 2000
                    });
                });
            },
            changeone() {
                const rex = ["agencyAccount", "password", "confirmPassword", "captcha"];
                let _this = this;
                for (var i = 0; i < rex.length; i++) {
                    this.$validator.validate(rex[i]).then(result => {});
                }
                setTimeout(() => {
                    if (this.$validator.errors.count() <= 0) {
                        _this.ty = 2;
                    }
                }, 1);
            },
            changetwo() {
                const rex = [
                    "name",
                    "email",
                    "QQ",
                    "weChat",
                    "mobilePhone",
                    "englishNickName",
                    "chineseNickName",
                    "IDCard",
                    "promoteSite",
                    "remark"
                ];
                let _this = this;
                for (var i = 0; i < rex.length; i++) {
                    this.$validator.validate(rex[i]).then(result => {});
                }
                for (var a = 0; a < this.$(".requireds").length; a++) {
                    var val = this.$(this.$(".requireds")[a]).val();
                    if (val == "" || val == "undefined") {
                        this.$toast("请完整填写必填项！");
                        return;
                    }
                }
                setTimeout(() => {
                    if (this.$validator.errors.count() <= 0) {
                        _this.ty = 3;
                    }
                }, 1);
            },
            findaccount(ty) {
                this.ty = ty;
                if (this.ty != 1) {
                    this.rooter = "/agencyappli";
                    if (this.ty == 2) {
                        this.ty = 1;
                        this.getCode();
                    }
                    if (this.ty == 3) {
                        this.ty = 2;
                    }
                } else {
                    this.rooter = "/my";
                }
            },
            //选择器
            onValuesChange(picker, values) {
                // console.log(values);
                this.chooseMainVal = values[0];
            },
            cancel() {
                this.popupVisible = false;
                this.chooseMain = "";
            },
            sure() {
                this.chooseMain = this.chooseMainVal.title;
                this.addData.bankName = this.chooseMain;
                this.popupVisible = false;
            },
            onMyAddressChange(picker, values) {
                if (myaddress[values[0]]) {
                    // console.log(values, "123456");
                    //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
                    picker.setSlotValues(1, Object.keys(myaddress[values[0]])); //  Object.keys()会返回一个数组，当前省的数组
                    picker.setSlotValues(2, myaddress[values[0]][values[1]]); //  区/县数据就是一个数组
                    this.myAddressProvince = values[0];
                    this.myAddressCity = values[1];
                    this.addData.province = values[0];
                    this.addData.city = values[1];
                    this.myAddresscounty = values[2];
                    this.middlex = this.myAddressProvince + "-" + this.myAddressCity;
                }
            },
            cancels() {
                this.popupVisibles = false;
                this.borthplace = "";
            },
            sures() {
                this.popupVisibles = false;
                this.borthplace = this.middlex;
                // console.log(this.borthplace, "this.borthplace");
            },
            gomy() {
                this.$router.push({
                    name: "my"
                });
            },
            //提交
            submit() {
                const rex = ["银行名称", "bankName", "bankAddress"];
                let _this = this;
                for (var i = 0; i < rex.length; i++) {
                    this.$validator.validate(rex[i]).then(result => {});
                }
                for (var a = 0; a < this.$(".requireds").length; a++) {
                    var val = this.$(this.$(".requireds")[a]).val();
                    if (val == "" || val == "undefined") {
                        this.$toast("请完整填写必填项！");
                        return;
                    }
                }
                setTimeout(() => {
                    if (this.$validator.errors.count() <= 0) {
                        let addData = this.addData;
                        let _this = this;
                        // console.log(addData, "addData");
                        // console.log(this.codeId, "codeId");

                        proxyAdd(
                            addData.chineseNickName,
                            addData.englishNickName,
                            addData.telephone,
                            addData.email,
                            addData.qq,
                            addData.wechat,
                            addData.remark,
                            addData.promoteSite,
                            addData.account,
                            addData.password,
                            addData.rePassword,
                            addData.idCard,
                            addData.realName,
                            addData.code,
                            addData.bankName,
                            addData.bankNum,
                            addData.province,
                            addData.city,
                            this.codeId,
                            addData.otherpromoteway
                        ).then(res=>{
                            _this.toast("添加成功")
                            _this.$router.push({
                                name: "my"
                            });
                        })


                    } else {
                        this.$toast("请完整填写必填项！");
                    }
                }, 1);
            }
        }
    };
</script>


<style lang="less" scoped>
    @import url("./index.less");
    .ficon {
        .tj {
            right: 21% !important;
        }
    }
    
    .pk-inputpro {
        .titlesr {
            padding-left: 0 !important;
        }
    }
    
    .btn {
        text-align: center;
    }
    
    .btn .btn-greens {
        width: 33%;
    }
    
    .lbtn {
        background-color: #dcdce0 !important;
        box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.12);
        margin-right: 10%;
    }
    
    .lbtns,
    .mbtns,
    .rbtns {
        width: 26% !important;
    }
    
    //popup
    .popup-title {
        height: 1.06667rem/* 80/75 */
        ;
        padding: 0 0.4rem/* 30/75 */
        ;
        font-size: 0.4rem/* 30/75 */
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
    
    .lbtns {
        background-color: #dcdce0 !important;
        box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.12);
        color: #646466 !important;
    }
    
    .rbtns {
        background-color: #dcdce0 !important;
        box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.12);
        color: #ffffff !important;
    }
    
    .mbtns {
        margin: 0 5%;
    }
    
    .input_pro inputs {
        border-bottom: none !important;
    }
    
    .input-code-img {
        width: 20%;
        height: 100%;
        background: #ccc;
        img {
            width: 100%;
            height: 100%;
        }
    }
    
    .makd {
        padding-left: .4rem/* 30/75 */
        ;
        background: #fff;
    }
    
    .pk-inputpro .input input {
        border-bottom: none;
    }
    
    .pk-inputpro .inputs:after {
        content: " ";
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 1px;
        border-bottom: 1px solid @color-c7c7cc;
        color: @color-c7c7cc;
        -webkit-transform-origin: 0 100%;
        transform-origin: 0 100%;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
    }
    
    .pk-inputpro .input input {
        padding-left: 40%;
    }
</style>

