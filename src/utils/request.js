import axios from 'axios'
import {Toast} from 'vant'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
const service = axios.create({
    baseURL: '/api',
    withCredentials: true,
    timeout: 50000
})

/** 请求拦截器 */
service.interceptors.request.use(
    config => {
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