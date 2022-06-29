import store from "@/store";

export default function authGuard(to, from, next) {
  const requiredLogin = ["purchase", "my"];
  // console.log(requiredLogin.includes(to.path.split("/")[1]));
  if (requiredLogin.includes(to.path.split("/")[1])) {
    // 说明用户访问的页面是需要登录的
    // 判断用户是否登录
    // console.log(111, "includes");
    if (store.state.user.profile.token) {
      // 说明用户登录了
      // console.log(111, "111");
      next();
    } else {
      // console.log(222, "111");
      next({ path: "/register", query: { redirectUrl: to.fullPath } });
    }
  } else {
    // 说明用户访问的页面是不需要登录的
    next();
  }
}
