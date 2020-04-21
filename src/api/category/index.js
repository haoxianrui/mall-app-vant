import request from '@/utils/request'


export function categoryList(params) {
    return request({
        url:'/pms/api.app/v1/categories',
        params:params,
        method:'get'
    })
}

//////////上面1个方法替代下面3个方法////////////////


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