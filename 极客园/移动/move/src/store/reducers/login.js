
const initialState = {
    token: '',
    refresh_token: '',
};

// 说明：此处明确指定返回值类型，可以在返回值与指定类型不一致时给出明确的错误提示
export const login = (state = initialState, action) => {
    switch (action.type) {
        case 'login/token':
            return action.payload;
        case 'login/logout':
            return initialState
        default:
            return state;
    }
};
