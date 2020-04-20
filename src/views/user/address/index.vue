<template>
    <div class="address">
        <van-nav-bar
                title="地址列表"
                :fixed=true
                left-arrow
                @click-left="onClickLeft"
        />
        <!-- 地址列表 -->
        <van-address-list
                v-model="chosenAddressId"
                :list="addressList"
                default-tag-text="默认"
                @add="onAdd"
                @edit="onEdit"
                @select="onSelect"
                add-button-text="新增地址"
        />

        <!-- 路由出口 -->
        <transition name="router-slider"
                    mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import {getAddressList} from '@/api/user/address'
    import PubSub from 'pubsub-js'


    export default {
        data() {
            return {
                chosenAddressId: this.$route.query.chosenAddressId,
                type:this.$route.query.type,
                addressList: []
            }
        },
        mounted() {
            this.initData()
        },
        methods: {
            onClickLeft() {
                this.$router.back()
            },
            initData() {
                getAddressList().then(response => {
                    this.addressList = response.data
                })
            },
            onAdd() {
                this.$router.push({path: '/dashboard/user/address/add'})
            },
            onEdit(item, index) {
                this.$router.push({name: 'editAddress', params:{addressId: item.id}})
            },
            onSelect(item,index){
                if(this.type===1){
                    let that=this
                    setTimeout(function () {
                        PubSub.publish("order_choose_address", item);
                        that.$router.back()
                    },100)
                }else{

                }

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
        z-index: 2000;
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