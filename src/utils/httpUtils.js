import querystring from 'querystring'
import axios from 'axios'
import tokenUtil from './tokenUtil'

const instance = axios.create({
  baseURL: 'http://192.168.3.105:7982/lpb.asmx/',//'http://www.ztgis.com:8867/lpb.asmx/',//
  timeout: 60000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})

// request拦截器
instance.interceptors.request.use(config => {
  if(!config.data){
    config.data = {}
  }
  config.data.Token =tokenUtil.token
  config.data = querystring.stringify({
    para: JSON.stringify(config.data)
  })
  return config

}, error => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
})


// respone拦截器
instance.interceptors.response.use(
  response => {
    const code = response.data.RespCode
    if (code === 1) {
      if (!response.data.Results) {
        return true
      } else {
        return response.data.Results
      }
    } else {
      MessageBox.alert(response.data.RespDesc)
      return false
    }
  },
  error => {
    console.log('err' + error); // for debug
    return Promise.reject(error);
  }
)

export default instance
