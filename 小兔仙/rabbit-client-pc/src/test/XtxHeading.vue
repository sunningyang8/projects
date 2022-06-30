<script>
import { h } from "vue";
export default {
  name: "XtxHeading",
  props: {
    // 要创建的标题级别
    level: {
      type: Number,
      default: 5,
    },
  },
  render() {
    console.log(this);
    // h 方法用于创建元素
    // 1. 要渲染的标记的名字
    // 2. 标记属性 有就是对象类型 没有就传递 null
    // 3. 子元素, 没有可以不传, 有一个直接传, 有多个, 传数组, 文本直接写, 元素通过h方法进行创建
    return h(`h${this.level}`, null, this.$slots.default());
  },
};
</script>

<style scoped></style>
