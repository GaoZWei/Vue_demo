<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1 @click="handleClick">This is an home page</h1>
    <h1>
      {{ name }}
    </h1>
  </div>
</template>

<script>
//composition Api写法
import { toRefs } from "vue";
import { useStore } from "vuex";
export default {
  name: "Home",
  setup() {
    const store = useStore();
    // const name=store.state.name
    const { name } = toRefs(store.state);
    const handleClick = () => {
      // store.commit("changeName", "hello");//同步可以直接commit
      store.dispatch("getData");
    };
    return { name, handleClick };
  }
};
</script>
