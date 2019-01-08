<template>
    <div class="more">
        <Header :title="'更多'" :rooter="'-1'" :hasNoBack="true" :iFontsize="'.58667rem'" :isShowHome="false"></Header>
        <div class="morebox">
            <img :src="picUrl" alt="">
        </div>
        <ul class="morelist">
            <router-link v-for="(infoList,index) in list" :key="index" tag="li" :to="{name:'morepage',query:{id:infoList.id}}" class="pk-1px-b">
                <div class="moretitle">{{infoList.title}}</div>
                <i class="iconfont icon-dlzhgl"></i>
            </router-link>
        </ul>
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
        name: "more",
        data() {
            return {
                picUrl: '',
                list: [],
            }
        },
        mounted() {
            this.info();
        },
        methods: {
            info() {
                getMore().then(res => {
                    // console.log(res);
                    this.picUrl = res.logo;
                    this.list = res.iword
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../../components/less/common.less');
    .more {
        padding-top: 1.22667rem;
        .morebox {
            img {
                margin: 0.27rem 0;
                width: 100%;
                height: 4rem;
            }
        }
        ul.morelist {
            li {
                padding: 0 0.4rem;
                height: 1rem;
                line-height: 1rem;
                background-color: #fff;
                .moretitle {
                    float: left;
                    font-size: 0.37rem;
                    color: @color-323233;
                }
                .iconfont {
                    float: right;
                    height: 1rem;
                    vertical-align: middle;
                }
            }
            &>li:last-child {
                &:after {
                    border-bottom: 0;
                }
            }
        }
    }
    
    .pk-1px-b:after {
        left: 0.4rem;
    }
</style>
