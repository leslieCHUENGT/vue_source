import { inject, ref } from 'vue'
import RouterLink from './RouterLink.vue'
import RouterView from './RouterView.vue'

// 定义一个常量，用于全局访问路由对象
const ROUTER_KEY = '__router__' 

// 返回路由实例
const createRouter = (options) => {
    return new Router(options)
}

// 使得全局可以获取路由对象
const useRouter = () => {
    return inject(ROUTER_KEY)
}

// 返回 hash 模式下的路由历史记录对象
const createWebHashHistory = () => {
    // 内部方法，用于绑定事件监听
    function bindEvents(fn) {
        window.addEventListener('hashchange', fn)
    }
    // 返回 hash 值和事件监听的方法
    return {
        bindEvents,
        url: window.location.hash.slice(1) 
    }
}

// 路由类工厂
class Router{
    constructor(options) {
        this.history = options.history  // 路由历史记录对象
        this.routes = options.routes  // 路由的配置数组
        this.current = ref(this.history.url) // 响应式的当前路由，自动更新
        // 给路由历史记录对象绑定事件监听器，当 URL 改变时，更新当前路由值
        this.history.bindEvents(() => {
            this.current.value = window.location.hash.slice(1) // 去除#号
        })
    }
    // 注册路由相关组件和提供全局路由对象
    install(app) {
        // 路由对象，提供给全局访问
        app.provide(ROUTER_KEY, this)
        // 注册全局组件
        app.component('router-link', RouterLink)
        app.component('router-view', RouterView)
    }
}

// 导出模块需要的变量和方法
export {
    useRouter,
    createRouter, // 返回路由实例
    createWebHashHistory // 返回hash 事件监听
}
