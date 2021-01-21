<template>
  <swiper>
    <swiper-item v-for="item in banner">
      <a :href="item.link"></a>
      <img :src="item.image" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "HomeSwiper",
  props: {
    banner: {
      type: Array,
      defalut() {
        return [];
      },
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>

<style>
</style>