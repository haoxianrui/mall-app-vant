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
                <van-image width="100%" height="280" :src="item.image"/>
            </van-swipe-item>
        </van-swipe>

        <!-- 秒杀提示 -->
        <van-row class="goods-detail-spike" v-show="isSpike===true">
            <van-col span="18" class="goods-detail-spike-price">
                <van-row>
                    <van-col span="8">
                        {{goods.spikePrice|moneyFormat}}
                    </van-col>
                    <van-col span="16">
                        {{goods.price|moneyFormat}}
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="6" class="goods-detail-spike-time" align="right">
                29:59:59
            </van-col>
        </van-row>


        <van-row class="goods-detail-base" v-show="isSpike===false">
            <van-col  span="18">
                <div class="goods-detail-base-title">{{goods.name}}</div>
                <div class="goods-detail-base-description">{{goods.description}}</div>
            </van-col>
            <van-col class="goods-detail-base-operate" span="6" >
            </van-col>
        </van-row>


        <van-row class="goods-detail-attribute">
            <van-cell-group title="商品参数">
                <van-cell :title="attribute.name" :value="attribute.value"  v-for="attribute in goods.attributeList" />
            </van-cell-group>
        </van-row>

        <van-row class="goods-detail-detail">
            商品展示详情啊
        </van-row>

        <van-row class="goods-detail-faq">
            <van-divider>常见问题</van-divider>
        </van-row>

    </div>
</template>

<script>
    import {getGoodsInfo} from '@/api/goods'

    export default {
        name: "index",
        data() {
            return {
                // isSpike: this.$route.params.isSpike,
                isSpike: false,
                goodsId: this.$route.query.goodsId,
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
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .goods-detail {
        &-swipe {

        }

        &-spike {
            &-price {

            }

            &-time {

            }
        }

        &-base{
            background: #FFFFFF;
            padding:15px
        }
        &-attribute{
            margin-top: 10px;

            .van-cell-group__title{
                background: #FFFFFF;
                color: #000;
                font-size: 16px;
            }
            .van-cell-group{
                padding: 10px;
            }
            .van-cell{
                margin-bottom: 10px;
                background: #f5f5f5;
                padding:5px 16px;
            }
        }
        &-detail{
            background: #FFFFFF;
            margin-top: 10px;
            padding: 10px;
        }
        &-faq{
            background: #FFFFFF;
            padding: 10px;
            .van-divider::after, .van-divider::before{
                border-width:2px 0 0;
            }
        }
    }


</style>