<template>
    <div class="category-container">
        <van-search v-model="searchValue" input-align="center" placeholder="请输入搜索商品关键词" readonly/>

        <div class="category">
            <van-col span="6" style="overflow-y:auto">
                <van-sidebar v-model="activeIndex" @change="handleCategoryChange">
                    <van-sidebar-item
                            v-for="(category,index) in categoryList"
                            :title="category.name"
                    />
                </van-sidebar>
            </van-col>
            <van-col span="18" style="overflow-y:auto;">
                <van-image
                        width="100%"
                        height="145"
                        :src="currentCategory.pic_url"
                />
                <van-divider>{{currentCategory.name}}</van-divider>
                <van-grid :gutter="10" :column-num="2" :border="false">
                    <van-grid-item
                            v-for="(item,index) in subCategoryList"
                            :key="index"
                            :text="item.name"
                            @click="gotoCategoryList()"
                    >
                        <template #icon>
                            <van-image  :src="item.icon_url" />
                        </template>
                    </van-grid-item>
                </van-grid>

            </van-col>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import {categoryList,} from '@/api/category'

    export default {
        data() {
            return {
                searchValue: undefined,
                activeIndex: 0,
                categoryList: [],
                subCategoryList: [],
                currentCategory: {
                    id: undefined,
                    name: undefined,
                    icon_url: undefined,
                    description: undefined,
                    pic_url:undefined
                }
            }
        },
        mounted() {
            this.initData()
        },
        methods: {
            initData() {
                let params = {
                    level: 1
                }
                categoryList(params).then(response => {
                    if (response.data) {
                        this.categoryList = response.data
                        if (response.data.length > 0) {
                            this.currentCategory = response.data[0]
                            params = {
                                parent_id: this.currentCategory.id,
                            }
                            categoryList(params).then(response => {
                                if (response.data) {
                                    this.subCategoryList = response.data
                                }
                            })
                        }
                    }
                })
            },
            handleCategoryChange: function (index) {
                this.currentCategory = this.categoryList[index]
                let params = {
                    parent_id: this.currentCategory.id,
                }
                categoryList(params).then(response => {
                    this.subCategoryList = response.data
                })
            },
            gotoCategoryList() {
                this.$router.push({
                    path: '/dashboard/category/list',
                    query: {categoryId: this.currentCategory.id, categoryName: this.currentCategory.name}
                })
            }
        }
    }
</script>

<style lang="less">
    .category-container {
        background: #FFFFFF;

        height: 100%;

        .category {
            width: 100%;
            display: flex;
            position: absolute;
            top: 54px;
            bottom: 50px;
            overflow: hidden;

            .van-sidebar {
                width: 100%;
            }

            .van-divider::after, .van-divider::before {
                height: 0;
                border-width: 2px 0 0;
            }
            .van-image{
                width:40px;
                height: 40px;
            }
        }

    }
</style>
