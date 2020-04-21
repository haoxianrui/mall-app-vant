<template>
    <div class="goods-detail-container">
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
            <van-swipe-item v-for="(pic_url,index) in goods.pic_urls">
                <van-image width="100%" height="280" :src="pic_url"/>
            </van-swipe-item>
        </van-swipe>

        <van-row class="goods-detail-base">
            <van-col span="20">
                <div class="goods-detail-base-name">{{goods.name}}</div>
                <div class="goods-detail-base-title">{{goods.subtitle}}</div>
            </van-col>
            <van-col class="goods-detail-base-share" span="4">
                <van-icon class="iconfont" class-prefix="icon" name="fenxiang"/>
            </van-col>
        </van-row>

        <!-- 秒杀提示 -->
        <!--<van-row class="goods-detail-seckill" v-show="is_seckill===true">
            <van-col span="16" class="goods-detail-seckill-price">
                <van-row>
                    <van-col span="8" class="seckill-price">
                        {{goods.spikePrice|moneyFormat}}
                    </van-col>
                    <van-col span="16" class="price">
                        <p> {{goods.price|moneyFormat}}</p>
                        <div class="tag">
                            <div class="icon">
                                <van-icon name="clock-o"/>
                            </div>
                            <div class="text">有来秒杀</div>
                        </div>
                    </van-col>
                </van-row>
            </van-col>
            <van-col span="8" class="goods-detail-seckill-time" align="right">
                <p class="tip">距秒杀结束还剩</p>
                <van-count-down :time="time">
                    <template v-slot="timeData">
                        <span class="item">{{ timeData.hours }}</span>
                        <span class="split">:</span>
                        <span class="item">{{ timeData.minutes }}</span>
                        <span class="split">:</span>
                        <span class="item">{{ timeData.seconds }}</span>
                    </template>
                </van-count-down>
            </van-col>
        </van-row>-->

        <van-row class="goods-detail-sales" v-show="seckill!==true">
            <van-col span="16" class="goods-detail-sales-price">
                 <span class="goods-detail-sales-price-promotion">
                    {{goods.price|moneyFormat}}
                </span>
                <span class="goods-detail-sales-price-origin">
                    {{goods.price|moneyFormat}}
                </span>

            </van-col>
            <van-col span="8" class="goods-detail-sales-volume" align="right">
                销量: {{goods.sales_volume}} 件
            </van-col>
        </van-row>


        <van-cell title="规格" class="goods-detail-sku" is-link @click="showSkuClicked"/>

        <van-row class="goods-detail-attribute">
            <van-cell-group title="商品参数">
                <van-cell
                        v-for="attribute in goods.attribute_list"
                        :title="attribute.name"
                        :value="attribute.value"
                />
            </van-cell-group>
        </van-row>

        <van-row class="goods-detail-detail">
            {{goods.detail}}
        </van-row>

        <van-row class="goods-detail-faq">
            <van-divider>常见问题</van-divider>
        </van-row>


        <van-goods-action style="z-index: 3000">
            <van-goods-action-icon icon="star-o" text="收藏"/>
            <van-goods-action-icon icon="cart-o" text="购物车" :info="goodsNum"/>
            <van-goods-action-button type="warning" text="加入购物车" @click="onAddCartClicked"/>
            <van-goods-action-button type="danger" text="立即购买" @click="onBuyClicked"/>
        </van-goods-action>

        <!-- 商品SKU -->
        <van-action-sheet v-model="showSku" title="标题">
            <van-sku
                    v-model="showSku"
                    :sku="sku"
                    :goods="goods"
                    :goods-id="goodsId"
                    :quota="quota"
                    ref="sku"
            >
                <template #sku-actions="props">
                    <div class="van-sku-actions">
                        <!-- 空槽是为了移除sku的按钮 -->
                    </div>
                </template>
            </van-sku>
        </van-action-sheet>
    </div>
</template>

