<script>
import { useVModel } from "@vueuse/core";

export default {
  name: "XtxSteps",
  props: {
    step: {
      type: Number,
      default: 1,
    },
  },
  setup(props, { slots, emit }) {
    const defaults = slots.default();
    const result = [];
    defaults.forEach((item) => {
      if (typeof item.type === "symbol") {
        item.children.forEach((item) => result.push(item));
      } else {
        result.push(item);
      }
    });
    const step = useVModel(props, "step", emit);
    return function () {
      return (
        <div class="xtx-steps">
          {result.map((item, i) => (
            <div
              className={`xtx-steps-item ${
                i + 1 <= step.value ? "active" : ""
              }`}
            >
              <div className="step">
                <span>{i + 1}</span>
              </div>
              <div className="title">{item.props.title}</div>
              <div className="desc">{item.props.desc}</div>
            </div>
          ))}
        </div>
      );
    };
  },
};
</script>

<style lang="less">
.xtx-steps {
  display: flex;
  text-align: center;
  padding: 20px;
  &-item {
    flex: 1;
    &:first-child {
      .step {
        &::before {
          display: none;
        }
      }
    }
    &:last-child {
      .step {
        &::after {
          display: none;
        }
      }
    }
    &.active {
      .step {
        > span {
          border-color: @xtxColor;
          background: @xtxColor;
          color: #fff;
        }
        &::before,
        &::after {
          background: @xtxColor;
        }
      }
      .title {
        color: @xtxColor;
      }
    }
    .step {
      position: relative;
      > span {
        width: 48px;
        height: 48px;
        font-size: 28px;
        border: 2px solid #e4e4e4;
        background: #fff;
        border-radius: 50%;
        line-height: 44px;
        color: #ccc;
        display: inline-block;
        position: relative;
        z-index: 1;
      }
      &::after,
      &::before {
        content: "";
        position: absolute;
        top: 23px;
        width: 50%;
        height: 2px;
        background: #e4e4e4;
      }
      &::before {
        left: 0;
      }
      &::after {
        right: 0;
      }
    }
    .title {
      color: #999;
      padding-top: 12px;
    }
    .desc {
      font-size: 12px;
      color: #999;
      padding-top: 6px;
    }
  }
}
</style>
