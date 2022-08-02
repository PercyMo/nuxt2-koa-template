export default {
  data() {
    return {
      _isReachBottom: false, // 防止进入执行区域时重复触发
      reachBottomDistance: 100, // 距离底部多远触发
    }
  },
  mounted() {
    this._scrollElement = document.scrollingElement
    this._throttled = this.$utils.throttle(this._windowScrollHandler, 200)
    window.addEventListener('scroll', this._throttled)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this._throttled)
  },
  methods: {
    _windowScrollHandler() {
      const scrollHeight = this._scrollElement.scrollHeight
      const currentHeight =
        this._scrollElement.scrollTop +
        this._scrollElement.clientHeight +
        this.reachBottomDistance
      if (currentHeight < scrollHeight && this._isReachBottom) {
        this._isReachBottom = false
      }
      if (this._isReachBottom) return
      if (currentHeight >= scrollHeight) {
        this._isReachBottom = true
        typeof this.reachBottom === 'function' && this.reachBottom()
      }
    },
  },
}
