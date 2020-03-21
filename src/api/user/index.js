import request from '@/utils/request'

// 登录接口
export function coupon() {
    return request({
        url:'/coupon',
        method:'get'
    })
}