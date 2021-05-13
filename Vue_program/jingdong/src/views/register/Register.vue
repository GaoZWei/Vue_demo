<template>
  <div class="wrapper">
    <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png" />
    <div class="wrapper__input">
      <input class="wrapper__input__content" placeholder="请输入用户名" v-model="userName" />
    </div>
    <div class="wrapper__input">
      <input class="wrapper__input__content" type="password" placeholder="请输入密码" autocomplete="new-password" v-model="password" />
    </div>
    <div class="wrapper__input">
      <input class="wrapper__input__content" type="password" placeholder="确认密码" v-model="ensurement" />
    </div>
    <div class="wrapper__register-btn" @click="handleRegister">注册</div>
    <div class="wrapper__register-link" @click="handleLoginClick">已有账号去登录</div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>
<script>
import { useRouter } from "vue-router";
import { reactive, toRefs } from "vue";
import { post } from "../../utils/request.js";
import Toast, { useToastEffect } from "../../components/Toast";
//注册相关逻辑
const useRegisterEffect = showToast => {
  const router = useRouter(); //获取路由实例
  const data = reactive({
    userName: "",
    password: "",
    ensurement: ""
  });
  const handleRegister = async () => {
    try {
      const { userName, password, ensurement } = data;
      if (userName == "" || password === "" || ensurement === "") {
        showToast("请输入账号密码和校验密码");
        return;
      }
      const result = await post("/api/user/register", {
        userName: data.userName,
        password: data.password
      });
      if (result.errno === 0) {
        router.push({ name: "Login" });
      } else {
        showToast("注册失败");
      }
    } catch (e) {
      showToast("请求失败");
    }
  };
  const { userName, password, ensurement } = toRefs(data);
  return {
    userName,
    password,
    ensurement,
    handleRegister
  };
};
//处理登录跳转
const useLoginEffect = () => {
  const router = useRouter(); //获取路由实例
  const handleLoginClick = () => {
    router.push({ name: "Login" });
  };
  return { handleLoginClick };
};
export default {
  name: "Register",
  components: {
    Toast
  },
  setup() {
    const router = useRouter(); //获取路由实例
    const { show, toastMessage, showToast } = useToastEffect();
    const {
      userName,
      password,
      ensurement,
      handleRegister
    } = useRegisterEffect(showToast);
    const { handleLoginClick } = useLoginEffect();
    return {
      userName,
      password,
      ensurement,
      show,
      toastMessage,
      handleRegister,
      handleLoginClick
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
    border: .01rem solid rgba(0, 0, 0, 0.1);
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
  &__register-btn {
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    line-height: 0.48rem;
    background: #0091ef;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    font-size: 0.16rem;
    color: white;
    text-align: center;
  }
  &__register-link {
    font-size: 0.14rem;
    color: $content-notice-fontColor;
    text-align: center;
  }
}
</style>

