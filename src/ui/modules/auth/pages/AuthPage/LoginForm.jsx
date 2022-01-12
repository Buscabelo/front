import { Form, Input, Button, Spin } from 'antd';

export default function LoginForm({ onFinishLogin, onFinishLoginFailed, isLoading }) {
  return (
    <Spin spinning={isLoading}>
      <Form
        onFinish={onFinishLogin}
        onFinishFailed={onFinishLoginFailed}
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
          <Input placeholder="Email" />
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
            Entrar
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
}
