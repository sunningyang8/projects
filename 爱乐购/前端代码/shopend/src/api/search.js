import { requestWithoutToken } from "@/utils/request";

/**
 * 搜索商品页面
 * @returns {AxiosPromise}
 */
export function search(name) {
  return requestWithoutToken(`/search`, "get", { name });
}
