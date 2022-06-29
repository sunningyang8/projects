<template>
  <van-nav-bar
    title="爱乐购"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  
</template>

<script>
export default {
  setup() {
    const onClickLeft = () => history.back();
    return {
      onClickLeft,
    };
  },
};
</script>
 