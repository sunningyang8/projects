<template>
  <AppLayout>
    <div class="xtx-pay-page" v-if="orderDetail">
      <div class="container">
        <XtxBread>
          <XtxBreadItem path="/">首页</XtxBreadItem>
          <XtxBreadItem path="/cart">购物车</XtxBreadItem>
          <XtxBreadItem>支付结果</XtxBreadItem>
        </XtxBread>
        <!-- 支付结果 -->
        <div class="pay-result">
          <span class="iconfont icon-queren2 green"></span>
          <!-- <span class="iconfont icon-shanchu red" ></span> -->
          <p class="tit">订单支付成功</p>
          <p class="tip">我们将尽快为您发货，收货期间请保持手机畅通</p>
          <p>
            支付方式：<span>{{
              orderDetail.payChannel === 1 ? "支付宝" : "微信"
            }}</span>
          </p>
          <p>
            支付金额：<span>¥{{ orderDetail.payMoney }}</span>
          </p>
          <div class="btn">
            <XtxButton
              @click="$router.push(`/member/order/${orderDetail.id}`)"
              type="primary"
              style="margin-right: 20px"
              >查看订单</XtxButton
            >
            <XtxButton type="gray">进入首页</XtxButton>
          </div>
          <p class="alert">
            <span class="iconfont icon-tip"></span>
            温馨提示：小兔鲜儿不会以订单异常、系统升级为由要求您点击任何网址链接进行退款操作，保护资产、谨慎操作。
          </p>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
<script>
import AppLayout from "@/components/AppLayout";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { getOrderDetail } from "@/api/order";
export default {
  name: "PayResultPage",
  components: { AppLayout },
  setup() {
    const { orderDetail } = useOrderDetail();
    return { orderDetail };
  },
};

export function useOrderDetail() {
  // 用于存储订单详情
  const orderDetail = ref();
  // 获取路由信息对象
  const route = useRoute();
  // 用于向服务器端发送请求 获取订单详情信息
  const getData = (id) => {
    // 发送请求
    getOrderDetail(id).then((data) => {
      // 存储订单详细信息
      orderDetail.value = data.result;
    });
  };
  // 发送请求获取数据
  getData(route.query.orderId);
  return { orderDetail };
}
</script>
<style scoped lang="less">
.pay-result {
  padding: 100px 0;
  background: #fff;
  text-align: center;
  > .iconfont {
    font-size: 100px;
  }
  .green {
    color: #1dc779;
  }
  .red {
    color: @priceColor;
  }
  .tit {
    font-size: 24px;
  }
  .tip {
    color: #999;
  }
  p {
    line-height: 40px;
    font-size: 16px;
  }
  .btn {
    margin-top: 50px;
  }
  .alert {
    font-size: 12px;
    color: #999;
    margin-top: 50px;
  }
}
</style>
