<template>
    <div class="footer">
        <ul>
            <router-link  tag="li" :to='{name:item.link}' :class='{"active":iNow === index}' @click.native="tab(index)" v-for="(item,index) in menuList" :key="index">
                <i class="iconfont" :class="item.icon"></i>
                <span>{{item.name}}</span>
            </router-link>
        </ul>
    </div>
</template>

<script>
    export default {
        props:['activeIndex'],
        data() {
            return {
                iNow:this.activeIndex,
                menuList: [{
                        icon: "icon-tab_home",
                        name: "首页",
                        link: "index"
                    },
                    {
                        icon: "icon-tab_huodong",
                        name: "活动",
                        link: "activity"
                    },
                    {
                        icon: "icon-tab_wallet",
                        name: "钱包",
                        link: "purse"
                    },
                    {
                        icon: "icon-tab-order",
                        name: "投注记录",
                        link: "lottery"
                    },
                    {
                        icon: "icon-tab-mine",
                        name: "我的",
                        link: "my"
                    }
                ]
            };
        },
        methods:{
            tab(index){
                this.iNow = index;
            }
        }
    };
</script>

<style lang="less" scoped>
    @import url('./less/common.less');
    .footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 99;
        ul {
            display: flex;
            justify-content: space-around;
            height: 1.30667rem/* 98/75 */
            ;
            background-color: #30303e;
            box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.35);
            li {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                .iconfont{
                    font-size: .58667rem /* 44/75 */;
                    background-color: #30303e;
                    color: #6b6680;
                }
                span {
                    font-family: PingFangSC-Regular;
                    font-size: .26667rem /* 20/75 */;
                    color: #8a87ad;
                }
                &.active{
                    .iconfont{
                        color: @color-green;
                    }
                    span{
                        color: @color-green;
                    }
                }
            }
        }
    }
</style>


