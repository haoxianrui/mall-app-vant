<!-- 秒杀专区 -->
<template>
    <div class="spike">
        <div class="spike-header">
            <span class="spike-header-title">有来秒杀</span>
            <div class="spike-header-countdown">
                <div class="spike-header-countdown-lt">
                    {{seckillInfoData.seckill_session_name||'10点场'}}
                </div>
                <div class="spike-header-countdown-rt">
                    <van-count-down :time="time" format="HH:mm:ss"/>
                </div>
            </div>
            <div class="spike-header-more" @click="handleMoreClick">
                <span class="spike-header-more-text">查看全部</span>
                <van-icon name="play" size="14"/>
            </div>
        </div>
        <!-- 秒杀商品 -->
        <seckill-goods :goodsList="seckillGoodsList"/>
    </div>
</template>

<script>
    import SeckillGoods from './goods'

    export default {
        components: {
            SeckillGoods
        },
        props: {
            seckillGoodsList: Array
        },
        watch: {
            spikeInfo: function (newValue, oldValue) {
                this.seckillInfoData = newValue
            }
        },
        data() {
            return {
                seckillInfoData: {},
                time: 30 * 60 * 1000 * 100,
            }
        },
        methods: {
            handleMoreClick() {
            }
        }
    }
</script>

<style lang="less" scoped>
    .spike {
        position: relative;
        background: #ffffff;
        height: 150px;
        margin-top: 10px;

        &-header {
            padding: 0 10px;

            &-title {
                display: inline-block;
                height: 26px;
                line-height: 26px;
                font-size: 14px;
                float: left;
                font-weight: bold;
            }

            &-countdown {
                float: left;
                &-lt {
                    margin-top: 1px;
                    margin-left: 10px;
                    font-size: 12px;
                    border: 1px solid #FB0017;
                    border-right: none;
                    border-bottom-left-radius: 22px;
                    border-top-left-radius: 22px;
                    height: 18px;
                    line-height: 18px;
                    padding: 0 3px;
                    color: #ffffff;
                    background: #FB0017;
                    float: left;
                }

                &-rt {
                    margin-top: 1px;
                    font-size: 12px;
                    float: left;
                    border: 1px solid #FB0017;
                    border-bottom-right-radius: 22px;
                    border-top-right-radius: 22px;
                    height: 18px;
                    line-height: 18px;
                    padding: 0 3px;
                }
            }

            &-more {
                float: right;

                &-text {
                    height: 24px;
                    line-height: 24px;
                    font-size: 14px;
                }

                .van-icon {
                    margin-left: 2px;
                    height: 24px;
                    line-height: 24px;
                    float: right;
                }
            }
        }
    }
</style>