import { selectAbility, selectAuthState } from "@/store/reducers/authSlice";
import { HomeOutlined, KeyOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

type MenuItem = Required<MenuProps>['items'][number];

interface IMenu {
  path: string;
  key: string;
  breadcrumb: string;
  children?: IMenu[];
  meta: {
    icon: any
    title: string;
    auth?: boolean;
  }
}

export const menus: IMenu[] = [
  {
    path: '/dashboard',
    key: 'home',
    breadcrumb: 'Home',
    meta: { 
      icon: <HomeOutlined />,
      title: 'Home'
    },
  },
  {
    path: '/dashboard/article-manager',
    key: 'article-manager',
    breadcrumb: 'Article Manager',
    meta: {
      icon: <UnorderedListOutlined />,
      title: 'Article Manager',
      auth: true
    },
  },
  {
    path: '/dashboard/admin-manager',
    key: 'admin-manager',
    breadcrumb: 'Admin Manager',
    meta: {
      icon: <KeyOutlined />,
      title: 'Admin Manager',
      auth: true
    },
  }
];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
  path?: string,
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    path,
  } as MenuItem;
}

export const menuItems = (propMenus: IMenu[] = menus): MenuItem[] => {
  const ability = useSelector(selectAbility);
  const authState = useSelector(selectAuthState); // Must keep this line for rerender.
  const router = useRouter();
  
  return propMenus
    .filter((menu: IMenu) => ability.can('R', menu.key))
    .map((menu: IMenu) => {
      return getItem(
        <a
          onClick={() => router.push(menu.path)}
          aria-hidden="true"
          key={menu.key}
        >{menu.meta.title}</a>,
        menu.key,
        menu.meta.icon,
        menu.children ? menuItems(menu.children) : undefined,
        undefined,
        menu.path
      )
    })
} 