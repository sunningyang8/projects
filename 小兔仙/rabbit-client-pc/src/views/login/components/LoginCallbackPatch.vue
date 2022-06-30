<template>
  <form class="xtx-form" @submit="onSubmit">
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-user"></i>
        <input
          v-model="accountField"
          class="input"
          type="text"
          placeholder="请输入用户名"
        />
      </div>
      <div class="error" v-if="accountError">{{ accountError }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <input
          v-model="mobileField"
          class="input"
          type="text"
          placeholder="请输入手机号"
        />
      </div>
      <div class="error" v-if="mobileError">{{ mobileError }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <input
          class="input"
          v-model="codeField"
          type="text"
          placeholder="请输入验证码"
        />
        <span class="code" @click="getMsgCode">
          {{ isActive ? `剩余${count}秒` : "发送验证码" }}
        </span>
      </div>
      <div class="error" v-if="codeError">{{ codeError }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <input
          class="input"
          v-model="passwordField"
          type="password"
          placeholder="请输入密码"
        />
      </div>
      <div class="error" v-if="passwordError">{{ passwordError }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <input
          class="input"
          v-model="rePasswordField"
          type="password"
          placeholder="请确认密码"
        />
      </div>
      <div class="error" v-if="rePasswordError">{{ rePasswordError }}</div>
    </div>
    <input type="submit" class="submit" value="立即绑定" />
  </form>
</template>

<script>
import { useField, useForm } from "vee-validate";
import {
  checkUserAccount,
  code,
  mobile,
  password,
  rePassword,
} from "@/utils/vee-valiationSchema";
import { getMsgCodeByRegister, registerAndBindQQ } from "@/api/user";
import Message from "@/components/library/Message";
import useCountDown from "@/hooks/useCountDown";
import useLoginAfter from "@/hooks/useLoginAfter";

export default {
  name: "LoginCallbackBindPatch",
  props: {
    unionId: {
      type: String,
    },
  },
  setup(props) {
    const { handleSubmit, getMobileIsValidate, ...rest } = useRegisterPatch();
    const { count, isActive, start } = useCountDown();
    const { loginSuccess, loginFail } = useLoginAfter();
    // 表单提交
    const onSubmit = handleSubmit(
      ({ checkUserAccount, mobile, code, password }) => {
        // 向服务器端发送请求注册新账号并绑定新账号
        registerAndBindQQ({
          checkUserAccount,
          mobile,
          code,
          password,
          unionId: props.unionId,
        }).then(loginSuccess, loginFail);
      }
    );

    const getMsgCode = () => {
      // 如果正在倒计时, 阻止程序向下运行
      if (isActive.value) return;
      // 1. 验证用户是否输入手机号
      getMobileIsValidate()
        .then(({ isValid, mobile }) => {
          if (isValid) {
            // 向服务器端发送请求获取验证码
            return getMsgCodeByRegister(mobile);
          }
        })
        .then(() => {
          Message({ type: "success", text: "验证码发送成功" });
          start(60);
        })
        .catch(() => {
          Message({ type: "error", text: "验证码发送失败" });
        });
      // 2. 发送验证码
      // 3. 用户提示
    };
    return { ...rest, onSubmit, getMsgCode, count, isActive };
  },
};

function useRegisterPatch() {
  const { handleSubmit } = useForm({
    validationSchema: {
      checkUserAccount,
      mobile,
      code,
      rePassword,
      password,
    },
  });

  const { value: accountField, errorMessage: accountError } =
    useField("checkUserAccount");
  const {
    value: mobileField,
    errorMessage: mobileError,
    validate: mobileValidate,
  } = useField("mobile");
  const { value: codeField, errorMessage: codeError } = useField("code");
  const { value: passwordField, errorMessage: passwordError } =
    useField("password");
  const { value: rePasswordField, errorMessage: rePasswordError } =
    useField("rePassword");

  const getMobileIsValidate = async () => {
    let { valid } = await mobileValidate();
    return { isValid: valid, mobile: mobileField.value };
  };

  return {
    handleSubmit,
    accountField,
    accountError,
    mobileField,
    mobileError,
    codeField,
    codeError,
    passwordField,
    passwordError,
    rePasswordField,
    rePasswordError,
    getMobileIsValidate,
  };
}
</script>

<style scoped lang="less">
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
