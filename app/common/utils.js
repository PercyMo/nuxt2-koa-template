/**
 * utils 下全部方法会被挂载到ctx，无需单独引入文件
 * 使用方法：ctx.utils.isObject(obj)
 */

const assert = require('assert')

const _toString = Object.prototype.toString

const isObject = (obj) => {
  return _toString.call(obj) === '[object Object]'
}

module.exports = {
  assert,
  isObject,
}
