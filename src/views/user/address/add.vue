<template>
    <div class="add-address">
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
    import {addAddress} from "@/api/user/address"
    import {Toast} from 'vant'
    export default {
        data() {
            return {
                areaList: areaList,
                searchResult: []
            }
        },
        methods: {
            onClickLeft() {
                this.$router.back()
            },
            onSave(content) {
               addAddress(content).then(response => {
                   if(response.code===0){
                       Toast('添加成功')
                       this.$router.back()
                   }
               })

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
            }
        }
    }
</script>

<style lang="less" scoped>
    .add-address {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: #f5f5f5;
        z-index: 2001;
        padding-top: 3rem;
    }
</style>