"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  LayoutDashboard,
  Wallet,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import { formatNumber, shortenAddress } from "@/lib/utils";

// Mock portfolio data
const portfolioAssets = [
  { symbol: "SOL", name: "Solana", balance: 24.5, value: 4371.29, change: 3.24, allocation: 42 },
  { symbol: "VTX", name: "Vortex", balance: 5420, value: 4607.0, change: 12.5, allocation: 44 },
  { symbol: "USDC", name: "USD Coin", balance: 845.32, value: 845.32, change: 0.01, allocation: 8 },
  { symbol: "BONK", name: "Bonk", balance: 12_500_000, value: 292.5, change: -2.15, allocation: 3 },
  { symbol: "JUP", name: "Jupiter", balance: 280, value: 313.6, change: 5.3, allocation: 3 },
];

const recentActivity = [
  { type: "Swap", details: "1.5 SOL → 267.63 USDC", time: "2 min ago", status: "success" },
  { type: "Stake", details: "2,500 VTX staked (90 days)", time: "1 hour ago", status: "success" },
  { type: "Deposit", details: "5.0 SOL into SOL Maximizer Vault", time: "3 hours ago", status: "success" },
  { type: "Add LP", details: "500 USDC to VTX-USDC pool", time: "1 day ago", status: "success" },
  { type: "Claim", details: "42.85 VTX rewards claimed", time: "2 days ago", status: "success" },
  { type: "Swap", details: "100 USDC → 117.5 VTX", time: "3 days ago", status: "success" },
];

const chartData = [
  { day: "Mon", value: 9200 },
  { day: "Tue", value: 9450 },
  { day: "Wed", value: 9100 },
  { day: "Thu", value: 9800 },
  { day: "Fri", value: 10100 },
  { day: "Sat", value: 10350 },
  { day: "Sun", value: 10429 },
];

