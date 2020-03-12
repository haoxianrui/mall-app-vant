import {
    USER_INFO
} from "./mutation-type"

import {setLocalStore} from '@/utils/config/global'

export default {

    // 保存用户信息至本地
    [USER_INFO](state, {
        userInfo
    }) {
        // 保存用户信息至state
        state.userInfo = userInfo
        // 保存用户信息至缓存中
        setLocalStore('userInfo', userInfo)
    }

}