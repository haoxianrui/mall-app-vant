<template>
    <div class="category-list-container">
        <van-nav-bar
                :title="parentCategory.name"
                :fixed=true
                left-arrow
                @click-left="onClickLeft"
        />

        <van-tabs v-model="categoryId" @click="onCategoryClick" sticky>
            <van-tab
                    v-for="(category,index) in categoryList"
                    :name="category.id"
                    :title="category.name"
            >
                <div class="category-content">
                    <div class="category-content-name">{{category.name}}</div>
                    <div class="category-content-description">{{category.description}}</div>
                    <div class="category-content-goods">
                        <van-grid :gutter="6" :column-num="2" :border="false">
                            <van-grid-item
                                    v-for="(goods,index) in goodsList"
                                    @click="gotoGoodsDetail(goods.id)"
                            >
                                <van-image class="category-content-goods-image" :src="goods.pic_url"/>
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

    import {categoryList} from '@/api/category'
    import {goodsList} from '@/api/goods'

    export default {
        data() {
            return {
                parentCategory: {
                    id: this.$route.query.categoryId,
                    name: this.$route.query.categoryName
                },
                categoryList: [],
                categoryId: undefined,
                goodsList: []
            }
        },
        mounted() {
            this.initData()
        },
        methods: {
            initData: function () {
                let params = {
                    parent_id: this.parentCategory.id
                }

                // tab分类列表数据加载
                categoryList(params).then(response => {
                    this.categoryList = []
                    if (response.data && response.data.length > 0) {
                        this.categoryList = response.data
                        this.categoryId = response.data[0].id
                        this.loadGoodsListByCategoryId()
                    }
                })
            },
            onClickLeft() {
                this.$router.back();
            },
            onCategoryClick: function (categoryId) {
                this.categoryId = categoryId
                this.loadGoodsListByCategoryId()
            },
            loadGoodsListByCategoryId() {
                let params = {
                    category_id: this.categoryId
                }
                // 选中的分类下的商品列表数据加载
                goodsList(params).then(response => {
                    this.goodsList = []
                    if (response.data && response.data.length > 0) {
                        this.goodsList = response.data
                    }
                })
            },
            gotoGoodsDetail(goodsId) {
                this.$router.push({
                    name: 'goods',
                    params: {
                        goodsId: goodsId
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .category-list-container {
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
    }

</style>