<template>
  <AppMemberLayout>
    <div class="order-detail-page">
      <!-- 操作栏 -->
      <DetailAction
        @onReloadOrder="getData(orderInfo.id)"
        v-if="orderInfo"
        :orderInfo="orderInfo"
      />
      <!-- 步骤条-->
      <XtxSteps v-if="orderInfo" v-model:step="currentStep">
        <XtxStepItem
          title="提交订单"
          :desc="orderInfo.createTime"
        ></XtxStepItem>
        <XtxStepItem title="付款成功" :desc="orderInfo.payTime"></XtxStepItem>
        <XtxStepItem
          title="商品发货"
          :desc="orderInfo.consignTime"
        ></XtxStepItem>
        <XtxStepItem title="确认收货" :desc="orderInfo.endTime"></XtxStepItem>
        <XtxStepItem
          title="订单完成"
          :desc="orderInfo.evaluationTime"
        ></XtxStepItem>
      </XtxSteps>
      <!-- 物流栏 -->
      <template v-if="orderInfo">
        <Suspense>
          <template v-slot:default>
            <DetailLogistics v-if="[3, 4, 5].includes(orderInfo.orderState)" />
          </template>
          <template v-slot:fallback> loading... </template>
        </Suspense>
      </template>

      <!-- 订单商品信息 -->
      <DetailOrderGoods v-if="orderInfo" :orderInfo="orderInfo" />
    </div>
  </AppMemberLayout>
</template>
<script>
import AppMemberLayout from "@/components/AppMemberLayout";
import DetailAction from "@/views/member/order/components/DetailAction";
import { ref } from "vue";
import { getOrderDetail } from "@/api/order";
import { useRoute } from "vue-router";
import DetailLogistics from "@/views/member/order/components/DetailLogistics";
import DetailOrderGoods from "@/views/member/order/components/DetailOrderGooods";
export default {
  name: "OrderDetailPage",
  components: {
    DetailOrderGoods,
    DetailLogistics,
    DetailAction,
    AppMemberLayout,
  },
  setup() {
    const { orderInfo, getData } = useOrderInfo();
    const currentStep = ref(2);
    return { orderInfo, currentStep, getData };
  },
};
// 获取订单详情信息
function useOrderInfo() {
  const orderInfo = ref();
  const route = useRoute();
  const getData = (id) => {
    getOrderDetail(id).then((data) => {
      orderInfo.value = data.result;
    });
  };
  getData(route.params.id);
  return { orderInfo, getData };
}
</script>
<style scoped lang="less">
.order-detail-page {
  background: #fff;
  height: 100%;
}
</style>
