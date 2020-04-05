<template>
    <div id="orderList">
        <div v-if="orderList.length>0">
            <div class="order" v-for="item in orderList">
                <div class="order-header">
                    <van-cell
                            :value="formatOrderStatus(item.status)">
                        <template #title>
                        <span class="custom-title" style="width: 100px">
                            {{formatOrderNo(item.orderNo)}}
                        </span>
                        </template>
                    </van-cell>
                </div>

                <div class="order-goods">
                    <van-card v-for="goods in item.goodsList"
                              :title="goods.goodsName"
                              :num="goods.goodsCount"
                              :price="goods.goodsPrice"
                              :desc="goods.goodsSku"
                              :thumb="goods.goodsImageUrl">
                        <template #tags>
                            <van-tag plain type="danger">七天无理由退货</van-tag>
                        </template>
                    </van-card>
                </div>

                <div class="order-footer">
                    <van-cell :title="formatOrderTotalPrice(item.status,item.totalPrice)">
                        <template #default>
                            <van-button plain type="default" v-if="item.status===1" size="small">
                                取消订单
                            </van-button>
                            <van-button plain type="danger" v-if="item.status===1" size="small" @click="onClickPayment">
                                立即付款
                            </van-button>
                            <van-button plain type="default" v-if="item.status===2" size="small">
                                提醒发货
                            </van-button>
                            <van-button plain type="default" v-if="item.status===3" size="small">
                                查看物流
                            </van-button>
                            <van-button plain type="default" v-if="item.status===3" size="small">
                                确认收货
                            </van-button>

                            <van-button plain type="default" v-if="item.status===4" size="small">
                                再次购买
                            </van-button>
                        </template>
                    </van-cell>
                </div>
            </div>
        </div>
        <div v-else class="no-data">
            <div>
                <img src="../../../../../assets/images/empty_shopping_cart.png" height="100" width="140"/>
            </div>
            <div> 还没有任何订单呢</div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            orderList: Array
        },
        mounted() {
            console.log(this.orderList)
        },
        watch: {
            orderList: function (newValue, oldValue) {
                this.orderList = newValue
            }
        },
        methods: {
            onClickPayment() {
            },
            formatOrderStatus(status) {
                let desc;
                if (status === 1) {
                    desc = '等待付款'
                } else if (status === 2) {
                    desc = '等待发货'
                } else if (status === 3) {
                    desc = '等待收货'
                } else if (status === 4) {
                    desc = '交易完成'
                } else if (status === 5) {
                    desc = '交易关闭'
                }
                return desc
            },
            formatOrderNo(orderNo) {
                return '订单号：' + orderNo
            },
            formatOrderTotalPrice(status, totalPrice) {
                let prefix = '已付金额'
                if (status === 1) {
                    prefix = '实付金额'
                }
                return prefix + '：¥' + totalPrice
            }
        }
    }
</script>

<style lang="less" scoped>

    #orderList {
        .order:not(:first-child) {
            margin-top: 10px;
        }

        .order {
            &-header {
                .van-cell__title {
                    -webkit-box-flex: 2;
                    -webkit-flex: 2;
                }

                .van-cell__value {
                    -webkit-box-flex: 1;
                    -webkit-flex: 1;
                    color: #ee0a24;
                }
            }

            &-goods {
                .van-card:not(:first-child) {
                    margin-top: 0;
                }

                .van-card__title {
                    font-weight: 700;
                }
            }

            &-footer {
                .van-button {
                    margin-left: 5px;
                }
            }
        }

        .no-data {
            text-align: center;
            color: #666666;
            font-size: 16px;

            img {
                margin: 100px 0 10px;
            }
        }

    }


</style>