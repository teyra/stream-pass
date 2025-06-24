"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

// 分类和风格模拟
const categories = [
  { key: "all", name: "全部" },
  { key: "defi", name: "DeFi" },
  { key: "nft", name: "NFT" },
  { key: "web3", name: "Web3" },
];

// 生成 50 条模拟视频数据，带分类和风格
const allVideos = Array.from({ length: 10 }, (_, i) => {
  return {
    id: String(i + 1),
    title: `区块链视频 ${i + 1}`,
    description: `这是第 ${i + 1} 个区块链相关视频，内容丰富有趣，欢迎观看。`,
    url: "https://mammoth-plum-sheep.myfilebase.com/ipfs/QmW7Tmv8vaJ2tV65weC6QHEY3u34PCqVdWZymZRcY3t9ku",
    thumbnail:
      "https://mammoth-plum-sheep.myfilebase.com/ipfs/QmX3xQSFS6DVU91b2AtT94ap7j4WmSoUmckT2ndiFCZb2n",
  };
});

const PAGE_SIZE = 12;

export default function VideoList() {
  const router = useRouter(); // 使用 useRouter 获取路由对象
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const videos = allVideos.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  const hanldeDetail = (item: any) => {
    router.push(`/video/${item.id}`);
  };

  // 卡片风格
  const renderCard = (video: any, model: "classic" | "modern" = "classic") => {
    if (model === "classic") {
      return (
        <li
          onClick={() => hanldeDetail(video)}
          key={video.id}
          className="rounded-lg overflow-hidden  hover:shadow-xl transition group cursor-pointer"
        >
          <div
            className="relative w-full  bg-black overflow-hidden"
            style={{ aspectRatio: "16/9" }}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          <div className="p-4">
            <div className="text-black font-semibold text-base mb-1 truncate">
              {video.title}
            </div>
            <div className="text-xs text-gray-600  line-clamp-2 h-10">
              {video.description}
            </div>
          </div>
        </li>
      );
    }
    // modern 风格
    return (
      <li
        key={video.id}
        className="] rounded-xl overflow-hidden  hover:scale-105 transition group cursor-pointer"
      >
        <div
          className="relative w-full   overflow-hidden"
          style={{ aspectRatio: 1 }}
        >
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
          <span className="absolute top-2 right-2 bg-[#8be9fd] text-[#181a20] text-xs px-2 py-0.5 rounded">
            {categories.find((c) => c.key === video.category)?.name}
          </span>
        </div>
        <div className="p-4">
          <div className="text-black font-semibold text-base mb-1 truncate">
            {video.title}
          </div>
          <div className="text-xs text-gray-600  line-clamp-2 h-10">
            {video.description}
          </div>
        </div>
      </li>
    );
  };

  return (
    <div className=" mx-auto p-8">
      {/* 分类导航 */}
      <div className="flex gap-4 mb-8 justify-center">
        {categories.map((cat) => (
          <button
            key={cat.key}
            className={`px-4 py-1 rounded-full font-bold border transition ${
              selectedCategory === cat.key
                ? "bg-[#8be9fd] text-[#181a20] border-[#8be9fd]"
                : "bg-[#23263a] text-[#8be9fd] border-[#23263a] hover:bg-[#181a20]"
            }`}
            onClick={() => {
              setSelectedCategory(cat.key);
              setVisibleCount(PAGE_SIZE);
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>
      {/* 视频列表 */}
      <div className="text-2xl font-bold py-2">Breaking news</div>
      <ul className="grid gap-16 grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
        {videos.map((video) => renderCard(video))}
      </ul>
      <div className="text-2xl font-bold py-2">Shorts</div>
      <ul className="grid gap-16 grid-cols-[repeat(auto-fit,minmax(320px,1fr))]">
        {videos.map((video) => renderCard(video, "modern"))}
      </ul>
      <div className="text-2xl font-bold py-2">Aticle</div>
      <ul className="grid gap-16 grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
        {videos.map((video) => renderCard(video))}
      </ul>
      {visibleCount < videos.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-[#8be9fd] text-[#181a20] rounded font-bold hover:bg-[#6dd6f7] transition"
          >
            加载更多
          </button>
        </div>
      )}
      {videos.length === 0 && (
        <div className="text-center text-gray-400 py-12">暂无该分类视频</div>
      )}
    </div>
  );
}
