<template>
    <!-- 动态渲染组件 -->
    <component :is="component"></component>
</template>
<script setup>
// 引入 useRouter 和 computed
import { useRouter } from './index' 
import { computed } from 'vue'

// 获取当前路由
const router = useRouter()

// 计算属性 component，根据当前路由找到对应的组件
const component = computed(() => {
    const route = router.routes.find(
        (item) => item.path === router.current.value
    )
    return route ? route.component : null
})
</script>
<style scoped>
   
</style>
