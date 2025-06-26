"use client";

import { useState } from "react";
import { Button } from "@arco-design/web-react";
import { useDeployContract, useWaitForTransactionReceipt } from "wagmi";
import { byteCode, filmTokenAbi } from "@/abi/film";
import { supabase } from "@/supabase";
import { Address } from "viem";

interface Props {
  film: any;
  onSuccess: (txData: any) => void;
}

export default function DeployToken({ film, onSuccess }: Props) {
  const tokenUri =
    "https://mammoth-plum-sheep.myfilebase.com/ipfs/QmdZFhapTKKfrv4R3BLydoQrK7sWzpXanpyubm8xkKbwHt";
  const functionsRouterAddress = "0xA9d587a00A31A52Ed70D6026794a8FC5E2F5dCb0";
  const ccipRouterAddress = "0xF694E193200268f9a4868e4Aa017A0118C9a8177";
  const linkTokenAddress = process.env.NEXT_PUBLIC_LINK_TOKEN_ADDRESS;
  const destinationChainSelector = "16015286601757825753";
  const [loading, setLoading] = useState(false);
  const [hash, setHash] = useState<`0x${string}`>("0x");
  const [contractInfo, setContractInfo] = useState<any>(null);
  const { data: receipt, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const setContractAddress = async (address: Address) => {
    console.log(film.id, address);
    await supabase
      .from("films")
      .update({ contract_address: address })
      .eq("id", film.id);
  };

  const { deployContractAsync } = useDeployContract();

  const handleIssueToken = async () => {
    try {
      setLoading(true);
      const tx = await deployContractAsync({
        abi: filmTokenAbi,
        args: [
          tokenUri,
          functionsRouterAddress,
          ccipRouterAddress,
          linkTokenAddress,
          destinationChainSelector,
        ],
        bytecode: byteCode as `0x${string}`,
      });
      setHash(tx);
    } catch (err: any) {
    } finally {
      setLoading(false);
    }
  };
  if (isSuccess) {
    setContractInfo(receipt);
    setContractAddress(receipt.contractAddress as Address);
    setHash("0x");
  }
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-6 bg-[#181a20] p-6 rounded-xl">
        {/* 左边：铸造区域 */}
        <div className=" shadow space-y-4 md:w-1/2">
          <h2 className="text-xl text-[#8be9fd] font-bold">
            Step 2: 为你的电影发布专属数字徽章，让粉丝参与共创
          </h2>

          <div className="text-gray-300">
            电影: <span className="text-white">{film.title}</span>
          </div>

          <Button type="primary" loading={loading} onClick={handleIssueToken}>
            发布数字徽章
          </Button>
        </div>

        {/* 右边：Token 信息展示 */}
        <div className=" shadow space-y-4 md:w-1/2 text-sm text-gray-200">
          <h2 className="text-lg text-[#f1fa8c] font-bold">🎬 数字徽章信息</h2>

          {contractInfo ? (
            <>
              <div>
                ✅ <span className="text-green-400 font-semibold">已发行</span>
              </div>
              <div>
                📦 Contract Address:{" "}
                <span className="text-white break-all">
                  {contractInfo.contractAddress}
                </span>
              </div>
              <div>
                🔗 Transaction Hash:{" "}
                <a
                  href={`https://testnet.snowtrace.io/tx/${contractInfo.transactionHash}`}
                  className="text-blue-400 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contractInfo.transactionHash.slice(0, 20)}...
                </a>
              </div>
              <div>
                ⛓️ Block Number:{" "}
                <span className="text-white">{contractInfo.blockNumber}</span>
              </div>
            </>
          ) : (
            <div className="text-gray-400">🔄 等待铸造后展示信息...</div>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <Button
          type="primary"
          size="large"
          disabled={!contractInfo}
          onClick={() => onSuccess(contractInfo)}
        >
          下一步
        </Button>
      </div>
    </div>
  );
}
