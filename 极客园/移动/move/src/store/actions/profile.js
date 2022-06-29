import { http } from '@/utils'

// 获取 我的 页面 - 用户自己的信息
export const getUser = () => {
    return async dispatch => {
        const res = await http.get('/user')
        // console.log(res)
        dispatch({ type: 'user/get', payload: res.data.data })
    }
}

// 获取编辑个人信息页面数据
export const getUserProfile = () => {
    return async dispatch => {
        const res = await http.get('/user/profile')

        dispatch({ type: 'profile/getUserProfile', payload: res.data.data })
    }
}


export const updateUserProfile = (
    userProfile
) => {
    return async dispatch => {
        await http.patch('/user/profile', userProfile)

        dispatch({ type: 'profile/update', payload: userProfile })
    }
}

// 更新头像
export const updatePhoto = (file) => {
    return async dispatch => {
        const res = await http.patch('/user/photo', file)

        // console.log(res)
        dispatch({ type: 'profile/photo', payload: res.data.data.photo })
    }
}
