import {
    USER_INFO,
    INIT_USER_INFO,
    INIT_SHOP_CART,
    ADD_TO_CART,
    ADD_GOODS,
    REDUCE_GOODS,
    SINGLE_SELECT_GOODS,
    ALL_SELECT_GOODS,
    DELETE_SELECT_GOODS,
    INIT_USER_SHOPPING_ADDRESS,
    ADD_USER_SHOPPING_ADDRESS,
    CHANGE_USER_SHOPPING_ADDRESS,
    DELETE_USER_SHOPPING_ADDRESS


} from "./mutation-type"
import {setLocalStore, getLocalStore} from '@/utils/global'
import {Toast} from 'vant'
import router from '@/router'
import Vue from 'vue'

export default {
    // 保存用户信息至本地
    [USER_INFO](state, {
        userInfo
    }) {
        // 保存用户信息至state
        state.userInfo = userInfo
        // 保存用户信息至缓存中
        setLocalStore('userInfo', userInfo)
    },
    // 页面初始化获取本地用户信息
    [INIT_USER_INFO](state) {
        let userInfo = getLocalStore("userInfo")
        if (userInfo) {
            state.userInfo = JSON.parse(userInfo)
        }
    },
    // 页面初始化获取本地购物车数据
    [INIT_SHOP_CART](state) {
        let shopCart = getLocalStore('shopCart')
        if (shopCart) {
            state.shopCart = JSON.parse(shopCart)
        }
    },
    // 添加商品进购物车
    [ADD_TO_CART](state, goods) {
        if (state.userInfo.token) {
            setTimeout(() => {
                this.commit('ADD_GOODS', {
                    goodsId: goods.id,
                    goodsName: goods.name,
                    goodsImage: goods.image,
                    goodsPrice: goods.price
                })
                Toast({
                    message: '成功加入购物车',
                    duration: 800
                })
            }, 900)
        } else {
            router.push({name:'login'})
        }
    },
    // 添加商品
    [ADD_GOODS](state, {
        goodsId,
        goodsName,
        goodsImage,
        goodsPrice
    }) {
        let shopCart = state.shopCart
        if (shopCart[goodsId]) {
            shopCart[goodsId]['num']++
        } else {
            shopCart[goodsId] = {
                'num':1,
                'id':goodsId,
                'name':goodsName,
                'price':goodsPrice,
                'image':goodsImage,
                'checked':true
            }
            state.shopCart={
                ...shopCart
            }
        }
        setLocalStore('shopCart',state.shopCart)
    },
    // 减少商品
    [REDUCE_GOODS](state, {
        goodsId
    }) {
        let shopCart = state.shopCart;
        let goods = shopCart[goodsId];
        if (goods) {
            if (goods['num'] > 0) {
                goods['num']--
            }
            // 数量为0 移除商品
            if (goods['num'] === 0) {
                delete shopCart[goodsId]
            }
            state.shopCart = {
                ...shopCart
            };
            setLocalStore('shopCart', state.shopCart);
        }
    },
    // 单个商品选中
    [SINGLE_SELECT_GOODS](state, {
        goodsId
    }) {
        let shopCart = state.shopCart;
        let goods = shopCart[goodsId];
        if (goods) {
            if (goods.checked) {
                // 单选取反
                goods.checked = !goods.checked;
            } else {
                // 不存在设置默认值
                Vue.set(goods, 'checked', true);
            }
        }
        state.shopCart = {
            ...shopCart
        };
        setLocalStore('shopCart', state.shopCart);
    },

    // 购物车全选商品对应state的shopCart变化
    [ALL_SELECT_GOODS](state, {
        isCheckedAll
    }) {
        let shopCart = state.shopCart;
        Object.values(shopCart).forEach((goods, index) => {
            if (goods.checked) {
                goods.checked = !isCheckedAll;
            } else {
                Vue.set(goods, 'checked', !isCheckedAll);
            }
        });
        //  同步state数据
        state.shopCart = {
            ...shopCart
        };
        //  将数据更新到本地缓存
        setLocalStore('shopCart', state.shopCart);
    },

    // 删除选中商品
    [DELETE_SELECT_GOODS](state) {
        let shopCart = state.shopCart;
        Object.values(shopCart).forEach((goods, index) => {
            if (goods.checked) {
                delete shopCart[goods.id];
            }
        });
        state.shopCart = {
            ...shopCart
        }
        setLocalStore('shopCart', state.shopCart);
    },

    //  初始化获取用户收货地址
    [INIT_USER_SHOPPING_ADDRESS](state) {
        let shippingAddress = getLocalStore('shippingAddress');
        state.shippingAddress = JSON.parse(shippingAddress) || []
    },

    // 增加用户地址
    [ADD_USER_SHOPPING_ADDRESS](state, {
        content
    }) {
        state.shippingAddress = [...state.shippingAddress, content];
        setLocalStore('shippingAddress', state.shippingAddress);
    },

    // 删除用户地址
    [DELETE_USER_SHOPPING_ADDRESS](state, {
        id
    }) {
        state.shippingAddress = state.shippingAddress.filter(item => item.id !== id)
        setLocalStore('shippingAddress', state.shippingAddress);
    },
    // 修改用户地址
    [CHANGE_USER_SHOPPING_ADDRESS](state, {
        content
    }) {
        const index = state.shippingAddress.findIndex(item => item.id === content.id)
        state.shippingAddress.splice(index, 1, content)
        setLocalStore('shippingAddress', state.shippingAddress);
    },

}