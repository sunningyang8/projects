import { setToken, clearToken, http } from "@/utils";

// 登录
export const login = (mobile, code) => {
  return async dispatch => {
    const res = await http.post('/authorizations', {
      mobile,
      code
    })
    // console.log(res)

    // 注意：此处获取的是 token 
    const { token } = res
    setToken(token)
    dispatch({ type: 'user/setToken', payload: token })
  }
}

// 退出
export const logout = ()=>{
  return (dispatch)=>{
    clearToken()
    dispatch({ type: 'login/setToken', payload: "" })
  }
}

// export const getUserInfo = () => {
//   return async dispatch => {
//     const res = await http.get('/user/profile')
//   }
// }