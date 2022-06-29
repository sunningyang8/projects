<template>
  <!-- <Shared> -->
  <!--    <p></p>-->
  <NavTop />
  <van-divider
    :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
  >
    {{ route.currentRoute.value.query.name }}
  </van-divider>
  <hr class="hr-shadow" />
  <template v-if="goodsList.length">
    <div class="cz_live">
      <div class="mui-clearfix">
        <a href="#" class="cz_product" v-for="item in goodsList" :key="item.id">
          <div class="box">
            <img :src="item.image" alt="" />
            <p class="name">{{ item.name }}</p>
            <p>
              <span class="price">¥{{ item.newprice }}</span>
              <span class="oldPrice">¥{{ item.price }}</span>
            </p>

            <van-button
              color="linear-gradient(to right, #ff8c00, #ff5400)"
              round
              size="normal"
              @click.prevent="goPay(item.id)"
            >
              <p>立即购买</p>
            </van-button>
          </div>
        </a>
      </div>
    </div>
  </template>
  <template v-else>
    <van-empty
      class="custom-image"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      description="此类商品已售xin"
    />
  </template>
  <!-- </Shared> -->
</template>

<script>
import NavTop from "@/components/NavTop";
import { useRouter } from "vue-router";
import { cateGories } from "@/api/commodity";
import { ref } from "vue";
export default {
  name: "categories",
  components: {
    NavTop,
  },
  setup() {
    const route = useRouter();
    // let list=ref(false)
    // console.log(route.currentRoute.value);
    let goodsList = ref("");
    cateGories(route.currentRoute.value.params.id).then(
      (data) => (goodsList.value = data.cateGories)
    );
    // console.log(goodsList, "goodsList");
    const goPay = (id) => {
      route.push({ path: `/cartgoods/:${id}` });
    };
    return {
      route,
      goodsList,
      goPay,
    };
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #333;
}
.hr-shadow {
  border: 0;
  padding-top: 10px;
  color: #fffcf9;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: inset 0 10px 10px -10px;
}
.cz_live {
  margin-top: 10px;
  overflow: hidden;
  padding: 0 10px 100px;
}

.mui-clearfix:after {
  content: "020";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.mui-clearfix {
  /* 触发 hasLayout */
  zoom: 1;
}

.cz_product {
  float: left;
  width: 50%;
  padding: 0 5px;
  margin-bottom: 10px;
  box-sizing: border-box;
  text-decoration: none;
  color: #333;
}
.cz_product .box {
  width: 100%;
  box-shadow: 1px 0 5px #ccc;
  text-align: center;
  padding: 10px 0;
}
.cz_product .box img {
  width: 100%;
}
.cz_product .box .name {
  padding: 0 10px;
  height: 36px;
  line-height: 18px;
  overflow: hidden;
}
.cz_product .box .price {
  font-size: 12px;
  color: #f30;
  margin-right: 10px;
}
.cz_product .box .oldPrice {
  font-size: 12px;
  color: #ccc;
  text-decoration: line-through;
}
.cz_product .box .button {
  background: #006699;
  color: #fff;
}

.custom-image .van-empty__image {
  width: 90px;
  height: 90px;
}
</style>
