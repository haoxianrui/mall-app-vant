import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    scrollBehavior: () => ({y: 0}),
    routes: [{
        path: '/',
        redirect: '/dashboard',
        meta: {
            //是否缓存数据
            keepAlive: true
        }
    }, {
        // 主框架页面
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard'),
        children: [{
            path: '/dashboard',
            redirect: '/dashboard/home',
            meta: {
                keepAlive: true
            }
        }, {
            path: 'home',
            name: 'home',
            component: () => import("@/views/home"),
            meta: {
                keepAlive: true
            }
        }

        ]
    }]

})


export default router