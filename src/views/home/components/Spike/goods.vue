<!-- 秒杀商品 -->
<template>
    <div class="goods-wrapper">
        <ul class="goods-content" ref="goodsContent">
            <li class="goods-item" ref="goodsItem"
                v-for="(item,index) in spikeGoodsList"
                :key="index"
                @click="handleOpenGoodsDetail(item)"
            >
                <img v-lazy="item.goodsPic"/>
                <span class="goods-item-name">{{item.goodsName}}</span>
                <div class="goods-item-price">
                    <p class="goods-item-price-spike">{{item.spikePrice}}</p>
                    <p class="goods-item-price-original">{{item.goodsPrice}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>

    import BScroll from 'better-scroll'

    export default {
        name: "goods",
        props: {
            spikeGoodsList: Array
        },
        watch: {
            spikeGoodsList: function (newValue, oldValue) {
                this.spikeGoodsList = newValue
            }
        },
        mounted() {
            this.$nextTick(() => {
                let that = this
                setTimeout(function () {
                    let contentWidth = 0
                    let items = that.$refs.goodsItem
                    if (items) {
                        items.forEach(item => {
                            contentWidth += item.clientWidth
                        })
                        that.$refs.goodsContent.style.width = contentWidth + "px"
                        if (!that.scroll) {
                            that.scroll = new BScroll('.goods-wrapper', {
                                probeType: 2,
                                startX: 0,
                                click: true,
                                scrollX: true,
                                scrollY: false,
                                eventPassthrough: "vertical" //保留原生的纵向滚动
                            })
                        } else {
                            that.scroll.refresh()
                        }
                    }

                })
            })
        },
        methods: {
            handleOpenGoodsDetail(goods) {
                this.$router.push({
                    name: "goodsDetail",
                    query: {
                        id: goods.id,
                        name: goods.name,
                        desc: goods.desc,
                        image: goods.image,
                        price: goods.price,
                        originPrice: goods.originPrice,
                        stock: goods.stock,
                        images: goods.images,
                        isSpike: true
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .goods-wrapper {
        width: 100%;
        overflow: hidden;
        position: absolute;

        .goods-content {
            display: flex;
            justify-content: flex-start;

            .goods-item {
                flex: 0 0 6rem;
                align-items: center;
                padding-right: 0.5rem;
            }

        }

        @keyframes mymove {
            0% {
                transform: scale(1);
            }
            25% {
                transform: scale(0.8);
            }
            50% {
                transform: scale(0.6);
            }
            75% {
                transform: scale(0.4);
            }
            100% {
                transform: scale(0.2);
            }
        }
        @-moz-keyframes mymove {
            0% {
                transform: scale(1);
            }
            25% {
                transform: scale(0.8);
            }
            50% {
                transform: scale(0.6);
            }
            75% {
                transform: scale(0.4);
            }
            100% {
                transform: scale(0.2);
            }
        }
        @-webkit-keyframes mymove {
            0% {
                transform: scale(1);
            }
            25% {
                transform: scale(0.8);
            }
            50% {
                transform: scale(0.6);
            }
            75% {
                transform: scale(0.4);
            }
            100% {
                transform: scale(0.2);
            }
        }
        @-o-keyframes mymove {
            0% {
                transform: scale(1);
            }
            25% {
                transform: scale(0.8);
            }
            50% {
                transform: scale(0.6);
            }
            75% {
                transform: scale(0.4);
            }
            100% {
                transform: scale(0.2);
            }
        }
    }


</style>