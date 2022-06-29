<template>
  <div class="cz_live">
    <div class="mui-clearfix">
      <a href="#" class="cz_product" v-for="item in goods" :key="item.id">
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

<script>
import { useRouter } from "vue-router";
export default {
  name: "Goods",
  props: ["goods"],
  setup() {
    const router = useRouter();
    const goPay = (id) => {
      router.push({ path: `/cartgoods/:${id}` });
    };
    return {
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
}
.cz_product .box {
  width: 100%;
  box-shadow: 0 0 5px #ccc;
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
</style>
