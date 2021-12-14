import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Tabs, Row, Col, Layout, Typography, message } from 'antd';

import { ResponseHandlerContext } from '../../context/ResponseHandlerContext';
import { AuthContext } from '../../context/AuthContext';
import { httpCode } from '../../constants';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Content } = Layout;
const timeoutPeriod = 2000;

export default function AuthPage() {
  const history = useHistory();
  const { query, responseMessage } = useContext(ResponseHandlerContext);
  const { auth } = useContext(AuthContext);
  const [currentTab, setCurrentTab] = useState('1');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => setIsLoading(false), []);

  function handleTabChange(tabKey) {
    setCurrentTab(tabKey);
  }

  async function onFinishLogin(onFinish) {
    setIsLoading(true);
    const { email, password } = onFinish;

    if (!email.includes('@')) {
      setIsLoading(false);
      return message.warning('Opa, parece que o email não tá legal');
    }

    const {response, statusCode} = await query({
      link: `${process.env.REACT_APP_BACKEND_AD}/sessions`,
      body: JSON.stringify({ email, password }),
      method: 'POST'
    });

    responseMessage({statusCode});

    if (statusCode === httpCode.ok) {
      localStorage.setItem('@buscabelo-estabelecimento/me', JSON.stringify(response.user));
      localStorage.setItem('@buscabelo-estabelecimento/token', JSON.stringify(response.token));
    }

    if (statusCode) {
      setTimeout(() => {
        auth();
        history.push('/dashboard');
      }, timeoutPeriod);
      responseMessage({statusCode});
    } else {
      setIsLoading(false);
    }
  }

  function onFinishFormFailed(errMessage) {
    message.error(errMessage || 'Opa, algo deu errado');
  }

  async function onFinishRegister(onFinish) {
    setIsLoading(true);

    const { email, password, name } = onFinish;

    if (!email.includes('@')) {
      setIsLoading(false);
      return message.warning('Opa, parece que o email não tá legal');
    }

    const providerRegistrado = await query({
      link: `${process.env.REACT_APP_BACKEND_AD}/providers`,
      body: JSON.stringify({ email, password, name }),
      method: 'POST'
    });

    responseMessage(providerRegistrado.statusCode);

    if (providerRegistrado.statusCode === httpCode.ok) {
      localStorage.setItem('@buscabelo-estabelecimento/me', JSON.stringify(providerRegistrado.response.provider));

      const providerLogado = await query({
        link: `${process.env.REACT_APP_BACKEND_AD}/sessions`,
        body: JSON.stringify({ email, password, name }),
        method: 'POST'
      });

      if (providerLogado.statusCode === httpCode.ok) {
        localStorage.setItem('@buscabelo-estabelecimento/token', JSON.stringify(providerLogado.response.token));

        setTimeout(() => {
          auth();
          history.push('/dashboard');
        }, timeoutPeriod);
      } else {
        setIsLoading(false);
      }
    }
  }

  return (
    <Layout>
      <Content>
        <Row>
          <Col style={{ height: '100vh', display: 'flex', justifyContent: 'center', position: 'relative' }} span={12}>
            <div style={{ position: 'absolute', top: '90px' }}>
              {
                currentTab === '1' ?
                  <div>
                    <Title>Vem sempre aqui?</Title><br />
                    <Paragraph>Estamos muito felizes em te ver de novo!</Paragraph>
                  </div>
                  :
                  <div>
                    <Title>Seja bem-vindo!</Title><br />
                    <Paragraph>Cadastre seu estabelecimento!</Paragraph>
                  </div>
              }
            </div>
          </Col>
          <Col style={{ height: '100vh', display: 'flex', justifyContent: 'center', position: 'relative' }} span={12}>
            <div style={{ position: 'absolute', top: '90px' }}>
              <Tabs defaultActiveKey="1" onChange={handleTabChange}>
                <TabPane tab="Login" key="1">
                  <LoginForm isLoading={isLoading} onFinishLogin={onFinishLogin} onFinishLoginFailed={onFinishFormFailed} />
                </TabPane>
                <TabPane tab="Register" key="2">
                  <RegisterForm isLoading={isLoading} onFinishRegister={onFinishRegister} onFinishRegisterFailed={onFinishFormFailed} />
                </TabPane>
              </Tabs>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
