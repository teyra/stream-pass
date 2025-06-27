"use client";

import { useState } from "react";
import { Button } from "@arco-design/web-react";
import {
  useChainId,
  useDeployContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { byteCode, filmTokenAbi } from "@/abi/film";
import { supabase } from "@/supabase";
import { Address } from "viem";
import { getChainConfig } from "@/config/chainConfig";

interface Props {
  film: any;
  onSuccess: (txData: any) => void;
}

export default function DeployToken({ film, onSuccess }: Props) {
  const chainId = useChainId();
  const { functionsRouter, ccipRouter, linkToken, chainSelector } =
    getChainConfig(chainId);
  const tokenUri =
    "https://mammoth-plum-sheep.myfilebase.com/ipfs/QmdZFhapTKKfrv4R3BLydoQrK7sWzpXanpyubm8xkKbwHt";
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
        args: [tokenUri, functionsRouter, ccipRouter, linkToken, chainSelector],
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
        {/* Left: Minting Area */}
        <div className="shadow space-y-4 md:w-1/2">
          <h2 className="text-xl text-[#8be9fd] font-bold">
            Step 2: Issue a unique digital badge for your film and let fans
            co-create
          </h2>

          <div className="text-gray-300">
            Film: <span className="text-white">{film.title}</span>
          </div>

          <Button type="primary" loading={loading} onClick={handleIssueToken}>
            Issue Digital Badge
          </Button>
        </div>

        {/* Right: Token Info Display */}
        <div className="shadow space-y-4 md:w-1/2 text-sm text-gray-200">
          <h2 className="text-lg text-[#f1fa8c] font-bold">
            🎬 Digital Badge Info
          </h2>

          {contractInfo ? (
            <>
              <div>
                ✅ <span className="text-green-400 font-semibold">Issued</span>
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
            <div className="text-gray-400">
              🔄 Info will be displayed after minting...
            </div>
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
          Next Step
        </Button>
      </div>
    </div>
  );
}
