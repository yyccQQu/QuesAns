<template>
    <div class="pay-return-result">
        <div class="return-result-box">
            <!-- <img src="../assets/img/icon_wallet_qs.png" alt=""> -->
            <i class="iconfont icon-qb-wenhao"></i>
            <h2>请在新开页面完成存款</h2>
            <button @click="okPay()">我已完成存款</button>
            <button @click="continuePay()" class="continue">重新选择支付方式</button>
            <p>存款遇到问题请<router-link tag="a" :to="{name:'contactus'}">联系客服</router-link></p>
        </div>
    </div>
</template>
<script>
export default {
    props:['fromType'],
    methods:{
        okPay(){
            this.$router.replace({name:'depositRecord',query:{fromType:this.fromType}})
            console.log("去交易记录页面")
        },
        continuePay(){
            this.$router.go(-2);
        }
    }
}
</script>
<style lang="less" scoped>
@import url('../components/less/common.less');
.pay-return-result{
    .return-result-box{
        margin-top: .53333rem /* 40/75 */;
        padding: 0 .4rem /* 30/75 */;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        i{
            font-size: 2.4rem /* 180/75 */;
            color: @color-green;
        }
        h2{
            font-size: .48rem /* 36/75 */;
            color: @color-green;
            margin-top: .26667rem /* 20/75 */;
            margin-bottom: .4rem /* 30/75 */;
        }
        button{
            width: 100%;
            height: 1.06667rem /* 80/75 */;
            line-height: 1.06667rem /* 80/75 */;
            text-align: center;
            border-radius: .13333rem /* 10/75 */;
            border:none;
            color: #fff;
            background: @color-green;
            font-size: .37333rem /* 28/75 */;
            margin-bottom: .4rem /* 30/75 */;
            box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.12);
            &:active{
                background: @color-00cc8f;
            }
        }
        button.continue{
            border:1px solid @color-green;
            background: #fff;
            color: @color-green;
        }
        p{
            width: 100%;
            text-align: right;
            color: @color-969699;
            font-size: .32rem /* 24/75 */;
            a{
                color:@color-8976cc;
                text-decoration: underline;
            }
        }

    }
}
</style>


