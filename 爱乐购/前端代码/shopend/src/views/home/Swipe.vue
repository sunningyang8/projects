<template>
  <van-swipe :autoplay="3000" lazy-render>
    <van-swipe-item v-for="image in swipers" :key="image.id">
      <van-image :src="image.imgurl" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import { ref } from "vue";
import { homeswipers } from "@/api/home";
export default {
  name: "Swipe",
  setup() {
    let swipers = ref("");
    homeswipers().then((data) => {
      swipers.value = data.swipers;
    });
    // console.log(swipers)
    return {
      swipers,
    };
  },
};
</script>

<style scoped>
</style>
