import {
  computed
} from 'vue'
import {
  useStore
} from "vuex";
//购物车通用相关逻辑
export const useCommonCartEffect = (shopId) => {
  const store = useStore();
  const cartList = store.state.cartList
  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit("changeCartItemInfo", {
      shopId,
      productId,
      productInfo,
      num
    });
  };
  //要展示的list
  const productList = computed(() => {
    const productList = cartList[shopId].productList || [];
    return productList;
  });
  return {
    cartList,
    productList,
    changeCartItemInfo
  };
};
