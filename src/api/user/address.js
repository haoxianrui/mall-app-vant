import request from '@/utils/request'

// 用户地址
export function addressList(params) {
    return request({
        url: '/ums/api.app/v1/addresses',
        method: 'get',
        params: params
    })
}

// 添加地址
export function addAddress(address) {
    return request({
        url: '/ums/api.app/v1/addresses',
        method: 'post',
        data: address
    })
}

// 修改地址
export function updateAddress(id, address) {
    return request({
        url: '/ums/api.app/v1/addresses/' + id,
        method: 'put',
        data: address
    })
}

// 删除地址
export function deleteAddress(id) {
    return request({
        url: '/ums/api.app/v1/addresses/' + id,
        method: 'delete'
    })
}



