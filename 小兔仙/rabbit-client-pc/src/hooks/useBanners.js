import { ref } from "vue";
import { getBanners } from "@/api/home";

export default function useBanners() {
  // 用于存储轮播图数据
  const banners = ref();
  // 用于获取轮播图数据的方法
  // distributionSite 广告投放位置
  const getData = (distributionSite) => {
    // 获取数据
    getBanners(distributionSite).then((data) => {
      // 存储数据
      banners.value = data.result;
    });
  };
  return { banners, getData };
}
