import request from '@/utils/request'

// 用户地址
export function getAddressList() {
    return request({
        url:'/v1/users/addresses',
        method:'get'
    })
}
// 添加地址
export function addAddress(address) {
    return request({
        url:'/v1/users/addresses',
        method:'post',
        data:address
    })
}
// 修改地址
export function editAddress(id,address) {
    return request({
        url:'/v1/users/addresses',
        method:'put',
        data:address
    })
}
// 删除地址
export function deleteAddress(id) {
    return request({
        url:'/v1/users/addresses',
        method:'delete'
    })
}
// 获取地址
export function getAddressInfo(id) {
    return request({
        url:'/v1/users/getAddressInfo',
        method:'get'
    })
}


