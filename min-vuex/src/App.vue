<script setup>
import { useStore } from './store/gvuex'
import { computed } from 'vue'

let store = useStore();
let count = computed(() => store.state.count);
let double = computed(() => store.getters.double);

function add() {
  store.commit('add')
}

function asyncAdd() {
  store.dispatch('asyncAdd')
}
</script>

<template>
<div>{{ count }} * 2 = {{ double }}</div>
<button @click="add">add</button>
<button @click="asyncAdd">async add</button>
</template>

<style>

</style>
