<template>
  <van-nav-bar
    title="物流信息"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <van-steps active="2">
    <van-step>买家下单</van-step>
    <van-step>商家接单</van-step>
    <van-step>商家发货</van-step>
    <van-step>买家提货</van-step>
    <van-step>交易完成</van-step>
  </van-steps>
  <van-steps direction="vertical" :active="1" v-for="item in goodsList" :key="item.id">
    <van-step>
      <h3>{{item.province}}</h3>
      <p>2021-12-12 12:40</p>
    </van-step>
    <van-step>
      <h3>{{item.city}}</h3>
      <p>2022-01-01 10:00</p>
    </van-step>
    <van-step>
      <h3>{{item.county}}</h3>

    </van-step>
    <van-step>
      <h3>{{item.addressDetail}}</h3>

    </van-step>
  </van-steps>

</template>

<script>


import { useRouter } from "vue-router";
import { logistics } from "@/api/cart";
import { ref } from "vue";

export default {
  name: "Logistics",
  setup(){
    const onClickLeft = () => history.back(); //返回上级
    const router = useRouter();
  let goodsList=ref()
    logistics(router.currentRoute.value.params.id.slice(1,2)).then(res=>{
      goodsList.value=res.logistics
    })

    return{
      onClickLeft,goodsList
    }
  }
};
</script>

<style scoped>

</style>
