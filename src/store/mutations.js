import {
    USER_INFO,
    INIT_USER_INFO,
    INIT_SHOP_CART
} from "./mutation-type"
import {setLocalStore, getLocalStore} from '@/utils/global'
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
    }
}