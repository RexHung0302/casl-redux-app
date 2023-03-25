import { ReactElement } from "react";
import DashboardLayout from "@/pages/dashboard/layout";
import { useSelector } from "react-redux";
import { selectAbility } from "@/store/reducers/authSlice";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";

const AdminManager = () => {
  const ability = useSelector(selectAbility);

  return (
    <>
      <p>Admin Manager Page, your ability：</p>
      <Row gutter={16}>
        <Col span={24}>
          <span className="text-lg">
            Create：{
              ability.can("C", "admin-manager")
                ? <CheckCircleOutlined className="text-green-500" />
                : <CloseCircleOutlined className="text-red-500" />
            }
          </span>
        </Col>
        <Col span={24}>
          <span className="text-lg">
            Read：{
              ability.can("R", "admin-manager")
                ? <CheckCircleOutlined className="text-green-500" />
                : <CloseCircleOutlined className="text-red-500" />
            }
          </span>
        </Col>
        <Col span={24}>
          <span className="text-lg">
            Read：{
              ability.can("U", "admin-manager")
                ? <CheckCircleOutlined className="text-green-500" />
                : <CloseCircleOutlined className="text-red-500" />
            }
          </span>
        </Col>
        <Col span={24}>
          <span className="text-lg">
            Read：{
              ability.can("D", "admin-manager")
                ? <CheckCircleOutlined className="text-green-500" />
                : <CloseCircleOutlined className="text-red-500" />
            }
          </span>
        </Col>
      </Row>
    </>
  );
};

AdminManager.getLayout = (page: ReactElement) => {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );
}; 

export default AdminManager;