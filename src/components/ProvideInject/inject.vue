<template>
  <van-button @click="change()">子组件修改</van-button>
</template>
<script lang="ts">
import { defineComponent, inject, ref } from 'vue'
const app = {
  name: 'Inject',
  setup() {
    const changeName = inject<Function>('reload')
    const change = () => {
      //子组件中修改名称
      changeName && changeName('zhangsan')
    }
    return { change }
  },
}
export default app
</script>
