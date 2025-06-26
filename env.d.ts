declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_GRAPH_API_KEY: string;
    NEXT_PUBLIC_FACTORY_ADDRESS: "0x${string}";
    NEXT_PUBLIC_LINK_TOKEN_ADDRESS: "0x${string}";
    NEXT_PUBLIC_SPT_ADDRESS: "0x${string}";
    NEXT_PUBLIC_USDC_ADDRESS: "0x${string}";
    NEXT_PUBLIC_INVEST_ADDRESS: "0x${string}";
    NEXT_PUBLIC_FILM_TOKEN_ADDRESS: "0x${string}";
    NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS: "0x${string}";
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    NEXT_PUBLIC_LIGHTHOUSE_API_KEY: string;
  }
}
