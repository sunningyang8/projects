import {
    Button,
    List,
    DatePicker,
    NavBar,
    Popup,
    Toast,
    Dialog
} from 'antd-mobile'
import classNames from 'classnames'
import { useHistory } from 'react-router-dom'
import {
    getUserProfile,
    updatePhoto,
    updateUserProfile
} from '@/store/actions'

import styles from './styles/edit.module.scss'
import { useInitialState } from '@/utils/use-initial-state'
import EditInput from './EditInput'
import EditList from './EditList'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import { logout } from '@/store/actions'
const Item = List.Item
const ProfileEdit = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { userProfile } = useInitialState(getUserProfile, 'profile')
    // 控制修改昵称弹出层的显示或隐藏
    const [inputPopup, setInputPopup] = useState({
        // 判断编辑昵称或简介
        type: '',
        // 昵称或简介的值
        value: '',
        // 弹出层展示或隐藏
        visible: false
    })
    // 控制头像或性别弹出层的展示或隐藏
    const [listPopup, setListPopup] = useState({
        type: '',
        visible: false
    })
    // 创建获取 file 的 ref 对象
    const fileRef = useRef(null)
    // 生日日期选择器的展示或隐藏
    const [showBirthday, setShowBirtyday] = useState(false)
    // 更新用户昵称
    const onUpdateProfile = async (
        type,
        value
    ) => {
        if (type === 'photo') {
            fileRef.current?.click()
        } else {
            // 昵称、简介、性别
            await dispatch(updateUserProfile({ [type]: value }))
            Toast.show({
                content: '更新成功',
                duration: 1000
            })
            onInputHide()
            onListPopupHide()
        }
    }
    // 关闭修改昵称的弹出层
    const onInputHide = () =>
        setInputPopup({
            type: '',
            value: '',
            visible: false
        })
    // 打开修改昵称或简介的弹出层
    const onInputShow = (type, value) =>
        setInputPopup({
            type,
            value,
            visible: true
        })
    // 打开修改 性别或头像 的弹出层
    const onListPopupShow = (type) => {
        setListPopup({
            type,
            visible: true
        })
    }
    // 关闭修改性别或头像的弹出层
    const onListPopupHide = () =>
        setListPopup({
            type: '',
            visible: false
        })
    // 修改头像
    const onChangePhoto = async (e) => {
        if (!e.target.files) {
            return Toast.show({
                content: '请选择要上传的头像',
                duration: 1000
            })
        }
        const formData = new FormData()
        formData.append('photo', e.target.files[0])
        await dispatch(updatePhoto(formData))
        onListPopupHide()
        Toast.show({
            content: '上传成功',
            duration: 600
        })
    }
    // 更新生日
    const onUpdateBirthday = (value) => {
        // console.log('onUpdateBirthday', dayjs(value).format('YYYY-MM-DD'))
        const formatBirthday = dayjs(value).format('YYYY-MM-DD')
        onUpdateProfile('birthday', formatBirthday)
    }
    // 退出登录
    const onLogout = () => {
        // 注意：如果需要自定义按钮的样式和文字内容，需要，使用 .show() 方法来模拟 confirm
        Dialog.show({
            title: '温馨提示',
            content: '亲，您确定要退出吗？',
            // 表示：再点击 actions 对应按钮时关闭
            closeOnAction: true,
            // 表示：点击遮罩层关闭
            closeOnMaskClick: true,
            // 注意：actions 的数据类型是一个数组
            //      并且， 如果要指定的两个按钮在同一行，需要在使用一个数组来包裹两个对象
            actions: [
                [
                    {
                        key: 'cancel',
                        text: '取消',
                        style: {
                            color: '#999'
                        }
                    },
                    {
                        key: 'confirm',
                        text: '确认',
                        onClick: () => {
                            dispatch(logout())
                            history.push('/login')
                        }
                    }
                ]
            ]
        })
    }

    const {  photo, name, gender, birthday, intro } = userProfile

    return (
        <div className={styles.root}>
            <div className="content">
                {/* 标题 */}
                <NavBar
                    className="nav-bar"
                    onBack={() => history.go(-1)}
                    // style={{
                    //   '--border-bottom': '1px solid #F0F0F0'
                    // }}
                >
                    个人信息
                </NavBar>

                <div className="wrapper">
                    {/* 列表 */}
                    <List className="profile-list">
                        {/* 列表项 */}
                        <Item
                            // extra 表示右侧的额外信息
                            extra={
                                <span className="avatar-wrapper">
                  <img
                      width={24}
                      height={24}
                      src={
                          photo || 'http://toutiao.itheima.net/images/user_head.jpg'
                      }
                      alt=""
                  />
                </span>
                            }
                            arrow
                            onClick={() => onListPopupShow('photo')}
                        >
                            头像
                        </Item>
                        <Item arrow extra={name} onClick={() => onInputShow('name', name)}>
                            昵称
                        </Item>
                        <Item
                            arrow
                            extra={
                                <span className={classNames('intro', 'normal')}>
                  {intro || '未填写'}
                </span>
                            }
                            onClick={() => onInputShow('intro', intro ?? '')}
                        >
                            简介
                        </Item>
                    </List>

                    <List className="profile-list">
                        <Item
                            arrow
                            extra={gender + '' === '0' ? '男' : '女'}
                            onClick={() => onListPopupShow('gender')}
                        >
                            性别
                        </Item>
                        <Item arrow extra={birthday} onClick={() => setShowBirtyday(true)}>
                            生日
                        </Item>
                    </List>

                    <DatePicker
                        visible={showBirthday}
                        value={new Date(birthday)}
                        title="选择年月日"
                        min={new Date(1900, 0, 1, 0, 0, 0)}
                        max={new Date()}
                        onClose={() => setShowBirtyday(false)}
                        onConfirm={onUpdateBirthday}
                    />
                    <input
                        ref={fileRef}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={onChangePhoto}
                    />
                </div>
                <div className="logout">
                    <Button className="btn" onClick={onLogout}>
                        退出登录
                    </Button>
                </div>
            </div>


            <Popup visible={inputPopup.visible} position="right">
                <EditInput
                    key={inputPopup.type}
                    type={inputPopup.type}
                    value={inputPopup.value}
                    onClose={onInputHide}
                    onUpdateProfile={onUpdateProfile}
                />
            </Popup>
            <Popup visible={listPopup.visible} onMaskClick={onListPopupHide}>
                <EditList
                    onClose={onListPopupHide}
                    type={listPopup.type}
                    onUpdateProfile={onUpdateProfile}
                />
            </Popup>
        </div>
    )
}

export default ProfileEdit
