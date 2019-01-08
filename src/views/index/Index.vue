<template>
    <div class="body">
        <side :isRight="true" :drawerWidth="w">
            <div slot="position">
                <div class="header">
                    <div class="logo"><img :src="logoimg" alt=""></div>
                    <div class="headbox">
                        <div v-show="isLogin" class="userName">{{userInfo.account}}</div>
                        <div v-show="!isLogin" class="botton">
                            <!--<div class="btns">试玩</div>-->
                            <router-link tag="div" :to="{name:'login'}" class="btns loginbtn">登录</router-link>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
                <!--redbag-->
                <Redbag v-show="bagSwitch"></Redbag>                
            </div>
            <div slot="drawer">
                <div class="sideBox">
                    <div class="sideHead pk-1px-b">
                        <div v-show="!isLogin" class="unlisted">
                            <router-link tag="div" :to="{name:'login'}" class="portrait iconfont icon-sidebar_head"></router-link>
                            <span>点击头像登录</span>
                            <router-link tag="div" :to="{name:'register'}" class="sidebtn">用户注册</router-link>
                            <!--<div class="sidebtn">点击试玩</div>-->
                        </div>
                        <div v-show="isLogin" class="loginInfo">
                            <div class="portrait iconfont icon-sidebar_head"></div>
                            <div class="sideaccount">{{userInfo.account}}</div>
                            <div class="sidebalance">{{userInfo.balance}}</div>
                        </div>
                    </div>
                    <ul class="sideNav pk-1px-b">
                        <router-link tag="li" :to="{name:'activity'}" class="iconfont icon-sidebar_huodong">活动中心</router-link>
                        <router-link tag="li" :to="{name:'purse'}" class="iconfont icon-sidebar_wallet">我的钱包</router-link>
                        <router-link tag="li" :to="{name:'my'}" class="iconfont icon-sidebar_mine">个人中心</router-link>
                        <router-link tag="li" :to="{name:'lottery'}" class="iconfont icon-sidebar_order">投注记录</router-link>
                        <router-link tag="li" :to="{name:'msgcenter'}" class="iconfont icon-sidebar_message">
                            通知消息
                            <div class="numb" v-show="count>0&&count<100">
                                {{count}}
                            </div>
                            <div class="numb" v-show="count>99">
                                99+
                            </div>
                        </router-link>
                    </ul>
                    <ul class="sideNav pk-1px-b">
                        <router-link tag="li" :to="{name:'spread'}" class="iconfont icon-sidebar_share">分享返佣</router-link>
                        <router-link tag="li" :to="{name:'contactus'}" class="iconfont icon-sidebar_kefu">联系客服</router-link>
                        <router-link tag="li" :to="{name:'settings'}" class="iconfont icon-sidebar_setting">系统设置</router-link>
                    </ul>
                    <ul class="sideNav sideBottom">
                        <div class="switch">
                            首页广告
                            <mt-switch class="switchBtn" v-model="bannerSwitch" @change="floatBanner"></mt-switch>
                        </div>
                        <div class="switch">
                            浮动红包
                            <mt-switch class="switchBtn" :disabled="disabledBag" v-model="bagSwitch" @change="floatBag"></mt-switch>
                        </div>
                    </ul>
                </div>
            </div>
            <div slot="content">


                <div class="page-loadmore">
                <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                    <pk-loadmore 
                    :top-method="loadTop" 
                    @top-status-change="handleTopChange" 
                    ref="loadmore" 
                    :stop-translate="stopTranslate"
                    >
                <div class="indexBody">
                    <div class="banner" v-show="bannerSwitch">
                        <swiper :options="swiperOption" ref="mySwiper">
                            <swiper-slide v-for="(item, index) in swiperSlides" :key="index">
                                <img :src="item.imgUrl" alt="">
                            </swiper-slide>
                             <div class="swiper-pagination" style="bottom:0.26666rem;" slot="pagination"></div>
                        </swiper>
                        <span class="close" @click="closeadv('banner')">关闭</span>
                    </div>
                    <div @click="closeadv('notice')" v-show="noticeData.length>0" class="notive">
                        <div class="icon iconfont icon-sy-tzgg"></div>
                        <marquee direction="left" align="bottom" height="25" width="100%" onmouseout="this.start()" onmouseover="this.stop()" scrollamount="4" scrolldelay="1">
                            <div class="noticeText" v-for="(noticeDatas,index) in noticeData" :key="index">{{noticeDatas.content}}</div>
                        </marquee>
                    </div>
                    <div class="recommend" @touchmove="show">
                        <div class="hottabs">
                            <mt-navbar v-model="selected">
                                <mt-tab-item @click.native="changeTab(2)" id="1">热门推荐</mt-tab-item>
                                <mt-tab-item v-show="haveHis" @click.native="changeTab(1)" id="2">最近玩过</mt-tab-item>
                            </mt-navbar>
                        </div>
                        <!-- tab-container -->
                        <mt-tab-container v-model="selected">
                            <mt-tab-container-item class="hotGame" id="1">
                                <ul>
                                    <li v-for="(gamelists,index) in hotGame" :key="index">
                                        <div @click="gamepop(gamelists.platformId,gamelists.platformName,gamelists.productName)" class="gameRegion">
                                            <div class="game-pic"><img v-lazy="cdnUrl+gamelists.iconUrl" /></div>
                                            <div class="game-text">
                                                {{gamelists.productName}}
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </mt-tab-container-item>
                            <mt-tab-container-item class="history" id="2">
                                <ul>
                                    <li v-for="(gamelists,index2) in playedList" :key="index2">
                                        <div @click="gamepop(gamelists.platformId,gamelists.platformName,gamelists.productName)" class="gameRegion">
                                            <div class="game-pic"><img v-lazy="cdnUrl+gamelists.iconUrl" /></div>
                                            <div class="game-text">
                                                {{gamelists.productName}}
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </mt-tab-container-item>
                        </mt-tab-container>
                    </div>
                    <IndexGameList v-if="gameinfo.length>0" :gameinfo="gameinfo" :cdnUrl='cdnUrl'></IndexGameList>
                    <!--<div class="copyright">-->
                    <!--<div class="copytext">copyright © 2010-2018 E-Tong Technology co,itd</div>-->
                    <!--<a class="checkpc">欢迎使用</a>-->
                    <!--</div>-->
                </div>

                </pk-loadmore>
                </div>
            </div>


            </div>
        </side>
        <Gamepop :allmoney="allmoney" :state="toast_control" :platformId="platformid" :platformName="platformname" :gameName="productname" :balances="balances" @returnState="returnState"></Gamepop>
        <!--双按钮弹窗 >>> notice-->
        <div v-show="noticePop" class="twoBtnPop">
            <div class="btnpopBox">
                <div v-show="index === noticeIndex" v-for="(notice,index) in noticeData" :key="index" class="btnpopContent">
                    <div class="tit">{{notice.title}}</div>
                    <div class="content">
                        {{notice.content}}
                        <div class="time">{{notice.createTime | filterTimeType('YYYYMMDD')}}</div>
    
                    </div>
                    <div @click="nextNotice(noticeIndex)" class="halfBtn next" v-if="modalNext">下一条</div>
                    <div @click="closeadv('notice')" class="halfBtn next" v-if="!modalNext">关闭</div>
                </div>
                <div @click="closeadv('notice')" class="halfBtn close">取消</div>
            </div>
            <div class="box-mask"></div>
        </div>
    </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import Gamepop from "./Gamepop"
    import Side from "../../components/Side"
    import Footer from "../../components/IndexFooter";
    import func from '@/api/purse'
    import Redbag from "../../components/RedBag";
    import IndexGameList from './IndexGameList'
    import pkLoadmore from '@/components/Loadmore'
    
    import {
        indexInfo,
        ratios,
        gameInto,
        getGamed
        
    } from '@/api/index'
    import notice from "@/api/my";
    
    import {
        swiper,
        swiperSlide
    } from 'vue-awesome-swiper'
    export default {
        name: 'index',
        components: {
            swiper,
            swiperSlide,
            IndexGameList,
            Gamepop,
            Side,
            Footer,
            Redbag,
            pkLoadmore
        },
        data() {
            return {
                w: 4.8 * this.HTML_FONT_SIZE,
                cdnUrl: '',
                toast_control: false,
                userInfo: [],
                login: true,
                selected: '1', //控制第一个tab切换
                tab: 2,
                swiperOption: {
                    notNextTick: true,
                    initialSlide:1,
                    autoplay: 3000,
                    loop:true,
                    autoplayDisableOnInteraction:false,
                    pagination:'.swiper-pagination',
                },
                indexData: [],
                logoimg: '',
                swiperSlides: [], //轮播列表
                noticeData: [], //公告列表
                noticePop: false,
                noticeIndex: 0,
                hotGame: [],
                playedList: [], //玩过的游戏列表
                haveHis: false,
                isLogin:sessionStorage.getItem('session'),
                menuList: [{
                        icon: "icon-tab_cunkuan",
                        name: "存款",
                        link: "deposit"
                    },
                    {
                        icon: "icon-tab_qukuan",
                        name: "提现",
                        link: "withdraw"
                    },
                    {
                        icon: "icon-tab_eduzh",
                        name: "额度转换",
                        link: "transfer"
                    },
                    {
                        icon: "icon-tab_huodong",
                        name: "活动",
                        link: "activity"
                    },
                    {
                        icon: "icon-tab_kefu",
                        name: "客服",
                        link: "contactus"
                    }
                ],
                count: "", //消息条数
                bannerSwitch: true,
                bagSwitch: false,
                disabledBag: false,
                //---额度转换
                platformid: 0,
                platformname: '',
                productname: '',
                balances: 0,
                allmoney: 0,
                //------接口修改
                indexAllData: "",
                gameinfo: [],
                modalNext: false,

                stopTranslate: parseInt(this.HTML_FONT_SIZE * 3),
                topStatus: '',
                wrapperHeight: 0,


            }
        },
        computed: {
            Swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        mounted() {
            // if(localStorage.getItem('indexData')){
            //     this.dealWithData(JSON.parse(localStorage.getItem('indexData')));
            // }else {
            //     this.infoData();
            // }
            this.infoData();
            this.hasmsgNum();
            this.historyGame();
            this.$nextTick(()=>{
                this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
            })
        },
        methods: {
            show(event) {
                // 阻止冒泡
                event.stopPropagation();
                // 阻止默认事件
                // event.preventDefault();
            },
            closeadv(item) {
                if (item == 'banner') {
                    this.bannerSwitch = false;
                    sessionStorage.setItem('banner',0);//点击轮播图关闭
                }
                if (item == 'notice') {
                    this.noticePop = !this.noticePop
                    if (this.noticePop) {
                        if (this.noticeData.length > 1) {
                            this.modalNext = true;
                        }
                    }
                    this.noticeIndex = 0
                }
            },
            nextNotice(index) {
                if (this.noticeData.length - 2 == index) {
                    this.modalNext = false;
                }
                this.noticeIndex = index + 1;
            },
            //tab切换
            changeTab(type) {
                this.tab = type;
            },
            infoData() { //logo-轮播
                indexInfo().then(res => {
                    this.dealWithData(res);
                    localStorage.setItem('nodeTitle',res.title);
                    document.title = res.title;
                    // localStorage.setItem("indexData",JSON.stringify(res));
                }).catch(err => {
                    this.$toast({
                        message: err,
                        duration: 2000
                    });
                })
                

                
            },
            dealWithData(res){
                console.log('===',res)
                this.cdnUrl = res.cdn + "/";
                this.gameinfo = res.gameInfo;
                console.log(this.gameinfo)
                this.indexAllData = res;
                this.swiperSlides = this.indexAllData.flash;

                

                // console.log(this.Swiper)
                // console.log(this.swiperSlides.length)
                if(this.swiperSlides.length<=1){
                    this.Swiper.stopAutoplay();
                    this.Swiper.disableTouchControl();
                }
                this.logoimg = this.indexAllData.logoUrl;
                this.noticeData = this.indexAllData.notice;
                if (this.noticeData.length > 1) {
                    this.modalNext = true;
                }
                this.hotGame = this.indexAllData.hotGame;
                // console.log(this.indexAllData)
                if(!this.indexAllData.red){
                    this.disabledBag = true;
                    this.bagSwitch = false;
                }else {
                    this.disabledBag = false;
                    this.bagSwitch = true
                }
                if(sessionStorage.getItem('bag') == 0){
                    this.bagSwitch = false;
                    sessionStorage.setItem('bag',0);
                }else {
                    sessionStorage.setItem('bag',this.bagSwitch?1:0);
                }

                if(sessionStorage.getItem('banner') == 0){
                    this.bannerSwitch = false;
                    sessionStorage.setItem('banner',0);//点击轮播图关闭
                }else {
                    this.bannerSwitch = true;
                    sessionStorage.setItem('banner',1);
                    this.Swiper.startAutoplay();
                }
            },
            historyGame() {
                if (this.isLogin) {
                    getGamed().then(res => {
                        console.log(res,'玩过的游戏')
                        if (res.game.length === 0) {
                            this.haveHis = false
                        } else {
                            this.haveHis = true;
                            this.playedList = res.game;
                        }
                    }).catch(err => {
                        this.$toast({
                            message: err,
                            duration: 2000
                        });
                    })
                }
            },
            returnState(state) {
                this.toast_control = state;
            },
            //获取消息未读数和个人资料
            hasmsgNum() {
                if (this.isLogin) {
                    notice.getMemberCenter().then((res) => {
                        this.count = res.unread.count;
                        this.userInfo = res.info
                    }).catch(err => {
                        this.$toast({
                            message: err,
                            duration: 2000
                        });
                    });
                }
            },
            gamepop(a, b, c) {
                if (this.isLogin) {
                    this.ratio(a, b);
                    this.platformid = a;
                    this.platformname = b;
                    this.productname = c;
                } else {
                    this.$router.push("/login");
                }
            },
            getSelectData() {
                if (this.isLogin) {
                    func.getWalletInfo().then(res => {
                        let list = res.walletCenterResp;
                        this.allmoney = list.balance;
                        for (var i in list.gameBalance) {
                            if (list.gameBalance[i].id === this.platformid) {
                                this.balances = list.gameBalance[i].balance
                            }
                        }
                    }).catch(err => {
                        this.$toast({
                            message: err,
                            duration: 2000
                        });
                    })
                }
            },
            ratio(id, name) {
                ratios(id, name).then((res) => {
                    if (res.remark == '') {
                        this.getSelectData();
                        this.toast_control = true
                    } else {
                        this.intoGame()
                    }
                }).catch((err) => {
                    this.transErr(err)
                });
            },
            intoGame() {
                gameInto(this.platformname, this.platformid).then((res) => {
                    window.open(res.loginUrl, '_blank', 'toolbar=yes, width=1300, height=900')
                }).catch((err) => {
                    this.$toast({
                        message: err,
                        duration: 2000
                    });
                });
            },
            //快捷转入失败
            transErr(err) {
                this.$messagebox({
                    title: ' ',
                    message: err,
                    showCancelButton: true,
                    confirmButtonText: "继续",
                    cancelButtonText: "否"
                }).then(action => {
                    if (action == 'confirm') {
                        this.intoGame()
                    } else {
                        this.getSelectData();
                        this.toast_control = true
                    }
                })
            },
            floatBag(){//红包显示隐藏
                sessionStorage.setItem('bag',this.bagSwitch?1:0);
            },
            floatBanner(){
                if(this.bannerSwitch){//点击侧边栏首页广告 switch 重新开始banner自动播放
                    this.Swiper.startAutoplay();
                }
                sessionStorage.setItem('banner',this.bannerSwitch?1:0);//点击轮播图关闭
            },
            //下拉刷新
            handleTopChange(status) {
                this.topStatus = status;
            },
            loadTop() {
                setTimeout(() => {
                    this.infoData();
                    this.$refs.loadmore.onTopLoaded();
                }, 1500);
            },
        }
    
    }
</script>

<style lang="less" scoped>
    @import url("./index.less");
    .body {
        .header {
            z-index: 9;
            position: fixed;
            top: 0;
            width: 100%;
            height: 1.22667rem;
            background-image: -webkit-gradient(linear, left top, left bottom, from(#252232), to(#252232)), -webkit-gradient(linear, left top, left bottom, from(#333333), to(#595959)), -webkit-gradient(linear, left top, left bottom, from(#f6f7fd), to(#f6f7fd));
            background-image: linear-gradient(#252232, #252232), linear-gradient(180deg, #333333 0%, #595959 100%), linear-gradient(#f6f7fd, #f6f7fd);
            .logo {
                position: absolute;
                top: 50%;
                left: 0.4rem;
                transform: translateY(-50%);
                height: 0.72rem;
                img {
                    height: 100%;
                }
            }
            .headbox {
                position: absolute;
                right: 1.22667rem;
                height: 1.22667rem;
                .userName {
                    line-height: 1.22667rem;
                    font-size: 0.373rem;
                    color: @color-green;
                }
                .botton {
                    padding-top: 0.293335rem;
                    font-size: 0.373rem;
                    .btns {
                        display: inline-block;
                        margin-right: 0.2rem;
                        width: 1.28rem;
                        height: 0.64rem;
                        text-align: center;
                        line-height: 0.64rem;
                        border: 1px solid @color-green;
                        color: @color-green;
                        border-radius: 0.133rem;
                    }
                    .loginbtn {
                        color: @color-252232;
                        background-color: @color-green;
                    }
                }
            }
        }
    }
</style>

