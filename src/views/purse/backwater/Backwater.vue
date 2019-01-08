<template>
    <div>
        <Header rooter="-1" title="自助返水" :hasNoBack="true" iFontsize=".58667rem"></Header>
        <!-- 查看返水详情弹框 -->
        <div v-show="isShowBackwaterMask" class="copy-writer-details-mask" @touchmove.self.prevent></div>
        <div v-show="isShowBackwaterMask" class="copy-writer-details-box">
            <div class="details-title pk-1px-b">
                <span>返水详情</span>
                <span @click="isShowBackwaterMask = false;"><i class="iconfont icon-sykszz-close"></i> </span>
            </div>
            <div class="details-content">
                <dl>
                    <dt class="pk-1px-b">
                            <span>游戏名称</span>
                            <span>有效打码</span>
                            <span>返水金额</span>
                        </dt>
                    <div class="scorll-list">
                        <dd v-for="(item,index) in infoData.list" :key="index" class="pk-1px-b">
                            <span>{{item.platformName}}</span>
                            <span>{{item.betall}}</span>
                            <span>{{item.money}}</span>
                        </dd>
                    </div>
    
                </dl>
            </div>
        </div>
    
    
        <div class="content">
            <div class="content-fixed" v-show="infoData.betall>0">
                <div class="backwater-top">
                    <ul>
                        <li>
                            <h2>有效打码</h2>
                            <p>{{infoData.betall}}</p>
                        </li>
                        <li>
                            <h2>返水金额</h2>
                            <p>{{infoData.allMoney}}</p>
                        </li>
                    </ul>
                    <div class="backwater-top-btn">
                        <!-- <div v-show="isShowBackWaterMoney" class="look" @click="isShowBackwaterMask = true">点击查看返水详情</div> -->
                        <div class="btn">
                            <button @click="getBackWaterInfo()">查看返水额</button>
                            <button :disabled="infoData.status === 2" @click="handleBackWater">领取返水</button>
                        </div>
    
                    </div>
                </div>
                <div v-show="list.length>0" class="backwater-list">
                    <div class="title">自助返水历史</div>
                    <div class="total pk-1px-b">
                        <p>当日已返水：<span>{{today}}</span></p>
                        <p>本周返水额：<span>{{week}}</span></p>
                    </div>
                    <dl>
                        <dt class="pk-1px-b">
                                <span>有效打码</span>
                                <span>返水金额</span>
                            </dt>
                    </dl>
                </div>
            </div>
    
            <div v-show="infoData.betall>0" class="page-loadmore">
                <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                    <pk-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :top-all-loaded="topAllLoaded" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore" :stop-translate="stopTranslate">
                        <ul>
                            <li v-for="(item,index) in list" :key="index" class="pk-1px-b">
                                <h2>
                                    <span>{{item.betall}}</span>
                                    <span>{{item.rebateWater}}</span>
                                </h2>
                                <p>
                                    <span>订单号：{{item.orderId}}</span>
                                    <span>{{item.createTime | filterDate}}</span>
                                </p>
                            </li>
                        </ul>
                        <div class="nodata" v-show="hasData">我是有底线的</div>
                    </pk-loadmore>
                </div>
            </div>
    
            <div v-show="infoData.betall<=0" class="no-data">
                <div class="no-data-box">
                    <i class="iconfont icon-list-zanwusj"></i>
                    <p>您暂时还未获得返水哦~~</p>
                    <button>去投注，获得返水！</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import pkLoadmore from '@/components/Loadmore'
    import Header from '@/components/Header'
    import func from '@/api/purse'
    export default {
        name: 'backwater',
        components: {
            Header,
            pkLoadmore
        },
        mounted() {
            this.getBackWaterInfo(1);
            this.getList();
        },
        watch: {
            isShowBackwaterMask(newVal, oldVal) {
                if (newVal) {
                    this.ModalHelper.open();
                } else {
                    this.ModalHelper.close();
                }
            }
        },
        data() {
            return {
                isShowBackwaterMask: false,
    
                allLoaded: false,
                topAllLoaded:false,
                topStatus: '',
                bottomStatus: '',
                wrapperHeight: 0,
                stopTranslate: parseInt(this.HTML_FONT_SIZE * 1.6),
                hasData: false,
    
                page: 1, //当前页数
                pageSize: 10, //每页请求的条数
                totalNum: 0, //总页数
                list: [],
                infoData: {},
                today: 0,
                week: 0,
    
    
            }
        },
        methods: {
            //获取返水列表
            getList(t) {
                let postData = {
                    pageParams:{
                        page: this.page,
                        pageSize: this.pageSize
                    }
                }
                func.getBackWaterList(postData).then(res => {
                    // console.log(res)
                    this.today = res.today;
                    this.week = res.week;
                    this.totalNum = res.totalNum;
                    let result = res.list;
                    if (this.page === 1) {
                        this.list = result;
                        if(this.totalNum < this.page * this.pageSize){
                            this.allLoaded = true;
                            this.topAllLoaded = true;
                        }else {
                            this.allLoaded = false;
                            this.topAllLoaded = false;
                        }
                    } else {
                        this.list = this.list.concat(result);
                        this.topAllLoaded = false;
                    }
                    if (t === 1) {
                        this.$toast({
                            message: '刷新成功',
                            duration: 2000
                        })
                    }
                    this.$nextTick(() => {
                        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
                    })
                }).catch(err =>{
                    this.$toast({
                        message: err,
                        duration: 2000
                    })
                })
            },
            //获取返水金额以及是否能返水
            getBackWaterInfo(t) {
                func.getBackWaterInfo().then(res => {
                    // console.log(res)
                    this.infoData = res;
                    if(!t){
                        this.isShowBackwaterMask = true;
                    }
                }).catch(err =>{
                    this.$toast({
                        message: err,
                        duration: 2000
                    })
                })
            },
            //领取返水
            handleBackWater() {
                func.getBackWater().then(res => {
                    this.$toast({
                        message: '领取成功',
                        duration: 2000
                    });
                    this.getBackWaterInfo();
                }).catch(err =>{
                    this.$toast({
                        message: err,
                        duration: 2000
                    })
                })
            },
            //下拉刷新
            handleTopChange(status) {
                this.topStatus = status;
            },
            loadTop() {
                this.page = 1;
                this.hasData = false;
                setTimeout(() => {
                    this.getList(1);
                    this.$refs.loadmore.onTopLoaded();
                    this.allLoaded = false;
                }, 1500);
            },
            //mint-ui 上拉加载
            handleBottomChange(status) {
                this.bottomStatus = status;
            },
            loadBottom() {
                this.page += 1;
                this.hasData = false;
                setTimeout(() => {
                    this.getList();
                    this.$refs.loadmore.onBottomLoaded();
                    if (this.page * this.pageSize >= this.totalNum) {
                        this.allLoaded = true; //所有数据加载完成
                        this.hasData = true;
                        this.topAllLoaded = false;
                    }
                }, 1500);
            },
        }
    
    }
