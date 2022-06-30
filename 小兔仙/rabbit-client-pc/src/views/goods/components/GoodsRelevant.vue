<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon"></i>
      <span class="title">{{ goodsId ? "同类商品推荐" : "猜你喜欢" }}</span>
    </div>
    <!-- 此处使用改造后的xtx-carousel.vue -->
    <XtxCarousel :carousels="carousels" />
  </div>
</template>

<script>
import { ref } from "vue";
import { getRelevantGoods } from "@/api/goods";
import { useRoute } from "vue-router";
// import _ from "lodash";

export default {
  name: "GoodsRelevant",
  props: {
    goodsId: {
      type: String,
      default: "",
    },
  },
  setup() {
    // 获取同类商品数据和用于获取同类商品数据的方法
    const { relevantGoods, getData, carousels } = useRelevantGoods();
    // 获取路由信息对象
    const route = useRoute();
    // 发送请求获取数据
    getData(route.params.id);
    return { relevantGoods, carousels };
  },
};
// 用于获取同类商品
function useRelevantGoods() {
  // 用于存储同类商品
  const relevantGoods = ref();
  // 用于存储轮播图数据
  const carousels = ref([]);
  // 用于向服务器端发送请求 获取同类商品数据
  const getData = (id, limit) => {
    // 原来的轮播图数据结构 [{},{},{}]
    // 现在需要的数据结构 [[{},{},{},{}], [{},{},{},{}]]
    // [1,2,3,4] => [[1,2], [3,4]]
    getRelevantGoods({ id, limit }).then((data) => {
      // 每页显示的数据条数
      const size = 4;
      // 总页数
      const total = Math.ceil(data.result.length / size);
      // 开始循环 循环次数为总页数
      for (let i = 0; i < total; i++) {
        // 构建二维数组
        carousels.value.push(data.result.slice(i * size, i * size + size));
      }
      // carousels.value = _.chunk(data.result, 4);
      // 存储同类商品数据
      relevantGoods.value = data.result;
    });
  };
  // 返回同类商品数据和用于获取同类商品数据的方法
  return { relevantGoods, getData, carousels };
}
</script>

<style scoped lang="less">
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid @xtxColor;
      border-right: 4px solid @xtxColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(@xtxColor, 40%);
      }
    }
  }
  :deep(.xtx-carousel) {
    height: 380px;
    .carousel {
      &-indicator {
        bottom: 30px;
        span {
          &.active {
            background: @xtxColor;
          }
        }
      }
      &-btn {
        top: 110px;
        opacity: 1;
        background: rgba(0, 0, 0, 0);
        color: #ddd;
        i {
          font-size: 30px;
        }
      }
    }
  }
}
</style>
