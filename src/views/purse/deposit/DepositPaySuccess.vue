<template>
    <div class="pay-result">
        <Header :title="title" :showBack="false" :showRight="false"></Header>
    
        <div class="content">
            <pay-success :dataObj="dataObj" @ok="$router.go(-3)"></pay-success>
            <adv-common :advType="-2"></adv-common>
        </div>
    </div>
</template>

<script>
    import Header from '@/components/Header'
    import PaySuccess from '@/components/PaySuccess'
    import AdvCommon from '@/components/Advcommon'
    import func from '@/api/purse'
    
    export default {
        name: 'payResult',
        components: {
            Header,
            PaySuccess,
            AdvCommon
        },
        created() {
            if (this.$route.query.fromType == 1) {
                this.title = "线上入款";
                this.getOnlineOrderInfo();
               
            } else {
                this.title = "公司入款";
                this.getCompanyOrderInfo();
    
            }
        },
        data() {
            return {
                title: '线上入款',
                dataObj: {}
            }
        },
        methods: {
            //获取公司入款 订单详情
            getCompanyOrderInfo() {
                func.getOrderInfo({
                    order: this.$route.query.order,
                    incomeType: 1, //公司入款 2线上入款
                }).then((res) => {
                    console.log(res)
                    this.dataObj = {
                        desc: '您已完成存款，我们将及时为您增加余额，注意查收系统消息。',
                        details: [{
                                name: '订单号',
                                value: res.order
                            },
                            {
                                name: '存入机构',
                                value: res.bankName
                            },
                            {
                                name: '存款人',
                                value: res.incomeUser,
                            },
                            {
                                name: '存入金额',
                                value: res.incomeMoney
                            },
                            {
                                name: '存款优惠',
                                value: res.depositDiscount
                            },
                            {
                                name: '额外优惠',
                                value: res.otherDiscount
                            },
                        ]
                    }
                }).catch(err => {
                    this.$toast({
                        message:err,
                        duration: 2000
                    })
                })
            },
            //获取线上入款 订单详情
            getOnlineOrderInfo(){
                func.getOrderInfo({
                    order: this.$route.query.order,
                    incomeType: 2, //公司入款 2线上入款
                }).then((res) => {
                    console.log(res)
                    this.dataObj = {
                        desc: '恭喜！您已提交点卡存款，我们将及时为您增加余额，注意查收系统消息。',
                        details: [{
                                name: '订单号',
                                value: res.order
                            },
                            {
                                name: '存款金额',
                                value: res.incomeMoney
                            },
                        ]
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .content {
        padding-top: 1.22667rem/* 92/75 */
        ;
    }
</style>


