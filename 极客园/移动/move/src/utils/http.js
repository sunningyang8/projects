// 封装 axios
import axios from 'axios'
import store from '../store'
import { Toast } from 'antd-mobile'
import { customHistory } from './history'
import { clearToken, setToken } from './token'

const baseURL = 'http://toutiao.itheima.net/v1_0'

const http = axios.create({
    baseURL,
    timeout: 5000
})

// 将来可以继续进行 拦截器 的处理

// 请求拦截器
http.interceptors.request.use(config => {
    // 获取token
    // 注意：极客园h5项目中，login 存储的是一个对象，对象中的 token 属性，才是登录身份令牌
    const {
        login: { token }
    } = store.getState()

    // 除了登录请求外，其他请求统一添加 token
    if (!config.url?.startsWith('/authorizations')) {
        // 此处，需要使用 非空断言 来去掉 headers 类型中的 undefined 类型
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

// 响应拦截器
http.interceptors.response.use(undefined, async error => {
    // 响应失败时，会执行此处的回调函数
    if (!error.response) {
        // 网路超时
        Toast.show({
            content: '网络繁忙，请稍后再试',
            duration: 1000
        })
        return Promise.reject(error)
    }
    // 在此处，通过 refresh_token 来换取新的 token
    if (error.response.status === 401) {
        try {
            // ...
            // 先判断 redux 中是否有 refresh_token
            const { refresh_token } = store.getState().login
            if (!refresh_token) {
                await Promise.reject(error)
            }
            const res = await axios.put(`${baseURL}/authorizations`, null, {
                headers: {
                    Authorization: `Bearer ${refresh_token}`
                }
            })
            const tokens = {
                // token 是最新的，接口返回的
                token: res.data.data.token,
                // 因为接口没有返回新的 refresh_token，所以，需要使用原来的
                refresh_token
            }
            setToken(tokens)
            store.dispatch({ type: 'login/token', payload: tokens })
            return http(error.config)
        } catch (e) {

            store.dispatch({ type: 'login/logout' })
            // 手动清理本地的 token
            clearToken()

            Toast.show({
                content: '登录超时，请重新登录',
                duration: 1000,
                afterClose: () => {
                    customHistory.push('/login', {
                        from: customHistory.location.pathname
                    })
                }
            })

            return Promise.reject(error)
        }
    }
})

export { http }
