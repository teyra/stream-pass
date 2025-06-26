"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Message, Image } from "@arco-design/web-react";
import { supabase } from "@/supabase";
import { useAccount } from "wagmi";

interface InvestRecord {
  id: string;
  films: {
    id: string;
    title: string;
    director: string;
    posterUrl?: string; // 假设封面图字段名
  };
  creator: string;
  contractAddress: string;
  created_at: string;
}

export default function MyCreatedInvestments() {
  const router = useRouter();
  const [records, setRecords] = useState<InvestRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const { address } = useAccount();

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("invests")
        .select(
          `
        *,
        films (
          id,
          title,
          director,
          posterUrl
        )
      `
        )
        .eq("creator", address)
        .order("created_at", { ascending: false }); // ✅ 按创建时间倒序

      if (data) {
        setRecords(data as InvestRecord[]);
      }
      setLoading(false);
    };
    if (address) fetchRecords();
  }, [address]);

  const shortAddress = (addr: string) =>
    addr.slice(0, 6) + "..." + addr.slice(-4);

  return (
    <div className="w-100% py-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <Button
          type="primary"
          size="large"
          onClick={() => router.push("/film/create")}
          className="bg-gradient-to-r from-[#4abba1] to-[#8be9fd] text-black font-bold rounded-lg shadow hover:scale-105 transition"
        >
          + 发起新项目
        </Button>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 py-16">加载中...</div>
      ) : records.length === 0 ? (
        <div className="text-center text-gray-400 py-16">
          你还没有发起任何投资项目。
          <Button
            type="text"
            onClick={() => router.push("/film/create")}
            className="mt-4 text-[#4abba1]"
          >
            👉 立即创建
          </Button>
        </div>
      ) : (
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {records.map((rec) => (
            <div
              key={rec.id}
              onClick={() => router.push(`/film/${rec.films.id}`)}
              className="cursor-pointer bg-[#1f1f1f] rounded-2xl border border-[#2c2c2c] hover:border-[#4abba1] shadow-md transition-transform hover:scale-[1.03] group overflow-hidden"
            >
              {/* 封面 */}
              {rec.films.posterUrl ? (
                <Image
                  src={rec.films.posterUrl}
                  alt="poster"
                  className=" object-contain group-hover:brightness-110 transition duration-300"
                />
              ) : (
                <div className=" bg-[#2c2c2c] flex items-center justify-center text-gray-500">
                  无封面图
                </div>
              )}

              {/* 内容 */}
              <div className="p-5 space-y-2">
                <h2 className="text-xl text-white font-bold group-hover:text-[#4abba1]">
                  🎬 {rec.films.title}
                </h2>
                <p className="text-gray-400">导演：{rec.films.director}</p>
                <p className="text-gray-500 text-sm">
                  创建时间：{new Date(rec.created_at).toLocaleString()}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <div className="text-sm text-[#8be9fd]">
                    {shortAddress(rec.contractAddress)}
                  </div>
                </div>

                <Button
                  type="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/film/mine/${rec.id}`);
                  }}
                  className="mt-3 text-[#4abba1] border-[#4abba1] hover:bg-[#4abba1]/20 w-full"
                >
                  查看详情
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
