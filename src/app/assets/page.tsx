"use client";
import React, { useState } from "react";
import { erc20Abi, formatEther, parseAbi, parseUnits } from "viem";
import { useReadContract, useWriteContract } from "wagmi";
import lighthouse from "@lighthouse-web3/sdk";
import { useAccount, useSignMessage } from "wagmi";
import Image from "next/image";
import { assetsAbi } from "@/abi/assets";

const page = () => {
  const { address } = useAccount();
  const assetAddress = "0x6e0786Fa458cd2435017239Bab6f70F05C084aaD";
  const [hash, setHash] = useState<"0x${string}" | undefined>(undefined);
  const AssetTokenizedABI = parseAbi([
    "function investWithToken(uint256 amount) external",
  ]);

  const { data, isLoading }: { data: any; isLoading: boolean } =
    useReadContract({
      address: assetAddress,
      abi: assetsAbi,
      functionName: "getAllAssets",
    });
  console.log(data);
  console.log(isLoading);

  const { writeContractAsync } = useWriteContract();

  const LINK_ADDRESS = process.env.NEXT_PUBLIC_LINK_TOKEN_ADDRESS;
  const allowance = useReadContract({
    abi: erc20Abi,
    address: LINK_ADDRESS,
    functionName: "allowance",
    args: [address as "0x${string}", assetAddress],
  });
  const balance = useReadContract({
    abi: erc20Abi,
    address: LINK_ADDRESS,
    functionName: "balanceOf",
    args: [address as "0x${string}"],
  });
  console.log("余额:", balance.data);
  console.log("授权额度:", allowance.data);
  const { signMessageAsync } = useSignMessage();
  const [decryptedContent, setDecryptedContent] = useState<string | null>(null);
  const [decrypting, setDecrypting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 解密授权签名
  const signAuthMessage = async () => {
    if (!address) return;
    const { message } = (await lighthouse.getAuthMessage(address)).data;
    if (!message) throw new Error("Auth message is null");
    try {
      return await signMessageAsync({ message });
    } catch (error) {
      setError("签名失败，请重试");
      return null;
    }
  };

  // 解密资产
  const handleDecrypt = async () => {
    setError(null);
    setDecryptedContent(null);
    if (!address || !data?.[2]) {
      setError("未检测到钱包或资产URI");
      return;
    }
    setDecrypting(true);
    try {
      const cid = data[2].replace("ipfs://", "");
      const signedMessage = await signAuthMessage();
      if (!signedMessage) throw new Error("Failed to sign message");
      const keyObject = await lighthouse.fetchEncryptionKey(
        cid,
        address,
        signedMessage
      );
      if (!keyObject.data.key) throw new Error("Decryption key is null");
      // 这里可根据实际资产类型动态判断
      const fileType = "image/jpeg";
      const decryptedBlob = await lighthouse.decryptFile(
        cid,
        keyObject.data.key,
        fileType
      );
      const fileURL = URL.createObjectURL(decryptedBlob);
      setDecryptedContent(fileURL);
    } catch (e: any) {
      setError(e?.message || "解密失败");
    }
    setDecrypting(false);
  };

  const handleInvert = async () => {
    await writeContractAsync({
      abi: erc20Abi,
      address: LINK_ADDRESS,
      functionName: "approve",
      args: [assetAddress, parseUnits("10", 18)],
    });
    // await writeContractAsync({
    //   address: assetAddress,
    //   abi: AssetTokenizedABI,
    //   functionName: "investWithToken",
    //   args: [parseUnits("10", 18)],
    // });
  };
  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-[#181a20] rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-[#8be9fd] mb-6 text-center">
        资产列表
      </h2>
      <button
        onClick={handleInvert}
        className="text-2xl font-bold text-[#8be9fd] mb-6 text-center"
      >
        授权额度
      </button>
      {isLoading ? (
        <div className="text-center text-gray-400 py-8">加载中...</div>
      ) : Array.isArray(data) && data.length > 0 ? (
        <ul className="space-y-4">
          {data.map((item: any, idx: number) => (
            <li
              key={idx}
              className="bg-[#23263a] rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col gap-2">
                <InfoRow label="资产类型" value={item.assetType ?? idx} />
                <InfoRow label="名称" value={item.name ?? "-"} />
                <InfoRow label="items" value={item.initialSupply ?? "-"} />
                <InfoRow label="items" value={item.initialSupply ?? "-"} />
                <InfoRow label="创建者" value={item.creator ?? "-"} />
                {/* 可添加更多字段 */}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-400 py-8">暂无数据</div>
      )}
    </div>
  );
};

// 信息行组件，便于复用和美化
function InfoRow({
  label,
  value,
  valueClass = "",
}: {
  label: string;
  value: React.ReactNode;
  valueClass?: string;
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-[#8be9fd] font-semibold">{label}</span>
      <span className={valueClass + " text-right break-all text-white"}>
        {value}
      </span>
    </div>
  );
}

export default page;
