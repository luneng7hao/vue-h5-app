<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <LifeCycle />
  </div>
</template>

<script lang="ts">
// import HelloWorld from '@/components/HelloWorld.vue'
import LifeCycle from '@/components/LifeCycle.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    LifeCycle
  }
})
</script>
