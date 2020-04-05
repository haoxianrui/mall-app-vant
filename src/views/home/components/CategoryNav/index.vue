<!--商品分类导航-->
<template>
    <div>
        <van-grid :column-num="5" :border="false">
            <van-grid-item
                    v-for="(item,index) in goodsCategoryList"
                    :key="item.categoryId"
                    :icon="item.icon"
                    :text="item.categoryName"
                    @click="handleClick(item.categoryId)"
            />
        </van-grid>
    </div>
</template>

<script>
    export default {
        props: {
            goodsCategoryList: Array
        },
        methods: {
            handleClick(categoryId) {
                this.$router.push({name: 'category', params: {categoryId: categoryId}})
            }
        }
    }
</script>

<style lang="less" scoped>

</style>