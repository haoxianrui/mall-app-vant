<template>
    <van-grid id="grid" :column-num="5"
              :border="false">
        <van-grid-item
                v-for="(item,index) in gridData"
                :key="item.cid"
                :icon="item.icon_url"
                :text="item.name"
                @click="handleCategoryClick(index)"
        />
    </van-grid>
</template>

<script>
    export default {
        props: {
            gridData: Array
        },
        methods: {
            handleCategoryClick(index) {
                this.$router.push({name: 'category', params: {currentIndex: index}})
            }
        }
    }
</script>

<style lang="less" scoped>
    #swipe {
        width: 100%;
        height: 270px;
        .van-swipe-item {
            color: #fff;
            font-size: 20px;
            text-align: center;
            background-color: #39a9ed;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }


</style>