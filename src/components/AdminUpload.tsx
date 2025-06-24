"use client";
import { useState } from "react";
import lighthouse from "@lighthouse-web3/sdk";
import { useAccount, useSignMessage, useWriteContract } from "wagmi";
import { parseAbi, parseEther } from "viem";
import { supabase } from "@/supabase";
import Image from "next/image";

export default function AdminUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [ipfsUrl, setIpfsUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "APT Token",
    symbol: "APT",
    assetName: "上海浦东甲级写字楼",
    description: "位置优越、租金稳定",
    fundraisingTarget: "100",
    usdPerAssetToken: "0.1",
    priceFeedAddress: "0xc59E3633BAAC79493d908e63626716e204A45EdF", //LINK / USD
  });
  const { address, chainId } = useAccount();

  const FACTORY_ADDRESS = process.env.NEXT_PUBLIC_FACTORY_ADDRESS;
  const LINK_ADDRESS = process.env.NEXT_PUBLIC_LINK_TOKEN_ADDRESS;
  const { writeContractAsync } = useWriteContract();
  const { signMessageAsync } = useSignMessage();

  // 处理表单输入
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // 处理文件选择
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  }

  // 签名
  const signAuthMessage = async () => {
    if (!address) return;
    const { message } = (await lighthouse.getAuthMessage(address)).data;
    if (!message) throw new Error("Auth message is null");
    try {
      return await signMessageAsync({ message });
    } catch (error) {
      console.log("🚀 ~ signAuthMessage ~ error:", error);
      return null;
    }
  };

  // 上传并创建资产
  async function handleUpload() {
    if (
      !file ||
      !form.name ||
      !form.symbol ||
      !form.assetName ||
      !form.description ||
      !form.fundraisingTarget ||
      !form.usdPerAssetToken ||
      !form.priceFeedAddress
    ) {
      alert("请完整填写所有信息并上传图片");
      return;
    }
    setLoading(true);
    try {
      const signedMessage = await signAuthMessage();
      console.log("🚀 ~ handleUpload ~ signedMessage:", signedMessage);
      if (!signedMessage) {
        setLoading(false);
        return;
      }
      // 上传图片到lighthouse
      // const output = await lighthouse.uploadEncrypted(
      //   file,
      //   apiKey,
      //   address as string,
      //   signedMessage,
      //   (progressData: any) => {}
      // );
      // if (!output.data) throw new Error("上传失败");
      // const hash = output.data[0].Hash;
      const hash =
        "bafybeicssydelgatxnbe3iuhhrfwzmxduw2o65v33qzpmwvzl3wd62hvki";
      setIpfsUrl(`https://decrypt.mesh3.network/evm/${hash}`);
      // 创建资产
      await supabase.from("assets").insert([
        {
          token_name: form.name,
          token_symbol: form.symbol,
          description: form.description,
          name: form.assetName,
          metadata_uri: "ipfs://" + hash,
          chain_id: chainId,
          created_by: address,
          fundraising_target: parseFloat(form.fundraisingTarget),
          usd_value: parseFloat(form.usdPerAssetToken),
          price_feed_address: form.priceFeedAddress,
          payment_token_address: LINK_ADDRESS,
        },
      ]);
      const abi = parseAbi([
        "function createAsset(string memory _name,string memory _symbol,string memory _assetName,string memory _description,string memory _metadataURI,uint256 _fundraisingTarget,uint256 _usdPerAssetToken,address _paymentTokenAddress,address _priceFeedAddress) external returns (address assetAddress)",
      ]);
      const res = await writeContractAsync({
        abi,
        address: FACTORY_ADDRESS,
        functionName: "createAsset",
        args: [
          form.name,
          form.symbol,
          form.assetName,
          form.description,
          "ipfs://" + hash,
          parseEther(form.fundraisingTarget),
          parseEther(form.usdPerAssetToken),
          LINK_ADDRESS,
          form.priceFeedAddress as `0x${string}`,
        ],
      });
      alert("资产创建成功，交易哈希：" + res);
    } catch (e) {
      console.log("🚀 ~ handleUpload ~ e:", e);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232526]">
      <div className="w-full max-w-lg rounded-2xl shadow-2xl bg-[#181c24] bg-opacity-95 p-10 border border-[#2e374a] backdrop-blur-md">
        <h2 className="text-3xl font-bold text-cyan-400 mb-8 tracking-widest text-center drop-shadow-lg">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
            创建资产
          </span>
        </h2>
        <div className="space-y-5">
          <div className="flex flex-col gap-2">
            <label className="text-[#8be9fd] font-semibold">资产名称</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="bg-[#23293a] border border-[#2e374a] rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="如：APT Token"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[#8be9fd] font-semibold">资产符号</label>
            <input
              name="symbol"
              value={form.symbol}
              onChange={handleChange}
              className="bg-[#23293a] border border-[#2e374a] rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="如：APT"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[#8be9fd] font-semibold">资产项目名</label>
            <input
              name="assetName"
              value={form.assetName}
              onChange={handleChange}
              className="bg-[#23293a] border border-[#2e374a] rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="如：上海浦东甲级写字楼"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[#8be9fd] font-semibold">资产描述</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="bg-[#23293a] border border-[#2e374a] rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="如：位置优越、租金稳定"
              rows={2}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[#8be9fd] font-semibold">
              目标募集资金(ETH)
            </label>
            <input
              name="fundraisingTarget"
              value={form.fundraisingTarget}
              onChange={handleChange}
              type="number"
              min="0"
              step="any"
              className="bg-[#23293a] border border-[#2e374a] rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="如：100"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[#8be9fd] font-semibold">
              每份资产Token价格(USD)
            </label>
            <input
              name="usdPerAssetToken"
              value={form.usdPerAssetToken}
              onChange={handleChange}
              type="number"
              min="0"
              step="any"
              className="bg-[#23293a] border border-[#2e374a] rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="如：10"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[#8be9fd] font-semibold">价格预言机</label>
            <input
              name="priceFeedAddress"
              value={"LINK / USD"}
              onChange={handleChange}
              className="bg-[#23293a] border border-[#2e374a] rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="LINK / USD"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[#8be9fd] font-semibold">上传资产图片</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file:bg-cyan-600 file:text-white file:rounded file:px-4 file:py-2 file:border-none file:mr-4"
            />
            {preview && (
              <Image
                width={200}
                height={200}
                src={preview}
                alt="预览"
                className="mt-2 max-h-40 rounded shadow border border-cyan-900 object-contain"
              />
            )}
          </div>
          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full mt-4 py-3 rounded bg-gradient-to-r from-cyan-600 to-blue-500 text-white font-bold text-lg hover:from-cyan-400 hover:to-blue-400 transition shadow-lg"
          >
            {loading ? "创建中..." : "上传并创建资产"}
          </button>
          {ipfsUrl && (
            <div className="mt-4 text-green-400 break-all">
              上传成功：
              <a href={ipfsUrl} target="_blank" className="underline">
                {ipfsUrl}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
