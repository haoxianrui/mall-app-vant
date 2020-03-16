import axios from 'axios'
import {Toast} from 'vant'

const service = axios.create({
    // https://www.easy-mock.com/mock/5e6d93c1942b460f8b113246/shop-app
    baseURL: '',
    withCredentials: true,
    timeout: 50000
})

/** 请求拦截器 */
service.interceptors.request.use(
    config => {
        if (config.method.toUpperCase() === 'GET') {
            // 添加随机code 避免请求缓存
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

/** 响应拦截器 */
service.interceptors.response.use(
    response => {
        if (response.data.code != undefined) {
            if (response.data.code !== 0) {
                Toast.fail('请求失败')
                return Promise.reject(response.data.msg || 'error')
            } else {
                return response.data
            }
        } else {
            return response.data
        }
    }
)
export default service