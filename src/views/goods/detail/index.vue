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

        <van-row class="goods-detail-base">
            <van-col span="20">
                <div class="goods-detail-base-name">{{goods.name}}</div>
                <div class="goods-detail-base-title">{{goods.subTitle}}</div>
            </van-col>
            <van-col class="goods-detail-base-share" span="4">
                <van-icon class="iconfont" class-prefix="icon" name="fenxiang"></van-icon>
            </van-col>
        </van-row>

        <!-- 秒杀提示 -->
        <van-row class="goods-detail-seckill" v-show="is_seckill===true">
            <van-col span="16" class="goods-detail-seckill-price">
                <van-row>
                    <van-col span="8" class="seckill-price">
                        {{goods.spikePrice|moneyFormat}}
                    </van-col>
                    <van-col span="16" class="price">
                        <p> {{goods.price|moneyFormat}}</p>
                        <div class="tag">
                            <div class="icon"><van-icon name="clock-o"/></div>
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
        </van-row>

        <van-row class="goods-detail-sales" v-show="is_seckill!==true">
            <van-col span="16" class="goods-detail-sales-price">
                 <span class="goods-detail-sales-price-promotion">
                    {{goods.promotionPrice|moneyFormat}}
                </span>
                <span class="goods-detail-sales-price-origin">
                    {{goods.price|moneyFormat}}
                </span>

            </van-col>
            <van-col span="8" class="goods-detail-sales-volume" align="right">
                销量: {{goods.salesVolume}} 件
            </van-col>
        </van-row>


        <van-cell title="规格" class="goods-detail-sku" is-link @click="onShowSkuClicked"/>

        <van-row class="goods-detail-attribute">
            <van-cell-group title="商品参数">
                <van-cell :title="attribute.name" :value="attribute.value" v-for="attribute in goods.attributeList"/>
            </van-cell-group>
        </van-row>

        <van-row class="goods-detail-detail">
            商品展示详情啊
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
                        <!-- 空槽移除sku的按钮 -->
                    </div>
                </template>

            </van-sku>
        </van-action-sheet>
    </div>
</template>

<script>
    import {getGoodsInfo, getGoodsSku} from '@/api/goods'
    import {mapMutations, mapState} from "vuex"
    import {Toast} from "vant"
    import axios from 'axios'

    export default {
        name: "index",
        data() {
            return {
                time: 30 * 60 * 60 * 1000,
                is_seckill: this.$route.params.is_seckill,
                goodsId: this.$route.params.goodsId,
                goods: {},
                showSku: false,
                quota: 1, // 限购件数
                sku: {  // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
                    // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
                    tree: [
                        {
                            k: '颜色', // skuKeyName：规格类目名称
                            v: [
                                {
                                    id: '30349', // skuValueId：规格值 id
                                    name: '红色', // skuValueName：规格值名称
                                    imgUrl: 'https://img.yzcdn.cn/1.jpg', // 规格类目图片，只有第一个规格类目可以定义图片
                                    previewImgUrl: 'https://img.yzcdn.cn/1p.jpg', // 用于预览显示的规格类目图片
                                },
                                {
                                    id: '1215',
                                    name: '蓝色',
                                    imgUrl: 'https://img.yzcdn.cn/2.jpg',
                                    previewImgUrl: 'https://img.yzcdn.cn/2p.jpg',
                                }
                            ],
                            k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                        }
                    ],
                    // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
                    list: [
                        {
                            id: '2259', // skuId，下单时后端需要
                            price: 100, // 价格（单位分）
                            s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
                            s2: '1193', // 规格类目 k_s 为 s2 的对应规格值 id
                            s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                            stock_num: 110 // 当前 sku 组合对应的库存
                        }
                    ]
                },
                    // },
                initialSku: {
                    // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
                    // 值：skuValueId（规格值 id）
                    s1: '1001',
                    s2: '2001',
                    // 初始选中数量
                    selectedNum: 1
                }
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
                this.getGoodsInfo(this.goodsId)
                let that=this
                axios.get("http://localhost:9999/pms/api.app/v1/spus/1250428037998395393").then(function (response) {

                    that.sku= response.data.data.sku
                    console.log(that.sku)

                }).catch(function (error) {
                })

                //this.getGoodsSku()
            },
            onClickLeft() {
                this.$router.go(-1)
            },
            getGoodsInfo() {
                getGoodsInfo(this.goodsId).then(response => {
                    this.goods = response.data
                })
            },
            getGoodsSku() {
                getGoodsSku().then(response => {
                    this.sku = response.data
                    console.log(this.sku)
                })
            },
            onShowSkuClicked() {
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
    .goods-detail {
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
                    line-height:50px;
                }
                .price {
                    font-size: 14px;
                    text-decoration: line-through;
                    margin:10px 0 0 10px;
                    width: 100px;
                    .tag {
                        background: #ffffff;
                        font-size: 12px;
                        display: inline-block;
                        border: 1px solid #ffffff;
                        border-bottom: none;
                        height: 18px;
                        text-align: center;
                        .icon {
                            margin-top: 2px;
                            color: #F75B52;
                            background: #ffffff;
                            width: 20px;
                            float: left;
                            vertical-align: middle;
                        }
                        .text {
                            float: left;
                            color: #ffffff;
                            background: #F75B52;
                            width: 55px;
                        }
                    }
                }
            }

            &-time {
                padding:5px 10px 0 0;
                .tip{
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
                .split{
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