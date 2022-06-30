<template>
  <div class="xtx-infinite-loading" ref="target">
    <div class="loading" v-if="loading">
      <span class="img"></span>
      <span class="text">正在加载...</span>
    </div>
    <div class="none" v-if="finished">
      <span class="img"></span>
      <span class="text">亲，没有更多了</span>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

export default {
  name: "XtxInfiniteLoading",
  props: {
    // 控制 正在加载 是否显示
    loading: {
      type: Boolean,
      default: false,
    },
    // 控制 是否还有更多数据可以加载 是否显示
    finished: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    // 获取要监听的元素
    const target = ref();
    // 监听元素是否进入可视区
    useIntersectionObserver(target, ([{ isIntersecting }]) => {
      // 进入可视区
      if (isIntersecting) {
        // 如果当前没有在执行加载操作
        // 如果当前还有更多数据可以加载
        if (!props.loading && !props.finished) {
          // 告诉父级你可以做你想做的事情了
          emit("infinite");
        }
      }
    });
    return { target };
  },
};
</script>
<style scoped lang="less">
.xtx-infinite-loading {
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 50px;
      height: 50px;
      background: url(../../assets/images/load.gif) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
  .none {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 200px;
      height: 134px;
      background: url(../../assets/images/none.png) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
}
</style>
