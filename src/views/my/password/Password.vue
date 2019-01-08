
<template>
    <div id="passwordmge">
        <F-header :title="title" :rooter="rooter" :hasNoBack="hasNoBack"></F-header>
        <div class="hasbox"></div>
        <mt-popup :closeOnClickModal="true" :position="'bottom'" v-model="popupVisible" style="width: 100%;z-index: 2003;">
            <div class="popup-title pk-1px-b">
                <span @click="cancel()">取消</span>
                <span></span>
                <span @click="sure()">确定</span>
            </div>
            <mt-picker :itemHeight="itemHeight" :slots="mainType" @change="onValuesChange"></mt-picker>
        </mt-popup>
        <div class="hasmenu">
            <mt-navbar v-model="indexx">
                <mt-tab-item id="1">登录密码</mt-tab-item>
                <mt-tab-item id="2">取款密码</mt-tab-item>
                <mt-tab-item id="3">视讯密码</mt-tab-item>
            </mt-navbar>
            <!-- tab-container -->
            <mt-tab-container v-model="indexx">
                <mt-tab-container-item id="1">
    
                    <div class="contenerf">
                        <div class="content">
                            <div class="pk-input pk-inputpro">
                                <label class="title muster fs-14">原密码</label>
                                <div class="input fs-12 input_pro" style="border-bottom: 1px solid #fff;">
                                    <input name="oldPwd" autocomplete="off" v-model="oldLoginPwd" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('oldPwd') }" type="password" placeholder="请输入您的原登录密码">
                                    <i type="clear" v-show="errors.has('oldPwd')" class="fs-15 iconfont icon-czsb tj"></i>
                                </div>
                            </div>
                            <div class="pk-input pk-inputpro">
                                <label class="title muster fs-14">新密码</label>
                                <div class="input fs-12 input_pro">
                                    <input type="password" name="newPwd" autocomplete="off" v-model="newLoginPsd" v-validate="'required|pwd|max:12|min:5'" :class="{'input': true, 'is-danger': errors.has('newPwd') }" placeholder="请输入您的新登录密码">
                                    <i type="clear" v-show="errors.has('newPwd')" class="fs-15 iconfont icon-czsb tj"></i>
                                </div>
                            </div>
                            <div class="pk-input pk-inputpro">
                                <label class="title muster fs-14">确认密码</label>
                                <div class="input fs-12 input_pro" style="border-bottom: 1px solid transparent!important;">
                                    <input class="no-bod-bot" name="confirmPassword" type="password" autocomplete="off" v-model="reNewLoginPsd" v-validate="{'required': 'true', 'is': newLoginPsd}" :class="{'input': true, 'is-danger': errors.has('confirmPassword') }" placeholder="请再次输入您的新登录密码">
                                    <i type="clear" v-show="errors.has('confirmPassword')" class="fs-15 iconfont icon-czsb tj"></i>
                                </div>
                            </div>
                        </div>
                        <div class="else">
                            <div class="divs">
                                <p v-show="errors.has('oldPwd')" class="errs help fds-12 is-danger">{{ errors.first('oldPwd') }}</p>
                                <p v-show="!errors.has('oldPwd') && errors.has('newPwd')" class="errs help fds-12 is-danger">{{ errors.first('newPwd') }}</p>
                                <p v-show="!errors.has('oldPwd') && !errors.has('newPwd') && errors.has('confirmPassword')" class="errs help fds-12 is-danger">{{ errors.first('confirmPassword') }}</p>
                                <p class="errs" v-show="!errors.has('oldPwd') && !errors.has('newPwd')  && !errors.has('confirmPassword')">密码长度6-20位，必须包含数字和英文，区分大小写，不可使用符号。</p>
                            </div>
                            <div class="btn">
                                <mt-button class="btn-green" type="primary" @click.native="changeLoginPwd">确认</mt-button>
                            </div>
                        </div>
                    </div>
    
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
    
                    <div class="contenerf">
                        <div class="content">
                            <div class="pk-input pk-inputpro">
                                <label class="title muster fs-14">登录密码</label>
                                <div class="input fs-12 input_pro" style="border-bottom: 1px solid #fff;">
                                    <input name="loginPwd" autocomplete="off" v-model="oldTake" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('loginPwd') }" type="password" placeholder="请输入您的登录密码">
                                    <i type="clear" v-show="errors.has('loginPwd')" class="fs-15 iconfont icon-czsb tj"></i>
                                </div>
                            </div>
    
                            <div class="pk-input pk-inputpro">
                                <label class="title muster fs-14">取款密码</label>
                                <div class="input fs-12 input_pro">
                                    <input type="password" name="outPwd" autocomplete="off" v-model="newTake" v-validate="'required|numeric|max:20|min:6'" :class="{'input': true, 'is-danger': errors.has('outPwd') }" placeholder="请输入您的取款密码">
                                    <i type="clear" v-show="errors.has('outPwd')" class="fs-15 iconfont icon-czsb tj"></i>
                                </div>
                            </div>
    
                            <div class="pk-input pk-inputpro">
                                <label class="title muster fs-14">确认密码</label>
                                <div class="input fs-12 input_pro" style="border-bottom: 1px solid transparent!important;">
                                    <input name="confirmOutPwd" class="no-bod-bot" autocomplete="off" v-model="reTake" v-validate="{'required': 'true', 'is': newTake}" :class="{'input': true, 'is-danger': errors.has('confirmOutPwd') }" type="password" placeholder="请再次输入您的取款密码">
                                    <i type="clear" v-show="errors.has('confirmOutPwd')" class="fs-15 iconfont icon-czsb tj"></i>
                                </div>
                            </div>
                        </div>
                        <div class="else">
                            <div class="divs">
                                <p v-show="errors.has('loginPwd')" class="errs help fds-12 is-danger">{{ errors.first('loginPwd') }}</p>
                                <p v-show="!errors.has('loginPwd') && errors.has('outPwd')" class="errs help fds-12 is-danger">{{ errors.first('outPwd') }}</p>
                                <p v-show="!errors.has('loginPwd') && !errors.has('outPwd') && errors.has('confirmOutPwd')" class="errs help fds-12 is-danger">{{ errors.first('confirmOutPwd') }}</p>
                                <p class="errs" v-show="!errors.has('loginPwd') && !errors.has('outPwd')  && !errors.has('confirmOutPwd')">取款密码为六位数字</p>
                            </div>
    
                            <div class="btn">
                                <mt-button class="btn-green" type="primary" @click.native="changeTakePwd">确认</mt-button>
                            </div>
                        </div>
                    </div>
    
                </mt-tab-container-item>
                <mt-tab-container-item id="3">
    
                    <div class="contenerf">
                        <div class="mask"></div>
                        <div class="content">
                            <div class="pk-input pk-inputpro ">
                                <label class="title muster fs-14">视讯</label>
                                <div class="input fs-12 input_pro">
                                    <input @click="popupVisible = true" v-model="chooseMain" type="text" placeholder="请选择视讯">
                                    <i class="fs-15 iconfont icon-jt-y tj color-84"></i>
                                </div>
                            </div>
                            <div class="pk-input pk-inputpro">
                                <label class="title muster fs-14">登录密码</label>
                                <div class="input fs-12 input_pro" style="border-bottom: 1px solid #fff;">
                                    <input name="loginPwd" class="relative" autocomplete="off" v-model="oldGame" v-validate="'required|numeric'" :class="{'input': true, 'is-danger': errors.has('loginPwd') }" type="text" placeholder="请输入您的登录密码">
                                    <i type="clear" v-show="errors.has('loginPwd')" class="fs-15 iconfont icon-czsb tj"></i>
                                </div>
                            </div>
    
                            <div class="pk-input pk-inputpro">
                                <label class="title muster fs-14">视讯密码</label>
                                <div class="input fs-12 input_pro">
                                    <input type="text" name="sxPwd" autocomplete="off" v-model="newGame" v-validate="'required|alpha_num|max:20|min:6'" :class="{'input': true, 'is-danger': errors.has('sxPwd') }" placeholder="请输入您的视讯密码">
                                    <i type="clear" v-show="errors.has('sxPwd')" class="fs-15 iconfont icon-czsb tj"></i>
                                </div>
                            </div>
    
                            <div class="pk-input pk-inputpro">
                                <label class="title muster fs-14">确认密码</label>
                                <div class="input fs-12 input_pro" style="border-bottom: 1px solid transparent!important;">
                                    <input name="outPwd" class="no-bod-bot" autocomplete="off" v-model="reGame" v-validate="'required|alpha_num|max:12|min:5'" :class="{'input': true, 'is-danger': errors.has('outPwd') }" type="text" placeholder="请在此输入您的取款密码">
                                    <i type="clear" v-show="errors.has('outPwd')" class="fs-15 iconfont icon-czsb tj"></i>
                                </div>
                            </div>
                        </div>
                        <div class="else">
                            <div class="divs">
                                <p class="errs">密码长度20位，可以使用字母数字，特殊字符，区分大小写</p>
                            </div>
                            <div class="btn">
                                <button class="btn-green" type="primary">确认</button>
                            </div>
                        </div>
                    </div>
    
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
    </div>
