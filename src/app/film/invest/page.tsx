"use client";
import { investAbi } from "@/abi/invest";
import { useState } from "react";
import { erc20Abi, formatUnits, parseUnits } from "viem";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import Image from "next/image";

export default function FilmInvestPage() {
  const mockFilms = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: `电影项目 ${i + 1}`,
    description: `这是第 ${i + 1} 个优质电影投资项目，欢迎参与投资。`,
    cover:
      "https://mammoth-plum-sheep.myfilebase.com/ipfs/QmX3xQSFS6DVU91b2AtT94ap7j4WmSoUmckT2ndiFCZb2n",
    progress: 1,
    amount: 100,
  }));
  const { writeContractAsync, error } = useWriteContract();
  const [investingId, setInvestingId] = useState<number | null>(null);
  const [amount, setAmount] = useState("");
  const { address } = useAccount();

  const [hash, setHash] = useState<`0x${string}`>("0x");

  const USDC_ADDRESS = process.env.NEXT_PUBLIC_USDC_ADDRESS;

  const investAddress = process.env.NEXT_PUBLIC_INVEST_ADDRESS;
  useWaitForTransactionReceipt({
    hash,
  });
  const { data: allowance } = useReadContract({
    abi: erc20Abi,
    address: USDC_ADDRESS,
    functionName: "allowance",
    args: [address as "0x${string}", investAddress],
  });
  const { data: balance } = useReadContract({
    abi: erc20Abi,
    address: USDC_ADDRESS,
    functionName: "balanceOf",
    args: [address as "0x${string}"],
  });
  const { data: decimals } = useReadContract({
    abi: erc20Abi,
    address: USDC_ADDRESS,
    functionName: "decimals",
  });
  const handleInvest = async (id: number) => {
    const myBalance = (balance && formatUnits(balance, decimals || 18)) || 0;
    console.log("🚀 ~ handlePurchase ~ myBalance:", myBalance);
    const myAllowanceBalance =
      (allowance && formatUnits(allowance, decimals || 18)) || 0;
    console.log(
      "🚀 ~ handlePurchase ~ myAllowanceBalance:",
      myAllowanceBalance
    );
    if (Number(myAllowanceBalance) >= 5) {
      try {
        const hash = await writeContractAsync({
          abi: investAbi,
          address: investAddress,
          functionName: "invest",
          args: [1, 1, "0x"],
        });
        console.log("🚀 ~ handleInvest ~ invest:", hash);
        setHash(hash);
      } catch (error: any) {
        console.error("投资失败:", error);
        const shortMessage =
          error?.shortMessage ||
          error?.cause?.shortMessage ||
          error?.cause?.message ||
          error?.message;

        if (shortMessage) {
          alert(`Revert reason: ${shortMessage}`);
        }
      }
    } else {
      await writeContractAsync({
        abi: erc20Abi,
        address: USDC_ADDRESS,
        functionName: "approve",
        args: [investAddress, parseUnits("10", 6)],
      });
    }
    // setInvestingId(id);
    // setAmount("");
  };

  const handleSubmit = async () => {
    // 这里可以调用投资API
    alert(`已投资 ${amount} USDT 到项目 ${investingId}`);
    setInvestingId(null);
    setAmount("");
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold text-[#8be9fd] mb-8 text-center">
        电影项目投资
      </h2>
      <ul className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(320px,1fr))]">
        {mockFilms.map((film) => (
          <li
            key={film.id}
            className="bg-[#181a20] rounded-xl shadow-lg overflow-hidden"
          >
            <Image
              src={film.cover}
              alt={film.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <div className="text-white font-bold text-lg mb-1 truncate">
                {film.title}
              </div>
              <div className="text-xs text-gray-400 mb-2 line-clamp-2">
                {film.description}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 h-2 bg-[#23263a] rounded">
                  <div
                    className="h-2 bg-[#8be9fd] rounded"
                    style={{ width: `${film.progress}%` }}
                  />
                </div>
                <span className="text-xs text-[#8be9fd]">{film.progress}%</span>
              </div>
              <div className="text-xs text-gray-500 mb-2">
                已筹集：{film.amount} USDT
              </div>
              {investingId === film.id ? (
                <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
                  <input
                    type="number"
                    min={1}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-1 px-2 py-1 rounded bg-[#23263a] text-white outline-none"
                    placeholder="投资金额 USDT"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-1 bg-[#8be9fd] text-[#181a20] rounded font-bold hover:bg-[#6dd6f7] transition"
                  >
                    确认
                  </button>
                  <button
                    type="button"
                    className="px-2 py-1 text-gray-400 hover:text-white"
                    onClick={() => setInvestingId(null)}
                  >
                    取消
                  </button>
                </form>
              ) : (
                <button
                  className="w-full mt-2 py-2 bg-[#8be9fd] text-[#181a20] rounded font-bold hover:bg-[#6dd6f7] transition"
                  onClick={() => handleInvest(film.id)}
                >
                  立即投资
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
