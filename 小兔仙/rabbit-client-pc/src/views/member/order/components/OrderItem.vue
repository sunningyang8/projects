<template>
  <div class="order-item">
    <div class="head">
      <span>下单时间：{{ order.createTime }}</span>
      <span>订单编号：{{ order.id }}</span>
      <span
        class="down-time"
        v-if="order.orderState === 1 && order.countdown !== -1"
      >
        <i class="iconfont icon-down-time"></i>
        <b>付款截止：{{ dayjs.unix(count).format("mm分ss秒") }}</b>
      </span>
      <a
        @click="deleteOrderHandler(order.id)"
        v-if="[5, 6].includes(order.orderState)"
        href="javascript:"
        class="del"
        >删除</a
      >
    </div>
    <div class="body">
      <div class="column goods">
        <ul>
          <li v-for="goods in order.skus" :key="goods.id">
            <RouterLink class="image" :to="`/goods/${goods.id}`">
              <img :src="goods.image" alt="" />
            </RouterLink>
            <div class="info">
              <p class="name ellipsis-2">{{ goods.name }}</p>
              <p class="attr ellipsis">
                <span>{{ goods.attrsText }}</span>
              </p>
            </div>
            <div class="price">¥{{ goods.realPay }}</div>
            <div class="count">x{{ goods.quantity }}</div>
          </li>
        </ul>
      </div>
      <div class="column state">
        <p>{{ orderStatus[order.orderState].label }}</p>
        <a
          @click="lookLogistics(order.id)"
          v-if="order.orderState === 3"
          href="javascript:"
          class="green"
          >查看物流</a
        >
        <a v-if="order.orderState === 4" href="javascript:" class="green"
          >评价商品</a
        >
        <a v-if="order.orderState === 5" href="javascript:" class="green"
          >查看评价</a
        >
      </div>
      <div class="column amount">
        <p class="red">¥{{ order.payMoney }}</p>
        <p>（含运费：¥{{ order.postFee }}）</p>
        <p>在线付款</p>
      </div>
      <div class="column action">
        <XtxButton v-if="order.orderState === 1" type="primary" size="small"
          ><RouterLink :to="`/checkout/pay?orderId=${order.id}`"
            >立即付款</RouterLink
          ></XtxButton
        >
        <XtxButton
          @click="receiptGoodsHandler(order.id)"
          v-if="order.orderState === 3"
          type="primary"
          size="small"
          >确认收货</XtxButton
        >
        <p>
          <RouterLink :to="`/member/order/${order.id}`">查看详情</RouterLink>
        </p>
        <p>
          <a
            @click="onCancelButtonClick(order.id)"
            v-if="order.orderState === 1"
            href="javascript:"
            >取消订单</a
          >
        </p>
        <p>
          <a v-if="[2, 3, 4, 5].includes(order.orderState)" href="javascript:"
            >再次购买</a
          >
        </p>
        <p>
          <a v-if="[4, 5].includes(order.orderState)" href="javascript:"
            >申请售后</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import useCountDown from "@/hooks/useCountDown";
import dayjs from "dayjs";
import { orderStatus } from "@/api/constants";
import Confirm from "@/components/library/Confirm";
import { deleteOrder, receiptGoods } from "@/api/member";
import Message from "@/components/library/Message";

export default {
  name: "OrderItem",
  props: {
    order: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    const { count, start } = useCountDown();
    // 如果当前订单状态为待支付并且当前订单未超时
    if (props.order.orderState === 1 && props.order.countdown !== -1) {
      // 开始倒计时
      start(props.order.countdown);
    }
    // 取消订单
    const onCancelButtonClick = (id) => {
      emit("onCancelOrder", id);
    };
    // 删除订单
    const deleteOrderHandler = async (id) => {
      try {
        // 和用户进行确认
        await Confirm({ content: "您确定要删除订单吗" });
        // 发送请求删除订单
        await deleteOrder([id]);
        // 用户提示
        Message({ type: "success", text: "订单删除成功" });
        // 重新获取订单列表
        emit("onReloadOrderList");
      } catch (error) {
        Message({ type: "error", text: "订单删除失败" });
      }
    };
    // 确认收货
    const receiptGoodsHandler = (id) => {
      Confirm({ content: "您真的要确认收货吗" })
        .then(() => receiptGoods(id))
        .then(() => emit("onReloadOrderList"))
        .then(() => Message({ type: "success", text: "确认收货成功" }))
        .catch(() => Message({ type: "error", text: "确认收货失败" }));
    };
    // 查看物流
    const lookLogistics = (id) => {
      emit("onLookLogistics", id);
    };
    return {
      count,
      dayjs,
      orderStatus,
      onCancelButtonClick,
      deleteOrderHandler,
      receiptGoodsHandler,
      lookLogistics,
    };
  },
};
</script>

<style scoped lang="less">
.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;
  .head {
    height: 50px;
    line-height: 50px;
    background: #f5f5f5;
    padding: 0 20px;
    overflow: hidden;
    span {
      margin-right: 20px;
      &.down-time {
        margin-right: 0;
        float: right;
        i {
          vertical-align: middle;
          margin-right: 3px;
        }
        b {
          vertical-align: middle;
          font-weight: normal;
        }
      }
    }
    .del {
      margin-right: 0;
      float: right;
      color: #999;
    }
  }
  .body {
    display: flex;
    align-items: stretch;
    .column {
      border-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;
      > p {
        padding-top: 10px;
      }
      &:first-child {
        border-left: none;
      }
      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;
        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;
            &:last-child {
              border-bottom: none;
            }
            .image {
              width: 70px;
              height: 70px;
              border: 1px solid #f5f5f5;
            }
            .info {
              width: 220px;
              text-align: left;
              padding: 0 10px;
              p {
                margin-bottom: 5px;
                &.name {
                  height: 38px;
                }
                &.attr {
                  color: #999;
                  font-size: 12px;
                  span {
                    margin-right: 5px;
                  }
                }
              }
            }
            .price {
              width: 100px;
            }
            .count {
              width: 80px;
            }
          }
        }
      }
      &.state {
        width: 120px;
        .green {
          color: @xtxColor;
        }
      }
      &.amount {
        width: 200px;
        .red {
          color: @priceColor;
        }
      }
      &.action {
        width: 140px;
        a {
          display: block;
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
</style>
