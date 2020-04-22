import request from '@/utils/request'



export function advertList() {
    return request({
        url: '/sms/api.app/v1/adverts',
        method: 'get'
    })
}


// 商品分类导航
export function getGoodsCategoryList() {
    return request({
        url:'/v1/home/getGoodsCategoryList',
        method:'get'
    })
}


// 秒杀商品
export function getSeckillInfo() {
    return request({
        url:'/v1/home/seckills',
        method:'get'
    })
}

// 人气推荐商品
export  function getHotGoodsList() {
    return request({
        url:'/v1/home/getHotGoodsList',
        method:'get'
    })
}