</script>

<style lang="less" scoped>
    @import url('../../../components/less/common.less');
    .no-data {
        padding: 0 .4rem/* 30/75 */;
       .no-data-box {
            margin-top: 2.13333rem/* 160/75 */;
            text-align: center;
            i{
                font-size: 2.53333rem /* 190/75 */;
                color: @color-8976cc;
                opacity: .6;
            }
            p {
                text-align: center;
                font-size: .42667rem/* 32/75 */
                ;
                color: @color-8976cc;
                margin-top: .26667rem/* 20/75 */
                ;
            }
            button {
                width: 100%;
                height: 1.06667rem/* 80/75 */
                ;
                line-height: 1.06667rem/* 80/75 */
                ;
                color: #fff;
                text-align: center;
                border: none;
                border-radius: .13333rem/* 10/75 */
                ;
                font-size: .37333rem/* 28/75 */
                ;
                background: @color-green;
                box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.12);
                margin-top: .53333rem/* 40/75 */
                ;
                &:active {
                    background: @color-00cc8f;
                }
            }
            button.look {
                margin-top: .4rem/* 30/75 */
                ;
                background: #fff;
                border: 1px solid @color-green;
                color: @color-green;
            }
        }
    }
    
    .content {
        padding-top: 1.22667rem /* 92/75 */;
        .content-fixed {
            position: fixed;
            width: 100%;
            top: 1.22667rem/* 92/75 */
            ;
            left: 0;
            right: 0;
        }
        .backwater-top {
            position: relative;
            ul {
                background: @color-252232;
                display: flex;
                justify-content: space-around;
                text-align: center;
                height: 3.41333rem/* 256/75 */
                ;
                padding-top: .74667rem/* 56/75 */
                ;
                li {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    h2 {
                        font-size: .4rem/* 30/75 */
                        ;
                        color: #fff;
                        font-weight: normal;
                    }
                    p {
                        margin-top: .44rem/* 33/75 */
                        ;
                        font-size: .48rem/* 36/75 */
                        ;
                        color: @color-green;
                    }
                }
            }
            .backwater-top-btn {
                position: absolute;
                bottom: -.53333rem/* 40/75 */
                ;
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                .look {
                    font-size: .37333rem/* 28/75 */
                    ;
                    color: @color-8976cc;
                    text-align: center;
                    margin-bottom: .4rem/* 30/75 */
                    ;
                }
                .btn {
                    display: flex;
                    justify-content: space-around;
                    button {
                        width: 3.2rem/* 240/75 */
                        ;
                        height: 1.06667rem/* 80/75 */
                        ;
                        ;
                        line-height: 1.06667rem/* 80/75 */
                        ;
                        font-size: .37333rem/* 28/75 */
                        ;
                        border-radius: .13333rem/* 10/75 */
                        ;
                        border: none;
                        background: @color-green;
                        color: @color-252232;
                        box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.12);
                        &:last-child {
                            color: #fff;
                        }
                        &:disabled {
                            background: @color-add9cc;
                            box-shadow: none;
                            color: @color-c8c8cc;
                        }
                    }
                }
            }
        }
        .backwater-list {
            margin-top: .53333rem/* 40/75 */
            ;
            .title {
                line-height: 1.06667rem/* 80/75 */
                ;
                padding-left: .4rem/* 30/75 */
                ;
                font-size: .42667rem/* 32/75 */
                ;
                color: @color-323233;
            }
            .total {
                background: #fff;
                padding: 0 .4rem/* 30/75 */
                ;
                height: 1.06667rem/* 80/75 */
                ;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p {
                    font-size: .37333rem/* 28/75 */
                    ;
                    color: @color-646466;
                    span {
                        color: @color-green;
                        font-weight: bold;
                    }
                }
            }
            dl {
                background: #fff;
                padding: 0 .4rem/* 30/75 */
                ;
                dt {
                    padding: .33333rem/* 25/75 */
                    0;
                    display: flex;
                    justify-content: space-between;
                    font-size: .42667rem/* 32/75 */
                    ;
                    color: @color-323233;
                    font-weight: bold;
                }
            }
        }
        .page-loadmore {
            position: fixed;
            top: 9.14667rem/* 686/75 */
            ;
            left: 0;
            right: 0;
            ul {
                background: #fff;
                padding: 0 .4rem/* 30/75 */
                ;
                li {
                    padding: .33333rem/* 25/75 */
                    0;
                    h2 {
                        display: flex;
                        justify-content: space-between;
                        color: @color-323233;
                        font-size: .37333rem/* 28/75 */
                        ;
                        font-weight: bold;
                    }
                    p {
                        display: flex;
                        justify-content: space-between;
                        color: @color-969699;
                        margin-top: .26667rem/* 20/75 */
                        ;
                        font-size: .32rem/* 24/75 */
                        ;
                    }
                }
            }
        }
    }
</style>