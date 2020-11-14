import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { vantPlugins } from './vant'

createApp(App)
  .use(vantPlugins)
  .use(store)
  .use(router)
  .mount('#app')
