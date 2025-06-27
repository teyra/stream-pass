"use client";
import { supabase } from "@/supabase";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function FilmListPage() {
  const [films, setFilms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter(); // 使用 useRouter 获取路由对象

  // 假设从 supabase 或接口获取正在投资的电影
  const fetchFilms = async () => {
    setLoading(true);
    // 示例：实际请替换为你的数据获取逻辑
    const { data, error } = await supabase
      .from("invests")
      .select(
        `
        *,
       films (*)
      `
      )
      .order("created_at", { ascending: false }); // ✅ 按创建时间倒序
    setFilms(data as any[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchFilms();
  }, []);

  const handleDetail = (id: number) => {
    // 跳转到电影详情页
    router.push(`/film/invest/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className=" py-10 px-4">
      <ul className="flex flex-wrap">
        {films.map((film) => (
          <li
            key={film.id}
            className="bg-gradient-to-br w-100 h-200  m-6  justify-between  from-[#23263a] to-[#181a20] rounded-2xl shadow-xl overflow-hidden hover:scale-105 hover:shadow-2xl transition-all border border-[#8be9fd22] flex flex-col"
          >
            <div className="relative w-full h-150 bg-black">
              <Image
                src={film.films?.posterUrl}
                alt={film.films?.title}
                className="object-contain"
                loading="lazy"
                fill
                sizes="100"
                style={{
                  borderTopLeftRadius: "1rem",
                  borderTopRightRadius: "1rem",
                }}
              />
              <span className="absolute top-3 left-3 bg-[#8be9fd] text-[#181a20] text-xs px-3 py-1 rounded-full font-bold shadow">
                {film.films?.genre || "Film"}
              </span>
              <span className="absolute bottom-3 right-3 bg-[#181a20cc] text-[#8be9fd] text-xs px-2 py-0.5 rounded">
                {film.films?.year || film.films?.created_at?.slice(0, 4) || ""}
              </span>
            </div>
            <div className="flex-1 flex flex-col p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="text-white font-bold text-xl truncate">
                  {film.films?.title}
                </div>
                <div className="text-xs text-[#8be9fd] font-semibold">
                  {film.films?.director && `Director: ${film.films?.director}`}
                </div>
              </div>
              <div className="text-sm text-gray-400 mb-3 line-clamp-3 min-h-[3.5em]">
                {film.films?.plotSummary || film.films?.description}
              </div>
              <div className="mb-3 text-xs text-[#e77e0f] font-semibold">
                🎬 $1 Billion Blockbuster · Global Investment Open
              </div>

              <button
                onClick={() => handleDetail(film.id)}
                className="block mt-auto py-3 bg-gradient-to-r from-[#8be9fd] to-[#50fa7b] text-[#181a20] rounded-xl font-extrabold text-lg text-center shadow hover:scale-105 hover:shadow-lg transition-all"
              >
                Invest Now
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
