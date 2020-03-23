<template>
    <div class="cart">
        <van-nav-bar
                title="购物车"
                :fixed=true
                :right-text="selectedCount > 0 ? '删除' : '' "
                @click-right="onClickDeleteCartGoods"
        >
        </van-nav-bar>


        <van-checkbox-group class="cart-goods"
                            v-model="checkedGoods"
                            ref="checkboxGroup"
        >
            <van-checkbox
                    class="cart-goods__item"
                    v-for="(goods,index) in shopCart"
                    :key="index"
                    :name="goods.id"
                    v-model="goods.checked"
                    @click="handleSingleSelect(goods.id)"
                    label-disabled
            >

                <van-card :title="goods.name"
                        :price="goods.price"
                        :thumb="goods.image">
                    <template #num>
                        <div class="stepper">
                            <span @click.stop="handleReduceGoods(goods.id,goods.num)">-</span>
                            <input type="number" disabled v-model="goods.num">
                            <span @click.stop="handleAddGoods(goods.id,goods.name, goods.price,goods.image)">+</span>
                        </div>


                    </template>
                </van-card>
            </van-checkbox>
        </van-checkbox-group>

        <van-submit-bar
                :price="totalPrice"
                :disabled="!selectedCount"
                :button-text="submitBarText"
                @submit="onSubmit"
        >
            <van-checkbox v-model="isCheckedAll">全选</van-checkbox>
        </van-submit-bar>

    </div>


</template>

<script>
    import {Toast, Dialog} from 'vant';
    import {mapState, mapGetters, mapMutations} from 'vuex'

    export default {
        watch:{
            checkedGoods:function (newVal) {
                console.log(newVal)
            }
        },
        computed: {
            ...mapState(['shopCart']),
            ...mapGetters({
                totalPrice: 'SELECTED_GOODS_PRICE'
            }),
            submitBarText() {
                const count = this.selectedCount
                return '结算' + (count ? `(${count})` : '')
            },
            // 购物车总数量
            totalCount() {
                return Object.keys(this.shopCart).length
            },
            // 选中条数
            selectedCount() {
                let selectedCount = 0
                Object.values(this.shopCart).forEach((goods, index) => {
                    if (goods.checked) {
                        selectedCount++
                    }
                })
                return selectedCount
            },
            isCheckedAll: {
                get() {
                    let flag = this.totalCount > 0
                    Object.values(this.shopCart).forEach(goods => {
                        if (!goods.checked) {
                            flag = false
                        }
                    })
                    return flag
                },
                set(value) {
                    let isCheckedAll = !value;
                    this.ALL_SELECT_GOODS({isCheckedAll})
                }
            },
            checkedGoods: {
                get() {
                    let checkedGoods = []
                    Object.values(this.shopCart).forEach(goods => {
                        if (goods.checked) {
                            checkedGoods.push(goods.id)
                        }
                    })
                    return checkedGoods
                },
                set(value) {
                }
            }
        },
        methods: {
            test(){
             alert(123)
            },

            ...mapMutations(['ADD_GOODS', 'REDUCE_GOODS', 'SINGLE_SELECT_GOODS', 'ALL_SELECT_GOODS', 'DELETE_SELECT_GOODS']),
            // 购物车删除商品
            onClickDeleteCartGoods() {
                if (this.selectedCount > 0) {
                    Dialog.confirm({
                        title: '提示',
                        message: '确认从购物车删除选中的商品？'
                    }).then(() => {
                        this.DELETE_SELECT_GOODS()
                    }).catch(() => {
                        // 取消事件
                    })
                }
            },
            handleAddGoods(goodsId, goodsName, goodsPrice, goodsImage) {
                this.ADD_GOODS({
                    goodsId,
                    goodsName,
                    goodsPrice,
                    goodsImage
                })
            },
            handleReduceGoods(goodsId, goodsNum) {
                if (goodsNum > 1) {
                    this.REDUCE_GOODS({goodsId})
                } else if (goodsNum === 1) {
                    Dialog.confirm({
                        title: '温馨提示',
                        message: '确实删除该商品吗？'
                    }).then(() => {
                        this.REDUCE_GOODS({goodsId})
                    }).catch(() => {
                        // 取消事件
                    })
                }
            },
            handleSingleSelect(goodsId) {
                this.SINGLE_SELECT_GOODS({goodsId})
            },
            onSubmit() {
                if (this.selectedCount > 0) {
                    // 跳转到订单界面
                    this.$router.push('/order');
                } else {
                    Toast({
                        message: '请选择需要结算的商品',
                        duration: 1000
                    });
                }
            }
        }
    };
</script>

<style lang="less">
    .cart {
        padding-top: 36px;

        &-goods {
            padding: 10px 0;
            background-color: #fff;

            &__item {
                position: relative;
                background-color: #fafafa;

                .van-checkbox__label {
                    width: 100%;
                    height: auto; // temp
                    padding: 0 10px 0 15px;
                    box-sizing: border-box;
                }

                .van-checkbox__icon {
                    top: 50%;
                    left: 10px;
                    z-index: 1;
                    position: absolute;
                    margin-top: -10px;
                }

                .van-card__price {
                    color: #f44;
                }
                .van-card__title{
                    margin-top: 10px;
                    font-size: 14px;
                }

                .stepper span {
                    display: inline-block;
                    width: 1rem;
                    height: 1.2rem;
                    line-height: 1.2rem;
                    text-align: center;
                    float: left;
                    font-size: 18px;
                }
                .stepper input {
                    float: left;
                    width: 2rem;
                    height: 1.2rem;
                    text-align: center;
                    margin: 0 0.2rem;
                    font-size: 0.8rem;
                    background-color: #f5f5f5;
                    border: 0;
                }
            }
        }

        .van-submit-bar {
            bottom: 50px;
        }
    }
</style>
