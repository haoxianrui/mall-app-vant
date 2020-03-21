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
                    v-for="(item,index) in goods"
                    :key="index"
                    :num="item.num"
                    :price="item.price"
                    desc="描述信息"
                    :title="item.name"
                    :thumb="item.image">
                <template #tags>
                    <van-tag plain type="danger">七天无理由退货</van-tag>
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
            <van-field label="备注"
                       type="textarea"
                       placeholder="选填"
                       rows="1"
                       autosize
                       is-link/>
        </van-cell-group>


        <!-- 商品金额 -->
        <van-cell-group style="margin-top: 0.6rem">
            <van-cell title="商品金额">
                <div class="money">{{(selectedTotalPrice/100) | moneyFormat }}</div>
            </van-cell>
            <van-cell title="运费">
                <div class="money">{{(freight/100)|moneyFormat}}</div>
            </van-cell>
        </van-cell-group>

        <van-submit-bar
                :price="actualPrice"
                button-text="提交订单"
                label="实付"
                @submit="onSubmit"
        />
        <!-- 路由出口 -->
        <transition name="router-slider"
                    mode="out-in">
            <router-view @getConcat="getConcat"></router-view>
        </transition>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex'
    import {coupon} from '@/api/user'
    import {Toast} from 'vant'


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
                freight: 800 // 运费
            }
        },
        created() {
            coupon().then(response => {
                this.coupons = response.data
            })
        },
        mounted() {

        },
        computed: {
            ...mapGetters({
                selectedCount: 'SELECTED_GOODS_COUNT',
                goods: 'SELECTED_GOODS',
                selectedTotalPrice: 'SELECTED_GOODS_PRICE'
            }),
            actualPrice() {
                let finalPrice = this.selectedTotalPrice+this.freight
                // 是否有使用优惠券
                if (this.chosenCoupon > -1) {
                    finalPrice=finalPrice-this.coupons[this.chosenCoupon].value
                }
                return finalPrice
            }
        },
        methods: {
            onClickLeft() {
                this.$router.back();
            },
            // 选择地址
            chooseConcat() {
                this.$router.push({path: '/order/address'});
            },
            // 获取地址
            getConcat(data) {
                if (data) {
                    this.concat.name = data.name
                    this.concat.tel = data.tel
                    this.concat.address = data.address
                    this.concat.type = 'edit'
                }
            },
            onChange(index) {
                this.showCoupon = false
                this.chosenCoupon = index
            },
            onExchange(code) {
                this.coupons.push(code)
            },
            onSubmit() {
                if(!this.concat.address){
                    Toast({
                        message: '请选择收货地址',
                        duration: 800
                    })
                }else{
                    // 提交订单逻辑 todo
                    this.$router.push({path: '/order/payment',query:{paymentAmount :this.actualPrice}})
                }
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
    }

</style>