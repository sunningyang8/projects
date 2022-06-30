<script>
import { ref } from "vue";
import LearnJSXChild from "@/test/LearnJSXChild";

export default {
  name: "LearnJSX",
  setup() {
    // 测试 JSX 中的数据绑定
    const person = ref({ name: "张三", age: 20 });
    // 测试事件绑定
    const changePersonHandler = () => {
      person.value.name = "李四";
      person.value.age = 40;
    };
    // 测试类名绑定
    const activeClass = "active";
    // 测试 JSX 中的遍历语法
    const list = ref(["a", "b", "c"]);
    // 测试 JSX
    const paragraph = <p>我是 paragraph</p>;
    // 测试双向数据绑定
    const text = ref("");
    const onInputHandler = (event) => {
      text.value = event.target.value;
    };
    const onTextChangeHandler = (value) => {
      text.value = value;
    };
    return function () {
      return (
        <div>
          <span className={activeClass}>{person.value.name}</span>
          <span>{person.value.age}</span>
          <button onClick={changePersonHandler}>change person</button>
          <ul>
            {list.value.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
          {paragraph}
          <input type="text" value={text.value} onInput={onInputHandler} />
          <p>{text.value}</p>
          <button onClick={() => onTextChangeHandler("test test test")}>
            button
          </button>
          <LearnJSXChild msg={person.value} changePerson={changePersonHandler}>
            我是 LearnJSXChild 标记中间的内容
          </LearnJSXChild>
          <button
            onClick={() => this.$message({ type: "success", text: "success" })}
          >
            show message
          </button>
        </div>
      );
    };
  },
};
</script>
