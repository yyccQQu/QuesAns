

<template>
    <div class="fix">
        <ul>
            <li>
                <div class="div1">1234543</div><div class="del">删除</div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  name: "slide-del",

  props: {
    to: String,
    left: Array,
    right: Array,
    icon: String,
    title: String,
    label: String,
    isLink: Boolean,
    value: {}
  },

  data() {
    return {};
  },

  mounted() {
    this._common();
  },

  methods: {
    _common() {
      var oUl = document.querySelector("ul");
      var aLi = document.querySelectorAll("li");
      var aDiv = document.querySelectorAll(".div1");
      var aDel = document.querySelectorAll(".del");
      var n = 0;
      for (var i = 0; i < aLi.length; i++) {
        // console.log(i);
        aLi[i].index = i;
        //滑动开始
        aLi[i].addEventListener(
          "touchstart",
          function(ev) {
            ev.preventDefault();
            var oldX = ev.targetTouches[0].pageX;
            // console.log(oldX);
            function fnMove(ev) {
              ev.preventDefault();
              var newX = ev.targetTouches[0].pageX - oldX;
              aLi[this.index].style.transform = "translateX(" + newX + "px)";
            }
            function fnEnd(ev) {
              aLi[this.index].removeEventListener("touchmove", fnMove, false);
              aLi[this.index].removeEventListener("touchend", fnEnd, false);
              ev.preventDefault();
              var changeX = ev.changedTouches[0].pageX;
              if (oldX - changeX > 40) {
                aLi[this.index].style.transition = "1s all ease";
                aLi[this.index].style.transform = "translateX(-2rem)";
              } else {
                aLi[this.index].style.transform = "translateX(0)";
              }
            }
            aLi[this.index].addEventListener("touchmove", fnMove, false);
            aLi[this.index].addEventListener("touchend", fnEnd, false);
          },
          false
        );
        //删除按钮
        aDel[i].index = i;
        aDel[i].addEventListener(
          "touchstart",
          function() {
            this.innerHTML = "";
            this.style.height = "0";
            this.style.transition = "0.5s all ease";
            aLi[this.index].style.height = "0";
            aLi[this.index].style.transition = "0.5s all ease";
            aDiv[this.index].style.height = "0";
            aDiv[this.index].style.transition = "0.5s all ease";
            aDiv[this.index].innerHTML = "";
            this.addEventListener(
              "transitionend",
              function() {
                oUl.removeChild(aLi[this.index]);
              },
              false
            );
          },
          false
        );
      }
    }
  }
};
</script>
<style lang="less" scoped>
.fix{
    position: fixed;
    width:100%;
    height: 100%;
    background:#fff;
}
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

ul {
  width: 1.62667rem /* 122/75 */;
  height: 100%;
  overflow: visible;
  background: pink;
}
li {
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  background: pink;
}
.div1 {
  width: 80%;
  height: 2rem;
  float: left;
}
.del {
  width: 20%;
  height: 2rem;
  background: red;
  float: left;
  text-align: center;
  line-height: 2rem;
  color: #fff;
}
</style>