</template>


<script>
    import FHeader from "../../../components/Header";
    // import password from "@/proto/member_info_pb";
    // const password = proto.pb;
    import {
        changePwdFunc
    } from '@/api/my';
    
    import {
        Button,
        Navbar,
        TabItem
    } from "mint-ui";
    
    
    export default {
        components: {
            Button,
            FHeader,
            Navbar,
            TabItem
        },
        data() {
            return {
                popupVisible: false,
                itemHeight: 36,
                chooseMain: "",
                chooseMainVal: "",
                iNow: 0,
                mainType: [{
                    flex: 1,
                    values: ["视讯", "AG彩票", "BG彩票", "CG彩票", "DG彩票", "EG彩票"],
                    className: "mainType",
                    textAlign: "center"
                }],
                rooter: "-1",
                oldLoginPwd: "",
                newLoginPsd: "",
                reNewLoginPsd: "",
    
                oldTake: "",
                newTake: "",
                reTake: "",
                oldGame: "",
                newGame: "",
                reGame: "",
                code: "",
                title: "密码管理",
                hasNoBack: true,
                index01: 0,
                index: 0,
                indexx: "1"
            };
        },
        watch: {
            indexx() {
                this.$validator.errors.clear();
                this.oldLoginPwd = "";
                this.newLoginPsd = "";
                this.reNewLoginPsd = "";
                this.oldTake = "";
                this.newTake = "";
                this.reTake = "";
                const rex = ['oldPwd', 'newPwd', 'confirmPassword', 'loginPwd', 'outPwd', 'confirmOutPwd'];
                this.$validator.errors.clear();
                //   this.$validator.errors.remove();
                // // this.$validator.clean();
                // for (var i = 0; i < rex.length; i++) {
                //     this.$validator.errors.remove(rex[i]);
                // }
                // this.$validator.resetForm();
                // this.$validator.detach('newPwd');
                // this.$validator.detach('confirmPassword');
            }
        },
        mounted() {
            this.content();
            this.itemHeight = parseInt(this.HTML_FONT_SIZE * 1.06667);
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                if (from.name === "withdraw") {
                    vm.indexx = "2";
                }
            });
        },
        methods: {
            content() {
                //头部样式部分
                var child = this.$(".hasmenu .mint-tab-item-label").css({
                    "font-size": "0.42667rem",
                    "margin-top": ".4rem"
                });
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
                this.chooseMain = this.chooseMainVal;
                this.popupVisible = false;
            },
            //------修改密码
            changeLoginPwd() {
                const rex = ['oldPwd', 'newPwd', 'confirmPassword'];
                let _this = this;
                let num = 0;
                for (var i = 0; i < rex.length; i++) {
                    this.$validator.validate(rex[i]).then(result => {
                        if (result) {
                            num++
                        }
                    });
                }
                setTimeout(() => {
                    if (num >= 3) {
                        changePwdFunc(1, this.oldLoginPwd, this.newLoginPsd, this.reNewLoginPsd).then(res => {
                            this.$toast({
                                message: "修改成功",
                                duration: 1000
                            });
                        }).catch(err => {
                            this.$toast({
                                message: err,
                                duration: 2000
                            });
                        });
                    }
                }, 1);
            },
            changeTakePwd() {
                const rex = ['loginPwd', 'outPwd', 'confirmOutPwd'];
                let _this = this;
                let num = 0;
                for (var i = 0; i < rex.length; i++) {
                    this.$validator.validate(rex[i]).then(result => {
                        if (result) {
                            num++
                        }
                    });
                }
                setTimeout(() => {
                    if (num >= 3) {
                        changePwdFunc(2, this.oldTake, this.newTake, this.reTake).then(res => {
                            this.$toast({
                                message: "修改成功",
                                duration: 1000
                            });
                        }).catch(err => {
                            this.$toast({
                                message: err,
                                duration: 2000
                            });
                        });
                    }
                }, 1);
            }
        }
    };
</script>

<style lang="less" scoped>
    @import url("../../../components/less/common.less");
    @import url("./index.less");
</style>
