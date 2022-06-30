const user = {
  // 使用命名空间模块
  namespaced: true,
  state() {
    return {
      // 用户信息
      profile: {
        // 用户id
        id: "",
        // 用户头像
        avatar: "",
        // 用户昵称
        nickname: "",
        // 用户账号
        account: "",
        // 用户手机号
        mobile: "",
        // 用户登录凭证
        token: "",
      },
    };
  },
  mutations: {
    setUser(state, payload) {
      // 判断 payload 对象是否为空
      if (Object.keys(payload).length !== 0) {
        // 对象非空 设置用户信息
        state.profile = {
          ...state.profile,
          ...payload,
        };
      } else {
        // 空对象 // 清空用户信息
        state.profile = {};
      }
    },
  },
};

export default user;
