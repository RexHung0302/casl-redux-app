import { ReactElement, useEffect, useState } from "react";
import DashboardLayout from "@/pages/dashboard/layout";
import Search from "@/pages/dashboard/article-manager/Search";
import { Button, FormRule, Row, Col, Table, message, Popconfirm, Modal, Form, Input } from "antd";
import { ColumnsType } from "antd/es/table";
import { useSelector } from "react-redux";
import { selectAbility, selectAuthState } from "@/store/reducers/authSlice";

interface IArticleManagerProps {
  propsPosts: IPost[];
}

const ArticleManager = ({
  propsPosts
}: IArticleManagerProps) => {
  const ability = useSelector(selectAbility);
  const [editForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [posts] = useState<IPost[]>(propsPosts);
  const [editModalVisible, setEditModalVisible] = useState(false);

  // Edit Article
  const openEditModalHandler = (record: IPost) => {
    const { title, body, userId, id } = record;
    editForm.setFieldValue('id', id);
    editForm.setFieldValue('userId', userId);
    editForm.setFieldValue('title', title);
    editForm.setFieldValue('body', body);
    setEditModalVisible(true);
  };

  useEffect(() => {
    if (!editModalVisible) editForm.resetFields();
  }, [editModalVisible])

  // Delete Article
  const articleDeleteHandler = async (id: IPost["id"]) => {
    setLoading(true);
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    });
    await res.json();
    
    setLoading(false);
    message.success('successfully Deleted!');
  };

  const columns: ColumnsType<IPost> = [
    {
      title: <div className="whitespace-nowrap">ID</div>,
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: <div className="whitespace-nowrap">User ID</div>,
      dataIndex: 'userId',
      key: 'userId'
    },
    {
      title: <div className="whitespace-nowrap">Title</div>,
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: <div className="whitespace-nowrap">Content</div>,
      dataIndex: 'body',
      key: 'body'
    },
    ability.can('U', 'article-manager') || ability.can('D', 'article-manager') ? {
      title: <div className="whitespace-nowrap">Action</div>,
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <Row align='middle' justify='center' wrap={false} gutter={8}>
          {
            ability.can('U', 'article-manager') && (
              <Col>
                <Button
                  type="primary"
                  loading={loading}
                  onClick={() => openEditModalHandler(record)}
                >
                  Edit
                </Button>
              </Col>
            )
          }
          {
            ability.can('D', 'article-manager') && (
              <Col>
                <Popconfirm
                  title="Delete the Article"
                  description="Are you sure to delete this Article?"
                  onConfirm={() => articleDeleteHandler(record.id)}
                  okText="Yes"
                  cancelText="No"
                  disabled={loading}
                >
                  <Button
                    danger
                    type="primary"
                    loading={loading}
                  >
                    Delete
                  </Button>
                </Popconfirm>
              </Col>
            )
          }
        </Row>
      )
    } : {},
  ];

  // Search
  const onFinishSearchHandler = (values: FormRule) => {
    message.success('This search function just for demo');
  };

  // Edit Form Submit
  const submitEditHandeler = () => {
    if (loading) return;

    editForm.validateFields()
      .then(async () => {
        const { id } = editForm.getFieldsValue();

        if (!id) return;

        setLoading(true);

        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
          method: "PUT",
          body: JSON.stringify(editForm.getFieldsValue()),
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        });

        await res.json();

        setLoading(false);
        message.success('successfully Edited!');
        setEditModalVisible(false);
      });
  }

  return (
    <>
      <Search
        loading={loading}
        resetHandler={() => {}}
        onSearchHandler={onFinishSearchHandler}
      />
      <Table
        className='mt-1'
        columns={columns}
        rowKey={(record) => record.id}
        loading={loading}
        dataSource={posts}
        pagination={{
          position: ['bottomCenter'],
          defaultCurrent: 1,
          current: currentPage,
          pageSizeOptions: ['10', '25', '50', '100'],
          pageSize,
          showSizeChanger: true,
          onShowSizeChange: (current, size) => {
            setPageSize(size);
          },
          onChange: (current, size) => {
            setCurrentPage(current);
          }
        }}
      />
      {/* Edit Modal */}
      <Modal
        title="Edit Article"
        centered
        open={editModalVisible}
        onOk={() => submitEditHandeler()}
        onCancel={() => {
          if (loading) return;
          setEditModalVisible(false);
        }}
      >
        <Form form={editForm} layout="vertical" autoComplete="off" disabled={loading}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="id" className="hidden" />
              <Form.Item name="userId" className="hidden" />
              <Form.Item name="title" label="Title" rules={[{ required: true, type: 'string' }]}>
                <Input placeholder='Title' />
              </Form.Item>
              <Form.Item name="body" label="body" rules={[{ required: true, type: 'string' }]}>
                <Input.TextArea placeholder='body' rows={8} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
};

ArticleManager.getLayout = (page: ReactElement) => {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
};

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export async function getServerSideProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  
  return {
    props: {
      propsPosts: data
    }
  };
}

export default ArticleManager;