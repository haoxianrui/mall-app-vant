<template>
    <div class="main">
        <van-search v-model="searchValue" input-align="center" placeholder="请输入搜索商品关键词" readonly/>

        <div class="category">
            <van-col span="6" style="overflow-y:auto">
                <van-sidebar v-model="activeIndex" @change="handleCategoryChange">
                    <van-sidebar-item :title="category.name" v-for="(category,index) in categoryList"/>
                </van-sidebar>

            </van-col>
            <van-col span="18" style="overflow-y:auto">

                <van-image
                        style="margin: 0 auto"
                        width="100%"
                        height="100"
                        :src="currentCategoryIcon"
                />
                <van-divider>{{currentCategoryName}}</van-divider>
                <van-grid :gutter="10" :column-num="3" :border="false">
                    <van-grid-item
                            v-for="(item,index) in subCategoryList"
                            :key="index"
                            :text="item.name"
                            @click="gotoCategoryList(item.id)"
                    >
                        <template #icon>
                            <van-image :src="item.icon"/>
                        </template>
                    </van-grid-item>
                </van-grid>

            </van-col>
        </div>


        <!-- 路由出口 -->
        <transition name="router-slider"
                    mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>

    import {getCategoryList, getSubCategoryList} from '@/api/category'

    export default {

        data() {
            return {
                searchValue: undefined,
                activeIndex: 0,
                categoryList: [],
                subCategoryList: [],
                currentCategoryIcon: undefined,
                currentCategoryName: undefined,
                currentCategoryDescription: undefined
            }
        },
        mounted() {
            this.initData()
        },
        methods: {
            initData() {
                getCategoryList().then(response => {
                    this.categoryList = response.data
                    if (this.categoryList && this.categoryList.length > 0) {
                        let currentCategory = this.categoryList[0]
                        this.currentCategoryIcon = currentCategory.icon
                        this.currentCategoryName = currentCategory.name
                        this.currentCategoryDescription = currentCategory.description
                        this.getSubCategoryList(currentCategory.id)
                    }
                })
            },
            handleCategoryChange: function (index) {
                let currentCategory = this.categoryList[index]
                this.currentCategoryIcon = currentCategory.icon
                this.currentCategoryName = currentCategory.name
                this.getSubCategoryList(currentCategory.id)
            },
            getSubCategoryList(categoryId) {
                getSubCategoryList(categoryId).then(response => {
                    this.subCategoryList = response.data
                })
            },
            gotoCategoryList(categoryId) {
            /*    this.$router.push({
                    name: 'categoryList', params: {
                        categoryList: this.subCategoryList,
                        currentCategoryId: categoryId,
                        parentCategoryName: this.currentCategoryName,
                    }
                })*/

                this.$router.push({path:'/dashboard/category/list',query:{categoryId:categoryId}})
            }
        }
    }
</script>

<style lang="less">
    .main {
        background: #FFFFFF;
        height: 100%;

        .category {
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
