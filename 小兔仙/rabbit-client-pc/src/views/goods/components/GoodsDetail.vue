<template>
  <div class="goods-detail">
    <!-- 属性 -->
    <ul class="attrs">
      <li
        v-for="property in goodsDetail.details.properties"
        :key="property.name"
      >
        <span class="dt">{{ property.name }}</span>
        <span class="dd">{{ property.value }}</span>
      </li>
    </ul>
    <!-- 图片 -->
    <img
      :src="picture"
      alt=""
      v-for="picture in goodsDetail.details.pictures"
      :key="picture"
    />
  </div>
</template>

<script>
import { inject } from "vue";

export default {
  name: "GoodsDetail",
  setup() {
    const goodsDetail = inject("goodsDetail");
    return { goodsDetail };
  },
};
</script>

<style scoped lang="less">
.goods-detail {
  padding: 40px;
  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;
      .dt {
        width: 100px;
        color: #999;
      }
      .dd {
        flex: 1;
        color: #666;
      }
    }
  }
  > img {
    width: 100%;
  }
}
</style>
