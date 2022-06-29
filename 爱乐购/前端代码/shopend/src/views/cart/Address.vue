<template>
  <van-nav-bar
    title="配送地址"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <van-address-list
    v-model="chosenAddressId"
    switchable
    :list="list"
    @add="onAdd"
    @edit="onEdit"
    @select="onStatus"
  >
  </van-address-list>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {
  addressGoodsId,
  deliveryId,
  modify,
  sinState,
  viewadress,
} from "@/api/cart";

export default {
  name: "Address",
  setup() {
    const router = useRouter();
    const store = useStore();
    // console.log(store.state.user.profile.id);
    let { list, viewList, chosenAddressId } = displayAddress();
    viewList();
    const onClickLeft = () => history.back(); //返回上级
    //点击新增地址触发
    const onAdd = () => router.push("/addlist");
    //点击编辑按钮触发
    const onEdit = (item) => {
      router.push(`/addlist/${item.id}`);
    };
    //点击选中时触发
    const onStatus = (item) => {
      // console.log(item,"item")
      // console.log(store.state.user.profile.id)
      sinState(store.state.user.profile.id).then(() => {
        deliveryId(item.id, store.state.user.profile.id).then(() => {
          modify(item.id).then((res) => {
            let {
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
              usersId,
            } = res.modify[0];
            addressGoodsId(
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
              usersId
            ).then(() => {
              // console.log(res,"sun")
              router.push("/purchase");
            });
          });
        });
      });
    };
    return {
      list,
      onAdd,
      onEdit,
      chosenAddressId,
      onClickLeft,
      onStatus,
    };
  },
};
function displayAddress() {
  let list = ref([]);
  const store = useStore();
  let chosenAddressId = ref(0); //选中地址的id
  const viewList = () => {
    // console.log(id,"id",222)
    viewadress(store.state.user.profile.id).then((res) => {
      list.value = res.viewadress.map((item) => {
        return {
          id: item.id,
          name: item.name,
          tel: item.tel,
          address: item.province + item.city + item.county + item.addressDetail,
          isDefault:
            item.isDefault == 1 ? (chosenAddressId.value = item.id) : null,
        };
      });
    });
  };

  return {
    list,
    viewList,
    chosenAddressId,
  };
}
</script>

<style scoped></style>
