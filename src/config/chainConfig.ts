export const CHAIN_CONFIG: Record<
  number,
  {
    name: string;
    functionsRouter: `0x${string}`;
    ccipRouter: `0x${string}`;
    linkToken: `0x${string}`;
    usdcToken: `0x${string}`;
    chainSelector: string;
    sptVipAddress: `0x${string}`;
    donId: string;
    usdcUsdAggregatorAddress: `0x${string}`;
    lotteryContractAddress: `0x${string}`;
  }
> = {
  11155111: {
    name: "Sepolia",
    sptVipAddress: "0x",
    functionsRouter: "0xb83E47C2bC239B3bf370bc41e1459A34b41238D0",
    ccipRouter: "0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59",
    linkToken: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
    usdcToken: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
    chainSelector: "14767482510784806043",
    donId: "0x66756e2d657468657265756d2d7365706f6c69612d3100000000000000000000",
    usdcUsdAggregatorAddress: "0xA2F78ab2355fe2f984D808B5CeE7FD0A93D5270E",
    lotteryContractAddress: "0x",
  },
  43113: {
    name: "Fuji",
    sptVipAddress: "0x4FAbEC796A5DA4B65d5eE0020406ceFA0E912981",
    functionsRouter: "0xA9d587a00A31A52Ed70D6026794a8FC5E2F5dCb0",
    ccipRouter: "0xF694E193200268f9a4868e4Aa017A0118C9a8177",
    linkToken: "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846",
    usdcToken: "0x5425890298aed601595a70AB815c96711a31Bc65",
    chainSelector: "16015286601757825753",
    donId: "0x66756e2d6176616c616e6368652d66756a692d31000000000000000000000000",
    usdcUsdAggregatorAddress: "0x97FE42a7E96640D932bbc0e1580c73E705A8EB73",
    lotteryContractAddress: "0xBFd7CC1531b682f6c691aCC8B72D00bBDCeD996c",
  },
  // ...更多链
};

export function getChainConfig(chainId: number) {
  const config = CHAIN_CONFIG[chainId];
  if (!config) throw new Error("Unsupported chain ID");
  return config;
}
