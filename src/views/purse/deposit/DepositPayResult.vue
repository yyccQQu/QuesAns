<template>
    <div class="pay-result">
        <Header rooter="-1" title="线上存款" :hasNoBack="true" iFontsize=".58667rem"></Header>

        <div class="content">
            <pay-return-result :fromType="2"></pay-return-result>
        </div>
    </div>
</template>
<script>
import Header from '../../../components/Header'
import PayReturnResult from '../../../components/PayReturnResult'
export default {
    name:'payResult',
    components:{
        Header,
        PayReturnResult
    }
}
</script>
<style lang="less" scoped>
.content{
    padding-top: 1.22667rem /* 92/75 */;
}
</style>


