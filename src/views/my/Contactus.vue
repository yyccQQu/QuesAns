<template>
    <div class="contactus">
        <Header :title="'联系我们'" rooter="-1" :hasNoBack="true" :iFontsize="'.58667rem'" :isShowHome="false"></Header>
        <ul class="contList">
            <li v-if="contactList" v-for="(Lists,index) in contactList" :key="index">
                <div class="us-title">{{Lists.title}}</div>
                <div class="us-cont">{{Lists.content}}</div>
            </li>
            <li v-else-if="!contactList">暂无联系方式</li>
        </ul>
    </div>
</template>

<script>
    import Header from "../../components/Header";
    import { info } from "@/api/Contactus";    
    export default {
        components: {
            Header
        },
        name: 'contactus',
        data() {
            return {
                contactList: [],
                title: '',
                arr: [{
                        itype: 1,
                        iname: '手机'
                    },
                    {
                        itype: 2,
                        iname: '座机'
                    },
                    {
                        itype: 3,
                        iname: '微信'
                    },
                    {
                        itype: 4,
                        iname: 'qq'
                    },
                    {
                        itype: 5,
                        iname: '邮箱'
                    },
                    {
                        itype: 6,
                        iname: '在线客服'
                    }
                ],
            }
        },
        mounted() {
            this.info();
        },
        methods: {
            info() {
                let _this = this;
                info().then(res => {
                    // console.log(res,'ress')
                    let list = res.list;
                    if (res) {
                        for (var i in list) {
                            if (_this.arr[i].itype == list[i].itype) {
                                _this.contactList.push({
                                    content: list[i].content,
                                    title: _this.arr[i].iname
                                })
                            }
                        }
                    }
                }).catch((err) => {
                    this.$toast({
                        message: err,
                        duration: 2000
                    });
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../components/less/common.less');
    .contactus {
        padding-top: 1.49667rem;
        ul.contList {
            margin-bottom: 1.30667rem;
            background-color: #fff;
            li {
                position: relative;
                padding: 0 0.4rem;
                height: 1.1rem;
                line-height: 1.1rem;
                font-size: 0.37rem;
                &:after {
                    position: absolute;
                    left: 0.4rem;
                    right: 0;
                    bottom: 0;
                    height: 1px;
                    content: '';
                    -webkit-transform: scaleY(.5);
                    transform: scaleY(.5);
                    background-color: @color-c8c8cc;
                }
                .us-title {
                    float: left;
                    color: @color-323233;
                }
                .us-cont {
                    float: right;
                    color: @color-646466;
                }
            }
            &>li:last-child {
                &:after {
                    height: 0;
                }
            }
        }
    }
</style>


