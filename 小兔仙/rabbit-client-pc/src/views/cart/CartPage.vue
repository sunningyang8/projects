<template>
  <AppLayout>
    <div class="cart-page">
      <div class="container">
        <XtxBread>
          <XtxBreadItem path="/">首页</XtxBreadItem>
          <XtxBreadItem>购物车</XtxBreadItem>
        </XtxBread>
        <div class="cart">
          <table>
            <thead>
              <tr>
                <th>
                  <XtxCheckbox
                    :modelValue="selectAllButtonStatus"
                    @update:modelValue="
                      $store.dispatch('cart/selectedAll', $event)
                    "
                    >全选</XtxCheckbox
                  >
                </th>
                <th>商品信息</th>
                <th>单价</th>
                <th>数量</th>
                <th>小计</th>
                <th>操作</th>
              </tr>
            </thead>
            <!-- 有效商品 -->
            <tbody>
              <tr v-if="effectiveGoodsCount === 0">
                <td colspan="6">
                  <EmptyCart />
                </td>
              </tr>
              <tr v-else v-for="item in effectiveGoodsList" :key="item.id">
                <td>
                  <XtxCheckbox
                    :modelValue="item.selected"
                    @update:modelValue="
                      $store.dispatch('cart/updateGoodsOfCartBySkuId', {
                        skuId: item.skuId,
                        selected: $event,
                      })
                    "
                  />
                </td>
                <td>
                  <div class="goods">
                    <RouterLink :to="`/goods/${item.id}`"
                      ><img :src="item.picture" alt=""
                    /></RouterLink>
                    <div>
                      <p class="name ellipsis">
                        {{ item.name }}
                      </p>
                      <!-- 选择规格组件 -->
                      <CartSku
                        :skuId="item.skuId"
                        :attrsText="item.attrsText"
                      />
                    </div>
                  </div>
                </td>
                <td class="tc">
                  <p>&yen;{{ item.nowPrice }}</p>
                  <p v-if="item.price - item.nowPrice > 0">
                    比加入时降价
                    <span class="red"
                      >&yen;{{ (item.price - item.nowPrice).toFixed(2) }}</span
                    >
                  </p>
                </td>
                <td class="tc">
                  <XtxNumberBox
                    :max="item.stock"
                    :modelValue="item.count"
                    @update:modelValue="
                      $store.dispatch('cart/updateGoodsOfCartBySkuId', {
                        skuId: item.skuId,
                        count: $event,
                      })
                    "
                  ></XtxNumberBox>
                </td>
                <td class="tc">
                  <p class="f16 red">
                    &yen;{{ (item.count * Number(item.nowPrice)).toFixed(2) }}
                  </p>
                </td>
                <td class="tc">
                  <p><a href="javascript:">移入收藏夹</a></p>
                  <p>
                    <a
                      @click="deleteGoodsOfCartBySkuId(item.skuId)"
                      class="green"
                      href="javascript:"
                      >删除</a
                    >
                  </p>
                  <p><a href="javascript:">找相似</a></p>
                </td>
              </tr>
            </tbody>
            <!-- 无效商品 -->
            <tbody>
              <tr>
                <td colspan="6"><h3 class="tit">失效商品</h3></td>
              </tr>
              <tr v-for="item in invalidGoodsList" :key="item.id">
                <td></td>
                <td>
                  <div class="goods">
                    <RouterLink :to="`/goods/${item.id}`"
                      ><img :src="item.picture" alt=""
                    /></RouterLink>
                    <div>
                      <p class="name ellipsis">
                        {{ item.name }}
                      </p>
                      <p class="attr">
                        {{ item.attrsText }}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="tc">
                  <p>&yen;{{ item.nowPrice }}</p>
                </td>
                <td class="tc">{{ item.count }}</td>
                <td class="tc">
                  <p>
                    &yen;{{ (item.count * Number(item.nowPrice)).toFixed(2) }}
                  </p>
                </td>
                <td class="tc">
                  <p><a class="green" href="javascript:">删除</a></p>
                  <p><a href="javascript:">找相似</a></p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 操作栏 -->
        <div class="action">
          <div class="batch">
            <XtxCheckbox>全选</XtxCheckbox>
            <a
              @click="deleteGoodsOfCart('selectedGoodsList')"
              href="javascript:"
              >删除商品</a
            >
            <a href="javascript:">移入收藏夹</a>
            <a @click="deleteGoodsOfCart('invalidGoodsList')" href="javascript:"
              >清空失效商品</a
            >
          </div>
          <div class="total">
            共 {{ effectiveGoodsCount }} 件商品，已选择
            {{ selectedGoodsCount }} 件，商品合计：
            <span class="red">¥{{ selectedGoodsPrice }}</span>
            <XtxButton type="primary" @click="jumpToCheckout"
              >下单结算</XtxButton
            >
          </div>
        </div>
        <!-- 猜你喜欢 -->
        <GoodsRelevant />
      </div>
    </div>
  </AppLayout>
