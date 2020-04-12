<template>
    <div class="coupon">
        <van-nav-bar
                title="优惠券列表"
                :fixed=true
                left-arrow
                @click-left="onClickLeft"
        />
        <van-tabs v-model="active" sticky offset-top="46">
            <van-tab title="可用">
                <van-cell-group class="coupon-item" v-for="(item,index) in couponList" >
                    <van-row style="padding-bottom:5px">
                        <van-col span="8"  class="coupon-item-left">
                            <van-row class="coupon-item-amount">
                                {{item.value}}
                                <span>{{item.unitDesc}}</span>
                            </van-row>
                            <van-row class="coupon-item-desc">
                                {{item.valueDesc}}
                            </van-row>
                        </van-col>
                        <van-col span="12" class="coupon-item-middle">
                            <van-row class="coupon-item-name">
                                {{item.name}}
                            </van-row>
                            <van-row class="coupon-item-valid">
                                {{item.startAt}}- {{item.endAt}}
                            </van-row>
                        </van-col>
                        <van-col span="4" class="coupon-item-right">
                            <van-button type="danger" size="mini" to="/">去使用</van-button>
                        </van-col>
                    </van-row>
                    <van-row class="coupon-item-description">
                        {{item.description}}
                    </van-row>
                </van-cell-group>
            </van-tab>
            <van-tab title="不可用">
                <van-cell-group class="coupon-item-disabled" v-for="(item,index) in disabledCouponList" >
                    <van-row style="padding-bottom:5px">
                        <van-col span="8"  class="coupon-item-disabled-left">
                            <van-row class="coupon-item-amount">
                                {{item.value}}
                                <span>{{item.unitDesc}}</span>
                            </van-row>
                            <van-row class="coupon-item-desc">
                                {{item.valueDesc}}
                            </van-row>
                        </van-col>
                        <van-col span="16" class="coupon-item-middle">
                            <van-row class="coupon-item-name">
                                {{item.name}}
                            </van-row>
                            <van-row class="coupon-item-valid">
                                {{item.startAt}}- {{item.endAt}}
                            </van-row>
                        </van-col>

                    </van-row>
                    <van-row class="coupon-item-description">
                        {{item.reason}}
                    </van-row>
                </van-cell-group>
            </van-tab>
        </van-tabs>


    </div>
</template>

<script>
    import {getCouponList} from '@/api/user/coupon'


    export default {
        data() {
            return {
                active:0,
                chosenCoupon: -1,
                disabledCouponList: [],
                couponList:[]
            }
        },
        mounted() {
            this.initData()
        },
        methods: {
            initData() {
                getCouponList().then(response => {
                    this.couponList = response.data.couponList
                    this.disabledCouponList = response.data.disabledCouponList
                })
            },
            onClickLeft() {
                this.$router.back()
            },
            onChange(index) {
                this.showList = false;
                this.chosenCoupon = index;
                this.$router.push({path:'/'})
            },
            // onExchange(code) {
            //     this.couponList.push(coupon);
            // }
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
        padding-top: 46px;
        overflow-y: auto;
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
            &-desc{
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