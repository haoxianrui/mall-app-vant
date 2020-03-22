<template>
    <div class="user">
        <van-cell-group class="user-group">
            <van-cell >
                <img src="../../assets/images/bg.jpg" height="200" width="100%"/>
            </van-cell>
        </van-cell-group>

        <van-row class="user-links">
            <van-col span="6">
                <van-icon name="pending-payment"/>
                待付款
            </van-col>
            <van-col span="6">
                <van-icon name="records"/>
                待接单
            </van-col>
            <van-col span="6">
                <van-icon name="tosend"/>
                待发货
            </van-col>
            <van-col span="6">
                <van-icon name="logistics"/>
                已发货
            </van-col>
        </van-row>

        <van-cell-group class="user-group">
            <van-cell icon="records" title="全部订单" is-link/>
        </van-cell-group>

        <van-cell-group>
            <van-cell icon="points" title="我的积分" is-link/>
            <van-cell icon="gold-coin-o" title="我的优惠券" is-link/>
            <van-cell icon="gift-o" title="我的收货地址" is-link/>
        </van-cell-group>

        <!-- 路由出口 -->
        <transition name="router-slider"
                    mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import {Row, Col, Icon, Cell, CellGroup} from 'vant';

    export default {
        components: {
            [Row.name]: Row,
            [Col.name]: Col,
            [Icon.name]: Icon,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup
        }
    };
</script>

<style lang="less">
    .user {
        &-poster {
            width: 100%;
            height: 53vw;
            display: block;
        }

        &-group {
            margin-bottom: 15px;
        }

        &-links {
            padding: 15px 0;
            font-size: 12px;
            text-align: center;
            background-color: #fff;

            .van-icon {
                display: block;
                font-size: 24px;
            }
        }

        /*转场动画*/

        .router-slider-enter-active,
        .router-slider-leave-active {
            transition: all 0.3s;
        }

        .router-slider-enter,
        .router-slider-leave-active {
            transform: translate3d(2rem, 0, 0);
            opacity: 0;
        }
    }
</style>
