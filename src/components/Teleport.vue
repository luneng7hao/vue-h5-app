<template>
  <div>
    <h2>向下滑动页面</h2>
  </div>
  <teleport to="#modal">
    <div id="dialog" class="dialog">
      <h2>AsionDialog</h2>
    </div>
  </teleport>
</template>
<style scoped lang="scss">
.dialog {
  width: 200px;
  height: 200px;
  z-index: 1000;
  background: rgba(0, 0, 100, 0.5);
  h2 {
    color: red;
  }
}
</style>
