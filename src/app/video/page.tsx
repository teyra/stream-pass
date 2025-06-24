"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

const allVideos = Array.from({ length: 10 }, (_, i) => {
  return {
    id: String(i + 1),
    title: getRandomMovieTitle(),
    description: `A sci-fi suspense film exploring the truth behind the digital world.`,
    thumbnail:
      "https://mammoth-plum-sheep.myfilebase.com/ipfs/QmRAa3HwZBCcbSwBf978hxDxBxTjTDfx9hNuCFF1UEH4E7",
  };
});

const PAGE_SIZE = 12;

export default function VideoList() {
  const router = useRouter();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const filteredVideos = allVideos;

  const videos = filteredVideos.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  const handleDetail = (item: any) => {
    router.push(`/video/${item.id}`);
  };

  const renderCard = (video: any, model: "classic" | "modern" = "classic") => {
    if (model === "classic") {
      return (
        <li
          onClick={() => handleDetail(video)}
          key={video.id}
          className="rounded-lg overflow-hidden hover:shadow-xl transition group cursor-pointer"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleDetail(video)}
        >
          <div
            className="relative w-full bg-black overflow-hidden"
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
            <div className="text-[#9f9999] font-semibold text-base mb-1 truncate">
              {video.title}
            </div>
            <div className="text-xs text-gray-600 line-clamp-2 h-10">
              {video.description}
            </div>
          </div>
        </li>
      );
    }
    // modern style
    return (
      <li
        key={video.id}
        className="rounded-xl overflow-hidden hover:scale-105 transition group cursor-pointer"
        role="button"
        tabIndex={0}
        onClick={() => handleDetail(video)}
        onKeyDown={(e) => e.key === "Enter" && handleDetail(video)}
      >
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: 1 }}
        >
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <div className="text-black font-semibold text-base mb-1 truncate">
            {video.title}
          </div>
          <div className="text-xs text-gray-600 line-clamp-2 h-10">
              {video.description}
          </div>
        </div>
      </li>
    );
  };

  return (
    <div className="mx-auto p-8 max-w-7xl">
      <div className="text-2xl text-gray-600 font-bold py-2">Breaking News</div>
      <ul className="grid gap-16 grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
        {videos.map((video) => renderCard(video))}
      </ul>
      <div className="text-2xl text-gray-600 font-bold py-2">Shorts</div>
      <ul className="grid gap-16 grid-cols-[repeat(auto-fit,minmax(320px,1fr))]">
        {videos.map((video) => renderCard(video, "modern"))}
      </ul>
      <div className="text-2xl text-gray-600 font-bold py-2">Articles</div>
      <ul className="grid gap-16 grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
        {videos.map((video) => renderCard(video))}
      </ul>

      {visibleCount < filteredVideos.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-[#8be9fd] text-[#181a20] rounded font-bold hover:bg-[#6dd6f7] transition"
          >
            Load More
          </button>
        </div>
      )}

      {videos.length === 0 && (
        <div className="text-center text-gray-400 py-12">No videos available for this category</div>
      )}
    </div>
  );
}