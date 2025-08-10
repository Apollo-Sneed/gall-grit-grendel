# Gall, Grit, Grendel — The Rational Token Trifecta

Gall (macro), Grit (atomic), and Grendel (reserve) are three ERC-20 tokens designed around the same fixed-ratio structure, allowing for precise value representation and clean whole-unit transactions without fractional dust. Each token serves a distinct role — large-scale transfers, indivisible micropayments, or high-value reserves — while sharing the same mathematical base for consistent, predictable conversions between them.

---

## 🪙 Token Overview

| Token   | Symbol | Total Supply               | Divisibility                     | Purpose                     |
| ------- | ------ | -------------------------- | -------------------------------- | --------------------------- |
| Gall    | GLL    | \~50,000,000,000           | 1 Gall = 230,630,400 grits       | Macro transactions          |
| Grit    | GRIT   | 11,531,520,000,000,000,000 | Indivisible                      | Atomic unit / micropayments |
| Grendel | GRN    | 230,630,400                | 1 Grendel = 50,000,000,000 grits | Reserve-class asset         |

All tokens enforce whole-number logic. No dust. No unpredictable decimals — all units resolve to clean, rational subdivisions. The grit-per-token structure (e.g. 1 Gall = 230,630,400 grits) was chosen specifically to support clean fractions and mixed-number representations in real-world economic use.

---

## 🔒 Vesting & Distribution

| Token   | Vesting Address                                                                             |
| ------- | ------------------------------------------------------------------------------------------- |
| Gall    | [`0x775b0...9C18`](https://etherscan.io/address/0x775b0D5528C2EfCDC418F7CB99193704B80A9C18) |
| Grit    | [`0x4d473...71a`](https://etherscan.io/address/0x4d4734e263654f0a2349438582027b17afc9715a)  |
| Grendel | [`0x60884...81a`](https://etherscan.io/address/0x608843c65bc85c86ed9a75d68bbc08746182d81a)  |

**Initial allocation:**

* **12.5%** retained by the creator (Apollo Sneed) — subject to vesting.
* **87.5%** held in a controlled allocation for future *public sale and liquidity provisioning*.

  * These tokens are **not** owned by the public until sold or otherwise distributed.
  * This allocation will be used to seed decentralized exchange liquidity pools, facilitate market entry, and enable wider participation.
  * LP fees from these pools will be collected by the creator as part of project funding and ecosystem growth.

All allocations are vested linearly over 36 months (in seconds), ensuring a steady and predictable release schedule.

---

## 📜 Verified Contracts

| Token   | Contract Link                                                                          |
| ------- | -------------------------------------------------------------------------------------- |
| Gall    | [0x0758...3f1](https://etherscan.io/token/0x075886c3d6e2f5b1622373fcc3ddf3b8ad34c3f1)  |
| Grit    | [0x63b7...5b89](https://etherscan.io/token/0x63b744ACC4D57f5436194ad5cd976DF5B1251d89) |
| Grendel | [0xc877...92f](https://etherscan.io/token/0xc8777f6d6dbf98b5b60e69fea1b31b82a004792f)  |

---

## 📂 Project Structure

```
contracts/        → All Solidity source files  
scripts/          → Deployment scripts for each token  
.env.example      → Template for local setup  
README.md         → You’re reading it  
```

---

## ⚙️ Tech Stack

* Solidity 0.8.25+
* Hardhat
* Alchemy / Infura (for RPC)
* Ethers.js
* Ethereum Mainnet

---

## 👤 Author

Apollo Sneed — formerly Chuck.

---

## 📜 License

MIT
