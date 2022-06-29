//
// AuthRoute 组件的使用，与 路由自己的 Route 组件用法相同
// 也就是说：Route 能够接受什么属性，AuthRoute 组件也能够接受什么属性
// <Route path="" component={Home} />

import { logout } from '@/store/actions'
import { isAuth } from '@/utils/token'
import { useDispatch } from 'react-redux'
import { Route, Redirect, useLocation } from 'react-router-dom'

export const AuthRoute = ({ children, ...rest }) => {
    const location = useLocation()
    const dispatch = useDispatch()
    return (
        <Route
            {...rest}
            render={() => {
                const isLogin = isAuth()
                if (isLogin) {
                    // 登录
                    return children
                    // return <Home />
                }

                dispatch(logout())
                // 未登录
                return (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: {
                                from: location.pathname
                            }
                        }}
                    />
                )
            }}
        />
    )
}
