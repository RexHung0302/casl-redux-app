import { Form, Row, Col, Input, Space, Button, FormRule } from "antd";
import { debounce } from "lodash";

interface ISearchProps {
  loading: boolean;
  resetHandler: () => void;
  onSearchHandler: (values: FormRule) => void;
}

const Search = ({
  loading,
  resetHandler,
  onSearchHandler,
}: ISearchProps) => {
  const [form] = Form.useForm();

  return (
    <div className="border border-black p-2">
      <Form form={form} layout="vertical" autoComplete="off" onFinish={debounce(onSearchHandler, 1000)}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="Title" label="Title" rules={[{ required: true }]}>
              <Input placeholder='Search by Title' />
            </Form.Item>
          </Col>
          <Col span={24} className="text-right">
            <Space>
              <Button type="primary" loading={loading} htmlType="submit">
                Search
              </Button>
              <Button htmlType="button" loading={loading} onClick={() => {
                form.resetFields();
                resetHandler();
              }}>
                Reset
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Search;