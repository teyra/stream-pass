"use client";
import { useEffect, useState } from "react";
import { Button } from "@arco-design/web-react";
import { useAccount, useChainId } from "wagmi";
import Image from "next/image";
import { supabase } from "@/supabase";
import { useRouter } from "next/navigation";

// Define types for your data structures
interface Film {
  id: string;
  title: string;
  posterUrl: string;
  // Add other film properties as needed
}

interface Asset {
  id: string;
  amount: number;
  investor: string;
  film: Film;
  tokenId: string;
  // Add other record properties as needed
}

export default function AssetCrossChainPage() {
  const router = useRouter();
  const [list, setList] = useState<Asset[]>([]);
  const { address } = useAccount();
  const chainId = useChainId();

  useEffect(() => {
    const fetchAssets = async () => {
      if (!address) return;

      const { data, error } = await supabase
        .from("assets")
        .select(
          `
        *,
        film (*)
      `
        )
        .eq("owner", address)
        .eq("chainId", chainId);
      const processedData = data?.reduce((acc: Asset[], asset) => {
        const existingIndex = acc.findIndex(
          (item) =>
            item.film.id === asset.film.id && item.tokenId === asset.tokenId
        );

        if (existingIndex >= 0) {
          // Accumulate amount
          acc[existingIndex].amount += asset.amount;
        } else {
          // Add new Asset
          acc.push({ ...asset });
        }
        return acc;
      }, [] as Asset[]);

      setList(processedData || []);
    };
    fetchAssets();
  }, [address]);

  return (
    <div className="max-w-2xl  py-10 px-4">
      {list.length === 0 ? (
        <div className="text-center text-gray-400 py-24">
          You do not have any film assets yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {list.map((asset, index) => (
            <div
              key={index}
              className="bg-[#181a20] rounded-2xl overflow-hidden shadow-lg flex flex-col border border-[#23293a]"
            >
              <div className="relative w-full h-100 bg-black">
                {asset.film?.posterUrl && (
                  <Image
                    src={asset.film.posterUrl}
                    alt={asset.film.title || "Film poster"}
                    className="object-contain"
                    loading="lazy"
                    fill
                    sizes="100"
                    style={{
                      borderTopLeftRadius: "1rem",
                      borderTopRightRadius: "1rem",
                    }}
                  />
                )}
                <span className="absolute top-3 left-3 text-[#f3f3f3] text-xl">
                  {asset.amount}
                </span>
              </div>
              <div className="text-xm font-bold text-[#56595a] m-2">
                Token ID: {asset.invest?.tokenId}
              </div>
              <div className="text-xl font-bold text-[#a6afb1] ml-2 mb-5">
                {asset.film?.title}
              </div>

              <Button
                type="primary"
                className="bg-gradient-to-r from-[#58e1c1] to-[#58d68d] text-black font-bold px-6 py-3 rounded-full shadow-xl hover:scale-105 transition w-full disabled:opacity-50 mt-4"
                onClick={() => router.push(`/film/assets/${asset.id}`)}
              >
                Detail
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
