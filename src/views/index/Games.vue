<template>
    <div class="games">
        <Header :title="'全部游戏'" :rooter="'-1'" :hasNoBack="true" :iFontsize="'.58667rem'"></Header>
        <!--redbag-->
        <Redbag v-show="bagSwitch === 1"></Redbag>
        <div @click="closeadv()" v-show="noticeData.length>0" class="notive">
            <div class="icon iconfont icon-sy-tzgg"></div>
            <marquee direction="left" align="bottom" height="25" width="100%" onmouseout="this.start()" onmouseover="this.stop()" scrollamount="4" scrolldelay="1">
                <div class="noticeText" v-for="(noticeDatas,index) in noticeData" :key="index">{{noticeDatas.content}}</div>
            </marquee>
        </div>

        <AllGameList></AllGameList>
        <!--双按钮弹窗 >>> notice-->
        <div v-show="noticePop" class="twoBtnPop">
            <div class="btnpopBox">
                <div v-show="index === noticeIndex" v-for="(notice,index) in noticeData" :key="index" class="btnpopContent">
                    <div class="tit">{{notice.title}}</div>
                    <div class="content">{{notice.content}}</div>
                    <div class="time">{{notice.createtime | filterDate('YYYY年MM月D日')}}</div>
                    <div @click="nextNotice(noticeIndex)" class="halfBtn next">下一条</div>
                </div>
                <div @click="closeadv()" class="halfBtn close">取消</div>
            </div>
            <div class="box-mask"></div>
        </div>
    </div>
</template>

<script>
    import Header from "../../components/Header";
    import Redbag from "../../components/RedBag";
    import AllGameList from "./AllGameList";
    // const notice = proto.pb;
    import {
        getNotice
    } from '@/api/index'
    export default {
        components: {
            Header,
            Redbag,
            AllGameList
        },
        name: "games",
        created(){
            this.getNotice()
        },
        data (){
            return{
                bagSwitch:sessionStorage.getItem('bag')*1,
                gamepic:require("../../assets/img/game.png"),
                selected: 0,
                tabNumb: 0,
                dianziGame: this.$route.query.id,
                noticeData: [], //公告列表
                noticePop:false,
                noticeIndex:0,
            }
        },
        methods:{
            tab(index){
                this.tabNumb = index;
            },
            navTabs(){
                this.tabNumb = 0
            },
            getNotice() { //获取公告
                getNotice(-1, -1, 0).then(res => {
                    console.log(res)
                    this.noticeData = res.notice;
                }).catch(err => {});
            },
            nextNotice(index){
                if (this.noticeData.length == index+1){
                    this.$toast("最后一条");
                } else {
                    this.noticeIndex = index+1
                }

            },
            closeadv() {
                this.noticePop = !this.noticePop
                this.noticeIndex = 0
            },
        }
    }
</script>

<style lang="less" scoped>
    @import url("../../components/less/common.less");
    .games{
        padding-top: 1.22667rem /* 92/75 */;
        // .notive{
        //     position: relative;
        //     padding: 0 0.4rem;
        //     height: 0.8rem;
        //     background-color: @color-252232;
        //     .icon{
        //         z-index: 1;
        //         position: absolute;
        //         left: 0.4rem;
        //         top: 0;
        //         width: 0.8rem;
        //         height: 0.8rem;
        //         text-align: center;
        //         line-height: 0.8rem;
        //         font-size: 0.453rem;
        //         color: @color-green;
        //         background-color: @color-252232;
        //     }
        //     marquee{
        //         height: 0.8rem;
        //         line-height: 0.8rem;
        //         font-size: 0.347rem;
        //         color: @color-green;
        //     }
        // }
        .notive{
        position: relative;
        padding: 0 0.4rem;
        height: 0.973rem;
        background-color: @color-252232;
        border-bottom: 1px solid rgba(167,163,229,0.4);
        border-top: 1px solid rgba(167,163,229,0.4);
        .icon{
            z-index: 1;
            position: absolute;
            left: 0;
            top: 0;
            width: 0.973rem;
            height: 0.973rem;
            text-align: center;
            line-height: 0.973rem;
            font-size: 0.5rem;
            color: @color-a7a3e5;
            background-color: @color-252232;
        }
        marquee{
            height: 0.973rem;
            line-height: 0.973rem;
            font-size: 0.347rem;
            color: @color-a7a3e5;
            .noticeText{
                display: inline-block;
                margin-right: 1rem;
            }
        }
    }

    }
    .twoBtnPop{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        width: 100%;
        height: 100%;
        .btnpopBox{
            z-index: 999;
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            overflow: hidden;
            width: 9.2rem;
            margin: 0 auto;
            border-radius: 0.267rem;
            background-color: #fff;
            color: @color-green;
            .btnpopContent{
                .tit{
                    height: 1.06667rem;
                    line-height: 1.06667rem;
                    font-size: 0.427rem;
                    text-align: center;
                    color: @color-323233;
                }
                .content{
                    padding: 0 0.2667rem;
                    line-height: 0.56rem;
                    font-size: 0.373rem;
                    color: @color-646466;
                }
                .time{
                    padding-right: 0.2667rem;
                    text-align: right;
                    line-height: 1.06667rem;
                    color: @color-969699;
                }
            }
            .halfBtn{
                float: right;
                width: 50%;
            }
            .close,.next{
                height: 1.06667rem;;
                line-height: 1.06667rem;;
                text-align: center;
                color: @color-323233;
                border-top: 1px solid @color-c8c8cc;
            }
            .next{
                background-color: @color-green;
                color: #fff;
            }
        }
    }
    .box-mask {
        z-index: 998;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .4);
    }
</style>
