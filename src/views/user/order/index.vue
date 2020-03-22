<template>
    <div class="order">
        <van-nav-bar
                title="我的订单"
                :fixed=true
                left-arrow
                @click-left="onClickLeft"
        />
        <van-tabs v-model="activeName" @click="onClickOrder" sticky>
            <van-tab title="全部" :name="0">
                <OrderList :orderListData="orderListData"></OrderList>
            </van-tab>
            <van-tab title="待付款" :name="1">
                <OrderList :orderListData="orderListData"></OrderList>
            </van-tab>
            <van-tab title="待发货" :name="2">
                <OrderList :orderListData="orderListData"></OrderList>
            </van-tab>
            <van-tab title="待收货" :name="3">
                <OrderList :orderListData="orderListData"></OrderList>
            </van-tab>
            <van-tab title="已完成" :name="4">
                <OrderList :orderListData="orderListData"></OrderList>
            </van-tab>
            <van-tab title="已取消" :name="5">
                <OrderList :orderListData="orderListData"></OrderList>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
    import OrderList from '@/views/user/order/list'
    import {order} from '@/api/user'

    export default {
        name: "index",
        data() {
            return {
                activeName: this.$route.params.active,
                orderListData: []
            };
        },
        mounted() {
            this._initData()
        },
        components: {
            OrderList
        },
        methods: {
            _initData() {
                this.getOrderData()
            },
            onClickLeft() {
                this.$router.back();
            },
            onClickOrder() {
                this.getOrderData()
            },
            getOrderData() {
                this.orderListData = []
                order().then(response => {
                    if (response.data && response.data.length > 0) {
                        if (this.activeName === 0) { // 全部
                            this.orderListData = response.data
                        } else {
                            this.orderListData = response.data.filter(item => item.status == this.activeName)
                        }
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .order {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f5f5f5;
        z-index: 2000;
        padding-top: 44px;
        overflow: auto;
    }
</style>