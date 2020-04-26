<template>
    <div class="goods">
        <van-nav-bar
                title="商品详情页"
                :fixed=true
                left-arrow
                @click-left="onClickLeft"
        />
        <!--  商品图片轮播 -->
        <van-swipe class="goods-swipe"
                   :autoplay="3000"
                   @change="onChange"
        >
            <van-swipe-item v-for="item in goods.images">
                <img :src="item">
            </van-swipe-item>
            <div class="custom-indicator" slot="indicator">
                {{ current + 1 }}/{{goods.images.length}}
            </div>
        </van-swipe>

        <div class="goods-seckill" v-show="goods.isSeckill">
            <div class="left">
                <van-icon name="clock-o"/>
                <span>秒杀抢购中</span>
            </div>
            <div class="right">
                <span>本场结束剩余</span>
                <van-count-down :time="time"
                                class="count"
                                format="HH mm ss">
                    <template v-slot="timeData">
                        <span class="item">{{ timeData.hours }}</span>
                        :
                        <span class="item">{{ timeData.minutes }}</span>
                        :
                        <span class="item">{{ timeData.seconds }}</span>
                    </template>
                </van-count-down>
            </div>
        </div>

        <van-cell-group class="goods-cell-group">
            <van-cell style="padding-bottom: 0" :border="false" :title="goods.name" :label="goods.desc"/>
            <van-cell style="padding-top: 0" :border="false">
                <van-col span="10">
                    <span class="price">{{goods.retail_price }}</span>
                    <span class="origin-price">{{goods.counter_price | moneyFormat}}</span>
                </van-col>
                <van-col span="14" class="stock">剩余库存：{{ goods.stock }}</van-col>
            </van-cell>
        </van-cell-group>

        <van-cell-group class="goods-cell-group" style="margin-top: 5px">
            <van-cell is-link :border="true" @click="onClickService">
                <van-col span="8">
                    <template slot="default">
                        <span style="color:#666">服务说明</span>
                    </template>
                </van-col>
                <van-col span="16">
                    <template slot="default">
                        <span style="color:#666"><van-icon name="passed" color="#ff6034"/>无忧退货</span>
                        <span style="color:#666"><van-icon name="passed" color="#ff6034"/>极速退款</span>
                        <span style="color:#666"><van-icon name="passed" color="#ff6034"/>免费包邮</span>
                    </template>
                </van-col>
            </van-cell>
            <van-cell title="商品参数" is-link @click="onClickAttr"/>
            <van-cell title="选择规格" is-link :value="selectedSku" @click="onClickSepc"/>
        </van-cell-group>

        <van-goods-action :safe-area-inset-bottom=true
                          style="z-index:1999">
            <van-goods-action-icon icon="chat-o" text="客服" color="#07c160"/>
            <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickCart" :info="goodsNum"/>
            <van-goods-action-icon icon="star" text="已收藏" color="#ff5000"/>
            <van-goods-action-button type="warning" text="加入购物车" @click="onClickAddToCart"/>
            <van-goods-action-button type="danger" text="立即购买" @click="onClickBuyNow"/>
        </van-goods-action>

        <!-- 服务描述上拉菜单 -->
        <van-action-sheet v-model="showService" title="标题">
            <div class="content">服务描述</div>
            <div class="content">服务描述</div>
            <div class="content">服务描述</div>
            <div class="content">服务描述</div>
        </van-action-sheet>

        <!-- 属性上拉菜单 -->
        <van-action-sheet v-model="showAttr" title="商品参数">
            <van-cell title="商品编号" value="100001"/>
            <van-cell title="上市年份" value="2020年"/>
            <van-cell title="颜色" value="黑色/白色/蓝色/藏青色"/>
            <van-cell title="尺码" value="S/M/L/XL"/>
            <van-cell title="品牌" value="NIKE"/>
            <van-cell title="主含材料" value="棉"/>
            <van-cell title="适合季节" value="秋/冬"/>
            <van-cell title="适合人群" value="青年/少年"/>
        </van-action-sheet>

        <!-- 规格上拉菜单 -->


        <van-action-sheet v-model="showSpec" title="标题">
            <van-sku
                    v-model="showSpec"
                    :sku="sku"
                    :goods="goods"
                    :goods-id="goods.id"
                    :quota="quota"
                    :hide-stock="sku.hide_stock"
                    :initial-sku="initialSku"
                    ref="goodsSku"
            >
                <template #sku-actions="props">
                    <div class="van-sku-actions">
                        <van-button
                                square
                                size="large"
                                type="warning"
                                @click="onClickBuy"
                        >
                            确定
                        </van-button>
                    </div>
                </template>
            </van-sku>
        </van-action-sheet>

    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {Toast} from 'vant'

    export default {
        data() {
            return {
                // 秒杀倒计时
                time: 30 * 60 * 1000 * 100,
                selectedSku: undefined,
                // 是否秒杀
                isSpike: false,
                goods: this.$route.query,
                current: 0,
                showService: false,
                showAttr: false,
                showSpec: false,
                quota: 1, // 限购数
                sku: {
                    tree: [
                        {
                            k: '颜色', // skuKeyName：规格类目名称
                            v: [{
                                id: '1001', // skuValueId：规格值 id
                                name: '黑色', // skuValueName：规格值名称
                                imgUrl: 'https://img.yzcdn.cn/vant/apple-1.jpg', // 规格类目图片，只有第一个规格类目可以定义图片
                                previewImgUrl: 'https://img.yzcdn.cn/vant/apple-1.jpg', // 用于预览显示的规格类目图片
                            },
                                {
                                    id: '1002',
                                    name: '白色',
                                    imgUrl: 'https://img.yzcdn.cn/vant/apple-5.jpg',
                                    previewImgUrl: 'https://img.yzcdn.cn/vant/apple-5.jpg',
                                }
                            ],
                            k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                        },
                        {
                            k: '版本', // skuKeyName：规格类目名称
                            v: [
                                {
                                    id: '2001', // skuValueId：规格值 id
                                    name: '64G', // skuValueName：规格值名称
                                },
                                {
                                    id: '2002',
                                    name: '128G',
                                }
                            ],
                            k_s: 's2' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                        }
                    ],
                    // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
                    list: [
                        {
                            id: 3001, // skuId，下单时后端需要
                            price: 599900, // 价格（单位分）
                            s1: '1001', // 规格类目 k_s 为 s1 的对应规格值 id
                            s2: '2001', // 规格类目 k_s 为 s2 的对应规格值 id
                            s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                            stock_num: 111 // 当前 sku 组合对应的库存
                        },
                        {
                            id: 3002, // skuId，下单时后端需要
                            price: 699900, // 价格（单位分）
                            s1: '1001', // 规格类目 k_s 为 s1 的对应规格值 id
                            s2: '2002', // 规格类目 k_s 为 s2 的对应规格值 id
                            s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                            stock_num: 112 // 当前 sku 组合对应的库存
                        },
                        {
                            id: 3003, // skuId，下单时后端需要
                            price: 599900, // 价格（单位分）
                            s1: '1002', // 规格类目 k_s 为 s1 的对应规格值 id
                            s2: '2001', // 规格类目 k_s 为 s2 的对应规格值 id
                            s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                            stock_num: 113 // 当前 sku 组合对应的库存
                        },
                        {
                            id: 3004, // skuId，下单时后端需要
                            price: 699900, // 价格（单位分）
                            s1: '1002', // 规格类目 k_s 为 s1 的对应规格值 id
                            s2: '2002', // 规格类目 k_s 为 s2 的对应规格值 id
                            s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                            stock_num: 114 // 当前 sku 组合对应的库存
                        }

                    ],
                    price: '9999', // 默认价格（单位元）
                    stock_num: 100, // 商品总库存
                    collection_id: 3001, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
                    none_sku: false, // 是否无规格商品
                    hide_stock: false // 是否隐藏剩余库存
                },
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
        methods: {
            ...mapMutations(['ADD_TO_CART']),
            onClickLeft() {
                this.$router.go(-1)
            },
            onChange(index) {
                this.current = index;
            },
            onClickService() {
                this.showService = true
            },
            onClickAttr() {
                this.showAttr = true
            },
            onClickSepc() {
                this.showSpec = true
            },
            onClickBuyNow() {
                this.showSpec = true
            },
            onClickBuy() {
                let skuData = this.$refs.goodsSku.getSkuData()
                if (!skuData.selectedSkuComb) {
                    Toast("请选择商品属性")
                    return
                }
                this.showSpec = false
                let g = skuData.selectedSkuComb
                this.$router.push({name: 'order', params: {goods: {id: g.id, price:' 2.00',name:'测试商品',image:'https://img.yzcdn.cn/2.jpg'}}});
            },
            onClickAddToCart() {
                this.ADD_TO_CART(this.goods)
            },
            onClickCart() {
                if (this.userToken) {
                    this.$router.push({name: 'cart'})
                } else {
                    this.$router.push({name: 'login'})
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .goods {
        background-color: #f5f5f5;
        padding-bottom: 100px;

        &-swipe {
            margin-top: 2.7rem;
            height: 220px;

            img {
                width: 100%;
                height: 100%;
            }

            .custom-indicator {
                position: absolute;
                right: 5px;
                bottom: 5px;
                padding: 2px 5px;
                color: #fff;
                font-size: 12px;
                background: rgba(0, 0, 0, 0.1);
            }
        }

        &-seckill {
            display: flex;
            flex: 1;
            width: 100%;
            height: 2rem;
            line-height: 2rem;

            .left {
                width: 50%;
                background-color: #e25450;

                span {
                    font-size: 0.8rem;
                    color: #ffffff;
                    padding-left: 1rem;
                }

                i {
                    padding-left: 0.6rem;
                    font-size: 0.5rem;
                    color: #ffffff;
                }
            }

            .right {
                width: 50%;
                background-color: #fcefe9;
                height: 2rem;
                line-height: 2rem;
                padding-left: 0.5rem;
                font-size: 0.5rem;
                color: #e25450;

                .count {
                    display: inline;
                    margin-left: 0.3rem;

                    .item {
                        display: inline-block;
                        width: 22px;
                        margin-right: 5px;
                        color: #fff;
                        font-size: 12px;
                        text-align: center;
                        background-color: #e25450;
                    }
                }
            }
        }

        .van-cell-group {
            .van-cell {
                padding: 0.5rem;
            }
        }

        &-cell-group {
            .price {
                color: #e25450;
                padding-right: 0.5rem;
                font-size: 0.8rem;
            }

            .origin-price {
                color: grey;
                font-size: 0.5rem;
                text-decoration: line-through;
            }

            .stock {
                float: right;
                color: #e25450;
                font-size: 0.8rem;
                text-align: right;
            }
        }

        .van-popup--bottom.van-popup--round {
            border-radius: 0
        }
    }
</style>