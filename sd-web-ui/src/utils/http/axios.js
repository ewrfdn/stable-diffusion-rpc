import axios from 'axios'
import { message } from 'ant-design-vue'

const ContentType = {
  urlencoded: 'application/x-www-form-urlencoded;charset=UTF-8',
  json: 'application/json',
  formData: 'multipart/form-data'
}

// const baseURL = "http://localhost:31106/v1/"
const baseURL = "http://123.60.53.33:31106/v1/"

const axiosInstance = axios.create({
  baseURL,
  timeout: 60000,
  responseType: 'json',
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})

axiosInstance.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = ContentType[config.data instanceof FormData ? 'formData' : 'json']
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (res) => {
    if (res.status === 200) {
      return res.data
    } else if (res.status === 401 || res.status === 403) {
      message.error('登录过期或权限不足, 请重新登陆!')
      return false
    } else if (res.status === 500) {
      message.error('请求数据失败, 请重试!')
      return false
    } else if (res.status === 406) {
      message.error('登陆超时请重新登录!')
      return false
    } else {
      return false
    }
    // return res
  },
  error => {
    console.log(error)
    const msg = error.message
    const result = error.response
    if (result) {
      const { data } = result
      message.error(data.errorMessage)
    } else if (msg) {
      if (msg === 'Network Error') {
        message.error('网络错误,请检查网络!')
      } else {
        message.error(msg)
      }
    }
    return false
  }
)

export default axiosInstance
