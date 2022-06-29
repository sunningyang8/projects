<template>
  <!--登录-->
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="mobile"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[
          { required: true, pattern: mobilePattern, message: '手机号格式错误' },
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
import { mobileLogin } from "@/api/my";
import { Notify } from "vant";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "Mobile",
  setup() {
    let mobile = ref("17104522521");
    const password = ref(123456);
    const mobilePattern =
      /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/; //手机号正则
    const passwordPattern = /^[a-zA-Z0-9]{3,20}$/; //密码正则
    const router = useRouter();
    // 获取store对象
    const store = useStore();

    const onSubmit = () => {
      mobileLogin(mobile.value, password.value).then((res) => {
        let { status } = res;
        // console.log(res.data.token);
        if (status === 200) {
          router.push("/my");
          Notify({ type: "success", message: "登录成功" })

          store.commit("user/setUser", {
            // 用户id
            id: "",
            username:"",
            // 用户手机号
            mobile: mobile.value,
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
      mobile,
      password,
      onSubmit,
      mobilePattern,
      passwordPattern,
    };
  },
};
</script>

<style scoped></style>
