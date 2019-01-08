<template>
    <div class="record">
        <!-- 选择方式 -->
        <mt-popup :closeOnClickModal="true" :position="'bottom'" v-model="popupVisible" style="width: 100%;z-index: 2003;">
            <div class="popup-title pk-1px-b">
                <span @click="cancel()">取消</span>
                <span @click="sure()">确定</span>
            </div>
            <mt-picker valueKey="name" :itemHeight="itemHeight" :slots="slots" @change="onValuesChange"></mt-picker>
        </mt-popup>

        <!-- 选择时间 -->
        <mt-popup :closeOnClickModal="true" :position="'bottom'" v-model="popupVisibleTime" style="width: 100%;z-index: 2003;">
            <div class="popup-title pk-1px-b">
                <span @click="cancel()">取消</span>
                <span @click="sure()">确定</span>
            </div>
            <mt-picker valueKey="name" :itemHeight="itemHeight" :slots="slotsTime" @change="onValuesChangeTime"></mt-picker>
        </mt-popup>

        <Header rooter="-1" :title="title" :hasNoBack="true" iFontsize=".58667rem"></Header>

        <div v-show="showModal" class="mask" @touchmove.self.prevent></div>
        <div v-show="showModal" class="mask-box">
            <ul>
                <li  v-for="(item,index) in modalData" :key="index">
                    <span>{{item.name}}：</span>
                    <span>{{item.value}}</span>
                </li>
            </ul>
            <div class="close pk-1px-t" @click="showModal = false;">关闭</div>
        </div>

        <div class="content">
            <div class="content-fixed">
                <div class="title">
                    <p>
                        <span>方式</span>
                        <button @click="popupVisible = true">{{chooseTypeShow.name}}</button>
                    </p>
                    <p>
                        <span>时间</span>
                        <button @click="popupVisibleTime = true">{{chooseTimeShow.name}}</button>
                    </p>
                </div>
                <div class="list" v-show="list&&list.length>0">
                    <dl>
                        <!-- 公司存款 -->
                        <dt v-show="chooseTypeShow.value===1" class="pk-1px-b">
                                    <span>公司存款</span>
                                    <span>存款金额</span>
                                    <span>存款进度</span>
                                </dt>

                        <!-- 线上存款 -->
                        <dt v-show="chooseTypeShow.value===2" class="pk-1px-b">
                                    <span>线上存款</span>
                                    <span>存款金额</span>
                                    <span>存款进度</span>
                                </dt>

                        <!-- 取款 -->
                        <dt v-show="chooseTypeShow.value===3" class="pk-1px-b">
                                    <span>取款金额</span>
                                    <span>取款进度</span>
                                </dt>

                        <!-- 额度转换 -->
                        <dt v-show="chooseTypeShow.value===4" class="pk-1px-b">
                                    <span>额度转换</span>
                                    <span>转换金额</span>
                                </dt>
                    </dl>
                </div>
            </div>




            <div class="page-loadmore">
                <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                    <pk-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :top-all-loaded="topAllLoaded" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore" :stop-translate="stopTranslate">

                        <ul>
                            <!-- 公司存款 -->
                            <li @click="handleModalShow(item)" v-if="chooseTypeShow.value===1" :class="{'pk-1px-b':index!=list.length-1}" v-for="(item,index) in list" :key="index">
                                <h2>
                                    <span>{{item.bankName}}</span>
                                    <span>{{item.depositMoney}}(优惠{{item.depositDiscount}})</span>
                                    <span class="fail" :class="{'inHand':item.status=== 1,'success':item.status=== 2}">
                                        <!-- 1处理中 2成功 3失败 -->
                                        {{item.status===1 ?'处理中':item.status===2?'成功':'失败'}}
                                    </span>
                                </h2>
                                <p>
                                    <span>订单号：{{item.orderId}}</span>
                                    <span>{{item.depositTime | filterDate('MM-DD HH:mm')}}</span>
                                </p>
                            </li>


                            <!-- 线上存款 -->
                            <li @click="handleModalShow(item)" v-if="chooseTypeShow.value===2" :class="{'pk-1px-b':index!=list.length-1}" v-for="(item,index) in list" :key="index">
                                <h2>
                                    <span>{{item.depositInstitution}}</span>
                                    <span>{{item.amountDeposit}}(优惠{{item.otherDepositDiscount}})</span>
                                    <span class="fail" :class="{'inHand':item.status=== 1,'success':item.status=== 2}">
                                        <!-- 1处理中 2成功 3失败 -->
                                        {{item.status===1 ?'处理中':item.status===2?'成功':'失败'}}
                                    </span>

                                </h2>
                                <p>
                                    <span>订单号：{{item.orderId}}</span>
                                    <span>{{item.thirdPayTime | filterDate('MM-DD HH:mm')}}</span>
                                </p>
                            </li>


                            <!-- 取款 -->
                            <li @click="handleModalShow(item)" v-if="chooseTypeShow.value===3" :class="{'pk-1px-b':index!=list.length-1}" v-for="(item,index) in list" :key="index">
                                <h2>
                                    <span>{{item.outwardMoney}}(费用{{item.feeMoney}})</span>
                                    <span class="fail" :class="{'inHand':item.status=== 1 || item.status=== 3 || item.status=== 6,'success':item.status=== 2}">
                                        <!-- 1待审核2已出款3预备出款4取消出款5拒绝出款6满足自动出款 -->
                                        {{item.status===1 || item.status=== 3 || item.status=== 6?'处理中':item.status===2?'成功':'失败'}}
                                    </span>
                                </h2>
                                <p>
                                    <span>订单号：{{item.orderId}}</span>
                                    <span>{{item.createTime | filterDate('MM-DD HH:mm')}}</span>
                                </p>
                            </li>

                            <!-- 额度转换 -->
                            <li v-if="chooseTypeShow.value===4" :class="{'pk-1px-b':index!=list.length-1}" v-for="(item,index) in list" :key="index">
                                <h2>
                                    <span v-show="item.doType === 2">系统转入{{item.memberConversion}}</span>
                                    <span v-show="item.doType === 1">{{item.memberConversion}}转出系统</span>

                                    <span v-show="item.doType === 2" class="fail">-{{item.doMoney}}</span>
                                    <span v-show="item.doType === 1" class="success">+{{item.doMoney}}</span>

                                </h2>
                                <p>
                                    <span>订单号：{{item.orderId}}</span>
                                    <span>{{item.createTime | filterDate('MM-DD HH:mm')}}</span>
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
                    <p>暂无数据哦~~</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '@/components/Header'
    import pkLoadmore from '@/components/Loadmore'
    import func from '@/api/purse'

    export default {
        name: 'depositRecord',
        components: {
            Header,
            pkLoadmore
        },
        mounted() {
            if (this.$route.query.fromType == 1) { //公司入款
                this.chooseTypeShow = this.slots[0].values[0];
                this.slots[0].defaultIndex = 0;

            } else if (this.$route.query.fromType == 2) { //线上入款
                this.chooseTypeShow = this.slots[0].values[1];
                this.slots[0].defaultIndex = 1;

            } else if (this.$route.query.fromType == 3) { //取款
                this.chooseTypeShow = this.slots[0].values[2];
                this.slots[0].defaultIndex = 2;

            } else { //额度转换
                this.chooseTypeShow = this.slots[0].values[3];
                this.slots[0].defaultIndex = 3;
            }
            this.title = this.chooseTypeShow.name + '记录';
            this.slotsTime[0].defaultIndex = 1;
            this.chooseTimeShow = this.slotsTime[0].values[1];
            this.getList();
        },
        data() {
            return {
                title: '公司存款记录',
                popupVisible: false,
                popupVisibleTime: false,
                itemHeight: parseInt(this.HTML_FONT_SIZE * 1.06667),
                stopTranslate: parseInt(this.HTML_FONT_SIZE * 1.6),
                hasData: false,

                slots: [{
                    flex: 1,
                    values: [{
                            value: 1,
                            name: '公司存款'
                        },
                        {
                            value: 2,
                            name: '线上存款'
                        },
                        {
                            value: 3,
                            name: '取款'
                        },
                        {
                            value: 4,
                            name: '额度转换'
                        },

                    ],
                    defaultIndex: 0,
                    textAlign: 'center'
                }],
                slotsTime: [{
                    flex: 1,
                    values: [{
                            value: 1,
                            name: '最近两小时'
                        },
                        {
                            value: 2,
                            name: '今天'
                        },
                        {
                            value: 3,
                            name: '最近一周'
                        },
                        {
                            value: 4,
                            name: '最近一个月'
                        },
                    ],
                    defaultIndex: 1,
                    textAlign: 'center'
                }],
                chooseType: {},
                chooseTypeShow: {},
                chooseTime: {},
                chooseTimeShow: {},

                allLoaded: false,
                topAllLoaded:false,
                topStatus: '',
                bottomStatus: '',
                wrapperHeight: 0,
                nodata: false,

                page: 1, //当前页数
                pageSize: 10, //每页请求的条数
                totalNum: 0, //总页数
                list: [],
                modalData: [],
                showModal: false,

            }
        },
        methods: {
            onValuesChange(picker, values) {
                this.chooseType = values[0];
            },
            onValuesChangeTime(picker, values) {
                this.chooseTime = values[0];
            },
            cancel() {
                this.popupVisible = false;
                this.popupVisibleTime = false;
                this.hasData = false;//解决我是有底线和暂无数据同时显示
            },
            sure() {
                this.popupVisible = false;
                this.popupVisibleTime = false;
                this.chooseTypeShow = this.chooseType;
                this.chooseTimeShow = this.chooseTime;
                this.title = this.chooseTypeShow.name + '记录';
                this.page = 1;
                this.list = [];
                this.getList();
                this.nodata = false;
                this.allLoaded = false;
                this.hasData = false;//解决我是有底线和暂无数据同时显示

            },
            getList(t) {
                let postData = {
                    pageParams:{
                        page: this.page,
                        pageSize: this.pageSize,
                    },
                    orderType: this.chooseTypeShow.value,
                    timeType: this.chooseTimeShow.value,
                }
                func.getRecord(postData).then((res) => {
                    console.log('res',res)
                    let result = [];
                    this.totalNum = res.totalNum;
                    switch (this.chooseTypeShow.value) {
                        case 1: //公司入款
                            result = res.memberCompanyIncomeResp;
                            break;
                        case 2: //线上入款
                            result = res.memberOnlineIncomeResp;
                            break;
                        case 3: //取款
                            result = res.memberOutRecordResp;
                            break;
                        case 4: //额度转换
                            result = res.memberConversionResp;
                            break;
                    }
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
                    this.$nextTick(()=>{
                        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
                    })
                    if (t === 1) {
                        this.$toast({
                            message: '刷新成功',
                            duration: 2000
                        })
                    }
                }).catch(err => {
                    this.$toast({
                        message: err,
                        duration: 2000
                    });
                });
            },
            handleModalShow(item) {
                this.showModal = true;
                if (this.chooseTypeShow.value === 1) { //公司入款
                    this.modalData = [{
                            name: '订单号',
                            value: item.orderId
                        },
                        {
                            name: '存入机构',
                            value: item.bankName
                        },
                        {
                            name: '存款人',
                            value: item.depositName
                        },
                        {
                            name: '存款账号',
                            value: item.depositAccount
                        },
                        {
                            name: '收款账号',
                            value: item.bankNum
                        },
                        {
                            name: '存入金额',
                            value: item.depositMoney
                        },
                        {
                            name: '存款优惠',
                            value: item.depositDiscount
                        },
                        {
                            name: '额外优惠',
                            value: item.otherDiscount
                        },
                        {
                            name: '存款时间',
                            value: this.filterDate(item.depositTime)
                        },
                        {
                            name: '提交时间',
                            value: this.filterDate(item.updateTime)
                        },
                        {
                            name: '状态',
                            value: item.status === 1 ? '处理中' : item.status === 2 ? '成功' : '失败'
                        },
                    ]
                } else if (this.chooseTypeShow.value === 2) { //线上入款
                    this.modalData = [{
                            name: '订单号',
                            value: item.orderId
                        },
                        {
                            name: '存入机构',
                            value: item.depositInstitution
                        },
                        {
                            name: '存入金额',
                            value: item.amountDeposit
                        },
                        {
                            name: '存款优惠',
                            value: item.depositDiscount
                        },
                        {
                            name: '额外优惠',
                            value: item.otherDepositDiscount
                        },
                        {
                            name: '存款时间',
                            value: this.filterDate(item.thirdPayTime)
                        },
                        {
                            name: '状态',
                            value: item.status === 1 ? '处理中' : item.status === 2 ? '成功' : '失败'
                        },
                    ]

                } else if (this.chooseTypeShow.value === 3) { //取款
                    this.modalData = [{
                            name: '订单号',
                            value: item.orderId
                        },
                        {
                            name: '提出额度',
                            value: item.doMoney?item.doMoney:0
                        },
                        {
                            name: '费用',
                            value: item.feeMoney?item.feeMoney:0
                        },
                        {
                            name: '取款金额',
                            value: item.outwardMoney?item.outwardMoney:0
                        },
                        {
                            name: '取款时间',
                            value: this.filterDate(item.createTime)
                        },
                        {
                            name: '状态',
                            value: item.status === 1 || item.status === 3 || item.status === 6 ? '处理中' : item.status === 2 ? '成功' : '失败'
                        },
                    ]
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
            z-index: 1;
        }
        .title {
            display: flex;
            align-items: center;
            height: 1.06667rem/* 80/75 */
            ;
            background: #fff;
            padding-left: .4rem/* 30/75 */
            ;
            p {
                display: inline-block;
                span {
                    font-size: .37333rem/* 28/75 */
                    ;
                    color: @color-green;
                }
                button {
                    margin-left: .13333rem/* 10/75 */
                    ;
                    color: @color-green;
                    border: 1px solid @color-green;
                    padding: .08rem/* 6/75 */
                    .26667rem/* 20/75 */
                    ;
                    background: #fff;
                    border-radius: .13333rem/* 10/75 */
                    ;
                    font-size: .32rem/* 24/75 */
                    ;
                }
                &:last-child {
                    margin-left: .57333rem/* 43/75 */
                    ;
                    button {
                        padding: .08rem/* 6/75 */
                        .6rem/* 45/75 */
                        ;
                    }
                }
            }
        }
        .list {
            margin-top: .26667rem/* 20/75 */
            ;
            dl {
                padding: 0 .4rem/* 30/75 */
                ;
                background: #fff;
                dt {
                    display: flex;
                    justify-content: space-between;
                    padding: .32rem/* 24/75 */
                    0;
                    span {
                        font-size: .42667rem/* 32/75 */
                        ;
                        color: @color-323233;
                    }
                }
            }
        }
        .page-loadmore {
            position: fixed;
            top: 3.62667rem/* 272/75 */
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
                        span {
                            font-size: .37333rem/* 28/75 */
                            ;
                            color: @color-323233;
                            &.inHand {
                                color: @color-8a9994;
                            }
                            &.success {
                                color: @color-green;
                            }
                            &.fail {
                                color: @color-8976cc;
                            }
                        }
                    }
                    p {
                        margin-top: .26667rem/* 20/75 */
                        ;
                        display: flex;
                        justify-content: space-between;
                        span {
                            font-size: .32rem/* 24/75 */
                            ;
                            color: @color-969699;
                        }
                    }
                }
            }
        }
    }

    .mask {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #000;
        opacity: .4;
        z-index: 2;
    }

    .mask-box {
        position: fixed;
        z-index: 3;
        top: 50%;
        transform: translateY(-50%);
        padding: 0 .4rem/* 30/75 */
        ;
        width: 92%;
        opacity: 1;
        ul {
            background: #fff;
            border-radius: .13333rem/* 10/75 */
            .13333rem/* 10/75 */
            0 0;
            padding: .4rem/* 30/75 */
            ;
            max-height: 6rem/* 450/75 */
            ;
            overflow: auto;
            li {
                font-size: .37333rem/* 28/75 */
                ;
                color: @color-323233;
                line-height: 1.5;
                display: flex;
                justify-content: space-between;
                span {
                    flex: 7.5;
                    &:first-child {
                        flex: 2.5;
                        text-align: right;
                    }
                }
            }
        }
        .close {
            background: #fff;
            border-radius: 0 0 .13333rem/* 10/75 */
            .13333rem/* 10/75 */
            ;
            line-height: 1.06667rem/* 80/75 */
            ;
            text-align: center;
            color: @color-646466;
            font-size: .32rem/* 24/75 */
            ;
        }
    }
</style>
