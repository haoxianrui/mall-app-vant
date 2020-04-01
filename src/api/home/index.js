import request from '@/utils/request'

// 获取轮播图
export function getHomeData() {
    return request({
        url:'/home',
        method:'get'
    })
}

// 广告轮播图
export function getAdList() {
    return request({
        url:'/v1/home/advertisement',
        method:'get'
    })
}

// 商品分类导航
export function getGoodsCategoryList() {
    return request({
        url:'/v1/home/getGoodsCategoryList',
        method:'get'
    })
}


// 首页秒杀商品

export function getSpikeGoodsList() {
    return request({
        url:'/v1/home/getSpikeGoodsList',
        method:'get'
    })
}