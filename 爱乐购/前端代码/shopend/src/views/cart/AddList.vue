<template>
  <van-nav-bar
    title="地址"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <van-address-edit
    :area-list="areaList"
    :address-info="addressInfo ? addressInfo[0] : []"
    show-delete
    show-set-default
    show-search-result
    :search-result="searchResult"
    :area-columns-placeholder="['请选择', '请选择', '请选择']"
    @save="onSave"
    @delete="onDelete"
  />
</template>

<script>
import { ref } from "vue";

import { useRouter } from "vue-router";
import { areaList } from "@vant/area-data";
import { useStore } from "vuex";
import {
  deledistribution,
  distribution,
  modify,
  serveaddres,
  viewadress,
} from "@/api/cart";
import { Notify } from "vant";
export default {
  name: "AddList",
  setup() {
    const searchResult = ref([]);
    const router = useRouter();
    const store = useStore();
    const onClickLeft = () => router.back();
    let { getAddress, addressInfo } = modifyAddress();
    getAddress();
    //点击保存地址按钮
    const onSave = ({
      addressDetail,
      areaCode,
      city,
      country,
      county,
      isDefault,
      name,
      postalCode,
      province,
      tel,
    }) => {
      if (router.currentRoute.value.params.id) {
        //当修改配送信息时触发
        distribution(
          addressDetail,
          areaCode,
          city,
          country,
          county,
          isDefault ? 1 : 0,
          name,
          postalCode,
          province,
          tel,
          store.state.user.profile.id,
          router.currentRoute.value.params.id
        ).then(() => {
          router.push("/address");
        });
      } else {
        viewadress(store.state.user.profile.id).then((res) => {
          // console.log(res)
          // console.log(isDefault)
          if (res.viewadress.length == 0) {
            //当没有配送地址时触发
            serveaddres(
              addressDetail,
              areaCode,
              city,
              country,
              county,
              isDefault ? 1 : 0,
              name,
              postalCode,
              province,
              tel,
              store.state.user.profile.id
            ).then(() => {
              Notify({ type: "success", message: "保存成功" });
              router.push("/address");
            });
          } else {
            res.viewadress.forEach((item) => {
              //当配送地址中有默认配送并且当前也为默认地址就执行
              if (item.isDefault && isDefault) {
                // console.log("虚假")
                Notify({ type: "warning", message: "默认收获地址已选择过" });
              } else {
                // 根据userid修改配送地址
                serveaddres(
                  addressDetail,
                  areaCode,
                  city,
                  country,
                  county,
                  isDefault ? 1 : 0,
                  name,
                  postalCode,
                  province,
                  tel,
                  store.state.user.profile.id
                ).then(() => {
                  Notify({ type: "success", message: "保存成功" });
                  router.push("/address");
                });
                //当添加成功一次之后就停止循环
                throw "中断循环";
              }
            });
          }
        });
      }
    };
    const onDelete = () => {
      deledistribution(router.currentRoute.value.params.id).then(() => {
        router.push("/address");
      });
    };
    return {
      onSave,
      onDelete,
      onClickLeft,
      searchResult,
      areaList,
      addressInfo,
    };
  },
};
//修改后内容显示在输入框内
function modifyAddress() {
  const router = useRouter();
  // console.log(router.currentRoute.value.params.id)
  let addressInfo = ref("");
  const getAddress = () => {
    if (router.currentRoute.value.params.id) {
      modify(router.currentRoute.value.params.id).then((res) => {
        addressInfo.value = res.modify;
      });
    }
  };
  return {
    getAddress,
    addressInfo,
  };
}
</script>

<style scoped></style>
