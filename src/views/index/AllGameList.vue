<template>
    <div class="allgames">
        <div class="nav-wrap">
            <mt-navbar class="navList" v-model="tabFirstIndex">
                <mt-tab-item  @click.native="tabFirst(index,gameList)" v-for="(item, index) in gameTitle" :id="index" :key="index">{{item.title}}</mt-tab-item>
            </mt-navbar>
        </div>

        <div class="ad-img">
            <img src="../../assets/img/image-allGameAd.png" />
        </div>

        <mt-tab-container class="gameBox" v-model="tabFirstIndex">

            <!--no side item.id = 3视讯 5体育-->
            <mt-tab-container-item class="noside" v-if="item.id === 3 || item.id === 5" v-for="(item, index) in gameList" :id="index" :key="index">
                <ul class="clearfix">
                    <li class="layout" v-for="(item,index) in item.platformNameList" :key="index">
                        <div v-for="(gameName, index) in item.productList" :key="index" @click="gamepop(item.platformId,item.platformName,item.productName,item.isWh)" class="gameRegion">
                            <div class="gamePic">
                                <div class="maintain" v-show="item.isWh">
                                    <span>正在<br>维护</span>
                                </div>
                                <img v-lazy="cdnUrl+gameName.iconUrl" />
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
            <mt-tab-container-item class="haveside" v-if="item.id === 2" v-for="(item, index) in gameList" :id="index" :key="index">
                <div class="sideScroll">
                    <ul class="page-part">
                        <li @click="tabSecond(index,item.platformNameList)" :class='{"active":tabSecondIndex === index}' v-for="(side, index) in item.platformNameList" :id="index" :key="index">
                            <span v-for="(gameName, index) in side.productList" :key="index">{{gameName.productName}}</span>
                        </li>
                    </ul>
                </div>
                <!-- tab-container -->
                <div v-show="tabSecondIndex === index" class="right" v-for="(sideGame, index) in item.platformNameList" :id="index" :key="index">
                    <div class="search-fast">
                        <input type="text" v-model="keyWord" @keyup="filter(sideGame.eGame)" placeholder="输入游戏名称" />
                        <div class="serarch" @click="filter(sideGame.eGame)"><button>搜索</button></div>
                    </div>
                    <ul class="clearfix">
                        <li class="layout" v-for="(minGame,index) in searchList" :key="index">
                            <div v-for="(gameName, index) in sideGame.productList" :key="index" @click="gamepop(sideGame.platformId,sideGame.platformName,gameName.productName,item.isWh)" class="gameRegion">
                                <div class="gamePic">
                                    <div class="maintain" v-show="item.isWh">
                                        <span>正在<br>维护</span>
                                    </div>
                                    <img v-if="sideGame.platformName == 'hb'" v-lazy="minGame.image" />
                                    <img v-else-if="sideGame.platformName != 'hb'" v-lazy="cdnUrl+minGame.image" />
                                </div>
                                <span class="text-dots">{{minGame.name}}</span>
                            </div>
                        </li>
                        <div v-if="sideGame.fcGame.length === 0 && sideGame.eGame.length === 0" class="no-data">
                            <div class="no-data-img iconfont icon-list-zanwusj"></div>
                            <p class="no-data-text">暂无数据~</p>
                        </div>
                    </ul>
                </div>
            </mt-tab-container-item>



            <!--side 1=彩票-->
            <mt-tab-container-item class="haveside" v-if="item.id === 1" v-for="(item, index) in gameList" :id="index" :key="index">
                <div class="sideScroll">
                    <ul class="page-part">
                        <li @click="tabSecond(index2,item.platformNameList)" :class='{"active":tabSecondIndex === index2}' v-for="(sideList, index2) in item.platformNameList" :id="index2" :key="index2">
                            <span v-for="(gameName, index) in sideList.productList" :key="index">{{gameName.productName}}</span>
                        </li>
                    </ul>
                </div>
                <!-- tab-container -->
                <div v-show="tabSecondIndex === index" class="right" v-for="(sideGame, index) in item.platformNameList" :id="index" :key="index">
                    <div class="search-fast">
                        <!-- 彩票添加搜索 -->
                        <input type="text" v-model="keyWord" @keyup="filterCaipiao(sideGame.fcGame)" placeholder="输入彩票名称" />
                        <div class="serarch" @click="filterCaipiao(sideGame.fcGame)"><button>搜索</button></div>
                    </div>
                    <ul class="clearfix">
                        <li v-show="sideGame.typeId === 1" class="layout" v-for="(minGame,index) in searchListCaipiao" :key="index">
                            <div v-for="(gameName, index) in sideGame.productList" :key="index" @click="gamepop(sideGame.platformId,sideGame.platformName,gameName.productName,sideGame.isWh)" class="gameRegion">
                                <div class="gamePic">
                                    <div class="maintain" v-show="sideGame.isWh">
                                        <span>正在<br>维护</span>
                                    </div>
                                    <img v-lazy="cdnUrl+minGame.iconUrl" />
                                </div>
                                <span v-if="sideGame.typeId == 1" class="text-dots">{{minGame.fcName}}</span>
                                <span v-else-if="sideGame.typeId == 4" class="text-dots">{{minGame.productName}}</span>
                            </div>
                        </li>
                        <!-- 棋牌 -->
                        <li v-show="sideGame.typeId === 4" class="layout" v-for="(minGame,index) in sideGame.eGame" :key="index">
                            <div v-for="(gameName, index) in sideGame.productList" :key="index" @click="gamepop(sideGame.platformId,sideGame.platformName,gameName.productName,sideGame.isWh)" class="gameRegion">
                                <div class="gamePic">
                                    <div class="maintain" v-show="sideGame.isWh">
                                        <span>正在<br>维护</span>
                                    </div>
                                    <img v-lazy="cdnUrl+minGame.image" />
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




            <!--side 4=棋牌-->
            <mt-tab-container-item class="haveside" v-if="item.id === 4" v-for="(item, index) in gameList" :id="index" :key="index">
                <div class="sideScroll">
                    <ul class="page-part">
                        <li @click="tabSecond(index2,item.platformNameList)" :class='{"active":tabSecondIndex === index2}' v-for="(sideList, index2) in item.platformNameList" :id="index2" :key="index2">
                            <span v-for="(gameName, index) in sideList.productList" :key="index">{{gameName.productName}}</span>
                        </li>
                    </ul>
                </div>
                <!-- tab-container -->
                <div v-show="tabSecondIndex === index" class="right" v-for="(sideGame, index) in item.platformNameList" :id="index" :key="index">
                    <ul class="clearfix">
                        <li class="layout" v-for="(minGame,index) in sideGame.eGame" :key="index">
                            <div v-for="(gameName, index) in sideGame.productList" :key="index" @click="gamepop(sideGame.platformId,sideGame.platformName,gameName.productName,sideGame.isWh)" class="gameRegion">
                                <div class="gamePic">
                                    <div class="maintain" v-show="sideGame.isWh">
                                        <span>正在<br>维护</span>
                                    </div>
                                    <img v-lazy="cdnUrl+minGame.image" />
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
    import {indexInfo,ratios,gameInto} from "@/api/index";
    import Gamepop from "./Gamepop";
    import func from "@/api/purse";

    export default {
        data(){
            return {
                gameTitle: [],
                cdnUrl: "",
                tabFirstIndex:0,
                tabSecondIndex:0,
                gameList:[],
                keyWord:'',
                searchList:[],
                searchListCaipiao:[],

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
        components: {
            Gamepop
        },
        created(){
            let indexObj = this.$route.query;
            this.getGame();
            

        },
        methods:{
            getGame() {
                indexInfo().then(res => {
                    this.cdnUrl = res.cdn + "/";
                    this.gameList = res.gameInfo;
                    this.showTitle();
                    //电子-搜索功能 firstIndex 0-彩票 1-电子 secondIndex 0-BG电子 1-EG电子 ...
                    if(this.$route.query.firstIndex){
                        this.tabFirstIndex = this.$route.query.firstIndex *1;
                        this.tabFirst(this.tabFirstIndex,this.gameList);
                        this.tabSecondIndex = this.$route.query.secondIndex *1;
                        this.tabSecond(this.tabSecondIndex,this.gameList[this.tabFirstIndex].platformNameList);
                    }else {
                        this.tabFirstIndex = 0;
                        this.tabSecondIndex = 0;
                        this.tabFirst(this.tabFirstIndex,this.gameList);
                        this.tabSecond(this.tabSecondIndex,this.gameList[this.tabFirstIndex].platformNameList);
                    }
                })
                .catch(err => {});
            },
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
            tabFirst(index,gameList){
                // console.log(gameList);
                // console.log(gameList[0].platformNameList[0].fcGame)

                this.tabFirstIndex = index;
                //一级切换时将彩票和棋牌的二级切换设置为第一项
                this.tabSecondIndex = 0;
                if(index === 1){
                    this.searchList = gameList[1].platformNameList[0].eGame;
                }
                if(index === 0){
                    this.searchListCaipiao = gameList[0].platformNameList[0].fcGame;
                }

                this.keyWord = '';

            },
            tabSecond(index,platformNameList){
                this.tabSecondIndex = index;
                this.keyWord = '';
                if(this.tabFirstIndex === 1){//电子
                    this.searchList = platformNameList[index].eGame;
                }
                if(this.tabFirstIndex === 0){
                    this.searchListCaipiao = platformNameList[index].fcGame;
                }
                
            },
            //电子搜索
            filter(item) {
                let newArr = [];
                if (this.keyWord) {
                    item.map((v) =>{
                        if(v.name.toUpperCase().indexOf(this.keyWord.toUpperCase())>-1){
                            return newArr.push(v);
                        }
                    });
                    this.searchList = newArr;
                }else {
                    this.searchList = item;
                }
            },
            //彩票搜索
            filterCaipiao(item){
                let newArr = [];
                if (this.keyWord) {
                    item.map((v) =>{
                        if(v.fcName.toUpperCase().indexOf(this.keyWord.toUpperCase())>-1){
                            return newArr.push(v);
                        }
                    });
                    this.searchListCaipiao = newArr;
                }else {
                    this.searchListCaipiao = item;
                }
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