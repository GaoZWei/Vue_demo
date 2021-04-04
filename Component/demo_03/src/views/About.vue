<template>
  <div class="about">
    <h1 @click="handleClick">This is an about page</h1>
    <h1>
      {{ myName }}
    </h1>
  </div>

</template>
<script>
//以前的写法
export default {
  computed: {
    myName() {
      return this.$store.state.name;
    }
  },
  methods: {
    handleClick() {
      //想改变数据,vuex要求第一步,必须派发一个action
      this.$store.dispatch("change",'helloworld');
    }
  }
};
</script>
