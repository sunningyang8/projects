import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usePersistFn } from 'ahooks'

/**
 * 进入页面时，获取数据
 * @param action 获取数据的 action 函数
 * @param stateName 获取状态的名称，对应 RootState 中某个状态名称
 * @param afterAction 回调函数，表示在 action 完成后，执行某个操作
 * @return 要获取的状态
 */
export const useInitialState = (
    action,
    stateName,
    afterAction = () => {}
)=> {
    const dispatch = useDispatch()
    const state = useSelector((state) => state[stateName])
    // 对于 useRef 来说，参数只会在第一次组件渲染时生效，类似 useState 的参数
    const persistAction = usePersistFn(action)
    // 创建用来处理 afterAction 的 ref 对象，来避免递归发送请求
    const persistAfterAction = usePersistFn(afterAction)
    useEffect(() => {
        const loadData = async () => {
            // 注意：此处需要添加 await，因为后面的代码，应该是等到请求完成后再执行
            await dispatch(persistAction())
            // 在 请求完成 后，执行某个操作
            persistAfterAction()
        }
        loadData()
    }, [dispatch, persistAction, persistAfterAction])

    return state
}
