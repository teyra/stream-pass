"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Carousel } from "@arco-design/web-react";
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
      description:
        "Browse films, unlock exclusive content, and collect NFT moments.",
      button: "Start Exploring",
      url: "/video",
      image:
        "https://mammoth-plum-sheep.myfilebase.com/ipfs/QmcYuvpcgEVLYCh2Wy2BbWwGAppUFogkSHt7Z8RrSDxFzt",
    },
    {
      title: "🚀 Creator",
      url: "/film",
      description:
        "Launch projects, publish series, attract investments, and share profits.",
      image:
        "https://mammoth-plum-sheep.myfilebase.com/ipfs/QmSqHJ1wCWVLUqWzFDcUpfUWj3ByREcN6gbsYJYB2u9JDJ",
      button: "Create Content",
    },
    {
      title: "💰 Investor",
      url: "/film",
      description:
        "Invest in great films, earn FilmToken, and participate in Web3 dividends.",
      image:
        "https://mammoth-plum-sheep.myfilebase.com/ipfs/QmUHALvcQTqfy4goZjUP1M4MAJADfB2EG6KjZSamyJm5kK",
      button: "Invest Now",
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
    <div className="min-h-screen text-white overflow-hidden">
      {/* Hero Section */}
      <AnimatePresence>
        {!started && (
          <motion.section
            className="relative h-screen flex flex-col justify-center items-center text-center px-6"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1 }}
          >
            <div className="z-10 max-w-3xl">
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
            <div className="flex flex-col mt-20">
              <Carousel
                autoPlay
                animation="card"
                onChange={handleChange}
                showArrow="never"
                indicatorPosition="outer"
                style={{ width: "100%", height: 540 }}
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
              <div className="text-center mt-10">
                <h3 className="text-3xl font-semibold text-[#a0933d] mb-4">
                  {roleList[currentIndex].title}
                </h3>
                <p className="text-2xl text-gray-400 mb-6 text-center">
                  {roleList[currentIndex].description}
                </p>
                <button
                  onClick={() => handleGo(roleList[currentIndex])}
                  className="text-xl bg-[#4abba1] text-black font-semibold py-4 px-8 rounded-xl hover:bg-[#00e0ad] transition"
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
