import { useContext, useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { AuthContext } from '../../context/AuthContext';

import './DashboardLayout.css';
import logo from '../../../../assets/images/Buscabelo_logo.png';

const { Content, Footer, Sider } = Layout;

function AppLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { logout } = useContext(AuthContext);

  function onCollapse() {
    setIsCollapsed(!isCollapsed);
  }

  function handleLogout() {
    logout();
  }

  // possivel bug no mobile?
  const currentPath = window.location.pathname;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light" collapsible collapsed={isCollapsed} onCollapse={onCollapse}>
        <div className="logo">
          <img src={logo} alt="Buscabelo" />
        </div>
        <Menu theme="light" selectedKeys={[currentPath]} mode="inline">
          <Menu.Item key="/painel" icon={<PieChartOutlined />}>
            <NavLink to="/painel">
              Meu Estabelecimento
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/painel/servicos" icon={<PieChartOutlined />}>
            <NavLink to="/painel/servicos">
              Serviços
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/painel/agendamentos" icon={<DesktopOutlined />}>
            <NavLink to="/painel/agendamentos">
              Listar Agendamentos
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/logout/" onClick={handleLogout} icon={<LogoutOutlined style={{color:'red'}} />}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '16px' }}>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Buscabelo Inc.</Footer>
      </Layout>
    </Layout>
  );
}

export default withRouter(AppLayout);
