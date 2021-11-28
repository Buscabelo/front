import React, { useContext, useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { AuthContext } from '../../context/AuthContext';

import "./DashboardLayout.css";
import logo from '../../assets/images/logo.png'

const { Content, Footer, Sider } = Layout;

const AppLayout = ({ children }) => {

  const [isCollapsed, setIsCollapsed] = useState(true);
  const { logout } = useContext(AuthContext)
  function onCollapse() {
    setIsCollapsed(!isCollapsed)
  };

  function handleLogout() {
    logout()
  }

  //possivel bug no mobile ?
  let currentPath = window.location.pathname

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light" collapsible collapsed={isCollapsed} onCollapse={onCollapse}>
        <div className="logo">
          <img src={logo} alt="Buscabelo" />
        </div>
        <Menu theme="light" selectedKeys={[currentPath]} mode="inline">
          <Menu.Item key="/dashboard" icon={<PieChartOutlined />}>
            <NavLink to="/dashboard">
              Meu Estabelecimento
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/dashboard/service/" icon={<PieChartOutlined />}>
            <NavLink to="/dashboard/service/">
              Serviços
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/dashboard/service/register/" icon={<DesktopOutlined />}>
            <NavLink to="/dashboard/service/register/">
              Cadastrar Serviço
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/dashboard/appointments/" icon={<DesktopOutlined />}>
            <NavLink to="/dashboard/appointments/">
              Listar Agendamentos
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/logout/" onClick={handleLogout} icon={<LogoutOutlined style={{color:"red"}} />}>
              Logout
          </Menu.Item>
          {/* 
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          */}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        {/*<Header className="site-layout-background" style={{ padding: 0 }} />*/}
        <Content style={{ margin: '16px' }}>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Buscabelo Inc.</Footer>
      </Layout>
    </Layout>
  );
}

export default withRouter(AppLayout); 
