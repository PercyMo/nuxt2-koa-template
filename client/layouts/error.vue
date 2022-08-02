<template>
  <div class="error-page">
    <div class="error-page-container">
      <div class="error-content">
        <h2 class="title">
          <b>{{ statusCode }}.</b> That's an error.
        </h2>
        <div class="subtitle">
          {{ message }}
        </div>
        <div class="extra">
          <nuxt-link class="error-link" to="/">回到首页</nuxt-link>
        </div>
      </div>
      <div class="error-image">
        <img :src="errorImg" width="170" alt="抱歉！页面无法访问……" />
      </div>
    </div>
  </div>
</template>

<script>
import errorImg from '~/assets/images/errors/robot.png'

export default {
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      errorImg,
    }
  },
  head() {
    return {
      title: `${
        this.statusCode === 404 ? '找不到页面！' : '抱歉！页面无法访问……'
      } - xx`,
    }
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500
    },
    message() {
      return this.error.message || 'Error'
    },
  },
}
</script>
<style lang="scss">
.error-page {
  &-container {
    display: flex;
    margin: 7% auto;
    width: 500px;
    .error-image {
      width: 170px;
    }

    .error-content {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: center;

      .title {
        color: rgba(0, 0, 0, 0.45);
        b {
          color: rgba(0, 0, 0, 0.85);
        }
      }

      .subtitle {
        margin-bottom: 24px;
        font-size: 14px;
        line-height: 1.6;
        color: rgba(0, 0, 0, 0.45);
      }
    }
  }
}
</style>
