import request from '@/utils/request'

// 获取轮播图
export function getHomeData() {
    return request({
        url:'/home',
        method:'get'
    })
}