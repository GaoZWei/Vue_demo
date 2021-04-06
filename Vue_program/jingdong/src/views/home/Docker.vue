<template>
  <div class="docker">
    <div class="docker__item docker__item--active">
      <div class="iconfont">&#xe665;</div>
      <div class="docker__title">首页</div>
    </div>
    <div class="docker__item">
      <div class="iconfont">&#xe7e5;</div>
      <div class="docker__title">购物车</div>
    </div>
    <div class="docker__item">
      <div class="iconfont">&#xe60e;</div>
      <div class="docker__title">订单</div>
    </div>
    <div class="docker__item">
      <div class="iconfont">&#xe640;</div>
      <div class="docker__title">我的</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Docker"
};
</script>

<style lang="scss">
@import "../../style/viriables.scss";
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
    &--active {
      color: #1fa4fc;
    }
  }
  &__title {
    font-size: 0.2rem; //浏览器默认最小字体12px
    transform: scale(0.5, 0.5); //缩放
    transform-origin: center top;
  }
}
</style>
