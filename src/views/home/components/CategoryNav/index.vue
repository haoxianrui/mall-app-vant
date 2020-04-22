<!--商品分类导航-->
<template>
    <div>
        <van-grid :column-num="5" :border="false">
            <van-grid-item
                    v-for="(item,index) in categoryList"
                    :key="item.id"
                    :icon="item.icon_url"
                    :text="item.name"
                    @click="gotoCategoryList(item.id)"
            />
        </van-grid>
    </div>
</template>

<script>
    export default {
        props: {
            categoryList: Array
        },
        methods: {
            gotoCategoryList(id) {
                this.$router.push({name: 'category', params: {id: id}})
            }
        }
    }
</script>

<style lang="less" scoped>

</style>