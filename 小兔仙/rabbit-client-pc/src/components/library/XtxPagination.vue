<template>
  <div class="xtx-pagination">
    <!-- 如果当前页大于一 表示有上一页 渲染上一页按钮 -->
    <a
      v-if="currentPage > 1"
      href="javascript:"
      @click="currentPage = currentPage - 1"
      >上一页</a
    >
    <!-- 如果显示着的开始页码大于一 表示前面还有页码 渲染 -->
    <span v-if="pageInfo.start > 1">...</span>
    <a
      :class="{ active: item === currentPage }"
      :key="item"
      @click="currentPage = item"
      v-for="item in pageInfo.pageNumberAry"
      href="javascript:"
      >{{ item }}</a
    >
    <!-- 如果显示着的结束页码小于总页数 表示后面还有页码 渲染 -->
    <span v-if="pageInfo.end < pageInfo.totalPage">...</span>
    <!-- 如果当前页小于总页数 表示有下一页 渲染下一页按钮 -->
    <a
      v-if="currentPage < pageInfo.totalPage"
      href="javascript:"
      @click="currentPage = currentPage + 1"
      >下一页</a
    >
  </div>
</template>
<script>
import { computed } from "vue";
import { useVModel } from "@vueuse/core";

export default {
  name: "XtxPagination",
  props: {
    page: {
      type: Number,
      default: 1,
    },
    counts: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  setup(props, { emit }) {
    // 当前页
    const currentPage = useVModel(props, "page", emit);
    // 总数据条数
    const total = computed(() => props.counts);
    // 每页显示的数据条树
    const pageSize = computed(() => props.pageSize);
    // 页面中一次最多显示的页码数量
    const pageButtonMaxNumber = 5;
    // 页码的偏移量
    const pageOffset = Math.floor(pageButtonMaxNumber / 2);
    const pageInfo = computed(() => {
      // 计算总页数
      const totalPage = Math.ceil(total.value / pageSize.value);
      // 计算显示着的开始页码值
      let start = currentPage.value - pageOffset;
      // 计算显示着的结束页码值
      let end = start + pageButtonMaxNumber - 1;
      // 如果显示着的页码的小于1
      if (start < 1) {
        // 让显示着的页码等于1
        start = 1;
        // 重新计算结束页码
        let temp = start + pageButtonMaxNumber - 1;
        end = temp > totalPage ? totalPage : temp;
      }
      // 如果显示着的结束页码大于了总页数
      if (end > totalPage) {
        // 让显示着的结束页码等于总页数
        end = totalPage;
        // 重新计算开始页码
        let temp = end - pageButtonMaxNumber + 1;
        start = temp < 1 ? 1 : temp;
      }
      // 声明存储页码的数组git l
      let pageNumberAry = [];
      // 遍历生成页码数组
      for (let i = start; i <= end; i++) {
        pageNumberAry.push(i);
      }
      return { pageNumberAry, totalPage, start, end };
    });
    return { pageInfo, currentPage };
  },
};
</script>
<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
