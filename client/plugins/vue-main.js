import Vue from 'vue'
import antComponentInstall from '~/components/antComponentInstall'

Vue.prototype.$myInjectedFunc = (string) => {
  console.log('this is an example', string)
}

export default () => {
  Vue.use(antComponentInstall)
}
