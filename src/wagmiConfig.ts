import { http, createConfig } from "@wagmi/core";
import { avalancheFuji, mainnet, sepolia } from "@wagmi/core/chains";

export const config = createConfig({
  chains: [mainnet, sepolia, avalancheFuji],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [avalancheFuji.id]: http(),
  },
});
