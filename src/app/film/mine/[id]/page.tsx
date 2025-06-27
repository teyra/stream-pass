"use client";
import { supabase } from "@/supabase";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import {
  useChainId,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { erc20Abi, formatUnits, parseAbi } from "viem";
import { Button, Input } from "@arco-design/web-react";
import { useEffect, useState } from "react";
import { investAbi } from "@/abi/invest";
import { filmTokenAbi } from "@/abi/film";
import { useToast } from "@/hooks/useToast";
import { getChainConfig } from "@/config/chainConfig";

export default function InvestDetailPage() {
  const { id } = useParams();
  const toast = useToast();
  const [invest, setInvest] = useState<any>({});
  const [initialAmount, setInitialAmount] = useState(0);
  const [hash, setHash] = useState<`0x${string}`>("0x");
  const [priceHash, setPriceHash] = useState<`0x${string}`>("0x");

  const { writeContractAsync } = useWriteContract();
  const { usdcToken, donId } = getChainConfig(useChainId());
  const slotId = process.env.NEXT_PUBLIC_DON_HOSTED_SECRETS_SLOT_ID;
  const version = process.env.NEXT_PUBLIC_DON_HOSTED_SECRETS_VERSION;
  const subId = process.env.NEXT_PUBLIC_CHAINLINK_SUBSCRIPTION_ID;
  const gasLimit = process.env.NEXT_PUBLIC_CHAINLINK_GAS_LIMIT;
  const USDC_ADDRESS = usdcToken;

  const { isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const { isSuccess: priceIsSuccess } = useWaitForTransactionReceipt({
    hash: priceHash,
  });

  useEffect(() => {
    const fetchInvestDetail = async () => {
      const { data, error } = await supabase
        .from("invests")
        .select(
          `
        *,
        films (
          title,
          director,
          posterUrl,
          contract_address
        )
      `
        )
        .eq("id", id)
        .single();
      if (!data || error) {
        return notFound();
      }
      setInvest(data);
    };
    fetchInvestDetail();
  }, [id]);

  const { data: decimals } = useReadContract({
    abi: erc20Abi,
    address: USDC_ADDRESS,
    functionName: "decimals",
  });
  const { data: totalUSDC } = useReadContract({
    address: invest.contractAddress as `0x${string}`,
    abi: parseAbi(["function getFilmUSDC() external view returns (uint256)"]),
    functionName: "getFilmUSDC",
  });
  const { data: totalToken, refetch } = useReadContract({
    address: invest.contractAddress as `0x${string}`,
    abi: parseAbi([
      "function getFilmTokenBalance(uint256 tokenId) external view returns (uint256)",
    ]),
    functionName: "getFilmTokenBalance",
    args: [invest.tokenId],
  });
  const { data: tokenInUsdc, refetch: tokenInUsdcRefetch } = useReadContract({
    address: invest.contractAddress as `0x${string}`,
    abi: parseAbi([
      "function getValuationInUsdc(uint256 tokenId) public view returns (uint256)",
    ]),
    functionName: "getValuationInUsdc",
    args: [invest.tokenId],
  });
  console.log("🚀 ~ InvestDetailPage ~ tokenInUsdc:", tokenInUsdc);
  const initializeTokens = async () => {
    if (!invest.contractAddress) {
      toast.error("Investment contract address is not set");
      return;
    }
    if (initialAmount <= 0) {
      toast.error("Initial amount must be greater than 0");
      return;
    }
    try {
      const tx = await writeContractAsync({
        abi: investAbi,
        address: invest.contractAddress as `0x${string}`,
        functionName: "initFilmToken",
        args: [invest.tokenId, initialAmount, "0x"],
      });
      setHash(tx);
    } catch (err: any) {
      toast.error(err?.message || "Minting failed");
    }
  };

  const updateTokenPrice = async () => {
    console.log("🚀 ~ updateTokenPrice ~ invest.films:", invest.films);
    try {
      if (!invest.films.contract_address) {
        toast.error("Investment contract address is not set");
        return;
      }
      const tx = await writeContractAsync({
        abi: filmTokenAbi,
        address: invest.films?.contract_address as `0x${string}`,
        functionName: "updateInvestmentCost",
        args: [
          slotId,
          version,
          [String(invest.tokenId), String(invest.film)],
          subId,
          gasLimit,
          donId,
        ],
      });
      setPriceHash(tx);
    } catch (err) {
      toast.error("Failed to update token price, please try again later");
    }
  };

  const distributeDividends = async () => {
    try {
      const tx = await writeContractAsync({
        abi: investAbi,
        address: invest.contractAddress as `0x${string}`,
        functionName: "distributeProfit",
        args: [invest.tokenId, 1000],
      });
      // setHash(tx);
      // TODO: Implement dividend distribution logic here
      toast.success("Dividend distribution triggered (demo)");
    } catch (err) {
      toast.error("Failed to distribute dividends, please try again later");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      setHash("0x");
      setInitialAmount(0);
      toast.success("FilmToken minted successfully");
    }
  }, [isSuccess, refetch, toast]);

  useEffect(() => {
    if (priceIsSuccess) {
      tokenInUsdcRefetch();
      setPriceHash("0x");
      toast.success("FilmToken price updated successfully");
    }
  }, [priceIsSuccess, tokenInUsdcRefetch, toast]);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          {invest.films?.posterUrl ? (
            <Image
              priority={true}
              width={500}
              height={750}
              src={invest.films?.posterUrl}
              alt="Poster"
              className="w-full h-auto rounded-xl shadow-lg"
            />
          ) : (
            <div className="bg-gray-800 w-full h-64 flex items-center justify-center text-gray-500 rounded-xl">
              No poster
            </div>
          )}
        </div>
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold text-white">
            {invest.films?.title}
          </h1>
          <p className="text-gray-400">Director: {invest.films?.director}</p>
          <p className="text-gray-500 text-sm">
            Created at: {new Date(invest.created_at).toLocaleString()}
          </p>
          {invest.description && (
            <div className="mt-4 text-gray-300 leading-relaxed">
              {invest.description}
            </div>
          )}
        </div>
      </div>
      {/* Investment Statistics */}
      <div className="bg-[#1f1f1f] rounded-xl p-6 mt-6 space-y-4 shadow">
        <h2 className="text-xl text-white font-bold">📊 Investment Overview</h2>
        <div className="text-gray-300">
          filmTokenAddress:
          <span className="text-[#8be9fd]">
            {invest.films?.contract_address}
          </span>
        </div>
        <div className="text-gray-300">
          Total Investment (USDC):
          <span className="text-[#8be9fd]">{totalUSDC}</span>
        </div>
        <div className="text-gray-300">
          Remaining FilmToken:
          <span className="text-[#8be9fd]">{totalToken}</span>
        </div>
        <div className="text-gray-300">
          Current FilmToken Valuation (USDC):
          <span className="text-[#8be9fd]">
            {tokenInUsdc && formatUnits(tokenInUsdc, decimals || 18)}
          </span>
        </div>
        <div>
          <Button
            onClick={updateTokenPrice}
            className="mt-4 bg-gradient-to-r from-[#4abba1] to-[#8be9fd] text-black font-bold rounded shadow"
          >
            🔄 Update FilmToken Price
          </Button>
        </div>
        <div>
          <Input
            style={{ width: 350 }}
            allowClear
            placeholder="Enter initial FilmToken amount"
            value={initialAmount.toString()}
            onChange={(value) => setInitialAmount(Number(value))}
          />
          ;
          <Button
            onClick={initializeTokens}
            className="mt-4 bg-gradient-to-r from-[#4abba1] to-[#8be9fd] text-black font-bold rounded shadow"
          >
            🛠️ Mint FilmToken
          </Button>
        </div>
        <div>
          <Button
            onClick={distributeDividends}
            className="bg-gradient-to-r from-[#fbbf24] to-[#34d399] text-black font-bold rounded shadow"
          >
            💸 Distribute Dividends
          </Button>
        </div>
      </div>
      {/* 👇 toast must be rendered in the page */}
      {toast.render()}
    </div>
  );
}
