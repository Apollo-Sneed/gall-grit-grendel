## # Gall, Grit, Grendel — The Rational Token Trifecta

Gall (macro), Grit (atomic), and Grendel (reserve) are three ERC-20 tokens designed around the same fixed-ratio structure, allowing for precise value representation and clean whole-unit transactions without fractional dust. Each token serves a distinct role — large-scale transfers, indivisible micropayments, or high-value reserves — while sharing the same mathematical base for consistent, predictable conversions from token-to-token. 

---

## 🪙 Token Overview

| Token   | Symbol | Total Supply               | Divisibility                      | Purpose                     |
| ------- | ------ | -------------------------- | --------------------------------- | --------------------------- |
| Gall    | GLL    | \~50,000,000,000           | 1 Gall = 230,630,400 grits        | Macro transactions          |
| Grit    | GRIT   | 11,531,520,000,000,000,000 | Indivisible                       | Atomic unit / micropayments |
| Grendel | GDL    | 115,315,200                | 1 Grendel = 100,000,000,000 grits | Reserve-class asset         |

All tokens enforce whole-number logic. No dust. No unpredictable decimals — all units resolve to clean, rational subdivisions. The grit-per-token structure (e.g. 1 Gall = 230,630,400 grits) was chosen specifically to support clean fractions and mixed-number representations in real-world economic use.

---

## 🔒 Vesting & Distribution

| Token   | Vesting Address                                                                             |
| ------- | ------------------------------------------------------------------------------------------- |
| Gall    | [`0x775b0...9C18`](https://etherscan.io/address/0x775b0D5528C2EfCDC418F7CB99193704B80A9C18) |
| Grit    | [`0x4d473...71a`](https://etherscan.io/address/0x4d4734e263654f0a2349438582027b17afc9715a)  |
| Grendel | [`0x0F20A...b105`](https://etherscan.io/address/0x0F20A36211daA4E9621842C89795578284bBb105) |

**Initial allocation:**

* **12.5%** reserved as the creator’s personal allocation — subject to vesting.
* **87.5%** held in a controlled allocation for future *public sale and liquidity provisioning*.

  * These tokens are **not** owned by the public until sold or otherwise distributed.
  * This allocation will be used to seed decentralized exchange liquidity pools, facilitate market entry, and enable wider participation.
  * LP fees from these pools will be collected by the creator as part of project funding and ecosystem growth.

All allocations are vested linearly over 36 months (in seconds), ensuring a steady and predictable release schedule. Grendel’s vesting was aligned with Gall’s original vesting start time for continuity.

---

## 📜 Verified Contracts

| Token   | Contract Link                                                                          |
| ------- | -------------------------------------------------------------------------------------- |
| Gall    | [0x0758...3f1](https://etherscan.io/token/0x075886c3d6e2f5b1622373fcc3ddf3b8ad34c3f1)  |
| Grit    | [0x63b7...5b89](https://etherscan.io/token/0x63b744ACC4D57f5436194ad5cd976DF5B1251d89) |
| Grendel | [0x1888...705e](https://etherscan.io/token/0x188864dCE30F798f7eaa0c51996B44051d77705e) |

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

## 📖 Project History

Grendel was originally launched as **GRN** with a total supply of 230,630,400 tokens and a minimum unit of 20,000,000 wei. While functional, this configuration blurred too closely with Gall’s role — it behaved more like a larger denomination rather than a distinct reserve asset. To resolve this, Grendel was relaunched as **GDL** with halved supply (115,315,200) and a 10,000,000 wei minimum unit, giving it 100 billion subdivisions and enabling cleaner decimals. This established GDL as a true reserve-class instrument, clearly separated from Gall in both supply and psychological bracket.

---

## 📊 GRN vs GDL Comparison

| Feature      | GRN (Old Grendel)                   | GDL (New Grendel)                      |
| ------------ | ----------------------------------- | -------------------------------------- |
| Supply       | 230,630,400                         | 115,315,200 (≈ 50% reduction)          |
| Minimum Unit | 20,000,000 wei (even-only decimals) | 10,000,000 wei (full 11 decimals)      |
| Subdivisions | 50 billion                          | 100 billion                            |
| Ticker       | GRN                                 | GDL                                    |
| Position     | Worked as an oversized Gall variant | Established as a separate reserve tier |

---

## ⚙️ Technical Notes

* **Gall grit denomination**
  Each Gall grit equals **4,335,941,836 wei**. Because of this, exact balances like “1.000000000000000000 Gall” don’t exist on-chain. Instead, all balances are in multiples of whole grits.

* **Fractional displays**
  Wallets and explorers may render balances in decimal Gall that look “irrational” (long decimals, repeating digits). This is expected. The system was intentionally optimized so balances can be cleanly displayed as **fractions or mixed numbers**, rather than forcing arbitrary decimals or producing dust.

* **Result**
  Your Gall balances are always in whole-number grits under the hood, but may appear as unusual decimals when viewed in Gall terms — most commonly when checking balances on Etherscan. This design ensures ledgers remain precise and predictable, while still allowing flexible fractional displays for end users.

**Example:** When displayed in decimal Gall terms, balances may show extended decimals such as *1.000000000013414400 GLL* instead of a perfectly round 1. This is a natural consequence of the wei-to-grit ratio and is most noticeable on explorers like Etherscan. It does not affect precision — all balances remain whole-number grits under the hood.

---

## 👤 Author

Apollo Sneed — formerly Chuck.

---

## 📜 License

MIT
