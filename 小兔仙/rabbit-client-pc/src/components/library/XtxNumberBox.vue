<template>
  <div class="xtx-number-box">
    <div class="label" v-if="label">{{ label }}</div>
    <div class="number-box">
      <a href="javascript:" @click="onCountChangedHandler(-1)">-</a>
      <input type="text" readonly :value="count" />
      <a href="javascript:" @click="onCountChangedHandler(1)">+</a>
    </div>
  </div>
</template>
<script>
import { useVModel } from "@vueuse/core";

export default {
  name: "XtxNumberBox",
  props: {
    modelValue: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 1,
    },
    label: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    // 实现商品数量的双向数据绑定
    const count = useVModel(props, "modelValue", emit);
    // 当用户更改商品数量时
    const onCountChangedHandler = (step) => {
      // 计算即将要设置的商品数量
      const nextCount = count.value + step;
      // 对商品数量的范围进行限制
      // 如果商品数量小于1
      if (nextCount < 1) {
        // 让商品数量等于1
        count.value = 1;
        // 如果商品数量大于商品库存
      } else if (nextCount > props.max) {
        // 让商品数量等于商品库存
        count.value = props.max;
      } else {
        // 商品数量处于正常范围内 直接设置即可
        count.value = nextCount;
      }
    };
    return { count, onCountChangedHandler };
  },
};
</script>
<style scoped lang="less">
.xtx-number-box {
  display: flex;
  align-items: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
  .number-box {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }
    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>
