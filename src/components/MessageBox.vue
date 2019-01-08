
<template>
  <div class="message_box" 
    @click="setValuer"
    :ok="[confirmOption.ok]"
    :content="[confirmOption.content]"
    :timerText="[confirmOption.timerText]"
    :bottomText="[confirmOption.bottomText]"
    :title="[confirmOption.title]"
    :message="[confirmOption.message]">
  </div>
    
</template>


<script>
import { MessageBox } from "mint-ui";
import { setTimeout } from "timers";

export default {
  props: {
    ok: {
        type:Number,
        default:0
    },
    message: {
      // alert 内容展示
      type: String,
      default: "操作成功"
    },
    timerText: {
      //右下角时间展示
      type: String,
      default: "2018年8月23日"
    },
    bottomText: {
      //确认按钮的文本
      type: String,
      default: "关闭"
    },
    content: {
      //提示内容
      type: String,
      default:
        "通知消息内容，此处展示后台发送的通知内容。通知消息内容，此处展示后台发送的通知内容。"
    },
    title: {
      //头部内容
      type: String,
      default: "通知标题"
    }
  },
  components: {
    MessageBox
  },
  data() {
    return {
      isAndroid: false,
      $msgbox: "",
      isiOS: false
    };
  },
  computed: {
    confirmOption() {
      return {
          ok: this.ok,
        message: this.message,
        okText: this.okText,
        bottomText: this.bottomText,
        content: this.content,
        title: this.title,
        timerText: this.timerText
      };
    }
  },
  mounted() {
    this.aori();
  },
  methods: {
    setValuer(){
        this.$emit("mychangHandle","hehe")
    },
    aori() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      this.isAndroid = isAndroid;
      this.isiOS = isiOS;

        this.$(".mint-cell-right .mint-cell-swipe-button").css({
            "line-height": "1.49333rem"
        })
    },
    _content() {
      var $msgbox = this.$(".mint-msgbox-wrapper > .mint-msgbox");
      this.$msgbox = $msgbox;
      $msgbox.css({
        "height": "auto",
        "border-radius": ".26667rem",
        background: "#fff"
      });

      $msgbox.children(".mint-msgbox-header").css({
        "margin-top": ".18667rem"
      });
      $msgbox
        .children()
        .children(".mint-msgbox-title")
        .css({
          color: "#323233",
          "font-size": ".42667rem",
          "margin-bottom": ".09333rem"
        });
      $msgbox.children(".mint-msgbox-content").css({
        color: "#646466",
        "border-bottom": ".01333rem solid #c8c8cc",
        "height": "auto",
        "font-size": ".37333rem",
        "padding-bottom": ".4rem",
        "padding-left": ".4rem",
        "padding-right": ".4rem"
      });
      $msgbox
        .children()
        .children(".mint-msgbox-message")
        .css({
          "text-align": "left",
          "font-size": ".37333rem",
          color: "#646466",
          "margin-bottom": "0",
          "line-height": "1.5em"
        });
      var back = this.confirmOption.timerText;
      var $div = `
        <div class="addDiv">
            <div class="addDiv" style="font-size: .37333rem;
                line-height: .56rem;
                height: .56rem;
                color: #969699;
                text-align: right;">
                ${back}
            </div>
        </div>
      `;
      $msgbox
        .children()
        .children(".mint-msgbox-message")
        .append($div);

      $msgbox.children(".mint-msgbox-btns").css({
        height: "1.06667rem"
      });

      var bottomText = this.bottomText;
      $msgbox
        .children(".mint-msgbox-btns")
        .children(".mint-msgbox-confirm")
        .css({
          "font-size": ".37333rem",
          color: "#646466"
        })
        .text(bottomText);
    },
    todoNotice() {
        var that = this;
      MessageBox.alert(this.content, this.title).then(() => {
          //点击确认之后的func
        this.$msgbox
          .children()
          .children(".mint-msgbox-message")
          .children(".addDiv")
          .remove();
        this.$msgbox
          .children()
          .children(".mint-msgbox-message")
          .css({ "margin-bottom": ".56rem" });
        // console.log("点击确认之后的按钮")
        // this.ok = false;
        //发送信息至调用组件
        

      });
      //其他方法
      setTimeout(this._content, 0.1);
      setTimeout(() => {
        if (that.isAndroid) {
        //   console.log(123456);
          that.$msgbox.css({
            // "max-height": "5.13333rem"
          });
          that.$msgbox.children(".mint-msgbox-header").css({
            "margin-top": "0"
          });
        }
      }, 0.1);

    }
   
  },
  watch: {
    ok: function (val, oldVal) {
        // console.log(val,oldVal,'1234')
        var that = this
        if(val>0){
            setTimeout(()=>{
                that.todoNotice();
            },.1)
        }
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./less/common.less");

.mint-msgbox-wrapper {
  .mint-msgbox {
    height: 4.42667rem !important /* 332/75 */;
    border-radius: 0.26667rem !important /* 20/75 */;
    background: #fff !important;
    .mint-msgbox-header {
      margin-top: 0.2rem /* 15/75 */ !important;
    }
  }
}

</style>
