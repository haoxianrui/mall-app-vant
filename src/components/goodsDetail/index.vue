<template>
    <div class="goods-detail">
        <van-nav-bar
                title="商品详情页"
                :fixed=true
                left-arrow
                @click-left="onClickLeft"
        />
        <!-- 商品图片轮播 -->
        <van-swipe class="goods-swipe"
                   :autoplay="3000"
                   @change="onChange"
        >
            <van-swipe-item v-for="item in goods.images">
                <img :src="item" >
            </van-swipe-item>
            <div class="custom-indicator" slot="indicator">
                {{ current + 1 }}/{{goods.images.length}}
            </div>
        </van-swipe>
        <div class="seckill-info" v-show="goods.isSeckill">
            <div class="left">
                <van-icon name="clock-o" />
                <span>秒杀抢购中</span>
            </div>
            <div class="right">
                <span>本场结束剩余</span>
                <van-count-down :time="time"
                                class="count"
                                format="HH mm ss">
                    <template v-slot="timeData">
                        <span class="item">{{ timeData.hours }}</span>
                        :
                        <span class="item">{{ timeData.minutes }}</span>
                        :
                        <span class="item">{{ timeData.seconds }}</span>
                    </template>
                </van-count-down>
            </div>
        </div>

        <!-- 商品信息 -->
        <div class="goods-info">
            <div class="title">{{goods.name}}</div>
            <div class="desc"> {{goods.desc}}</div>
            <span class="price">{{goods.price}}</span>
            <span class="origin-price">{{goods.originPrice | moneyFormat}}</span>
            <span class="remain-num">剩余:{{goods.totalNum-goods.soldNum}}</span>
        </div>


    </div>
</template>

<script>
    export default {
        data(){
            return{
                // 秒杀倒计时
                time: 30 * 60 * 1000 * 100,
                // 是否秒杀
                isSeckill: false,
                goods:this.$route.query,
                current: 0
            }
        },
        mounted() {
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1)
            },
            onChange(index) {
                this.current = index;
            }
        }
    }
</script>

<style lang="less" scoped>
    .goods-detail{
        .goods-swipe{
            margin-top: 2.7rem;
            height: 220px;
            img {
                width: 100%;
                height: 100%;
            }
           .custom-indicator {
                position: absolute;
                right: 5px;
                bottom: 5px;
                padding: 2px 5px;
                color: #fff;
                font-size: 12px;
                background: rgba(0, 0, 0, 0.1);
            }
        }
        .seckill-info{
            display: flex;
            flex: 1;
            width: 100%;
            height: 2rem;
            line-height: 2rem;
            .left{
                width: 50%;
                background-color: #e25450;
                span {
                    font-size: 0.8rem;
                    color: #ffffff;
                    padding-left: 1rem;
                }
                i {
                    padding-left: 0.6rem;
                    font-size: 0.5rem;
                    color: #ffffff;
                }
            }
            .right{
                width: 50%;
                background-color: #fcefe9;
                height: 2rem;
                line-height: 2rem;
                padding-left: 0.5rem;
                font-size: 0.5rem;
                color: #e25450;
                .count {
                    display: inline;
                    margin-left: 0.3rem;
                    .item {
                        display: inline-block;
                        width: 22px;
                        margin-right: 5px;
                        color: #fff;
                        font-size: 12px;
                        text-align: center;
                        background-color: #e25450;
                    }
                    i {
                        color: #e25450;
                        padding-right: 0.2rem;
                    }
                }
            }
        }
        .goods-info{
            background-color: white;
            padding: 0.5rem;
            text-align: left;
            .title{
                color: black;
                font-size: 0.8rem;
            }
            .desc{
                padding: 0.5rem 0;
                color: grey;
                font-size: 0.6rem;
            }
            .origin-price {
                color: grey;
                font-size: 0.5rem;
                text-decoration: line-through;
            }
            .price {
                color: #e25450;
                padding-right: 0.5rem;
                font-size: 0.8rem;
            }
            .remain-num{
                float: right;
                color: #e25450;
                font-size: 0.8rem;
            }
        }
    }
</style>