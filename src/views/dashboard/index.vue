<!--项目起始页-->
<template>
    <div id="dashboard">
        <!-- 按需缓存需要缓存的页面，在router中设置router的元信息meta的keepAlive -->
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>

        <div id="tabbar">
            <van-tabbar v-model="active">
                <van-tabbar-item v-for="(item,index) in tabbars"
                                 :id="item.name=='cart'?'shop-cart':''"
                                 :info="item.name=='cart' ? goodsNum : ''"
                                 :icon ="item.icon"
                                 @click="handleTabClick(index,item.name)"
                ></van-tabbar-item>
            </van-tabbar>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'

    export default {
        created() { // dom加载完成之前
            this.handleTabbarSelected(this.$route.name) // 通过路由跳转绑定Tabbar的选中
        },
        mounted() { // dom加载完成之后
            this._initData()
        },
        watch: {
            // 监听路由变化,保证路由跳转Tabbar选中正常
            $route: {
                handler(val) {
                    this.handleTabbarSelected(val.name);
                }
            },
            deep: true
        },
        computed: { // 计算属性,类似过滤器，对绑定的view的数据进行处理
            ...mapState(['shopCart']),
            goodsNum() {
                let num = 0
                Object.values(this.shopCart).forEach((goods, index) => {
                    num += goods.num
                })
                if (num > 0) {
                    return num;
                }
            }
        },
        data() {
            return {
                currentIndex: 0,
                active: 0,
                tabbars: [
                    {
                        name: "home",
                        title: '首页',
                        icon: "wap-home"
                    },
                    {
                        name: "category",
                        title: '分类',
                        icon: "wap-nav"
                    },
                    {
                        name: "cart",
                        title: '购物车',
                        icon: "cart"
                    },
                    {
                        name: "user",
                        title: '我的',
                        icon:'manager'
                    }

                ]
            }
        },

        methods: {
            ...mapMutations(['INIT_USER_INFO', 'INIT_SHOP_CART']),
            // 页面加载初始化用户信息和购物车数据
            _initData() {
                this.INIT_USER_INFO()
                this.INIT_SHOP_CART()
            },
            // tab点击切换页面
            handleTabClick(index, tabName) {
                console.log(tabName)
                this.currentIndex = index;
                this.$router.push(tabName);
            },
            // 监听路由变化，保证路由跳转Tabbar选中正常
            handleTabbarSelected(item) {
                const mapType = {
                    home: 0,
                    category: 1,
                    cart: 2,
                    mine: 3
                }
                this.active = mapType[item]
            }
        }
    }
</script>

<style lanuage="less" scoped>

    @media only screen and (min-width: 768px) {
        body{background: #f6f6f6;}

    }

    .van-tabbar-item--active{
        color: #F75B52 !important;
    }
    .van-tabbar-item__icon{
        font-size: 20px;
    }
    .van-tabbar-item:active{
        background: #f6f6f6;
    }
    .van-tabbar-item__icon:active,.van-tabbar-item__text:active{
        color: #F75B52;
    }
    .van-tabbar--fixed{
        z-index: 999;
    }
    .van-tabbar-item .van-icon-search{
        font-weight: 600;
    }

</style>