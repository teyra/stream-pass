"use client";
import { useEffect, useState } from "react";
import { Button } from "@arco-design/web-react";
import { useAccount } from "wagmi";
import Image from "next/image";
import { supabase } from "@/supabase";
import { useRouter } from "next/navigation";
export default function AssetCrossChainPage() {
  const router = useRouter();
  const [list, setList] = useState<any[]>([]);
  const SPT_ADDRESS = process.env.NEXT_PUBLIC_SPT_ADDRESS;
  const { address } = useAccount();
  //   const { data: balance } = useReadContract({
  //     abi: erc721Abi,
  //     address: SPT_ADDRESS,
  //     functionName: "balanceOf",
  //     args: [address as `0x${string}`],
  //   });
  //   console.log("🚀 ~ AssetCrossChainPage ~ data:", balance);

  //   const { data: erc1155Balance } = useReadContract({
  //     abi: erc1155Abi,
  //     address: SPT_ADDRESS,
  //     functionName: "balanceOf",
  //     args: [address as `0x${string}`],
  //   });
  //   console.log("🚀 ~ AssetCrossChainPage ~ data:", erc1155Balance);
  const fetchAssets = async () => {
    const { data, error } = await supabase
      .from("investRecords")
      .select(
        `
        *,
       film (*),
       invest (*)
      `
      )
      .eq("investor", address);
    console.log("🚀 ~ fetchAssets ~ data:", data);
    const processedData =
      data &&
      data.reduce((acc: any[], record: any) => {
        const existingIndex = acc.findIndex(
          (item) => item.invest.id === record.invest.id
        );

        if (existingIndex >= 0) {
          // 累加 amount
          acc[existingIndex].amount += record.amount;
        } else {
          // 添加新记录
          acc.push({ ...record });
        }
        return acc;
      }, [] as typeof data);
    data && console.log("🚀 ~ fetchAssets ~ processedData:", processedData);
    setList(processedData || []);
    if (error) {
      console.error("Error fetching assets:", error);
    }
  };
  useEffect(() => {
    if (address) {
      fetchAssets();
    }
  }, [address]);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {list.map((asset: any, index) => (
          <div
            key={index}
            className="bg-[#181a20] rounded-2xl overflow-hidden shadow-lg  flex flex-col  border border-[#23293a]"
          >
            <div className="relative w-full h-100 bg-black">
              <Image
                src={asset.film?.posterUrl}
                alt={asset.film?.title}
                className="object-contain"
                loading="lazy"
                fill
                sizes="100"
                style={{
                  borderTopLeftRadius: "1rem",
                  borderTopRightRadius: "1rem",
                }}
              />
              <span className="absolute top-3 left-3  text-[#f3f3f3] text-xl">
                {asset.amount}
              </span>
            </div>
            <div className="text-xm font-bold text-[#56595a] m-2">
              代币ID：{asset.invest?.tokenId}
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
    </div>
  );
}
