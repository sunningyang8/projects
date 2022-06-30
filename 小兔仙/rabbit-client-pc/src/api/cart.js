import { requestWithoutToken, requestWithToken } from "@/utils/request";

/**
 * 根据 skuId 更新商品信息
 * @param skuId
 * @return {Promise}
 */
export function updateGoodsOfCartBySkuId(skuId) {
  return requestWithoutToken(`/goods/stock/${skuId}`, "get");
}

/**
 * 获取商品的 sku 信息 1.供用户选择的在页面中渲染的规格数据 2. 当前商品的所有可组件的 sku 信息
 * @param skuId 商品的 skuId
 * @return {Promise}
 */
export function getGoodsOfSkuInfo(skuId) {
  return requestWithoutToken(`/goods/sku/${skuId}`, "get");
}

/**
 * 合并购物车
 * @param cart Array[] {skuId, selected, count}
 */
export function mergeServerCart(cart) {
  return requestWithToken("/member/cart/merge", "post", cart);
}

/**
 * 获取服务器端购物车列表
 * @return {Promise}
 */
export function getServerCart() {
  return requestWithToken("/member/cart", "get");
}

/**
 * 将商品添加到服务器端购物车
 * @param skuId 商品的 skuId
 * @param count 商品的数量
 * @return {Promise}
 */
export function addGoodsToServerCart({ skuId, count }) {
  return requestWithToken("/member/cart", "post", { skuId, count });
}

/**
 * 删除服务器端购物车中的商品
 * @param ids 数组类型. 包含要删除的商品的 skuId
 * @return {Promise}
 */
export function deleteGoodsOfServerCart(ids) {
  return requestWithToken("/member/cart", "delete", { ids });
}

/**
 * 更新服务器端购物车中的商品信息
 * @param skuId 商品的 skuId
 * @param selected 商品的选中状态
 * @param count 商品的数量
 * @return {Promise}
 */
export function updateGoodsOfServerCart({ skuId, selected, count }) {
  return requestWithToken(`/member/cart/${skuId}`, "put", { selected, count });
}

/**
 * 实现全选,取消全选
 * @param selected 选中状态
 * @param ids 要更新的商品的 skuId
 * @return {Promise}
 */
export function selectedOrNotSelected({ selected, ids }) {
  return requestWithToken("/member/cart/selected", "put", { selected, ids });
}
