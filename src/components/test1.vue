<template>
    <div v-for="e in col">
      <component :is="e.type" v-model="e.name"></component>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
  col: Object
})
</script>