<template>
  <shared>
    <div class="commodity">
      <van-tree-select
        v-model:main-active-index="activeIndex"
        height="150vw"
        :items="topList"
        active-id="twoList.id"
        @click-nav="onHandleNav"
      >
        <template #content>
          <div class="cate_item" v-for="item in twoList" :key="item.id">
            <router-link :to="`/commodity/${item.id}?name=${item.name}`">
              <van-image width="5rem" :src="item.imag" />
              <p>{{ item.name }}</p>
            </router-link>
          </div>
        </template>
      </van-tree-select>
    </div>
  </shared>
</template>

<script>
import Shared from "@/components/Shared";
import { ref } from "vue";
// import { topCategory } from "@/api/commodity";
import { useStore } from "vuex";
import { twoCategory } from "@/api/commodity";
// import { methods   } from "vue";
export default {
  name: "index",
  setup() {
    let activeIndex = ref(0);
    let topList = ref(null); //一级分类
    const store = useStore();
    // console.log(store.state.commodity.list,"aa")
    topList.value = store.state.commodity.list;
    let twoList = ref(null); //二级分类
    // console.log(topList.value[activeIndex.value]["id"], 111);
    twoCategory(topList.value[activeIndex.value]["id"]).then(
      (data) => (twoList.value = data.twoCategory)
    );
    // console.log(twoList);
    // 点击左侧导航触发
    const onHandleNav = (index) => {
      // console.log(index, 222);
      twoCategory(topList.value[index]["id"]).then(
        (data) => (twoList.value = data.twoCategory)
      );
      activeIndex.value = index;
      // console.log(222);
    };
    // 点击右侧选项触发
    // const onClickRight=(item)=>{
    //   console.log(item,222);
    // }
    return {
      activeIndex,
      topList,
      twoList,
      onHandleNav,
    };
  },
  components: {
    Shared,
  },
};

//一级分类
// function itemize() {
//   let topList = ref(null);
//   const store = useStore();
//   // console.log(store.state.commodity.list,"aa")
//   topList.value=store.state.commodity.list
//
//   return {
//     topList
//   }
// }
//二级分类
// function erjimize(){
//   const store = useStore();
//   let twoList=ref(null)
//   twoCategory().then((data)=>twoList.)
// }
</script>

<style scoped>
a{
  text-decoration:none;
  color:#333;
}
.cate_item {
  float: left;
  text-align: center;
  text-decoration: none;
  color: #333;
}
</style>
