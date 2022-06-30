<template>
  <div class="goods-image">
    <div
      class="large"
      :style="{
        backgroundImage: `url(${images[currentIndex]})`,
        backgroundPositionX: bgPosition.x + 'px',
        backgroundPositionY: bgPosition.y + 'px',
      }"
      v-show="show"
    ></div>
    <div class="middle" ref="target">
      <img :src="images[currentIndex]" alt="" />
      <div
        class="layer"
        v-show="show"
        :style="{
          left: layerPosition.left + 'px',
          top: layerPosition.top + 'px',
        }"
      ></div>
    </div>
    <ul class="small">
      <li
        v-for="(item, index) in images"
        :key="item"
        @mouseenter="currentIndex = index"
        :class="{ active: currentIndex === index }"
      >
        <img :src="item" alt="" />
      </li>
    </ul>
  </div>
</template>
<script>
import { ref, watch } from "vue";
import { useMouseInElement } from "@vueuse/core";

export default {
  name: "GoodsImages",
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const currentIndex = ref(0);
    // 控制大图容器和镜片容器的显示和隐藏
    const show = ref(false);
    // 用于获取中图DOM对象
    const target = ref();
    // 用于获取鼠标和元素之间的关系
    const { isOutside, elementX, elementY } = useMouseInElement(target);
    // 用于控制镜片的位置
    const layerPosition = ref({ left: 0, top: 0 });
    // 用于控制大图位置
    const bgPosition = ref({ x: 0, y: 0 });
    // 监听鼠标和元素之间的关系的变化
    watch([isOutside, elementX, elementY], ([isOut, x, y]) => {
      if (isOut) {
        // 鼠标移出
        show.value = false;
      } else {
        // 鼠标移入
        show.value = true;
        // 控制镜片的位置
        layerPosition.value = {
          left: x - 100,
          top: y - 100,
        };
        // 控制镜片水平方向溢出
        if (layerPosition.value.left < 0) {
          layerPosition.value.left = 0;
        } else if (layerPosition.value.left > 200) {
          layerPosition.value.left = 200;
        }
        // 控制镜片垂直方向溢出
        if (layerPosition.value.top < 0) {
          layerPosition.value.top = 0;
        } else if (layerPosition.value.top > 200) {
          layerPosition.value.top = 200;
        }
        // 设置背景大图位置
        bgPosition.value = {
          x: -layerPosition.value.left * 2,
          y: -layerPosition.value.top * 2,
        };
      }
    });
    return { currentIndex, show, target, layerPosition, bgPosition };
  },
};
</script>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
