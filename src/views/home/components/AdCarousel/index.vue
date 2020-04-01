<!--首页轮播图-->
<template>
    <div>
        <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(item, index) in advertisementList" :key="index">
                <img v-lazy="item.imageUrl" :alt="item.name"/>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
    export default {
        props: {
            advertisementList: Array
        }
    }
</script>

<style lang="less" scoped>
    .van-swipe {
        height: 280px;
        &-item {
            color: #fff;
            font-size: 20px;
            text-align: center;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }

</style>