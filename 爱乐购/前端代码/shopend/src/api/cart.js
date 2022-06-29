import { requestWithToken } from "@/utils/request";

/**
 *加入购物车
 * @returns {AxiosPromise}
 */
export function addlist(usersId, num, goodsId, goodsName, goodsPrice, image) {
  return requestWithToken("/cart/usergoods", "post", {
    usersId,
    num,
    goodsId,
    goodsName,
    goodsPrice,
    image,
  });
}

/**
 * 通过usersId获取购物车商品信息
 * @param usersId
 * @returns {AxiosPromise}
 */
export function obtainList(usersId) {
  return requestWithToken("/cart/obtainList", "post", { usersId });
}
/**
 * 通过goodsId获取购物车商品信息
 * @param goodsId
 * @returns {AxiosPromise}
 */
export function obtaingoodsId(goodsId) {
  return requestWithToken("/cart/obtaingoodsId", "post", { goodsId });
}

/**
 * 根据商品Id删除商品
 * @param goodsId
 * @returns {AxiosPromise}
 */
export function delegoodsId(goodsId) {
  return requestWithToken("/cart/delegoodsId", "post", { goodsId });
}
export function adsugoodsId(goodsId, num) {
  return requestWithToken("/cart/adsugoodsId", "post", { goodsId, num });
}

/**
 * 通过userId修改配送地址
 * @param addressDetail
 * @param areaCode
 * @param city
 * @param country
 * @param county
 * @param isDefault
 * @param name
 * @param postalCode
 * @param province
 * @param tel
 * @param usersId
 * @returns {AxiosPromise}
 */
export function addressGoodsId(
  addressDetail,
  areaCode,
  city,
  country,
  county,
  isDefault,
  name,
  postalCode,
  province,
  tel,
  usersId
) {
  return requestWithToken("/cart/addressGoodsId", "post", {
    addressDetail,
    areaCode,
    city,
    country,
    county,
    isDefault,
    name,
    postalCode,
    province,
    tel,
    usersId,
  });
}

/**
 * 点击保存按钮添加配送地址
 * @param addressDetail
 * @param areaCode
 * @param city
 * @param country
 * @param county
 * @param isDefault
 * @param name
 * @param postalCode
 * @param province
 * @param tel
 * @param id
 * @returns {AxiosPromise}
 */
export function serveaddres(
  addressDetail,
  areaCode,
  city,
  country,
  county,
  isDefault,
  name,
  postalCode,
  province,
  tel,
  usersId
) {
  return requestWithToken("/cart/serveaddres", "post", {
    addressDetail,
    areaCode,
    city,
    country,
    county,
    isDefault,
    name,
    postalCode,
    province,
    tel,
    usersId,
  });
}

/**
 * 通过用户id查询配送地址
 * @param usersId
 * @returns {AxiosPromise}
 */
export function viewadress(usersId) {
  return requestWithToken("/cart/viewadress", "post", { usersId });
}

/**
 * 通过用户id修改配送地址状态
 * @param usersId
 * @returns {AxiosPromise}
 */
export function sinState(usersId) {
  return requestWithToken("/cart/sinState", "post", { usersId });
}

/**
 * 通过id和用户id修改配送地址状态
 * @param id
 * @param usersId
 * @returns {AxiosPromise}
 */
export function deliveryId(id, usersId) {
  return requestWithToken("/cart/deliveryId", "post", { id, usersId });
}

/**
 * 通过id查找配送地址
 * @param id
 * @returns {AxiosPromise}
 */
export function modify(id) {
  return requestWithToken("/cart/modify", "post", { id });
}

/**
 * 通过id和用户id修改配送信息
 * @param addressDetail
 * @param areaCode
 * @param city
 * @param country
 * @param county
 * @param isDefault
 * @param name
 * @param postalCode
 * @param province
 * @param tel
 * @param usersId
 * @param id
 * @returns {AxiosPromise}
 */
export function distribution(
  addressDetail,
  areaCode,
  city,
  country,
  county,
  isDefault,
  name,
  postalCode,
  province,
  tel,
  usersId,
  id
) {
  return requestWithToken("/cart/distribution", "post", {
    addressDetail,
    areaCode,
    city,
    country,
    county,
    isDefault,
    name,
    postalCode,
    province,
    tel,
    usersId,
    id,
  });
}

/**
 * 删除配送信息
 * @param id
 * @returns {AxiosPromise}
 */
export function deledistribution(id) {
  return requestWithToken("/cart/deledistribution", "post", { id });
}

/**
 * 通过用户id和状态来查看符合条件的配送信息
 * @param usersId
 * @returns {AxiosPromise}
 */
export function settlement(usersId) {
  return requestWithToken("/cart/settlement", "post", { usersId });
}

/**
 * 商品购买后的标识
 * @param id
 * @returns {AxiosPromise}
 */
export function purchaseLogo(id) {
  return requestWithToken("/cart/purchaseLogo", "post", { id });
}
export function logistics(id) {
  return requestWithToken("/cart/logistics", "post", { id });
}
