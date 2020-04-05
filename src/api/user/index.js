import request from '@/utils/request'

// 用户登录
export function login(data) {
    return request({
        url:'/v1/users/login',
        method:'post',
        data:data
    })
}

// 用户优惠券
export function getCouponList() {
    return request({
        url:'/v1/users/1/coupon',
        method:'get'
    })
}

// 用户地址
export function getAddressList() {
    return request({
        url:'/v1/users/1/address',
        method:'get'
    })
}




