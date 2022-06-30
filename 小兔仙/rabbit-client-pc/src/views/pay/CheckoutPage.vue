<template>
  <AppLayout>
    <div class="xtx-pay-checkout-page" v-if="orderInfo">
      <div class="container">
        <XtxBread>
          <XtxBreadItem path="/">首页</XtxBreadItem>
          <XtxBreadItem path="/cart">购物车</XtxBreadItem>
          <XtxBreadItem>填写订单</XtxBreadItem>
        </XtxBread>
        <div class="wrapper">
          <!-- 收货地址 -->
          <h3 class="box-title">收货地址</h3>
          <div class="box-body">
            <CheckoutAddress ref="checkoutAddressInstance" />
          </div>
          <!-- 商品信息 -->
          <h3 class="box-title">商品信息</h3>
          <div class="box-body">
            <table class="goods">
              <thead>
                <tr>
                  <th>商品信息</th>
                  <th>单价</th>
                  <th>数量</th>
                  <th>小计</th>
                  <th>实付</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in orderInfo.goods" :key="item.id">
                  <td>
                    <a href="javascript:" class="info">
                      <img :src="item.picture" alt="" />
                      <div class="right">
                        <p>{{ item.name }}</p>
                        <p>{{ item.attrsText }}</p>
                      </div>
                    </a>
                  </td>
                  <td>&yen;{{ item.price }}</td>
                  <td>{{ item.count }}</td>
                  <td>&yen;{{ item.totalPrice }}</td>
                  <td>&yen;{{ item.totalPayPrice }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- 配送时间 -->
          <h3 class="box-title">配送时间</h3>
          <div class="box-body">
            <a class="my-btn active" href="javascript:"
              >不限送货时间：周一至周日</a
            >
            <a class="my-btn" href="javascript:">工作日送货：周一至周五</a>
            <a class="my-btn" href="javascript:"
              >双休日、假日送货：周六至周日</a
            >
          </div>
          <!-- 支付方式 -->
          <h3 class="box-title">支付方式</h3>
          <div class="box-body">
            <a class="my-btn active" href="javascript:">在线支付</a>
            <a class="my-btn" href="javascript:">货到付款</a>
            <span style="color: #999">货到付款需付5元手续费</span>
          </div>
          <!-- 金额明细 -->
          <h3 class="box-title">金额明细</h3>
          <div class="box-body">
            <div class="total">
              <dl>
                <dt>商品件数：</dt>
                <dd>{{ orderInfo.summary.goodsCount }}件</dd>
              </dl>
              <dl>
                <dt>商品总价：</dt>
                <dd>¥{{ orderInfo.summary.totalPrice }}</dd>
              </dl>
              <dl>
                <dt>运<i></i>费：</dt>
                <dd>¥{{ orderInfo.summary.postFee }}</dd>
              </dl>
              <dl>
                <dt>应付总额：</dt>
                <dd class="price">¥{{ orderInfo.summary.totalPayPrice }}</dd>
              </dl>
            </div>
          </div>
          <!-- 提交订单 -->
          <div class="submit">
            <XtxButton @click="saveOrder" type="primary">提交订单</XtxButton>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
<script>
import AppLayout from "@/components/AppLayout";
import { ref } from "vue";
import { createOrder, submitOrder } from "@/api/order";
import CheckoutAddress from "@/views/pay/components/CheckoutAddress";
import Message from "@/components/library/Message";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { createOrderById } from "@/api/member";
export default {
  name: "CheckoutPage",
  components: { CheckoutAddress, AppLayout },
  setup() {
    // 获取路由对象
    const router = useRouter();
    // 获取store对象
    const store = useStore();
    const { orderInfo } = useOrderInfo();
    // 获取收货地址组件的组件实例对象
    const checkoutAddressInstance = ref();
    // 当用户点击提交订单按钮的时候执行
    const saveOrder = () => {
      // 收集订单信息
      const order = {
        // 订单商品集合
        goods: orderInfo.value.goods.map((item) => ({
          skuId: item.skuId,
          count: item.count,
        })),
        // 收货地址id
        addressId: checkoutAddressInstance.value.finalAddress?.id,
        // 配送时间 1 不限
        deliveryTimeType: 1,
        // 支付方式 1 在线支付
        payType: 1,
        // 支付渠道, 支付宝
        payChannel: 1,
        // 买家留言
        buyerMessage: "",
      };
      // 判断收货地址id是否存在
      if (!order.addressId) {
        return Message({ type: "error", text: "请添加收货地址" });
      }
      // 提交订单
      submitOrder(order).then((data) => {
        // 订单提交成功以后要做什么?
        // 1. 跳转到支付页面, 将订单id作为路由参数
        router.push({
          path: "/checkout/pay",
          query: {
            orderId: data.result.id,
          },
        });
        // 2. 将服务器端购物车中的商品同步到客户端
        store.dispatch("cart/updateGoodsBySkuId");
      });
    };
    return { orderInfo, saveOrder, checkoutAddressInstance };
  },
};
function useOrderInfo() {
  // 获取路由信息对象
  const route = useRoute();
  // 用户存储订单信息
  const orderInfo = ref();
  // 用于创建订单 获取订单信息
  const getData = () => {
    if (route.query.orderId) {
      // 从订单页面中跳转过来的 再次购买
      createOrderById(route.query.orderId).then((data) => {
        orderInfo.value = data.result;
      });
    } else {
      // 从购物车跳转过来的 正常结算
      createOrder().then((data) => {
        orderInfo.value = data.result;
      });
    }
  };
  getData();
  return { orderInfo };
}
</script>
<style scoped lang="less">
.xtx-pay-checkout-page {
  .wrapper {
    background: #fff;
    padding: 0 20px;
    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }
    .box-body {
      padding: 20px 0;
    }
  }
}

.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  .info {
    display: flex;
    text-align: left;
    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }
    .right {
      line-height: 24px;
      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }
  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }
    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;
      &:first-child {
        border-left: 1px solid #f5f5f5;
      }
      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}
.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;
  &.active,
  &:hover {
    border-color: @xtxColor;
  }
}
.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;
    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }
    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;
      &.price {
        font-size: 20px;
        color: @priceColor;
      }
    }
  }
}
.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}
</style>
