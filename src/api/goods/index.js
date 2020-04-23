import request from '@/utils/request'

export function goodsList(params) {
    return request({
        url: '/pms/api.app/v1/goods',
        params: params,
        method: 'get'
    })
}

export function goodsDetail(id) {
    return request({
        url:'/pms/api.app/v1/goods/'+id,
        method:'get'
    })
}
