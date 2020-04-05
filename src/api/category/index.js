import request from '@/utils/request'

export function getCategoryList() {
    return request({
        url: '/v1/categories/getCategoryList',
        method: 'get'
    })

}

export function getSubCategoryList(categoryId) {
    return request({
        url: '/v1/categories/getSubCategoryList',
        method: 'get',
        params: {categoryId: categoryId}
    })


}