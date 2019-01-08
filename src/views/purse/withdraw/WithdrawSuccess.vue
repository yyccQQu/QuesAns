<template>
    <div class="widthdraw-success">
        <Header rooter="-1" title="取款" :hasNoBack="true" iFontsize=".58667rem"></Header>
        <div class="content">
            <pay-success :dataObj="dataObj" @ok="$router.go(-3)"></pay-success>
            <adv-common :advType="-3"></adv-common>
        </div>
    </div>
</template>
<script>
import Header from '@/components/Header'
import PaySuccess from '@/components/PaySuccess'
import AdvCommon from '@/components/Advcommon'
import func from '@/api/purse'

export default {
    name:'withdrawSuccess',
    components:{
        Header,
        PaySuccess,
        AdvCommon
    },
    data(){
        return {
            dataObj:{
                desc:'出款已提交，我们将尽快审核您的订单，请注意查收消息。',
                details:[
                    {name:'订单号',value:''},
                ]
            }
        }
    },
    created(){
        this.dataObj.details[0].value = this.$route.query.orderId;
    },
    methods:{
    }
}
</script>
<style lang="less" scoped>
.content{
    padding-top: 1.22667rem /* 92/75 */;
}
</style>


