<template>
  <div class="docker">
    <div v-for="(item,index) in dockerList" :class="{'docker__item':true, 'docker__item--active':index===currentIndex}" class="docker__item" :key="item.icon">
      <router-link :to="item.to">
        <div class="iconfont" v-html="item.icon" />
        <div class="docker__title">{{item.text}}</div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "Docker",
  props: ["currentIndex"],
  setup() {
    const dockerList = [
      { icon: "&#xe665;", text: "首页", to: { name: "Home" } },
      { icon: "&#xe7e5;", text: "购物车", to: { name: "CartList" } },
      { icon: "&#xe60e;", text: "订单", to: { name: "OrderList" } },
      { icon: "&#xe640;", text: "我的", to: { name: "Home" } }
    ];
    return { dockerList };
  }
};
</script>

<style lang="scss" scoped>
@import "../style/viriables.scss";
.docker {
  display: flex;
  box-sizing: border-box;
  position: absolute;
  padding: 0 0.18rem;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  border-top: 0.01rem solid $content-bgColor;
  color: $content-fontcolor;
  &__item {
    //docker__item
    flex: 1;
    text-align: center;
    .iconfont {
      font-size: 0.18rem;
      margin: 0.07rem 0 0.02rem 0;
    }
    a {
      color: $content-fontcolor;
      text-decoration: none;
    }
    &--active {
      a {
        color: #1fa4fc;
      }
    }
  }
  &__title {
    font-size: 0.2rem; //浏览器默认最小字体12px
    transform: scale(0.5, 0.5); //缩放
    transform-origin: center top;
  }
}
</style>
