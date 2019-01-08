<template>
    <div>
        <header class="info-header">
            <div class="left">
                <a><i class="iconfont icon-Information"></i></a>
            </div>
            <div class="center">
                <span>YC-game</span>
            </div>
            <div class="right">
                <a> <i class="iconfont icon-Integral"></i>在线客服</a>
            </div>
        </header>
    </div>
</template>

<script>
    export default {
    
    }
</script>

<style lang='less' scoped>
    @import url('./less/common.less');
    header.info-header {
    height: 1.22667rem/* 92/75 */
    ;
    padding: 0 0.4rem/* 30/75 */
    ;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-image: linear-gradient(#252232, #252232), linear-gradient(180deg, #333333 0%, #595959 100%), linear-gradient(#f6f7fd, #f6f7fd);
    background-blend-mode: normal, normal, normal;
    color: @color-green;
    position: fixed;
    top: 0;
    width: 100%;
    left: 0;
    right: 0;
    z-index: 99;
    box-sizing: border-box;
    .left {
        flex: 1;
        a {
            i {
                font-size: 0.48rem/* 36/75 */
                ;
                position: relative;
                color: @color-green;
                &:after {
                    content: "";
                    display: block;
                    position: absolute;
                    width: 0.18667rem/* 14/75 */
                    ;
                    height: 0.18667rem/* 14/75 */
                    ;
                    border-radius: 50%;
                    background-color: @color-red;
                    right: 0;
                    top: 0;
                }
            }
        }
    }
    .center {
        flex: 1;
        text-align: center;
        span {
            font-family: ComicSansMS;
            font-size: 0.48rem;
        }
    }
    .right {
        flex: 1;
        text-align: right;
        a {
            font-size: 0.32rem/* 24/75 */
            ;
            color: @color-green;
            i {
                margin-right: .13333rem/* 10/75 */
                ;
                color: @color-green;
                font-size: 0.48rem/* 36/75 */
                ;
                vertical-align: middle;
            }
        }
    }
}
</style>