export default function DashboardPage() {
  const { connected, publicKey } = useWallet();
  const [timeRange, setTimeRange] = useState<"1D" | "1W" | "1M" | "ALL">("1W");

  const totalValue = portfolioAssets.reduce((s, a) => s + a.value, 0);
  const totalChange = 5.82;

  if (!connected) {
    return (
      <div className="pt-24 md:pt-28 pb-10 px-4 sm:px-6 min-h-screen flex items-center justify-center">
        <div className="text-center glow-card p-12 max-w-md">
          <Wallet className="w-16 h-16 text-vortex-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-muted-foreground mb-6">
            Connect your Solana wallet to view your portfolio, positions, and activity.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-28 pb-10 px-4 sm:px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              {publicKey ? shortenAddress(publicKey.toString()) : "Connected"}
            </p>
          </div>
          <button className="btn-secondary flex items-center gap-2 text-sm">
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
        </div>

        {/* Portfolio Value */}
        <div className="glow-card p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Total Portfolio Value</div>
              <div className="text-4xl sm:text-5xl font-bold">{formatNumber(totalValue, { prefix: "$" })}</div>
              <div className="flex items-center gap-2 mt-2">
                <span className={`flex items-center gap-1 text-sm font-medium ${totalChange >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {totalChange >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {totalChange >= 0 ? "+" : ""}{totalChange}%
                </span>
                <span className="text-xs text-muted-foreground">this week</span>
              </div>
            </div>
            <div className="flex gap-1 p-1 rounded-xl glass">
              {(["1D", "1W", "1M", "ALL"] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    timeRange === range
                      ? "bg-vortex-500/20 text-vortex-400"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Simple Chart */}
          <div className="h-40 flex items-end gap-2 px-2">
            {chartData.map((d, i) => {
              const maxVal = Math.max(...chartData.map((x) => x.value));
              const minVal = Math.min(...chartData.map((x) => x.value));
              const height = ((d.value - minVal) / (maxVal - minVal)) * 100 + 20;
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="w-full rounded-t-lg bg-gradient-to-t from-vortex-600 to-vortex-400 min-h-[20px] relative group cursor-pointer"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-background/90 backdrop-blur-sm border border-white/10 rounded-lg px-2 py-1 text-xs font-medium whitespace-nowrap">
                      ${formatNumber(d.value, { decimals: 0 })}
                    </div>
                  </motion.div>
                  <span className="text-xs text-muted-foreground">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Assets */}
          <div className="lg:col-span-2">
            <div className="glow-card overflow-hidden">
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-vortex-400" /> Assets
                </h3>
                <span className="text-sm text-muted-foreground">{portfolioAssets.length} tokens</span>
              </div>

              {/* Desktop Table */}
              <div className="hidden sm:block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left p-3 text-xs font-medium text-muted-foreground">Asset</th>
                      <th className="text-right p-3 text-xs font-medium text-muted-foreground">Balance</th>
                      <th className="text-right p-3 text-xs font-medium text-muted-foreground">Value</th>
                      <th className="text-right p-3 text-xs font-medium text-muted-foreground">24h</th>
                      <th className="text-right p-3 text-xs font-medium text-muted-foreground">Allocation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolioAssets.map((asset, i) => (
                      <motion.tr
                        key={asset.symbol}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
                      >
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-vortex-500 to-neon-blue flex items-center justify-center text-xs font-bold">
                              {asset.symbol[0]}
                            </div>
                            <div>
                              <div className="font-medium text-sm">{asset.symbol}</div>
                              <div className="text-xs text-muted-foreground">{asset.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-right text-sm">{formatNumber(asset.balance, { decimals: asset.balance > 1000 ? 0 : 2 })}</td>
                        <td className="p-3 text-right text-sm font-medium">{formatNumber(asset.value, { prefix: "$" })}</td>
                        <td className="p-3 text-right">
                          <span className={`text-sm ${asset.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                            {asset.change >= 0 ? "+" : ""}{asset.change}%
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-16 h-1.5 rounded-full bg-white/5">
                              <div
                                className="h-full rounded-full bg-vortex-500"
                                style={{ width: `${asset.allocation}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground w-8">{asset.allocation}%</span>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="sm:hidden p-3 space-y-2">
                {portfolioAssets.map((asset) => (
                  <div key={asset.symbol} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-vortex-500 to-neon-blue flex items-center justify-center text-xs font-bold">
                        {asset.symbol[0]}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{asset.symbol}</div>
                        <div className="text-xs text-muted-foreground">{formatNumber(asset.balance, { decimals: asset.balance > 1000 ? 0 : 2 })}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{formatNumber(asset.value, { prefix: "$" })}</div>
                      <div className={`text-xs ${asset.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                        {asset.change >= 0 ? "+" : ""}{asset.change}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activity */}
          <div>
            <div className="glow-card overflow-hidden">
              <div className="p-4 border-b border-white/5">
                <h3 className="font-semibold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-vortex-400" /> Recent Activity
                </h3>
              </div>
              <div className="p-3 space-y-1 max-h-[500px] overflow-y-auto scrollbar-hide">
                {recentActivity.map((activity, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.02] transition-colors cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0 mt-0.5">
                      <ArrowUpRight className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{activity.type}</div>
                      <div className="text-xs text-muted-foreground truncate">{activity.details}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{activity.time}</div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-1" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* DeFi Positions Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          {[
            { title: "Liquidity Positions", value: "$2,450.00", subtitle: "2 active pools", color: "text-blue-400" },
            { title: "Vault Deposits", value: "$892.45", subtitle: "1 active vault", color: "text-purple-400" },
            { title: "Staked VTX", value: "$2,125.00", subtitle: "2,500 VTX locked", color: "text-green-400" },
          ].map((pos) => (
            <div key={pos.title} className="glow-card p-5">
              <div className="text-sm text-muted-foreground mb-1">{pos.title}</div>
              <div className={`text-2xl font-bold ${pos.color}`}>{pos.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{pos.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
