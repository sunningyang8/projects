<template>

    <van-tabs v-model:active="active" animated>
      <van-tab title="账号密码登录"><Register /> </van-tab>
      <van-tab title="手机号密码登录"><Mobile /></van-tab>
    </van-tabs>
    <div style="margin: 16px">
      <van-button round block type="primary" @click="Login">
        注册
      </van-button>
    </div>

</template>

<script>

import { ref } from "vue";
import Register from "@/views/my/Register";
import Mobile from "@/views/my/Mobile";
import { useRouter } from "vue-router";

export default {
  name: "Denglu",
  components: {
    Mobile,
    Register,

  },
  setup() {
    const active = ref(0);
    const router=useRouter()
    const Login=()=>{
      router.push("/login")
    }
    return {
      active,Login
    };
  },
};
</script>

<style scoped></style>
