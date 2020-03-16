<template>
    <div class="scrollTop"
         v-show="showTop"
         @click="toTop">
        <div class="backtotop">
            <van-icon name="arrow-up"  />

        </div>

    </div>
</template>
<script>
    export default {
        name: 'scroll-top',
        data () {
            return {
                scrollTop: 0,
                time: 0,
                dParams: 20,
                scrollState: 0
            }
        },
        computed: {
            showTop: function () {
                let value = this.scrollTop > 200 ? true : false;
                return value;
            },
        },
        mounted () {
            window.addEventListener('scroll', this.getScrollTop);
        },
        methods: {
            toTop (e) {
                if (!!this.scrollState) {
                    return;
                }
                this.scrollState = 1;
                e.preventDefault();
                let distance = document.documentElement.scrollTop || document.body.scrollTop;
                let _this = this;
                this.time = setInterval(function () { _this.gotoTop(_this.scrollTop - _this.dParams) }, 10);
            },
            gotoTop (distance) {
                this.dParams += 20;
                distance = distance > 0 ? distance : 0;
                document.documentElement.scrollTop = document.body.scrollTop = window.pageYOffset = distance;
                if (this.scrollTop < 10) {
                    clearInterval(this.time);
                    this.dParams = 20;
                    this.scrollState = 0;
                }
            },
            getScrollTop () {
                this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            }
        }
    }
</script>
<style lang="less" scoped>
    .backtotop {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        background: #ffffff;
        .van-icon{
            font-size: 20px;
            margin: 10px;
        }
    }
    .scrollTop {
        right: 0;
        position: fixed;
        bottom: 5rem;
        cursor: pointer;
        z-index: 100;
    }
</style>