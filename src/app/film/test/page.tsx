"use client";
import { crossChainBurnAbi, crossChainBurnEventAbi } from "@/abi/film";
import { useState } from "react";
import { erc1155Abi } from "viem";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWatchContractEvent,
  useWriteContract,
} from "wagmi";

export default function FilmListPage() {
  const { writeContractAsync } = useWriteContract();
  const [hash, setHash] = useState<`0x${string}`>("0x");
  const { address } = useAccount();

  const filmToken = process.env.NEXT_PUBLIC_FILM_TOKEN_ADDRESS;
  const res = useWaitForTransactionReceipt({
    hash,
  });
  console.log(res);

  const { data } = useReadContract({
    abi: erc1155Abi,
    address: filmToken,
    functionName: "balanceOf",
    args: [address, 1],
  });
  console.log("🚀 ~ FilmListPage ~ data:", data);

  useWatchContractEvent({
    address: filmToken,
    abi: crossChainBurnEventAbi,
    eventName: "DebugAddress",
    onLogs(logs) {
      console.log("New logs!", logs);
    },
  });

  //   if (investSuccess) {
  //     // collectBalanceRefetch();
  //     // filmRecordsRefetch();
  //     // setInvesting(false);
  //     // setHash("0x");
  //   }
  const fetchFilms = async () => {
    console.log("fetchFilms", address);
    const hash = await writeContractAsync({
      abi: crossChainBurnAbi,
      address: filmToken,
      functionName: "crossChainBurn",
      args: [address, 1, 1, "0x931987036840C213ED289d46147Cb7E1e2c18b6D", 1],
    });
    setHash(hash);
  };

  //   useEffect(() => {
  //     fetchFilms();
  //   }, []);

  const handleDetail = (id: number) => {
    // 跳转到电影详情页
    // router.push(`/film/invest/${id}`);
  };

  return (
    <>
      <button onClick={() => fetchFilms()}>转账</button>
    </>
  );
}
