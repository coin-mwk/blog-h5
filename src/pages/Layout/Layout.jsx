import React, { useEffect } from 'react'
import { Layout, Menu ,Popconfirm,message} from 'antd';
import styles from './index.module.scss'
import Home from '../Home/Home';
import Publish from '../Publish/Publish';
import Article from '../Article/Article';
import { Route,Switch, Link, useHistory } from 'react-router-dom';
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import { useSelector ,useDispatch} from 'react-redux';
import {get_layout_info} from '@/store/actions/layout'
import {get_remove_token} from '@/store/actions/login'
const { Header, Content, Sider } = Layout;
const MyLayout = () => {
  const history = useHistory()
  const dispatch=useDispatch()
  const name = useSelector((state)=>state.layout.name)
  useEffect(()=>{
    dispatch(get_layout_info())
  },[dispatch])
  function confirm() {
    message.success('退出登录成功!',1);
    history.push('/login',{from:history.location.pathname})
    dispatch(get_remove_token())
  }
  // 解决发布文章菜单高亮问题
  let pathname=history.location.pathname
  if(pathname.startsWith('/home/publish')){
    pathname='/home/publish'
  }
  console.log(pathname,'pathname');
  return (
    <div className={styles.root}>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <div className="profile">
            <span>{name}</span>
            <Popconfirm
            title="确认退出登录嘛?"
            onConfirm={confirm}
            okText="确定"
            cancelText="取消"
            >
            <span>
              <LogoutOutlined></LogoutOutlined>
              {'  '}退出
            </span>
            </Popconfirm>
          </div>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            {/* theme:风格主题
    defaultSelectedKeys：默认选中 */}
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={[pathname]}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="/home" icon={<HomeOutlined />}>
                 <Link to='/home'>数据概览</Link>
              </Menu.Item>
              <Menu.Item key="/home/article" icon={<DiffOutlined />}>
                <Link to='/home/article'>内容管理</Link>
              </Menu.Item>
              <Menu.Item key="/home/publish" icon={<EditOutlined />}>
                <Link to='/home/publish'>发布文章</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: '20px 24px 24px' }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              {/* 路由 */}
              <Switch>
                <Route exact path='/home' component={Home}></Route>
                <Route path='/home/article' component={Article}></Route>
                <Route key='add' exact path='/home/publish' component={Publish}></Route>
                <Route key='edit' path='/home/publish/:id' component={Publish}></Route> 
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  )
}

export default MyLayout