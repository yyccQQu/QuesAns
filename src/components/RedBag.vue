<template>
    <div id="customer">
        <!-- 悬浮的HTML -->
        <div class="redbagBtn" id="moveDiv" @mousedown="down" @touchstart="down" @mousemove="move" @touchmove="move" @mouseup="end" @touchend="end" @click="clickBag">
        </div>
        <div class="popup" v-show="getShow">
            <div class="popbg"></div>
            <div class="popbox" :class="checkbg">
                <!-- 存款不足 -->
                <div v-show="deposit" class="deposit">
                    <div class="title">
                        <!-- 2018.04.44 12:45<br>
                        至2018.04.44 12:45<br> -->
                        {{info.inStartTime | filterDate('YYYY.MM.DD HH:mm')}}<br>
                        至{{info.inEndTime | filterDate('YYYY.MM.DD HH:mm')}}<br> 
                        期间还需存款{{info.inSum}}元即可领取红包
                    </div>
                    <router-link tag="div" :to="{name:'deposit'}" class="goDeposit">去存款</router-link>
                    <div class="text">
                        红包领取时间
                        <!-- <p>2018.04.44 12:45-2018.04.44 12:45</p> -->
                        <p>{{info.startTime | filterDate('YYYY.MM.DD HH:mm')}}-{{info.endTime | filterDate('YYYY.MM.DD HH:mm')}}</p>
                    </div>
                </div>

                <!-- 存款成功 -->
                <div v-show="success" class="success">
                    <div class="title">恭喜!</div>
                    <div class="money">{{info.money}}元</div>
                    <div class="text">红包领取成功！</div>
                </div>

                <!-- 投注不足 -->
                <div v-show="consume" class="consume">
                    <div class="title">
                        <!-- 2018.04.44 12:45<br>
                        至2018.04.44 12:45<br> -->
                        {{info.auditStartTime | filterDate('YYYY.MM.DD HH:mm')}}<br>
                        至{{info.auditEndTime | filterDate('YYYY.MM.DD HH:mm')}}<br> 
                        期间还需投注{{info.betSum}}元即可领取红包
                    </div>
                    <div @click="close" class="goDeposit">去游戏</div>
                    <div class="text">
                        红包领取时间
                        <!-- <p>2018.04.44 12:45-2018.04.44 12:45</p> -->
                        <p>{{info.startTime | filterDate('YYYY.MM.DD HH:mm')}}-{{info.endTime | filterDate('YYYY.MM.DD HH:mm')}}</p>
                    </div>
                </div>
                <div @click="close" class="close iconfont icon-sy-redbag-close"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        indexInfo,
        getredBag
    } from '@/api/index'
    
    export default {
        name: "RedBag",
        props: {
            // isShow: {
            //     type: Boolean,
            //     default: false,
            //     isLogin:'',
            //     setId:null,
            // },
        },
        data() {
            return {
                flags: false,
                position: {
                    x: 0,
                    y: 0
                },
                nx: '',
                ny: '',
                dx: '',
                dy: '',
                xPum: '',
                yPum: '',
                getShow: false,
                deposit: false,
                success: false,
                consume: false,
                info: {},
                checkbg: '',
                canClick: true,
                isLogin: sessionStorage.getItem('session')
            }
        },
        methods: {
            // 实现移动端拖拽
            down() {
                this.flags = true;
                var touch;
                if (event.touches) {
                    touch = event.touches[0];
                } else {
                    touch = event;
                }
                this.position.x = touch.clientX;
                this.position.y = touch.clientY;
                this.dx = moveDiv.offsetLeft;
                this.dy = moveDiv.offsetTop;
            },
            move() {
                if (this.flags) {
                    var touch;
                    var div = document.getElementById('moveDiv');
                    var divwidth = div.clientWidth;
                    var divheight = div.clientHeight;
                    var winHeight = document.documentElement.clientHeight;
                    var winWidth = document.documentElement.clientWidth;
                    if (event.touches) {
                        touch = event.touches[0];
                    } else {
                        touch = event;
                    }
                    this.nx = touch.clientX - this.position.x;
                    this.ny = touch.clientY - this.position.y;
                    this.xPum = this.dx + this.nx;
                    this.yPum = this.dy + this.ny;
                    if (this.xPum <= 0) {
                        this.xPum = 0
                    }
                    if (this.yPum <= 0) {
                        this.yPum = 0
                    }
                    if (this.xPum >= winWidth - divwidth) {
                        this.xPum = winWidth - divwidth
                    }
                    if (this.yPum >= winHeight - divheight) {
                        this.yPum = winHeight - divheight
                    }
                    moveDiv.style.left = this.xPum + "px";
                    moveDiv.style.top = this.yPum + "px";
                    //阻止页面的滑动默认事件
                    document.addEventListener("touchmove", function() {
                        event.preventDefault();
                    }, false);
                }
                // 阻止冒泡
                event.stopPropagation();
                // 阻止默认事件
                event.preventDefault();
            },
            //鼠标释放时候的函数
            end() {
                this.flags = false;
            },
            clickBag() {
                if (this.isLogin) {
                    indexInfo().then(res => {
                        let id = res.red.id;
                        this.getredbag(id)
                    }).catch(err => {
                        this.$toast({
                            message: err,
                            duration: 2000
                        });
                    })
                } else {
                    this.$router.push({
                        name: 'login'
                    })
                }
            },
            getredbag(id) {
                getredBag(id).then(res => {
                    this.info = res
                    if (res.returnType === 1) {//成功
                        this.success = true
                        this.checkbg = 'successbg'
                    } else if (res.returnType === 2) {//存款不足
                        this.deposit = true
                        this.checkbg = 'depositbg'
                    } else if (res.returnType === 3) {//投注不足
                        this.consume = true
                        this.checkbg = 'consumebg'
                    }
                    this.getShow = true
                }).catch(err => {
                    console.log(err)
                    this.$toast({
                        message: err,
                        duration: 2000
                    });
                })
            },
            close() {
                this.getShow = false
            }
        },
    
    }
