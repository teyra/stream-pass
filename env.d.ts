declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_GRAPH_API_KEY: string;
    NEXT_PUBLIC_FACTORY_ADDRESS: "0x${string}";
    NEXT_PUBLIC_LINK_TOKEN_ADDRESS: "0x${string}";
  }
}
