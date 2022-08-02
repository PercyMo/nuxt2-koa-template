const VConsole =
  process.env.NODE_ENV !== 'production' ? require('vconsole') : ''
export default () => {
  if (process.env.NODE_ENV !== 'production') {
    window.vConsole = new VConsole()
  }
}
