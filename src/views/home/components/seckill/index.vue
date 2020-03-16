<!-- 秒杀专区 -->
<template>
    <div class="main">
        <van-divider />
        <div class="header">
            <van-icon name="clock-o" />
            <div class="title">秒杀专区</div>
            <van-count-down :time="time"
                            class="count"
                            format="HH mm ss">
                <template v-slot="timeData">
                    <span class="item">{{ timeData.hours }}</span>
                    <span class="item">{{ timeData.minutes }}</span>
                    <span class="item">{{ timeData.seconds }}</span>
                </template>
            </van-count-down>
            <div class="more" @click="handleMoreClick">更多</div>
        </div>
        <seckill-goods :seckill-goods-data="seckillGoodsData"/>
    </div>
</template>

<script>
    import SeckillGoods from './goods'

    export default {
        name: "seckill",
        props: {
            seckillGoodsData: Array
        },
        data() {
            return {
                time: 30 * 60 * 1000 * 100
            }
        },
        components: {
            SeckillGoods
        },
        methods: {
            handleMoreClick() {

            }
        }
    }
</script>

<style lang="less" scoped>
    #main {
        margin-top: 0.625rem;
        padding: 1.25rem 0 0.9375rem 0;
        background-color: white;
    }

    .header {
        margin: 0 0.625rem 0.625rem 0.625rem;
        height: 1.5625rem;
        .van-icon{
            float:left;
            font-size: 1.1875rem;
        }
    }
    .title {
        display: inline-block;
        padding-left: 0.3125rem;
        height: 1.3125rem;
        line-height: 1.3125rem;
        vertical-align: middle;
        font-size: 1.1875rem;
        float: left;

    }
    .item {
        display: inline-block;
        width: 22px;
        margin-right: 5px;
        color: #fff;
        font-size: 12px;
        text-align: center;
        background-color: black;
    }
    .count {
        float: left;
        margin-left: 0.7rem;
    }

    .more {
        color: #3cb963;
        float: right;
        font-size: 0.8rem;
    }
</style>