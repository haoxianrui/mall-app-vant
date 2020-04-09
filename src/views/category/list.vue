<template>
    <div class="category-list">
        <van-nav-bar
                :title="this.parentCategory.name"
                :fixed=true
                left-arrow
                @click-left="onClickLeft"
        />

        <van-tabs v-model="categoryId" @click="onClickCategory" sticky>
            <van-tab :title="category.name" :name="category.id"
                     v-for="(category,index) in parentCategory.children">
                <div class="category-content">
                    <div class="category-content-name">{{category.name}}</div>
                    <div class="category-content-description">{{category.description}}</div>
                    <div class="category-content-goods">
                        <van-grid :gutter="6" :column-num="2" :border="false">
                            <van-grid-item
                                    v-for="(goods,index) in goodsList"
                                    @click="gotoGoodsDetail(goods.id)"
                            >
                                <van-image class="category-content-goods-image" :src="goods.image_url"/>
                                <div class="category-content-goods-title">{{goods.name}}</div>
                                <div class="category-content-goods-price">{{goods.price|moneyFormat}}</div>
                            </van-grid-item>
                        </van-grid>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import {getGoodsListByCategory} from '@/api/goods'

    import {getParentCategory} from '@/api/category'

    export default {
        name: "index",
        data() {
            return {
                categoryId: this.$route.params.categoryId,
                parentCategory:{},
                goodsList: []
            }
        },
        mounted() {
            this.initData()
        },
        methods: {
            initData: async function () {
                await this.getParentCategory()
                this.getGoodsListByCategory(this.categoryId)
            },
            onClickCategory: function (categoryId) {
                this.getGoodsListByCategory(categoryId)
            },
            getParentCategory: function () {
                getParentCategory(this.categoryId).then(response => {
                    this.parentCategory = response.data
                })
            },
            getGoodsListByCategory: function (categoryId) {
                getGoodsListByCategory(categoryId).then(response => {
                    this.goodsList = response.data
                })
            },
            onClickLeft() {
                this.$router.back();
            },
            gotoGoodsDetail(goodsId) {
                this.$router.push({
                    name: 'goods', params: {
                        goodsId: goodsId
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .category-list {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f5f5f5;
        z-index: 2000;
        padding-top: 44px;
        overflow: auto;

        .category-content {
            text-align: center;

            &-name {
                margin-top: 10px;
                font-size: 14px;
                color: #323233;
            }

            &-description {
                margin-top: 10px;
                font-size: 12px;
                color: #ccc;
            }

            &-goods {
                margin-top: 10px;

                &-image {
                    width: 100%;
                    height: 120px;
                }

                &-title {
                    line-height: 30px;

                }

                &-price {
                    color: #e25450;
                }

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