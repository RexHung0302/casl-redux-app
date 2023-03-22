import React, { useState } from "react";
import { Layout, theme } from "antd";
import Sider from '@/pages/dashboard/layout/Sider';
import Header from '@/pages/dashboard/layout/Header';
import { Content } from "antd/lib/layout/layout";

interface IDashboardLayoutProps {
  children: React.ReactNode;
};

const DashboardLayout = ({
  children
}: IDashboardLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  return (
    <Layout className="w-full h-full flex-row">
      <Sider
        collapsed={collapsed}
      />
      <Layout className="site-layout">
        <Header 
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          colorBgContainer={colorBgContainer}
        />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            height: 100,
            overflowX: 'hidden',
            overflowY: 'scroll'
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
