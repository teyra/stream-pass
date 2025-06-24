"use client";

import { usePathname, useRouter } from "next/navigation";
import { Menu } from "@arco-design/web-react";
import { useEffect, useState } from "react";

const MenuItem = Menu.Item;

const menuList = [
  {
    key: "/film",
    title: "热门电影",
  },
  {
    key: "/film/mine",
    title: "我的电影",
  },
  {
    key: "/film/assets",
    title: "我的资产",
  },
];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedKey, setSelectedKey] = useState("/film/main");

  // 路由变化时更新选中项
  useEffect(() => {
    const matched = menuList.find((m) => pathname?.startsWith(m.key));
    if (matched) setSelectedKey(matched.key);
  }, [pathname]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* 左侧菜单栏 */}
      <Menu
        style={{
          width: 220,
          height: "100vh",
          borderRight: "1px solid #2a2a2a",
          backgroundColor: "#181a20", // 深色背景
        }}
        theme="dark"
        selectedKeys={[selectedKey]}
        onClickMenuItem={(key) => {
          setSelectedKey(key);
          router.push(key);
        }}
        className="custom-menu"
      >
        {menuList.map((item) => (
          <MenuItem key={item.key}>{item.title}</MenuItem>
        ))}
      </Menu>

      {/* 右侧主内容区域 */}
      <div className="flex-1 bg-[#121212] p-6 overflow-auto">{children}</div>
    </div>
  );
}
