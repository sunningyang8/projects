import { requestWithoutToken,requestWithToken } from "@/utils/request";

/**
 * 用户注册
 * @returns {axiosPromise}
 */
export function userLogn(username, password, mobile) {
  return requestWithoutToken("/users/user", "post", {
    username,
    password,
    mobile,
  });
}
/**
 * 用户账号密码登录
 * @returns {axiosPromise}
 */
export function accountLogin(username, password) {
  return requestWithToken("/users/login", "post", {
    username,
    password
  });
}
/**
 * 用户手机号密码登录
 * @returns {axiosPromise}
 */
export function mobileLogin( mobile, password ) {
  return requestWithToken("/users/mobile", "post", {
    mobile,
    password,
  });
}
/**
 * 手机号登录信息查询
 * @returns {axiosPromise}
 */
export function viewLogin( mobile ) {
  return requestWithToken("/users/viewLogin", "post", {
    mobile,
  });
}
/**
 * 账号登录信息查询
 * @returns {axiosPromise}
 */
export function viewusername( username ) {
  return requestWithToken("/users/viewusername", "post", {
    username,
  });
}
