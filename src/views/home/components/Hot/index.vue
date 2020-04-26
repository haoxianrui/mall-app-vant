<!-- 人气推荐 -->
<template>
    <div class="hot">
        <div class="hot-header">
            <span class="hot-header-title">人气推荐</span>

            <span class="hot-header-more">
               <van-icon name="arrow" size="14"/>
            </span>
        </div>
        <div class="hot-goods">
            <van-card
                    class="hot-goods-item"
                    v-for="(item,index) in hotGoodsList"
                    :price="item.retail_price"
                    :desc="item.description"
                    :title="item.name"
                    tag="hot"
                    :thumb="item.pic_url"
                    @click="gotoGoodsDetail(item.id)"
            >
                <template #tags>
                    <van-tag plain type="danger">多色可选</van-tag>
                </template>
            </van-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        props: {
            hotGoodsList: Array
        },
        watch: {
            hotGoodsList: function (newValue, oldValue) {
                this.hotGoodsList = newValue
            }
        },
        methods:{
            gotoGoodsDetail(goodsId) {
                this.$router.push({
                    name: 'goods',
                    params: {
                        goodsId: goodsId
                    }
                })
            }

        }
    }
</script>

<style lang="less" scoped>
    .hot {
        padding: 0 10px;
        margin-top: 10px;


        &-header {
            vertical-align: middle;

            &-title {
                display: inline-block;
                font-size: 14px;
                height: 30px;
                line-height: 30px;
            }

            &-more {
                .van-icon {
                    margin-left: 5px;
                    height: 30px;
                    line-height: 30px;
                    float: right;
                }
            }
        }
    }
</style>