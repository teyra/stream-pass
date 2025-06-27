"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const router = useRouter();

  const handleNavigatoHome = () => {
    router.push("/"); // 跳转到首页
  };
  return (
    <header className="w-full  text-white py-4 px-8 shadow-md">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <h1
          className="text-2xl font-bold text-[#4abba1] tracking-wide cursor-pointer hover:opacity-80 transition"
          onClick={handleNavigatoHome}
        >
          Stream Pass
        </h1>
        {/* RainbowKit  */}
        <div className="ml-4">
          <ConnectButton label="connect wallet" />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
