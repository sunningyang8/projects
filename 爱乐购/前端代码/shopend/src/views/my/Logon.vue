<template>
  <!--注册-->
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
      <van-field
        v-model="mobile"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[
          { required: true, pattern: mobilePattern, message: '手机号不正确' },
        ]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        注册
      </van-button>
    </div>
  </van-form>
</template>

<script>
import { ref } from "vue";
import { userLogn } from "@/api/my";
import { Notify,  } from "vant";
import { useRouter } from "vue-router";
export default {
  name: "Logon",
  setup() {
    let username = ref("admin");
    let password = ref(123456);
    let mobile = ref("17104522521");
    const usernamePattern = /^[a-zA-Z0-9]{3,6}$/; //用户名正则
    const passwordPattern = /^[a-zA-Z0-9]{3,20}$/; //密码正则
    const mobilePattern =
      /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/; //手机号正则
    const router=useRouter()
    const onSubmit = () => {
      userLogn(username.value, password.value, mobile.value).then((res) => {
        let { status } = res;
        if (status === 200) {
          router.push("/my")
          // console.log(router.push("/my"))
          Notify({ type: "success", message: "注册成功" });

        } else {
          Notify({ type: "danger", message: "注册失败" });
        }
      }); //注册接口
    };

    return {
      username,
      password,
      onSubmit,
      mobile,
      usernamePattern,
      passwordPattern,
      mobilePattern,
    };
  },
};
</script>

<style scoped></style>
