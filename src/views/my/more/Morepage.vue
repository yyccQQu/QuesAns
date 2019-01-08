<template>
    <div class="aboutbox">
        <Header :title="title" :rooter="'-1'" :hasNoBack="true" :iFontsize="'.58667rem'" :isShowHome="false"></Header>

        <div class="aboutus-pic">
            <img :src="picUrl" alt="">
        </div>
        <div class="aboutus">
            <div class="aboutus-title pk-1px-b">
                {{title}}
            </div>
            <p>{{content}}</p>
        </div>
    </div>
</template>

<script>
    import Header from "../../../components/Header";
    // import contact from "@/proto/contact_pb";
    // const contact = proto.pb;
      import {
        getMore
    } from '@/api/my'
    export default {
        components: {
            Header
        },
        name: "morepage",
        data(){
            return{
                title:'',
                content:'',
                thisId:this.$route.query.id,
                picUrl:''
            }
        },
        mounted() {
            this.info();
        },
        methods:{
            info(){
                getMore().then(res => {
                    // console.log(res);
                    let list = res.iwordList;
                    this.picUrl = res.logo;
                    for(var i in list){
                        if(list[i].id == this.thisId){
                            this.title = list[i].title;
                            this.content = list[i].content;
                        }
                    }
                }).catch(err =>{});
            }
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../../components/less/common.less');
    .aboutbox {
        padding-top: 1.22667rem;
        .aboutus-pic {
            img {
                margin: 0.27rem 0;
                width: 100%;
                height: 4rem;
            }
        }
        .aboutus {
            background-color: #fff;
            .aboutus-title {
                padding: 0 0.4rem;
                height: 1rem;
                line-height: 1rem;
                font-size: 0.37rem;
                color: @color-323233;
            }
            p {
                padding: 0.1rem 0.4rem;
                line-height: 0.6rem;
                font-size: 0.37rem;
                color: @color-646466;
            }
        }
        .pk-1px-b:after {
            left: 0.4rem;
            border-color: @color-c7c7cc;
        }
    }
</style>
