<template>
  <van-search
    v-model="value"
    show-action
    left-icon="arrow-left"
    placeholder="请输入搜索关键词"
    @click-left-icon="onLeft"
    @search="onSearch"
  >
    <template #action>
      <div @click="onClickButton">搜索</div>
    </template>
  </van-search>
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

<script>
import { ref } from "vue";
// import { Toast } from "vant";
import { useRouter } from "vue-router";
import { search } from "@/api/search";
// import { computed } from "vue";
export default {
  name: "search",
  setup() {
    const router = useRouter();
    const onLeft = () => {
      //点击返回图标触发
      router.push({ path: "/" });
    };
    const { value, onSearch, onClickButton, goodsList } = searchList();
    const goPay = (id) => {
      router.push({ path: `/cartgoods/:${id}` });
    };
    return {
      onLeft,
      value,
      onSearch,
      onClickButton,
      goodsList,
      goPay,
    };
  },
};
function searchList() {
  const value = ref(""); //搜索内容
  let goodsList = ref("");
  // const goods = () => {
  //
  // };
  // console.log(goods)
  const onSearch = () => {
    //回车触发
    // console.log(111,value)
    if (!value.value.length) return;
    search(value.value).then((data) => (goodsList.value = data.search));
    value.value = "";
    // console.log(goodsList, "sss");
  };
  const onClickButton = () => {
    if (!value.value.length) return;
    search(value.value).then((data) => (goodsList.value = data.search));
    value.value = "";
    // console.log(goodsList, "list");
  }; //点击搜索按钮触发

  return {
    value,
    onSearch,
    onClickButton,
    goodsList,
  };
}
</script>

<style scoped>
.cz_live {
  padding: 0 10px;
  margin-top: 10px;
  overflow: hidden;
  padding-bottom: 100px;
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
