<template>
  <div class="grid">
    <van-grid :border="false" :column-num="3">
      <van-grid-item v-for="item in gridlist" :key="item.id">
        <van-image :src="item.imgurl" />
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { ref } from "vue";
import { homeNavList } from "@/api/home";

export default {
  name: "NavList",
  setup(){
    let gridlist=ref("")
    homeNavList().then((data)=>
      gridlist.value=data.navList)
    // console.log(gridlist)
    return {gridlist}
  }
};
</script>

<style scoped>

</style>
