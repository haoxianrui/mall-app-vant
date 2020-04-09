<!-- 秒杀专区 -->
<template>
    <div class="spike">
        <div class="spike-header">
            <span class="spike-header-title">有来秒杀</span>
            <div class="spike-header-countdown">
                <span class="spike-header-countdown-lt">
                    {{spikeInfo&&spikeInfo.seckill_session_name}}
                </span>
                <span class="spike-header-countdown-rt">
                     <van-count-down :time="time" format="HH:mm:ss"/>
                </span>
            </div>
            <div class="spike-header-more" @click="handleMoreClick">
                <span class="spike-header-more-text">查看全部</span>
                <van-icon name="play" size="14"/>
            </div>
        </div>
        <!-- 秒杀商品 -->
        <spike-goods :seckillGoodsList="spikeInfo&&spikeInfo.goods_list"/>
    </div>
</template>

<script>
    import SpikeGoods from './goods'

    export default {
        name: "seckill",
        props: {
            spikeInfo: Object
        },
        data(){
          return {


          }
        },
        watch: {
            spikeInfo: function (newValue, oldValue) {
                this.spikeInfo = newValue
            }
        },
        data() {
            return {
                time: 30 * 60 * 1000 * 100,
            }
        },
        components: {
            SpikeGoods
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
        &-header {
            padding:0 10px;
            &-title {
                display: inline-block;
                height: 30px;
                line-height: 30px;
                font-size: 14px;
                float: left;
                font-weight: bold;
            }

            &-countdown {
                margin-left: 10px;
                display: inline-block;
                margin-top: -2px;

                &-lt {
                    display: inline-block;
                    font-size: 12px;
                    border: 1px solid #FB0017;
                    border-right: none;
                    border-bottom-left-radius: 22px;
                    border-top-left-radius: 22px;
                    height: 20px;
                    line-height: 20px;
                    padding: 0 3px;
                    color: #ffffff;
                    background: #FB0017;
                    vertical-align: middle;
                }

                &-rt {
                    .van-count-down {
                        font-size: 12px;
                    }

                    display: inline-block;
                    border: 1px solid #FB0017;
                    border-bottom-right-radius: 22px;
                    border-top-right-radius: 22px;
                    height: 20px;
                    line-height: 20px;
                    padding: 0 3px;
                }

                height: 30px;
                line-height: 30px;
            }

            &-more {
                float: right;

                &-text {
                    display: inline-block;
                    height: 30px;
                    line-height: 30px;
                    font-size: 14px;
                }

                .van-icon {
                    margin-left: 5px;
                    height: 28px;
                    line-height: 28px;
                    float: right;
                }
            }
        }
    }
</style>