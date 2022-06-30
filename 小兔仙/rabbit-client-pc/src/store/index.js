import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import user from "@/store/user";
import cart from "@/store/cart";
import category from "@/store/category";

const store = createStore({
  modules: {
    user,
    cart,
    category,
  },
  plugins: [
    createPersistedState({
      paths: ["user", "cart"],
      // 指定数据存储在 localStorage 中的名字
      key: "rabbit-client-pc",
    }),
  ],
});

export default store;
