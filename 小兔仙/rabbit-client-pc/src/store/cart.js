import {
  addGoodsToServerCart,
  deleteGoodsOfServerCart,
  getServerCart,
  mergeServerCart,
  selectedOrNotSelected,
  updateGoodsOfCartBySkuId,
  updateGoodsOfServerCart,
} from "@/api/cart";

const cart = {
  // 使用命名空间模块
  namespaced: true,
  state() {
    return {
      list: [],
    };
  },
  mutations: {
    // 将商品加入购物车 (本地)
    addGoodsToCart(state, goods) {
      // 1. 查看当前要添加的商品是否已经在购物车中, 通过 findIndex 去查找
      const index = state.list.findIndex((item) => item.skuId === goods.skuId);

      if (index > -1) {
        // 找到了 累加商品数量
        state.list[index].count += goods.count;
        // 将该商品添加到购物车列表的顶部 ['b', 'a', 'c'] // ["b"]
        state.list.unshift(state.list.splice(index, 1)[0]);
      } else {
        // 没找到 直接将商品添加到购物车列表的顶部
        state.list.unshift(goods);
      }
    },
    // 删除购物车中的商品(skuId)
    deleteGoodsOfCart(state, skuId) {
      // 1. 通过skuId查找商品 返回商品的索引
      const index = state.list.findIndex((item) => item.skuId === skuId);
      // 2. 删除
      if (index > -1) {
        // slice 从数组中进行截取 返回截取数组
        // ["a", "b", "c", "d"]
        state.list = [
          ...state.list.slice(0, index),
          ...state.list.slice(index + 1),
        ];
      }
    },
    // 根据 skuId 更新商品信息
    updateGoodsBySkuId(state, partOfGoods) {
      // 根据 skuId 在购物车列表中查找要更新的商品
      const index = state.list.findIndex(
        (item) => item.skuId === partOfGoods.skuId
      );
      // 更新商品
      state.list[index] = {
        ...state.list[index],
        ...partOfGoods,
      };
    },
    // 设置状态
    setCart(state, payload) {
      state.list = payload;
    },
  },
  actions: {
    // 将商品加入购物车
    async addGoodsToCart({ rootState, commit, dispatch }, goods) {
      // 1. 如果要加入购物车的商品已经在购物车中了, 累加该商品的数量
      // 2. 新添加的商品要放置在购物车列表的顶部
      // 3. 判断用户是否登录, 如果登录, 操作服务器端购物车, 如果没有登录 操作本地购物车
      if (rootState.user.profile.token) {
        // 已登录
        // 将商品加入到服务器端购物车
        await addGoodsToServerCart({ skuId: goods.skuId, count: goods.count });
        // 将服务器端最新的购物车列表同步到本地
        dispatch("updateGoodsBySkuId");
      } else {
        // 未登录
        commit("addGoodsToCart", goods);
      }
    },
    // 删除购物车中的商品(skuId)
    async deleteGoodsOfCart({ rootState, commit, dispatch }, skuId) {
      // 判断用户是否登录
      if (rootState.user.profile.token) {
        // 已登录
        await deleteGoodsOfServerCart([skuId]);
        // 将服务器端最新的购物车列表同步到本地
        dispatch("updateGoodsBySkuId");
      } else {
        // 未登录
        commit("deleteGoodsOfCart", skuId);
      }
    },
    // 更新购物车中的商品信息 (自动更新)
    async updateGoodsBySkuId({ rootState, state, commit }) {
      // 判断用户是否登录
      if (rootState.user.profile.token) {
        // 已登录
        // 获取服务器端购物车列表
        let data = await getServerCart();
        // 重新赋值
        // state.list = data.result;
        commit("setCart", data.result);
      } else {
        // 未登录
        // 遍历购物车中的商品信息
        // 发送请求更新商品信息, 返回 Promise 数组
        const promiseAry = state.list.map((item) =>
          updateGoodsOfCartBySkuId(item.skuId)
        );
        // 按照顺序发送请求 按照顺序拿请求结果
        Promise.all(promiseAry).then((data) => {
          data.forEach((item, index) => {
            // 为商品添加 skuId
            // 因为我们要根据 skuId 更新本地购物车中的商品
            item.result.skuId = state.list[index].skuId;
            // 更新本地
            commit("updateGoodsBySkuId", item.result);
          });
        });
      }
    },
    // 更新购物车中的商品信息 (手动更新) (支持更新商品数量、支持更新商品的选中状态)
    async updateGoodsOfCartBySkuId(
      { rootState, commit, dispatch },
      partOfGoods
    ) {
      if (rootState.user.profile.token) {
        // 已登录
        // 向服务器端发送请求 更新商品信息
        // partOfGoods {skuId, count}
        // partOfGoods {skuId, selected}
        await updateGoodsOfServerCart(partOfGoods);
        // 将服务器端最新的购物车列表同步到本地
        dispatch("updateGoodsBySkuId");
      } else {
        // 未登录
        commit("updateGoodsBySkuId", partOfGoods);
      }
    },
    // 实现全选和全不选
    async selectedAll(
      { rootState, state, getters, commit, dispatch },
      isSelected
    ) {
      if (rootState.user.profile.token) {
        // 已登录
        // 收集要更改的商品的 skuId 数组
        const ids = getters.effectiveGoodsList.map((item) => item.skuId);
        // 向服务器端发送请求 更新商品的选中状态
        await selectedOrNotSelected({ selected: isSelected, ids });
        // 将服务器端最新的购物车列表同步到本地
        dispatch("updateGoodsBySkuId");
      } else {
        // 未登录
        state.list.forEach((item) => {
          commit("updateGoodsBySkuId", {
            skuId: item.skuId,
            selected: isSelected,
          });
        });
      }
    },
    // 批量删除用户选择的商品、清空无效商品
    async deleteManyGoodsOfCart(
      { rootState, getters, commit, dispatch },
      flag
    ) {
      // 判断用户是否登录
      if (rootState.user.profile.token) {
        // 已登录
        // 1. 收集要删除的商品的 skuId, 存储到一个数组中
        const ids = getters[flag].map((item) => item.skuId);
        // 2. 发送请求进行删除
        await deleteGoodsOfServerCart(ids);
        // 3. 将服务器端最新的购物车列表同步到本地
        dispatch("updateGoodsBySkuId");
      } else {
        // 未登录
        getters[flag].forEach((item) => {
          commit("deleteGoodsOfCart", item.skuId);
        });
      }
    },
    // 修改商品的规格信息
    async updateGoodsOfCartBySkuChanged(
      { rootState, state, commit, dispatch },
      { oldSkuId, newSku }
    ) {
      // 查找原有商品
      const index = state.list.findIndex((item) => item.skuId === oldSkuId);
      //  通过 oldSkuId 去查找原有商品
      //  通过 newSku 构建新的商品信息
      if (rootState.user.profile.token) {
        // 已登录
        // 删除原有商品
        await deleteGoodsOfServerCart([oldSkuId]);
        // 添加新的商品
        await addGoodsToServerCart({
          skuId: newSku.skuId,
          count: state.list[index].count,
        });
        // 3. 将服务器端最新的购物车列表同步到本地
        dispatch("updateGoodsBySkuId");
      } else {
        // 未登录

        // 构建新的商品
        const newGoods = {
          ...state.list[index],
          skuId: newSku.skuId,
          stock: newSku.inventory,
          oldPrice: newSku.oldPrice,
          nowPrice: newSku.price,
          attrsText: newSku.attrsText,
        };
        // 删除旧商品
        commit("deleteGoodsOfCart", oldSkuId);
        // 插入新商品
        commit("addGoodsToCart", newGoods);
      }
    },
    // 合并购物车
    async mergeCart({ state, commit }) {
      // 不需要判断用户是否登录, 因为该方法是在登录之后触发的
      const cart = state.list.map((item) => ({
        skuId: item.skuId,
        selected: item.selected,
        count: item.count,
      }));
      await mergeServerCart(cart);
      // 清空本地购物车
      commit("setCart", []);
    },
  },
  getters: {
    // 可购买的商品列表
    effectiveGoodsList(state) {
      // 1. 商品库存大于0
      // 2. isEffective 字段为真
      return state.list.filter((item) => item.stock > 0 && item.isEffective);
    },
    // 可购买的商品价格
    effectiveGoodsPrice(state, getters) {
      return getters.effectiveGoodsList.reduce((price, item) => {
        // 累加商品价格 商品数量*商品价格
        return price + item.count * Number(item.nowPrice);
      }, 0);
    },
    // 可购买的商品总数
    effectiveGoodsCount(state, getter) {
      return getter.effectiveGoodsList.reduce((count, item) => {
        return count + item.count;
      }, 0);
    },
    // 无效商品列表
    invalidGoodsList(state) {
      // 库存等于0
      // isEffective: false
      return state.list.filter((item) => item.stock === 0 || !item.isEffective);
    },
    // 用户选择的商品列表
    selectedGoodsList(state, getters) {
      return getters.effectiveGoodsList.filter((item) => item.selected);
    },
    // 用户选择的商品总价
    selectedGoodsPrice(state, getters) {
      return getters.selectedGoodsList.reduce((price, item) => {
        return price + item.count * Number(item.nowPrice);
      }, 0);
    },
    // 用户选择的商品数量
    selectedGoodsCount(state, getters) {
      return getters.selectedGoodsList.reduce((count, item) => {
        return count + item.count;
      }, 0);
    },
    // 计算全选按钮的状态
    selectAllButtonStatus(state, getters) {
      // 有效商品数量大于0
      // 用户选择的商品列表中的商品数据和有效商品列表中商品数量相同
      return (
        getters.effectiveGoodsCount > 0 &&
        getters.selectedGoodsCount === getters.effectiveGoodsCount
      );
    },
  },
};

export default cart;
