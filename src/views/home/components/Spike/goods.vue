<!-- 秒杀商品 -->
<template>
    <div class="goods-wrapper">
        <ul class="goods-content" ref="goodsContent">
            <li class="goods-item" ref="goodsItem"
                v-for="(goods,index) in spikeGoodsList"
                @click="gotoGoodsDetail(goods.id)"
            >
                <img class="goods-item-img" v-lazy="goods.goodsPic"/>
               <!-- <div class="goods-item-name">{{item.goodsName}}</div>-->
                <div class="goods-item-price">
                    <p class="goods-item-price-spike">{{goods.spikePrice|moneyFormat}}</p>
                    <p class="goods-item-price-original">{{goods.goodsPrice|moneyFormat}}</p>
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
            gotoGoodsDetail(goods) {
                this.$router.push({
                    name: 'goods', params: {
                        goodsId: goods.id,
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