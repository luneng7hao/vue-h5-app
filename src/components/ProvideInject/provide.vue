<template>
  <div>
    <van-field v-model="name" label="名字" />
    <inject></inject>
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, provide, ref } from 'vue'
import Inject from './inject.vue'
export default defineComponent({
  name: 'Provide',
  components: { Inject },
  setup() {
    const name = ref('李四')
    const changeName = (param1: string) => {
      name.value = param1
    }
    provide('reload', changeName)
    return {
      name,
    }
  },
})
</script>
