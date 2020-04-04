<template>
    <div class="main">
        <van-search v-model="searchValue" placeholder="请输入搜索关键词"/>


        <div class="category">
                <van-col span="6" style="overflow-y:auto">
                    <van-sidebar v-model="activeKey" @change="handleCategoryChange">
                        <van-sidebar-item title="标签名1标"/>
                        <van-sidebar-item title="标签名2"/>
                        <van-sidebar-item title="标签名3"/>
                        <van-sidebar-item title="标签名1"/>
                        <van-sidebar-item title="标签名1"/>
                        <van-sidebar-item title="标签名2"/>
                        <van-sidebar-item title="标签名3"/>
                        <van-sidebar-item title="标签名1"/>
                        <van-sidebar-item title="标签名1"/>
                        <van-sidebar-item title="标签名2"/>
                        <van-sidebar-item title="标签名3"/>
                        <van-sidebar-item title="标签名2"/>
                    </van-sidebar>

                </van-col>
                <van-col span="18" style="overflow-y:auto">

                    <div>
                        <van-image
                                style="margin: 0 auto"
                                width="100%"
                                height="100"
                                src="https://img.yzcdn.cn/vant/apple-1.jpg"
                        />

                    </div>

                    <van-divider >商品分类</van-divider>


                    <van-grid :gutter="10"  :column-num="3" :border="false">
                        <van-grid-item
                                v-for="value in 18"
                                :key="value"
                                icon="photo-o"
                                text="商品分类2"
                        />
                    </van-grid>

                </van-col>
        </div>
    </div>
</template>

<script>


    export default {


        data() {
            return {
                searchValue: undefined,
                activeKey: 0
            }
        },

        methods: {
            handleCategoryChange: function () {

            }
        }
    }
</script>

<style lang="less">
    .main {
        background: #FFFFFF;
        height: 100%;
        .category{
            display: flex;
            position: absolute;
            top:54px;
            bottom: 50px;
            overflow: hidden;
            .van-sidebar{
                width: 100%;
            }
            .van-divider::after, .van-divider::before{
                height: 0;
                border-width:2px 0 0;
            }
        }
    }
</style>
