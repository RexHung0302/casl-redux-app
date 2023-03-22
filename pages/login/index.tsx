import { Row, Col, Card, Button, Form, Input, Alert, FormRule, message } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  const onFinish = async (values: FormRule) => {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(values)
    });
    const { success, message: resMsg, data } = await res.json();

    if (!success) {
      message.error(resMsg);
    } else {
      const { jwt, permission } = data;
      localStorage.setItem("jwtToken", jwt);
      router.push("/dashboard");
    }
  };

  return (
    <>
      <div className='flex items-center justify-center w-full h-full bg-black'>
        <Row gutter={16}>
          <Col span={24}>
            <Card title="Login">
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={(e) => onFinish(e)}
                autoComplete="off"
              >
                <Alert
                  message="Informational Notes"
                  description="Use 'admin' or 'member' for Username, 'password' for Password"
                  type="info"
                  showIcon
                  className="mb-3"
                />

                <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: "Please input your username!" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: "Please input your password!" }]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 10, span: 16 }} className="mb-0">
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Login;