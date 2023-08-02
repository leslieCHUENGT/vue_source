import { reactive, inject } from 'vue'

// 定义了一个全局的 key，用于在 Vue 组件中通过 inject API 访问 store 对象
const STORE_KEY = '__store__'

// 用于获取当前组件的 store 对象
function useStore() {
    return inject(STORE_KEY)
}

// Store 类，用于管理应用程序状态
class Store {

    // 构造函数，接收一个包含 state、mutations、actions 和 getters 函数的对象 options，
    // 然后将它们保存到实例属性中
    constructor(options) {
        this.$options = options;

        // 使用 Vue.js 的 reactive API 将 state 数据转换为响应式对象，并保存到实例属性 _state 中        
        this._state = reactive({
            data: options.state()
        })

        // 将 mutations 和 actions 函数保存到实例属性中
        this._mutations = options.mutations
        this._actions = options.actions;

        // 初始化 getters 属性为空对象
        this.getters = {};

        // 遍历所有的 getters 函数，将其封装成 computed 属性并保存到实例属性 getters 中
        Object.keys(options.getters).forEach(name => {
            const fn = options.getters(name);
            this.getters[name] = computed(() => fn(this.state));
        })
    }

    // 用于获取当前状态数据
    get state() {
        return this._state.data
    }

    commit = (type, payload) => {
        const entry = this._mutations[type]
        entry && entry(this.state, payload)
    }

    dispatch = (type, payload) => { 
        const entry = this._actions[type];
        return entry && entry(this, payload)
    }

    // 将当前 store 实例注册到 Vue.js 应用程序中
    install(app) {
        app.provide(STORE_KEY, this)
    }
}

// 创建一个新的 Store 实例并返回
function createStore(options) {
    return new Store(options);
}

// 导出 createStore 和 useStore 函数，用于在 Vue.js 应用程序中管理状态
export {
    createStore,
    useStore
}
