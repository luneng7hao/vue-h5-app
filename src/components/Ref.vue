<template>
  <div class="hello" style="margin-top:20px">
    <h3>Vue3.0响应式数据：ref和reactive</h3>
    <p>ref</p>
    <div>{{ refNumber }}</div>
    <van-button @click="addRefNumber">增加ref数字</van-button>
    <div v-for="(item, index) in refArr" :key="index">
      {{ item.id + ': ' + item.name }}
    </div>
    <van-button @click="addRefArr">增加ref数组</van-button>
    <div>{{ refObj.id + refObj.name }}</div>
    <van-button @click="upRefObj">修改ref对象</van-button>
    <p>reactive</p>
    <div>{{ reactiveNumber }}</div>
    <van-button @click="addReactiveNumber">增加reactive数字</van-button>
    <div v-for="(item, index) in reactiveArr" :key="index">
      {{ item.id + item.name }}
    </div>
    <van-button @click="addReactiveArr">增加reactive数组</van-button>
    <div>{{ reactiveObj.id + reactiveObj.name }}</div>
    <van-button @click="upReactiveObj">修改reactive对象</van-button>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  toRefs,
  onRenderTracked,
  onRenderTriggered
} from 'vue'
export default defineComponent({
  name: '',
  setup() {
    //ref 数字
    const refNumber = ref(0)
    const addRefNumber = () => {
      refNumber.value++
    }
    //ref 数组
    const refArr = ref([{ id: 1, name: 'ref数组' }])
    //数组的修改，不可对类型或其他结构性改造（下面为反例）
    // const upRefArr = () => {
    //   refArr.value = [
    //     { id: '1', name: 'ref数组' },
    //     { id: 2, name: 'ref数组2', age: 10 }
    //   ]
    // }
    const addRefArr = () => {
      refArr.value = [
        { id: 1, name: 'ref数组' },
        { id: 2, name: 'ref数组2' }
      ]
    }
    //ref 对象
    const refObj = ref({ id: '1', name: 'ref数组' })
    //对象的修改，不可增加属性，不可改变属性值的类型（下面为反例）
    // const addRefObj = () => {
    //   refObj.value = { id: 1, name: 'ref数组', age: 17 }
    // }
    const upRefObj = () => {
      refObj.value = { id: 'test', name: '测试' }
    }

    //reactive 数字
    const reactive1 = reactive({
      reactiveNumber: 0
    })
    const addReactiveNumber = () => {
      reactive1.reactiveNumber++
    }
    //reactive 数组
    const reactive2 = reactive({
      reactiveArr: [{ id: 1, name: 'reactive数组' }]
    })
    //数组的修改，不可对类型或其他结构性改造（下面为反例）
    // const upReactiveArr = () => {
    //   reactive2.reactiveArr = [
    //     { id: '1', name: 'reactive数组' },
    //     { id: 2, name: 'reactive数组2', age: 10 }
    //   ]
    // }
    const addReactiveArr = () => {
      reactive2.reactiveArr = [
        { id: 1, name: 'reactive数组' },
        { id: 2, name: 'reactive数组2' }
      ]
    }
    //ref 对象
    const reactive3 = reactive({
      reactiveObj: { id: '1', name: 'ref数组' }
    })
    ref({ id: '1', name: 'ref数组' })
    //对象的修改，不可增加属性，不可改变属性值的类型（下面为反例）
    // const addRefObjKey = () => {
    //   refObj.value = { id: 1, name: 'ref数组', age: 17 }
    // }
    const upReactiveObj = () => {
      console.log()
      reactive3.reactiveObj = { id: 'test', name: '测试' }
      console.log(reactive3.reactiveObj)
    }
    //三、
    //onRenderTracked()和 onRenderTriggered()钩子函数的使用
    //onRenderTracked(),它会跟踪页面上所有响应式变量和方法的状态，也就是只要return返回去的值，他都会跟踪。只要页面有update的情况，他就会跟踪，然后生成一个event对象，我们通过event对象来查找程序的问题所在。
    //onRenderTriggered() 如果把onRenderTracked比喻成散弹枪，每个值都进行跟踪，那onRenderTriggered就是狙击枪，只精确跟踪发生变化的值，进行针对性调试。
    onRenderTracked(event => {
      // console.log('状态跟踪组件----------->')
      // console.log(event)
    })
    onRenderTriggered(event => {
      // console.log('状态触发组件--------------->')
      // console.log(event)
    })
    return {
      refNumber,
      addRefNumber,
      refArr,
      addRefArr,
      refObj,
      upRefObj,
      ...toRefs(reactive1),
      addReactiveNumber,
      ...toRefs(reactive2),
      addReactiveArr,
      ...toRefs(reactive3),
      upReactiveObj
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
