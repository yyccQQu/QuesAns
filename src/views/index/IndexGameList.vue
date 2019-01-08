<template>
    <div class="indexGame">
        <div class="nav-wrap">
            <mt-navbar class="navList" v-model="selected">
                <mt-tab-item @click.native="tabFirst(index)" v-for="(gameLists, index) in gameTitle" :id="index" :key="index">{{gameLists.title}}</mt-tab-item>
            </mt-navbar>
            <router-link :to="{name:'games'}" tag="div" class="gameRouter iconfont icon-sy_gamemore"></router-link>
        </div>

        <mt-tab-container class="gameBox" v-model="selected">
            
            <!--no side item.id = 3视讯 5体育-->
            <mt-tab-container-item class="noside" v-if="item.id === 3 || item.id === 5" v-for="(item, index) in gameList" :id="index" :key="index">
                <ul class="clearfix">
                    <li class="layout" v-for="(item,index) in item.platformNameList" :key="index">
                        <div v-for="(gameName, index) in item.productList" :key="index" @click="gamepop(item.platformId,item.platformName,item.productName,item.isWh)" class="gameRegion">
                            <div class="gamePic">
                                <div class="maintain" v-show="item.isWh">
                                    <span>正在<br>维护</span>
                                </div>
                                <img v-lazy="cdnUrlS+gameName.iconUrl" />
                            </div>
                            <span class="text-dots">{{gameName.productName}}</span>
                        </div>
                    </li>
                    <div v-if="item.platformNameList.length === 0" class="no-data">
                        <div class="no-data-img iconfont icon-list-zanwusj"></div>
                        <p class="no-data-text">暂无数据~</p>
                    </div>
                </ul>
            </mt-tab-container-item>



            <!--电子-->
            <mt-tab-container-item class="noside" v-if="item.id === 2" v-for="(item, index) in gameList" :id="index" :key="index">
                <ul class="clearfix">
                    <router-link tag="li" :to="{name:'games',query: {firstIndex:1,secondIndex:index}}" class="layout" v-for="(item2,index) in item.platformNameList" :key="index">
                        <div v-for="(gameName, index) in item2.productList" :key="index" class="gameRegion">
                            <div class="gamePic">
                                <div class="maintain" v-show="item.isWh">
                                    <span>正在<br>维护</span>
                                </div>
                                <img v-lazy="cdnUrlS+gameName.iconUrl" />
                            </div>
                            <span class="text-dots">{{gameName.productName}}</span>
                        </div>
                    </router-link>
                    <div v-if="item.platformNameList.length === 0" class="no-data">
                        <div class="no-data-img iconfont icon-list-zanwusj"></div>
                        <p class="no-data-text">暂无数据~</p>
                    </div>
                </ul>
            </mt-tab-container-item>



            <!--side 1=彩票 4=棋牌-->
            <mt-tab-container-item class="haveside" v-if="item.id === 1 || item.id === 4" v-for="(item, index) in gameList" :id="index" :key="index">
                <div class="sideScroll">
                    <ul class="page-part">
                        <li @click="tabSecond(index2,item.platformNameList)" :class='{"active":tabSecondIndex === index2}' v-for="(sideList, index2) in item.platformNameList" :id="index2" :key="index2">
                            <span v-for="(gameName, index) in sideList.productList" :key="index">{{gameName.productName}}</span>
                        </li>
                    </ul>
                </div>
                <!-- tab-container -->
                <div v-show="tabSecondIndex === index " class="right" v-for="(sideGame, index) in item.platformNameList" :id="index" :key="index">
                    <ul class="clearfix">
                        <li v-if="sideGame.typeId != 4" class="layout" v-for="(minGame,index) in sideGame.fcGame" :key="index">
                            <div v-for="(gameName, index) in sideGame.productList" :key="index" @click="gamepop(sideGame.platformId,sideGame.platformName,gameName.productName,sideGame.isWh)" class="gameRegion">
                                <div class="gamePic">
                                    <div class="maintain" v-show="sideGame.isWh">
                                        <span>正在<br>维护</span>
                                    </div>
                                    <img v-lazy="cdnUrlS+minGame.iconUrl" />
                                </div>
                                <span v-if="sideGame.typeId == 1" class="text-dots">{{minGame.fcName}}</span>
                                <span v-else-if="sideGame.typeId == 4" class="text-dots">{{minGame.productName}}</span>
                            </div>
                        </li>
                        <li v-if="sideGame.typeId === 4" class="layout" v-for="(minGame,index) in sideGame.eGame" :key="index">
                            <div v-for="(gameName, index) in sideGame.productList" :key="index" @click="gamepop(sideGame.platformId,sideGame.platformName,gameName.productName,sideGame.isWh)" class="gameRegion">
                                <div class="gamePic">
                                    <div class="maintain" v-show="sideGame.isWh">
                                        <span>正在<br>维护</span>
                                    </div>
                                    <img v-lazy="cdnUrlS+minGame.image" />
                                </div>
                                <span v-if="sideGame.typeId == 1" class="text-dots">{{minGame.fcName}}</span>
                                <span v-else-if="sideGame.typeId == 4" class="text-dots">{{minGame.name}}</span>
                            </div>
                        </li>
                        <div v-if="sideGame.fcGame.length === 0 && sideGame.eGame.length === 0" class="no-data">
                            <div class="no-data-img iconfont icon-list-zanwusj"></div>
                            <p class="no-data-text">暂无数据~</p>
                        </div>
                    </ul>
                </div>

            </mt-tab-container-item>
        </mt-tab-container>
        <Gamepop :allmoney="allmoney" :state="toast_control" :platformId="platformId" :platformName="platformName" :gameName="productName" :balances="balances" @returnState="returnState"></Gamepop>

    </div>
