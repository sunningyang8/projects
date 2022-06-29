import { requestWithoutToken } from "@/utils/request";

/**
 * 首页
 * @returns {axiosPromise}
 */
export function updateGoodsOfCartBySkuId() {
  return requestWithoutToken(`/users/list`, "get");
}
