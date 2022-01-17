import { useState, useEffect, useContext } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { useHistory } from 'react-router';
import { Row, Col, Layout, Card } from 'antd';
// import UserReviewComponent from '../../components/UserReviewComponent/UserReviewComponent';
import { ResponseHandlerContext } from '../../context/ResponseHandlerContext';
import Graph from './Graph';
import { default as Calendar } from './Calendar';

import './styles.css';

const { Content } = Layout;
const minAppointments = 1;
const defaultRate = 0;

// const style = { background: '#0092ff', padding: '8px' };

export default function Dashboard() {
  const { query } = useContext(ResponseHandlerContext);
  const history = useHistory();

  // const [userData, setUserData] = useState();
  const [cardsData, setCardsData] = useState();
  const [graphData, setGraphData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const user = await JSON.parse(localStorage.getItem('@buscabelo-estabelecimento/me'));
      const token = await JSON.parse(localStorage.getItem('@buscabelo-estabelecimento/token'));

      // shallow check
      if (!user || !token) return history.push('sessions/');

      const appointments = await query({
        link: `${process.env.REACT_APP_BACKEND_AD}/appointments`,
        method: 'GET',
        auth: true,
      });

      const localStorageMe = JSON.parse(localStorage.getItem('@buscabelo-estabelecimento/me'));
      let me = null;

      if (localStorageMe) {
        me = await query({
          link: `${process.env.REACT_APP_BACKEND_AD}/providers/${localStorageMe.id}`,
          method: 'GET',
          auth: true,
        }).then(({response}) => response?.provider);
      }

      const canceledAppointments = appointments.response.appointments.filter(ap => ap.canceled_at);
      const finishedAppontments = appointments.response.appointments.filter(ap => ap.time_done_at);
      const graphCanceledAppointments = {};
      const graphFinishedAppointments = {};
      let amount = 0;

      appointments.response.appointments.forEach(ap => {
        amount += ap.service.value;

        if (ap.time_done_at) {
          const data = new Date(ap.time_done_at).toLocaleDateString();
          graphFinishedAppointments[data] = graphFinishedAppointments[data]++ || minAppointments;

          if (!graphCanceledAppointments[data]) {
            graphCanceledAppointments[data] = 0;
          }
        } else if (ap.canceled_at) {
          const data = new Date(ap.canceled_at).toLocaleDateString();
          graphCanceledAppointments[data] = graphCanceledAppointments[data]++ || minAppointments;

          if (!graphFinishedAppointments[data]) {
            graphFinishedAppointments[data] = 0;
          }
        }
      });

      const graphData = [];
      Object.entries(graphFinishedAppointments).forEach(f_ap => {
        const [date, value,] = f_ap;

        graphData.push({ value, date, category: 'Finalizado' });
        graphData.push({ value: graphCanceledAppointments[date], date, category: 'Cancelado' });
      });

      setCardsData({
        canceledAppointments,
        finishedAppontments,
        appointments: appointments.response.appointments,
        rate: me?.rating || defaultRate,
        amount
      });

      setGraphData(graphData);
      // setUserData(user);
      setIsLoading(false);
    })();
  }, [history, query]);

  if (isLoading) return <div>Loading...</div>;

  if (isMobile || isTablet) {
    return null;
  }

  return (
    <Layout>
      {/* <Header style={{ margin: '10px', minHeight: '200px', position: 'relative' }}>
        <span style={{
          position: 'absolute',
          bottom: '0px',
          left: '130px',
          height: '72px',
          color: 'white',
          fontSize: 'x-large'
        }}>{userData.name}</span>

        <div style={{
          background: '#333',
          position: 'absolute',
          bottom: '20px',
          left: '30px',
          borderRadius: '100px',
          height: '100px',
          width: '100px'
        }}></div>
      </Header> */}
      <Content className="site-card-border-less-wrapper">
        <Row>
          <Col md={6} sm={6} xs={24} className="gutter-row" span={6}>
            <Card style={{ margin: '10px' }} className="dashboard-card" title="Movimentações" bordered={false} >
              <p style={{ textAlign: 'center', fontSize: '2em' }} >R$ {cardsData.amount}</p>
            </Card>
          </Col>
          <Col md={6} sm={6} xs={24} className="gutter-row" span={6}>
            <Card style={{ margin: '10px' }} className="dashboard-card" title="Agendamentos" bordered={false} >
              <p style={{ textAlign: 'center', fontSize: '2em' }}>{cardsData.appointments.length}</p>
            </Card>
          </Col>
          <Col md={6} sm={6} xs={24} className="gutter-row" span={6}>
            <Card style={{ margin: '10px' }} className="dashboard-card" title="Cancelamentos" bordered={false} >
              <p style={{ textAlign: 'center', fontSize: '2em' }} >{cardsData.canceledAppointments.length}</p>
            </Card>
          </Col>
          <Col md={6} sm={6} xs={24} className="gutter-row" span={6}>
            <Card style={{ margin: '10px' }} className="dashboard-card" title="Avaliações" bordered={false} >
              <p style={{ textAlign: 'center', fontSize: '2em' }} >{cardsData.rate}</p>
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: '10px' }}>
          <Col xs={24} sm={24} md={16} lg={16} className="gutter-row" span={16}>
            <Card style={{ margin: '10px' }} className="dashboard-card" title="Agendamentos (Finalizados vs Cancelados)" bordered={true} >
              <Graph data={graphData} />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} className="gutter-row" span={8}>
            <Card style={{ margin: '10px' }} className="dashboard-card" title="Agendamentos" bordered={true} >
              <Calendar />
            </Card>
          </Col>
        </Row>
        {/* <Row style={{ display: 'flex', flexDirection: 'column', background: '#fff', margin: '10px', marginTop: '20px' }}>
          <Card bordered style={{ margin: '10px' }}>
            <UserReviewComponent profilePicSrc={""} comment={"Muito Bom!"} rate={4} username={"@User1"} />
          </Card>
          <Card bordered style={{ margin: '10px' }}>
            <UserReviewComponent profilePicSrc={""} comment={"Perfeito!"} rate={5} username={"@User2"} />
          </Card>
          <Card bordered style={{ margin: '10px' }}>
            <UserReviewComponent profilePicSrc={""} comment={"Podia melhorar..."} rate={3} username={"@User3"} />
          </Card>
        </Row> */}
      </Content>
    </Layout>
  );
}