</template>

<script>
    import Gamepop from "./Gamepop";
    import func from "@/api/purse";
    import { indexInfo,ratios,gameInto } from "@/api/index";
    export default {
        props:['gameinfo','cdnUrl'],
        components: {
            Gamepop
        },
        data(){
            return {
                gameTitle: [],
                gameList:[],
                selected: 0,
                tabSecondIndex:0,

                //-----额度转换
                platformId: 0,
                platformName: "",
                productName: "",
                balances: 0,
                haveSide: false,
                allmoney: 0,
                isLogin: sessionStorage.getItem("session"),
                toast_control: false,


            }
        },
        created(){
            this.cdnUrlS = this.cdnUrl;
            this.gameList = this.gameinfo;
            this.showTitle();
        },
        methods:{
            showTitle() {
                let title = "";
                this.gameTitle = [];
                for (let i in this.gameList) {
                    switch (this.gameList[i].id) {
                        case 1:
                            title = "彩票";
                            break;
                        case 2:
                            title = "电子";
                            break;
                        case 3:
                            title = "视讯";
                            break;
                        case 4:
                            title = "棋牌";
                            break;
                        case 5:
                            title = "体育";
                            break;
                    }
                    this.gameTitle.push({
                        id: this.gameList[i].id,
                        title: title
                    });
                }
            },
            tabFirst(index){
                //一级切换时将彩票和棋牌的二级切换设置为第一项
                this.tabSecondIndex = 0;
            },
            tabSecond(index){
                this.tabSecondIndex = index;
            },
            gamepop(a, b, c, isWh) {
                if (this.isLogin && isWh != 1) {
                    this.ratio(a, b);
                    this.platformId = a;
                    this.platformName = b;
                    this.productName = c;
                } else if (isWh == 1) {
                    this.$toast({
                        message: "维护中，请耐心等候",
                        duration: 1000
                    });
                } else {
                    this.$router.push("login");
                }
            },
            getSelectData() {
                func.getWalletInfo().then(res => {
                    let list = res.walletCenterResp;
                    this.allmoney = list.balance;
                    for (var i in list.gameBalance) {
                        if (list.gameBalance[i].id === this.platformId) {
                            this.balances = list.gameBalance[i].balance;
                        }
                    }
                })
                .catch(err => {});
            },
            ratio(id, name) {
                ratios(id, name).then(res => {
                    if (res.remark == "") {
                        this.getSelectData();
                        this.toast_control = true;
                    } else {
                        this.intoGame();
                    }
                })
                .catch(err => {
                    this.transErr();
                });
            },
            returnState(state) {
                this.toast_control = state;
            },
            //快捷转入失败
            transErr() {
                this.$messagebox({
                    title: " ",
                    message: "快捷转入失败,是否继续进入游戏",
                    showCancelButton: true,
                    confirmButtonText: "继续",
                    cancelButtonText: "否"
                }).then(action => {
                    if (action == "confirm") {
                        this.intoGame();
                    } else {
                        this.getSelectData();
                        this.toast_control = true;
                    }
                });
            },
            intoGame() {
                gameInto(this.platformName, this.platformId).then(res => {
                    window.open(
                        res.loginUrl,
                        "_blank",
                        "toolbar=yes, width=1300, height=900"
                    );
                })
                .catch(err => {});
            },
        }
    }
</script>

<style lang="less" scoped>
    @import url("../../components/less/common.less");
    @import url('./game.less');
</style>