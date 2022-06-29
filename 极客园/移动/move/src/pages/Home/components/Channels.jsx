import classNames from 'classnames'
import Icon from '@/components/Icon'
import styles from './channeIs.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useInitialState } from '@/utils/use-initial-state'
import {
    delMyChannel,
    getRestChannels,
    toggleChannel,
    addChannel
} from '@/store/actions/home'
import { useState } from 'react'
const Channels = ({ onClose }) => {
    const dispatch = useDispatch()
    //编辑状态
    const [isEdit, setIsEdit] = useState(false)
    const { channels, channelActiveKey } = useSelector(
        (state) => state.home
    )
    const { restChannels } = useInitialState(getRestChannels, 'home')
    // 切换编辑状态
    const changeEdit = () => {
        setIsEdit(!isEdit)
    }
    // 切换频道
    const onChannelClick = (channel) => {
        if (!isEdit) {
            dispatch(toggleChannel(channel.id))
            onClose()
        } else {
            if (channel.id === 0 || channel.id === channelActiveKey) return
            dispatch(delMyChannel(channel))
        }
    }
    // 添加频道
    const onAddChannel = (channel) => {
        dispatch(addChannel(channel))
    }
    return (
        <div className={styles.root}>
            <div className="channel-header">
                <Icon type="iconbtn_channel_close" onClick={onClose} />
            </div>
            <div className="channel-content">
                <div className={classNames('channel-item', isEdit && 'edit')}>
                    <div className="channel-item-header">
                        <span className="channel-item-title">我的频道</span>
                        <span className="channel-item-title-extra">点击进入频道</span>
                        <span className="channel-item-edit" onClick={changeEdit}>
                            {isEdit ? '保存' : '编辑'}
                        </span>
                    </div>
                    <div className="channel-list">
                        {channels.map(item => (
                            <span
                                key={item.id}
                                className={classNames(
                                    'channel-list-item',
                                    channelActiveKey === item.id && 'selected'
                                )}
                                onClick={() => onChannelClick(item)}
                            >
                                {item.name}
                                {item.id !== 0 && item.id !== channelActiveKey && (
                                    <Icon type="iconbtn_tag_close" />
                                )}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="channel-item">
                    <div className="channel-item-header">
                        <span className="channel-item-title">可选频道</span>
                        <span className="channel-item-title-extra">点击添加频道</span>
                    </div>
                    <div className="channel-list">
                        {restChannels.map(item => (
                            <span
                                className="channel-list-item"
                                key={item.id}
                                onClick={() => onAddChannel(item)}
                            >
                                + {item.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Channels
