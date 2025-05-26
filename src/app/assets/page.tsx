"use client";
import React, { useState } from "react";
import { erc20Abi, formatEther, parseAbi, parseUnits } from "viem";
import { useReadContract, useWriteContract } from "wagmi";
import lighthouse from "@lighthouse-web3/sdk";
import { useAccount, useSignMessage } from "wagmi";
import Image from "next/image";

const page = () => {
  const { address } = useAccount();
  const assetAddress = "0x62ff002B0895FBAB8497F1a91ec1e80Aa4Ed708a";
  const abi = parseAbi([
    "function getAssetInfo() external view returns (string memory, string memory, string memory, uint256, uint256, bool)",
  ]);

  const [hash, setHash] = useState<"0x${string}" | undefined>(undefined);

  const AssetTokenizedABI = parseAbi([
    "function investWithToken(uint256 amount) external",
  ]);
  const { data, isLoading } = useReadContract({
    address: assetAddress,
    abi,
    functionName: "getAssetInfo",
  });
  console.log(data);

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
    await writeContractAsync({
      address: assetAddress,
      abi: AssetTokenizedABI,
      functionName: "investWithToken",
      args: [parseUnits("10", 18)],
    });
  };

  // 判断资产是否为lighthouse加密
  const isLighthouseAsset =
    typeof data?.[2] === "string" &&
    (data[2].startsWith("ipfs://") ||
      data[2].startsWith("https://decrypt.mesh3.network/evm/"));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232526]">
      <div className="w-full max-w-xl rounded-2xl shadow-2xl bg-[#181c24] bg-opacity-95 p-10 border border-[#2e374a] backdrop-blur-md">
        <h2 className="text-4xl font-extrabold text-cyan-400 mb-10 tracking-widest text-center drop-shadow-lg">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
            资产信息
          </span>
        </h2>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></span>
            <span className="ml-4 text-cyan-200">加载中...</span>
          </div>
        ) : (
          <div className="space-y-7 text-lg">
            <InfoRow
              label="名称"
              value={data?.[0] || "--"}
              valueClass="text-white"
            />

            <InfoRow
              label="描述"
              value={data?.[1] || "--"}
              valueClass="text-white"
            />
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-[#2e374a] pb-2">
              <span className="text-[#8be9fd] font-semibold">资产URI</span>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <a
                  href={
                    data?.[2] && data?.[2].startsWith("ipfs://")
                      ? data[2].replace("ipfs://", "https://ipfs.io/ipfs/")
                      : data?.[2] || "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 hover:underline break-all max-w-xs truncate"
                  title={data?.[2]}
                >
                  {data?.[2] || "--"}
                </a>
                {isLighthouseAsset && (
                  <button
                    className="px-4 py-1 rounded bg-gradient-to-r from-cyan-600 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 transition font-semibold shadow"
                    onClick={handleDecrypt}
                    disabled={decrypting}
                  >
                    {decrypting ? "解密中..." : "查看"}
                  </button>
                )}
              </div>
            </div>
            {error && (
              <div className="my-2 p-2 bg-red-900 text-red-200 rounded text-center">
                {error}
              </div>
            )}
            {decryptedContent && (
              <div className="my-4 p-4 bg-[#23293a] rounded text-white flex justify-center items-center">
                <Image
                  src={decryptedContent}
                  width={100}
                  height={100}
                  alt="decrypted"
                  className="max-w-full max-h-80 rounded shadow-lg border border-cyan-900"
                  style={{ objectFit: "contain" }}
                />
              </div>
            )}
            <InfoRow
              label="已募集资金"
              value={data?.[3] ? `${formatEther(data[3])} Link` : "0 Link"}
              valueClass="text-green-400"
            />
            <InfoRow
              label="目标资金"
              value={data?.[4] ? `${formatEther(data[4])} Link` : "0 Link"}
              valueClass="text-yellow-400"
            />
            <InfoRow
              label="是否已关闭"
              value={data?.[5] ? "已关闭" : "进行中"}
              valueClass={data?.[5] ? "text-red-400" : "text-green-400"}
            />
            <div className="flex justify-center items-center mt-4">
              <button
                onClick={handleInvert}
                className="px-4 py-1 rounded bg-gradient-to-r from-cyan-600 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 transition font-semibold shadow"
              >
                投资
              </button>
            </div>
          </div>
        )}
      </div>
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
    <div className="flex justify-between items-center border-b border-[#2e374a] pb-2">
      <span className="text-[#8be9fd] font-semibold">{label}</span>
      <span className={valueClass + " text-right break-all"}>{value}</span>
    </div>
  );
}

export default page;
