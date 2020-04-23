import request from '@/utils/request'


// 订单提交
export function orderSubmit(data) {
    return request({
        url:'/oms/api.app/v1/orders',
        method:'post',
        data:data
    })
}

// 随机生成页面token
export function orderToken() {
    return request({
        url:'/oms/api.app/v1/orders/token',
        method:'post'
    })
}



// 用户订单
export function getOrderList() {
    return request({
        url:'/v1/orders/getOrderList',
        method:'get'
    })
}