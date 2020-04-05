<!-- 订单支付结果页面 -->
<template>
    <div class="payment-result">
        <van-nav-bar
                title="支付成功"
                :fixed=true
                right-text="完成"
                @click-right="onClickRight"
        />

        <van-cell-group class="payment-result-tip">
            <van-cell :border="false" style="text-align: center">
                <img src="@/assets/images/payment_success.png" height="64" width="64"/>
            </van-cell>
            <van-cell :border="false" style="font-size: 18px;color:#666">
                订单支付成功
            </van-cell>
            <van-cell :border="false">
                <van-row>
                    <van-col span="12" class="lt">
                        <van-icon name="balance-pay" size="20"/>
                        <span style="vertical-align: top;margin-left: 5px">支付方式</span>
                    </van-col>
                    <van-col span="12" class="rt" style="color:#FB0017">
                        {{paymentMode}}
                    </van-col>
                </van-row>
            </van-cell>
            <van-cell :border="false">
                <van-row>
                    <van-col span="12" class="lt">

                        <van-icon name="gold-coin-o" size="20"/>
                        <span style="vertical-align: top;margin-left: 5px">支付金额</span>
                    </van-col>
                    <van-col span="12" class="rt" style="color:#FB0017">
                        {{(paymentAmount/100)|moneyFormat}}
                    </van-col>
                </van-row>
            </van-cell>
            <van-cell :border="false">
                <van-row>
                    <van-col span="12" class="lt">
                        <van-button type="default" size="small" @click="onClickViewOrder" >查看订单</van-button>
                    </van-col>
                    <van-col span="12" class="rt">
                        <van-button type="default" size="small" to="/dashboard/home">回到首页</van-button>
                    </van-col>
                </van-row>
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
    export default {
        name: "result",
        data() {
            return {
                paymentResult: undefined, // 支付结果
                paymentMode: undefined, // 支付方式
                paymentAmount: 0
            }
        },
        mounted() {
            this.paymentResult = this.$route.params.paymentResult
            this.paymentMode = this.$route.params.paymentMode
            this.paymentAmount = this.$route.params.paymentAmount
        },
        methods: {
            onClickLeft() {
                this.$router.back()
            },
            onClickRight() {
                this.$router.push({name: 'user'})
            },
            onClickViewOrder(){
                this.$router.push({name:'userOrder',params:{active:'2'}})
            }
        }
    }
</script>

<style lang="less" scoped>
    .payment-result {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f5f5f5;
        z-index: 300;
        padding-top: 44px;

        &-tip {
            .van-cell__value--alone {
                text-align: center;
                color: #666666;
            }

            .rt {
                text-align: left;
                padding-left: 10px
            }

            .lt {
                text-align: right;
                padding-right: 10px
            }

            .van-button--default {
                color: #666666;
            }
        }
    }
</style>