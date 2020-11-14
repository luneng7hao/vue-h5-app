<template>
  <div class="hello" style="margin-top:20px">
    我是子组件计数器：
    <button @click="addClick">{{ state.count }}</button>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'Store',
  setup() {
    const state = reactive({
      count: 0
    })

    const addClick = () => {
      state.count++
    }

    const store = useStore()
    console.log('store', store.state.user)
    return {
      state,
      addClick
    }
  }
})
</script>

<style scoped lang="scss"></style>
