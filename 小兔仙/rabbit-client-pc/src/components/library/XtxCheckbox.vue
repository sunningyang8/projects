<template>
  <div class="xtx-checkbox" @click="toggle">
    <i v-if="isChecked" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <span><slot /></span>
  </div>
</template>
<script>
import { unref } from "vue";
import { useVModel } from "@vueuse/core";

export default {
  name: "XtxCheckbox",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const isChecked = useVModel(props, "modelValue", emit);
    // 控制复选框的选中状态
    // const isChecked = ref(false);
    // 控制复选项的选中状态
    const toggle = () => {
      // 将当前值取反
      isChecked.value = !unref(isChecked);
      // 将值同步到父组件
      // emit("update:modelValue", isChecked.value);
    };
    // 监听 modelValue 值的变化
    // watch(
    //   () => props.modelValue,
    //   () => {
    //     // 当值发生变化以后 将值赋值给 isChecked
    //     // 因为在当前组件中我们是通过 isChecked 来控制模板状态的
    //     isChecked.value = props.modelValue;
    //   }
    // );
    return { isChecked, toggle };
  },
};
</script>
<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
