<template>
  <form class="xtx-form" @submit="onSubmit">
    <div class="user-info">
      <img :src="avatar" alt="" />
      <p>Hi，{{ nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <input
          v-model="mobileField"
          class="input"
          type="text"
          placeholder="绑定的手机号"
        />
      </div>
      <div class="error" v-if="mobileError">{{ mobileError }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <input
          v-model="codeField"
          class="input"
          type="text"
          placeholder="短信验证码"
        />
        <span @click="getMsgCode" :class="{ disabled: isActive }" class="code">
          {{ isActive ? `剩余${count}秒` : "发送验证码" }}
        </span>
      </div>
      <div class="error" v-if="codeError">{{ codeError }}</div>
    </div>
    <input type="submit" class="submit" value="立即绑定" />
  </form>
</template>

<script>
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
import { mobile, code } from "@/utils/vee-valiationSchema";
import { bindMobileAndQQ, getMsgCodeWhenBindQQ } from "@/api/user";
import Message from "@/components/library/Message";
import useCountDown from "@/hooks/useCountDown";
import useLoginAfter from "@/hooks/useLoginAfter";

export default {
  name: "LoginCallbackBindPhone",
  props: {
    unionId: {
      type: String,
    },
  },
  setup(props) {
    // 获取QQ用户昵称和头像
    const { nickname, avatar } = useQQUserInfo();
    // 获取成功和登录失败之后的回调函数
    const { loginSuccess, loginFail } = useLoginAfter();
    const { handleSubmit, getIsMobileValid, ...rest } = useBindPhoneValidate();
    // 获取倒计时
    const { count, isActive, start } = useCountDown();
    const onSubmit = handleSubmit((values) => {
      console.log(values);
      // 绑定手机号和QQ号
      bindMobileAndQQ({
        mobile: values.mobile,
        code: values.code,
        unionId: props.unionId,
      })
        .then(loginSuccess)
        .catch(loginFail);
    });
    // 获取手机验证码
    const getMsgCode = async () => {
      // 1. 看看用户有没有输入手机号
      let { isValid, mobile } = await getIsMobileValid();
      // 用户输入了手机号 验证通过
      if (isValid && !isActive.value) {
        try {
          // 2. 发送请求获取验证码
          await getMsgCodeWhenBindQQ(mobile);
          Message({ type: "success", text: "验证码发送成功" });
          start(60);
        } catch (error) {
          Message({ type: "error", text: "验证码发送失败" });
        }
      }
      // 3. 倒计时
    };
    return { nickname, avatar, ...rest, onSubmit, getMsgCode, count, isActive };
  },
};

function useBindPhoneValidate() {
  const { handleSubmit } = useForm({
    validationSchema: { mobile, code },
  });
  const {
    value: mobileField,
    errorMessage: mobileError,
    validate: mobileValid,
  } = useField("mobile");

  // 单独验证用户是否输入手机号
  const getIsMobileValid = async () => {
    // 验证
    let { valid } = await mobileValid();
    return { isValid: valid, mobile: mobileField.value };
  };

  const { value: codeField, errorMessage: codeError } = useField("code");
  return {
    handleSubmit,
    mobileField,
    mobileError,
    codeField,
    codeError,
    getIsMobileValid,
  };
}

function useQQUserInfo() {
  // 用于存储用户昵称
  const nickname = ref("");
  // 用于存储用户头像
  const avatar = ref("");
  // 检测用户登录状态
  if (window.QC.Login.check()) {
    // 向腾讯服务器发送请求获取QQ用户信息
    window.QC.api("get_user_info").success((response) => {
      // 存储用户昵称
      nickname.value = response.data.nickname;
      // 存储用户头像
      avatar.value = response.data.figureurl_1;
    });
  }
  // 返回用户昵称和用户头像
  return { nickname, avatar };
}
</script>

<style scoped lang="less">
.user-info {
  width: 320px;
  height: 70px;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin: 0 auto 20px;
  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }
  p {
    padding-left: 10px;
  }
}
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;
  &:hover {
    cursor: pointer;
  }
}
</style>
