\<template>
    <div class="footer">
        <ul>
            <router-link  tag="li" :to='{name:item.link}' v-for="(item,index) in menuList" :key="index">
                <i class="iconfont" :class="item.icon"></i>
                <span>{{item.name}}</span>
            </router-link>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "IndexFooter",
        data(){
            return{
                menuList: [{
                    icon: "icon-tab_cunkuan",
                    name: "存款",
                    link: "deposit"
                },
                    {
                        icon: "icon-tab_qukuan",
                        name: "提现",
                        link: "withdraw"
                    },
                    {
                        icon: "icon-tab_eduzh",
                        name: "额度转换",
                        link: "transfer"
                    },
                    {
                        icon: "icon-tab_huodong",
                        name: "活动",
                        link: "activity"
                    },
                    {
                        icon: "icon-tab_kefu",
                        name: "客服",
                        link: "contactus"
                    }],
            }
        }
    }
</script>

<style lang="less" scoped>
    @import url("../components/less/common.less");
    .footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 9;
        ul {
            display: flex;
            justify-content: space-around;
            height: 1.30667rem/* 98/75 */;
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
