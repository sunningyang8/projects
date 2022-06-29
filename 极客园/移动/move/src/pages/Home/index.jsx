import styles from './index.module.scss'
import { useState } from 'react';
import { Popup, Tabs } from 'antd-mobile';
import Channels from './components/Channels';
import Icon from '@/components/Icon'
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useInitialState } from "../../utils/use-initial-state";
import { getChannels, toggleChannel } from "../../store/actions";
import ArticleList from './components/ArticleList'
const Home = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [visible, setChannelVisible] = useState(false)
    const { channels, channelActiveKey } = useInitialState(getChannels, 'home')
    // 频道管理弹出层展示
    const onChannelShow = () => setChannelVisible(true)
    // 频道管理弹出层隐藏
    const onChannelClose = () => setChannelVisible(false)
    // 切换 tab
    const changeTab = (key) => {
        dispatch(toggleChannel(+key))
    }
    // console.log(channels)
    return (
        <div className={styles.root}>
            {channels.length > 0 && (
                <Tabs
                    className="tabs"
                    activeLineMode="fixed"
                    activeKey={channelActiveKey + ''}
                    stretch
                    onChange={changeTab}
                >
                    {channels.map(item => (
                        <Tabs.Tab forceRender title={item.name} key={item.id}>
                            {/*文章列表*/}
                            <ArticleList channelId={item.id} />
                        </Tabs.Tab>
                    ))}
                </Tabs>
            )}
            <div className="tabs-opration">
                <Icon type="iconbtn_search" onClick={() => history.push('/search')} />
                <Icon type="iconbtn_channel" onClick={onChannelShow} />
            </div>
            {/*弹出层*/}
            <Popup
                visible={visible}
                position="left"
                className="channel-popup"
            >
                <Channels onClose={onChannelClose} />
            </Popup>
        </div>
    );
};
export default Home
