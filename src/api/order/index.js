import request from '@/utils/request'


// 用户订单
export function getOrderList() {
    return request({
        url:'/v1/orders/getOrderList',
        method:'get'
    })
}