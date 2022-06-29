import { requestWithoutToken } from "@/utils/request";

/**
 * 首页轮播图
 * @returns {AxiosPromise}
 */
export function homeswipers() {
  return requestWithoutToken(`/swipers`, "get");
}
export function classify(){
  return requestWithoutToken(`/classify`, "get");
}
/**
 * 宫格组件
 * @returns {AxiosPromise}
 */
export function homeNavList(){
  return requestWithoutToken(`/nav`, "get");
}

/**
 * 商品
 * @returns {AxiosPromise}
 */
export function newGoodsList(){
  return requestWithoutToken(`/goods`, "get");
}
