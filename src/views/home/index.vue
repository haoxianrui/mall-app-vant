<template>
    <div id="home">
        <div v-if="!isShowLoading">
            <div class="head">
                <!-- 轮播图 -->
                <Swipe :swipe-data="swipeData"/>
            </div>
            <!-- 分类导航 -->
            <Nav :nav-data="navData"/>

            <!-- 秒杀专区 -->
            <Seckill :seckill-goods-data="seckillGoodsData"/>

            <!-- 回到顶部按钮 -->
            <v-top/>
        </div>
        <!-- 数据加载提示gif -->
        <Loading :show="isShowLoading"/>
    </div>
</template>

<script>
    import {getHomeData} from "@/api/home"
    import Loading from '@/components/loading/LoadingGif'
    import Swipe from './components/swipe'
    import Nav from './components/nav'
    import Seckill from './components/seckill'

    export default {
        created() {
            this._initData()
        },
        mounted() {
        },
        data() {
            return {
                isShowLoading: true,       // 是否加载动画
                swipeData: [],             // 轮播图数据
                navData: [],               // 分类宫格数据
                seckillGoodsData:[]        // 秒杀商品
            }
        },
        components: {
            Loading,
            Swipe,
            Nav,
            Seckill
        },
        methods: {
            async _initData() {
                const response = await getHomeData()
                const data = response.data
                // 轮播数据
                this.swipeData = data.list[0].icon_list

                // 分类导航宫格数据
                this.navData = data.list[2].icon_list

                // 秒杀商品数据
                this.seckillGoodsData =data.seckillGoodsList

                // 关闭Loading
                this.isShowLoading = false
            }
        }
    }
</script>

<style lang="less" scoped>
    #home {
        background-color: "#f5f5f5";
        padding-bottom: 3rem;
        .head {
            margin-top: -3rem;
            width: 100%;
            background-image: url("http://518taole.7-orange.cn/backImage.png");
        }
    }
</style>