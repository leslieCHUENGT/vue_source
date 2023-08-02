<template>
    <a :href="'#' + props.to">
        <!-- 插槽 -->
        <slot />
    </a>
</template>

<script setup>
import { defineProps } from 'vue'

let props = defineProps({
    to: {
        type: String,
        required: true
    }
})
</script>

<style scoped>

</style>