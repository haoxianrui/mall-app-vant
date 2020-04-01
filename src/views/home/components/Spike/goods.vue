<!-- 秒杀商品 -->
<template>
    <div class="spikeGoodsWrapper"
         ref="spikeGoodsWrapper"
    >
        <ul class="goods">
            <li class="goods-item"
                ref="goodsItem"
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
                let contentWidth = 0
                let items = this.$refs.goodsItem
                if (items) {
                    console.log(items)
                    items.forEach(item => {
                        contentWidth += item.clientWidth
                    })
                    this.$refs.spikeGoodsWrapper.style.width = contentWidth + "px"
                    if (!this.scroll) {
                        this.scroll = new BScroll('.spikeGoodsWrapper', {
                            probeType: 2,
                            startX: 0,
                            click: true,
                            scrollX: true,
                            scrollY: false,
                            eventPassthrough: "vertical" //保留原生的纵向滚动
                        })
                    } else {
                        this.scroll.refresh()
                    }
                }

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

</style>