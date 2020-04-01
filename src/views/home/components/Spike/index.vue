<!-- 秒杀专区 -->
<template>
    <div id="spike">
        <div class="g-hd">
            <span class="u-tt">有来秒杀</span>
            <div class="m-countdown">
                <span class="u-span-lt">
                    {{spikeInfo&&spikeInfo.spikePeriodName}}
                </span>
                <span class="u-span-rt">
                     <van-count-down :time="time" format="HH:mm:ss"/>
                </span>
            </div>
            <div class="m-more" @click="handleMoreClick">
                <span class="u-span">查看全部</span>
                <van-icon name="play" size="14"/>
            </div>
        </div>
        <!-- 秒杀商品 -->
        <spike-goods :spikeGoodsList="spikeInfo&&spikeInfo.spikeGoodsList"/>
    </div>
</template>

<script>
    import SpikeGoods from './goods'

    export default {
        name: "spike",
        props: {
            spikeInfo: Object
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
    #spike {
        background: #ffffff;

        .g-hd {
            padding: 10px 10px 0 10px;

            .u-tt {
                display: inline-block;
                height: 30px;
                line-height: 30px;
                font-size: 14px;
                float: left;
                font-weight: bold;
            }

            .m-countdown {
                margin-left: 10px;
                display: inline-block;
                margin-top: -2px;

                .u-span-lt {
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
                }

                .u-span-rt {
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

            .m-more {
                float: right;

                .u-span {
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