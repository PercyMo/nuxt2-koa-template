<template>
  <div class="site-nav">
    <div class="site-nav-container">
      <ul class="site-nav-l">
        <li class="site-nav-menu">
          <a-button type="link">位置</a-button>
        </li>
        <li class="site-nav-menu">
          <a-button type="link" icon="user">{{
            author.name || '用户'
          }}</a-button>
        </li>
      </ul>
      <ul class="site-nav-r">
        <li class="site-nav-menu">
          <a-button type="link" icon="shopping-cart">购物车</a-button>
        </li>
        <li class="site-nav-menu">
          <a-button type="link">联系客服</a-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    author() {
      return this.$store.state.exampleAuthor || {}
    },
  },
}
</script>

<style lang="scss" scoped>
.site-nav {
  background: #f9f9f9;

  &-container {
    display: flex;
    justify-content: space-between;
  }

  &-menu {
    display: inline-block;
  }
}
</style>
