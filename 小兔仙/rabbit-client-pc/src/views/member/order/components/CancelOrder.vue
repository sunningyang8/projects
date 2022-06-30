<template>
  <XtxDialog title="取消订单" v-model:visible="visible">
    <!-- 组件内容 -->
    <template #default>
      <div class="cancel-info">
        <p>取消订单后，本单享有的优惠可能会一并取消，是否继续？</p>
        <p class="tip">请选择取消订单的原因（必选）：</p>
        <div class="btn">
          <a
            @click="selected = reason"
            v-for="reason in cancelReason"
            :class="{ active: reason === selected }"
            :key="reason"
            >{{ reason }}</a
          >
        </div>
      </div>
    </template>
    <!-- 按钮操作 -->
    <template #footer>
      <XtxButton @click="visible = false" type="gray" style="margin-right: 20px"
        >取消</XtxButton
      >
      <XtxButton @click="onClickHandler" type="primary">确认</XtxButton>
    </template>
  </XtxDialog>
</template>
<script>
import { getCurrentInstance, ref } from "vue";
import { cancelReason } from "@/api/constants";
import Confirm from "@/components/library/Confirm";
import { cancelOrder } from "@/api/member";
import Message from "@/components/library/Message";

export default {
  name: "CancelOrder",
  setup(props, { emit }) {
    // 用于控制弹框是否显示
    const visible = ref(false);
    // 用于存储用户选择的原因
    const selected = ref("");
    // 获取当前组件的实例对象
    const { proxy } = getCurrentInstance();
    // 取消订单操作
    const onClickHandler = () => {
      // 和用户进行确认是否真的要取消订单
      Confirm({ content: "您确定要取消订单吗" })
        .then(() => cancelOrder({ id: proxy.id, cancelReason: selected.value }))
        .then(() => {
          Message({ type: "success", text: "订单取消成功" });
          visible.value = false;
        })
        .then(() => emit("onReloadOrderList"))
        .catch(() => {
          Message({ type: "error", text: "订单取消失败" });
        });
    };
    return { visible, cancelReason, selected, onClickHandler };
  },
};
</script>
<style scoped lang="less">
.xtx-dialog :deep(.wrapper) {
  width: 620px;
}
.cancel-info {
  p {
    font-size: 16px;
    line-height: 35px;
    &.tip {
      color: #999;
    }
  }
  .btn {
    padding-top: 21px;
    display: flex;
    flex-wrap: wrap;
    a {
      width: 250px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      background-color: #ffffff;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 20px;
      color: #666;
      &:nth-child(2n) {
        margin-right: 0;
      }
      &:hover,
      &.active {
        background-color: #e3f9f4;
        border-color: @xtxColor;
      }
    }
  }
}
</style>
