"use client";
import { useState } from "react";
import { Steps } from "@arco-design/web-react";
const { Step } = Steps;
import InsertMovie from "./components/InsertMovie";
import DeployToken from "./components/DeployToken";
import DeployInvestmentContract from "./components/DeployProfitContract";
import { useRouter } from "next/navigation";

export default function PublishFilmPage() {
  const [current, setCurrent] = useState(0);
  const [film, setFilm] = useState<any>(null);
  const [token, setToken] = useState<any>(null);
  const router = useRouter();
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <Steps current={current} className="mb-6">
        <Step title="Fill in Film Information" />
        <Step title="Create Film Token" />
        <Step title="Deploy Profit Contract" />
      </Steps>

      {current === 0 && (
        <InsertMovie
          onSuccess={(data) => {
            console.log("🚀 ~ PublishFilmPage ~ data:", data);
            setFilm(data);
            setCurrent(1);
          }}
        />
      )}

      {current === 1 && (
        <DeployToken
          film={film}
          onSuccess={(txData) => {
            console.log("🚀 ~ PublishFilmPage ~ txData:", txData);
            setToken(txData.contractAddress);
            setCurrent(2);
          }}
        />
      )}

      {current === 2 && (
        <DeployInvestmentContract
          film={film}
          filmTokenAddress={token}
          onDeployed={(data) => {
            setTimeout(() => {
              router.back();
            }, 3000);
          }}
        />
      )}
    </div>
  );
}
