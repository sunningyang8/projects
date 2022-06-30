<template>
  <div class="goods-sku">
    <dl v-for="spec in specs" :key="spec.name">
      <dt>{{ spec.name }}</dt>
      <dd>
        <template v-for="value in spec.values" :key="value.name">
          <img
            @click="updateSelected(spec, value)"
            v-if="value.picture"
            :src="value.picture"
            :class="{ selected: value.selected, disabled: value.disabled }"
            alt=""
          />
          <span
            :class="{ selected: value.selected, disabled: value.disabled }"
            @click="updateSelected(spec, value)"
            v-else
            >{{ value.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import powerset from "@/vendors/powerSet";
export default {
  name: "GoodsSku",
  props: {
    // 用于在页面中渲染的供用户选择的规格数据
    specs: {
      type: Array,
      default: () => [],
    },
    // 当前商品可以组合的所有规格组合
    skus: {
      type: Array,
      default: () => [],
    },
    skuId: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    // 获取规格查询对象
    const pathMap = createPathMap(props.skus);
    // 更新规格的选中状态
    const updateSelected = (specs, value) => {
      // 如果当前规格已经是被禁用的
      if (value.disabled) {
        // 阻止程序向下执行
        return;
      }
      // 如果当前规格已经是选中的, 你还去点击它, 取消选中
      if (value.selected) {
        value.selected = false;
      } else {
        // 当前规格是没有被选中的 选中操作
        // 先将所有的取消选中
        specs.values.forEach((value) => {
          value.selected = false;
        });
        // 再让当前的进行选中
        value.selected = true;
      }
      // 更新规格的禁用状态
      updateDisabled(props.specs, pathMap);

      sendDataToParent(props.specs, pathMap, props.skus, emit);
    };
    // 更新规格的禁用状态
    updateDisabled(props.specs, pathMap);
    // 设置规格的默认选中效果
    setDefaultSelected(props.skuId, props.skus, props.specs);
    return { updateSelected };
  },
};
// 创建规格查询对象的方法
function createPathMap(skus) {
  // 规格查询对象
  const pathMap = {};
  // 遍历所有可以组合的规格组件
  skus.forEach((sku) => {
    // 判断当前规格组合是否有库存
    if (sku.inventory > 0) {
      // 获取当前可组合的规格的名称数组 ['黑色', '日本', '10cm']
      // [['黑色'], ['日本'], ['10cm'], ['黑色', '日本'], ['黑色', '10cm'], ['日本', '10cm']] ['黑色', '日本', '10cm']
      const names = sku.specs.map((item) => item.valueName);
      // 完整的规格的数量
      const max = names.length;
      // 获取当前可组合的规格名称的子集
      const sets = powerset(names).filter((item) => item.length > 0);
      sets.forEach((set) => {
        // '黑色' '日本' '10cm' '黑色_日本' '黑色_10cm' '日本_10cm'
        const key = set.join("_");
        if (!(key in pathMap)) {
          if (set.length === max) {
            // 完整的规格
            pathMap[key] = sku.id;
          } else {
            // 不完整的规格
            pathMap[key] = null;
          }
        }
      });
    }
  });
  // 返回规格查询对象
  return pathMap;
}
// 更新规格的禁用状态
function updateDisabled(specs, pathMap) {
  // 遍历规格数组
  specs.forEach((spec, index) => {
    // 获取到用户选择到的规格
    const selected = getSelected(specs);
    // 遍历当前规格的具体的规格选项
    spec.values.forEach((value) => {
      // 判断当前遍历到的规格是否已经是选中的
      if (value.selected) return;
      // 将当前遍历到的规格按照顺序存储到 selected 数组中
      selected[index] = value.name;
      // 将用户选择的规格名字和当前遍历到的规格名字进行组合
      const key = selected.filter((item) => item).join("_");
      console.log(key);
      // 如果在规格查询对象中没有当前规格
      value.disabled = !(key in pathMap);
    });
  });
}
// 获取用户选择的规格
function getSelected(specs) {
  // 用于存储用户选择的规格的名字的数组(按照顺序存储)
  const result = [];
  // 遍历在页面中渲染的供用户选择的规格数据
  specs.forEach((spec, index) => {
    // 在当前遍历的具体的规格数组中查找用户选中的规格
    const selected = spec.values.find((value) => value.selected);
    // 如果当前规格选项中有选中的
    if (selected) {
      // 将规格的名字按照顺序存储到结果数组中
      result[index] = selected.name;
    } else {
      // 如果当前规格项没有用户选中的, 使用 undefined 进行占位
      result[index] = undefined;
    }
  });
  // 返回用户选中的规格
  return result;
}
// 设置规格选项的默认选中效果
function setDefaultSelected(skuId, skus, specs) {
  // skuId 规格ID
  // specs 即将被设置状态的数据
  // skus 当前商品所有可组合的规格集合

  // 如果在调用当前组件时没有传递规格id
  if (!skuId) {
    // 阻止程序向下执行
    return;
  }
  // 从所有可组合的规格集合数组中查找当前要默认选中的规格对象
  const target = skus.find((sku) => sku.id === skuId);
  // 将要选中的规格的名字存储到数组中
  const names = target.specs.map((spec) => spec.valueName);
  // 遍历页面中渲染的供用户选择的规格数据
  specs.forEach((spec) => {
    spec.values.forEach((value) => {
      // 如果当前遍历的规格名字在 names 数组中
      if (names.includes(value.name)) {
        // 设置当前规格的选中效果
        value.selected = true;
      }
    });
  });
}
// 将用户选择的规格数据传递到父组件 以备使用
function sendDataToParent(specs, pathMap, skus, emit) {
  // 1. 获取用户选择的规格
  const selected = getSelected(specs).filter((item) => item);
  // 2. 判断用户选择的规格是否是完整的 如果是完整的才需要将数据传递到组件
  if (selected.length === specs.length) {
    // 3. 获取规格id
    const skuId = pathMap[selected.join("_")];
    // 4. 根据 skuId 在所有可组合的规格集合中查找规格对象
    const target = skus.find((sku) => sku.id === skuId);
    // 5. 将规格数据传递到父组件
    emit("onSpecChanged", {
      // 商品的规格ID, 将商品加入购物车时使用
      skuId,
      // 商品的现价 (更新视图)
      price: target.price,
      // 商品原价 (更新视图)
      oldPrice: target.oldPrice,
      // 商品的库存, 在用户选择商品数量的时候使用
      inventory: target.inventory,
      // 用户选择的规格名称字符串
      attrsText: target.specs
        .map((spec) => `${spec.name}: ${spec.valueName}`)
        .join(" "),
    });
  } else {
    // 当用户选择的不是一个完整规格的时候, 告诉父组件清除 skuId
    emit("onSpecHalfChanged");
  }
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  margin-bottom: 10px;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 5px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
