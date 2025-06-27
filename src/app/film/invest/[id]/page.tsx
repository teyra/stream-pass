"use client";
import { investAbi } from "@/abi/invest";
import { supabase } from "@/supabase";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Address, erc20Abi, formatUnits, parseUnits } from "viem";
import {
  useAccount,
  useChainId,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import Image from "next/image";
import dayjs from "dayjs";
import { useToast } from "@/hooks/useToast";
import { getChainConfig } from "@/config/chainConfig";

export default function FilmInvestDetailPage() {
  const { id } = useParams();
  const toast = useToast();

  const title =
    "Join us as an early investor and become part of Hollywoodhistory. This is not just watching a movie - it's owning a partof it.";

  interface Film {
    id: string | number;
    films: {
      id: string;
      title: string;
      description: string;
      posterUrl: string;
      genre: string;
      created_at: string;
      director: string;
      stars: string[];
      vfx: string;
      investmentCost: number;
      progress: number;
      amount: number;
      targetAmount: number;
      investorCount: number;
      leftDays: number;
      contract_address: Address;
    };
    contractAddress: Address;
    tokenId: string;
    creator?: Address;
  }
  const [film, setFilm] = useState<Film>({
    id: "",
    films: {
      id: "",
      title: "",
      description: "",
      posterUrl: "",
      genre: "",
      created_at: "",
      director: "",
      stars: [""],
      vfx: "",
      investmentCost: 0,
      progress: 0,
      amount: 0,
      targetAmount: 0,
      investorCount: 0,
      leftDays: 0,
      contract_address: "0x",
    },
    creator: "0x",
    contractAddress: "0x",
    tokenId: "",
  });

  const [loading, setLoading] = useState(true);
  const chainId = useChainId();
  useEffect(() => {
    const fetchFilm = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("invests")
        .select(
          `
        *,
       films (*)
      `
        )
        .eq("id", id)
        .eq("chainId", chainId)
        .single();
      setFilm(data);
      setLoading(false);
    };
    fetchFilm();
  }, [id, chainId]);

  const { writeContractAsync, error } = useWriteContract();
  const { address } = useAccount();
  const [hash, setHash] = useState<`0x${string}`>("0x");

  const [amount, setAmount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const { usdcToken } = getChainConfig(chainId);
  const USDC_ADDRESS = usdcToken;
  const investAddress = film.contractAddress;

  const [isApproving, setIsApproving] = useState(false);
  const [investing, setInvesting] = useState(false);
  const [hasApproved, setHasApproved] = useState(false); // 初始时你可以 useEffect 检查 allowance 设置为 true
  const [allowHash, setAllowHash] = useState<`0x${string}`>("0x");

  const { data: allowBlance, refetch: allowBlanceRefetch } = useReadContract({
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
  const myBalance = (balance && formatUnits(balance, decimals || 18)) || 0;
  const allowBalanceUnit =
    (allowBlance && formatUnits(allowBlance, decimals || 18)) || 0;
  const {
    data: collectBalance,
    refetch: collectBalanceRefetch,
  }: {
    data: any;
    refetch: () => void;
  } = useReadContract({
    abi: investAbi,
    address: investAddress,
    functionName: "getFilmUSDC",
  });

  const { data: filmTokenBalance, refetch: filmTokenBalanceRefetch } =
    useReadContract({
      abi: investAbi,
      address: investAddress,
      functionName: "getFilmTokenBalance",
      args: [film.tokenId],
    });

  const {
    data: filmRecords = [],
    refetch: filmRecordsRefetch,
  }: {
    data: any;
    refetch: () => void;
  } = useReadContract({
    abi: investAbi,
    address: investAddress,
    functionName: "getAllInvestRecords",
    args: [film.tokenId],
  });
  const { data: currentPrice = "0" }: { data: any } = useReadContract({
    abi: investAbi,
    address: investAddress,
    functionName: "getValuationInUsdc",
    args: [film.tokenId],
  });
  const { isSuccess: investSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleInsertRecord = async () => {
    await supabase.from("investRecords").insert([
      {
        film: film.films.id,
        invest: film.id,
        investor: address,
        amount: amount,
        total_price: totalPrice,
        chainId,
      },
    ]);
  };

  const handleInsertAsset = async () => {
    await supabase.from("assets").insert([
      {
        film: film.films.id,
        amount: amount,
        type: 1,
        chainId,
        owner: address,
        tokenId: film?.tokenId,
      },
    ]);
  };
  const { isSuccess: isAllowSuccess } = useWaitForTransactionReceipt({
    hash: allowHash,
  });

  useEffect(() => {
    const allPrice =
      (Number(formatUnits(currentPrice, decimals || 0)) * amount) /
      Number(filmTokenBalance);
    const singlePrice =
      Number(formatUnits(currentPrice, decimals || 0)) /
      Number(filmTokenBalance);
    setPrice(singlePrice);
    setTotalPrice(allPrice);
    if (allowBalanceUnit) {
      setHasApproved(Number(allowBalanceUnit) >= totalPrice);
    }
  }, [
    amount,
    currentPrice,
    filmTokenBalance,
    decimals,
    allowBalanceUnit,
    totalPrice,
  ]);

  const handleInvest = async () => {
    console.log(
      "🚀 ~ handleInvest ~ Number(allowBalanceUnit) >= totalPrice:",
      Number(allowBalanceUnit) >= totalPrice
    );
    console.log("🚀 ~ handleInvest ~ totalPrice:", totalPrice);
    console.log("🚀 ~ handleInvest ~ allowBalanceUnit:", allowBalanceUnit);
    if (Number(allowBalanceUnit) > 0) {
      setInvesting(true);
      const hash = await writeContractAsync({
        abi: investAbi,
        address: investAddress,
        functionName: "invest",
        args: [film.tokenId, amount, "0x"],
      });
      setHash(hash);
    }
  };

  const handleApprove = async () => {
    if (Number(myBalance) < totalPrice) {
      return;
    }
    setIsApproving(true);
    const tx = await writeContractAsync({
      abi: erc20Abi,
      address: USDC_ADDRESS,
      functionName: "approve",
      args: [investAddress, parseUnits(String(totalPrice), 6)],
    });
    setAllowHash(tx);
  };
  if (investSuccess) {
    collectBalanceRefetch();
    filmRecordsRefetch();
    setInvesting(false);
    handleInsertRecord();
    handleInsertAsset();
    toast.success("Invest successfully");
    setHash("0x");
  }
  if (isAllowSuccess) {
    setAllowHash("0x");
    setIsApproving(false);
    setHasApproved(true);
    allowBlanceRefetch();
    toast.success("approve successfully");
  }
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-400">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-8 bg-gray-700 rounded w-3/4"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-4 bg-gray-700 rounded col-span-2"></div>
                <div className="h-4 bg-gray-700 rounded col-span-1"></div>
              </div>
              <div className="h-4 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左侧 - 电影主要信息 */}
          <div className="flex-1">
            {/* 电影海报 */}
            <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden shadow-2xl mb-8 group">
              <Image
                sizes="180"
                src={film.films.posterUrl}
                alt={film.films.title}
                fill
                priority={true}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <span className="absolute top-4 left-4 bg-teal-400 text-gray-900 text-sm px-3 py-1 rounded-full font-bold shadow-md">
                {film.films.genre}
              </span>
              <span className="absolute bottom-4 right-4 bg-gray-900/80 text-teal-400 text-xs px-3 py-1 rounded-full font-medium">
                {dayjs(film.films.created_at).format("YYYY.MM.DD")}
              </span>
            </div>

            {/* Movie Title */}
            <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
              {film.films.title}
            </h1>
            <div className="text-teal-300 font-medium my-4">
              FMT: {film.films.contract_address}
            </div>

            {/* Investment Overview */}
            <div className="mb-6 text-lg font-medium text-gray-300">
              <span className="text-teal-400 font-semibold">
                Production Budget:
              </span>{" "}
              <span className="text-2xl font-bold text-emerald-400">
                $1 Billion
              </span>{" "}
              - Creating an epoch-making blockbuster
            </div>

            {/* Movie Description */}
            <div className="prose prose-invert max-w-none mb-8">
              <p className="text-gray-300 leading-relaxed">
                {film.films.description}
              </p>
              <p className="text-teal-300 font-medium mt-4">{title}</p>
            </div>

            {/* Investment Highlights */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700 shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-teal-400 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                Investment Highlights
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    Revenue sharing from box office, streaming rights, and
                    merchandise
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    Directed by{" "}
                    <span className="font-medium">{film.films.director}</span>,
                    starring {film.films.stars?.join(", ")}
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    Smart contracts ensure transparent and automatic profit
                    distribution
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    FMT can be traded on the secondary market, high liquidity
                  </span>
                </li>
              </ul>
            </div>

            {/* Investment Data Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <div className="text-sm text-gray-400">Raised</div>
                <div className="text-xl font-bold text-teal-400">
                  {Number(formatUnits(collectBalance || 0, 6)).toFixed(2)} USDC
                </div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <div className="text-sm text-gray-400">Investors</div>
                <div className="text-xl font-bold text-emerald-400">
                  {filmRecords.length || 0}
                </div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <div className="text-sm text-gray-400">Target Amount</div>
                <div className="text-xl font-bold text-white">$500 Million</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <div className="text-sm text-gray-400">Days Left</div>
                <div className="text-xl font-bold text-amber-400">
                  {film.films.leftDays || 100}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <label className="mb-1 text-sm text-gray-300 font-medium">
                Select the amount of FMT you want to receive
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {[1, 5, 10, 15, 20, 25, 30].map((val) => (
                  <button
                    key={val}
                    type="button"
                    className={`px-4 py-2 rounded-lg border font-bold transition
          ${
            amount === val
              ? "bg-gradient-to-r from-teal-400 to-emerald-400 text-gray-900 border-teal-400 shadow"
              : "bg-[#23293a] text-white border-[#2e374a] hover:bg-teal-900/40"
          }`}
                    onClick={() => setAmount(val)}
                  >
                    {val}
                  </button>
                ))}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Estimated payment
                <span className="text-[#8be9fd] font-bold mx-1">
                  {totalPrice.toFixed(2)}
                </span>
                USDC
              </div>
            </div>
            <div>
              {!hasApproved && (
                <button
                  disabled={isApproving || hasApproved}
                  onClick={handleApprove}
                  className="bg-[#3aefc1] text-black font-semibold px-6 py-3 rounded-full shadow hover:scale-105 transition disabled:opacity-50 w-full"
                >
                  {isApproving
                    ? "Authorizing..."
                    : hasApproved
                    ? "Authorized ✅"
                    : "① Approve USDC"}
                </button>
              )}
              {hasApproved && (
                <button
                  disabled={!hasApproved || investing}
                  onClick={handleInvest}
                  className="bg-gradient-to-r from-[#58e1c1] to-[#58d68d] text-black font-bold px-6 py-3 rounded-full shadow-xl hover:scale-105 transition w-full disabled:opacity-50 mt-4"
                >
                  {investing ? "Processing..." : "② Invest Now"}
                </button>
              )}
            </div>
          </div>

          {/* Right Side - Investment Details */}
          <div className="w-full lg:w-96 space-y-8">
            {/* Investment Terms */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-teal-400 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                    clipRule="evenodd"
                  />
                </svg>
                Investment Terms
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-400">
                    Minimum Investment
                  </div>
                  <div className="text-lg font-medium">
                    {price.toFixed(2)} USDC
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Token Price</div>
                  <div className="text-lg font-medium">
                    {price.toFixed(2)} USDC = 1 FMT
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Expected Return</div>
                  <div className="text-lg font-medium text-emerald-400">
                    3-5x
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Lock-up Period</div>
                  <div className="text-lg font-medium">6 months</div>
                </div>
              </div>
            </div>

            {/* Recent Investment Records */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-teal-400 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                Recent Investments
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {filmRecords?.length > 0 ? (
                  filmRecords.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center bg-gray-700/50 hover:bg-gray-700/70 rounded-lg px-4 py-3 transition-colors"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center mr-3">
                          <svg
                            className="w-4 h-4 text-teal-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-teal-300 truncate max-w-[120px]">
                            {item.investor.slice(0, 6)}...
                            {item.investor.slice(-4)}
                          </div>
                          <div className="text-xs text-gray-400">
                            {new Date().toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-emerald-400">
                          {item.usdcAmount &&
                            Number(
                              formatUnits(item.usdcAmount, decimals || 0)
                            ).toFixed(2)}{" "}
                          USDC
                        </div>
                        <div className="text-xs text-gray-400">
                          {item.filmTokenAmount} FMT
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    No investment records yet, be the first investor!
                  </div>
                )}
              </div>
            </div>

            {/* Investment Process */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-teal-400 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                Investment Process
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-500 text-gray-900 font-bold text-sm">
                      1
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Connect your wallet</p>
                    <p className="text-xs text-gray-400">
                      Supported: MetaMask, WalletConnect
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-500 text-gray-900 font-bold text-sm">
                      2
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Approve USDC spending</p>
                    <p className="text-xs text-gray-400">
                      Approve our smart contract once
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-500 text-gray-900 font-bold text-sm">
                      3
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Invest any amount</p>
                    <p className="text-xs text-gray-400">Minimum 10 USDC</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-500 text-gray-900 font-bold text-sm">
                      4
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Receive FMT</p>
                    <p className="text-xs text-gray-400">
                      Minted instantly to your wallet
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 👇 toast must be rendered in the page */}
      {toast.render()}
    </div>
  );
}
