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

/**
 * 获取父分类信息
 */
export function  getParentCategory(categoryId) {
    return request({
        url: '/v1/categories/getParentCategory',
        method: 'get',
        params: {categoryId: categoryId}
    })
}