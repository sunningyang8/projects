import { Route,useHistory, useLocation } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import styles from './index.module.scss';
// 导入页面组件，配置路由
import Home from '../Home';
import Question from '../Question';
import Video from '../Video';
import Profile from '../Profile';
import {
    AppOutline,
    MessageOutline,
    UnorderedListOutline,
    UserOutline,
} from 'antd-mobile-icons'
const tabs = [
    {
        key: '/home',
        title: '首页',
        icon: <AppOutline />,
    },
    {
        key: '/home/question',
        title: '问答',
        icon: <MessageOutline />,
    },
    {
        key: '/home/video',
        title: '视频',
        icon: <UnorderedListOutline />,
    },
    {
        key: '/home/profile',
        title: '我的',
        icon: <UserOutline />,
    },
];
const Layout = () => {
    const history = useHistory();
    const location = useLocation()
    const { pathname } = location
    const setRouteActive = (value) => {
        history.push(value)
    }
    return (
        <div className={styles.root}>
            <Route exact path="/home">
                <Home/>
            </Route>
            <Route path="/home/question">
                <Question/>
            </Route>
            <Route path="/home/video">
                <Video/>
            </Route>
            <Route path="/home/profile">
                <Profile/>
            </Route>

            <TabBar className="tab-bar" activeKey={pathname} onChange={value => setRouteActive(value)}>
                {tabs.map(item => (
                    <TabBar.Item   key={item.key} icon={item.icon} title={item.title} />
                ))}
            </TabBar>
        </div>
    );
};

export default Layout;
