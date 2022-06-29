// 使用常量来存储 key
const GEEK_TOKEN_KEY = 'move-token'

// 创建 获取 token
export const getToken = () =>
    JSON.parse(
        localStorage.getItem(GEEK_TOKEN_KEY) ??
        '{ "token": "", "refresh_token": "" }'
    )

// 创建 设置 token
export const setToken = (token) =>
    localStorage.setItem(GEEK_TOKEN_KEY, JSON.stringify(token))

// 创建 清除 token
export const clearToken = () => localStorage.removeItem(GEEK_TOKEN_KEY)

// 创建 根据 token 判断是否登录
// 注意：getToken() 函数拿到的是一个对象，如果是对象，转布尔值，不管对象中是否有属性，结果都为：true
//      因此，直接 !!getToken() 结果一直都为 true
// 正确的操作：只判断 token 是否存在
export const isAuth = () => !!getToken().token
