import { parseAbi } from "viem";

export const isValidVIPAbi = parseAbi([
  "function isValidVIP(address user) external view returns (bool)",
]);

export const purchaseVIPAbi = [
  {
    inputs: [],
    name: "purchaseVIP",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
];
