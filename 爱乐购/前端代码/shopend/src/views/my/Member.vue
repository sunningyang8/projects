<template>
  <section class="jui-flexView">
    <section class="jui-scrollView">
      <div class="jui-flex">
        <div class="jui-pus-user">
          <img src="/assets/my-member/user.png" alt="" />
        </div>
        <div class="jui-flex-box">
          <h2>{{userName}}</h2>
        </div>
        <div class="jui-arrow">
          <button><i class="icon icon-pic"></i> 签到</button>
        </div>
      </div>
      <div class="jui-palace jui-palace-one b-line">
        <a href="javascript:;" class="jui-palace-grid">
          <div class="jui-palace-grid-text">
            <h2><em>8685</em>预览</h2>
          </div>
        </a>
        <a href="javascript:;" class="jui-palace-grid">
          <div class="jui-palace-grid-text">
            <h2><em>322</em>关注</h2>
          </div>
        </a>
        <a href="javascript:;" class="jui-palace-grid">
          <div class="jui-palace-grid-text">
            <h2><em>855</em>粉丝</h2>
          </div>
        </a>
      </div>
      <div class="jui-palace">
        <a href="javascript:;" class="jui-palace-grid">
          <div class="jui-palace-grid-icon">
            <img src="/assets/my-member/nav-001.png" alt="" />
          </div>
          <div class="jui-palace-grid-text">
            <h2>文章</h2>
          </div>
        </a>
        <a href="javascript:;" class="jui-palace-grid">
          <div class="jui-palace-grid-icon">
            <img src="/assets/my-member/nav-002.png" alt="" />
          </div>
          <div class="jui-palace-grid-text">
            <h2>收藏</h2>
          </div>
        </a>
        <a href="javascript:;" class="jui-palace-grid">
          <div class="jui-palace-grid-icon">
            <img src="/assets/my-member/nav-003.png" alt="" />
          </div>
          <div class="jui-palace-grid-text">
            <h2>钱包</h2>
          </div>
        </a>
        <a href="javascript:;" class="jui-palace-grid">
          <div class="jui-palace-grid-icon">
            <img src="/assets/my-member/nav-004.png" alt="" />
          </div>
          <div class="jui-palace-grid-text">
            <h2>照片</h2>
          </div>
        </a>
        <a href="javascript:;" class="jui-palace-grid">
          <div class="jui-palace-grid-icon">
            <img src="/assets/my-member/nav-005.png" alt="" />
          </div>
          <div class="jui-palace-grid-text">
            <h2>日历</h2>
          </div>
        </a>
      </div>
      <div class="divHeight"></div>
      <div class="jui-flex b-line" style="padding: 10px 15px">
        <div class="jui-flex-box">
          <h3>全部文章</h3>
        </div>
      </div>
      <div class="jui-prblish">
        <a href="javascript:;" class="jui-flex">
          <div class="jui-flex-box">
            <h4>水果</h4>
            <img src="/assets/my-member/ad-001.png" alt="" />
            <span>
              柚子果肉营养丰富，富含多种人体对人体有益的营养素，如维生素B族、有机酸、维生素P、胡萝卜素、维生素C、蛋白质、膳食纤维、甙类、钙、磷、铁、镁等，口感甘酸，味道清香，是世界公认的最具营养价值的水果之一。
            </span>
            <span>2019-07-21</span>
          </div>
        </a>
        <div class="divHeight"></div>
        <a href="javascript:;" class="jui-flex">
          <div class="jui-flex-box">
            <h4>咖啡</h4>
            <img src="/assets/my-member/ad-002.png" alt="" />
            <span>
              咖啡（coffee）是采用经过烘焙的咖啡豆（咖啡属植物的种子）所制作出来的饮料，通常为热饮，但也有作为冷饮的冰咖啡。
              被发现有种子的咖啡“浆果”生长在树木上，有超过70个国家种植，主要是在赤道拉丁美洲，东南亚，印度和非洲。绿色（未焙制）咖啡是在世界上交易量最大的农产品之一。咖啡是人类社会流行范围最为广泛的饮料之一，也是重要经济作物。咖啡是微酸性（pH值5.0-5.1），并且因为它的咖啡因含量可以对人类有刺激作用。它是世界上消费最多的饮料的饮料之一。
            </span>
            <span>2019-07-21</span>
          </div>
        </a>
        <div class="divHeight"></div>
        <a href="javascript:;" class="jui-flex">
          <div class="jui-flex-box">
            <h4>牛奶</h4>
            <img src="/assets/my-member/ad-003.png" alt="" />
            <span>
              牛奶是一种营养丰富的保健食品，完全是营养品，无任何副作用，喝多也不会对身体有害。。牛奶中含有3000种以上的有机成分。牛奶中的蛋白质质量优良，含有人体所需的必需氨基酸，其它营养素的含量亦十分丰富，钙的含量高，且好吸收。牛奶在所有饮品中是佼佼者。
<br/>牛奶营养丰富、容易消化吸收、物美价廉、食用方便，是最“接近完美的食品”，人称“白色血液”，是最理想的天然食品。
            </span>
            <span>2019-07-21</span>
          </div>
        </a>
        <div class="divHeight"></div>
      </div>
      <div style="height: 52px"></div>
    <div style="width: 100%;margin-bottom:100px">
      <van-button style="width: 60%;margin-left: 20%"  color="linear-gradient(to right, #ff6034, #ee0a24)" @click="onDetermine">
      退出账号
      </van-button>
    </div>
    </section>

  </section>

</template>

<script>
import { useStore } from "vuex";
import { viewLogin, viewusername } from "@/api/my";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Member",
  setup() {
    const store = useStore();
    let userName=ref("")
    let router=useRouter()
    if (store.state.user.profile.mobile) {
      viewLogin(store.state.user.profile.mobile).then((res) => {
        // console.log(res,"res")
        store.commit("user/setUser", {
          // 用户id
          id: res.search[0].id,
          username: res.search[0].username,
        });
      });
      userName.value = store.state.user.profile.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    } else {
      viewusername(store.state.user.profile.username).then((res) => {
        // console.log(res.viewusername[0].id, res.viewusername[0].mobile,"user/setUser",)
        store.commit("user/setUser", {
          // 用户id
          id: res.viewusername[0].id,
          mobile: res.viewusername[0].mobile,
        });
      });
      userName.value = store.state.user.profile.username
    }
    const onDetermine=()=>{
      sessionStorage.removeItem('token');
      store.commit('user/setUser', {})
      router.push('/register')
    }
    return{
      userName,onDetermine
    }
  },

};
</script>
<style src="../../../public/member.css" lang="css" scoped></style>
