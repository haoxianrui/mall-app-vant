<template>
    <div class="order">
        <van-nav-bar
                title="填写订单"
                :fixed=true
                left-arrow
                @click-left="onClickLeft"
        />
        <!-- 选择收货地址 -->
        <van-contact-card
                add-text="选择收货地址"
                :type="address.type"
                :name="address.name"
                :tel="address.tel"
                @click="showList = true"
                @click="chooseAddress"
        />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                address: {
                    type: 'add',
                    name: undefined,
                    tel: undefined
                }
            }
        },
        methods: {
            onClickLeft() {
                this.$router.back();
            },
            // 选择地址
            chooseAddress () {
                this.$router.push('/order/myAddress');
            }
        }

    }
</script>

<style lang="less" scoped>
    .order{
        padding-top: 3rem;
    }

</style>