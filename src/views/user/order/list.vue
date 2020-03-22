<template>
    <div class="order-list">
        <div v-if="orderListData.length>0">
            <div v-for="item in orderListData">
                <van-cell :title="getOrderNoDesc(item.no)">
                    <template #default>
                        <span style="color:#FB0017">
                            {{getOrderStatusDesc(item.status)}}
                        </span>
                    </template>

                </van-cell>


                <van-card v-for="goods in item.goodsList"
                          :title="goods.name"
                          :num="goods.num"
                          :price="goods.price"
                          :desc="goods.sku"
                          :thumb="goods.image">
                    <template #tags>
                        <van-tag plain type="danger">七天无理由退货</van-tag>
                    </template>
                </van-card>

                <van-cell :title="getTotalPriceDesc(item.status,item.totalPrice)">
                    <template #default>
                        <van-button plain type="default" v-if="item.status===1" size="small">
                            取消订单
                        </van-button>
                        <van-button plain type="danger" v-if="item.status===1" size="small" @click="onClickPayment"
                                    style="margin-left: 5px">
                            立即付款
                        </van-button>
                        <van-button plain type="default" v-if="item.status===2" size="small" >
                            提醒发货
                        </van-button>
                        <van-button plain type="default" v-if="item.status===3" size="small" style="margin-left: 5px">
                            查看物流
                        </van-button>
                        <van-button plain type="default" v-if="item.status===3" size="small">
                            确认收货
                        </van-button>

                        <van-button plain type="default" v-if="item.status===4" size="small">
                            再次购买
                        </van-button>
                        <van-button plain type="default" v-if="item.status===5" size="small">
                            删除订单
                        </van-button>

                    </template>
                </van-cell>
                <van-divider></van-divider>
            </div>


        </div>
        <div v-else
             class="no-data"
        >
            <van-cell :border="false" style="text-align: center">
                <img src="@/assets/images/order_no_data.png" height="64" width="64"/>
            </van-cell>
            <van-cell :border="false">
                目前没有相关订单
            </van-cell>
        </div>
    </div>
</template>

<script>
    export default {
        name: "list",
        props: {
            orderListData: Array
        },
        mounted() {
            console.log(this.orderListData)
        },
        methods: {
            onClickPayment() {
            },
            getOrderStatusDesc(status) {
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
            getOrderNoDesc(orderNo) {
                return '订单号：' + orderNo
            },
            getTotalPriceDesc(status, totalPrice) {
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
    .order-list {
        .van-card:not(:first-child) {
            margin-top: 0;
        }

        .van-card {
            padding: 4px 16px;
        }

        .no-data {
            margin-top: 5rem;

            .van-cell__value--alone {
                text-align: center;
                color: #666666;
                font-size: 16px;
            }
        }
    }


</style>