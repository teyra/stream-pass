"use client";
import { isValidVIPAbi } from "@/abi/vip";
import VIPAccess from "@/components/VipAccess";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount, useChainId, useReadContract } from "wagmi";
import Image from "next/image";
import { getChainConfig } from "@/config/chainConfig";

const getRandomMovieTitle = () => {
  const movieTitles = [
    "Eternal Epoch",
    "On-Chain Mystery",
    "Quantum Escape",
    "Digital Pursuit",
    "Interstellar Covenant",
    "Contract Life",
    "Future Code",
    "Crypto Chase",
    "Virtual Truth",
    "Image Reconstruction",
  ];
  return movieTitles[Math.floor(Math.random() * movieTitles.length)];
};

const allVideos = Array.from({ length: 50 }, (_, i) => ({
  id: String(i + 1),
  title: getRandomMovieTitle(),
  description: `A sci-fi suspense film exploring the truth behind the digital world.`,
  url: "https://mammoth-plum-sheep.myfilebase.com/ipfs/QmW7Tmv8vaJ2tV65weC6QHEY3u34PCqVdWZymZRcY3t9ku",
  thumbnail:
    "https://mammoth-plum-sheep.myfilebase.com/ipfs/QmRAa3HwZBCcbSwBf978hxDxBxTjTDfx9hNuCFF1UEH4E7",
  author: "Mystery Creator",
  views: Math.floor(Math.random() * 10000) + 1000,
  date: "2024-05-29",
}));

export default function VideoDetailPage() {
  const vipAddress = getChainConfig(useChainId()).sptVipAddress;
  const { id } = useParams();
  const [video, setVideo] = useState<any>(null);
  const { address } = useAccount();
  const chainId = useChainId();
  const [visible, setVisible] = useState(false);
  const SUPPORTED_CHAINS = [43113];
  const isSupportedChain = SUPPORTED_CHAINS.includes(chainId);

  const {
    data: hasNFT,
    isSuccess,
    refetch,
  } = useReadContract({
    abi: isValidVIPAbi,
    address: vipAddress,
    functionName: "isValidVIP",
    args: [address as `0x${string}`],
  });

  useEffect(() => {
    if (isSuccess && !hasNFT) {
      console.log("🚀 ~ useEffect ~ hasNFT:", hasNFT);
      setVideo(null);
      setVisible(true);
    } else if (isSuccess && hasNFT) {
      setVideo(allVideos.find((v) => v.id === id));
    }
  }, [hasNFT, id, isSuccess]);
  if (!isSupportedChain) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center text-gray-300 bg-black">
        <h1 className="text-2xl font-bold mb-4">Unsupported Network</h1>
        <p className="mb-6">
          Please switch to a supported network to access this content.
        </p>
        <div className="text-sm text-gray-500">
          Supported networks include Avalanche Fuji and other testnets.
        </div>
      </div>
    );
  }
  if (!isSuccess) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400 bg-black">
        <div className="text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white font-sans relative overflow-hidden">
      <VIPAccess
        visible={visible}
        onClose={() => setVisible(false)}
        hasNFT={hasNFT}
        onSuccess={() => {
          refetch();
        }}
      ></VIPAccess>
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/bg-cinema-texture.jpg')` }}
      />
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
        <main className="flex-1">
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-wide text-[#ffffff] mb-2">
              🎬 {video?.title}
            </h1>
            <p className="text-sm text-gray-400">
              Author: {video?.author} · {video?.views} views · {video?.date}
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-2xl border border-[#1f1f1f] aspect-video mb-6 bg-black">
            <video
              src={video?.url}
              poster={video?.thumbnail}
              controls
              controlsList="nodownload"
              className="w-full h-full"
            />
          </div>
          <div className="bg-[#1a1a1a] p-6 rounded-xl shadow-lg border border-[#333]">
            <p className="leading-relaxed text-gray-300">
              {video?.description}
            </p>
          </div>
        </main>

        <aside className="w-full md:w-80">
          <div className="text-xl font-semibold text-[#4abba1] mb-4">
            🎥 Recommended Videos
          </div>
          <div className="space-y-4">
            {allVideos
              .filter((v) => v.id !== id)
              .slice(0, 6)
              .map((v) => (
                <div
                  key={v.id}
                  className="bg-[#141414] hover:bg-[#1e1e1e] p-3 rounded-xl flex items-center gap-4 cursor-pointer transition"
                  onClick={() => (window.location.href = `/video/${v.id}`)}
                >
                  <Image
                    width={80}
                    height={56}
                    src={v.thumbnail}
                    alt={v.title}
                    className="w-20 h-14 object-cover rounded-lg border border-[#2a2a2a]"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white truncate">
                      {v.title}
                    </div>
                    <div className="text-xs text-gray-400 truncate">
                      {v.author}
                    </div>
                    <div className="text-xs text-gray-600">{v.views} views</div>
                  </div>
                </div>
              ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
