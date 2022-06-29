import { requestWithoutToken } from "@/utils/request";

/**
 * 一级分类
 * @returns {AxiosPromise}
 */
export function topCategory() {
  return requestWithoutToken("/topcategory", "get");
}

/**
 * 二级分类
 * @returns {AxiosPromise}
 */
export function twoCategory(id) {
  return requestWithoutToken("/twoCategory", "get", { id });
}

/**
 * 二级分类  分类选项详情
 * @param id
 * @returns {AxiosPromise}
 */
export function cateGories(id) {
  return requestWithoutToken("/cateGories", "get", { id });
}

/**
 * 获取所有商品信息
 * @param id
 * @returns {AxiosPromise}
 */
export function cateGoriesList() {
  return requestWithoutToken("/cateGoriesList", "get");
}
