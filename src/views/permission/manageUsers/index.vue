<template>
    <div>
        <p>{{ dialogFormVisible }}</p>
        <p @click="log">{{ tableDataLoading }}</p>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const dialogFormVisible = ref(1)
const tableDataLoading = 1
function log() {
    console.log(tableDataLoading)
}
</script>
