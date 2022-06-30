<template>
  <div class="account-box">
    <div class="toggle">
      <button v-if="isMsgLogin" @click="isMsgLogin = false">
        <i class="iconfont icon-user"></i> 使用账号登录
      </button>
      <button v-if="!isMsgLogin" @click="isMsgLogin = true">
        <i class="iconfont icon-msg"></i> 使用短信登录
      </button>
    </div>
    <div class="form">
      <!-- 账户登录 -->
      <template v-if="!isMsgLogin">
        <form @submit="onAccountFormSubmit">
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-user"></i>
              <input
                v-model="accountField"
                type="text"
                placeholder="请输入用户名"
              />
            </div>
            <div class="error" v-if="accountError">
              <i class="iconfont icon-warning"></i> {{ accountError }}
            </div>
          </div>
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-lock"></i>
              <input
                v-model="passwordField"
                type="password"
                placeholder="请输入密码"
              />
            </div>
            <div class="error" v-if="passwordError">
              <i class="iconfont icon-warning"></i> {{ passwordError }}
            </div>
          </div>
          <div class="form-item">
            <div class="agree">
              <XtxCheckbox v-model="accountIsAgreeField" />
              <span>我已同意</span>
              <a href="javascript:">《隐私条款》</a>
              <span>和</span>
              <a href="javascript:">《服务条款》</a>
            </div>
            <div class="error" v-if="accountIsAgreeError">
              <i class="iconfont icon-warning"></i> {{ accountIsAgreeError }}
            </div>
          </div>
          <button type="submit" class="btn">登录</button>
        </form>
      </template>
      <!-- 短信登录 -->
      <template v-if="isMsgLogin">
        <form @submit="onMsgFormSubmit">
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-user"></i>
              <input
                v-model="mobileField"
                type="text"
                placeholder="请输入手机号"
              />
            </div>
            <div class="error" v-if="mobileError">
              <i class="iconfont icon-warning"></i> {{ mobileError }}
            </div>
          </div>
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-code"></i>
              <input
                v-model="codeField"
                type="password"
                placeholder="请输入验证码"
              />
              <span
                :class="{ disabled: isActive }"
                class="code"
                @click="getMsgCode"
              >
                {{ isActive ? `剩余${count}秒` : "发送验证码" }}
              </span>
            </div>
            <div class="error" v-if="codeError">
              <i class="iconfont icon-warning"></i> {{ codeError }}
            </div>
          </div>
          <div class="form-item">
            <div class="agree">
              <XtxCheckbox v-model="msgIsAgreeField" />
              <span>我已同意</span>
              <a href="javascript:">《隐私条款》</a>
              <span>和</span>
              <a href="javascript:">《服务条款》</a>
            </div>
            <div class="error" v-if="msgIsAgreeError">
              <i class="iconfont icon-warning"></i> {{ msgIsAgreeError }}
            </div>
          </div>
          <button type="submit" class="btn">登录</button>
        </form>
      </template>
    </div>
    <div class="action">
      <a
        href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback"
      >
        <img
          src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
          alt=""
        />
      </a>

      <div class="url">
        <a href="javascript:">忘记密码</a>
        <a href="javascript:">免费注册</a>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import {
  account,
  code,
  isAgree,
  mobile,
  password,
} from "@/utils/vee-valiationSchema";
import { useField, useForm } from "vee-validate";
import {
  getMsgCodeByMobileLogin,
  loginByAccount,
  loginByMobile,
} from "@/api/user";
import Message from "@/components/library/Message";
import useCountDown from "@/hooks/useCountDown";
import useLoginAfter from "@/hooks/useLoginAfter";

