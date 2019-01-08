
<template>
  <div id="passwordmge">
    <F-header :title="title" :rooter="'-1'" :hasNoBack="hasNoBack" :isShowHome="false"></F-header>
    <div class="hasbox"></div>
    <div class="hasmenu">
        <mt-navbar v-model="indexx">
            <mt-tab-item id="1">通知消息</mt-tab-item>
            <mt-tab-item><div @click="goel">游戏公告</div></mt-tab-item>
        </mt-navbar>
            <!-- tab-container -->
            <div class="page-loadmore">
                <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                    <pk-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore" :stop-translate="stopTranslate">
                        <mt-tab-container v-model="indexx">
                            <mt-tab-container-item id="1">
                                <div class="contenerf">
                                    <div class="content cellpel">
                                        <div v-for="(item, i) in listNew" :key="i+100" @click="setValue(item)">
                                            <Wipe class="msgb pk-1px-b"
                                                :right="[
                                                    {
                                                    content: '删除',
                                                    style: { background: 'red', color: '#fff' },
                                                    handler: () => todo(item.id)
                                                    }
                                                ]">
                                                    <div class="block-tit">
                                                        <div class="tip-icon">
                                                            <h2 class="h2s">
                                                                {{item.title}}
                                                            </h2>
                                                            <span class="spans" v-show="item.status==1"></span>
                                                            <span class="dates">{{filterTimeType(item.createTime,"YYYYMMDD")}}</span>
                                                        </div>
                                                        <p class="msg">{{fixmsg(item.content,50)}}</p>
                                                    </div>
                                            </Wipe>
                                        </div>
                                        <div class="nodata" v-show="hasData">我是有底线的</div>

                                        <message-boxer
                                            :ok="ok"
                                            :content="contentf"
                                            :timerText="timerTextf"
                                            :title="titlef"
                                            :message="messagef"
                                        ></message-boxer>
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
import { Button, Navbar, TabItem, MessageBox, CellSwipe } from "mint-ui";
import { setTimeout } from "timers";
import pkLoadmore from "../../../components/Loadmore";
import {
        hasMsgNotice,
        msgInfo,
        msgDel
    } from '@/api/msgCenter';

export default {
  components: {
    Button,
    FHeader,
    Navbar,
    MessageBox,
    MessageBoxer,
    Wipe: CellSwipe,
    pkLoadmore,
    TabItem
  },
  data() {
    return {
      clickFlag: true,
      ok: 0,
      name: "",
      password: "",
      repassword: "",
      email: "",
      code: "",
      title: "消息中心",
      hasNoBack: true,
      index: 0,
      message: "操作成功",
      indexx: "1",
      isAndroid: false,
      $msgbox: "",
      isiOS: false,
      contentf: "默认内容",
      timerTextf: "",
      titlef: "",
      messagef: "",
      lists: [],
      listNew: [],
      oks: 0,
      count: 0,
      contentfs: "",
      timerTextfs: "",
      titlefs: "",
      messagefs: "",
      allLoaded: false,
      topStatus: "",
      stopTranslate: parseInt(this.HTML_FONT_SIZE * 1.6),
      hasData: false,
      bottomStatus: "",
      wrapperHeight: 0,
      page: 1, //当前页数
      pageSize: 10, //每页请求的条数
      totalNum: 0 //总页数
    };
  },
  computed: {},
  watch: {},
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
    // console.log(this.listNew.length)
  },
  methods: {
    todo(id) {
      msgDel(id * 1).then(res => {
        // console.log(res);
        this.$toast("删除成功");
        this.hasMsg();
      });
    },
    hasMsg(status) {

      hasMsgNotice(this.page,this.pageSize).then(res => {
        //   console.log(res,'res')
        if (this.page < 2) {
          this.listNew = res.messageList;
        } else {
          if (this.totalNum < 5) {
            this.hasData = true;
          }
        }
        this.totalNum = res.totalNum;
        if (status) {
          this.lists = res.messageList;
        } else {
          this.pusher(this.lists, ...res.messageList);
        //   console.log(this.lists, "this.lists");
        }
        this.count = 1;
      });
    //   console.log(this.lists, "this.lists", status);
      //$ dom width 100%
      var _this = this;
      setTimeout(() => {
        Object.keys(this.$(".block-tit")).map((v, i) => {
          if (!isNaN(v * 1)) {
            _this
              .$(".block-tit")
              .parent()
              .siblings("mint-cell-title")
              .css("display", "none");
            // console.log()
          }
        });
      }, 0.5);
    },
    pusher(array, ...items) {
      array.push(...items);
    },
    goel() {
      this.$router.push({ name: "msgcenters" });
    },
    proMesg() {
      this.ok = new Date().getTime();
    },
    aori() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      this.isAndroid = isAndroid;
      this.isiOS = isiOS;
      //划出删除
      // this.$(".cellpel .mint-cell-title").css({ display: "none" });
      this.$(".block-tit,.mint-cell-value").css({ width: "100%" });
      this.$(".msgb .mint-cell-value").css("padding-top", ".06667rem ");
      this.$(".cellpel .mint-cell-swipe")
        .last()
        .css({ "border-bottom": "none" });
      this.$(".mint-cell-value").css("height", "2.26667rem");
      this.$(".msgb .mint-cell-swipe-button").css("line-height", "2.04rem");
      this.wrapperHeight =
        document.documentElement.clientHeight -
        this.$refs.wrapper.getBoundingClientRect().top;
    },
    fixmsg(msg, len) {
      if (msg.length > len) {
        return msg.slice(0, len) + "...";
      } else {
        return msg;
      }
    },
    //messageBox
    setValue(item) {

     msgInfo(item.id*1).then(res => {
        this.contentf = res.content;
        this.timerTextf = this.filterTimeType(res.createTime, "YYYYMMDD");
        this.titlef = res.title;
        item.status = 2;
        this.proMesg();
      });
      //   this.contentf = item.content;
      //   this.timerTextf = this.filterTimeType(item.createtime, "YYYYMMDD");
      //   this.titlef = item.title;
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
        this.$refs.loadmore.onBottomLoaded();
        if (this.page * this.pageSize >= this.totalNum) {
          this.allLoaded = true; //所有数据加载完成
          this.hasData = true;
        }
        var listNew3 = x => {
          var arr = [];
          for (var a = 0; a < x; a++) {
            var c = {};
            c.content = "";
            arr.push(c);
          }
          return arr;
        };
        _this.listNew = [];
        // console.log(_this.listNew,'_this.listNew')
        _this.listNew = listNew3(_this.lists.length);
        // console.log(_this.listNew,'_this.listNew2')
        setTimeout(() => {
          _this.hasMsg();
          _this.listNew = _this.lists;
        //   console.log(_this.lists, "1234");
        }, 50);
      }, 1500);
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./msgcenter.less");
.block-tit{
    width: 100%;
}
</style>
<style>
.mint-cell-value {
  width: 100% !important;
}
.mint-cell-swipe-button {
  line-height: 2.04rem;
}
.block-tit,
.mint-cell-value {
  height: 2.26667rem /* 170/75 */;
}
</style>
