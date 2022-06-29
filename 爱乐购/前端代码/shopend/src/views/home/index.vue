<template>
  <shared>
    <!--    轮播图-->
    <Swipe></Swipe>
    <!--    分类详情-->
    <ClassIfy></ClassIfy>
    <!--宫格组件-->
    <NavList></NavList>
<!--        展示商品组件-->
    <Goods :goods="goods"></Goods>
  </shared>
</template>

<script>
import Shared from "@/components/Shared";
import Swipe from "@/views/home/Swipe";
import NavList from "@/views/home/NavList";
import ClassIfy from "@/views/home/ClassIfy";
import Goods from "@/components/Goods";
import { ref } from "vue";
import { newGoodsList } from "@/api/home";

export default {
  name: "index",
  components: {
    Shared,
    Swipe,
    NavList,
    ClassIfy,
    Goods,
  },
  setup() {
    let { goods } = goodsList();//首页商品
    // console.log(goods, 111);
    return { goods };
  },
};
function goodsList() {
  let goods = ref("");
  newGoodsList().then((data) => (goods.value = data.goodsList));
  // console.log(222, goods);
  return { goods };
}
</script>

<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>
