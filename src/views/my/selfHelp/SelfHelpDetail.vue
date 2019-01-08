<template>
    <div id="selfHelp">
        <Header :rooter="'selfHelp'" :title="info.proTitle" :hasNoBack="true" :iFontsize="'.58667rem'" :isShowHome="false"></Header>
        <div class="self-content">
            <div class="self-img">
                <img :src="info.wapImg">
            </div>
            <div class="self-title">
                <h2>{{info.proTitle}}</h2>
            </div>
            <div class="selfdetail-content" v-html="info.proContent"></div>
            <router-link class="self-btn" tag="div" :to="{name:'apply',query:{id:id}}">
                <div>
                    <span>立即申请</span>
                </div>
            </router-link>
            <router-link class="self-more" tag="div" :to="{name:'selfmore'}">
                <div>
                    <span>查看优惠申请记录</span>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    import Header from "../../../components/Header"
    import { 
        getInfo
    } from "@/api/SelfHelpDetail";
    export default {
        name: "selfHelpDetail",
        components: {
            Header
        },
        data() {
            return {
                id: this.$route.query.id,
                info: {},
                stusta: 1,
                actPop: false,
                resData: {}
            }
        },
        mounted() {
            this.getInfo();
        },
        methods: {
            getInfo() {
                getInfo(this.id).then(res => {
                    this.info = res;
                    // console.log(res)
                    setTimeout(() => {
                        this.$('.selfdetail-content img').css({
                            'max-width': "100%"
                        })
                    }, 1);
                }).catch((res) => {
                    this.$toast({
                        message: res,
                        duration: 2000
                    });
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    #selfHelp {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: #252232;
        box-sizing: border-box;
        line-height: 1;
        .self-content {
            padding-top: 1.22667rem;
            /* 92/75 */
            margin-top: 0.27rem;
            .self-img {
                width: 100%;
                height: 4rem;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .self-title {
                margin-top: 0.27rem;
                h2 {
                    padding-left: 0.4rem;
                    font-size: 0.45rem;
                    color: #5eb797 !important;
                }
            }
            .selfdetail-content {
                margin-top: 0.27rem;
                margin-left: 0.4rem;
                margin-right: 0.4rem;
                color: #978bcc;
            }
            .self-btn {
                margin-top: 0.52rem;
                margin-left: 0.4rem;
                margin-right: 0.4rem;
                width: 9.2rem;
                height: 1.067rem;
                background-color: #00d897;
                border-radius: 0.133rem;
                text-align: center;
                line-height: 1.067rem;
            }
            .self-more {
                margin-right: 0.4rem;
                margin-top: 0.27rem;
                text-align: right;
                color: #00d897;
            }
        }
    }
</style>