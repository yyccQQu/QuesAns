<template>
    <div class="my">
        <Header :showBack="true" :showRight="true" title="我的"></Header>
        <div class="person-info clearfix">
            <div class="left iconfont icon-sidebar_head"></div>
            <div class="center">
                <h2>{{account}}</h2>
                <p v-show="isShowMoney">{{balance}}</p>
                <mt-spinner v-show="!isShowMoney" type="fading-circle" color="#00d897" :size="size"></mt-spinner>
    
            </div>
            <div class="right">
                <a @click="refush()">
                    <i class="iconfont icon-wallet-refresh"></i>
                    <span>刷新余额</span>
                </a>
            </div>
        </div>
        <div class="menu-list">
            <ul>
                <li>
                    <div class="left">
                        <i class="iconfont icon-wd-ziliao"></i>
                    </div>
                    <router-link to="/about" tag="div" class="right pk-1px-b">
                        <span>个人资料</span>
                        <i class="iconfont icon-list-more"></i>
                    </router-link>
                </li>
                <li>
                    <div class="left">
                        <i class="iconfont icon-wd-password"></i>
                    </div>
                    <router-link to="/password" tag="div" class="right pk-1px-b">
                        <span>密码管理</span>
                        <i class="iconfont icon-list-more"></i>
                    </router-link>
                </li>
                <li>
                    <div class="left">
                        <i class="iconfont icon-wd-bank"></i>
                    </div>
                    <router-link to="/bankCard" tag="div" class="right pk-1px-b">
                        <span>银行卡管理</span>
                        <i class="iconfont icon-list-more"></i>
                    </router-link>
                </li>
                <li>
                    <div class="left">
                        <i class="iconfont icon-wd-info"></i>
                    </div>
                    <router-link to="/msgcenter" tag="div" class="right pk-1px-b">
                        <span>消息中心</span>
                        <div class="spas" v-show="count>0&&count<10">
                            {{count}}
                        </div>
                        <div class="spana" v-show="count>10&&count<100">
                            {{count}}
                        </div>
                        <div class="spanas" v-show="count>99">
                            99+
                        </div>
                        <i class="iconfont icon-list-more"></i>
                    </router-link>
                </li>
            </ul>
            <ul>
                <router-link tag="li" :to="{name:'spread'}" v-show="isShow.isSpread">
                    <div class="left">
                        <i class="iconfont icon-wd-tuiguang"></i>
                    </div>
                    <div class="right pk-1px-b">
                        <span>我要推广</span>
                        <i class="iconfont icon-list-more"></i>
                    </div>
                </router-link>
                <router-link tag="li" :to="{name:'agencyappli'}" v-show="isShow.isAgencyReg">
                    <div class="left">
                        <i class="iconfont icon-wd-daili"></i>
                    </div>
                    <div class="right pk-1px-b">
                        <span>代理申请</span>
                        <i class="iconfont icon-list-more"></i>
                    </div>
                </router-link>
                <router-link tag="li" :to="{name:'selfHelp'}" v-show="isShow.isOfferSelf">
                    <div class="left">
                        <i class="iconfont icon-wd-youhui"></i>
                    </div>
                    <div class="right pk-1px-b">
                        <span>自助优惠申请</span>
                        <i class="iconfont icon-list-more"></i>
                    </div>
                </router-link>
            </ul>
            <ul>
                <!-- 暂时隐藏 -->
                <!-- <li>
                                    <div class="left">
                                        <i class="iconfont icon-wd-yuyan"></i>
                                    </div>
                                    <div class="right pk-1px-b">
                                        <span>选择语言</span>
                                        <i class="iconfont icon-list-more"></i>
                                    </div>
                                </li> -->
                <router-link tag="li" :to="{name:'contactus'}">
                    <div class="left">
                        <i class="iconfont icon-wd-lianxi"></i>
                    </div>
                    <div class="right pk-1px-b">
                        <span>联系我们</span>
                        <i class="iconfont icon-list-more"></i>
                    </div>
                </router-link>
                <!-- 暂时隐藏 -->
                <!-- <li>
                                    <div class="left">
                                        <i class="iconfont icon-wd-banben"></i>
                                    </div>
                                    <div class="right pk-1px-b">
                                        <span>版本检测</span>
                                        <i class="iconfont icon-list-more"></i>
                                    </div>
                                </li> -->
                <router-link tag="li" :to="{name:'more'}">
                    <div class="left">
                        <i class="iconfont icon-wd-gdinfo"></i>
                    </div>
                    <div class="right">
                        <span>更多</span>
                        <i class="iconfont icon-list-more"></i>
                    </div>
                </router-link>
            </ul>
            <ul>
                <li v-show="isLogin" @click="loginOut">
                    <div class="left">
                        <i class="iconfont icon-wd-out"></i>
                    </div>
                    <div class="right">
                        <span>退出登录</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Header from "@/components/Header.vue";
    import func from "@/api/my";
    
    export default {
        name: "my",
        components: {
            Header
        },
        data() {
            return {
                isShowMoney: true,
                size: parseInt(this.HTML_FONT_SIZE * 0.4),
                account: "", //账号
                balance: 0, //余额
                isShow: {},
                count: "",
                isLogin:sessionStorage.getItem("session")?true:false
            };
        },
        created() {
            this.getMemberCenterInfo();
        },
        methods: {
            getMemberCenterInfo(t) {
                func.getMemberCenter().then((res) => {
                    this.count = res.unread.count ? res.unread.count:'';
                    this.account = res.info.account;
                    sessionStorage.setItem('account',this.account);
                    this.balance = res.info.balance ? res.info.balance : 0;
                    this.isShow = res.switch;
                    this.isShowMoney = true;
                    if (t) {
                        this.$toast({
                            message: "刷新成功",
                            duration: 2000
                        });
                    }
                }).catch(err => {
                    this.$toast({
                        message: err,
                        duration: 2000
                    });
                });
            },
            //刷新
            refush() {
                this.isShowMoney = false;
                this.getMemberCenterInfo(1);
            },
            loginOut() {
                this.$messagebox({
                    title: ' ',
                    message: '确认退出登录?',
                    showCancelButton: true,
                    confirmButtonText: "确定",
                    cancelButtonText: "取消"
                }).then(action => {
                    if(action == 'confirm'){
                        func.postLoginOut()
                            .then(res => {
                                sessionStorage.removeItem("session");
                                this.$router.push({
                                    name: "login"
                                });
                            })
                            .catch(err => {
                                this.$toast({
                                    message: err,
                                    duration: 2000
                                });
                            });
                    }
                })
            },
    
        }
    };
