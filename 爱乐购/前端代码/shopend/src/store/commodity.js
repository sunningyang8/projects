import { topcategory } from "@/api/outer";

export default {
  namespaced: true,
  state() {
    return {
      list: topcategory.map((item)=>{
        return {
          text: item.name,
          id: item.id,
        };
      }),
    };
  },
  mutations: {

  },
  actions: {}
};
