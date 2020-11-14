<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>|
    <router-link to="/store">Store</router-link>
    |<router-link to="/teleport">Teleport</router-link> |
    <router-link to="/suspense">Suspense</router-link>|
    <router-link to="/provideInject">ProvideInject</router-link>
  </div>
  <router-view v-slot="{ Component }">
    <!-- 缓存页面 -->
    <keep-alive :include="['Store', 'About', 'Suspense']">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
