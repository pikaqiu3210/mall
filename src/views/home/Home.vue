<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <back-top @click.native="backClick" v-show="isShowScroll"></back-top>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @rolling="rolling"
      :pull-up-load="true"
      @pullingUp="pullingUp"
    >
      <home-swiper :banner="banner"></home-swiper>
      <recommend :recommend="recommend"></recommend>
      <feature-view></feature-view>
      <tab-control
        class="tab-control"
        :title="['流行', '新款', '精选']"
        @tabClick="tabClick"
      ></tab-control>
      <goods-list :goods-list="showGoods"></goods-list>
    </scroll>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./chirdComps/HomeSwiper";
import Recommend from "./chirdComps/Recommend";
import FeatureView from "./chirdComps/FeatureView";
import TabControl from "components/content/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    Recommend,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banner: [],
      recommend: [],
      currentType: "pop",
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      isShowScroll: false,
    };
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGodds("pop");
    this.getHomeGodds("new");
    this.getHomeGodds("sell");
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    //回到顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    //回到顶部的显示隐藏
    rolling(position) {
      this.isShowScroll = position.y < -1000;
    },
    //上拉加载更多
    pullingUp() {
      this.getHomeGodds(this.currentType);
      //让better-scroll重新计算可滚动区域
      this.$refs.scroll.refresh();
    },

    //获取多条数据
    getHomeMultidata() {
      //调用网络请求
      getHomeMultidata().then((res) => {
        //获取轮播图数据
        this.banner = res.data.data.banner.list;
        //获取推荐数据
        this.recommend = res.data.data.recommend.list;
      });
    },
    //获取商品数据
    getHomeGodds(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        //存储商品数据
        this.goods[type].list.push(...res.data.data.list);
        //商品页码+1
        this.goods[type].page += 1;
        //调用better-scroll的finishPullUp方法进行下一次加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  position: relative;
  height: 100vh;
}
.home-nav {
  color: #fff;
  background-color: var(--color-tint);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
.content {
  position: absolute;
  top: 0px;
  bottom: 49px;
  overflow: hidden;
  margin-top: 44px;
}
</style>