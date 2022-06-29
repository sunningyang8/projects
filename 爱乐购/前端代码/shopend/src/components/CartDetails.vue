<template>
  <div class="cartdetails">
    <!--   商品详情页面输入框-->
    <header>
      <form action="/">
        <van-search
          v-model="value"
          shape="round"
          background="#ff6900"
          placeholder="请输入搜索关键词"
          @click-input="onSearch"
        />
      </form>
    </header>
    <!--   主体-->
    <main>
      <!--商品详情页面商品展示图-->
      <div class="zhanshi">
        <img style="width: 100%; height: 100%" :src="goods.imgurl" />
      </div>
      <!--      商品介绍-->
      <van-cell-group inset border style="margin-top: 10px">
        <van-cell :title="`¥${goods.newprice}`" />
        <van-cell :title="goods.name" />
      </van-cell-group>
      <!--   商品详情-->
      <div style="margin-top: 10px">
        <div v-html="goods.imageer"></div>
      </div>
    </main>
    <!-- 商品详情页底部按钮-->
    <footer>
      <van-action-bar>
        <van-action-bar-icon icon="chat-o" text="客服" />
        <van-action-bar-icon icon="shop-o" text="店铺" />
        <!--  -->
        <van-action-bar-button
          color="#be99ff"
          type="warning"
          text="加入购物车"
          @click="hanldeAdd"
        />
        <van-action-bar-button
          color="#7232dd"
          type="danger"

          text="立即购买"
          @click="buyNow"
        />
      </van-action-bar>
    </footer>
  </div>
</template>

<script>
// import { reactive } from  'vue'
import { ref } from "vue";
import { useRouter } from "vue-router";
// import { newGoodsList } from "@/api/home";
import { cateGoriesList } from "@/api/commodity";
import { useStore } from "vuex";
import {  addlist,obtaingoodsId } from "@/api/cart";
import { Notify } from "vant";
// import { viewLogin } from "@/api/my";
// import { computed } from "vue";
export default {
  name: "CartDetails",
  setup() {
    const value = ref("");
    const router = useRouter();
    const store = useStore();
    const onSearch = () => {
      router.push({ path: "/search" });
    }; //点击输入框触发
    let { goods } = goodsList(); //首页商品
    // console.log(goods,11)
    const hanldeAdd = () => {//加入购物车按钮
      obtaingoodsId(goods.value.id).then((res) => {
        // console.log(store.state.user.profile.id,"goods.value.id")
        if (res.obtaingoodsId.length < 1) {
          addlist(
            store.state.user.profile.id,
            goods.value.num,
            goods.value.id,
            goods.value.name,
            goods.value.newprice,
            goods.value.image
          ).then(() => {
            router.push(`/cart/${goods.value.id}`)
          })
          Notify({ type: "success", message: "成功加入购物车" });
        } else {
          Notify({ type: "danger", message: "商品已加入过购物车" });
        }
      });
    };
    //立即购买商品
    const buyNow=()=>{
      // to="/purchase"
      obtaingoodsId(goods.value.id).then((res) => {
        // console.log(store.state.user.profile.id,"goods.value.id")
        if (res.obtaingoodsId.length < 1) {
          addlist(
            store.state.user.profile.id,
            goods.value.num,
            goods.value.id,
            goods.value.name,
            goods.value.newprice,
            goods.value.image
          ).then(() => {
            router.push(`/purchase`)
          })

        } else {
          Notify({ type: "danger", message: "商品已加入过购物车" });
        }
      });
    }
    return {
      value,
      onSearch,
      goods,
      hanldeAdd,buyNow
    };
  },
};
function goodsList() {
  let goods = ref("");
  const router = useRouter();
  // console.log(router.currentRoute.value,"router")
  let goodsId = router.currentRoute.value.params.id.slice(1);
  // console.log(goodsId, 333);
  cateGoriesList().then((data) =>
    data.cateGoriesList.filter((item) =>
      item.id == goodsId ? (goods.value = item) : []
    )
  );
  // console.log(goods, 111);
  // return computed(()=>{
  //   return goods.value.filter((item) => item)
  // })
  // let arr=goods.value._value.filter((item) => item)
  // console.log(arr,"arr")
  return { goods };
}
</script>

<style scoped>
.cartdetails {
  background-color: #f7f8fa;
}
/*.my-swipe .van-swipe-item {*/
/*  color: #fff;*/
/*  font-size: 20px;*/
/*  line-height: 150px;*/
/*  text-align: center;*/
/*  background-color: #39a9ed;*/
/*}*/
.zhanshi {
  width: 100%;
  height: 400px;
  /*border: 1px solid #000;*/
  /*overflow:hidden;*/
  background-color: pink;
}
</style>
