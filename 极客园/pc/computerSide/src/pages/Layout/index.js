import { Link, Switch, Route, Redirect } from "react-router-dom";
import { Layout, Menu, Popconfirm, Button } from 'antd';
import {
  HomeOutlined,
  DiffOutlined,
  EditFilled,
  LogoutOutlined
} from "@ant-design/icons";
import { useDispatch } from 'react-redux'
import { useLocation,useHistory } from "react-router-dom";
import "@/pages/Layout/index.scss"

import Dashboard from "@/pages/Dashboard";
import Article from "@/pages/Article";
import Publish from "@/pages/Publish";
import { logout } from "@/store/actions";
const { Header, Content, Sider } = Layout;

const GeekLayout = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  let selectedKey = location.pathname

  // 退出登录
  const onLogout = ()=>{
    dispatch(logout())
    history.push("/login")
  }

  return (
    <Layout className='geek-layout'>
      <Sider width={200}>
        <div className="logo"></div>
        <Menu selectedKeys={[selectedKey]} mode="inline" theme="dark">
          <Menu.Item icon={<HomeOutlined />} key="/home/dashboard">
            <Link to="/home/dashboard">数据概览</Link>
          </Menu.Item>
          <Menu.Item icon={<DiffOutlined />} key="/home/article">
            <Link to="/home/article">内容管理</Link>
          </Menu.Item>
          <Menu.Item icon={<EditFilled />} key="/home/publish">
            <Link to="/home/publish">发布文章</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header>
          <div className="user-info">
            <span>刘谋</span>
            <Popconfirm
              placement="bottomRight"
              title="是否确认退出？"
              okText="确认"
              cancelText="取消"
              onConfirm={onLogout}
            >
              <Button icon={<LogoutOutlined />} type="link">
                退出
              </Button>
            </Popconfirm>
          </div>
        </Header>
        <Content>
          {/* 子组件渲染 */}
          <Switch>
            <Route path="/home" exact render={() => <Redirect to="/home/dashboard" />} />
            <Route path="/home/dashboard" component={Dashboard}></Route>
            <Route path="/home/article" component={Article}></Route>
            <Route path="/home/publish" component={Publish}></Route>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  )
}

export default GeekLayout