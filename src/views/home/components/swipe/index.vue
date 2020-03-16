<template>
    <van-swipe id="swipe" :autoplay="3000">
        <van-swipe-item v-for="(item, index) in swipeData" :key="index">
            <img v-lazy="item.icon_url" :alt="item.public_name"/>
        </van-swipe-item>
    </van-swipe>
</template>

<script>
    export default {
        props: {
            swipeData: Array
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