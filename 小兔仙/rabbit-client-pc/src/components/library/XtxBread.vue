<script>
import { h } from "vue";
export default {
  name: "XtxBread",
  render() {
    // 插槽内容. 就是具体每一个面包屑选项
    const items = this.$slots.default();
    // 存储最终的布局结构
    const result = [];
    // 遍历具体的面包屑选项 在恰当的时候加 >
    items.forEach((item, index) => {
      result.push(item);
      // 判断当前是否是最后一项
      if (index < items.length - 1) {
        // 不是最后一项 加 >
        result.push(h("i", { class: "iconfont icon-angle-right" }));
      }
    });
    // 创建最外层元素, 将布局结果作为子元素
    return h("div", { class: "xtx-bread" }, result);
  },
};
</script>

<style scoped lang="less">
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
