"use client";
import { erc1155Abi } from "viem";
import { supabase } from "@/supabase";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  useAccount,
  useChainId,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import Image from "next/image";
import dayjs from "dayjs";
import { Button, Input, Modal } from "@arco-design/web-react";
import { useToast } from "@/hooks/useToast";
import { filmTokenAbi } from "@/abi/film";
import { lotteryABI } from "@/abi/lottery";
import { getChainConfig } from "@/config/chainConfig";

export default function FilmInvestDetailPage() {
  // 类型定义
  type Film = {
    contract_address: `0x${string}`;
    title: string;
    genre?: string;
    language?: string;
    country?: string;
    stars?: string[] | string;
    director?: string;
    plotSummary?: string;
    id: string;
  };

  type Asset = {
    id: number;
    tokenId: string;
    film: Film;
    created_at: string;
    metadata?: {
      name?: string;
      description?: string;
      image?: string;
      [key: string]: any;
    };
  };
  const { id } = useParams();
  const { address } = useAccount();
  const [asset, setAsset] = useState<Asset | null>(null);
  const { writeContractAsync } = useWriteContract();
  // 跨链弹窗相关
  const [modalVisible, setModalVisible] = useState(false);
  const [targetChain, setTargetChain] = useState("Sepolia");
  const [toAddress, setToAddress] = useState("");
  const [reciverAddress, setReciverAddress] = useState("");

  const [amount, setAmount] = useState("");
  const [txLoading, setTxLoading] = useState(false);
  const [hash, setHash] = useState<`0x${string}`>("0x");
  const [lotteryHash, setLotteryHash] = useState<`0x${string}`>("0x");

  const toast = useToast();

  const chainId = useChainId();

  const lotteryContractAddress =
    chainId !== 1 && getChainConfig(chainId)
      ? getChainConfig(chainId)!.lotteryContractAddress
      : "0x";

  // const reciverAddress = "0xcca46e3502d0a1907cad9e9f949d7affe4a282bf"; // 替换为实际接收地址
  const { isSuccess } = useWaitForTransactionReceipt({
    hash,
  });
  const handleBurnAsset = async () => {
    await supabase.from("assets").insert([
      {
        film: asset?.film?.id,
        tokenId: asset?.tokenId,
        amount: -amount,
        type: 2,
        owner: address,
        chainId,
      },
    ]);
  };
  if (isSuccess) {
    setHash("0x");
    setTxLoading(false);
    setModalVisible(false);
    handleBurnAsset();
    toast.success("Cross-chain transfer submitted!");
  }

  const { isSuccess: isLotterySuccess } = useWaitForTransactionReceipt({
    hash: lotteryHash,
  });
  useEffect(() => {
    if (isLotterySuccess) {
      setLotteryHash("0x");
      setTxLoading(false);
      toast.success("Participate Success!");
    }
  }, [isLotterySuccess, toast]);

  // Fetch asset record from supabase

  const fetchAssets = async () => {
    const { data, error } = await supabase
      .from("assets")
      .select(
        `
        *,
        film (*)
      `
      )
      .eq("id", id)
      .single();
    setAsset(data);
  };

  useEffect(() => {
    if (address) {
      fetchAssets();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  // Read Token URI (metadata)
  const { data: tokenURI } = useReadContract({
    abi: erc1155Abi,
    address: asset?.film.contract_address,
    functionName: "uri",
    args: [BigInt(asset?.tokenId ?? 0)],
  });

  // Fetch metadata from tokenURI
  useEffect(() => {
    if (tokenURI) {
      const fetchMetadata = async () => {
        try {
          const url = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
          const response = await fetch(url);
          const metadata = await response.json();
          setAsset((prev) =>
            prev
              ? {
                  ...prev,
                  metadata,
                }
              : prev
          );
        } catch (error) {
          console.error("Error fetching metadata:", error);
        }
      };
      fetchMetadata();
    }
  }, [tokenURI]);

  // Read balance
  const { data: balance } = useReadContract({
    abi: erc1155Abi,
    address: asset?.film.contract_address,
    functionName: "balanceOf",
    args: [address as `0x${string}`, BigInt(asset?.tokenId ?? 0)],
  });

  if (!asset) {
    return (
      <div className="max-w-7xl mx-auto py-20 px-4 flex justify-center items-center text-gray-400 text-xl">
        Loading...
      </div>
    );
  }

  // 卡片属性展示
  const attributes = [
    { label: "Token ID", value: asset?.tokenId },
    { label: "Balance", value: balance?.toString() ?? 0 },
    { label: "Owner", value: address },
    { label: "Contract", value: asset?.film?.contract_address },
    {
      label: "Minted",
      value: asset?.created_at
        ? dayjs(asset?.created_at).format("YYYY-MM-DD HH:mm")
        : "--",
    },
    { label: "Genre", value: asset?.film?.genre },
    { label: "Language", value: asset?.film?.language },
    { label: "Country", value: asset?.film?.country },
    {
      label: "Stars",
      value: Array.isArray(asset?.film?.stars)
        ? asset.film.stars.join(", ")
        : asset?.film?.stars,
    },
  ];

  // 跨链转移逻辑
  const handleCrossChain = async () => {
    setTxLoading(true);
    const tx = await writeContractAsync({
      abi: filmTokenAbi,
      address: asset?.film.contract_address,
      functionName: "crossChainBurn",
      args: [
        toAddress as `0x${string}`,
        asset?.tokenId,
        amount,
        reciverAddress as `0x${string}`,
        1,
      ],
    });
    setHash(tx);
    console.log("Cross-chain transfer transaction hash:", tx);
  };

  const handleParticipate = async () => {
    setTxLoading(true);
    const tx = await writeContractAsync({
      abi: lotteryABI,
      address: lotteryContractAddress,
      functionName: "enterLottery",
      args: [address as `0x${string}`],
    });
    setLotteryHash(tx);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="bg-[#181a20] rounded-2xl shadow-2xl p-6 flex flex-col items-center">
        {/* NFT Image */}
        <div className="w-full flex justify-center mb-6">
          <div className=" w-80 rounded-xl overflow-hidden bg-[#23293a] flex items-center justify-center border-4 border-[#23293a] shadow-lg">
            {asset?.metadata?.image ? (
              <Image
                src={asset.metadata.image}
                alt={asset.metadata.name || "NFT"}
                width={320}
                height={640}
                className="object-cover w-full h-full"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>
        </div>
        {/* Title */}
        <div className="text-2xl font-bold text-[#8be9fd] mb-2 text-center">
          {asset?.metadata?.name || asset?.film?.title}
        </div>
        {/* Description */}
        <div className="text-gray-300 mb-4 text-center">
          {asset?.metadata?.description || asset?.film?.plotSummary}
        </div>
        {/* 属性卡片 */}
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          {attributes.map(
            (attr) =>
              attr.value && (
                <div
                  key={attr.label}
                  className="bg-[#23293a] rounded-xl px-4 py-2 min-w-[120px] text-center border border-[#23293a] shadow"
                >
                  <div className="text-xs text-gray-400 mb-1">{attr.label}</div>
                  <div className="text-sm text-white font-semibold break-all">
                    {attr.value}
                  </div>
                </div>
              )
          )}
        </div>
        {/* 电影信息 */}
        <div className="w-full bg-[#23293a] rounded-xl p-4 mt-2">
          <div className="text-lg font-semibold text-[#4abba1] mb-2">
            Film Info
          </div>
          <div className="text-gray-400 mb-1">
            <span className="font-semibold text-white">Title:</span>{" "}
            {asset?.film?.title}
          </div>
          <div className="text-gray-400 mb-1">
            <span className="font-semibold text-white">Director:</span>{" "}
            {asset?.film?.director}
          </div>
          <div className="text-gray-400 mb-1">
            <span className="font-semibold text-white">Plot:</span>{" "}
            {asset?.film?.plotSummary}
          </div>
        </div>
        <div className="flex gap-4 w-full">
          {/* 跨链转移按钮 */}
          <Button
            type="primary"
            className="flex-1 bg-gradient-to-r from-[#4abba1] to-[#8be9fd] text-black font-bold py-3 rounded-xl shadow hover:scale-105 transition"
            onClick={() => setModalVisible(true)}
          >
            Cross-chain Transfer
          </Button>

          {/* 参与抽奖活动按钮 */}
          <Button
            type="primary"
            className="flex-1 bg-gradient-to-r from-[#cea00a] to-[#958e10] text-black font-bold py-3 rounded-xl shadow hover:scale-105 transition"
            onClick={() => handleParticipate()}
          >
            Participate in Lottery
          </Button>
        </div>
      </div>
      {/* 跨链弹窗 */}
      <Modal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        maskClosable={false}
        className="rounded-2xl border-0 overflow-hidden"
        style={{
          width: 420,
          background: "linear-gradient(145deg, #1a1d2e 0%, #12141f 100%)",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
        }}
      >
        <div className="flex flex-col items-center text-center p-8">
          <div className="text-4xl mb-2">🌉</div>
          <h2 className="text-2xl font-bold text-[#4abba1] mb-2">
            Cross-chain Transfer
          </h2>
          <div className="text-gray-400 mb-6">
            Transfer your NFT asset to another chain.
          </div>
          <Input
            placeholder="Target Chain (e.g. Polygon, BSC)"
            value={targetChain}
            readOnly
            onChange={setTargetChain}
            className="mb-4"
            allowClear
          />
          <Input
            placeholder="to Address"
            value={toAddress}
            onChange={setToAddress}
            className="mb-4"
            allowClear
          />
          <Input
            placeholder="Recipient Address"
            value={reciverAddress}
            onChange={setReciverAddress}
            className="mb-4"
            allowClear
          />
          <Input
            placeholder="Amount"
            value={amount}
            onChange={setAmount}
            className="mb-6"
            allowClear
            type="number"
          />
          <Button
            type="primary"
            loading={txLoading}
            disabled={!targetChain || !toAddress || !amount}
            onClick={handleCrossChain}
            className="w-full bg-gradient-to-r from-[#4abba1] to-[#8be9fd] text-black font-bold rounded-lg"
          >
            Cross-chain Send
          </Button>
        </div>
      </Modal>
    </div>
  );
}
