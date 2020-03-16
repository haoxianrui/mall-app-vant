<!-- 分类宫格 -->
<template>
    <van-grid id="nav" :column-num="5" :border="false">
        <van-grid-item
                v-for="(item,index) in navData"
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
            navData: Array
        },
        methods: {
            handleCategoryClick(index) {
                this.$router.push({name: 'category', params: {currentIndex: index}})
            }
        }
    }
</script>

<style lang="less" scoped>

</style>