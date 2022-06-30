import { getToken } from "@/utils";

const initialState = {
  token: getToken()
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'user/setToken':
      return {
        ...state,
        token: action.payload
      }
    case 'login/setToken':
      return {
        ...state,
        token: action.payload
      }
    default:
      return state
  }
}

export default user