import Message from "@/components/library/Message";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default function useLoginAfter() {
  // 获取路由对象
  const router = useRouter();
  // 获取路由信息对象
  const route = useRoute();
  // 获取store对象
  const store = useStore();
  // 登录成功之后要做的事情
  const loginSuccess = (data) => {
    // 1.存储用户信息
    store.commit("user/setUser", {
      // 用户id
      id: data.result.id,
      // 用户头像
      avatar: data.result.avatar,
      // 用户昵称
      nickname: data.result.nickname,
      // 用户账号
      account: data.result.account,
      // 用户手机号
      mobile: data.result.mobile,
      // 用户登录凭证
      token: data.result.token,
    });
    // 2.跳转到首页
    // 后续: 判断路由查询参数 redirectUrl 是否存在, 如果存在跳转到目标地址, 如果不存在跳转到首页
    // 获取 redirectUrl
    const redirectUrl = route.query.redirectUrl;
    // 挑战到目标地址获取首页
    router.push(redirectUrl || "/").catch(() => {});
    // 3. 登录成功的提示
    Message({ type: "success", text: "登录成功" });
    // 4. 合并购物车
    store
      .dispatch("cart/mergeCart")
      .then(() => {
        // 5. 获取服务器端购物车列表
        return store.dispatch("cart/updateGoodsBySkuId");
      })
      .catch((error) => console.log(error));
  };
  // 登录失败之后要做的事情
  const loginFail = () => {
    Message({ type: "error", text: "登录失败" });
  };
  return { loginSuccess, loginFail };
}
