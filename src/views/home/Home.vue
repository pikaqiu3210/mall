<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banner="banner"></home-swiper>
    <recommend :recommend="recommend"></recommend>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./chirdComps/HomeSwiper";
import Recommend from "./chirdComps/Recommend";

import { getHomeMultidata } from "network/home";
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    Recommend,
  },
  data() {
    return {
      banner: [],
      recommend: [],
    };
  },
  created() {
    //调用网络请求
    getHomeMultidata().then((res) => {
      //获取轮播图数据
      this.banner = res.data.data.banner.list;
      //获取推荐数据
      this.recommend = res.data.data.recommend.list;
    });
  },
};
</script>

<style>
.home-nav {
  color: #fff;
  background-color: var(--color-tint);
}
</style>