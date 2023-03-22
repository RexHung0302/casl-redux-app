import React, { useCallback } from "react";
import router from "next/router";
import { Row, Col, Dropdown, Avatar, MenuProps } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";
import { Header } from "antd/lib/layout/layout";

interface IHeaderComponentProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  colorBgContainer: string;
}

const HeaderComponent = ({
  collapsed,
  setCollapsed,
  colorBgContainer
}: IHeaderComponentProps) => {

  const dropdownItems = useCallback((): MenuProps['items'] => [
    {
      label: 'Logout',
      key: '0',
      onClick: () => {
        localStorage.removeItem('jwtToken');
        router.push('/login');
      }
    },
  ], []);

  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <Row align="middle" justify="space-between">
        <Col>
          <span className="px-4">
            {
              React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              })
            }
          </span>
        </Col>
        <Col className="pr-4">
          <Dropdown menu={{ items: dropdownItems() }} trigger={['click']} className="cursor-pointer">
            <Avatar icon={<UserOutlined />} />
          </Dropdown>
        </Col>
      </Row>
    </Header>
  )
}

export default HeaderComponent;