</script>

<style lang="less" scoped>
    @import url("../components/less/common.less");
    .redbagBtn {
        width: 2.0667rem;
        height: 2.36rem;
        z-index: 99;
        position: fixed;
        top: 5.5rem;
        right: 0.4rem;
        background: url("../assets/img/image_redbag.png") no-repeat;
        background-size: 100%
    }
    
    .popup {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        .popbg {
            width: 100%;
            height: 100%;
            background: #000;
            opacity: 0.7;
        }
        .popbox {
            width: 10rem;
            max-width: 10rem;
            height: 10.6667rem;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            margin: auto;
            text-align: center;
            color: @color-ffd987;
            .deposit,
            .success,
            .consume {
                margin: 0 auto;
                margin-top: 5.2rem;
                width: 5.6rem;
            }
            .success {
                margin-top: 5.6rem;
                font-weight: bold;
                .title {
                    font-size: 0.8rem;
                }
                .money {
                    margin-top: 0.373rem;
                    margin-bottom: 0.4rem;
                    font-size: 0.96rem;
                }
                .text {
                    font-size: 0.48rem;
                }
            }
            .deposit,
            .consume {
                .title {
                    font-size:.32rem /* 24/75 */;
                    line-height: .48rem /* 36/75 */;
                    display: -webkit-box;
                    overflow: hidden;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;
                }
                .goDeposit {
                    margin: .26667rem /* 20/75 */ auto;
                    width: 2.933rem;
                    height: 0.8rem;
                    line-height: 0.8rem;
                    font-size: 0.4rem;
                    font-weight: bold;
                    background-color: @color-ffd987;
                    box-shadow: 0rem 0.027rem 0.067rem 0rem rgba(0, 0, 0, 0.2);
                    border-radius: 0.133rem;
                    color: @color-ff3e2e;
                }
                .text {
                    font-size:.32rem /* 24/75 */;
                    line-height: 0.4rem;
                    p{
                        font-size:.26667rem /* 20/75 */;
                    }
                }
            }
        }
        .close {
            position: absolute;
            bottom: 0;
            width: 100%;
            text-align: center;
            font-size: 1.06667rem;
            color: #fff
        }
    }
    
    .successbg {
        background: url("../assets/img/image_redbag_yes.png") center no-repeat;
        background-size: 100%
    }
    
    .depositbg {
        background: url("../assets/img/image_redbag_ckbz.png") center no-repeat;
        background-size: 100%
    }
    
    .consumebg {
        background: url("../assets/img/image_redbag_xfbz.png") center no-repeat;
        background-size: 100%
    }
</style>
