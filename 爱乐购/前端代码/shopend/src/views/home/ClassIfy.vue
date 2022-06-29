<template>
  <van-grid :column-num="5">
    <van-grid-item v-for="item in classfiy" :key="item.id" :text="item.name">
      <router-link :to="`/commodity/${item.id}`">
        <van-image :src="item.imgurl" />
      </router-link>
    </van-grid-item>
  </van-grid>
</template>

<script>
import { ref } from "vue";
import { classify } from "@/api/home";

export default {
  name: "ClassIfy",
  setup() {
    let classfiy = ref("");
    classify().then((data) => (classfiy.value = data.classifyList));
    return {
      classfiy,
    };
  },
};
</script>

<style scoped></style>