</template>
<script>
import GoodsRelevant from "@/views/goods/components/GoodsRelevant";
import AppLayout from "@/components/AppLayout";
import { useStore } from "vuex";
import { computed } from "vue";
import EmptyCart from "@/views/cart/components/EmptyCart";
import Confirm from "@/components/library/Confirm";
import Message from "@/components/library/Message";
import CartSku from "@/views/cart/components/CartSku";
import { useRouter } from "vue-router";
export default {
  name: "CartPage",
  components: { CartSku, EmptyCart, GoodsRelevant, AppLayout },
  setup() {
    // 获取 store 对象
    const store = useStore();
    // 获取到路由对象
    const router = useRouter();
    // 更新购物车中的商品数据
    store.dispatch("cart/updateGoodsBySkuId");
    // 获取有效商品列表
    const effectiveGoodsList = computed(
      () => store.getters["cart/effectiveGoodsList"]
    );
    // 获取有效商品的数量
    const effectiveGoodsCount = computed(
      () => store.getters["cart/effectiveGoodsCount"]
    );
    // 获取无效商品列表
    const invalidGoodsList = computed(
      () => store.getters["cart/invalidGoodsList"]
    );
    // 获取用户选择的商品总价
    const selectedGoodsPrice = computed(
      () => store.getters["cart/selectedGoodsPrice"]
    );
    // 获取用户选择的商品总数
    const selectedGoodsCount = computed(
      () => store.getters["cart/selectedGoodsCount"]
    );
    // 获取全选按钮的状态
    const selectAllButtonStatus = computed(
      () => store.getters["cart/selectAllButtonStatus"]
    );
    // 删除商品
    const deleteGoodsOfCartBySkuId = (skuId) => {
      // 当用户点击删除按钮的时候 和用户进行确认
      // Confirm({
      //   content: "您确定要删除购物车中的该商品吗",
      //   // 当用户点击了确认按钮的时候
      //   onSureButtonClick() {
      //     // 执行删除操作
      //     store.dispatch("cart/deleteGoodsOfCart", skuId);
      //   },
      // });
      Confirm({
        content: "您确定要删除购物车中的该商品吗",
      })
        .then(() => {
          // 执行删除操作
          store.dispatch("cart/deleteGoodsOfCart", skuId);
        })
        .catch(() => {
          // alert("执行取消逻辑");
        });
    };
    // 批量删除用户选择的商品、清空无效商品
    const deleteGoodsOfCart = (flag) => {
      // 确认框的提示内容
      let content = "";
      if (flag === "selectedGoodsList") {
        if (selectedGoodsCount.value === 0) {
          Message({ type: "warn", text: "至少要选中一件商品" });
          return;
        }
        // 批量删除用户选择的商品
        content = "您确定要删除选中的商品吗";
      } else if (flag === "invalidGoodsList") {
        // 清空无效商品
        if (invalidGoodsList.value.length === 0) {
          Message({ type: "warn", text: "没有无效商品" });
          return;
        }
        content = "您确定要删除无效商品吗";
      }
      // 和用户进行确认
      Confirm({ content }).then(() => {
        // 当用户点击确认按钮的时候 执行删除操作
        store.dispatch("cart/deleteManyGoodsOfCart", flag);
      });
    };
    // 跳转到结算页面
    const jumpToCheckout = () => {
      // 判断购物车列表中是否存在用户选择的商品
      if (selectedGoodsCount.value === 0) {
        Message({ type: "warn", text: "请选择商品" });
        return;
      }
      // 跳转到结算页面
      router.push("/checkout/order");
    };
    return {
      effectiveGoodsList,
      invalidGoodsList,
      selectedGoodsPrice,
      selectedGoodsCount,
      effectiveGoodsCount,
      selectAllButtonStatus,
      deleteGoodsOfCartBySkuId,
      deleteGoodsOfCart,
      jumpToCheckout,
    };
  },
};
</script>
<style scoped lang="less">
.tc {
  text-align: center;
  .xtx-number-box {
    margin: 0 auto;
    width: 120px;
  }
}
.red {
  color: @priceColor;
}
.green {
  color: @xtxColor;
}
.f16 {
  font-size: 16px;
}
.goods {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}
.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;
  .xtx-checkbox {
    color: #999;
  }
  .batch {
    a {
      margin-left: 20px;
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}
.cart-page {
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      width: 100%;
      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>
