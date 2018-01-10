import { axios } from '@/utils'

export default Vue => {
  Object.defineProperties(Vue, {
    axios: { get: () => axios }
  })

  Object.defineProperties(Vue.prototype, {
    $axios: { get: () => axios }
  })
}
