import { menuItems } from "@/utils/menu";
import { Menu } from "antd";
import Sider from "antd/lib/layout/Sider";

interface ISiderComponentProps {
  collapsed: boolean;
}

const SiderComponent = ({
  collapsed
}: ISiderComponentProps) => {
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={260}
      collapsedWidth={70}
    >
      <div style={{
        height: 32,
        margin: 16,
        background: 'rgba(255, 255, 255, 0.3)'
      }} />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={menuItems()}
      />
    </Sider>
  );
};

export default SiderComponent;