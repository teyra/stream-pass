# Stream Pass 🎬🔗

Write your passion on the blockchain, let the story travel far.

## 📖 项目简介

**Stream Pass（影流）** 是一个链上影视众筹与内容访问平台，结合 NFT、稳定币与加密存储，帮助创作者融资作品、控制内容访问权限，并将回报分发给粉丝。我们通过 Chainlink 提供的核心 Web3 基础设施，实现数据接入、跨链同步、自动执行与随机抽奖等功能。

---

## 🔗 Chainlink 模块集成

Stream Pass 深度集成了 Chainlink 的五大核心产品：

| 功能            | 模块           | 使用说明                                                           |
| --------------- | -------------- | ------------------------------------------------------------------ |
| 🎯 实时资产估值 | **Data Feeds** | 获取 USDC/USD 汇率，保证投资金额换算准确、可信                     |
| 🔍 外部数据访问 | **Functions**  | 从 Supabase 获取影片估值与链下信息，用于设定或更新投资价格         |
| ⏱️ 自动数据同步 | **Automation** | 定期调用 Functions 将链下 Supabase 中的影片价格同步到链上合约      |
| 🌉 跨链通信     | **CCIP**       | 将 ERC1155 FilmToken 和 USDC 在 Avalanche Fuji 与 Sepolia 之间同步 |
| 🎲 随机抽奖     | **VRF**        | 给 FilmToken 投资人进行随机 NFT 抽奖（奖励 VIP Access NFT 等）     |

> 🚀 **Chainlink 的模块帮助 Stream Pass 成为一个真正的可组合、去中心化影视经济平台**

---

## 🌟 核心亮点

- 🎥 **影视资产上链**：基于 ERC1155 表征投资份额，Token 可跨链传输。
- 🔐 **加密内容访问**：结合 Lighthouse + Lit Protocol，基于 NFT 持有状态解密视频。
- 💰 **链上分红机制**：基于 FilmToken 占比，分配稳定币 USDC。
- 📡 **自动同步链下估值**：通过 Chainlink Automation 定时调用 Functions，获取 Supabase 中的最新影片估值并更新至链上合约字段。
- 🌉 **支持跨链同步**：Chainlink CCIP 实现不同网络间的资产与数据转移。
- 🎁 **随机奖励机制**：Chainlink VRF 提供可验证随机性，为投资者提供额外激励。

---

## 🛠️ 技术栈

- **前端**：Next.js + TailwindCSS + Arco Design
- **链上合约**：Solidity + Hardhat
- **Web3 工具**：Chainlink Functions / CCIP / Automation / VRF / Data Feeds
- **存储平台**：Lighthouse + Supabase + Lit Protocol
- **身份认证**：Sign-In with Ethereum (SIWE)
- **支付系统**：USDC (ERC20) + ERC1155 FilmToken + VIP NFT (ERC721)