export default {
  name: "LoginForm",
  setup() {
    // 是否是短信登录
    const isMsgLogin = ref(false);
    // 获取账号登录表单的验证相关数据
    const { handleAccountFormSubmit, ...accountForm } =
      useAccountFormValidate();
    // 获取短信登录表单的验证相关数据
    const { msgFormHandleSubmit, mobileIsValidate, ...msgForm } =
      useMsgFormValidate();
    // 获取和倒计时相关的属性和方法
    const { count, start, isActive } = useCountDown();
    // 获取登录成功和登录失败之后要做的事情
    const { loginSuccess, loginFail } = useLoginAfter();
    // 处理账号表单登录
    const onAccountFormSubmit = handleAccountFormSubmit(
      ({ account, password }) => {
        // 当前回调函数会在表单验证通过以后执行
        // values 表示用户在表单中输入的内容
        loginByAccount({ account, password })
          .then(loginSuccess)
          .catch(loginFail);
      }
    );
    // 处理短信登录表单
    const onMsgFormSubmit = msgFormHandleSubmit(({ mobile, code }) => {
      // 当前回调函数会在表单验证通过以后执行
      // values 表示用户在表单中输入的内容
      loginByMobile({ mobile, code }).then(loginSuccess, loginFail);
    });
    // 获取手机验证码
    const getMsgCode = async () => {
      // 1. 检查用户是否输入手机号
      let { isValid, mobile } = await mobileIsValidate();
      // 判断用户是否输入了手机号
      if (isValid && !isActive.value) {
        // 2. 发送请求获取验证码
        try {
          // 向服务器端发送请求获取验证码
          await getMsgCodeByMobileLogin(mobile);
          // 用户提示
          Message({ type: "success", text: "验证码发送成功" });
          // 3. 实现倒计时
          start(60);
        } catch (error) {
          // 用户提示
          Message({ type: "error", text: "验证码发送失败" });
        }
      }
    };

    return {
      isMsgLogin,
      ...accountForm,
      onAccountFormSubmit,
      ...msgForm,
      onMsgFormSubmit,
      getMsgCode,
      count,
      isActive,
    };
  },
};
// 用于验证账号密码登录表单
function useAccountFormValidate() {
  // 创建账号登录表单验证表单
  const { handleSubmit: handleAccountFormSubmit } = useForm({
    // 指定表单中的验证规则
    validationSchema: {
      // 用户名的验证规则
      account,
      // 密码的验证规则
      password,
      // 是否同意协议的验证规则
      isAgree,
    },
  });
  // 对用户名进行验证
  const { value: accountField, errorMessage: accountError } =
    useField("account");
  // 对密码进行验证
  const { value: passwordField, errorMessage: passwordError } =
    useField("password");
  // 对协议进行验证
  const { value: accountIsAgreeField, errorMessage: accountIsAgreeError } =
    useField("isAgree");
  return {
    accountField,
    accountError,
    passwordField,
    passwordError,
    accountIsAgreeField,
    accountIsAgreeError,
    handleAccountFormSubmit,
  };
}
// 验证短信登录表单
// 1. 创建验证表单, 指定验证规则, 获取处理表单提交的方法
// 2. 创建具体的表单验证项
// 3. 将具体的表单验证项和模板进行绑定并绑定错误信息
function useMsgFormValidate() {
  const { handleSubmit: msgFormHandleSubmit } = useForm({
    validationSchema: {
      mobile,
      code,
      isAgree,
    },
  });
  const {
    value: mobileField,
    errorMessage: mobileError,
    validate: mobileValidate,
  } = useField("mobile");
  const { value: codeField, errorMessage: codeError } = useField("code");
  const { value: msgIsAgreeField, errorMessage: msgIsAgreeError } =
    useField("isAgree");

  // 单独验证用户是否输入了手机号
  const mobileIsValidate = async () => {
    let { valid } = await mobileValidate();
    return { isValid: valid, mobile: mobileField.value };
  };

  return {
    mobileField,
    mobileError,
    codeField,
    codeError,
    msgIsAgreeField,
    msgIsAgreeError,
    msgFormHandleSubmit,
    mobileIsValidate,
  };
}
</script>
<style lang="less" scoped>
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    button {
      color: @xtxColor;
      background: none;
      border: none;
      cursor: pointer;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
        .code.disabled {
          cursor: wait;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      border: none;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
