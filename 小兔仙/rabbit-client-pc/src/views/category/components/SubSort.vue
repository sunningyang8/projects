<template>
  <div className="sub-sort">
    <div className="sort">
      <a
        @click="updateSortParams({ sortField: '', sortMethod: 'desc' })"
        href="javascript:"
        :class="{ active: sortParams.sortField === '' }"
        >默认排序</a
      >
      <a
        @click="updateSortParams({ sortField: 'publishTime' })"
        href="javascript:"
        :class="{ active: sortParams.sortField === 'publishTime' }"
        >最新商品</a
      >
      <a
        @click="updateSortParams({ sortField: 'orderNum' })"
        href="javascript:"
        :class="{ active: sortParams.sortField === 'orderNum' }"
        >最高人气</a
      >
      <a
        @click="updateSortParams({ sortField: 'evaluateNum' })"
        href="javascript:"
        :class="{ active: sortParams.sortField === 'evaluateNum' }"
        >评论最多</a
      >
      <a
        href="javascript:"
        @click="
          updateSortParams({
            sortField: 'price',
            sortMethod: sortParams.sortMethod === 'desc' ? 'asc' : 'desc',
          })
        "
      >
        价格排序
        <i
          :class="{ active: sortParams.sortMethod === 'asc' }"
          class="arrow up"
        ></i>
        <i
          class="arrow down"
          :class="{ active: sortParams.sortMethod === 'desc' }"
        ></i>
      </a>
    </div>
    <div className="check">
      <XtxCheckbox
        v-model="sortParams.inventory"
        @update:modelValue="updateSortParams({ inventory: $event })"
        >仅显示有货商品</XtxCheckbox
      >
      <XtxCheckbox
        v-model="sortParams.onlyDiscount"
        @update:modelValue="updateSortParams({ onlyDiscount: $event })"
        >仅显示特惠商品</XtxCheckbox
      >
    </div>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  name: "SubSort",
  setup(props, { emit }) {
    // 排序条件
    // 更新排序的方法
    const { sortParams, updateSortParams } = useSort(emit);
    return { sortParams, updateSortParams };
  },
};

function useSort(emit) {
  // 排序条件
  const sortParams = ref({
    // 排序字段
    sortField: "",
    // 排序方法
    sortMethod: "desc",
    // 库存
    inventory: false,
    // 特惠
    onlyDiscount: false,
  });
  // 更新排序的方法
  // {sortField: "publishTime"}
  const updateSortParams = (target) => {
    // 使用最新的排序条件覆盖原有的排序条件
    sortParams.value = {
      ...sortParams.value,
      ...target,
    };
    // 将用户选择的排序条件传递给父组件
    emit("onSortChanged", sortParams.value);
  };
  return { sortParams, updateSortParams };
}
</script>
<style scoped lang="less">
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .sort {
    display: flex;

    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all 0.3s;

      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }

      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;

        &.up {
          top: 3px;
          border-bottom-color: #bbb;

          &.active {
            border-bottom-color: @xtxColor;
          }
        }

        &.down {
          top: 15px;
          border-top-color: #bbb;

          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }

  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
