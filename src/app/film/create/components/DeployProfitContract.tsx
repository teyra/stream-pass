"use client";

import { useCallback, useEffect, useState } from "react";
import { Button, Space } from "@arco-design/web-react";
import {
  useAccount,
  useChainId,
  useDeployContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { bytecode, investAbi } from "@/abi/invest";
import { Address } from "viem";
import { supabase } from "@/supabase";
import { getChainConfig } from "@/config/chainConfig";
interface Props {
  film: any;
  filmTokenAddress: `0x${string}`;
  onDeployed: (investmentAddress: string) => void;
}

export default function DeployInvestmentContract({
  film,
  filmTokenAddress,
  onDeployed,
}: Props) {
  const [hash, setHash] = useState<`0x${string}`>("0x");
  const [contractInfo, setContractInfo] = useState<any>(null);
  const { address } = useAccount();
  const chainId = useChainId();
  const { data: receipt, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const generateRandom16Digit = () => {
    const min = 1e15; // 1000000000000000
    const max = 9.999999999999999e15; // 9999999999999999
    return Math.floor(Math.random() * (max - min)) + min;
  };
  const setContractAddress = useCallback(
    async (contractAddress: Address) => {
      await supabase.from("invests").insert([
        {
          film: film.id,
          contractAddress,
          creator: address,
          tokenId: generateRandom16Digit(),
          chainId,
        },
      ]);
      onDeployed(contractAddress);
    },
    [film.id, address, chainId, onDeployed]
  );
  useEffect(() => {
    if (isSuccess) {
      setContractInfo(receipt);
      setHash("0x");
      setContractAddress(receipt.contractAddress as Address);
    }
  }, [isSuccess, receipt, setContractAddress]);

  const { usdcToken, usdcUsdAggregatorAddress } = getChainConfig(chainId);
  const usdcTokenAddress = usdcToken;
  const usdcAggregator = usdcUsdAggregatorAddress;
  const usdcHeartbeat = Number(process.env.NEXT_PUBLIC_USDC_USD_HEARTBEAT);
  const { deployContractAsync } = useDeployContract();

  const deployContract = async () => {
    const tx = await deployContractAsync({
      abi: investAbi,
      args: [filmTokenAddress, usdcTokenAddress, usdcAggregator, usdcHeartbeat],
      bytecode: bytecode as `0x${string}`,
    });
    setHash(tx);
  };

  return (
    <div className="bg-[#181a20] p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl text-[#8be9fd] font-bold">
        Step 3: Launch Support & Profit Sharing Plan
      </h2>

      <div className="text-gray-300">
        Link Film Contract:{" "}
        <span className="text-white">{filmTokenAddress}</span>
      </div>
      <Space direction="vertical" size="medium">
        <Button type="primary" onClick={deployContract}>
          Launch Plan
        </Button>

        {contractInfo && (
          <div className="text-green-400 mt-4">
            ✅ Contract deployed successfully: {contractInfo.contractAddress}
            <br />
          </div>
        )}
      </Space>
    </div>
  );
}
