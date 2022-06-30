import { requestWithToken } from "@/utils/request";

/**
 * 创建订单, 返回订单信息
 * @return {Promise}
 */
export function createOrder() {
  return requestWithToken("/member/order/pre", "get");
}

/**
 * 添加收货地址
 * @param address 收货地址对象
 * @return {Promise}
 */
export function addAddress(address) {
  return requestWithToken("/member/address", "post", address);
}

/**
 * 获取收货地址列表
 * @return {Promise}
 */
export function getAddress() {
  return requestWithToken("/member/address", "get");
}

/**
 * 根据收货地址ID修改收货地址
 * @param address
 * @return {Promise}
 */
export function updateAddress(address) {
  return requestWithToken(`/member/address/${address.id}`, "put", address);
}

/**
 * 提交订单
 * @param order 订单信息对象
 * @return {Promise}
 */
export function submitOrder(order) {
  return requestWithToken("/member/order", "post", order);
}

/**
 * 根据订单ID获取订单详情
 * @param id 订单ID
 * @return {Promise}
 */
export function getOrderDetail(id) {
  return requestWithToken(`/member/order/${id}`, "get");
}
