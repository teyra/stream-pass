import { useEffect, useState } from "react";
import { Modal } from "@arco-design/web-react";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { purchaseVIPAbi } from "@/abi/vip";
import { erc20Abi, formatEther, parseUnits } from "viem";
export default function VIPAccess({
  visible,
  onClose,
  hasNFT = false,
  onSuccess,
}: {
  visible: boolean;
  onClose: () => void;
  hasNFT: boolean;
  onSuccess: () => void;
}) {
  const vipAddress = process.env.NEXT_PUBLIC_SPT_ADDRESS;
  const LINK_ADDRESS = process.env.NEXT_PUBLIC_LINK_TOKEN_ADDRESS;
  const requiredLink = "5";
  const { writeContractAsync } = useWriteContract();
  const { address } = useAccount();
  const [isApproving, setIsApproving] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [hasApproved, setHasApproved] = useState(false); // 初始时你可以 useEffect 检查 allowance 设置为 true
  const [allowHash, setAllowHash] = useState<`0x${string}`>("0x");
  const [purchaseHash, setPurchaseHash] = useState<`0x${string}`>("0x");
  const { data: allowance, refetch: allowanceRefetch } = useReadContract({
    abi: erc20Abi,
    address: LINK_ADDRESS,
    functionName: "allowance",
    args: [address as `0x${string}`, vipAddress],
  });

  const { data: balance, refetch: balanceRefetch } = useReadContract({
    abi: erc20Abi,
    address: LINK_ADDRESS,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
  });
  const myBalance = (balance && formatEther(balance)) || 0;

  useEffect(() => {
    if (allowance) {
      const allowanceBalance = formatEther(allowance) || 0;
      setHasApproved(Number(allowanceBalance) >= 5);
    }
  }, [allowance]);
  const myAllowanceBalance = (allowance && formatEther(allowance)) || 0;
  const { isSuccess: isAllowSuccess } = useWaitForTransactionReceipt({
    hash: allowHash,
  });

  const handleUnlock = async () => {
    if (Number(myBalance) < 5 || Number(myAllowanceBalance) < 5) {
      return;
    }
    setIsUnlocking(true);
    const tx = await writeContractAsync({
      address: vipAddress,
      abi: purchaseVIPAbi,
      functionName: "purchaseVIP",
      args: [],
    });
    setPurchaseHash(tx);
  };

  const handleApprove = async () => {
    if (Number(myBalance) < 5) {
      return;
    }
    setIsApproving(true);
    const tx = await writeContractAsync({
      abi: erc20Abi,
      address: LINK_ADDRESS,
      functionName: "approve",
      args: [vipAddress, parseUnits(String(requiredLink), 18)],
    });
    setAllowHash(tx);
  };
  if (isAllowSuccess) {
    setAllowHash("0x");
    setIsApproving(false);
    setHasApproved(true);
    allowanceRefetch();
    handleUnlock();
  }

  const { isSuccess: isPurchaseReceiptSuccess } = useWaitForTransactionReceipt({
    hash: purchaseHash,
  });
  if (isPurchaseReceiptSuccess) {
    setPurchaseHash("0x");
    balanceRefetch();
    setIsUnlocking(false);
    onSuccess();
  }
  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={null}
      maskClosable={false}
      className="rounded-2xl"
      style={{ width: 480, backgroundColor: "#1a1d2e" }}
    >
      <div className="flex flex-col items-center text-center p-6 space-y-6">
        {/* 标题 */}
        <h2 className="text-3xl font-extrabold text-[#4abba1]">
          开启影片访问权限
        </h2>

        {/* 副标题 */}
        <p className="text-gray-400 text-base leading-relaxed max-w-md">
          使用平台通证解锁影片正片、幕后内容，参与创作过程，与创作者同行。
        </p>

        {/* 状态卡片 */}
        <div className="bg-[#23293a] rounded-xl p-5 w-full shadow-lg border border-[#2c2f40] space-y-3 text-left text-sm text-gray-300">
          <div className="flex items-center justify-between">
            <span>🎫 当前账户LINK余额：</span>
            <span className="font-bold text-white">{myBalance}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>🔓 解锁所需LINK：</span>
            <span className="font-bold text-gray-300">{requiredLink}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>🎟️ 通行凭证状态：</span>
            <span
              className={`font-bold ${
                hasNFT ? "text-green-400" : "text-red-400"
              }`}
            >
              {hasNFT ? "已持有" : "未持有"}
            </span>
          </div>
        </div>

        {/* 权益描述 */}
        <ul className="text-sm text-gray-300 space-y-2 text-left max-w-md">
          <li>
            🎬 解锁{" "}
            <span className="text-[#58e1c1] font-semibold">影片正片播放</span>
          </li>
          <li>
            🎁 获得{" "}
            <span className="text-[#f39c12] font-semibold">
              幕后内容与制作档案
            </span>
          </li>
          <li>
            🎥 参与{" "}
            <span className="text-[#e67e22] font-semibold">
              电影投资与回报分红
            </span>
          </li>
        </ul>

        {/* 解锁按钮 */}
        {hasNFT ? (
          <div className="text-green-400 font-bold text-lg mt-4">
            ✅ 访问权限已激活，开始你的观影之旅！
          </div>
        ) : (
          <div>
            {!hasApproved && (
              <button
                disabled={isApproving || hasApproved}
                onClick={handleApprove}
                className="bg-[#3aefc1] text-black font-semibold px-6 py-3 rounded-full shadow hover:scale-105 transition disabled:opacity-50 w-full"
              >
                {isApproving
                  ? "授权中..."
                  : hasApproved
                  ? "已授权 ✅"
                  : "① 授权通证额度"}
              </button>
            )}
            {hasApproved && (
              <button
                disabled={!hasApproved || isUnlocking}
                onClick={handleUnlock}
                className="bg-gradient-to-r from-[#58e1c1] to-[#58d68d] text-black font-bold px-6 py-3 rounded-full shadow-xl hover:scale-105 transition w-full disabled:opacity-50 mt-4"
              >
                {isUnlocking ? "解锁中..." : "② 解锁访问权限"}
              </button>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
