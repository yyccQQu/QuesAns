<template>
    <div class="spread">
        <Header :title="'我要推广'" :rooter="'-1'" :isShowHome="false"></Header>
        <div class="spread-title">
            <h1>我的推广链接</h1>
            <div class="right" @click="show()">查看返佣比例</div>
        </div>
        <div class="spread-link">
            <input class="link" v-model="link" readonly>
            <button type="button" v-clipboard:copy="link" v-clipboard:success="onCopy" v-clipboard:error="onError">复制链接</button>
        </div>
        <div class="spread-title">
            <h1>返佣排行榜</h1>
            <router-link tag="div" :to="{name:'backCommission'}" class="right">查看我的返佣</router-link>
        </div>
        <div class="rankings">
            <div class="rankings-title">
                <div class="left">排名</div>
                <div class="center">玩家</div>
                <div class="right">返佣金额</div>
            </div>
            <ul>
                <li v-for="(spread,index) in spreadInfo" :key="index" class="pk-1px-t">
                    <div class="left">{{index+1}}</div>
                    <div class="center">{{spread.name}}</div>
                    <div class="right">{{spread.money}}</div>
                </li>
            </ul>
        </div>
        <!--弹窗-->
        <div class="moreTextpop" v-show="detailShow">
            <div class="morepopBox">
                <div class="poptit">推广返佣比例</div>
                <div class="close" @click="close()">X</div>
                <div class="moretxt">
                    <table>
                        <tr v-show="index==0" v-for="(item,index) in leaderInfo" :key="index" class="table-header">
                            <th>{{item.name}}</th>
                            <th v-for="(item2,index2) in item.child" :key="index2">{{item2.rate}}</th>
                        </tr>
                        <tbody>
                            <tr v-show="index!=0" v-for="(item,index) in leaderInfo" :key="index">
                                <td>{{item.name}}</td>
                                <td v-for="(item2,index2) in item.child" :key="index2">{{item2.rate}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="box-mask"></div>
        </div>
    </div>
</template>

<script>
import Header from "../../components/Header";
import { info, proportion } from "@/api/spread";
import func from "@/api/purse";
export default {
  components: {
    Header
  },
  name: "spread",
  data() {
    return {
      detailShow: false,
      spreadInfo: [],
      leaderInfo: [],
      numberList: [],
      link: "",
      page: 1,
      pageSize: 10
    };
  },
  mounted() {
    this.info();
    this.proportion();
  },
  methods: {
    show() {
      this.detailShow = true;
    },
    close() {
      this.detailShow = false;
    },
    onCopy: function(e) {
      this.$toast("复制成功");
    },
    onError: function(e) {
      this.$toast("复制失败");
    },
    info() {
      let _this = this;
      info()
        .then(res => {
        //   console.log(res);
          _this.spreadInfo = res.leaderboard;
          _this.link = res.spreadUrl;
        })
        .catch(err => {
          this.$toast({
            message: err,
            duration: 2000
          });
        });
    },
    proportion() {
      let _this = this;
      let postData = {
        page: this.page,
        pageSize: this.pageSize
      };
      func
        .getBackCommission(postData)
        .then(res => {
        //   console.log(res);
          this.spreadNum = res.spreadNum;
          this.spreadMoney = res.spreadMoney;
          this.totalNum = res.totalNum;
          this.leaderInfo = res.protion;
          let result = res.list;
          if (this.page === 1) {
            this.list = result;
          } else {
            this.list = this.list.concat(result);
          }
          
        })
        .catch(err => {
          this.$toast({
            message: err,
            duration: 2000
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../components/less/common.less");
.spread {
  padding-top: 1.22667rem;
  .spread-title {
    padding: 0 0.4rem;
    height: 1rem;
    line-height: 1rem;
    h1 {
      float: left;
      font-weight: normal;
      font-size: 0.4rem;
      color: @color-323233;
    }
    .right {
      float: right;
      padding: 0.3rem 0 0;
      line-height: 0.4rem;
      color: @color-7c71ab;
      border-bottom: 1px solid @color-7c71ab;
    }
  }
  .spread-link {
    padding: 0 0.4rem;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.37rem;
    color: @color-323233;
    background-color: #fff;
    .link {
      float: left;
      line-height: 1rem;
      min-width: 7rem;
      border: none;
    }
    button {
      margin-top: 0.16rem;
      float: right;
      width: 2.133rem;
      height: 0.667rem;
      font-size: 0.37rem;
      color: #fff;
      background-color: #00d897;
      box-shadow: 0 0.027rem 0.067rem 0 rgba(0, 0, 0, 0.12);
      border-radius: 0.133rem;
      border: none;
    }
  }
  .rankings {
    padding: 0 0.4rem;
    background-color: #fff;
    color: @color-323233;
    .rankings-title {
      position: relative;
      height: 1rem;
      line-height: 1rem;
      font-size: 0.427rem;
      .left {
        float: left;
      }
      .center {
        position: absolute;
        left: 50%;
        -webkit-transform: translate(-50%, 0);
        transform: translate(-50%, 0);
      }
      .right {
        float: right;
      }
    }
    ul {
      li {
        position: relative;
        height: 1rem;
        line-height: 1rem;
        .left {
          position: absolute;
          top: 50%;
          left: 0;
          -webkit-transform: translate(0, -50%);
          transform: translate(0, -50%);
          width: 0.64rem;
          height: 0.64rem;
          line-height: 0.64rem;
          text-align: center;
          font-size: 0.37rem;
        }
        .center {
          position: absolute;
          left: 50%;
          transform: translate(-50%, 0);
        }
        .right {
          float: right;
          font-weight: bold;
          color: @color-green;
        }
      }
      & > li:first-child {
        .left {
          color: #fff;
          background-color: #e60012;
        }
      }
      & > li:nth-child(2) {
        .left {
          color: #fff;
          background-color: #e60012;
        }
      }
      & > li:nth-child(3) {
        .left {
          color: #fff;
          background-color: #e60012;
        }
      }
    }
  }
  .moreTextpop {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 100%;
    .morepopBox {
      z-index: 101;
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      overflow: visible;
      width: 90%;
      margin: 0 auto;
      max-width: 9.2rem;
      height: auto;
      border-radius: 0.133rem;
      background-color: #fff;
      color: @color-green;
      overflow: hidden;
      .poptit {
        padding: 0 0.4rem;
        height: 1rem;
        line-height: 1rem;
        font-size: 0.427rem;
        font-weight: 500;
        color: @color-green;
        border-bottom: 1px solid @color-c8c8cc;
      }
      .close {
        z-index: 9;
        position: absolute;
        top: 0;
        right: 0;
        width: 1rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
      }
      .moretxt {
        max-height: 7.56rem;
        overflow-y: scroll;
        table {
          width: 100%;
          tr {
            text-align: center;
            line-height: 1rem;
            color: @color-323233;
            border-bottom: 1px solid @color-c8c8cc;
            th {
              text-align: center;
            }
            td {
              max-width: 1rem;
              overflow: hidden;
            }
            & > th:first-child,
            & > td:first-child {
              padding-left: 0.4rem;
              text-align: left;
            }
          }
        }
      }
    }
    .box-mask {
      z-index: 100;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
    }
  }
}
</style>
