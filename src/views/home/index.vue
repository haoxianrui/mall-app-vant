<template>
    <div id="home">
        <div v-if="!isShowLoading">
            <div class="head">
                <!-- 轮播图 -->
                <Swipe :swipe-data="swipeData"/>
            </div>
            <Grid :grid-data="gridData"/>
        </div>
        <!-- 数据加载提示gif -->
        <Loading :show="isShowLoading"/>
    </div>
</template>

<script>
    import {getHomeData} from "@/api/home"
    import Loading from '@/components/loading/LoadingGif'
    import Swipe from './components/swipe'
    import Grid from './components/grid'

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
                gridData: [],              // 宫格数据
            }
        },
        components: {
            Loading,
            Swipe,
            Grid
        },
        methods: {
            async _initData() {
                const response = await getHomeData()
                const data = response.data
                // 轮播数据
                this.swipeData = data.list[0].icon_list

                // 宫格数据
                this.gridData = data.list[2].icon_list


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