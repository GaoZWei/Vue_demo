import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    cartList: {
      //第一层级是商户的ID
      // shopId: {
      //   //第二层是商品id
      //   //第二层内容是商品内容以及购物数量
      //   productId: {
      //     imgUrl: "http://www.dell-lee.com/imgs/vue3/tomato.png",
      //     name: "番茄 250g / 份",
      //     oldPrice: 39.6,
      //     price: 33.6,
      //     sales: 10,
      //     _id: "1",
      //     count: 1
      //   }
      // },
      // 2: {

      // }
    }
  },
  mutations: {
    //实现购物车数量的变化
    changeCartItemInfo(state, payload) {
      const {
        shopId,
        productId,
        productInfo
      } = payload;
      let shopInfo = state.cartList[shopId]
      if (!shopInfo) {
        shopInfo = {}
      }
      let product = shopInfo[productId]
      if (!product) {
        product = productInfo
        product.count = 0
        product.check = 0
      }
      product.count = product.count + payload.num
      if (payload.num > 0) {
        product.check = true
      }
      if (product.count < 0) {
        product.count = 0
      }
      //重新赋值
      shopInfo[productId] = product
      state.cartList[shopId] = shopInfo
    },
    //修改购物车选中状态
    changeCartItemChecked(state, payload) {
      const {
        shopId,
        productId
      } = payload
      const product = state.cartList[shopId][productId]
      product.check = !product.check
    },
    //清空购物车
    cleanCartProducts(state, payload) {
      const {
        shopId,
      } = payload
      state.cartList[shopId] = {}
    },
    //全选
    setCartItemsChecked(state, payload) {
      const {
        shopId,
      } = payload
      const products = state.cartList[shopId]
      if (products) {
        for (let key in products) {
          const product = products[key]
          product.check = true;
        }
      }
    }
  },
  actions: {},
  modules: {}
})
