<template>
    <div id="selfHelp">
        <Header :rooter="'/my'" :title="'自助优惠申请'" :hasNoBack="true" :iFontsize="'.58667rem'" :isShowHome="false">
            <div slot="head_right">
                <router-link class="header-record" tag="span" :to="{name:'selfmore'}">
                    <span>申请记录</span>
                </router-link>
            </div>
        </Header>
        <div class="self-content">
            <div class="fotter-apply" tag="div" v-for="actLists in actList" :key="actLists.id" @click="toDetail(actLists)">
                <div class="self-activity">
                    <div v-if="actLists.status === 3" @click="toDetail(actLists)" class="maxMask"></div>
                    <img :src="actLists.wapImg">
                    <div class="activity-status">
                        <span v-if="actLists.status === 1">进行中</span>
                        <span v-else-if="actLists.status === 2">未开始</span>
                        <span v-else-if="actLists.status === 3">已结束</span>
                    </div>
                    <div class="self-activity-fotter">
                        <div v-if="actLists.status === 2" class="minMask"></div>
                        <div class="fotter-title">
                            <span>{{actLists.proTitle}}</span>
                        </div>
                        <div class="fotter-apply" tag="div" @click="toApply(actLists,$event)">
                            <div>
                                <span>立即申请</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    </div>
</template>

<script>
import Header from "../../../components/Header.vue";
import { getList } from "@/api/selfHelp";
export default {
  name: "selfHelp",
  data() {
    return {
      title: "自助优惠申请",
      reHeadLeft: false,
      reHeadRight: false,
      rooter: "rooter-jianpuzhai",
      some: "Jokcy",
      actList: []
    };
  },

  components: {
    Header
  },
  mounted() {
    this.getList();
  },
  methods: {
    quickApply(status) {
      if (status === 1) {
        //正
        this.actPop = true;
      } else if (status === 2) {
        //未开始
        this.$toast({
          message: "活动未开始",
          duration: 2000
        });
      }
    },
    close() {
      this.actPop = false;
    },
    toDetail(item) {
      if (item.status == 1) {
        this.$router.push({
          name: "selfDetail",
          query: {
            id: item.id
          }
        });
      } else if (item.status == 2) {
        this.$toast({
          message: "活动未开始",
          duration: 1000
        });
      } else if (item.status == 3) {
        this.$toast({
          message: "活动已结束",
          duration: 1000
        });
      }
    },
    toApply(item, event) {
      event.stopPropagation();
      if (item.status == 1) {
        this.$router.push({
          name: "apply",
          query: {
            id: item.id
          }
        });
      }
    },
    getList() {
      getList()
        .then(res => {
        //   console.log(res, "res");
          this.actList = res.promotionList;
        }).catch(res => {
          this.$toast({
            message: res,
            duration: 2000
          });
        });
        
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../../components/less/common.less");
#selfHelp {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: @color-252232;
  box-sizing: border-box;
  line-height: 1;
  .self-content {
    padding-top: 1.22667rem;
    /* 92/75 */
    height: 100%;
    background: @color-252232;
    overflow-y: scroll;
    // margin-bottom: 20px;
    .self-activity {
      margin-left: 0.4rem;
      margin-right: 0.4rem;
      width: 9.2rem;
      height: 4.48rem;
      border-radius: 0.267rem;
      overflow: hidden;
      margin-top: 0.4rem;
      margin-bottom: 20px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .maxMask {
        z-index: 999;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.4);
      }
      .activity-status {
        position: absolute;
        top: 0.33rem;
        right: 0;
        width: 1.467rem;
        height: 0.48rem;
        background-color: #000000;
        border-radius: 0.24rem 0rem 0rem 0.24rem;
        opacity: 0.7;
        color: @color-green !important;
        text-align: center;
        span {
          line-height: 0.48rem;
        }
      }
      .self-activity-fotter {
        position: absolute;
        width: 100%;
        height: 0.8rem;
        background: #353147;
        bottom: 0;
        display: flex;
        .minMask {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.4);
        }
        .fotter-title {
          flex: 4;
          color: @color-green !important;
          line-height: 0.8rem;
          padding-left: 0.3rem;
          font-size: 0.3rem;
        }
        .fotter-apply {
          background: @color-green !important;
          flex: 1;
          text-align: center;
          line-height: 0.8rem;
          font-size: 0.3rem;
        }
      }
    }
  }
}
</style>
