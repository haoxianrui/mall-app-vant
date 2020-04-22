<!--首页轮播图-->
<template>
    <div>
        <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(item, index) in advertList" :key="index">
                <img v-lazy="item.pic_url" :alt="item.name"/>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
    export default {
        props: {
            advertList: Array
        }
    }
</script>

<style lang="less" scoped>
    .van-swipe {
        height: 220px;
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