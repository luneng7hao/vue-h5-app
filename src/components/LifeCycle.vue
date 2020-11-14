<template>
  <div class="hello" style="margin-top:20px">
    <h3>Vue3.0生命周期的变化，以及编写方式</h3>
    <p>
      setup():开始创建组件之前，在beforeCreate和created之前执行。创建的是data和method<br />
      onBeforeMount() : 组件挂载到节点上之前执行的函数。<br />
      onMounted() :组件挂载完成后执行的函数。<br />
      onBeforeUpdate(): 组件更新之前执行的函数。<br />
      onUpdated(): 组件更新完成之后执行的函数。 <br />
      onBeforeUnmount():组件卸载之前执行的函数。 <br />
      onUnmounted(): 组件卸载完成后执行的函数<br />
      onActivated():keepalive的组件，会多出两个生命周期钩子函数。被激活时执行。<br />
      onDeactivated(): keepalive的组件,比如从 A 组件，切换到 B 组件，A
      组件消失时执行。<br />
      onErrorCaptured():当捕获一个来自子孙组件的异常时激活钩子函数。<br />
      <br />
      Vue2--------------vue3 <br />beforeCreate -> setup()<br />
      created -> setup()<br />
      beforeMount -> onBeforeMount<br />
      mounted -> onMounted<br />
      beforeUpdate -> onBeforeUpdate<br />
      updated -> onUpdated<br />
      beforeDestroy -> onBeforeUnmount<br />
      destroyed -> onUnmounted<br />
      activated -> onActivated<br />
      deactivated -> onDeactivated<br />
      errorCaptured -> onErrorCaptured<br />
    </p>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
  watch,
  computed,
  watchEffect,
  readonly,
  ref
} from 'vue'
import { useRouter, useRoute } from 'vue-router'
export default defineComponent({
  name: '',
  props: {
    testNumber: {
      type: Number,
      default: 10
    }
  },
  setup(props) {
    const text = 1
    const state = reactive({
      count: 0,
      userInfo: {
        name: '张三',
        id: '001',
        age: '13'
      }
    })
    const addClick = () => {
      state.count++
    }
    //一、
    //可以把 普通 object 对象、reactive 对象、ref 对象 返回一个只读对象。
    //返回的 readonly 对象，一旦修改就会在 console 有 warning 警告。
    //程序还是会照常运行，不会报错。
    const copy = readonly(state)

    //二、
    //获取当前的路由，以及路由跳转的方法
    const route = useRoute()
    console.log(route.path)
    const router = useRouter()
    // router.push('/about')
    console.log(router)

    //三、
    //使用props中的参数
    console.log(props.testNumber)
    //四、
    //computed 的使用
    const text2 = computed(() => {
      return state.count * 2
    })
    // 使从computed获得的值，变为可修改状态
    const text3 = computed({
      get() {
        return state.count
      },
      set(value: number) {
        console.log('value:', value)
        state.count = value
      }
    })
    text3.value = 10
    //五、
    //watch监听一个参数
    watch(state, (newValue, oldValue) => {
      console.log(`new--->${newValue}`)
      console.log(`old--->${oldValue}`)
    })
    //变量text不可被watch监听，因为text是个定值，不可改变
    //watch监听两个参数
    watch([state, text2], (newValue, oldValue) => {
      console.log(`new--->${newValue}`)
      console.log(`old--->${oldValue}`)
    })
    //六、
    //如果有响应性的变量有变化，就会触发这个函数
    watchEffect(() => {
      console.log('watchEffect ', state.count)
    })

    //七、
    //其他声明周期函数
    console.log('beforeCreated,created...已经弃用')
    onBeforeMount(() => {
      console.log('onBeforeMount ===> 相当于 vue2.x 中 beforeMount')
    })
    onMounted(() => {
      console.log('onMounted ===> 相当于 vue2.x 中 mounted')
    })
    onBeforeUpdate(() => {
      console.log('onBeforeUpdate ===> 相当于 vue2.x 中 beforeUpdate')
    })
    onUpdated(() => {
      console.log('onUpdated ===> 相当于 vue2.x 中 updated')
    })
    onBeforeUnmount(() => {
      console.log('onBeforeUnmount ===> 相当于 vue2.x 中 beforeDestroy')
    })
    onUnmounted(() => {
      console.log('onUnmounted ===> 相当于 vue2.x 中 destroyed')
    })
    onErrorCaptured(() => {
      console.log('onErrorCaptured ===> 相当于 vue2.x 中 errorCaptured')
    })

    return {
      state,
      addClick,
      text,
      text2,
      text3
    }
  }
})
</script>

<style scoped lang="scss">
h3 {
  text-decoration-line: underline;
}
p {
  margin-left: 50px;
  text-align: left;
}
.blue {
  color: blue;
  opacity: 0.6;
}
.red {
  color: red;
  opacity: 0.6;
}
</style>
