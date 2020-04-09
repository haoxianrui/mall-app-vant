<!-- 秒杀商品 -->
<template>
    <div class="goods-wrapper">
        <ul class="goods-content" ref="goodsContent">
            <li class="goods-item" ref="goodsItem"
                v-for="(goods,index) in seckillGoodsList"
                @click="gotoGoodsDetail(goods.id)"
            >
                <img class="goods-item-img" v-lazy="goods.pic_url"/>
                <div class="goods-item-price">
                    <p class="goods-item-price-spike">{{goods.seckill_price|moneyFormat}}</p>
                    <p class="goods-item-price-original">{{goods.price|moneyFormat}}</p>
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
            seckillGoodsList: Array
        },
        watch: {
            seckillGoodsList: function (newValue, oldValue) {
                this.seckillGoodsList = newValue

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
            }
        },
        mounted() {

        },
        methods: {
            gotoGoodsDetail(goodsId) {
                this.$router.push({
                    name: 'goods', params: {
                        goodsId: goodsId,
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
                align-items: center;
                margin-left:10px;
                &-img{
                    width: 80px;
                    height: 80px;
                    margin: 0 auto;
                }
                &-name{

                }
                &-price{
                    text-align: center;
                    &-spike{
                        font-size: 14px;
                        color: #FB0017;
                    }
                    &-original{
                        font-size: 12px;
                        text-decoration:line-through;
                        color: #999999;
                    }
                }
            }
        }
    }


</style>