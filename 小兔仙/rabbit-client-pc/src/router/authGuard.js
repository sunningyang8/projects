import store from "@/store";

export default function authGuard(to, from, next) {
  // 在设计路由的时候做了一项硬性规定, 路由地址凡是以 /checkout 或者 /member 开头, 这样的路由就需要登录
  const requiredLogin = ["checkout", "member"];
  if (requiredLogin.includes(to.path.split("/")[1])) {
    // 说明用户访问的页面是需要登录的
    // 判断用户是否登录
    if (store.state.user.profile.token) {
      // 说明用户登录了
      next();
    } else {
      // 说明用户访问的页面需要登录但是用户没有登录
      // query 指定路由的查询参数
      // to.path /checkout/order
      // to.fullPath /checkout/order?a=123
      next({ path: "/login", query: { redirectUrl: to.fullPath } });
    }
  } else {
    // 说明用户访问的页面是不需要登录的
    next();
  }
  // 1. 判断用户即将访问的页面是否需要登录
  // 2. 如果用户即将访问的页面不需要登录, 直接放行
  // 3. 如果用户即将访问的页面是需要登录的, 判断用户是否登录
  // 4. 如果用户登录了, 直接放行
  // 5. 如果用户没有登录, 跳转到登录页面
  // 6. 在跳转到登录页面的时候通过 to 参数获取到用户的目标跳转地址, 并将目标跳转地址作为参数传递到登录页面
  // 7. 当用户登录成功之后, 判断路由参数中是否存在目标跳转地址
  // 8. 如果存在目标跳转地址, 跳转到目标跳转地址, 如果没有目标跳转地址, 跳转到首页
}
