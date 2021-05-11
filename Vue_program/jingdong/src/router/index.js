import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
// import Home from "../views/home/Home.vue";
// import Shop from "../views/shop/Shop.vue";
// import Login from "../views/login/Login.vue";
// import Register from '../views/register/Register.vue'

const routes = [{
    path: '/',
    name: 'Home',
    component: () => import( /*webpackChunkName:"home" */ '../views/home/Home.vue')
  },
  {
    path: '/cartList',
    name: 'CartList',
    component: () => import( /*webpackChunkName:"cartList" */ '../views/cartList/CartList.vue')
  },
  {
    path: '/orderConfirmation/:id',
    name: 'OrderConfirmation',
    component: () => import( /*webpackChunkName:"orderConfirmation" */ '../views/orderConfirmation/OrderConfirmation.vue')
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import( /*webpackChunkName:"shop" */ '../views/shop/Shop.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( /*webpackChunkName:"login" */ '../views/login/Login.vue'),
    //只有访问Login之前
    beforeEnter(to, from, next) {
      const {
        isLogin
      } = localStorage
      isLogin ? next({
        name: "Home"
      }) : next()
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import( /*webpackChunkName:"regsiter" */ '../views/register/Register.vue'),
    beforeEnter(to, from, next) {
      const {
        isLogin
      } = localStorage
      isLogin ? next({
        name: "Home"
      }) : next()
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//任何路由切换时候调用
router.beforeEach((to, from, next) => {
  const {
    isLogin
  } = localStorage
  const {
    name
  } = to
  const isLoginOrRegister = (name === "Login" || name === "Register")
  if (isLogin || isLoginOrRegister) {
    next()
  } else {
    next({
      name: "Login"
    })
  }
  // (isLogin || to.name === "Login") ?
  // next() :
  // next({
  //   name: "Login"
  // })

})

export default router
