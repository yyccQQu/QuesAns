<template>
    <header class="info-header">
        <div class="left" v-if="showBack && !bttOption.reHeadLeft" @click="goBack()">
            <i v-if="!iIcon" class="iconfont icon-nav-back" :style="{'font-size':bttOption.iFontsize}"></i>
            <span v-if="!hasNoBack" :style="{color:bttOption.textColor,'font-size':bttOption.tFontsize}" class="spans">{{bttOption.backText}}</span>
        </div>
        <div class="left" v-if="showBack && bttOption.reHeadLeft">
            <slot name="head_left"></slot>
        </div>
        <div class="center">
            <span class="spans text-dots" v-if="reHeadMid">{{bttOption.title}}</span>
            <slot name="head_mid"></slot>
        </div>
        <div v-if="showRight" class="right" >
            <router-link tag="div" :to="{name:'index'}" class="home iconfont icon-tab_home" v-if="isShowHome"></router-link>
            <slot name="head_right"></slot>
        </div>
    </header>
</template>


<script>
    export default {
        props: {
            ty: {
                type: Number,
                default: null
            },
            hasNoBack: {
                //是否不显示左侧返回字段
                type: Boolean,
                default: true
            },
            iIcon: {
                //是否不显示左侧字体图标
                type: Boolean,
                default: false
            },
            title: {
                // 文本提示
                type: String,
                default: "默认头部"
            },
            backText: {
                //左侧文本提示
                type: String,
                default: "返回"
            },
            iFontsize: {
                // tubiao大小
                type: String,
                default: ".58667rem"
            },
            tFontsize: {
                // 字体大小
                type: String,
                default: ".37333rem" ///* 28/75 */;
            },
            textColor: {
                // 文本颜色
                type: String,
                default: "#bf797"
            },
            showBack: {
                type: Boolean,
                default: true
            },
            showRight: {
                type: Boolean,
                default: true
            },
            reHeadRight: {
                //是否重写右侧
                type: Boolean,
                default: false
            },
            reHeadLeft: {
                //是否重写左侧
                type: Boolean,
                default: false
            },
            rooter: {
                type: String,
                default: "/"
            },
            iColor: {
                // 图标颜色
                type: String,
                default: "#f00"
            },
            reHeadMid: {
                //是否自定义标题
                type: Boolean,
                default: true
            },
            isShowHome: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            bttOption() {
                return {
                    tFontsize: this.tFontsize,
                    iColor: this.iColor,
                    rooter: this.rooter,
                    preventGoBack: this.preventGoBack,
                    title: this.title,
                    reHeadRight: this.reHeadRight,
                    backText: this.backText,
                    textColor: this.textColor,
                    iFontsize: this.iFontsize,
                    reHeadLeft: this.reHeadLeft,
                    showBack: this.showBack,
                    reHeadMid: this.reHeadMid,
                    iIcon: this.iIcon,
                    hasNoBack: this.hasNoBack,
                    isShowHome:this.isShowHome
                };
            }
        },
        data() {
            return {};
        },

        mounted() {},
        methods: {
            goBack() {
                if (this.ty != null) {
                    this.findaccount(this.ty);
                }
                if (this.bttOption.rooter == "-1") {
                    this.$router.go(-1);
                } else {
                    this.$router.push(this.bttOption.rooter);
                }
            },
            findaccount(ty) {
                if (ty != 1) {
                    this.bttOption.rooter = "/agencyappli";
                    this.$emit("ty", ty);
                } else {
                    this.bttOption.rooter = "/my";
                }
            }
        },
        components: {}
    };
</script>



<style lang="less" scoped>
    @import url("../components/less/common.less");
    .a-router {
        color: @color-green;
    }

    //头部
    header.info-header {
        height: 1.22667rem/* 92/75 */
        ;
        padding: 0 0.4rem/* 30/75 */
        ;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-image: linear-gradient(#252232, #252232), linear-gradient(180deg, #333333 0%, #595959 100%), linear-gradient(#f6f7fd, #f6f7fd);
        background-blend-mode: normal, normal, normal;
        color: @color-green;
        position: fixed;
        top: 0;
        width: 100%;
        left: 0;
        right: 0;
        z-index: 99;
        box-sizing: border-box;
        .left {
            flex: 1;
            cursor: pointer;
            .spans {
                font-size: 0.48rem;
            }
        }
        .center {
            flex: 1;
            text-align: center;
        }
        .fspan {
            font-family: ComicSansMS;
            font-size: 0.48rem;
        }
        .right {
            flex: 1;
            text-align: right;
        }
        .f38 {
            font-size: 0.50667rem/* 38/75 */
            ;
        }
        .spans {
            font-size: 0.48rem/* 36/75 */
            ;
            color: @color-green;
        }
    }

    .head_right {
        font-size: 0.37333rem/* 28/75 */
        ;
    }

    .home {
        font-size: 0.6rem;
    }
</style>
