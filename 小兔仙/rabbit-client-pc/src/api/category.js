import { requestWithoutToken } from "@/utils/request";

/**
 * 获取一级分类的具体信息
 * @param id 一级分类ID
 * @return {Promise}
 */
export function getTopCategoryById(id) {
  return requestWithoutToken("/category", "get", { id });
}

/**
 * 获取二级分类筛选条件
 * @param id 二级分类ID
 * @return {Promise}
 */
export function getSubCategoryFilters(id) {
  return requestWithoutToken("/category/sub/filter", "get", { id });
}

/**
 * 获取二级分类商品列表
 * @param reqParams 请求参数: 二级分类ID, 排序条件, 筛选条件、分页信息
 * @return {Promise}
 */
export function getGoodsList(reqParams) {
  return requestWithoutToken("/category/goods", "post", reqParams);
}
