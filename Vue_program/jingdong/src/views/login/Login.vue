<template>
  <div class="wrapper">
    <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png" />
    <div class="wrapper__input">
      <input class="wrapper__input__content" v-model="userName" placeholder="请输入用户名" />
    </div>
    <div class="wrapper__input">
      <input class="wrapper__input__content" v-model="password" type="password" placeholder="请输入密码" autocomplete="new-password" />
    </div>
    <div class="wrapper__login-btn" @click="handleLogin">登录</div>
    <div class="wrapper__login-link" @click="handleRegisterClick">立即注册</div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { post } from "../../utils/request.js";
import Toast, { useToastEffect } from "../../components/Toast";

//处理登录相关逻辑
const useLoginEffect = showToast => {
  const router = useRouter(); //获取路由实例
  const data = reactive({
    userName: "",
    password: ""
  });
  const handleLogin = async () => {
    try {
      const { userName, password } = data;
      if (userName == "" || password === "") {
        showToast("请输入账号密码");
        return;
      }
      const result = await post("/api/user/login", {
        userName: data.userName,
        password: data.password
      });
      if (result.errno === 0) {
        localStorage.isLogin = true;
        router.push({ name: "Home" });
      } else {
        showToast("登录失败");
      }
    } catch (e) {
      showToast("请求失败");
    }
  };
  const { userName, password } = toRefs(data);
  return {
    userName,
    password,
    handleLogin
  };
};
//处理注册跳转
const useRegisterEffect = () => {
  const router = useRouter(); //获取路由实例
  const handleRegisterClick = () => {
    router.push({ name: "Register" });
  };
  return { handleRegisterClick };
};
export default {
  name: "Login",
  components: {
    Toast
  },
  //职责就是告诉你,代码执行的一个流程
  setup() {
    const router = useRouter(); //获取路由实例
    const { show, toastMessage, showToast } = useToastEffect();
    const { userName, password, handleLogin } = useLoginEffect(showToast);
    const { handleRegisterClick } = useRegisterEffect();
    return {
      userName,
      password,
      show,
      toastMessage,
      handleLogin,
      handleRegisterClick
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../style/viriables.scss";
.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    margin: 0 auto 0.4rem auto;
    width: 0.66rem;
    height: 0.66rem;
  }
  &__input {
    // box-sizing: border-box;
    height: 0.48rem;
    margin: 0 0.4rem 0.16rem 0.4rem;
    padding: 0 0.16rem;
    background: #f9f9f9;
    border: 0.01rem solid rgba(0, 0, 0, 0.1);
    border-radius: 0.06rem;
    &__content {
      margin-top: 0.12rem;
      line-height: 0.22rem;
      border: none;
      outline: none;
      width: 100%;
      background: none;
      font-size: 0.16rem;
      color: $content-notice-fontColor;
      &::placeholder {
        color: $content-notice-fontColor;
      }
    }
  }
  &__login-btn {
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    line-height: 0.48rem;
    background: #0091ef;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    font-size: 0.16rem;
    color: white;
    text-align: center;
  }
  &__login-link {
    font-size: 0.14rem;
    color: $content-notice-fontColor;
    text-align: center;
  }
}
</style>

