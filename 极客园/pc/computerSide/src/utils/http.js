import axios from 'axios'
import store from '@/store'
import { customHistory } from './history'
import { logout } from '@/store/actions'
import { message } from "antd";

const http = axios.create({
  baseURL: 'http://toutiao.itheima.net/v1_0',
  timeout: 5000
})

// 统一添加token在请求头
http.interceptors.request.use(config => {
  // 对config进行修改，每次请求前做的事情
  const state = store.getState()
  if (state.user.token) {
    config.headers.Authorization = `Bearer ${state.user.token}`
  }
  return config
}, e => Promise.reject(e))

http.interceptors.response.use(res => {
  return res?.data?.data || res
}, e => {
  if (e.response.status === 401) {
    message.error('登录失效')
    store.dispatch(logout())
    // 防止跳转login的时候接口才处理401
    if ( customHistory.location.pathname !== '/login') {
      customHistory.push({
        pathname: '/login',
        state: { from: customHistory.location.pathname }
      })
    }
  }
  Promise.reject(e)
})

export { http }