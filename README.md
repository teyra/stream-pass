# Stream Pass 🎬🔗

Write your passion on the blockchain, let the story travel far.

## 📖 Project Overview

**Stream Pass** is an onchain film crowdfunding and content access platform that combines NFTs, stablecoins, and encrypted storage. It empowers creators to raise funds for their films, control access to content, and share revenue with fans. Powered by Chainlink's core Web3 infrastructure, the platform integrates off-chain data access, cross-chain token transfer, automation, and randomness.

---

## 🔗 Chainlink Integration

Stream Pass deeply integrates five of Chainlink's key services:

| Feature               | Chainlink Module | Description                                                                |
| --------------------- | ---------------- | -------------------------------------------------------------------------- |
| 🎯 Real-time Pricing  | **Data Feeds**   | Retrieves the USDC/USD exchange rate to ensure accurate investment pricing |
| 🔍 Off-chain Access   | **Functions**    | Fetches film valuation and metadata from Supabase to set or update price   |
| ⏱️ Automated Sync     | **Automation**   | Periodically triggers Functions to sync off-chain film prices on-chain     |
| 🌉 Cross-chain Bridge | **CCIP**         | Transfers ERC1155 FilmToken and USDC between Avalanche Fuji and Sepolia    |
| 🎲 Random Draws       | **VRF**          | Generates provably fair randomness to reward investors with VIP NFTs       |

> 🚀 **Chainlink empowers Stream Pass to become a truly composable, decentralized film economy platform.**

---

## 🌟 Key Features

- 🎥 **Onchain Film Assets**: Represent investment shares as ERC1155 tokens, transferable cross-chain.
- 🔐 **Encrypted Video Access**: Combine Lighthouse + Lit Protocol to decrypt videos only for NFT holders.
- 💰 **Onchain Revenue Sharing**: Distribute USDC dividends based on FilmToken ownership ratio.
- 📡 **Automated Off-chain Sync**: Use Chainlink Automation to regularly call Functions and update film valuation from Supabase on-chain.
- 🌉 **Cross-chain Interoperability**: Chainlink CCIP enables seamless transfer of assets across networks.
- 🎁 **Randomized Incentives**: Use Chainlink VRF for provably fair draws to reward investors.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js + TailwindCSS + Arco Design
- **Smart Contracts**: Solidity + Hardhat
- **Web3 Stack**: Chainlink Functions / CCIP / Automation / VRF / Data Feeds
- **Storage & Backend**: Lighthouse + Supabase + Lit Protocol
- **Authentication**: Sign-In with Ethereum (SIWE)
- **Payments & Tokens**: USDC (ERC20) + ERC1155 FilmToken + VIP NFT (ERC721)
