<template>
  <div class="about">
    <h1>This is an about page</h1>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <Ref />
  </div>
</template>
<script lang="ts">
// import HelloWorld from '@/components/HelloWorld.vue'
import Ref from '@/components/Ref.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'About',
  components: {
    Ref
  }
})
</script>
