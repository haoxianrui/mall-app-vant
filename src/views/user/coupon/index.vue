<template>
    <div class="coupon">
        <van-nav-bar
                title="优惠券列表"
                :fixed=true
                left-arrow
                @click-left="onClickLeft"
        />
        <van-tabs v-model="active">
            <van-tab title="可用">
                <van-cell-group class="coupon-item"  >
                    <van-row style="padding-bottom:5px">
                        <van-col span="8"  class="coupon-item-left">
                            <van-row class="coupon-item-amount">
                                1.5
                                <span>元</span>
                            </van-row>
                            <van-row class="coupon-item-condition">
                                无使用门槛
                            </van-row>
                        </van-col>
                        <van-col span="12" class="coupon-item-middle">
                            <van-row class="coupon-item-name">
                                优惠券名称
                            </van-row>
                            <van-row class="coupon-item-valid">
                                2017.01.01-2017.01.02
                            </van-row>
                        </van-col>
                        <van-col span="4" class="coupon-item-right">
                            <van-button type="danger" size="mini" to="/">去使用</van-button>
                        </van-col>
                    </van-row>
                    <van-row class="coupon-item-description">
                        描述信息
                    </van-row>
                </van-cell-group>
            </van-tab>
            <van-tab title="不可用">
                <van-cell-group class="coupon-item-disabled"  >
                    <van-row style="padding-bottom:5px">
                        <van-col span="8"  class="coupon-item-disabled-left">
                            <van-row class="coupon-item-amount">
                                1.5
                                <span>元</span>
                            </van-row>
                            <van-row class="coupon-item-condition">
                                无使用门槛
                            </van-row>
                        </van-col>
                        <van-col span="16" class="coupon-item-middle">
                            <van-row class="coupon-item-name">
                                优惠券名称
                            </van-row>
                            <van-row class="coupon-item-valid">
                                2017.01.01-2017.01.02
                            </van-row>
                        </van-col>

                    </van-row>
                    <van-row class="coupon-item-description">
                        優惠券不可用原因
                    </van-row>
                </van-cell-group>
            </van-tab>
        </van-tabs>


    </div>
</template>

<script>
    import {getAddressList} from '@/api/user/address'
    const coupon = {
        available: 1,
        condition: '无使用门槛\n最多优惠12元',
        reason: '',
        value: 150,
        name: '优惠券名称',
        startAt: 1489104000,
        endAt: 1514592000,
        valueDesc: '1.5',
        unitDesc: '元'
    };

    export default {
        data() {
            return {
                active:0,
                chosenCoupon: -1,
                coupons: [coupon],
                disabledCoupons: [coupon]
            }
        },
        mounted() {
            this.initData()
        },
        methods: {
            onClickLeft() {
                this.$router.back()
            },
            onChange(index) {
                this.showList = false;
                this.chosenCoupon = index;
                this.$router.push({path:'/'})
            },
            onExchange(code) {
                this.coupons.push(coupon);
            }
        }
    }
</script>

<style lang="less">
    .coupon {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f5f5f5;
        z-index: 2000;
        padding-top: 3rem;
        &-item{
            margin: 10px 10px 0 10px;
            border-radius:10px;
            padding:15px;

            &-left{
                position: relative;
                min-width: 96px;
                padding: 0 8px;
                color: #ee0a24;
                text-align: center;
            }
            &-amount{
                margin-bottom: 6px;
                font-weight: 500;
                font-size: 30px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;

                span{
                    font-weight: normal;
                    font-size: 40%;
                }
            }
            &-condition{
                font-size: 12px;
                line-height: 16px;
                white-space: pre-wrap;
            }



            &-name{
                margin: 10px auto;
                font-weight: bold;
                font-size: 14px;
                line-height: 20px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            &-valid{
                font-size: 12px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            &-description{
                padding: 8px 16px;
                font-size: 12px;
                border-top: 1px dashed #ebedf0;
            }
            &-right{
                margin-top:8px
            }

            &-disabled{
                margin: 10px 10px 0 10px;
                border-radius:10px;
                padding:15px;
                &-left{
                    position: relative;
                    min-width: 96px;
                    padding: 0 8px;
                    text-align: center;
                    color:#323233
                }
            }
        }
    }

</style>