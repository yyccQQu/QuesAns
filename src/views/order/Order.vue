<template>
    <div class="order">
        <Header title="投注记录" :showBack="true" :showRight="true"></Header>
        <!--<Footer :activeIndex="3"></Footer>-->
        <div class="order-nav">
            <ul>
                <li :class='{"active":iNow === index}' v-for="(item, index) in list" @click="tab(index)" :key="index">{{item.name}}</li>
            </ul>
            <router-link :to="{name:'reportform'}" class="report-form">
                <i class="iconfont icon-qb-baobiao fs-18"></i>
                <span>报表</span>
            </router-link>
        </div>
        <div class="order-cent">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import Header from '../../components/Header'

    export default {
        name: 'order',
        components: {
            Header,
        },
        created() {
            this.itemHeight = parseInt(this.HTML_FONT_SIZE * 1.06667);
        },
        data() {
            return {
                iNow: 0,
                list: [{
                        name: '彩票游戏',
                        link: 'lottery'
                    },
                    {
                        name: '棋牌游戏',
                        link: 'chess'
                    },
                    {
                        name: '视讯直播',
                        link: 'directvideo'
                    },
                    {
                        name: '电子游艺',
                        link: 'tvgame'
                    },
                    {
                        name: '体育赛事',
                        link: 'sports'
                    }
                ],

            }
        },
        mounted() {
            for(var i =0; i <  this.list.length; i ++){
                 if(this.list[i].link == this.$route.name){
                     this.iNow = i;
                }
            }
        },
        methods: {
            tab(index) {
                this.iNow = index;
                this.$router.push({
                    name: this.list[index].link
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../components/less/common.less');
    .order {
        padding-bottom: 1.30667rem;
        .order-nav {
            margin-top: 1.22667rem;
            padding: 0.267rem 0.4rem;
            height: 0.8rem;
            color: @color-green;
            background-color: @color-252232;
            ul {
                float: left;
                border: 1px solid @color-green;
                border-radius: 0.133rem;
                background-color: #fff;
                overflow: hidden;
                li {
                    position: relative;
                    float: left;
                    width: 1.6rem;
                    line-height: 0.8rem;
                    font-size: 0.32rem;
                    text-align: center;
                    color: @color-green;
                    &:after {
                        position: absolute;
                        right: 0;
                        bottom: 0;
                        height: 100%;
                        width: 1px;
                        content: '';
                        -webkit-transform: scaleX(.5);
                        transform: scaleX(.5);
                        background-color: @color-green;
                    }
                }
                li.active {
                    color: #fff;
                    background-color: @color-green;
                }
                &>li:last-child {
                    &:after {
                        width: 0;
                    }
                }
            }
            .report-form {
                position: relative;
                float: right;
                text-align: center;
                color: @color-green;
                .iconfont {
                    display: table;
                    margin: 0.067rem auto;
                    width: 0.453rem;
                    height: 0.48rem;
                }
                span {
                    display: table;
                    margin: 0 auto;
                    line-height: 0.267rem;
                    font-size: 0.267rem;
                }
            }
        }
    }
</style>
