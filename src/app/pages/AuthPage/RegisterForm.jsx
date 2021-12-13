import { Form, Input, Button, Spin } from 'antd';

export default function RegisterForm({ onFinishRegister, onFinishRegisterFailed, isLoading }) {
  return (
    <Spin spinning={isLoading}>
      <Form
        name="basic"
        onFinish={onFinishRegister}
        onFinishFailed={onFinishRegisterFailed}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Insira seu email',
            },
          ]}
        >
          <Input placeholder='Email' />
        </Form.Item>

        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Insira o nome do estabelecimento',
            },
          ]}
        >
          <Input placeholder="Nome do estabelecimento" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Insira sua senha',
            },
          ]}
        >
          <Input.Password placeholder="Senha" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Cadastrar
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
}
