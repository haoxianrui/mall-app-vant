import {
    USER_INFO,
    INIT_USER_INFO,
    INIT_SHOP_CART,
    ADD_TO_CART,
    ADD_GOODS,
} from "./mutation-type"
import {setLocalStore, getLocalStore} from '@/utils/global'
import {Toast} from 'vant'
import router from '@/router'

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
            router.push('/login')
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
    }


}