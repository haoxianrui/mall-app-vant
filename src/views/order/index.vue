<!-- 订单提交 -->
<template>
    <div class="order">
        <van-nav-bar
                title="填写订单"
                :fixed=true
                left-arrow
                @click-left="onClickLeft"
        />
        <!-- 收货人信息 -->
        <van-contact-card
                add-text="选择收货人"
                :type="concat.type"
                :name="concat.name"
                :tel="concat.tel"
                @click="chooseConcat"
        />

        <!-- 商品列表 -->
        <van-cell-group title="购买商品">
            <van-card
                    v-for="(item,index) in goodsList"
                    :key="index"
                    :num="item.sku_quantity"
                    :desc="item.specs_desc"
                    :title="item.spu_name"
                    :thumb="item.pic_url">
                <template #tags>
                    <van-tag plain type="danger">七天无理由退货</van-tag>
                </template>

                <template #price>
                    {{item.sku_price|moneyFormat}}
                </template>
            </van-card>
        </van-cell-group>


        <!-- 优惠券 -->
        <van-cell-group style="margin-top: 0.6rem">
            <van-coupon-cell
                    :coupons="coupons"
                    :chosen-coupon="chosenCoupon"
                    @click="showCoupon = true"
            />
            <!-- 优惠券列表 -->
            <van-popup
                    v-model="showCoupon"
                    round
                    position="bottom"
                    style="height: 90%; padding-top: 4px;">
                <van-coupon-list
                        :coupons="coupons"
                        :chosen-coupon="chosenCoupon"
                        :disabled-coupons="disabledCoupons"
                        @change="onChange"
                        @exchange="onExchange"
                />
            </van-popup>
        </van-cell-group>

        <!-- 备注 -->
        <van-cell-group style="margin-top: 0.6rem">
            <van-field v-model="buyerMessage"
                       label="备注"
                       type="textarea"
                       placeholder="选填"
                       rows="1"
                       autosize
                       is-link/>
        </van-cell-group>


        <!-- 商品金额 -->
        <van-cell-group style="margin-top: 0.6rem">
            <van-cell title="商品金额">
                <div class="money">{{(selectedTotalPrice) | moneyFormat }}</div>
            </van-cell>
            <van-cell title="运费">
                <div class="money">{{(freight)|moneyFormat}}</div>
            </van-cell>
        </van-cell-group>

        <van-submit-bar
                button-text="提交订单"
                label="实付"
                @submit="onSubmit"
                :price="actualPrice*100"
        >
        </van-submit-bar>

        <!-- 路由出口 -->
        <transition name="router-slider"
                    mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {Toast} from 'vant'
    import PubSub from 'pubsub-js'
    import {orderSubmit, orderToken} from '@/api/order'
    import {couponList} from '@/api/user/coupon'

    export default {
        data() {
            return {
                concat: {
                    type: 'add',
                    name: undefined,
                    tel: undefined,
                    id: undefined,
                    address: undefined
                },
                coupons: [],
                chosenCoupon: -1,
                disabledCoupons: [],
                showCoupon: false, // 是否显示优惠券
                freight: 8, // 运费
                goodsList: [],
                selectedTotalPrice: 0,
                buyerMessage: undefined,

                orderDTO: {
                    order: {},
                    order_item_list: [],
                    order_token: undefined
                }
            }
        },
        created() {
            this.initData()
        },
        mounted() {

            let that = this
            PubSub.subscribe("order_choose_address", (msg, data) => { // 选中地址后通知订单页面
                if (msg == "order_choose_address") {
                    if (data) {
                        that.concat.name = data.name
                        that.concat.tel = data.tel
                        that.concat.address = data.address
                        that.concat.type = 'edit'
                    }
                }
            })

        },
        computed: {
            ...mapGetters({
                selectedCount: 'SELECTED_GOODS_COUNT',
                goods: 'SELECTED_GOODS',
            }),
            actualPrice() {
                let finalPrice = this.selectedTotalPrice + this.freight
                // 是否有使用优惠券
                if (this.chosenCoupon > -1) {
                    finalPrice = finalPrice - this.coupons[this.chosenCoupon].value/100
                }
                console.log(finalPrice)
                return finalPrice
            },
        },
        methods: {
            initData() {
                // 页面进入随机生成token，放置表单重复提交
                orderToken().then(response => {
                    this.orderDTO.order_token = response
                })

                // 优惠券
                couponList().then(response => {
                    this.coupons = []
                    if (response.data) {
                        response.data.forEach(item => {
                            let coupon = {
                                available: 1,
                                condition: item.condition_desc,
                                reason: item.reason,
                                value: item.value,
                                name: item.name,
                                startAt: 1587823247,
                                endAt: 1588262400,
                                valueDesc: item.value_desc,
                                unitDesc: '元',
                            }

                            this.coupons.push(coupon)
                        })
                    }
                })

                let type = this.$route.params.type
                if (type === 1) {  // 立即购买进入
                    this.goodsList = []
                    let goods = this.$route.params.goods
                    this.goodsList.push(goods)

                    this.orderDTO.order_item_list.push(goods)

                    this.selectedTotalPrice = goods.sku_price * goods.sku_quantity
                } else { // 购物车进入
                    this.goodsList = this.goods
                }
            },
            onClickLeft() {
                this.$router.back();
            },
            // 选择地址
            chooseConcat() {
                this.$router.push({path: '/order/address'})
            },
            onChange(index) {
                this.showCoupon = false
                this.chosenCoupon = index
            },
            onExchange(code) {
                this.coupons.push(code)
            },
            onSubmit() {
                if (!this.concat.address) {
                    Toast({
                        message: '请选择收货人',
                        duration: 800
                    })
                    return
                }
                // 提交订单逻辑

                // 会员ID
                this.orderDTO.order.member_id = "1211480307950280706"
                // 优惠券ID
                this.orderDTO.order.coupon_id = "1249738175305326593"
                // 订单状态
                this.orderDTO.order.status = 0
                // 订单来源
                this.orderDTO.order.source_type = 1

                // 运费金额
                this.orderDTO.order.freight_amount = this.freight
                // 优惠券抵扣金额
                // this.orderDTO.order.coupon_amount = this.freight
                // 订单总额
                this.orderDTO.order.total_amount = this.selectedTotalPrice
                // 应付总额
                this.orderDTO.order.pay_amount = this.actualPrice
                // 买家留言
                this.orderDTO.order.buyer_message = this.buyerMessage

                orderSubmit(this.orderDTO).then(response => {
                    if (response.code === 0) {
                        // 提交成功
                        this.$router.push({path: '/order/payment', query: {paymentAmount: this.actualPrice}})
                    } else {
                        Toast(response.msg)
                    }
                })
            }

        }
    }
</script>

<style lang="less" scoped>
    .order {
        padding-top: 3rem;

        /*转场动画*/

        .router-slider-enter-active,
        .router-slider-leave-active {
            transition: all 0.3s;
        }

        .router-slider-enter,
        .router-slider-leave-active {
            transform: translate3d(2rem, 0, 0);
            opacity: 0;
        }

        .van-cell:not(:last-child)::after {
            left: 0 !important;
        }


    }

</style>