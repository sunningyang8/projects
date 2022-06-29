<template>
  <!--登录-->
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[
          {
            required: true,
            pattern: usernamePattern,
            message: '用户名长度为三到六位字母和数字',
          },
        ]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[
          {
            required: true,
            pattern: passwordPattern,
            message: '密码长度为三到二十',
          },
        ]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
  </van-form>
</template>

<script>
import { ref } from "vue";
import { accountLogin } from "@/api/my";
import { Notify } from "vant";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "Register",
  setup() {
    const username = ref("admin");
    const password = ref(123456);
    const usernamePattern = /^[a-zA-Z0-9]{3,6}$/; //用户名正则
    const passwordPattern = /^[a-zA-Z0-9]{3,20}$/; //密码正则
    const router=useRouter()
    // 获取store对象
    const store = useStore();
    const onSubmit = () => {
      accountLogin(username.value, password.value).then((res) => {
        let { status } = res;
        // console.log(res);
        if (status === 200) {
          Notify({ type: "success", message: "登录成功" });
          router.push("/my")
          store.commit("user/setUser", {
            // 用户id
            id: "",
            // 用户手机号
            username:username.value,
            // 用户手机号
            mobile:"",
            // 用户账号
            password: password.value,
            // 用户登录凭证
            token: res.data.token,
          });
          sessionStorage.setItem("token",res.data.token)
        } else {
          Notify({ type: "danger", message: "登录失败" });
        }
      });
      // console.log(accountLogin(username.value,password.value))
    };

    return {
      username,
      password,
      onSubmit,
      usernamePattern,
      passwordPattern,
    };
  },
};
</script>

<style scoped></style>