</script>

<style lang="less" scoped>
    @import url("../../components/less/common.less");
    .icon-wd-ziliao {
        color: @color-00cc8f;
    }
    
    .icon-wd-password {
        color: #50aae5;
    }
    
    .icon-wd-bank {
        color: #5a6fb0;
    }
    
    .icon-wd-info {
        color: #f19938;
    }
    
    .icon-wd-tuiguang {
        color: #eb445a;
    }
    
    .icon-wd-youhui {
        color: #ec572e;
    }
    
    .icon-wd-daili {
        color: #8678c6;
    }
    
    .icon-wd-yuyan {
        color: #a3629e;
    }
    
    .icon-wd-lianxi {
        color: #a58bb9;
    }
    
    .icon-wd-banben {
        color: #da70a0;
    }
    
    .icon-wd-gdinfo {
        color: #1b4797;
    }
    
    .icon-wd-out {
        color: #94cac8;
    }
    
    .spas,
    .spana,
    .spanas {
        width: 0.58667rem/* 44/75 */
        ;
        height: 0.37333rem/* 28/75 */
        ;
        border-radius: 0.4rem/* 30/75 */
        ;
        font-size: 0.26667rem/* 20/75 */
        ;
        line-height: 0.37333rem/* 28/75 */
        ;
        text-align: center;
        color: #fff;
        background: #ff0000;
        position: absolute;
        right: 13%;
        top: 34%;
        padding: 0 0.04rem/* 3/75 */
        ;
    }
    
    .spanas {
        width: 0.8rem/* 60/75 */
        ;
    }
    
    .spas {
        width: 0.37333rem/* 28/75 */
        ;
    }
    
    .my {
        padding-top: 1.22667rem/* 92/75 */
        ;
        padding-bottom: 1.30667rem/* 98/75 */
        ;
    }
    
    .person-info {
        background: #252232 url("../../assets/img/headbg.png") center 30px no-repeat;
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
                    font-size: 0.32rem/* 24/75 */
                    ;
                }
                .iconfont {
                    font-size: 0.32rem/* 24/75 */
                    ;
                    font-family: "iconfont" !important;
                    font-style: normal;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }
            }
        }
    }
    
    .menu-list {
        margin-top: 0.26667rem/* 20/75 */
        ;
        padding-bottom: 0.53333rem/* 40/75 */
        ;
        ul {
            li {
                background-color: #fff;
                display: flex;
                &:active {
                    background: rgba(162, 100, 85, 0.2);
                }
                .left {
                    flex: 1;
                    padding: 0.27rem 0.4rem/* 30/75 */
                    ;
                    .iconfont {
                        font-size: 0.53333rem/* 40/75 */
                        ;
                        display: block;
                    }
                }
                .right {
                    color: @color-323233;
                    flex: 10;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-right: 0.4rem/* 30/75 */
                    ;
                    font-size: 0.42667rem/* 32/75 */
                    ;
                    .iconfont {
                        font-size: 0.32rem/* 24/75 */
                        ;
                        color: @color-818181;
                    }
                    .has-msg {
                        position: relative;
                        &::before {
                            content: "";
                            display: block;
                            position: absolute;
                            width: 0.18667rem/* 14/75 */
                            ;
                            height: 0.18667rem/* 14/75 */
                            ;
                            background-color: @color-red;
                            right: 0.45333rem/* 34/75 */
                            ;
                            border-radius: 50%;
                            top: 50%;
                            margin-top: -0.09333rem/* 7/75 */
                            ;
                        }
                    }
                }
                &:last-child {
                    .right {
                        border-bottom: none;
                    }
                }
            }
            &:nth-child(n+1) {
                margin-top: 0.26667rem/* 20/75 */
                ;
            }
        }
    }
</style>