<script>
    import {goodsDetail} from '@/api/goods'
    import {mapMutations, mapState} from "vuex"
    import {Toast} from "vant"

    export default {
        name: "index",
        data() {
            return {
                seckill: this.$route.params.seckill, // 页面传值：是否秒杀商品
                goodsId: this.$route.params.goodsId, // 页面传值：商品ID
                goods: {},
                quota: 1, // 限购件数
                sku: {},
                showSku: false,
                time: 30 * 60 * 60 * 1000,
            }
        },
        computed: {
            ...mapState(['shopCart', 'userInfo']),
            // 监听购物车商品数量变化渲染购物车图标
            goodsNum() {
                let num = 0;
                Object.values(this.shopCart).forEach((goods, index) => {
                    num += goods.num;
                });
                if (num > 0) {
                    return num;
                }
            },
            userToken() {
                if (this.userInfo) {
                    return this.userInfo.token
                }
            }
        },
        mounted() {
            this.initData()
        },
        methods: {
            ...mapMutations(['ADD_TO_CART']),
            initData() {
                goodsDetail(this.goodsId).then(response => {
                    if (response.data) {
                        this.goods = response.data
                        console.log(this.goods)
                    } else {
                        this.goods = {}
                    }
                })
            },
            onClickLeft() {
                this.$router.go(-1)
            },
            showSkuClicked() {
                this.showSku = true
            },
            onBuyClicked() {
                let sku = this.$refs.sku
                if (!sku) {
                    Toast("请选择规格")
                    return
                }
                const skuData = sku.getSkuData()
                if (!skuData.selectedSkuComb) {
                    Toast("请选择规格")
                    return
                }
                this.showSku = false
                this.$router.push({name: 'order', params: {type: 1, sku_ids: sku.selectedSku}});
            },
            onAddCartClicked() {
                let goods = {
                    id: this.goods.id,
                    name: this.goods.name,
                    price: this.goods.price,
                    image: this.goods.imageList[0].image
                }
                this.ADD_TO_CART(goods)
            }
        }
    }
</script>

<style lang="less" scoped>
    .goods-detail-container {
        &-swipe {
            height: 280px;
        }

        &-seckill {
            background: #ffffff;

            &-price {
                background: #F75B52;
                color: #ffffff;

                .seckill-price {
                    font-size: 20px;
                    font-weight: 500;
                    padding-left: 20px;
                    height: 50px;
                    line-height: 50px;
                }

                .price {
                    font-size: 14px;
                    text-decoration: line-through;
                    margin: 10px 0 0 10px;
                    width: 100px;

                    .tag {
                        font-size: 12px;
                        display: inline-block;
                        border: 1px solid #ffffff;
                        text-align: center;

                        .icon {
                            display: inline-block;
                            color: #F75B52;
                            background: #ffffff;
                            padding-top: 3px;
                            width: 20px;
                            height: 16px;
                            float: left;
                            vertical-align: middle;
                        }

                        .text {
                            float: left;
                            color: #ffffff;
                            background: #F75B52;
                            width: 55px;
                            padding-top: 3px;
                        }
                    }
                }
            }

            &-time {
                padding: 5px 10px 0 0;

                .tip {
                    font-size: 12px;
                    color: #666666;
                }

                .item {
                    display: inline-block;
                    width: 20px;
                    margin-right: 2px;
                    color: #fff;
                    font-size: 12px;
                    text-align: center;
                    background-color: #ffffff;
                    color: #F75B52;
                    border: 1px solid #f3f3f3;
                }

                .split {
                    color: #F75B52;
                    margin-right: 2px;
                }
            }
        }

        &-sales {
            background: #FFFFFF;
            padding: 16px;

            &-price {
                &-promotion {
                    font-size: 18px;
                    color: #e25450;
                }

                &-origin {
                    maigin-left: 5px;
                    text-decoration: line-through;
                    color: #999999;
                }
            }
        }


        &-base {
            background: #FFFFFF;
            padding: 16px;

            &-name {
                height: 26px;
                line-height: 26px;
                font-size: 18px;
            }

            &-title {
                color: #999999;
                font-size: 14px;
                height: 26px;
                line-height: 26px;

            }

            &-share {
                height: 52px;
                border-left: 1px solid #cccccc;
                padding-top: 8px;

                .iconfont {
                    font-size: 36px;
                    color: #999999;
                    margin-left: 16px;
                }
            }
        }

        &-sku {
            border-top: 1px solid #f5f5f5;
        }

        &-attribute {
            margin-top: 10px;

            .van-cell-group__title {
                background: #FFFFFF;
                color: #000;
                font-size: 16px;
            }

            .van-cell-group {
                padding: 8px;
            }

            .van-cell {
                margin-bottom: 6px;
                background: #f5f5f5;
                padding: 6px 16px;
            }
        }

        &-detail {
            background: #FFFFFF;
            margin-top: 10px;
            padding: 10px;
        }

        &-faq {
            background: #FFFFFF;
            padding: 10px;

            .van-divider::after, .van-divider::before {
                border-width: 2px 0 0;
            }
        }

        .van-popup--bottom.van-popup--round {
            border-radius: 0
        }
    }
</style>