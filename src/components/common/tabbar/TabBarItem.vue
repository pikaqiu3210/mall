<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="isActiveColor"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      defalut: "red",
    },
  },
  computed: {
    //判断是否活跃
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    isActiveColor() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itemClick() {
      //路由跳转
      this.$router.push(this.path);
    },
  },
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  height: 49px;
  text-align: center;
  background-color: #f6f6f6;
  font-size: 14px;
}
.tab-bar-item img {
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>