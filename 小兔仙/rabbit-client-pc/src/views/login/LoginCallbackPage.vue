<template>
  <LoginHeader>联合登录</LoginHeader>
  <section class="container" v-if="loading">
    <div class="unbind">
      <div class="loading"></div>
    </div>
  </section>
  <!-- 如果当前没有处于加载状态, 说明加载完成, 加载完成以后如果用户没有绑定手机号 -->
  <section class="container" v-if="!loading && !isBind">
    <nav class="tab">
      <a
        @click="hasAccount = true"
        :class="{ active: hasAccount }"
        href="javascript:"
      >
        <i class="iconfont icon-bind"></i>
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a
        @click="hasAccount = false"
        :class="{ active: !hasAccount }"
        href="javascript:"
      >
        <i class="iconfont icon-edit"></i>
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content" v-if="hasAccount">
      <LoginCallbackBindPhone :unionId="unionId" />
    </div>
    <div class="tab-content" v-else>
      <LoginCallbackBindPatch :unionId="unionId" />
    </div>
  </section>
  <LoginFooter />
</template>

<script>
import LoginHeader from "@/views/login/components/LoginHeader";
import LoginFooter from "@/views/login/components/LoginFooter";
import LoginCallbackBindPhone from "@/views/login/components/LoginCallbackBindPhone";
import LoginCallbackBindPatch from "@/views/login/components/LoginCallbackPatch";
import { ref } from "vue";
import { findAccountByOpenId } from "@/api/user";
import useLoginAfter from "@/hooks/useLoginAfter";
export default {
  name: "LoginCallbackPage",
  components: {
    LoginCallbackBindPatch,
    LoginCallbackBindPhone,
    LoginFooter,
    LoginHeader,
  },
  setup() {
    const hasAccount = ref(true);
    // 1. 先假设QQ用户没有绑定小兔仙账号
    const isBind = ref(false);
    // 2. loading 状态
    const loading = ref(false);
    const { loginSuccess } = useLoginAfter();
    // 用于存储 openid
    const unionId = ref("");
    // 获取QQ登录用户的 openid
    // 1. 检测用户的登录状态
    if (window.QC.Login.check()) {
      // 更新loading状态
      loading.value = true;
      // 获取 openid
      window.QC.Login.getMe((openid) => {
        // 存储 openid
        unionId.value = openid;
        // 向小兔仙应用的服务器发送请求 检测小兔仙账号
        findAccountByOpenId({ unionId: openid })
          // 如果检测到 直接跳转到首页 登录成功
          .then((data) => {
            // 更新加载状态
            loading.value = false;
            // 更新绑定状态
            isBind.value = true;
            loginSuccess(data);
          })
          .catch(() => {
            // 如果没有检测到账号走 catch 方法
            // 更新加载状态
            loading.value = false;
            // 更新绑定状态
            isBind.value = false;
          });
      });
    }
    // 2. 拿着 access_token 向QQ互联发送请求换取用户的openid
    return { hasAccount, isBind, loading, unionId };
  },
};
</script>

<style scoped lang="less">
.container {
  padding: 25px 0;
  position: relative;
  height: 730px;
  .unbind {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 25px 0;
    z-index: 99;
    .loading {
      height: 100%;
      background: #fff url(../../assets/images/load.gif) no-repeat center /
        100px 100px;
    }
  }
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>
