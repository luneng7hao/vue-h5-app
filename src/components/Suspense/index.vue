<template>
  <div>
    <Suspense>
      <template #default>
        <AsyncView />
      </template>
      <template #fallback>
        <h1>Loading...</h1>
      </template>
    </Suspense>
  </div>
</template>
<script lang="ts">
import AsyncView from './AsyncView.vue'
const app = {
  name: 'Suspense',
  components: { AsyncView },
  setup() {
    return {}
  }
}
export default app
</script>
