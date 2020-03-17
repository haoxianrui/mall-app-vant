<template>
    <div class="goods-list">
        <van-grid :border="true" :column-num="2">
            <van-grid-item v-for="(item,index) in seckillGoodsData">
                <van-card
                        tag="秒杀"
                        :title="item.name"
                        :price="item.price"
                        :desc="item.desc"
                        :thumb="item.image"
                        :origin-price="item.originPrice"
                >
                    <div slot="footer">
                        <van-button color="linear-gradient(to right, #ee0a24, #f75b52)" size="mini"
                                    @click="goToGoodsDetail(item)">马上抢
                        </van-button>
                    </div>
                </van-card>
            </van-grid-item>
        </van-grid>
    </div>
</template>

<script>
    import {Toast} from 'vant'

    export default {
        name: "goods",
        props: {
            seckillGoodsData: Array
        },
        mounted() {
            //Toast('请求失败')
        },
        data() {
            return {}
        },
        methods: {
            goToGoodsDetail(goods) {
                this.$router.push({
                    name: "goodsDetail",
                    query: {
                        id: goods.id,
                        name: goods.name,
                        desc:goods.desc,
                        image: goods.image,
                        price: goods.price,
                        originPrice:goods.originPrice,
                        totalNum:goods.totalNum,
                        soldNum:goods.soldNum,
                        images:goods.images,
                        isSeckill:true
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .goods-list {
        .van-grid-item {
            .van-card {
                width: 100%;
                padding: 8px;
                background: #FFFFFF;
            }
        }
    }
</style>