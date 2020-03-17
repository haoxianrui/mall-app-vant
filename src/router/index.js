import Vue from 'vue'
import Router from 'vue-router'


// 解决多次点击重复路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

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
        },{
            path: 'category',
            name: 'category',
            component :() => import("@/views/category"),
            meta:{
                keepAlive: true
            }
        },{
            path: 'cart',
            name: 'cart',
            component:()=>import("@/views/cart"),
            meta:{
                keepAlive: true
            }
        },{
            path: 'user',
            name :'user',
            component : ()=>import("@/views/user")
        },{
            // 商品详情页
            path: '/goodsDetail',
            name: 'goodsDetail',
            component: ()=>import("@/components/goodsDetail")
        }]
    }]

})


export default router