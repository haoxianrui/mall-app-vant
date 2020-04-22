import request from '@/utils/request'

export function goodsList(params) {
    return request({
        url: '/pms/api.app/v1/goods',
        params: params,
        method: get
    })
}

export function goodsDetail(id) {
    return request({
        url:'/pms/api.app/v1/goods/'+id,
        method:get
    })

}


export function getGoodsListByCategory(categoryId) {
    return request({
        url: '/v1/goods/getGoodsListByCategory',
        method: 'get',
        params: {categoryId: categoryId}
    })
}

export function getGoodsInfo(goodsId) {
    return request({
        url: '/v1/goods/getGoodsInfo',
        method: 'get',
        params: {goodsId: goodsId}
    })
}

export function getGoodsSku(goodsId) {
    return request({
        url: '/v1/goods/sku',
        method: 'get'
    })
}