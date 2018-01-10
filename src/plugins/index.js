/**
 * Vue 使用的插件
 */

import axios from './axios'

export default {
  install(Vue) {
    axios(Vue)
  }
}
