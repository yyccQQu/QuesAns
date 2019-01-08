<template>
    <div class="noinfo">
        <div class="advBox">
            <div class="adv-top">
                <div class="game-title">热门推荐</div>
                <div class="advScroll">
                    <ul class="clearfix">
                        <li @click="gameInto(item)" v-for="(item,index) in gamelist" :key="index">
                            <div class="game-pic"><img v-lazy="cdnUrl+item.iconUrl" /></div>
                            <div class="game-text">
                                <div class="top">{{item.productName}}</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="adv-bottom" v-show="isAdv">
                <swiper :options="swiperOption" ref="mySwiper">
                    <swiper-slide v-for="(item, index) in swiperSlides" :key="index">
                        <img :src="item.content" alt="">
                    </swiper-slide>
                </swiper>
                <span class="close" @click="closeadv">关闭</span>
            </div>
        </div>
    </div>
</template>

<script>
import {getHotGames,gameInto} from '@/api/index'
    import 'swiper/dist/css/swiper.css'
    import {
        swiper,
        swiperSlide
    } from 'vue-awesome-swiper'
    export default {
        components: {
            swiper,
            swiperSlide
        },
        name: "Advertisement",
        props:['advType'],
        data(){
            return{
                cdnUrl: '',
                isAdv:true,
                gamelist:[],
                swiperOption: {
                    autoplay: 3000,
                    loop:true,
                    initialSlide:1,
                    autoplayDisableOnInteraction:false,
                    notNextTick: true,
                    spaceBetween: '5%',
                   
                },
                swiperSlides: [],
            }
        },
        computed: {
            Swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        mounted() {
            this.getHotGame();
        },
        methods:{
            closeadv:function () {
                this.isAdv =!this.isAdv;
            },
            getHotGame(){
                // 广告类型 -1首页广告 -2存款成功 -3取款成功
                getHotGames(this.advType).then((res) => {
                    this.cdnUrl = res.cdn + "/";
                    this.gamelist = res.hotGame;
                    this.swiperSlides = res.adv;
                    this.isAdv = this.swiperSlides.length>0;
                    if(this.swiperSlides.length<=1){
                        this.Swiper.stopAutoplay();
                        this.Swiper.disableTouchControl();
                    }
                }).catch(err =>{})
            },
               
            gameInto(item){
                gameInto(item.platformName,item.platformId).then((res) => {
                    window.open(res.loginUrl, '_blank', 'toolbar=yes, width=1300, height=900')
                })
            },
        }
    }
</script>

<style lang="less" scoped>
    @import url("../components/less/common.less");

    .noinfo {
        .advBox {
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            .adv-top {
                .game-title {
                    padding-left: 0.4rem;
                    font-size: 0.43rem;
                    font-weight: bold;
                    text-align: left;
                    color: @color-8976cc;
                }
                .advScroll{
                    width: 100%;
                    height: auto;
                    white-space: nowrap;
                    overflow: hidden;
                    overflow-x: scroll; /* 1 */
                    -webkit-backface-visibility: hidden;
                    -webkit-overflow-scrolling: touch; /* 2 */
                    text-align: justify; /* 3 */
                    &::-webkit-scrollbar {
                        display: none;
                    }
                    ul {
                        li {
                            display: inline-block;
                            margin: 0.27rem 0 0.4rem;
                            width: 1.89rem;
                            text-align: center;
                            font-size: 0.32rem;
                            .game-pic {
                                margin: 0 auto;
                                width: 1.63rem;
                                height: 1.63rem;
                                border-radius: 50%;
                                img{
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                            .game-text {
                                margin-top: 0.25rem;
                                .top {
                                    color: @color-green;
                                }
                                .bottom {
                                    margin-top: 0.13rem;
                                    color: @color-8976cc;
                                }
                            }
                        }
                    }
                }
            }
            .adv-bottom {
                position: relative;
                height: 3.2rem;
                width: 100%;
                img{
                    width: 100%;
                    height: 100%;
                }
                .close {
                    z-index: 999;
                    position: absolute;
                    top: 0.27rem;
                    right: 0.4rem;
                    display: block;
                    width: 1.07rem;
                    height: 0.64rem;
                    line-height: 0.64rem;
                    text-align: center;
                    font-size: 0.32rem;
                    color: #fff;
                    background-color: @color-a0a0a0;
                    border-radius: 0.13rem;
                    opacity: 0.6;
                }
            }
        }
    }
</style>
