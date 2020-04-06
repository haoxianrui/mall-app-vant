<template>
    <div class="goods-detail">
        <van-nav-bar
                title="商品详情页"
                :fixed=true
                left-arrow
                @click-left="onClickLeft"
        />

        <!--  商品图片轮播 -->
        <van-swipe class="goods-detail-swipe"
                   :autoplay="3000"
        >
            <van-swipe-item v-for="(item,index) in goods.imageList">
                <van-image width="100%" height="300" :src="item.image"/>
            </van-swipe-item>
        </van-swipe>

        <!-- 秒杀提示 -->
        <van-row>
            <van-col span="18">span: 18</van-col>
            <van-col span="6">span: 6</van-col>
        </van-row>
    </div>
</template>

<script>
    import {getGoodsInfo} from '@/api/goods'

    export default {
        name: "index",
        data() {
            return {
                isSpike: this.$route.params.isSpike,
                goodsId: this.$route.params.goodsId,
                goods: {}
            }
        },
        mounted() {
            this.initData()
        },
        methods: {
            initData() {
                this.getGoodsInfo(this.goodsId)
            },
            onClickLeft() {
                this.$router.go(-1)
            },
            getGoodsInfo() {
                getGoodsInfo(this.goodsId).then(response => {
                    this.goods = response.data
                    console.log(this.goods)

                })
            }
        }
    }
</script>

<style lang="less" scoped>

</style>