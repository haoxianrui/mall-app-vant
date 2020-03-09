<!--项目起始页-->
<template>
    <div id="dashboard">
        <van-tabbar v-model="active"
                    :safe-area-inset-bottom=true
                    active-color="#75a342"
        >
            <van-tabbar-item  v-for="(item,index) in tabbars"
                :key="index" :id="item.name=='cart'?'shop-cart':''"
                :info="item.name=='cart' ? 5: ''"
            >
                <span :class="currentIndex==index? active :''">{{item.title}}</span>
                <img
                        slot="icon"
                        slot-scope="props"
                        :src="props.active ? item.active : item.inactive"
                >
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        name: "dashboard",
        data() {
            return {
                currentIndex: 0,
                active: 0,
                tabbars: [
                    {
                        name: "home",
                        title: '首页',
                        active: require("@/assets/images/tabbar/home-active.png"),
                        inactive: require("@/assets/images/tabbar/home-inactive.png")
                    },
                    {
                        name: "category",
                        title: '分类',
                        active: require("@/assets/images/tabbar/category-active.png"),
                        inactive: require("@/assets/images/tabbar/category-inactive.png")
                    },
                    {
                        name: "cart",
                        title: '购物车',
                        active: require("@/assets/images/tabbar/shoppingcart-active.png"),
                        inactive: require("@/assets/images/tabbar/shoppingcart-inactive.png"),
                        num: 5
                    },
                    {
                        name: "mine",
                        title: '我的',
                        active: require("@/assets/images/tabbar/mine-active.png"),
                        inactive: require("@/assets/images/tabbar/mine-inactive.png")
                    }

                ]
            }
        }
    }
</script>

<style scoped>

</style>