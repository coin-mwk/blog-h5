import { message } from 'antd'
import axios from 'axios'
import { getToken, removeToken } from './storage'
import { history } from './history'
const instance = axios.create({
  // baseURL: 'http://geek.itheima.net/v1_0/', // 基地址
  baseURL: 'http://toutiao.itheima.net/v1_0/', // 基地址
  timeout: 5000, // 最长等待时间5秒。如果一个请求超过了5秒还没有返回，就认定失败
})

// 请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 如果有token 就带上
    const token =getToken()
    if(token){
    config.headers.Authorization=`Bearer ${token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  function (response) {
    return response.data //解构了一个data
  },
  function (error) {
    console.dir(error,'error');
    if(!error.response) return message.error('网络超时') //出现断网 请求不到服务器 这时就没有response 直接return掉
    if(error.response.status ===401){
      message.error(error.response.data.message)
      removeToken()
      // window.location.href='/login' //会导致页面刷新
      history.push('/login',{from:history.location.pathname})  //不会导致页面刷新  优化！
    }
    return Promise.reject(error)
  }
)

export default instance