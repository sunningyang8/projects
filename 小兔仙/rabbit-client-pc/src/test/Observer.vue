<template>
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  <div ref="target">div</div>
</template>

<script>
import { useIntersectionObserver } from "@vueuse/core";
import { ref } from "vue";

export default {
  name: "Observer",
  setup() {
    // 1. 要监听的元素 ref
    const target = ref();
    const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
      // isIntersecting 元素是否进入可视区
      if (isIntersecting) {
        console.log("元素进入了可视区");
        stop();
      }
    });
    return { target };
  },
};
</script>

<style scoped></style>
