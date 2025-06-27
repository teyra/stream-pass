"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Carousel } from "@arco-design/web-react";
import Image from "next/image";
import { useAccount } from "wagmi";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";

export default function Home() {
  const router = useRouter(); // Use useRouter for navigation
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();

  const { isConnected } = useAccount();
  const roleList = [
    {
      title: "🎥 Fan",
      shortDesc: "Explore and enjoy exclusive content.",
      url: "/video",
      button: "Start Exploring",
      image:
        "https://mammoth-plum-sheep.myfilebase.com/ipfs/QmcYuvpcgEVLYCh2Wy2BbWwGAppUFogkSHt7Z8RrSDxFzt",
      features: [
        "Browse and watch premium films",
        "Unlock VIP content with tokens",
        "Collect limited edition NFT moments",
        "Vote on story development",
        "Join fan-only communities",
      ],
    },
    {
      title: "🚀 Creator",
      shortDesc: "Build, launch, and profit from your films.",
      url: "/film",
      button: "Create Content",
      image:
        "https://mammoth-plum-sheep.myfilebase.com/ipfs/QmSqHJ1wCWVLUqWzFDcUpfUWj3ByREcN6gbsYJYB2u9JDJ",
      features: [
        "Publish film projects and set funding goals",
        "Issue FilmTokens to your investors",
        "Share profits with token holders",
        "Unlock content with NFT access control",
        "Build direct fan communities",
      ],
    },
    {
      title: "💰 Investor",
      shortDesc: "Invest and earn from great stories.",
      url: "/film",
      button: "Invest Now",
      image:
        "https://mammoth-plum-sheep.myfilebase.com/ipfs/QmUHALvcQTqfy4goZjUP1M4MAJADfB2EG6KjZSamyJm5kK",
      features: [
        "Invest in film projects with USDC",
        "Receive ERC1155 FilmTokens",
        "Earn on-chain dividends and rewards",
        "Trade or transfer tokens across chains",
        "Track transparent earnings and history",
      ],
    },
  ];
  const handleGo = (item: any) => {
    console.log(isConnected, "isConnected");
    if (!isConnected) {
      openConnectModal && openConnectModal();
      return;
    }

    router.push(item.url);
  };
  const handleChange = (e: any) => {
    setCurrentIndex(e);
  };
  return (
    <div className="text-white overflow-hidden">
      {/* Hero Section */}
      <AnimatePresence>
        {!started && (
          <motion.section
            className="relative  flex flex-col justify-center items-center text-center px-6"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1 }}
          >
            <div className="z-10">
              <div className="relative w-[1200px] h-[800px]">
                <Image
                  src="/film_web3.png"
                  alt="logo"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-[#4abba1] mb-6 drop-shadow-lg">
                Film Stories · Collect Memories
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                Participate in the creation of the next blockbuster.
              </p>
              <button
                onClick={() => setStarted(true)}
                className="bg-[#4abba1] text-black font-semibold py-3 px-8 rounded-xl hover:bg-[#00e0ad] transition shadow-lg"
              >
                Start Exploring
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Identity Section */}
      <AnimatePresence>
        {started && (
          <motion.section
            key="identity"
            className="bg-[#1a1a1a] py-20 px-6 min-h-screen"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="max-w-6xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold text-[#4abba1] mb-4">
                Choose Your Role
              </h2>
              <p className="text-gray-400">
                Engage with the world of films, different roles, different
                experiences.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-10 mt-20 px-6 justify-center items-start">
              {/* 左侧轮播 */}
              <Carousel
                autoPlay
                animation="card"
                onChange={handleChange}
                showArrow="never"
                indicatorPosition="outer"
                style={{ width: 800, height: 540 }}
              >
                {roleList.map((role, index) => (
                  <div
                    key={index}
                    className="bg-[#1f1f1f] p-8 rounded-2xl border border-[#333] shadow-md transition flex flex-col items-center"
                    style={{
                      backgroundImage: `url(${role.image})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      width: 360,
                      height: 540,
                    }}
                  ></div>
                ))}
              </Carousel>
              {/* 右侧玩法卡片 */}
              <div className="max-w-lg bg-[#1f1f1f] p-8 rounded-2xl border border-[#333] shadow-xl text-white">
                <h3 className="text-3xl font-semibold text-[#a0933d] mb-4">
                  {roleList[currentIndex].title}
                </h3>
                <p className="text-xl text-gray-400 mb-6">
                  {roleList[currentIndex].shortDesc}
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6">
                  {roleList[currentIndex].features.map((f, i) => (
                    <li key={i}>✅ {f}</li>
                  ))}
                </ul>
                <button
                  onClick={() => handleGo(roleList[currentIndex])}
                  className="text-lg bg-[#4abba1] text-black font-semibold py-3 px-6 rounded-xl hover:bg-[#00e0ad] transition"
                >
                  {roleList[currentIndex].button}
                </button>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
