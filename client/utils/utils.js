export default {
  throttle(fn, wait) {
    let timer = null
    return function () {
      const self = this
      const args = arguments
      if (!timer) {
        timer = setTimeout(function () {
          timer = null
          fn.apply(self, args)
        }, wait)
      }
    }
  },
}
