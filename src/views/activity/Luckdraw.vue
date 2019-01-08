<template>
    <div class="container">
        <Header :title="'幸运大抽奖'" :rooter="'-1'" :hasNoBack="true" :iFontsize="'.58667rem'"></Header>

        <div class="conts">
            <div class="lucky-title">{{drawList.table.title}}</div>
            <div class="box-bg">
                <div class="box">
                    <div class="pointer" @click="chou()"></div>
                    <div class="boxbg" :style="{transform:rotate_angle,transition:rotate_transition}">
                        <div class="turn">
                            <div :class="{'wheel-bg6':true}">
                                <div class="prize-list">
                                    <ul class="ulOne">
                                        <li v-for="(item,index) in arrOne" :key="index" :class="{'redbg':index%2 != 1}" :style="{ zIndex: item.zIndex,transform: item.deg }"></li>
                                    </ul>
                                    <ul class="ulTwo">
                                        <li v-for="(item,index) in arrTwo" :key="index" :class="{'redbg':index%2 != 0}" :style="{ zIndex: item.zIndex,transform: item.deg }"></li>
                                        <li v-if="prize_list.length==3" style="border:none;z-index:4; transform: rotate(329deg)"></li>
                                    </ul>
                                    <div></div>
                                </div>
                                <div class="prize-list">
                                    <div class="prize-item" :class="{'yellow':index%2 != 0}" v-for="(item,index) in prize_list" :key="index" :style="{transform:item.troter,width:item.width}">
                                        <div class="prize-pic">
                                            <!--<img v-if="item.prizeType==0" src="../../static/img/xiexie.png">-->
                                        </div>
                                        <div class="prize-name">
                                            {{item.prizeName}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="drawBg"></div>
                </div>
            </div>
        </div>
        <div class="popup" v-show="toast_control">
            <div class="popbg"></div>

            <!-- 中了 特等奖/一等奖/二等奖/三等奖/再来一次 -->
            <div class="popbox" v-show="drawn">
                <div class="popcontent-bg">
                    <img class="faguang" src="../../assets/img/turntable_bg02.png"/>
                    <div class="popcontent">
                        <img class="jingbi" src="../../assets/img/turntable_img_sc.png"/>
                        <div class="content-top">
                            <div class="lucking">
                                <div class="title">恭喜!</div>
                                <div class="money" v-show="hasPrize.prizeType != 2">获得{{hasPrize.prizeName}}</div>
                                <!-- 抽到再来一次 -->
                                <div class="money" v-show="hasPrize.prizeType === 2">获得一次抽奖机会</div>
                            </div>
                        </div>
                        <div class="content-bottom">
                            <div class="btns" @click="toast_control=false">确定</div>
                            <div class="btns again" @click="again">继续抽奖</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 中了 谢谢参与 -->
            <div class="popbox" v-show="eyeshow">
                <div class="popcontent-bg">
                    <div class="popcontent">
                        <img class="jingbi" src="../../assets/img/turntable_img_sc02.png"/>
                        <div class="content-top">
                            <div class="nochanges lucking">
                                <div class="title">
                                    <p>没有中奖，</p> 
                                    <p>请再接再厉哦！</p> 
                                </div>
                            </div>
                        </div>
                        <div class="content-bottom">
                            <div class="btns" @click="toast_control=false">确定</div>
                            <div class="btns again" @click="again">继续抽奖</div>
                        </div>
                    </div>
                </div>
            </div>

                <!-- 没有机会了 -->
            <div class="popbox" v-show="lottery">
                <div class="popcontent-bg" >
                    <div class="popcontent">
                        <img class="jingbi" src="../../assets/img/turntable_img_sc02.png"/>
                        <div class="content-top">
                            <div class="nochanges lucking nochange-2">
                                <div class="title">
                                    <p>您已经没有抽奖机会了</p> 
                                    <p>存款<span>{{spending}}元</span></p> 
                                    <!-- <p>消费<span>{{saving}}元</span></p>  -->
                                    <p>即可获得<span>1次</span>抽奖机会！</p> 
                                </div>
                            </div>
                        </div>
                        <div class="content-bottom">
                            <div class="btns" @click="toast_control=false">取消</div>
                            <router-link tag="div" :to="{name:'deposit'}"  class="btns again">立即存款</router-link>
                            <!-- <div class="btns again" @click="again">立即投注</div> -->
                        </div>
                    </div>
                </div>
            </div>










                <!-- <div class="popcontent">
                    <div class="content-top">
                        <div v-show="eyeshow" class="eyes">
                            <div class="title">{{hasPrize.prizeName}}</div>
                            <img src="../../assets/img/turntable_tu01.png" />
                        </div>
                        <div v-show="lottery" class="nochanges">
                            <div class="title">很遗憾！什么都没有</div>
                            <div class="text">没机会了下次再来吧!</div>
                        </div>

                        <div v-show="drawn" class="nochanges lucking">
                            <div class="title">恭喜!</div>
                            <div class="money">获得{{hasPrize.prizeName}}</div>
                        </div>
                    </div>
                    <div class="content-bottom">
                        <div v-show="!lottery" class="botton">
                            <div class="btns" @click="toast_control=false">关闭</div>
                            <div class="btns again" @click="again">再来一次</div>
                        </div>
                        <div v-show="lottery" class="botton">
                            <div class="close" @click="toast_control=false">关闭</div>
                        </div>
                    </div>
                </div> -->

            <!-- </div> -->
        </div>


        <!--bottom-->
        <div class="main">
            <div class="content">
                <p>您还有<span class="lottery_ticket">{{lottery_ticket}}</span>次抽奖机会!</p>
                <p v-show="saving!=0" class="deposit-money">消费<span class="lottery_ticket">{{saving}}</span>元即可获得一次抽奖机会，<router-link :to="{name:'games'}">我要玩游戏</router-link></p>
                <p v-show="spending!=0" class="deposit-money">存款<span class="lottery_ticket">{{spending}}</span>元即可获得一次抽奖机会，<router-link :to="{name:'deposit'}">立即存款</router-link></p>
            </div>
            <div class="statistics">
                <div class="topbox"></div>
                <div class="stat-box">
                    <div class="stat-cont">
                        <div class="stat-cont-top">
                            <ul>
                                <li v-for="(prizeLists,index) in prizeList" :key="index">
                                    <div class="before">
                                        <div class="money">{{prizeLists.money}}元</div>现金</div>
                                    <div class="after"><span>{{prizeLists.title}}</span></div>
                                </li>
                            </ul>
                        </div>
                        <div class="stat-cont-list">
                            <div class="stat-cont-scroll">
                                <ul>
                                    <li v-for="(history,index) in historyList" class="clearfix" :key="index">
                                        <div class="left">玩家 {{history.memberName}} 抽中{{history.prizeName}}</div>
                                        <div class="right">{{history.winningTime | filterDate('H:m')}}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "../../components/Header";
    import {
        getTurntableInfo,
        getTurntableLottey,
        getTurntableHistory,
        receiveTurntable

    } from '@/api/activity'
    export default {
        components: {
            Header,
        },
        watch: {
            toast_control(newVal, oldVal) {
                if (newVal) {
                    this.ModalHelper.open();
                } else {
                    this.ModalHelper.close();
                }
            }
        },
        data() {
            return {
                popbg: 'commonbg',
                drawn: false,
                eyeshow: false,
                animate: false,
                prizeList: [],
                historyList: [],
                drawList: {
                    table: {
                        title: ""
                    }
                },
                thisId: '',
                turnId: '',
                lottery_ticket: 0, //抽奖次数
                winnum: '0', //中奖的下标
                toast_control: false, //抽奖结果和活动规则弹出框控制器
                click_flag: true, //是否可以旋转抽奖
                start_rotating_degree: 0, //转盘初始旋转角度
                rotate_angle: 0, //转盘将要旋转的角度
                start_rotating_degree_pointer: 0, //指针初始旋转角度
                rotate_angle_pointer: 0, //指针将要旋转的度数
                rotate_transition: "", //初始化选中的过度属性控制
                rotate_transition_pointer: "transform 12s ease-in-out", //初始化指针过度属性控制
                prize_list: [], //奖品列表
                arrOne: [],
                arrTwo: [],
                shopUid: '',
                userinfo: '',
                hasPrize: {
                    prizeName: ''
                }, //抽奖之后弹出框信息
                numb: 1,
                lottery: false,
                saving:0,//存款多少元即可获得一次抽奖机会
                spending:0,//消费多少元即可获得一次抽奖机会
            };
        },
        mounted() {
            this.setSan();
            this.history();
        },
        created() {
            setInterval(this.scroll, 1000)
        },
        methods: {
            chou() {
                if (this.lottery_ticket <= 0) {
                    this.click_flag = false;
                    this.lottery = true;
                    this.toast_control = true;
                } else if (this.click_flag) {
                    getTurntableLottey(this.thisId).then(res => {
                        console.log(res);
                        let turnDraw = this.drawList.prizes;
                        for(let i = 0 ; i < turnDraw.length; i++){
                            if (turnDraw[i].id == res.id) {
                                this.winnum = i
                                this.turnId = turnDraw[i].id
                            }
                        }
                        console.log(this.winnum);
                        console.log(this.turnId);


                        this.rotating(this.winnum,()=>{
                            if (this.prize_list[this.winnum].prizeType === 3) {//谢谢参与
                                this.toast_control = true;
                                this.eyeshow = true;
                                this.drawn = false;
                            } else if (this.prize_list[this.winnum].prizeType === 2) {//再来一次
                                this.toast_control = true;
                                this.drawn = true;
                                this.eyeshow = false;
                            }else {
                                this.toast_control = true;
                                this.drawn = true;
                                this.eyeshow = false;
                            }
                            if (this.lottery_ticket <= 0) {
                                this.eyeshow = false;
                                this.drawn = false;
                                this.click_flag = false;
                                this.lottery = true;
                                this.toast_control = true;
                            }
                        });
                        
                    }).catch(err => {});
                }
            },
            setSan() {
                this.thisId = this.$route.query.id;
                getTurntableInfo(this.thisId).then(res => {
                    console.log(res,"aaa")
                    this.drawList = res;
                    this.prize_list = res.prizes;
                    this.lottery_ticket = res.num || 0;//剩余抽奖次数
                    this.saving = res.table.saving; //存款多少可以抽奖
                    this.spending = res.table.spending;//消费多少可以抽奖
                    let przlist = [];
                    for (let k in res.prizes) {
                        if (res.prizes[k].prizeFee > 0) {
                            przlist.push({
                                money: res.prizes[k].prizeFee,
                                title: res.prizes[k].prizeName
                            })
                        }
                    }
                    this.prizeList = przlist;

                    this.arrOne = [];
                    this.arrTwo = [];
                    this.rotate_angle = "rotate(" + Math.floor(-360 * 100 / this.prize_list.length) / 200 + "deg)";
                    this.start_rotating_degree = Math.floor(-360 * 100 / this.prize_list.length) / 200;
                    for (let i = 0; i < this.prize_list.length; i++) {
                        this.prize_list[i].troter = "rotate(" + Math.floor(360 * 100 / this.prize_list.length) / 100 * (0.5 + Number(i)) + "deg) translateX(-50%)"
                        this.prize_list[i].width = Math.floor(3.14 * 5.6 / this.prize_list.length) + "rem"
                        let item = {
                            value: this.prize_list[i].name,
                            zIndex: Number(i) + 1,
                            deg: "rotate(" + Math.floor(360 * 100 / this.prize_list.length) * i / 100 + "deg)",
                            degnum: i,
                        };
                        if (i < this.prize_list.length / 2) {
                            this.arrOne.push(item)
                        } else {
                            this.arrTwo.push(item)
                        }
                    }
                }).catch(err => {});
            },
            rotating(index,cb) { //转盘转动函数，index值为中奖的下标，后台会返回中奖的id，这边会首先for循环判断中奖的下标

                this.rotate_transition = "transform 3s cubic-bezier(0.25,0.1,0.01,1)";
                if (!this.click_flag) return;
                let type = 0; // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
                let during_time = 2; // 默认为1s
                let result_index = index; // 最终要旋转到哪一块，对应prize_list的下标
                this.click_flag = false; // 旋转结束前，不允许再次触发
                if (type == 0) {
                    if (this.start_rotating_degree < 0) {
                        this.start_rotating_degree = 0
                    } else {
                        this.start_rotating_degree = this.start_rotating_degree + Math.floor(360 * 100 / this.prize_list.length) / 200
                    }
                    let rotate_angle = this.start_rotating_degree + 360 * 5 + Math.floor(-360 * 100 / this.prize_list.length) / 200 - Math.floor(360 * 100 / this.prize_list.length) * result_index / 100;
                    this.start_rotating_degree = rotate_angle;
                    this.rotate_angle = "rotate(" + rotate_angle + "deg)";
                    // 旋转结束后，允许再次触发
                    setTimeout(() =>{
                        this.game_over();
                        cb?cb():"";
                    }, during_time * 1000 + 1500); // 延时，保证转盘转完
                }
            },
            game_over() {
                this.start_rotating_degree = 360 * (5 * this.numb) - Math.floor(360 * 100 / this.prize_list.length) / 200;
                this.numb++;
                receiveTurntable(this.thisId, this.turnId).then(res => {
                    this.toast_control = true;
                    // this.lottery_ticket--
                    //中了 再来一次 请求次数
                    this.thisId = this.$route.query.id;
                    getTurntableInfo(this.thisId).then(res => {
                        console.log(res,'---')
                        this.lottery_ticket = res.num || 0;
                    })
                    this.history();


                }).catch(err => {
                    this.hasPrize.prizeName = err;
                    this.eyeshow = true;
                    this.drawn = false;
                    this.popbg = 'commonbg'
                    this.toast_control = true;
                });
                this.hasPrize = this.prize_list[this.winnum];
                setTimeout(() =>{
                    this.click_flag = true;
                },500);

            },
            again() {
                this.toast_control = false;
                this.chou();
            },
            history() {
                getTurntableHistory(this.thisId).then(res => {
                    console.log('history',res)
                    this.historyList = res.turntableWinningRecord
                }).catch(err => {
                    // console.log(err);
                    this.$toast({
                        message: err,
                        duration: 2000
                    });

                })
            },
            scroll() {
                if (this.historyList.length > 4) {
                    this.animate = true; // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
                    setTimeout(() => { //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
                        this.historyList.push(this.historyList[0]); // 将数组的第一个元素添加到数组的
                        this.historyList.shift(); //删除数组的第一个元素
                        this.animate = false; // margin-top 为0 的时候取消过渡动画，实现无缝滚动
                    }, 500)
                }
            }
        }
    }
</script>


<style lang="less" scoped>
    @import url('../../components/less/common.less');
    .container {
        padding-top: 1.22667rem/* 92/75 */
        ;
        width: 100%;
        // background: @color-252232;
        background: linear-gradient(#ffad84, #ff8d3a);

        overflow-x: hidden;
        .conts {
            width: 100%;
            padding-top: 0.68rem;
            // background: url("../../assets/img/img_dzpBg.png") center no-repeat;
            background-size: 10rem;
            overflow: hidden;
            .lucky-title {
                text-align: center;
                font-size: 0.8rem;
                color:@color-f53045;
                text-shadow: 0px 5px 5px rgba(255, 223, 96, 0.3);
                font-weight: bold;
                max-width: 8rem;
                margin: 0 auto;
            }
            .activitytime {
                height: 0.5rem;
                width: 100%;
                position: absolute;
                .timebg {
                    width: 100%;
                    height: 100%;
                    background: #000000;
                    opacity: 0.3;
                    position: absolute;
                    left: 0;
                    top: 0;
                }
                .time {
                    color: #ffffff;
                    line-height: 0.5rem;
                    padding-left: 0.2rem;
                    font-size: 0.24rem;
                    position: relative;
                    z-index: 2;
                }
            }
            .rule {
                height: 0.69rem;
                margin-bottom: 2.37rem;
                position: relative;
                .ruletop {
                    width: 1.35rem;
                    height: 0.46rem;
                    position: absolute;
                    right: 0;
                    bottom: 3px;
                    .rulebg {
                        height: 100%;
                        width: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        background: #1201d5;
                        opacity: 0.3;
                        border-top-left-radius: 0.23rem;
                        border-bottom-left-radius: 0.23rem;
                    }
                    .ruletitle {
                        text-align: center;
                        line-height: 0.46rem;
                        font-size: 0.24rem;
                        color: #fff;
                        position: relative;
                        z-index: 3;
                        border-top-left-radius: 0.23rem;
                        border-bottom-left-radius: 0.23rem;
                        border-bottom: 3px solid #1201d5;
                    }
                }
            }
            .title {
                height: 0.46rem;
                text-align: center;
                color: #464ff4;
                font-size: 0.28rem;
                line-height: 0.46rem;
                font-weight: 700;
                margin-bottom: 0.24rem;
            }
            .box-bg{
                background: url("../../assets/img/img_dzpBg.png") center no-repeat;
            }
            .box {
                width: 7.387rem;
                height: 7.387rem;
                margin: auto;
                margin-top: 0.413rem;
                position: relative;
                overflow: hidden;
                background: linear-gradient(@color-bg-t, @color-bg-b);

                background-size: 100%;
                border-radius: 50%;
                .drawBg {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: url("../../assets/img/img_dzpFl.gif") no-repeat;
                    background-size: 100%;
                }
                .pointer {
                    width: 2rem;
                    height: 2.667rem;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    z-index: 20;
                    transform: translate(-50%, -60%);
                    background: url("../../assets/img/img_dzpZzsc.png") top center no-repeat;
                    background-size: 100%;
                }
                .boxbg {
                    width: 6.373rem;
                    height: 6.373rem;
                    padding: 0.507rem;
                    .turn {
                        width: 6.373rem;
                        height: 6.373rem;
                        border-radius: 50%;
                        overflow: hidden;
                        background-color: @color-yellow;
                        .slice {
                            box-sizing: border-box;
                            border: 1px solid #ffd8ad;
                        }
                        .wheel-bg6 {
                            width: 100%;
                            height: 100%;
                            position: relative;
                            div {
                                text-align: center;
                            }
                            .prize-list {
                                width: 100%;
                                height: 100%;
                                position: absolute;
                                .redbg {
                                    background: linear-gradient(@color-redbg-l, @color-redbg-r);
                                }
                                ul {
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    width: 100%;
                                    height: 100%;
                                    border-radius: 50%;
                                    overflow: hidden;
                                    margin: 0;
                                    padding: 0;
                                    li {
                                        position: absolute;
                                        top: 0;
                                        left: 50%;
                                        width: 50%;
                                        height: 50%;
                                        transform-origin: 0 100%;
                                        overflow: hidden;
                                        cursor: pointer;
                                        box-sizing: border-box;
                                        background: @color-yellow;
                                    }
                                }
                                .ulOne {
                                    clip: rect(0, 6.373rem, 6.373rem, 3.1865rem);
                                }
                                .ulTwo {
                                    clip: rect(0, 3.1865rem, 6.373rem, 0);
                                }
                                .prize-item {
                                    position: absolute;
                                    top: 0;
                                    z-index: 12;
                                    height: 3.1865rem;
                                    left: 50%;
                                    transform: translateX(-50%);
                                    transform-origin: 0 100%;
                                    .prize-pic {
                                        padding-top: 0.3rem;
                                        text-align: center;
                                        img {
                                            width: 0.75rem;
                                        }
                                    }
                                    .prize-name {
                                        font-size: 0.42rem;
                                        color: @color-yellow;
                                        width: 0.42rem;
                                        margin: 0 auto;
                                    }
                                }
                                .yellow {
                                    .prize-name {
                                        color: @color-f4224c;
                                    }
                                }
                            }
                        }
                    }
                }
                .money {
                    position: absolute;
                    width: 0.57rem;
                    height: 0.55rem;
                    top: 2.17rem;
                    right: -0.2rem;
                }
            }
        }
        .popup {
            width: 100%;
            height: 100%;
            position: fixed;
            z-index: 100;
            top: 0;
            left: 0;
            .popbg {
                width: 100%;
                height: 100%;
                background: #000;
                opacity: 0.7;
            }
            .prositbg {
                background: url("../../assets/img/turntable_bg02.png") center top 3rem no-repeat;
                background-size: 100%;
            }
            .commonbg {
                background: url("../../assets/img/turntable_bg01.png") center no-repeat;
                background-size: 100%;
            }
            .popbox {
                width: 10rem;
                height: 100%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                margin: auto;
                text-align: center;
                .popcontent-bg{
                    width:100%;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    .faguang{
                        position: absolute;
                        width:100%;
                        height:7.12rem /* 534/75 */;
                        top:-6.5rem;
                        left:0;
                    }
                    .popcontent{
                        .jingbi{
                            position:absolute;
                            top:-.4rem /* 30/75 */;
                            left:-.4rem /* 30/75 */;
                            width:7.37333rem /* 553/75 */;
                            height:6.22667rem /* 467/75 */;
                        }
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width:6.84rem /* 513/75 */;
                        height:5.96rem /* 447/75 */;
                        background:url('../../assets/img/image_dzpPop.png') no-repeat center center;
                        background-size: 100%;
                        .title {
                            padding-top:.66667rem /* 50/75 */;
                            padding-bottom: 0.72rem;
                            font-size: 0.45333rem;
                            color: @color-323233;
                        }
                        .text {
                            font-weight: bold;
                            font-size: .45333rem /* 34/75 */;
                            color: @color-646466;
                        }
                        .content-top{
                            .lucking {
                                .title {
                                    padding-bottom: .4rem /* 30/75 */;
                                   
                                }
                                .text {
                                    padding-bottom: 0.42rem;
                                }
                                .money {
                                    margin: 0 auto;
                                    width: 4rem /* 300/75 */;
                                    height: 1.06667rem /* 80/75 */;
                                    line-height: 1.06667rem /* 80/75 */;
                                    font-size: .4rem /* 30/75 */;
                                    font-weight: bold;
                                    border-radius: .4rem /* 30/75 */;
                                    background-color: @color-ffeee4;
                                    color: @color-ff4200;
                                }
                            }
                            .nochanges{
                                .title{
                                    padding-top:1.06667rem /* 80/75 */;
                                    p{
                                        line-height: 1;
                                        &:last-child{
                                            margin-top:.26667rem /* 20/75 */;
                                        }
                                    }
                                }
                            }
                            .nochange-2{
                                .title{
                                    padding-top:.66667rem /* 50/75 */;
                                    p{
                                        font-size:.37333rem /* 28/75 */;
                                        span{
                                            color: @color-fa466a;
                                            font-size:.48rem /* 36/75 */;
                                            font-weight:bold;
                                        }
                                         &:last-child{
                                            margin-top:.21333rem /* 16/75 */;
                                        }
                                        &:first-child{
                                            margin-bottom:.21333rem /* 16/75 */;
                                        }
                                    }
                                }
                            }
                        }
                        // .content-bottom.nochanges-content-bottom{
                        //     .btns{
                        //         margin-top: 1.46667rem /* 110/75 */;
                        //     }
                        // }
                        // .content-bottom.nochange-2-content-bottom{
                        //     .btns{
                        //         margin-top: 1.2rem /* 90/75 */;
                        //     }
                        // }
                        .content-bottom{
                            display:flex;
                            justify-content: space-between;
                            padding:0 1rem /* 75/75 */;
                            width:100%;
                            box-sizing: border-box;
                            position: absolute;
                            bottom:.93333rem /* 70/75 */;
                            .btns{
                                width:2.13333rem /* 160/75 */;
                                height:.93333rem /* 70/75 */;
                                line-height: .93333rem /* 70/75 */;
                                font-size:.37333rem /* 28/75 */;
                                border:1px solid @color-fedbc6;
                                border-radius: .13333rem /* 10/75 */;
                                text-align: center;
                                color:@color-fedbc6;
                                &.again{
                                    background: @color-fedbc6;
                                    color:@color-f4224c;
                                    font-weight: bold;
                                }
                            }
                            
                        }
                    }


                }
               

                // .popcontent {
                //     position: absolute;
                //     top: 50%;
                //     left: 50%;
                //     transform: translate(-50%, -50%);
                //     width: 6.08rem;
                //     background:url('../../assets/img/image_dzpPop.png') no-repeat;
                //     .content-top {
                //         position: relative;
                //         width: 5.6rem;
                //         margin: 0 auto;
                //         background-color: #fff;
                //         // &:before {
                //         //     position: absolute;
                //         //     top: -0.079rem;
                //         //     left: 0;
                //         //     width: 100%;
                //         //     height: 0.08rem;
                //         //     text-align: center;
                //         //     line-height: 0.08rem;
                //         //     content: "";
                //         //     background: url("../../assets/img/turntable_top.png") no-repeat;
                //         //     background-size: 100%;
                //         // }
                //         // .eyes {
                //         //     img {
                //         //         margin: 0 auto;
                //         //         width: 2.7733rem;
                //         //     }
                //         // }
                //         .nochanges {
                //             .title {
                //                 padding-bottom: 0.42667rem;
                //             }
                //             .text {
                //                 padding-bottom: 0.42rem;
                //             }
                //             .money {
                //                 margin: 0 auto;
                //                 width: 4rem;
                //                 height: 0.906rem;
                //                 line-height: 0.906rem;
                //                 font-size: 0.4266rem;
                //                 font-weight: bold;
                //                 border-radius: 0.4266rem;
                //                 background-color: #ffeee4;
                //                 color: #ef9021;
                //             }
                //         }
                //         .lucking {
                //             padding-bottom: 0.16rem;
                //             .title {
                //                 padding-bottom: 0.32rem;
                //             }
                //             .text {
                //                 padding-bottom: 0.16rem;
                //             }
                //         }
                //         .title {
                //             padding-top: 0.5333rem;
                //             padding-bottom: 0.72rem;
                //             font-weight: bold;
                //             font-size: 0.45333rem;
                //             color: @color-323233;
                //         }
                //         .text {
                //             font-weight: bold;
                //             font-size: 0.37333rem;
                //             color: @color-646466;
                //         }
                //     }
                //     .content-bottom {
                //         position: relative;
                //         width: 100%;
                //         height: 2.77333rem;
                //         // background: url("../../assets/img/turntable_bg.png") no-repeat;
                //         // background-size: 100%;
                //         .botton {
                //             position: absolute;
                //             bottom: 0.56rem;
                //             left: 50%;
                //             transform: translateX(-50%);
                //             width: 5.333rem;
                //             .close {
                //                 margin: 0 auto;
                //                 width: 3.2rem;
                //                 height: 0.9333rem;
                //                 line-height: 0.9333rem;
                //                 font-weight: bold;
                //                 font-size: 0.42666rem;
                //                 color: @color-f4224c;
                //                 background: url("../../assets/img/turntable_button02.png") center no-repeat;
                //                 background-size: 100%;
                //             }
                //             .btns {
                //                 float: left;
                //                 width: 50%;
                //                 height: 0.9333rem;
                //                 line-height: 0.9333rem;
                //                 font-weight: bold;
                //                 font-size: 0.42666rem;
                //                 color: @color-f4224c;
                //                 background: url("../../assets/img/turntable_button.png") center no-repeat;
                //                 background-size: 2.4rem 0.9333rem;
                //             }
                //         }
                //     }
                // }
            }
            .activityrule {
                width: 5.54rem;
                height: 6.32rem;
                position: absolute;
                top: 20%;
                left: 0;
                right: 0;
                margin: auto;
                /*background: url(../../static/img/rulebg.png) top center no-repeat;*/
                background-size: 100%;
                .rulecnt {
                    padding: 1.3rem 0.77rem 0;
                    p {
                        font-size: 0.24rem;
                        line-height: 0.4rem;
                        text-align: justify;
                        color: #333333;
                    }
                    p:last-of-type {
                        color: #ff4928;
                    }
                }
            }
        }
        .main {
            position: relative;
            margin-top: 0.987rem;
            padding-bottom: 1.6875rem;
            .content {
                font-size: .4rem /* 30/75 */;
                color: #fff;
                text-align: center;
                .lottery_ticket {
                    font-size:.64rem /* 48/75 */;
                    color: @color-f62f56;
                }
                .deposit-money{
                    margin-top:.4rem /* 30/75 */;
                    line-height:1;
                    font-size:.4rem /* 30/75 */;
                    span{
                        font-size:.64rem /* 48/75 */;
                        font-weight:bold;
                    }
                    a{
                        font-size:.4rem /* 30/75 */;
                        color: #ff0000;
                        text-decoration: underline;
                    }
                }
            }
            .statistics {
                position: relative;
                margin: 0.587rem 0;
                .topbox {
                    position: absolute;
                    left: 50%;
                    transform: translate(-50%, 0);
                    width: 9.2rem;
                    height: 0.267rem;
                    background-color: #ff7217;
                    box-shadow: inset 0 0.067rem 0.133rem 0 rgba(0, 0, 0, 0.3);
                    border-radius: 0.133rem;
                }
                .stat-box {
                    position: relative;
                    padding: .26667rem /* 20/75 */ 0 0.26rem;
                    margin: 0 auto;
                    width: 8.8rem;
                    overflow: hidden;
                    &:before {
                        position: absolute;
                        left: 0;
                        right: 0;
                        top: 0.08rem;
                        width: 110%;
                        height: .26667rem /* 20/75 */;
                        content: '';
                        background: linear-gradient(#ffb17f, #ffd5b2);
                        background-size: 100%;
                    }
                    &:after {
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        width: 100%;
                        height: 0.267rem;
                        content: '';
                        background: url("../../assets/img/image_dpzJxBgbtm.png") no-repeat;
                        background-size: 100%;
                    }
                    .stat-cont {
                        background-color: #ffd5b2;
                        .stat-cont-top {
                            ul {
                                padding: 0.267rem 0;
                                li {
                                    margin: 0 auto;
                                    width: 5.733rem;
                                    height: 1.533rem;
                                    text-align: center;
                                    color: #ffd5b2;
                                    background: url("../../assets/img/img_jxBg.png") center center no-repeat;
                                    background-size: 100% 100%;
                                    .before {
                                        margin-top: 0.24rem;
                                        float: left;
                                        width: 4.2rem;
                                        line-height: 0.5rem;
                                        font-family: PingFangSC-Medium;
                                        font-size: 0.373rem;
                                        .money {
                                            font-size: 0.48rem;
                                        }
                                    }
                                    .after {
                                        float: left;
                                        width: 1.533rem;
                                        font-size: 0.32rem;
                                        span {
                                            display: block;
                                            padding-top: 0.1rem;
                                            margin: 0 auto;
                                            width: 0.32rem;
                                            line-height: 0.4rem;
                                        }
                                    }
                                }
                            }
                        }
                        .stat-cont-list {
                            margin: 0 auto;
                            padding-top: 0.1334rem;
                            padding-bottom: 0.6667rem;
                            width: 8.4rem;
                            border-top: 0.027rem dashed #f4264f;
                            .stat-cont-scroll {
                                height: 2.4rem;
                                overflow: hidden;
                                ul {
                                    font-size: 0.187rem;
                                    color: #f4264f;
                                    li {
                                        line-height: 0.627rem;
                                        font-size: 0.373rem;
                                        .left {
                                            float: left;
                                        }
                                        .right {
                                            float: right;
                                            text-align: right;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        .toast {
            position: fixed;
            top: 50%;
            left: 50%;
            z-index: 999;
            transform: translate(-50%, -50%);
            width: 7.387rem;
            border-radius: 0.3125rem;
            padding: 0.3125rem;
            background-color: rgb(252, 244, 224);
            .toast-container {
                position: relative;
                width: 100%;
                height: 100%;
                border: 1px dotted #fccc6e;
                .toast-picture {
                    position: absolute;
                    top: -6.5rem;
                    left: -1.5rem;
                    width: 7.387rem;
                    height: 7.387rem;
                }
                .close {
                    position: absolute;
                    top: -0.9375rem;
                    right: -0.9375rem;
                    width: 2rem;
                    height: 2rem;
                    /*background: url("../../assets/img/close_store.png") no-repeat center top;*/
                    background-size: 100%;
                }
                .toast-title {
                    padding: 2.8125rem 0;
                    font-size: 0.24rem;
                    color: #fc7939;
                    text-align: center;
                }
                .toast-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 0.9375rem;
                    .toast-cancel {
                        background-image: -moz-linear-gradient( -18deg, rgb(242, 148, 85) 0%, rgb(252, 124, 88) 51%, rgb(252, 124, 88) 99%);
                        background-image: -ms-linear-gradient( -18deg, rgb(242, 148, 85) 0%, rgb(252, 124, 88) 51%, rgb(252, 124, 88) 99%);
                        background-image: -webkit-linear-gradient( -18deg, rgb(242, 148, 85) 0%, rgb(252, 124, 88) 51%, rgb(252, 124, 88) 99%);
                        box-shadow: 0 0.053rem 0 0 rgba(174, 34, 5, 0.7);
                        width: 4.6875rem;
                        height: 1.875rem;
                        border-radius: 1.875rem;
                        text-align: center;
                        line-height: 1.875rem;
                        color: #fff;
                    }
                }
            }
        }
        .toast-mask {
            position: fixed;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.6);
            z-index: 998;
            width: 100%;
            height: 100%;
        }
    }
</style>
