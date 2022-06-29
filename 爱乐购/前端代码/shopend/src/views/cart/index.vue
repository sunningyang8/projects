<template>
  <shared>
    <van-tabs v-model:active="active">
      <van-tab title="未购买">
        <div style="margin-bottom: 26%">
          <!--    购买商品信息-->
          <van-swipe-cell v-for="item in cartGoods.arr" :key="item">
            <van-card
              :num="item.num"
              :price="item.goodsPrice"
              :title="item.goodsName"
              class="goods-card"
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
          <!--    结算组件-->
          <van-submit-bar
            style="margin-bottom: 50px"
            button-text="提交订单"
            :price="counts * 100"
            @submit="onSubmit"
          />
        </div>
      </van-tab>
      <van-tab title="已购买">
        <van-card
          v-for="item in purGoods.arr"
          :key="item"
          :num="item.num"
          :price="item.goodsPrice"
          :title="item.goodsName"
          class="goods-card"
          :thumb="item.image"
          currency
        >
          <template #footer>
            <van-button size="mini" @click="onDetails(item.goodsId)"
              >详情</van-button
            >
            <van-button size="mini" @click="onLogistics(item.id)"
              >物流信息</van-button
            >
          </template>
        </van-card>
      </van-tab>
    </van-tabs>
    <!--    购物车商品-->
  </shared>
</template>

<script>
import Shared from "@/components/Shared";
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { adsugoodsId, delegoodsId, obtainList } from "@/api/cart";
export default {
  name: "index",
  components: {
    Shared,
  },
  setup() {
    const { cartGoods, getData, counts, purGoods } = obtainGoods();
    getData();
    //自加商品数量按钮
    const addSelf = (goodsId, num) => {
      num++;
      adsugoodsId(goodsId, num).then(() => {
        counts.value = 0;
        getData();
      });
    };
    //自减商品数量按钮
    const dec = (goodsId, num) => {
      num--;
      adsugoodsId(goodsId, num).then(() => {
        counts.value = 0;
        getData();
      });
    };
    //删除商品.cartGoods
    const dele = (goodsId) => {
      delegoodsId(goodsId).then(() => {
        counts.value = 0;
        getData();
      });
    };
    //获取单个商品总价
    const count = (num, goodsPrice) => {
      return (num * goodsPrice).toFixed(2);
    };
    const router = useRouter();
    const onSubmit = () => {
      router.push("/purchase");
    }; //点击结算按钮触发
    const active = ref(0); //绑定当前选中标签的标识符
    const onClickTab = () => {
      console.log(111);
    };
    const onDetails = (goodsId) => {
      // console.log("详情", id);
      router.push(`/cartgoods/:${goodsId}`);
    };
    const onLogistics = (id) => {
      console.log("物流");
      router.push(`/logistics/:${id}`);
    };
    return {
      onSubmit,
      addSelf,
      dec,
      dele,
      cartGoods,
      count,
      counts,
      active,
      onClickTab,
      onDetails,
      onLogistics,
      purGoods,
    };
  },
};
//获取购物车商品
function obtainGoods() {
  const store = useStore();
  //未购买商品
  let cartGoods = reactive({
    arr: [],
  });
  //已购买商品
  let purGoods = reactive({
    arr: [],
  });
  let counts = ref(0);
  const getData = () => {
    obtainList(store.state.user.profile.id).then((res) => {
      // console.log(res)
      res.addlist.map((item) => {
        // console.log(item.goodsId, "item");
        if (item.postalCode != 1) {
          // cartGoods.arr.push(item);
          if (cartGoods.arr.length === 0) {
            cartGoods.arr.push(item);
            // console.log(cartGoods.arr.length)
          } else {
            cartGoods.arr.map((items) => {
              if (item.goodsId !== items.goodsId) {
                cartGoods.arr.push(item);
              }
            });
          }
          return (counts.value += item.num * item.goodsPrice);
        } else {
          purGoods.arr.push(item);
        }
      });
    });
  };

  return {
    cartGoods,
    getData,
    counts,
    purGoods,
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
