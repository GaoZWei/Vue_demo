<template>
  <div class="nearby">
    <h3 class="nearby_title">附近店铺</h3>
    <ShopInfo v-for="item in nearbyList" :key="item._id" :item="item" />
  </div>
</template>

<script>
import { ref } from "vue";
import { get } from "../../utils/request.js";
import ShopInfo from "../../components/ShopInfo";
const useNearByListEffect = () => {
  const nearbyList = ref([]);
  const getNearByList = async () => {
    const result = await get("/api/shop/hot-list");
    if (result.errno === 0 && result.data.length) {
      nearbyList.value = result.data;
    }
  };
  return { nearbyList, getNearByList };
};
export default {
  name: "Nearby",
  components: {
    ShopInfo
  },
  setup() {
    const { nearbyList, getNearByList } = useNearByListEffect();
    getNearByList();
    return { nearbyList };
  }
};
</script>
<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.nearby {
  &__title {
    margin: 0.16rem 0 0.02rem 0;
    font-size: 0.18rem;
    font-weight: normal;
    color: $content-fontcolor;
  }
  &__item {
    display: flex;
    padding-top: 0.12rem;
    &__img {
      margin-right: 0.16rem;
      width: 0.56rem;
      height: 0.56rem;
    }
  }
  &__content {
    flex: 1;
    padding-bottom: 0.12rem;
    border-bottom: 0.01rem solid $content-bgColor;
    &__title {
      line-height: 0.22rem;
      font-size: 0.16rem;
      color: $content-fontcolor;
    }
    &__tags {
      margin-top: 0.08rem;
      line-height: 0.18rem;
      font-size: 0.13rem;
      color: $content-fontcolor;
    }
    &__tag {
      margin-right: 0.16rem;
    }
    &__highlight {
      margin: 0.08rem 0 0 0;
      line-height: 0.18rem;
      font-size: 0.13rem;
      color: #e93b3b;
    }
  }
}
</style>
