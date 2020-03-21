<template>
    <div class="addAddress">
        <van-nav-bar
                title="选择地址"
                :fixed=true
                left-arrow
                @click-left="onClickLeft"
        />
        <!-- 添加地址 -->
        <van-address-edit
                :area-list="areaList"
                show-postal
                show-set-default
                show-search-result
                :search-result="searchResult"
                :area-columns-placeholder="['请选择', '请选择', '请选择']"
                @save="onSave"
                @change-detail="onChangeDetail"
                save-button-text="保存并使用"
        />
    </div>
</template>

<script>
    import areaList from '@/utils/area'
    import {mapMutations} from 'vuex'
    export default {
        data() {
            return {
                areaList: areaList,
                searchResult: []
            }
        },
        methods: {
            ...mapMutations(['ADD_USER_SHOPPING_ADDRESS']),
            onClickLeft() {
                this.$router.back()
            },
            onSave(content) {
                let addressId = this.addressId().toString()
                content['id'] = addressId
                content['address'] = content.province + content.city + content.county + content.addressDetail
                this.ADD_USER_SHOPPING_ADDRESS({
                    content
                });
                this.$router.back();

            },
            onChangeDetail(val) {
                if (val) {
                    this.searchResult = [{
                        name: '黄龙万科中心',
                        address: '杭州市西湖区'
                    }];
                } else {
                    this.searchResult = [];
                }
            },
            addressId() {
                let lastUuid = 0;
                return (new Date()).getTime() * 1000 + (lastUuid++) % 1000;
            }
        }
    }
</script>

<style lang="less" scoped>
    .addAddress {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: #f5f5f5;
        z-index: 9999;
        padding-top: 3rem;
    }
</style>