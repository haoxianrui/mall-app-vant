import request from '@/utils/request'

// 优惠券
export function getCouponList() {
    return request({
        url:'/v1/users/coupons',
        method:'get'
    })
}


