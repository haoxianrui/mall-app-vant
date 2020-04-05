<template>
    <div class="address">
        <van-nav-bar
                title="添加地址"
                :fixed=true
                left-arrow
                @click-left="onClickLeft"
        />
        <!-- 地址列表 -->
        <van-address-list
                v-model="chosenAddressId"
                :list="shippingAddress"
                default-tag-text="默认"
                @add="onAdd"
                @edit="onEdit"
                add-button-text="新增地址"
                @select="onBackAddress"
        />

        <!-- 路由出口 -->
        <transition name="router-slider"
                    mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'

    export default {
        data() {
            return {
                chosenAddressId: this.$route.query.chosenAddressId,
            }
        },
        computed: {
            ...mapState(['shippingAddress']),
        },
        mounted() {
            this.INIT_USER_SHOPPING_ADDRESS()
        },
        methods: {
            ...mapMutations(['INIT_USER_SHOPPING_ADDRESS']),
            onClickLeft() {
                this.$router.back()
            },
            onAdd() {

                this.$router.push('/order/address/add')
            },
            onEdit(item, index) {
                this.$router.push({name: 'editAddress', params: {content: item}})
            },
            onBackAddress(item, index) {
                this.$emit('getConcat', {name: item.name, tel: item.tel, address: item.address});
                this.$router.back();
            }
        }
    }
</script>

<style lang="less" scoped>
    .address {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ffffff;
        z-index: 200;
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