import { requestWithoutToken } from "@/utils/request";

/**
 * 根据账号和密码进行登录
 * @param account 账号
 * @param password 密码
 * @return {Promise}
 */
export function loginByAccount({ account, password }) {
  return requestWithoutToken("/login", "post", { account, password });
}

/**
 * 获取手机验证码
 * @param mobile 手机号
 * @return {Promise}
 */
export function getMsgCodeByMobileLogin(mobile) {
  return requestWithoutToken("/login/code", "get", { mobile });
}

/**
 * 通过手机号进行登录
 * @param mobile 手机号
 * @param code 验证码
 * @return {Promise}
 */
export function loginByMobile({ mobile, code }) {
  return requestWithoutToken("/login/code", "post", { mobile, code });
}

/**
 * 根据 openid 检测小兔仙账号 (三方登录)
 * @param unionId QQ openid
 * @return {Promise}
 */
export function findAccountByOpenId({ unionId }) {
  return requestWithoutToken("/login/social", "post", { unionId, source: 1 });
}

/**
 * 获取手机验证码 (绑定手机号和QQ号)
 * @param mobile 手机号
 * @return {Promise}
 */
export function getMsgCodeWhenBindQQ(mobile) {
  return requestWithoutToken("/login/social/code", "get", { mobile });
}

/**
 * 绑定手机号和QQ号
 * @param mobile 手机号
 * @param code 验证码
 * @param unionId QQ openid
 * @return {Promise}
 */
export function bindMobileAndQQ({ mobile, code, unionId }) {
  return requestWithoutToken("/login/social/bind", "post", {
    mobile,
    code,
    unionId,
  });
}

/**
 * 检测用户名或者手机号是否唯一
 * @param account 手机号或者用户名
 * @return {Promise}
 */
export function checkUsernameIsUnique(account) {
  return requestWithoutToken("/register/check", "get", { account });
}

/**
 * 获取手机验证码 (完善账号)
 * @param mobile 手机号
 * @return {Promise}
 */
export function getMsgCodeByRegister(mobile) {
  return requestWithoutToken("/register/code", "get", { mobile });
}

/**
 * 注册新账号并绑定手机号
 * @param account 用户名
 * @param mobile 手机号
 * @param code 手机验证码
 * @param password 密码
 * @param unionId QQ用户的openid
 * @return {Promise}
 */
export function registerAndBindQQ({
  account,
  mobile,
  code,
  password,
  unionId,
}) {
  return requestWithoutToken(`/login/social/${unionId}/complement`, "post", {
    account,
    mobile,
    code,
    password,
  });
}
