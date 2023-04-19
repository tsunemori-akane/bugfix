<template>
    <el-button type="primary">0</el-button>
    <component is ="el-switch"></component>
    <test1 :col="col"></test1>
</template>

<script setup lang="ts">
import { ref } from "vue";
import test1 from "./test1.vue"
import { ElInput, ElSwitch} from 'element-plus'
const col = ref([
    {
        type: ElSwitch,
        name: "1"
    },
    {
        type: "el-select",
        name: "2"
    },
    {
        type:  ElInput,
        name: "3"
    }
])
</script>