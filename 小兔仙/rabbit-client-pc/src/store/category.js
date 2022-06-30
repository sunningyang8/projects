import { getCategoriesApi } from "@/api/home";
import { topCategories } from "@/api/constants";

const category = {
  // 使用命名空间模块
  namespaced: true,
  state() {
    return {
      // [{name: "居家"}]
      list: topCategories.map((name) => ({ name })),
    };
  },
  mutations: {
    // 设置分类数据
    setCategories(state, payload) {
      state.list = payload;
    },
    open(state, id) {
      const index = state.list.findIndex((item) => item.id === id);
      state.list[index].open = true;
    },
    close(state, id) {
      const target = state.list.find((item) => item.id === id);
      target.open = false;
    },
  },
  actions: {
    // 获取分类数据commit
    getCategories({ commit }) {
      getCategoriesApi().then((data) => {
        data.result.forEach((item) => (item.open = false));
        commit("setCategories", data.result);
      });
    },
  },
};

export default category;
