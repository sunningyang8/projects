import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import cart from "@/store/cart"
import commodity from "@/store/commodity"
import home from "@/store/home"
import user from "@/store/user"
const store = createStore({
  modules: {
    commodity,
    cart,
    home,user
  },
  plugins: [
    createPersistedState({
      paths: ["user", "commodity"],
      // 指定数据存储在 localStorage 中的名字
      key: "rabbit-client-pc",
    }),
  ],
});

export default store;
