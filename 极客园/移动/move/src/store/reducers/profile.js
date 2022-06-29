const initialState = {
    user: {},
    userProfile: {}
}

export const profile = (
    state = initialState,
        action
) => {
    // 我的页面 - 用户信息
    if (action.type === 'user/get') {
        return {
            ...state,
            user: action.payload
        }
    }

    // 编辑时 - 个人信息
    if (action.type === 'profile/getUserProfile') {
        return {
            ...state,
            userProfile: action.payload
        }
    }

    // 更新用户资料
    if (action.type === 'profile/update') {
        return {
            ...state,
            userProfile: {
                ...state.userProfile,
                // 注意：这是要修改的数据，一定要放在 state.userProfile 的后面，才能覆盖原始数据
                // action.payload => { name: 'xxx' }
                // action.payload => { intro: 'xxx' }
                ...action.payload
            }
        }
    }

    // 修改头像
    if (action.type === 'profile/photo') {
        return {
            ...state,
            userProfile: {
                ...state.userProfile,
                photo: action.payload
            }
        }
    }

    return state
}
