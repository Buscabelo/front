import { Row, Col, Rate } from 'antd';
import { DeleteOutlined, PushpinOutlined } from '@ant-design/icons';

import './UserReviewComponent.css';

export default function UserReviewComponent({ rate, comment, username }) {
  return (
    <div style={{ display: 'flex', height: '100%', minHeight: 'fit-content' }} >
      {/* span={2} */}
      <Col sm={2} xs={0} style={{ textAlign: 'center', height: '100%' }} className="gutter-row">
        <div style={{ height: '40px', width: '40px', borderRadius: '100%', background: '#ccc' }} />
      </Col>
      {/* span={18} */}
      <Col flex={'auto'} style={{ height: '100%' }} className="gutter-row">
        <Row>
          <Col flex={'100px'}>
            <span style={{ display: 'flex' }}>{username}<span xs={0} style={{ width: '5px' }}  /><span xs={0} style={{ fontStyle: 'italic', color: 'GrayText', fontSize: '.7em', alignSelf: 'end' }}> 2021-04-10</span></span>
          </Col>
          <Col flex={'auto'}>
            <Rate style={{ fontSize: '0.8em', float: 'inline-end', marginRight: '15px' }} defaultValue={rate} disabled />
          </Col>
        </Row>
        { comment && <Row><p style={{ maxWidth: '100%', wordBreak: 'break-word' }} >{comment}</p></Row>}
      </Col>
      {/* span={4} */}
      <Col sm={2} xs={0} style={{ height: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }} className="gutter-row">
        <span id="btn-pin">
          <PushpinOutlined />
        </span>
        <span id="btn-delete">
          <DeleteOutlined />
        </span>
      </Col>
    </div>
  );
}
