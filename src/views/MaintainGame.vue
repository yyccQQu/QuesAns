<template>
    <div class="maintain">
        <div class="pic">
            <img src="" alt="">
        </div>
        <h1>游戏维护中</h1>
        <p>维护公告内容维护公告内容维护公告
            内容维护公告内容维护公告内容</p>
        <div class="time">
            <div class="title">维护时间</div>
            <div class="numb">08:00 - 12:00</div>
        </div>
        <router-link :to="{name:'index'}" class="button">返回首页</router-link>
        <div class="service">如有疑问，请<router-link tag="span" :to="{name:'contactus'}">联系客服</router-link></div>
    </div>
</template>

<script>
    export default {
        name: "maintainweb"
    }
</script>

<style lang="less" scoped>
    @import url('../components/less/common.less');
    .maintain{
        position: fixed;
        left: 50%;
        top: 50%;
        text-align: center;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        .pic{
            margin: 0 auto;
            width: 4.267rem;
            height: 4.267rem;
            background-image: linear-gradient(129deg,
            #c0b1f5 0%,
            #00d897 100%);
            img{
                width: 100%;
            }
        }
        h1{
            margin: 0.5333rem 0;
            font-weight: normal;
            font-size: 0.48rem;
            color: @color-green;
        }
        p{
            line-height: 0.45rem;
            font-size: 0.32rem;
            color: @color-323233;
        }
        .time{
            margin: 0.3rem 0;
            line-height: 0.6rem;
            font-size: 0.4rem;
            font-weight: bold;
            color: @color-green;
        }
        .button{
            display: block;
            margin: 0 auto;
            width: 2.933rem;
            height: 0.8rem;
            line-height: 0.8rem;
            font-size: 0.373rem;
            color: #fff;
            background-color: @color-green;
            border-radius: 0.133rem;
        }
        .service{
            margin-top: 0.267rem;
            font-size: 0.32rem;
            color: @color-323233;
            span{
                color: @color-green;
            }
        }
    }
</style>