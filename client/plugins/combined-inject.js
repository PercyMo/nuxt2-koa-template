import auth from '@/utils/auth.js'
import utils from '@/utils/utils.js'

export default (ctx, inject) => {
  inject('auth', auth)
  inject('utils', utils)
}
