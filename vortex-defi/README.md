# Vortex DeFi — Intelligent Yield Routing & Liquidity Protocol

<p align="center">
  <img src="https://img.shields.io/badge/Solana-Mainnet-blueviolet?style=for-the-badge&logo=solana" />
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
</p>

> **TokenTon26 DeFi Track Submission** — Built for the DeAura Capital Group hackathon ($8,500 prize pool)

---

## Overview

**Vortex DeFi** is a next-generation DeFi protocol on Solana that combines intelligent yield routing, concentrated liquidity pools, automated vault strategies, and flexible staking — all through a seamless, mobile-first interface.

Unlike fragmented DeFi protocols that force users to hop between apps, Vortex unifies every yield-generating primitive into a single, cohesive experience with real-time analytics and one-click execution.

### Why Vortex?

| Problem | Vortex Solution |
|---------|----------------|
| Fragmented DeFi UX across multiple apps | Unified protocol: Swap → Pool → Vault → Stake in one interface |
| Complex yield optimization requiring expertise | Automated vault strategies with risk-adjusted routing |
| Poor mobile experience in DeFi | Mobile-first design with bottom nav, responsive layouts, glassmorphism UI |
| Opaque fee structures | Transparent fee breakdown on every transaction |
| No portfolio visibility | Real-time dashboard with P&L, asset breakdown, and activity history |

---

## Features

### Token Swap
- Instant token swaps with Jupiter-grade routing
- Configurable slippage tolerance (0.1% – 5%)
- Real-time price impact estimation
- Token search and selection with price data
- Transaction preview with fee breakdown

### Liquidity Pools
- Concentrated liquidity AMM pools
- Desktop table view + mobile card view
- Sort by TVL, APR, Volume, or Fees
- Add/remove liquidity with proportional token inputs
- Real-time pool analytics

### Yield Vaults
- Automated yield strategies (delta-neutral, lending optimization, LP compounding)
- Risk-level filtering (Low / Medium / High)
- Deposit and withdraw with real-time earnings tracking
- Strategy descriptions and risk disclosures
- Auto-compounding rewards

### VTX Staking
- 5 lock tiers: Flexible, 30 days, 90 days, 180 days, 1 Year
- Multiplier-based reward system (1x – 3x)
- Stake/Unstake with position tracking
- Governance rights for stakers
- Fee-sharing from protocol revenue

### Portfolio Dashboard
- Total portfolio value with 24h change
- Asset allocation breakdown
- Performance chart with time filters
- Recent transaction activity
- Wallet-gated access

### VTX Token Launch
- Launch via DeAura Capital platform
- Tokenomics visualization (supply distribution)
- Token utility breakdown
- Live buy integration

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript 5.3 |
| **Styling** | Tailwind CSS 3.4 + custom theme |
| **Animations** | Framer Motion 10 |
| **Blockchain** | Solana (web3.js + Wallet Adapter) |
| **Wallets** | Phantom, Solflare |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Utilities** | clsx, tailwind-merge, class-variance-authority |

---

## Architecture

```
vortex-defi/
├── app/
│   ├── layout.tsx          # Root layout, providers, metadata
│   ├── providers.tsx       # Solana wallet adapter + connection context
│   ├── globals.css         # Tailwind directives + custom utilities
│   ├── page.tsx            # Landing page (hero, stats, features, CTA)
│   ├── swap/page.tsx       # Token swap interface
│   ├── pools/page.tsx      # Liquidity pool explorer + add liquidity
│   ├── vaults/page.tsx     # Yield vault strategies
│   ├── stake/page.tsx      # VTX staking with lock tiers
│   ├── dashboard/page.tsx  # Portfolio dashboard (wallet-gated)
│   └── launch/page.tsx     # VTX token launch with DeAura
├── components/
│   └── layout/
│       ├── Navbar.tsx      # Responsive navbar with wallet button
│       ├── MobileNav.tsx   # Bottom navigation for mobile
│       └── Footer.tsx      # Site footer
├── lib/
│   ├── constants.ts        # Type interfaces + mock data
│   └── utils.ts            # Utility functions (cn, formatNumber, etc.)
├── tailwind.config.ts      # Extended theme (vortex colors, animations)
├── next.config.js          # Next.js configuration
└── tsconfig.json           # TypeScript configuration
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- A Solana wallet (Phantom or Solflare)

### Installation

```bash
# Clone the repository
git clone https://github.com/edoh-Onuh/blueshift-platform.git
cd blueshift-platform/vortex-defi

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## VTX Token

**VTX** is the native governance and utility token of Vortex DeFi.

### Tokenomics

| Allocation | Percentage |
|-----------|-----------|
| Liquidity & Ecosystem | 40% |
| Team & Advisors (vested) | 15% |
| Community & Rewards | 25% |
| Treasury & Development | 15% |
| Initial DEX Offering | 5% |

### Token Utility

- **Governance**: Vote on protocol proposals and parameter changes
- **Fee Discounts**: Reduced swap and vault fees for VTX holders
- **Staking Rewards**: Earn protocol revenue share through staking
- **Vault Boosts**: Enhanced APY on vault deposits for VTX stakers
- **Priority Access**: Early access to new strategies and features

### Launch

VTX will be launched via **DeAura Capital** platform. Visit the Launch page in the app for direct buy access.

---

## Design Philosophy

### Visual Language
- **Glassmorphism**: Frosted glass cards with backdrop blur for depth
- **Gradient accents**: Blue-to-purple gradient text and borders for brand identity
- **Neon highlights**: Strategic neon accents for interactive elements
- **Dark-first**: Designed for dark mode with carefully tuned contrast ratios

### UX Principles
- **Mobile-first**: Every screen designed for mobile, then adapted for desktop
- **Progressive disclosure**: Complex data revealed through expandable sections
- **Immediate feedback**: Hover states, loading indicators, and transition animations
- **Wallet-aware**: UI adapts based on wallet connection state

---

## Security Considerations

- Client-side wallet interactions only (no private key exposure)
- Slippage protection on all swaps
- Risk level disclosures on vault strategies
- Wallet-gated portfolio data (no data leakage)
- CSP-compatible design patterns

---

## Roadmap

| Phase | Milestone |
|-------|----------|
| **Phase 1** (Current) | MVP frontend, VTX token launch via DeAura |
| **Phase 2** | On-chain Anchor programs (AMM, Vault, Staking) |
| **Phase 3** | Jupiter integration for swap routing |
| **Phase 4** | Cross-chain yield aggregation |
| **Phase 5** | DAO governance with VTX voting |

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

## Links

- **GitHub**: [github.com/edoh-Onuh/blueshift-platform](https://github.com/edoh-Onuh/blueshift-platform)
- **DeAura Capital**: Token launch partner
- **Solana**: [solana.com](https://solana.com)

---

<p align="center">
  Built with <strong>Vortex DeFi</strong> — Intelligent DeFi on Solana 🌀
</p>
