<!-- 秒杀专区 -->
<template>
    <div id="main">
        <div class="header">
            <div class="title">秒杀专区</div>
            <van-count-down :time="time"
                            class="countStyle"
                            format="HH mm ss">
                <template v-slot="timeData">
                    <span class="item">{{ timeData.hours }}</span>
                    <span class="item">{{ timeData.minutes }}</span>
                    <span class="item">{{ timeData.seconds }}</span>
                </template>
            </van-count-down>
            <!-- 更多按钮 -->
            <div class="more"
                 @click="moreClick">{{ $t('home.more') }}
            </div>
        </div>


    </div>
</template>

<script>
    export default {
        name: "seckill",
        props

    }
</script>

<style scoped>

</style>