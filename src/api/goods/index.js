import request from '@/utils/request'

export function getGoodsListByCategory(categoryId) {
    return request({
        url: '/v1/goods/getGoodsListByCategory',
        method: 'get',
        params: {categoryId: categoryId}
    })

}