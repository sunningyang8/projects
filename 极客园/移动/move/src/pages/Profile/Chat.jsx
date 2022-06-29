import { Input, NavBar } from 'antd-mobile'
import classnames from 'classnames'
import { useHistory } from 'react-router-dom'
import  Icon  from '@/components/Icon'
import styles from './styles/chat.module.scss'
import { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { useSelector } from 'react-redux'
const Chat = () => {
    const history = useHistory()
    const { token } = useSelector((state) => state.login)
    const [chatList, setChatList] = useState([])
    // 文本框的值
    const [value, setValue] = useState('')
    const socketioRef = useRef()
    const chatListRef = useRef(null)
    useEffect(() => {
        const socketio = io('http://toutiao.itheima.net', {
            query: {
                token
            },
            transports: ['websocket']
        })
        socketio.on('connect', () => {
            // console.log('socketio 链接成功')
            setChatList([
                {
                    type: 'xz',
                    message: '你好，我是小智'
                },
                {
                    type: 'xz',
                    message: '你有什么疑问？'
                }
            ])
        })

        // 接收 websocket 服务器返回的消息
        socketio.on('message', data => {
            setChatList(chatList => [
                ...chatList,
                {
                    type: 'xz',
                    message: data.msg
                }
            ])
        })
        socketioRef.current = socketio
        return () => {
            socketio.close()
        }
    }, [token])

    // 监听聊天内容的状态
    useEffect(() => {
        const chatListDOM = chatListRef.current
        if (!chatListDOM) return

        chatListDOM.scrollTop = chatListDOM.scrollHeight
    }, [chatList])

    // 发送消息
    const onSendMessage = (e) => {
        if (e.code === 'Enter') {
            setChatList([
                ...chatList,
                {
                    type: 'user',
                    message: value
                }
            ])
            setValue('')
            // 将消息发送给 websocket 服务器
            socketioRef.current?.emit('message', {
                msg: value,
                timestamp: Date.now() + ''
            })
        }
    }

    return (
        <div className={styles.root}>
            <NavBar className="fixed-header" onBack={() => history.go(-1)}>
                小智同学
            </NavBar>

            <div className="chat-list" ref={chatListRef}>
                {chatList.map((item, index) => (
                    <div
                        key={index}
                        className={classnames(
                            'chat-item',
                            item.type === 'xz' ? 'self' : 'user'
                        )}
                    >
                        {item.type === 'xz' ? (
                            <Icon type="iconbtn_xiaozhitongxue" />
                        ) : (
                            <img src="http://geek.itheima.net/images/user_head.jpg" alt="" />
                        )}
                        <div className="message">{item.message}</div>
                    </div>
                ))}
            </div>

            <div className="input-footer">
                <Input
                    className="no-border"
                    placeholder="请描述您的问题"
                    value={value}
                    onChange={val => setValue(val)}
                    onKeyDown={onSendMessage}
                />
                <Icon type="iconbianji" />
            </div>
        </div>
    )
}

export default Chat
