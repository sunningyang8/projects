
import { http, setToken ,clearToken} from '@/utils';

//登录
export const login = (values) => {
    return async (dispatch) => {
        // 发送请求
        // console.log(values,111)
        const res = await http.post('/authorizations', values);
        console.log(res)
        const tokens = res.data.data;
        // 设置本地token
        setToken(tokens);
        // 分发 action 将 token 保存到 redux state 中
        dispatch({ type: 'login/token', payload: tokens });
    };
};

// 获取验证码
export const getCode = (mobile) => {
    return async () => {
      let res=  await http.get(`/sms/codes/${mobile}`)
        console.log(res)
    }
}

// 退出
export const logout = () => {
    return dispatch => {
        // 清空本地缓存中 token
        clearToken()
        // 清空 redux 中存储的 token
        dispatch({ type: 'login/logout' })
    }
}
