<template>
  <!--  头部返回-->
  <van-nav-bar
    title="结算"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <!--  配送地址-->
  <van-address-list
    v-model="chosenAddressId"
    :list="list"
    switchable
    add-button-text="结算"
    default-tag-text="默认"
    @edit="onEdit"
    @add="onAdd"
    style="padding-bottom: 0"
  />
  <!--商品列表-->
  <van-card
    v-for="item in cartGoods.arr"
    :key="item.id"
    :num="item.num"
    :price="item.goodsPrice"
    :title="item.goodsName"
    class="goods-card"
    :thumb="item.image"
    currency
  />
  <!--  总价-->
  <div style="color: red; width: 100%; height: 40px">
    <div style="margin-left: 80%; font-size: 20px">¥{{ count.toFixed(2) }}</div>
  </div>
  <!--  点击结算弹出框-->
  <van-action-sheet
    v-model:show="show"
    :actions="actions"
    cancel-text="取消"
    close-on-click-action
    @select="onSelect"
  />
</template>

<script>
import { reactive, ref } from "vue";
import { obtainList, purchaseLogo, settlement } from "@/api/cart";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "Purchase",
  setup() {
    const onClickLeft = () => history.back(); //返回上级
    const router = useRouter();
    let show = ref(false);
    const store = useStore();
    const actions = [
      { name: "微信支付" },
      { name: "支付宝" },
      { name: "余额" },
    ];
    const { list, getData, chosenAddressId } = settlementLabel();
    const { cartGoods, getGoods, count } = obtainGoods();
    // console.log(cartGoods, "cartGoods");
    getData();
    getGoods();
    //店家编辑按钮触发
    const onEdit = () => {
      router.push("/address");
    };
    //点击结算时触发
    const onAdd = () => {
      show.value = !show.value;
    };
    const onSelect = () => {
      //通过用户
      obtainList(store.state.user.profile.id).then((res) => {
        res.addlist.forEach((item) => {
          purchaseLogo(item.id).then(() => {
            router.push("/cart");
          });
        });
      });
    };
    return {
      onClickLeft,
      list,
      chosenAddressId,
      onEdit,
      onAdd,
      cartGoods,
      count,
      show,
      actions,

      onSelect,
    };
  },
};
//配送信息
function settlementLabel() {
  let list = ref([]);
  const store = useStore();
  let chosenAddressId = ref(0); //选中地址的id
  const getData = () => {
    settlement(store.state.user.profile.id).then((res) => {
      list.value = res.settlement.map((item) => {
        return {
          id: item.id,
          name: item.name,
          tel: item.tel,
          address: item.province + item.city + item.county + item.addressDetail,
          isDefault:
            item.isDefault === 1 ? (chosenAddressId.value = item.id) : null,
        };
      });
    });
  };
  return {
    list,
    getData,
    chosenAddressId,
  };
}
//购买商品
//获取购物车商品
function obtainGoods() {
  const store = useStore();
  let cartGoods = reactive({
    arr: [],
  });
  let count = ref(0); //总价格
  // let cartGoods = ref("");
  const getGoods = () => {
    obtainList(store.state.user.profile.id).then((res) => {
      // cartGoods.arr = res.addlist;
      res.addlist.map((item) => {
        // cartGoods.arr=item.tel?item:[]
        if (!item.postalCode) {
          cartGoods.arr.push(item);
          count.value += item.num * item.goodsPrice;
        }
      });
    });
  };
  return {
    cartGoods,
    getGoods,
    count,
  };
}
</script>

<style scoped></style>
