<template>
    <div id="passwordmge">
        <F-header :title="title" :rooter="rooter" :hasNoBack="hasNoBack" :isShowHome="false"></F-header>
        <div class="hasbox"></div>
        <div class="hasmenu">
    
            <mt-navbar v-model="indexx">
                <mt-tab-item>
                    <div @click="goel">通知消息</div>
                </mt-tab-item>
                <mt-tab-item id="2">游戏公告</mt-tab-item>
            </mt-navbar>
            <!-- tab-container -->
            <div class="page-loadmore">
                <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                    <pk-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore" :stop-translate="stopTranslate">
                        <mt-tab-container v-model="indexx">
                            <mt-tab-container-item id="2">
                                <div class="contenerf">
                                    <div class="content cellpel cellpro">
                                        <div v-for="(item, i) in listNew" :key="i" @click="setValue(item)">
                                            <div class="block-tit pk-1px-b">
                                                <div class="tip-icon">
                                                    <h2 class="h2s">
                                                        {{item.title}}
                                                    </h2>
                                                    <span class="dates">{{filterTimeType(item.createTime,"YYYYMMDD")}}</span>
                                                </div>
                                                <p class="msg">{{fixmsg(item.content,50)}}</p>
                                            </div>
                                        </div>
                                        <div class="nodata" v-show="hasData">我是有底线的</div>
                                        <message-boxer :ok="ok" :content="contentf" :timerText="timerTextf" :title="titlef"></message-boxer>
                                    </div>
                                </div>
                            </mt-tab-container-item>
                        </mt-tab-container>
                    </pk-loadmore>
                </div>         
            </div>
            <div v-show="listNew.length<=0" class="no-data">
                <div class="no-data-box">
                    <i class="iconfont icon-list-zanwusj"></i>
                    <p>暂无数据哦~~</p>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import FHeader from "../../../components/Header";
import MessageBoxer from "../../../components/MessageBox";
import pkLoadmore from "../../../components/Loadmore";
import { Button, Navbar, TabItem, MessageBox, CellSwipe } from "mint-ui";
import { setTimeout } from "timers";
import {
        hasMsgNotice,
        getNoticeList
    } from '@/api/msgCenter';

export default {
  components: {
    Button,
    FHeader,
    Navbar,
    MessageBox,
    MessageBoxer,
    Wipe: CellSwipe,
    TabItem,
    pkLoadmore
  },
  data() {
    return {
      clickFlag: true,
      ok: 0,
      rooter: "/my",
      name: "",
      password: "",
      repassword: "",
      email: "",
      code: "",
      title: "消息中心",
      hasNoBack: true,
      index: 0,
      message: "操作成功",
      indexx: "2",
      isAndroid: false,
      $msgbox: "",
      isiOS: false,
      listNew: [],
      oks: 0,
      contentf: "",
      timerTextf: "",
      titlef: "",
      messagef: "",
      lists: [],
      allLoaded: false,
      stopTranslate: parseInt(this.HTML_FONT_SIZE * 1.6),
      hasData: false,
      bottomStatus: "",
      wrapperHeight: 0,
      page: 1, //当前页数
      pageSize: 10, //每页请求的条数
      totalNum: 0 //总页数
    };
  },
  mounted() {
    //头部样式部分
    this.$(".mint-navbar > .mint-tab-item")
      .children(".mint-tab-item-label")
      .css({
        "font-size": "0.42667rem",
        "line-height": "1.25333rem",
        height: "100%"
      });
    this.aori();
    this.hasMsg();
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top;
  },
  methods: {
    hasMsg(status) {
      getNoticeList(this.page,this.pageSize).then(res => {
        //   console.log(res,'res')
        if (this.page < 2) {
          this.listNew = res.messageList;
        }
        this.totalNum = res.totalnum;
        if (res.totalnum < this.pageSize) {
          this.hasData = true;
        }
        if (status) {
          this.lists = res.messageList;
        } else {
          this.pusher(this.lists, ...res.messageList);
        //   console.log(this.lists, "this.lists");
        }
        // console.log("this.listNew:", this.listNew);
      });
      if (this.page * this.pageSize >= this.totalNum) {
          this.allLoaded = true; //所有数据加载完成
          this.hasData = true;
        }
    },
    pusher(array, ...items) {
      array.push(...items);
    },
    proMesg() {
      this.ok = new Date().getTime();
    },
    goel() {
      this.$router.push({
        name: "msgcenter"
      });
    },
    //接受子集所传的值
    mychangHandle(msg) {
      this.contentr = msg;
    },
    aori() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      this.isAndroid = isAndroid;
      this.isiOS = isiOS;
    },
    fixmsg(msg, len) {
      if (msg.length > len) {
        return msg.slice(0, len) + "...";
      } else {
        return msg;
      }
    },
    setValue(item) {
      this.contentf = item.content;
      this.timerTextf = this.filterTimeType(item.createTime, "YYYYMMDD");
      this.titlef = item.title;
      this.proMesg();
    },
    //下拉刷新
    handleTopChange(status) {
      this.topStatus = status;
    },
    loadTop() {
      this.page = 1;
      this.hasData = false;
      setTimeout(() => {
        this.hasMsg(1);
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
      var _this = this;
      setTimeout(() => {
        _this.hasMsg();
        this.$refs.loadmore.onBottomLoaded();
        if (this.page * this.pageSize >= this.totalNum) {
          this.allLoaded = true; //所有数据加载完成
          this.hasData = true;
        }
        setTimeout(() => {
        //   console.log(_this.lists, "1234");
          _this.listNew = _this.lists;
        }, 0.5);
      }, 1500);
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./msgcenter.less");
.block-tit {
  padding-left: 0.4rem /* 30/75 */;
  padding-right: 0.13333rem /* 10/75 */;
}
</style>
