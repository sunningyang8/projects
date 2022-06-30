<template>
  <AppLayout>
    <div class="xtx-goods-page" v-if="goodsDetail">
      <div class="container">
        <!-- 面包屑 -->
        <XtxBread>
          <XtxBreadItem path="/">首页</XtxBreadItem>
          <XtxBreadItem :path="`/category/${goodsDetail.categories[1].id}`">{{
            goodsDetail.categories[1].name
          }}</XtxBreadItem>
          <XtxBreadItem
            :path="`/category/sub/${goodsDetail.categories[0].id}`"
            >{{ goodsDetail.categories[0].name }}</XtxBreadItem
          >
          <XtxBreadItem>{{ goodsDetail.name }}</XtxBreadItem>
        </XtxBread>
        <!-- 商品信息 -->
        <div class="goods-info">
          <!-- 左侧 -->
          <div class="media">
            <GoodsImages :images="goodsDetail.mainPictures" />
            <!-- 商品售卖组件 -->
            <GoodsSales />
          </div>
          <!-- 右侧 -->
          <div class="spec">
            <GoodsInfo :goods="goodsDetail" />
            <!-- 规格组件 skuId="1369155865461919746" -->
            <!-- 当用户选择的不是一个完整规格的时候 清除 skuId -->
            <GoodsSku
              @onSpecChanged="onSpecChanged"
              @onSpecHalfChanged="goodsDetail.currentSkuId = null"
              :skus="goodsDetail.skus"
              :specs="goodsDetail.specs"
            />
            <!-- 商品数量选择组件 -->
            <XtxNumberBox
              label="数量"
              v-model="goodsCount"
              :max="goodsDetail.inventory"
            />
            <!-- 加入购物车 -->
            <XtxButton
              @click="addGoodsToCart"
              type="primary"
              style="margin-top: 15px"
              >加入购物车</XtxButton
            >
          </div>
        </div>
        <!-- 商品推荐 -->
        <GoodsRelevant :goodsId="goodsDetail.id"></GoodsRelevant>
        <!-- 商品详情 -->
        <div class="goods-footer">
          <div class="goods-article">
            <!-- 商品+评价 -->
            <GoodsTab />
            <!-- 注意事项 -->
            <GoodsWarn />
          </div>
          <!-- 24热榜 -->
          <div class="goods-aside">
            <GoodsHot :type="1" />
            <GoodsHot :type="2" />
            <GoodsHot :type="3" />
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import GoodsRelevant from "@/views/goods/components/GoodsRelevant";
import AppLayout from "@/components/AppLayout";
import { provide, ref } from "vue";
import { getGoodsDetail } from "@/api/goods";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import GoodsImages from "@/views/goods/components/GoodsImages";
import GoodsSales from "@/views/goods/components/GoodsSales";
import GoodsInfo from "@/views/goods/components/GoodsInfo";
import GoodsSku from "@/views/goods/components/GoodsSku";
import GoodsTab from "@/views/goods/components/GoodsTab";
import GoodsHot from "@/views/goods/components/GoodsHot";
import GoodsWarn from "@/views/goods/components/GoodsWarn";
import Message from "@/components/library/Message";
import { useStore } from "vuex";
export default {
  name: "GoodsDetailPage",
  components: {
    GoodsWarn,
    GoodsHot,
    GoodsTab,
    GoodsSku,
    GoodsInfo,
    GoodsSales,
    GoodsImages,
    GoodsRelevant,
    AppLayout,
  },
  setup() {
    // 获取商品详情数据以及获取商品详情数据的方法
    const { goodsDetail, getData } = useGoodsDetail();
    // 获取路由信息对象
    const route = useRoute();
    // 获取 store 对象
    const store = useStore();
    // 用于存储用户选择的商品数量
    const goodsCount = ref(1);
    // 发送请求获取商品详情信息
    getData(route.params.id);
    // 当用户选择完整的规格以后 更新视图
    const onSpecChanged = (data) => {
      goodsDetail.value.price = data.price;
      goodsDetail.value.oldPrice = data.oldPrice;
      goodsDetail.value.inventory = data.inventory;
      goodsDetail.value.currentSkuId = data.skuId;
      goodsDetail.value.currentAttrsText = data.attrsText;
    };
    // 将商品详情数据开放到子组件
    provide("goodsDetail", goodsDetail);
    // 将商品加入到购物车中
    const addGoodsToCart = () => {
      // 1. 判断用户是否选择了规格, 如果用户没有选择规格的话, 不能让他将商品加入购物车
      if (!goodsDetail.value.currentSkuId) {
        Message({ type: "warn", text: "请选择商品规格" });
        return;
      }
      // 2. 收集商品信息
      const goods = {
        // 商品id
        id: goodsDetail.value.id,
        // 商品 skuId
        skuId: goodsDetail.value.currentSkuId,
        // 商品名称
        name: goodsDetail.value.name,
        // 商品规格属性文字
        attrsText: goodsDetail.value.currentAttrsText,
        // 商品图片
        picture: goodsDetail.value.mainPictures[0],
        // 商品原价
        price: goodsDetail.value.oldPrice,
        // 商品现价
        nowPrice: goodsDetail.value.price,
        // 是否选中
        selected: true,
        // 商品库存
        stock: goodsDetail.value.inventory,
        // 用户选择的商品数量
        count: goodsCount.value,
        // 是否为有效商品
        isEffective: true,
      };
      // 3. 将商品加入购物车
      store.dispatch("cart/addGoodsToCart", goods);
    };
    return { goodsDetail, onSpecChanged, goodsCount, addGoodsToCart };
  },
};
// 用于获取商品详细信息的方法
function useGoodsDetail() {
  // 用于存储商品详情信息
  const goodsDetail = ref();
  // 用于获取商品详情信息的方法
  const getData = (id) => {
    // 向服务器端发送请求获取商品详情信息
    getGoodsDetail(id).then((data) => {
      // 用于存储商品详情信息
      goodsDetail.value = data.result;
    });
  };
  // 当路由参数发生变化的时候 (商品id)
  onBeforeRouteUpdate((to) => {
    // 重新向服务器端发送请求获取商品详情数据
    getData(to.params.id);
  });
  // 返回商品详情数据和获取商品详情数据的方法
  return { goodsDetail, getData };
}
</script>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
