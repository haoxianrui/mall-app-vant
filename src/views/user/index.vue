<template>
    <div class="user">
        <van-row class="user-info">
            <van-image
                    round
                    width="100"
                    height="100"
                    lazy-load
                    src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586000911539&di=0459b277d147f5056547ae754b86b858&imgtype=0&src=http%3A%2F%2Fimgq.duitang.com%2Fuploads%2Fitem%2F201503%2F22%2F20150322135429_aRMB4.jpeg"
            />
            <span class="user-info-name">郝先瑞</span>
        </van-row>

        <van-cell title="我的订单" is-link @click="handleOpenOrder"/>
        <van-row class="user-order">
            <van-col span="6">
                <van-icon  class="iconfont" class-prefix="icon" name="daifukuan" />
                待付款
            </van-col>
            <van-col span="6">
                <van-icon  class="iconfont" class-prefix="icon" name="daifahuo" />
                待发货
            </van-col>
            <van-col span="6">
                <van-icon  class="iconfont" class-prefix="icon" name="daishouhuo" />
                待收货
            </van-col>
            <van-col span="6">
                <van-icon  class="iconfont" class-prefix="icon" name="daipingjia" />
                待评价
            </van-col>
        </van-row>

        <van-cell-group title="我的功能" class="user-func">
            <van-cell>
                <van-col span="6">
                    <van-icon  class="iconfont" class-prefix="icon" name="youhuiquan" />
                    优惠券
                </van-col>
                <van-col span="6">
                    <van-icon  class="iconfont" class-prefix="icon" name="shangpinshoucang" />
                    商品收藏
                </van-col>
                <van-col span="6">
                    <van-icon  class="iconfont" class-prefix="icon" name="zuji" />
                    浏览足迹
                </van-col>
                <van-col span="6" @click="gotoAddress">
                    <van-icon  class="iconfont" class-prefix="icon" name="shouhuodizhi1" />
                    地址管理
                </van-col>
            </van-cell>
        </van-cell-group>

        <van-cell-group title="我的服务" class="user-service">
            <van-cell>
                <van-col span="6">
                    <van-icon  class="iconfont" class-prefix="icon" name="bangzhuzhongxin1" />
                    帮助中心
                </van-col>
                <van-col span="6">
                    <van-icon  class="iconfont" class-prefix="icon"  name="yijianfankui" />
                    意见反馈
                </van-col>
                <van-col span="6">
                    <van-icon  class="iconfont" class-prefix="icon"  name="lianxikefu" />
                    联系客服
                </van-col>
                <van-col span="6">
                    <van-icon  class="iconfont" class-prefix="icon"  name="guanyuwomen" />
                    关于我们
                </van-col>
            </van-cell>
        </van-cell-group>


        <van-row class="user-logout">
            <a href="javascript:void(0)" @click="handleClickLogout">退出登录</a>
        </van-row>

        <!-- 路由出口 -->
        <transition name="router-slider"
                    mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import {Toast} from 'vant'
    export default {
        methods:{
            handleOpenOrder:function(){
                this.$router.push({path:'/dashboard/user/order'})
            },
            handleClickLogout:function(){
                Toast("退出成功")
            },
            gotoAddress:function(){
                this.$router.push({path:'/dashboard/user/address'})
            }
        }
    };
</script>

<style lang="less">
    .user {
        background: #f5f5f5;

        &-info {
            height: 100px;
            padding: 15px;
            background: url(../../assets/images/user_head_bg.png) no-repeat;
            background-size:100%;
            &-name {
                display: inline-block;
                color: #FFFFFF;
                height: 80px;
                vertical-align: top;
                padding: 20px 0 0 10px;
                font-size: 20px;
            }
        }

        &-func,&-service,&-order{
            .van-cell {
                padding: 0;
            }

            .van-col {
                padding: 10px 0;
                font-size: 12px;
                text-align: center;
                background-color: #fff;
            }

            .van-icon,.iconfont {
                display: block;
                font-size: 30px;
                padding: 5px;
            }
        }

        &-logout {
            margin-top: 20px;
            background: #FFFFFF;
            text-align: center ;
            a{
                height: 60px;
                line-height:60px;
                color: #ff6c6c;
                font-size: 20px;
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

        .van-cell:not(:last-child)::after {
            left: 0 !important;
        }
    }
</style>
