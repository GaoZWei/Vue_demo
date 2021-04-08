import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import Home from "../views/home/Home.vue";
import Login from "../views/login/Login.vue";
import Register from '../views/register/Register.vue'

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
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
    component: Register,
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
