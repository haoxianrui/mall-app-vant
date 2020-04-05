<template>
    <div class="order">
        <van-nav-bar
                title="我的订单"
                :fixed=true
                left-arrow
                @click-left="onClickLeft"
        />
        <van-tabs class="order-category" v-model="activeName" @click="onClickOrder" sticky>
            <van-tab title="全部" :name="0">
                <OrderList :orderList="orderList"></OrderList>
            </van-tab>
            <van-tab title="待付款" :name="1">
                <OrderList :orderList="orderList"></OrderList>
            </van-tab>
            <van-tab title="待发货" :name="2">
                <OrderList :orderList="orderList"></OrderList>
            </van-tab>
            <van-tab title="待收货" :name="3">
                <OrderList :orderList="orderList"></OrderList>
            </van-tab>
            <van-tab title="待评价" :name="4">
                <OrderList :orderList="orderList"></OrderList>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
    import OrderList from './components/OrderList'
    import {getOrderList} from '@/api/order'

    export default {
        name: "index",
        data() {
            return {
                //activeName: this.$route.params.active,
                activeName: this.$route.params.active,
                orderList: []
            };
        },
        mounted() {
            this.initData()
        },
        components: {
            OrderList
        },
        methods: {
            initData() {
                this.getOrderList()
            },
            onClickLeft() {
                this.$router.back();
            },
            onClickOrder() {
                this.getOrderList()
            },
            getOrderList() {
                this.orderList = []
                getOrderList().then(response => {
                    if (response.data && response.data.length > 0) {
                        console.log(response.data)
                        if (this.activeName === 0) {
                            this.orderList = response.data
                        } else {
                            this.orderList = response.data.filter(item => item.status == this.activeName)
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