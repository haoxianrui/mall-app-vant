import request from '@/utils/request'

// 登录接口
export function login(data) {
    return request({
        url:'/login',
        method:'post',
        data:data
    })
}