import request from '@/utils/request'


export function categoryList(params) {
    return request({
        url:'/pms/api.app/v1/categories',
        params:params,
        method:'get'
    })
}