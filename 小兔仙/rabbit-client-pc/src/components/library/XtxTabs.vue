<script>
import { useVModel } from "@vueuse/core";

export default {
  name: "XtxTabs",
  props: {
    current: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { slots, emit }) {
    // 控制选项卡索引
    const index = useVModel(props, "current", emit);
    // 选项卡切换
    const onTabClick = (i) => {
      index.value = i;
    };
    // 1. 收集选项卡标题和选项卡内容
    return function () {
      // 获取选项卡标题和选项卡内容的集合
      const defaults = slots.default();
      // 获取选项卡标题
      const titles = [];
      // 获取选项卡内容
      const contents = [];
      // 遍历当前组件的插槽内容
      defaults.forEach((item) => {
        // 判断当前节点是否是通过 v-for 生成的
        if (typeof item.type === "symbol") {
          // 遍历具体生成的内容
          item.children.forEach((child) => {
            // 判断当前是选项卡的标题还是选项卡的内容
            if (child.type.name === "XtxTabTitle") {
              titles.push(child);
            } else {
              contents.push(child);
            }
          });
        } else {
          // 判断当前是选项卡的标题还是选项卡的内容
          if (item.type.name === "XtxTabTitle") {
            titles.push(item);
          } else {
            contents.push(item);
          }
        }
      });

      return (
        <div className="xtx-tabs">
          <nav>
            {titles.map((title, i) => (
              <a
                className={i === index.value ? "active" : ""}
                href="javascript:"
                onClick={() => onTabClick(i)}
              >
                {title}
              </a>
            ))}
          </nav>
          {contents.map((item, i) => (
            <div className={i === index.value ? "active" : ""}>{item}</div>
          ))}
        </div>
      );
    };
  },
};
</script>

<style lang="less" scoped>
.xtx-tabs {
  background: #fff;
  > nav {
    height: 60px;
    line-height: 60px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    > a {
      width: 110px;
      border-right: 1px solid #f5f5f5;
      text-align: center;
      font-size: 16px;
      &.active {
        border-top: 2px solid @xtxColor;
        height: 60px;
        background: #fff;
        line-height: 56px;
      }
    }
  }
  > div {
    display: none;
    &.active {
      display: block;
    }
  }
}
</style>
