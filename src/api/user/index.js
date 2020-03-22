import request from '@/utils/request'

// 优惠券
export function coupon() {
    return request({
        url:'/coupon',
        method:'get'
    })
}

// 订单
export function order() {
    return request({
        url:'/order',
        method:'get'
    })
}
