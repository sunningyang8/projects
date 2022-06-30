<template>
  <div class="detail-logistics" v-if="Logistics">
    <p>
      <span>{{ Logistics.list[0].time }}</span>
      <span>{{ Logistics.list[0].text }}</span>
    </p>
    <a href="javascript:" @click="lookLog">查看物流</a>
  </div>
  <teleport to="#modal">
    <OrderLogistics ref="orderLogisticsInstance" />
  </teleport>
</template>
<script>
import { lookLogistics } from "@/api/member";
import { useRoute } from "vue-router";
import { ref } from "vue";
import OrderLogistics from "@/views/member/order/components/OrderLogistics";

export default {
  name: "DetailLogistics",
  components: { OrderLogistics },
  async setup() {
    // 获取路由信息对象
    const route = useRoute();
    // 用于存储物流信息
    const Logistics = ref();
    // 获取订单信息弹层组件的实例对象
    const orderLogisticsInstance = ref();
    // 测试代码 延迟
    // await delay(2000);
    // 获取物流信息
    let data = await lookLogistics(route.params.id);
    // 存储物流信息
    Logistics.value = data.result;
    // 渲染物流信息弹层组件
    const lookLog = () => {
      orderLogisticsInstance.value.id = route.params.id;
      orderLogisticsInstance.value.visible = true;
    };
    return { Logistics, orderLogisticsInstance, lookLog };
  },
};

// async function delay(time) {
//   await new Promise((resolve) => setTimeout(() => resolve(), time));
// }
</script>
<style scoped lang="less">
.detail-logistics {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  background-color: #f5f5f5;
  margin: 30px 50px 0;
  > p {
    flex: 1;
    span {
      color: #999;
      &:first-child {
        margin-right: 30px;
      }
    }
  }
  > a {
    color: @xtxColor;
    text-align: center;
  }
}
</style>
