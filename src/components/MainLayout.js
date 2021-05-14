import React from 'react';
import { Switch, Route, Redirect, useHistory, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  QuestionCircleOutlined,
  SelectOutlined,
  GiftOutlined,
  PlusCircleOutlined,
  NotificationOutlined,
  TeamOutlined,
  SearchOutlined,
  FileAddOutlined,
} from '@ant-design/icons';

import './MainLayout.css';

import Home from './Home';
import Announcements from './Announcements';
import Search from './Search';
import AllMembers from './AllMembers';
import AddMember from './AddMember';
import GiftCodeCheck from './giftcode/Check';
import GiftCodeRedeem from './giftcode/Redeem';
import GiftCodeGenerate from './giftcode/Generate';

import logo from '../img/example-logo.svg';

const { Content, Sider } = Layout;

const MainLayout = (props) => {
  let location = useLocation();
  let history = useHistory();

  return (
    <Layout>
      <Sider
        theme='dark'
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <div className='logo'>
          <img src={logo} alt='logo' />
        </div>

        <Menu theme='dark' mode='inline' defaultSelectedKeys={[location.pathname]}>
          <Menu.Item onClick={() => history.push('/gymms')} key='/gymms' icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item onClick={() => history.push('/gymms/announcements')} key='/gymms/announcements' icon={<NotificationOutlined />}>
            Announcements
          </Menu.Item>
          <Menu.Item onClick={() => history.push('/gymms/search')} key='/gymms/search' icon={<SearchOutlined />}>
            Search
          </Menu.Item>
          <Menu.Item onClick={() => history.push('/gymms/all-members')} key='/gymms/all-members' icon={<TeamOutlined />}>
            All members
          </Menu.Item>
          <Menu.SubMenu key='sub1' icon={<GiftOutlined />} title='Gift code'>
            <Menu.Item onClick={() => history.push('/gymms/gift-code/check')} key='/gymms/gift-code/check' icon={<QuestionCircleOutlined />}>
              Check
            </Menu.Item>
            <Menu.Item onClick={() => history.push('/gymms/gift-code/redeem')} key='/gymms/gift-code/redeem' icon={<SelectOutlined />}>
              Redeem
            </Menu.Item>
            <Menu.Item onClick={() => history.push('/gymms/gift-code/generate')} key='/gymms/gift-code/generate' icon={<FileAddOutlined />}>
              Generate
            </Menu.Item>
          </Menu.SubMenu>

          <Menu.Item onClick={() => history.push('/gymms/add-member')} key='/gymms/add-member' icon={<PlusCircleOutlined />}>
            Add member
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='site-layout' style={{ marginLeft: 200, height: '100vh' }}>
        <Content style={{ margin: '24px 16px', overflow: 'auto' }}>
          <div className='site-layout-background'>
            <Switch>
              <Route exact path='/gymms'>
                <Home />
              </Route>
              <Route path='/gymms/announcements'>
                <Announcements />
              </Route>
              <Route path='/gymms/search'>
                <Search />
              </Route>
              <Route path='/gymms/all-members'>
                <AllMembers />
              </Route>
              <Route path='/gymms/gift-code/check'>
                <GiftCodeCheck />
              </Route>
              <Route path='/gymms/gift-code/redeem'>
                <GiftCodeRedeem />
              </Route>
              <Route path='/gymms/gift-code/generate'>
                <GiftCodeGenerate />
              </Route>
              <Route path='/gymms/add-member'>
                <AddMember />
              </Route>
              <Route path='*'>
                <Redirect to='/gymms' />
              </Route>
            </Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
