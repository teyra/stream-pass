"use client";

import { useState } from "react";
import { supabase } from "@/supabase";
import { Button } from "@arco-design/web-react";
import lighthouse from "@lighthouse-web3/sdk";

interface Props {
  onSuccess: (filmId: number) => void;
}

export default function InsertMovie({ onSuccess }: Props) {
  const [form, setForm] = useState({
    title: "Star Trek: Into Darkness",
    director: "Emilia Chen",
    runtime: "142",
    investmentCost: "10",
    plotSummary:
      "In the futuristic world of 2150, an international space team discovers a cosmic anomaly threatening Earth's survival. They must traverse unknown wormholes to find a way to save humanity.",
    posterUrl:
      "https://mammoth-plum-sheep.myfilebase.com/ipfs/QmeDRDocA5gq9zqHq9qoxHCqRyq4PSBuWD3V3UbrrTGyQA",
    tokenCount: "1",
    genre: "Sci-Fi/Adventure",
    language: "Chinese/English",
    country: "China/USA",
    stars: ["Leonardo DiCaprio", "Scarlett Johansson", "Matt Damon"],
  });

  const [loading, setLoading] = useState(false);

  

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    try {
      const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY!;
      const output = await lighthouse.upload(e.target.files, apiKey);
      const cid = output.data.Hash;
      const url = `https://gateway.lighthouse.storage/ipfs/${cid}`;
      setForm((prev) => ({ ...prev, posterUrl: url }));
    } catch (err) {
      // Message.error("封面上传失败");
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("films")
        .insert([
          {
            title: form.title,
            director: form.director,
            runtime: Number(form.runtime),
            investmentCost: Number(form.investmentCost),
            plotSummary: form.plotSummary,
            posterUrl: form.posterUrl,
            genre: form.genre,
            language: form.language,
            country: form.country,
            stars: form.stars,
          },
        ])
        .select();

      if (error) throw error;

      // Message.success("🎬 电影信息已上传");
      console.log("🚀 ~ handleSubmit ~ data[0]:", data[0]);
      onSuccess(data[0]); // 返回 film
    } catch (err: any) {
      // Message.error("提交失败：" + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#181a20] p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl text-[#8be9fd] font-bold">Step 1: 上传电影信息</h2>

      {[
        { label: "电影名称", name: "title" },
        { label: "导演", name: "director" },
        { label: "时长 (分钟)", name: "runtime", type: "number" },
        { label: "投资成本 ($)", name: "investmentCost", type: "number" },
        { label: "简介", name: "plotSummary" },
        { label: "类型", name: "genre" },
        { label: "语言", name: "language" },
        { label: "国家", name: "country" },
        { label: "演员 (用英文逗号分隔)", name: "stars" },
      ].map(({ label, name, type }, i) => (
        <div key={i}>
          <label className="text-[#8be9fd] mb-1 block">{label}</label>
          <input
            name={name}
            type={type || "text"}
            value={(form as any)[name]}
            onChange={handleChange}
            className="w-full bg-[#23293a] border border-[#2e374a] rounded px-3 py-2 text-white"
          />
        </div>
      ))}

      <div>
        <label className="text-[#8be9fd] mb-1 block">上传海报</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="text-white"
        />
        {form.posterUrl && (
          <img
            src={form.posterUrl}
            alt="Poster Preview"
            className="mt-2 w-32 h-auto rounded shadow border border-gray-600"
          />
        )}
      </div>

      <Button type="primary" loading={loading} onClick={handleSubmit}>
        保存并继续
      </Button>
    </div>
  );
}
