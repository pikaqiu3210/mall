<template>
  <div class="recommend">
    <div v-for="item in recommend" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommend",
  props: {
    recommend: {
      type: Array,
      defalut() {
        return [];
      },
    },
  },
};
</script>

<style>
.recommend {
  display: flex;
  padding: 10px 0 30px;
  border-bottom: 8px solid #eee;
}
.recommend-item {
  flex: 1;
  text-align: center;
}
.recommend-item img {
  height: 60px;
  margin-bottom: 10px;
}
</style>