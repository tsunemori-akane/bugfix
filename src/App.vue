<script setup lang="ts">
import useDialog from "./components/dialog/useDialog";
import test from "./components/test.vue"

const handleClick = () => {
  useDialog(test, {})
}
</script>

<template>
  <div>
    <el-button @click="handleClick" type="primary">showDialog</el-button>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
