<template>
    <div>
        <div v-if="!isShowLoading">
            <!-- 轮播图 -->
            <ad-carousel :advertisementList="advertisementList"/>

            <!-- 分类导航 -->
            <category-nav :goodsCategoryList="goodsCategoryList"/>

            <!-- 秒杀专区 -->
            <spike :spikeInfo="spikeInfo"/>

            <hot :hotGoodsList="hotGoodsList"/>
            <!-- 回到顶部按钮 -->
            <v-top/>
        </div>
        <!-- 数据加载提示gif -->
        <loading :show="isShowLoading"/>
    </div>
</template>

<script>
    import {getAdList, getGoodsCategoryList, getSeckillInfo, getHotGoodsList, getHomeData} from "@/api/home"
    import loading from '@/components/loading/LoadingGif'
    import AdCarousel from './components/AdCarousel'
    import CategoryNav from './components/CategoryNav'
    import Spike from './components/Seckill'
    import Hot from './components/Hot'

    export default {
        created() {
            this._initData()
        },
        data() {
            return {
                isShowLoading: true,     // 是否加载动画
                advertisementList: undefined,   // 广告轮播图
                goodsCategoryList: undefined,   // 商品分类
                spikeInfo: undefined,        // 秒杀商品
                hotGoodsList: undefined
            }
        },
        components: {
            loading,
            AdCarousel,
            CategoryNav,
            Spike,
            Hot
        },
        methods: {
            async _initData() {

                // 广告轮播
                getAdList().then(response => {
                    this.advertisementList = response.data
                })

                // 商品分类
                getGoodsCategoryList().then(response => {
                    this.goodsCategoryList = response.data
                })

                // 秒杀商品
                getSeckillInfo().then(response => {
                    this.spikeInfo = response.data
                })

                // 人气推荐商品
                getHotGoodsList().then(response => {
                    this.hotGoodsList=response.data
                })
                this.isShowLoading = false
            }
        }
    }
</script>

<style lang="less" scoped>

</style>