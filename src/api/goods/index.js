import request from '@/utils/request'

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