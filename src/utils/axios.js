import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://www.ztgis.com:8880/mobile',  //发布的地址
  timeout: 60000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})
function fetch(url, params) {
  return new Promise((resolve, reject) => {
    instance.post(url, params)
      .then(response => {
        console.log(response);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
  })
}

export default instance
//  export default fetch
