<template>
    <div class="backCommission">
        <Header rooter="-1" title="返佣" :hasNoBack="true" iFontsize=".58667rem" :isShowHome="false"></Header>
        <!-- 查看返佣比例弹框 -->
        <div v-show="isShowBackCommissionMask" class="copy-writer-details-mask" @touchmove.self.prevent></div>
        <div v-show="isShowBackCommissionMask" class="copy-writer-details-box">
            <div class="details-title pk-1px-b">
                <span>返佣比例</span>
                <span @click="isShowBackCommissionMask = false;"><i class="iconfont icon-sykszz-close"></i> </span>
            </div>
            <div class="details-content">
                <dl>
                    <dt v-show="index==0" v-for="(item,index) in infoList" :key="index" class="pk-1px-b">
                            <span>{{item.name}}</span>                       
                            <span v-for="(item2,index2) in item.child" :key="index2">{{item2.validMoney}}</span>                        
                        </dt>
                    <div class="scorll-list">
                        <dd v-show="index!=0" v-for="(item,index) in infoList" :key="index" class="pk-1px-b">
                            <span>{{item.name}}</span>
                            <span v-for="(item2,index2) in item.child" :key="index2">{{item2.rate}}%</span>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    
        <div class="content">
            <div v-show="list.length>0" class="content-fixed">
                <div class="backCommission-top">
                    <div class="backCommission-top-box">
                        <p>推广越多，返佣越多！</p>
                        <h2>您已推广<span>{{spreadNum}}</span>人，</h2>
                        <h2>累计获得<span>{{spreadMoney}}</span>元返佣！</h2>
                        <button @click="goSpread">我要推广</button>
                        <button class="look" @click="isShowBackCommissionMask = true">查看返佣比例</button>
                    </div>
                </div>
                <div class="backCommission-list">
                    <div class="title">返佣历史</div>
                    <dl>
                        <dt class="pk-1px-b">
                                <span>有效打码</span>
                                <span>返佣金额</span>
                            </dt>
    
                    </dl>
                </div>
            </div>
            <div v-show="list.length>0" class="page-loadmore">
                <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                    <pk-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :top-all-loaded="topAllLoaded" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore" :stop-translate="stopTranslate">
                        <ul>
                            <li v-for="(item,index) in list" :key="index" class="pk-1px-b">
                                <h2>
                                    <span>{{item.validBet}}</span>
                                    <span>{{item.rebate}}</span>
                                </h2>
                                <p>
                                    <span></span>
                                    <span>{{item.createTime | filterDate}}</span>
                                </p>
                            </li>
                        </ul>
                        <div class="nodata" v-show="hasData">我是有底线的</div>
    
                    </pk-loadmore>
                </div>
            </div>
    
            <div v-show="list.length<=0" class="no-data">
                <div class="no-data-box">
                    <i class="iconfont icon-list-zanwusj"></i>
                    <p>您暂时还未获得返佣哦~</p>
                    <p>推广越多，返佣越多！</p>
                    <button @click="goSpread">我要推广</button>
                    <button class="look" @click="isShowBackCommissionMask = true">查看返佣比例</button>
                </div>
            </div>
    
        </div>
    </div>
</template>

<script>
    import pkLoadmore from '@/components/Loadmore'
    import Header from '@/components/Header'
    import func from '@/api/purse'
    import funcOther from '@/api/my'

    export default {
        name: 'backCommission',
        components: {
            Header,
            pkLoadmore
        },
        mounted() {
            this.getList();
            this.getMember();
        },
        watch: {
            isShowBackCommissionMask(newVal, oldVal) {
                if (newVal) {
                    this.ModalHelper.open();
                } else {
                    this.ModalHelper.close();
                }
            }
        },
        data() {
            return {
                isShowBackCommissionMask: false,
    
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
                spreadNum: 0,
                spreadMoney: 0,
                infoList: [],
                isShow: {},
            }
        },
        methods: {
            getList(t) {
                let postData = {
                    page: this.page,
                    pageSize: this.pageSize,
                }
                func.getBackCommission(postData).then((res) => {
                    // console.log(res)
                    this.spreadNum = res.spreadNum;
                    this.spreadMoney = res.spreadMoney;
                    this.totalNum = res.totalNum;
                    this.infoList = res.protion;
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
            //是否开启自助返水和推广
            getMember() {
                funcOther.getMemberCenter().then((res) => {
                    this.isShow = res.switch;
                }).catch(err => {
                    this.$toast({
                        message: err,
                        duration: 2000
                    });
                });
            },
            //是否开启我要推广
            goSpread() {
                if (this.isShow.isSpread) {
                    this.$router.push({
                        name: "spread"
                    });
                } else {
                    this.$toast({
                        message: '推广未开启',
                        duration: 2000
                    });
                }
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
        padding: 0 .4rem/* 30/75 */
        ;
        position: fixed;
        top: 1.22667rem/* 92/75 */
        ;
        left: 0;
        right: 0;
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
        .content-fixed {
            position: fixed;
            width: 100%;
            top: 1.22667rem/* 92/75 */
            ;
            left: 0;
            right: 0;
        }
        .backCommission-top {
            height: 3.81333rem/* 286/75 */
            ;
            background-image: linear-gradient(#252232, #252232), linear-gradient( #f2f4fa, #f2f4fa);
            background-blend-mode: normal, normal;
            padding: 0 .4rem/* 30/75 */
            ;
            padding-top: .66667rem/* 50/75 */
            ;
            box-sizing: border-box;
            .backCommission-top-box {
                background: #fff;
                border-radius: .13333rem/* 10/75 */
                ;
                padding: .53333rem/* 40/75 */
                1.06667rem/* 80/75 */
                ;
                box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.06);
                text-align: center;
                p {
                    font-size: .32rem/* 24/75 */
                    ;
                    color: @color-323233;
                    margin-bottom: .4rem/* 30/75 */
                    ;
                    position: relative;
                    &::after {
                        content: "";
                        display: block;
                        width: 20%;
                        height: 1px;
                        background: @color-c8c8cc;
                        position: absolute;
                        top: 50%;
                        right: -10%;
                        transform: translate(-50%) scaleY(0.5);
                    }
                    &::before {
                        content: "";
                        display: block;
                        width: 20%;
                        height: 1px;
                        background: @color-c8c8cc;
                        position: absolute;
                        top: 50%;
                        left: 10%;
                        transform: translate(-50%) scaleY(0.5);
                    }
                }
                h2 {
                    font-size: .37333rem/* 28/75 */
                    ;
                    color: @color-323233;
                    font-weight: normal;
                    line-height: 1.5;
                    span {
                        color: @color-green;
                        font-size: .48rem/* 36/75 */
                        ;
                        font-weight: bold;
                    }
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
                    margin-top: .26667rem/* 20/75 */
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
        .backCommission-list {
            margin-top: 3.06667rem/* 230/75 */
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
            dl {
                padding: 0 .4rem/* 30/75 */
                ;
                background: #fff;
                dt {
                    display: flex;
                    justify-content: space-between;
                    padding: .37333rem/* 28/75 */
                    0;
                    span {
                        font-size: .37333rem/* 28/75 */
                        ;
                        color: @color-333;
                    }
                }
            }
        }
        .page-loadmore {
            position: fixed;
            top: 10.28rem/* 771/75 */
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