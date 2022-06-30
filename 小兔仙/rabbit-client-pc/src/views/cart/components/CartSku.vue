<template>
  <div class="cart-sku" ref="target">
    <div class="attrs" @click="toggle">
      <span class="ellipsis">{{ attrsText }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-if="visible">
      <div class="loading" v-if="loading"></div>
      <GoodsSku
        v-if="!loading && specsAndSkus"
        :specs="specsAndSkus.specs"
        :skus="specsAndSkus.skus"
        :skuId="skuId"
        @onSpecChanged="onSpecChanged"
      />
      <XtxButton
        @click="submitSku"
        v-if="!loading && specsAndSkus"
        type="primary"
        size="mini"
        style="margin-left: 60px"
      >
        确定
      </XtxButton>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { getGoodsOfSkuInfo } from "@/api/cart";
import GoodsSku from "@/views/goods/components/GoodsSku";
import { useStore } from "vuex";
import Message from "@/components/library/Message";

export default {
  name: "CartSku",
  components: { GoodsSku },
  props: {
    attrsText: {
      type: String,
    },
    skuId: {
      type: String,
    },
  },
  setup(props) {
    const store = useStore();
    const target = ref();
    // 控制弹层是否显示
    const visible = ref(false);
    // 规格组件所需数据
    const specsAndSkus = ref();
    // loading
    const loading = ref(false);
    // 显示弹层
    const show = () => {
      // 控制弹层是否显示
      visible.value = true;
      // 数据的加载状态
      loading.value = true;
      // 向服务器发送器请求 获取数据
      getGoodsOfSkuInfo(props.skuId).then((data) => {
        specsAndSkus.value = data.result;
        loading.value = false;
      });
    };
    // 隐藏弹层
    const hide = () => {
      visible.value = false;
    };
    // 切换弹层的显示和隐藏
    const toggle = () => {
      visible.value ? hide() : show();
    };
    // 在元素外面点击时 隐藏弹层
    onClickOutside(target, hide);
    // 存储用户选择的新的规格数据
    let newSku = null;
    // 当用户选择了一个完整的规格的时候
    const onSpecChanged = (data) => {
      newSku = data;
    };
    const submitSku = () => {
      hide();
      // 当用户没有选择规格
      // 或者说用户选择了规格但是选择的规格和以前一样
      if (!newSku || (newSku && newSku.skuId === props.skuId)) {
        Message({ type: "warn", text: "规格数据没有发生变化" });
        return;
      }
      store.dispatch("cart/updateGoodsOfCartBySkuChanged", {
        oldSkuId: props.skuId,
        newSku,
      });
    };
    return {
      visible,
      toggle,
      target,
      specsAndSkus,
      loading,
      onSpecChanged,
      submitSku,
    };
  },
};
</script>
<style scoped lang="less">
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display: inline-block;
  .attrs {
    line-height: 24px;
    display: flex;
    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }
    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid @xtxColor;
    box-shadow: 2px 2px 4px lighten(@xtxColor, 50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;
    &::before {
      content: "";
      width: 12px;
      height: 12px;
      border-left: 1px solid @xtxColor;
      border-top: 1px solid @xtxColor;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(0.8, 1) rotate(45deg);
    }
    .loading {
      height: 224px;
      background: url(../../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
