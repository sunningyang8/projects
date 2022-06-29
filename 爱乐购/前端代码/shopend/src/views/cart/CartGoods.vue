<template>
  <!--    购买商品信息-->
  <van-swipe-cell v-for="item in cartGoods" :key="item.id">
    <van-card
      :num="item.num"
      :price="item.goodsPrice"
      :title="item.goodsName"
      class="goods-card"
      :origin-price="item.goodsPrice"
      :thumb="item.image"
      currency
    >
      <template #footer>
        <van-stepper
          v-model="item.num"
          theme="round"
          button-size="22"
          disable-input
          @minus="dec(item.goodsId, item.num)"
          @plus="addSelf(item.goodsId, item.num)"
        />
      </template>
      <template #tags>
        <span style="font-size: 15px; color: red"
          >总价:¥ {{ count(item.num, item.goodsPrice) }}</span
        >
      </template>
    </van-card>
    <template #right>
      <van-button
        square
        text="删除"
        type="danger"
        class="delete-button"
        @click="dele(item.goodsId)"
      />
    </template>
  </van-swipe-cell>
</template>

<script>
import { watch, ref } from "vue";
import { useStore } from "vuex";
import { adsugoodsId, delegoodsId, obtainList } from "@/api/cart";
export default {
  name: "CartGoods",

  setup(props, { emit }) {
    // const route = useRouter();

    const { cartGoods, getData } = obtainGoods();
    getData();
    //自加商品数量按钮
    const addSelf = (goodsId, num) => {
      num++;
      adsugoodsId(goodsId, num).then(() => {
        getData();
      });
      // console.log(goodsId,num);
    };
    //自减商品数量按钮
    const dec = (goodsId, num) => {
      num--;
      adsugoodsId(goodsId, num).then(() => {
        getData();
      });
    };
    //删除商品.cartGoods
    const dele = (goodsId) => {
      delegoodsId(goodsId).then(() => {
        // console.log(112)
        getData();
        // console.log(11)
      });
    };
    //获取单个商品总价
    const count = (num, goodsPrice) => {
      return (num * goodsPrice).toFixed(2);
    };
    let counts = ref(0);
    console.log(counts);
    //获取商品总价

    watch(
      cartGoods,
      () => {
        emit("transGoods", { cartGoods });
      },
      {
        immediate: true,
      }
    );
    return {
      addSelf,
      dec,
      dele,
      cartGoods,
      count,
    };
  },
};
//获取购物车商品
function obtainGoods() {
  const store = useStore();
  // let cartGoods = reactive({
  //   arr: [],
  // });
  let cartGoods = ref("");
  const getData = () => {
    obtainList(store.state.user.profile.id).then((res) => {
      cartGoods.value = res.addlist;
    });
  };

  return {
    cartGoods,
    getData,
  };
}
</script>

<style scoped>
.goods-card {
  margin: 0;
  background-color: @white;
}

.delete-button {
  height: 100%;
}
</style>
