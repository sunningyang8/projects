<template>
  <AppMemberLayout>
    <div class="member-order">
      <XtxTabs v-model:current="current">
        <XtxTabTitle v-for="item in orderStatus" :key="item.name">
          {{ item.label }}
        </XtxTabTitle>
      </XtxTabs>
      <div class="order-list">
        <div class="loading" v-if="loading"></div>
        <template v-if="!loading && orderList && orderList.items.length > 0">
          <OrderItem
            :order="order"
            v-for="order in orderList.items"
            :key="order.id"
            @onCancelOrder="onCancelOrder"
            @onReloadOrderList="getData"
            @onLookLogistics="onLookLogistics"
          />
        </template>
        <div v-if="!loading && orderList?.items?.length === 0" class="none">
          暂无数据
        </div>
        <XtxPagination
          v-if="orderList && pages > 1"
          v-model:page="reqParams.page"
          :pageSize="reqParams.pageSize"
          :counts="counts"
        />
      </div>
    </div>
  </AppMemberLayout>
  <CancelOrder ref="cancelOrderInstance" @onReloadOrderList="getData" />
  <OrderLogistics ref="orderLogisticsInstance" />
</template>

<script>
import AppMemberLayout from "@/components/AppMemberLayout";
import { orderStatus } from "@/api/constants";
import { ref, watch } from "vue";
import { getOrderList } from "@/api/member";
import OrderItem from "@/views/member/order/components/OrderItem";
import CancelOrder from "@/views/member/order/components/CancelOrder";
import OrderLogistics from "@/views/member/order/components/OrderLogistics";

export default {
  name: "OrderListPage",
  components: { OrderLogistics, CancelOrder, OrderItem, AppMemberLayout },
  setup() {
    const { orderList, reqParams, loading, counts, pages, getData } =
      useOrderList();
    // 订单标题的索引
    const current = ref(0);
    // 监听订单标题索引的变化
    watch(current, () => {
      reqParams.value.orderState = current.value;
      reqParams.value.page = 1;
    });
    const cancelOrderInstance = ref();
    // 取消订单
    const onCancelOrder = (id) => {
      cancelOrderInstance.value.visible = true;
      cancelOrderInstance.value.id = id;
    };
    const orderLogisticsInstance = ref();
    // 查看物流
    const onLookLogistics = (id) => {
      orderLogisticsInstance.value.visible = true;
      orderLogisticsInstance.value.id = id;
    };
    return {
      orderStatus,
      orderList,
      current,
      loading,
      reqParams,
      counts,
      pages,
      onCancelOrder,
      cancelOrderInstance,
      getData,
      onLookLogistics,
      orderLogisticsInstance,
    };
  },
};

function useOrderList() {
  // 用于存储订单列表数据
  const orderList = ref();
  // 用于存储查询订单的条件
  const reqParams = ref({
    page: 1,
    pageSize: 3,
    orderState: 0,
  });
  // 加载状态
  const loading = ref(false);
  // 用于向服务器端发送请求 获取订单列表
  // 用于存储总数据条数
  const counts = ref(0);
  // 用于存储总页数
  const pages = ref(0);
  const getData = () => {
    // 更新加载状态
    loading.value = true;

    getOrderList(reqParams.value).then((data) => {
      // 存储订单列表数据
      orderList.value = data.result;
      // 更新加载状态
      loading.value = false;
      // 更新总数据条数
      counts.value = data.result.counts;
      // 更新总页数
      pages.value = data.result.pages;
    });
  };
  // 监听查询条件的变化, 重新获取订单列表,
  watch(reqParams.value, () => getData(), { immediate: true });
  return { orderList, reqParams, loading, counts, pages, getData };
}
</script>

<style lang="less" scoped>
.member-order {
  height: 100%;
  background: #fff;
  position: relative;
}
.order-list {
  background: #fff;
  padding: 20px;
  position: relative;
}
.loading {
  height: calc(100% - 60px);
  width: 100%;
  min-height: 400px;
  position: absolute;
  left: 0;
  top: 60px;
  background: rgba(255, 255, 255, 0.9) url(../../../assets/images/loading.gif)
    no-repeat center 18%;
}
.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
  background: rgba(255, 255, 255, 0.9);
}
</style>
