import axios from 'axios'

import {randomCode} from "@/utils"

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    withCredentials: true,
    timeout: 50000
})

/** 请求拦截器 */
service.interceptors.request.use(
    config => {
        if(config.method.toUpperCase()==='GET'){
            console.log(config.params+","+randomCode())
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)