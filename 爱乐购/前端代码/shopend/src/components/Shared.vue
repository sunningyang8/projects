<template>
  <div class="container">
    <!-- 1. 标题 -->
    <header>
      <van-nav-bar
        style="position: fixed; right: 0; top: 0; width: 100%; "
        title="爱乐购"
        left-text="返回"
        right-text="搜索"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </header>
    <!-- 2.主体 -->
    <main style="margin-top:14%">
      <slot></slot>
    </main>
    <!-- 3.底部导航 -->
    <footer>
      <van-tabbar route>
        <van-tabbar-item replace icon="home-o" to="/">首页</van-tabbar-item>
        <van-tabbar-item replace icon="bag-o" to="/commodity"
          >分类</van-tabbar-item
        >
        <van-tabbar-item replace icon="shopping-cart-o" to="/cart"
          >购物车</van-tabbar-item
        >
        <van-tabbar-item replace icon="friends-o" to="/my"
          >我的</van-tabbar-item
        >
      </van-tabbar>
    </footer>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    //返回上一级
    const onClickLeft = () => router.go(-1);
    //搜索
    const onClickRight = () => {
      // console.log(222);
      router.push({ path: "/search" });
    };
    //搜索

    return {
      onClickLeft,
      onClickRight,
    };
  },
};
</script>
