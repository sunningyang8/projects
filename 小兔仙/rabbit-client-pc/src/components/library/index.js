import lazy from "@/components/directives/lazy";
import Message from "@/components/library/Message";

// 1. 获取模块的路径集合 获取模块的导入函数
const importFn = require.context("./", false, /\.vue$/);
// 2. 获取要导入的文件的路径
const keys = importFn.keys();

const library = {
  install(app) {
    app.directive("lazy", lazy);
    // 将 Message 方法添加到全局属性中
    app.config.globalProperties.$message = Message;
    // 遍历要导入的文件的路径
    keys.forEach((item) => {
      // 动态导入组件
      const component = importFn(item).default;
      // 注册组件
      app.component(component.name, component);
    });
  },
};

export default library;
