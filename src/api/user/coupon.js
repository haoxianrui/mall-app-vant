import request from '@/utils/request'

// 优惠券
export function couponList(params) {
    return request({
        url: '/sms/api.app/v1/coupons',
        method: 'get',
        params: params
    })
}


