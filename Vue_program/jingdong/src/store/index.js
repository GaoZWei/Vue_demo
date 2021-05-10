import {
  createStore
} from 'vuex'

const setLocalCartList = (state) => {
  const {
    cartList
  } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}
const getLocalCartList = () => {
  return JSON.parse(localStorage.cartList) || {}
}
export default createStore({
  state: {
    cartList: getLocalCartList()
    // {
    //第一层级是商户的ID
    // shopId: {
    //   //第二层是商品id
    //   //第二层内容是商品内容以及购物数量
    // shopName: '沃尔玛'
    // productList: {
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
    // }
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
        shopInfo = {
          shopName: '',
          productList: {}
        }
      }
      let product = shopInfo.productList[productId]
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
      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    changeShopName(state, payload) {
      const {
        shopId,
        shopName
      } = payload
      const shopInfo = state.cartList[shopId] || {
        shopName: '',
        productList: {}
      }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    //修改购物车选中状态
    changeCartItemChecked(state, payload) {
      const {
        shopId,
        productId
      } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
      setLocalCartList(state)
    },
    //清空购物车
    cleanCartProducts(state, payload) {
      const {
        shopId,
      } = payload
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
    },
    //全选
    setCartItemsChecked(state, payload) {
      const {
        shopId,
      } = payload
      const products = state.cartList[shopId].productList
      if (products) {
        for (let key in products) {
          const product = products[key]
          product.check = true;
        }
      }
      setLocalCartList(state)
    }
  },
  actions: {},
  modules: {}
})
