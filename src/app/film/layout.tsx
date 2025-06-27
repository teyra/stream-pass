"use client";

import { usePathname, useRouter } from "next/navigation";
import { Menu } from "@arco-design/web-react";
import { useEffect, useState } from "react";

const MenuItem = Menu.Item;

const menuList = [
  {
    key: "/film",
    title: "Hot Films",
  },
  {
    key: "/film/mine",
    title: "My Films",
  },
  {
    key: "/film/assets",
    title: "My Assets",
  },
];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  console.log("🚀 ~ pathname:", pathname);

  const [selectedKey, setSelectedKey] = useState(() => {
    const matched = [...menuList]
      .sort((a, b) => b.key.length - a.key.length)
      .find((m) => pathname?.startsWith(m.key));
    return matched?.key || "/film";
  });

  // 同步 pathname（如果用户在运行时改变路由）
  useEffect(() => {
    const matched = [...menuList]
      .sort((a, b) => b.key.length - a.key.length)
      .find((m) => pathname?.startsWith(m.key));
    if (matched && matched.key !== selectedKey) {
      setSelectedKey(matched.key);
    }
  }, [pathname, selectedKey]);

  return (
    <div className="flex h-[calc(100vh-107px)] overflow-hidden">
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
      <div className="flex-1 bg-[#121212] p-6 overflow-auto scrollbar-hide">
        {children}
      </div>
    </div>
  );
}
