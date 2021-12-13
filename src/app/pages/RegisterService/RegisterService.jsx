import { Form, Input, Button, InputNumber, message } from 'antd';
import { useHistory } from 'react-router';

export default function RegisterService() {
  const history = useHistory();
  const [form] = Form.useForm();
  const token = JSON.parse(localStorage.getItem('@buscabelo-estabelecimento/token'));
  const me = JSON.parse(localStorage.getItem('@buscabelo-estabelecimento/me'));

  async function handleSubmit(e) {
    const payload = {
      name: e.name,
      description: e.description,
      value: e.value,
      provider: me.id
    };

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${token}`);

    const requestOptions = {
      headers,
      method: 'POST',
      body: JSON.stringify(payload)
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_AD}/services`, requestOptions);

      if (response.status.valueOf() === 401) history.pushState('/sessions');
      else if (response.status.valueOf() !== 200) message.warning('Bad Request');
      else message.success('Serviço cadastrado com sucesso!');
    } catch (err) {
      message.error('Bad Request');
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }} >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item required name="name" label="Service Name">
          <Input />
        </Form.Item>
        <Form.Item required name="description" label="Service Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item required name="value" label="Service Value">
          <InputNumber />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
