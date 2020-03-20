import {USER_INFO} from "@/store/mutation-type"
import {getLocalStore} from '@/utils/global'

export default {
    // 同步用户信息
    syncUserInfo: function ({commit}, userInfo) {
        commit(USER_INFO, {userInfo})
    },
    // 本地存在token 自动登录
    autoLogin: function ({commit}) {
       let userInfo = getLocalStore(`userInfo`)
        if (!userInfo) {
            return;
        }
        commit(USER_INFO, userInfo)
    }
}
