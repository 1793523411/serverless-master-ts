import React, { useState} from 'react';
import { Route } from "react-router-dom";

import './admin.css'
import { Layout, Menu, Breadcrumb } from 'antd';

import {
  BarsOutlined,
  PlusCircleOutlined,
  BarChartOutlined,
  FormOutlined
} from '@ant-design/icons';

import Addperson from './body/Addperson'
import Manager from './body/Manage'
import Chart from './body/Chart'
import Addnews from './body/Addnews'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {

  const [collapsed, setCollapsed] = useState(false)
  const [url, setUrl] = useState('')

  const onCollapse = () => {
    setCollapsed(!collapsed)
  }

    const handleClickArticle = e=>{
    setUrl(e.key)
    // console.log(e.item.props)
    if(e.key=='Addperson'){
      setUrl('添加成员')
      props.history.push('/index/add')
    }else if(e.key === 'Chart'){
      setUrl('数据统计')
      props.history.push('/index/chart')
    }else if(e.key==='addNews'){
      setUrl('添加文章')
      props.history.push('/index/addnews')
    }else{
      setUrl('管理成员')
      props.history.push('/index')
    }

  }

  return (
    <Layout style={{ minHeight: '100vh' }} >
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} style={{position:"fixed",height:"100%"}}>
        <div className="logo" style={{height: 32,backgroundColor: '#ffffff33',color:'#fff',margin: 16,textAlign:'center',lineHeight:2.2}}>欢迎</div>
        <Menu theme="dark" defaultSelectedKeys={['Manager']} mode="inline" onClick={handleClickArticle}>
          <Menu.Item key="Addperson" icon={<PlusCircleOutlined />}>
            添加成员
            </Menu.Item>
          <Menu.Item key="Manager" icon={<BarsOutlined />}>
            管理成员
            </Menu.Item>
          <Menu.Item key="Chart" icon={<BarChartOutlined />}>
            数据统计
            </Menu.Item>
          <Menu.Item key="addNews" icon={<FormOutlined />}>
            添加文章
            </Menu.Item>
          <Menu.Item key="">
            更多功能开发中 ···
            </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{marginLeft:200}}>
        <Header className="site-layout-background" style={{ padding: 0 }} >
          <div style={{fontSize:28,paddingLeft:20,fontWeight:'bold'}}>社团管理</div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>用户</Breadcrumb.Item>
            <Breadcrumb.Item>{url}</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 450 }}>

              <div>
                <Route path="/index/" exact component={Manager} />
                <Route path="/index/add/" exact component={Addperson} />
                <Route path="/index/chart/" exact component={Chart} />
                <Route path="/index/addnews/" exact component={Addnews} />
              </div>

            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>跌倒的小黄瓜 ©2020 Created by Aliyun Midway</Footer>
      </Layout>
    </Layout>
  )
}

export default AdminIndex
