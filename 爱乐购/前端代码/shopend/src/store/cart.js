export default {
  namespaced: true,
  state() {
    return {
      list: [],
    };
  },
  mutations: {
    cartList(state, payload) {
      state.list = payload;
      console.log(state.list,11)
    },
  },
  actions: {},
  modules: {},
};
