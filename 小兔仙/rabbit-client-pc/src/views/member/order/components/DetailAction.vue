<template>
  <div class="detail-action">
    <div class="state">
      <span class="iconfont icon-order-unpay"></span>
      <p>{{ orderStatus[orderInfo.orderState].label }}</p>
    </div>
    <div class="info">
      <p>订单编号：{{ orderInfo.id }}</p>
      <p>下单时间：{{ orderInfo.createTime }}</p>
    </div>
    <div class="btn">
      <!-- 待付款 -->
      <template v-if="orderInfo.orderState === 1">
        <XtxButton
          @click="$router.push('/member/pay?orderId=' + orderInfo.id)"
          type="primary"
          size="small"
          >立即付款</XtxButton
        >
        <XtxButton
          @click="onCancelButtonClicked(orderInfo.id)"
          type="gray"
          size="small"
          >取消订单</XtxButton
        >
      </template>
      <!-- 待发货 -->
      <template v-if="orderInfo.orderState === 2">
        <XtxButton
          @click="$router.push(`/checkout/order?orderId=${orderInfo.id}`)"
          type="primary"
          size="small"
          >再次购买</XtxButton
        >
      </template>
      <!-- 待收货 -->
      <template v-if="orderInfo.orderState === 3">
        <XtxButton
          @click="onSureButtonClick(orderInfo.id)"
          type="primary"
          size="small"
          >确认收货</XtxButton
        >
        <XtxButton
          @click="
            $router.push({
              path: '/checkout/order',
              query: { orderId: orderInfo.id },
            })
          "
          type="plain"
          size="small"
          >再次购买</XtxButton
        >
      </template>
      <!-- 待评价 -->
      <template v-if="orderInfo.orderState === 4">
        <XtxButton
          @click="$router.push(`/checkout/order?orderId=${orderInfo.id}`)"
          type="primary"
          size="small"
          >再次购买</XtxButton
        >
        <XtxButton type="plain" size="small">评价商品</XtxButton>
        <XtxButton type="gray" size="small">申请售后</XtxButton>
      </template>
      <!-- 已完成 -->
      <template v-if="orderInfo.orderState === 5">
        <XtxButton
          @click="$router.push(`/checkout/order?orderId=${orderInfo.id}`)"
          type="primary"
          size="small"
          >再次购买</XtxButton
        >
        <XtxButton type="plain" size="small">查看评价</XtxButton>
        <XtxButton type="gray" size="small">申请售后</XtxButton>
      </template>
      <!-- 已取消 -->
    </div>
  </div>
  <CancelOrder
    @onReloadOrderList="$emit('onReloadOrder')"
    ref="cancelOrderInstance"
  />
</template>
<script>
import { orderStatus } from "@/api/constants";
import CancelOrder from "@/views/member/order/components/CancelOrder";
import { ref } from "vue";
import Confirm from "@/components/library/Confirm";
import { receiptGoods } from "@/api/member";
import Message from "@/components/library/Message";

export default {
  name: "DetailAction",
  emits: ["onReloadOrder"],
  components: { CancelOrder },
  props: {
    orderInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    const cancelOrderInstance = ref();
    // 取消订单
    const onCancelButtonClicked = (id) => {
      cancelOrderInstance.value.visible = true;
      cancelOrderInstance.value.id = id;
    };
    // 确认收货
    const onSureButtonClick = (id) => {
      Confirm({ content: "您确定要收货吗" })
        .then(() => receiptGoods(id))
        .then(() => emit("onReloadOrder"))
        .then(() => Message({ type: "success", text: "收货成功" }))
        .catch(() => Message({ type: "error", text: "收货失败" }));
    };
    return {
      orderStatus,
      onCancelButtonClicked,
      cancelOrderInstance,
      onSureButtonClick,
    };
  },
};
</script>
<style scoped lang="less">
.detail-action {
  height: 180px;
  width: 100%;
  display: flex;
  align-items: center;
  .state {
    width: 220px;
    text-align: center;
    .iconfont {
      font-size: 40px;
      color: @xtxColor;
    }
    p {
      font-size: 16px;
      color: #666;
      margin-bottom: 10px;
    }
  }
  .info {
    width: 240px;
    line-height: 30px;
    p {
      color: #999;
    }
  }
  .btn {
    flex: 1;
    text-align: right;
    margin-right: 100px;
    .xtx-button {
      margin-left: 20px;
    }
  }
}
</style>
