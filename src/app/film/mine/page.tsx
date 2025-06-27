"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@arco-design/web-react";
import { supabase } from "@/supabase";
import { useAccount, useChainId } from "wagmi";
import Image from "next/image";

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
  const chainId = useChainId();
  console.log("🚀 ~ MyCreatedInvestments ~ chainId:", chainId);
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
        .eq("chainId", chainId)
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
          + Create New Project
        </Button>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 py-16">Loading...</div>
      ) : records.length === 0 ? (
        <div className="text-center text-gray-400 py-16">
          You have not created any investment projects yet.
          <Button
            type="text"
            onClick={() => router.push("/film/create")}
            className="mt-4 text-[#4abba1]"
          >
            👉 Create Now
          </Button>
        </div>
      ) : (
        <div className=" py-10 px-4">
          <ul className="flex flex-wrap">
            {records.map((rec) => (
              <li
                key={rec.id}
                className="bg-gradient-to-br w-100 h-200   justify-between  from-[#23263a] to-[#181a20] rounded-2xl shadow-xl overflow-hidden hover:scale-105 hover:shadow-2xl transition-all border border-[#8be9fd22] flex flex-col"
              >
                <div className="relative w-full h-150 bg-black">
                  {/* Poster */}
                  {rec.films.posterUrl ? (
                    <Image
                      src={rec.films?.posterUrl}
                      alt={rec.films?.title}
                      className="object-contain"
                      loading="lazy"
                      fill
                      sizes="100"
                      style={{
                        borderTopLeftRadius: "1rem",
                        borderTopRightRadius: "1rem",
                      }}
                    />
                  ) : (
                    <div className=" bg-[#2c2c2c] flex items-center justify-center text-gray-500">
                      No poster
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col p-5">
                  {/* Content */}
                  <div className="space-y-2 py-5">
                    <h2 className="text-xl text-white font-bold group-hover:text-[#4abba1]">
                      🎬 {rec.films.title}
                    </h2>
                    <p className="text-gray-400">
                      Director: {rec.films.director}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Created at: {new Date(rec.created_at).toLocaleString()}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="text-sm text-[#8be9fd]">
                        {shortAddress(rec.contractAddress)}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => router.push(`/film/mine/${rec.id}`)}
                    className="block mt-auto py-3 bg-gradient-to-r from-[#8be9fd] to-[#50fa7b] text-[#181a20] rounded-xl font-extrabold text-lg text-center shadow hover:scale-105 hover:shadow-lg transition-all"
                  >
                    Detail
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
