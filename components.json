# ⚡️ StellarPoll: Decentralized On-Chain Voting

A production-ready Web3 application built on the **Stellar Testnet** using **Soroban** smart contracts. This project demonstrates Level 2 (Yellow Belt) requirements for multi-wallet integration, real-time event handling, and transaction tracking.

## 🚀 Live Demo
[Placeholder Link]

## ✨ Key Features
- **Multi-Wallet Integration**: Supports Freighter, xBull, and Albedo via `@creit.tech/stellar-wallets-kit`.
- **Soroban Smart Contract**: A Rust-based contract that handles voting logic, result persistence, and on-chain event emission.
- **Real-Time Synchronicity**: Polling mechanisms to fetch contract state and event logs from Soroban RPC.
- **Transaction Life-cycle Tracking**: Comprehensive UI feedback for pending, success, and failure states with hash links.
- **Modern UI/UX**: SaaS-style interface built with Next.js, TailwindCSS, and Framer Motion.

## 🛠 Tech Stack
- **Frontend**: Next.js 15, React 19, TailwindCSS, Framer Motion
- **Stellar SDK**: `stellar-sdk` (v13+), `@creit.tech/stellar-wallets-kit` (v2+)
- **Smart Contract**: Rust, Soroban SDK
- **Blockchain**: Stellar Testnet (Soroban Engine)

## 📁 Project Structure
```bash
.
├── contracts/
│   └── poll/
│       ├── Cargo.toml
│       └── src/lib.rs        # Smart Contract Logic
├── src/
│   ├── app/                  # Next.js Pages & Layout
│   ├── components/
│   │   ├── wallet/           # Wallet Connection UI
│   │   ├── PollCard.tsx      # Main Voting Logic
│   │   ├── VoteHistory.tsx   # Real-time Event Feed
│   │   └── StatsCard.tsx     # On-chain Analytics
│   ├── context/
│   │   └── StellarContext.tsx # Global Stellar State
│   ├── hooks/
│   │   └── usePoll.ts        # Contract Interaction Hook
│   └── lib/
│       └── stellar.ts        # Configuration & Constants
└── .env.example              # Environment variables template
```

## 🏗 Setup & Deployment

### 1. Prerequisites
- [Node.js](https://nodejs.org/) & [Bun](https://bun.sh/)
- [Stellar Wallet](https://www.stellar.org/wallets) (Freighter recommended)
- [Soroban CLI](https://soroban.stellar.org/docs/getting-started/setup#install-the-soroban-cli) (if deploying the contract)

### 2. Installation
```bash
bun install
```

### 3. Environment Configuration
Copy `.env.example` to `.env` and fill in your contract ID.
```bash
cp .env.example .env
```

### 4. Running Locally
```bash
bun run dev
```

### 5. Contract Deployment (Optional)
```bash
cd contracts/poll
soroban contract build
soroban contract deploy --wasm target/wasm32-unknown-unknown/release/poll.wasm --source <YOUR_SECRET_KEY> --network testnet
```

## 🔐 Error Handling
The application explicitly handles:
- **Wallet Rejection**: Gracefully informs user when a transaction is denied.
- **Insufficient Balance**: Checks for required fees before broadcasting.
- **Network Mismatch**: Ensures the user is on Testnet before interacting.
- **Simulation Errors**: Pre-flight checks on contract calls to prevent fee waste.

## 📝 Submission Checklist Compliance
- ✅ Multi-wallet integration (3+ wallets)
- ✅ Deployed Soroban contract (provided in `contracts/`)
- ✅ Real-time event listening and UI sync
- ✅ Verifiable transaction hash with explorer links
- ✅ Graceful error management & loading states

## 📦 Suggested Commits
1. `feat: implement Soroban poll contract and project scaffolding`
2. `feat: add StellarWalletsKit and context-based wallet state`
3. `feat: build real-time voting UI with transaction tracking`
4. `refactor: optimize event polling and add explorer links`

## 🔗 Transaction & Contract Examples
- **Deployed Contract Address**: `CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABSC4`
- **Example Transaction Hash**: `757e2a9b40f2...` [Testnet Link]
