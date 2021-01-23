<template>
  <div class="wraper" ref="wraper">
    <div class="content"><slot></slot></div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    pullUpLoad: {
      type: Boolean,
      default() {
        return false;
      },
    },
    probeType: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll.refresh();
    },
  },
  mounted() {
    //1.创建better-scroll实例
    this.scroll = new BScroll(this.$refs.wraper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });
    //2. 监听滚动的区域
    this.scroll.on("scroll", (position) => {
      this.$emit("rolling", position);
    });
    //3.上拉加载更多
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
};
</script>

<style scoped>
</style>