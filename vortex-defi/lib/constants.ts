export interface Token {
  symbol: string;
  name: string;
  mint: string;
  decimals: number;
  logoURI: string;
  price?: number;
  change24h?: number;
}

export interface Pool {
  id: string;
  name: string;
  tokenA: Token;
  tokenB: Token;
  tvl: number;
  apr: number;
  volume24h: number;
  fees24h: number;
  yourLiquidity?: number;
}

export interface VaultData {
  id: string;
  name: string;
  strategy: string;
  token: Token;
  tvl: number;
  apy: number;
  riskLevel: "low" | "medium" | "high";
  deposited?: number;
  earned?: number;
  description: string;
}

export interface StakeInfo {
  totalStaked: number;
  stakedAmount: number;
  pendingRewards: number;
  apr: number;
  lockDuration: number;
  multiplier: number;
}

// Mock token data
export const TOKENS: Token[] = [
  {
    symbol: "SOL",
    name: "Solana",
    mint: "So11111111111111111111111111111111111111112",
    decimals: 9,
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
    price: 178.42,
    change24h: 3.24,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    decimals: 6,
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
    price: 1.0,
    change24h: 0.01,
  },
  {
    symbol: "VTX",
    name: "Vortex",
    mint: "VTXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    decimals: 9,
    logoURI: "",
    price: 0.85,
    change24h: 12.5,
  },
  {
    symbol: "BONK",
    name: "Bonk",
    mint: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    decimals: 5,
    logoURI: "https://arweave.net/hQiPZOsRZXGXBJd_82PhVdlM_hACsT_q6wqwf5cSY7I",
    price: 0.0000234,
    change24h: -2.15,
  },
  {
    symbol: "JUP",
    name: "Jupiter",
    mint: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    decimals: 6,
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN/logo.png",
    price: 1.12,
    change24h: 5.3,
  },
  {
    symbol: "RAY",
    name: "Raydium",
    mint: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
    decimals: 6,
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png",
    price: 2.85,
    change24h: 1.8,
  },
];

export const POOLS: Pool[] = [
  {
    id: "sol-usdc",
    name: "SOL-USDC",
    tokenA: TOKENS[0],
    tokenB: TOKENS[1],
    tvl: 45_200_000,
    apr: 24.5,
    volume24h: 12_800_000,
    fees24h: 38_400,
  },
  {
    id: "vtx-sol",
    name: "VTX-SOL",
    tokenA: TOKENS[2],
    tokenB: TOKENS[0],
    tvl: 8_750_000,
    apr: 85.2,
    volume24h: 3_200_000,
    fees24h: 9_600,
  },
  {
    id: "vtx-usdc",
    name: "VTX-USDC",
    tokenA: TOKENS[2],
    tokenB: TOKENS[1],
    tvl: 6_300_000,
    apr: 62.8,
    volume24h: 2_100_000,
    fees24h: 6_300,
  },
  {
    id: "sol-bonk",
    name: "SOL-BONK",
    tokenA: TOKENS[0],
    tokenB: TOKENS[3],
    tvl: 15_400_000,
    apr: 42.3,
    volume24h: 8_500_000,
    fees24h: 25_500,
  },
  {
    id: "jup-usdc",
    name: "JUP-USDC",
    tokenA: TOKENS[4],
    tokenB: TOKENS[1],
    tvl: 22_100_000,
    apr: 18.7,
    volume24h: 5_600_000,
    fees24h: 16_800,
  },
  {
    id: "ray-sol",
    name: "RAY-SOL",
    tokenA: TOKENS[5],
    tokenB: TOKENS[0],
    tvl: 11_800_000,
    apr: 31.5,
    volume24h: 4_200_000,
    fees24h: 12_600,
  },
];

export const VAULTS: VaultData[] = [
  {
    id: "stable-yield",
    name: "Stable Yield Optimizer",
    strategy: "Auto-compound USDC lending across top protocols",
    token: TOKENS[1],
    tvl: 18_500_000,
    apy: 12.8,
    riskLevel: "low",
    description:
      "Automatically routes USDC to the highest-yielding lending protocols on Solana. Compounds rewards daily for maximum returns with minimal risk.",
  },
  {
    id: "sol-maximizer",
    name: "SOL Maximizer",
    strategy: "Liquid staking + DeFi yield aggregation",
    token: TOKENS[0],
    tvl: 32_100_000,
    apy: 18.4,
    riskLevel: "medium",
    description:
      "Stakes SOL across liquid staking providers and deploys LST positions into optimized yield strategies. Higher returns with moderate risk.",
  },
  {
    id: "vtx-power",
    name: "VTX Power Vault",
    strategy: "Protocol revenue + LP farming",
    token: TOKENS[2],
    tvl: 5_200_000,
    apy: 145.0,
    riskLevel: "high",
    description:
      "Stakes VTX to earn protocol fees and bonus LP rewards. High APY driven by protocol revenue sharing and early adoption incentives.",
  },
  {
    id: "delta-neutral",
    name: "Delta Neutral",
    strategy: "Hedged LP positions across AMMs",
    token: TOKENS[1],
    tvl: 9_800_000,
    apy: 22.5,
    riskLevel: "low",
    description:
      "Maintains market-neutral positions by hedging impermanent loss exposure. Captures trading fees while minimizing directional risk.",
  },
];

export const PROTOCOL_STATS = {
  tvl: 156_800_000,
  volume24h: 42_300_000,
  totalUsers: 18_420,
  totalVaults: 12,
  avgApy: 28.4,
  fees24h: 126_900,
};
