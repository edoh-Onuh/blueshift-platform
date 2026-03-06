"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Droplets,
  TrendingUp,
  Search,
  Plus,
  ArrowUpRight,
  Filter,
  BarChart3,
  Info,
} from "lucide-react";
import { POOLS, type Pool } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";

type SortKey = "tvl" | "apr" | "volume24h" | "fees24h";

export default function PoolsPage() {
  const { connected } = useWallet();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("tvl");
  const [selectedPool, setSelectedPool] = useState<Pool | null>(null);
  const [addAmount, setAddAmount] = useState("");
  const [showAddLiquidity, setShowAddLiquidity] = useState(false);

  const filtered = POOLS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => (b[sortBy] as number) - (a[sortBy] as number));

  const totalTvl = POOLS.reduce((s, p) => s + p.tvl, 0);
  const totalVolume = POOLS.reduce((s, p) => s + p.volume24h, 0);
  const totalFees = POOLS.reduce((s, p) => s + p.fees24h, 0);

  return (
    <div className="pt-24 md:pt-28 pb-10 px-4 sm:px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Liquidity Pools</h1>
          <p className="text-muted-foreground">
            Provide liquidity, earn trading fees, and power the Vortex ecosystem.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Liquidity", value: formatNumber(totalTvl, { prefix: "$", compact: true }), icon: Droplets, color: "text-blue-400" },
            { label: "24h Volume", value: formatNumber(totalVolume, { prefix: "$", compact: true }), icon: BarChart3, color: "text-green-400" },
            { label: "24h Fees", value: formatNumber(totalFees, { prefix: "$", compact: true }), icon: TrendingUp, color: "text-purple-400" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="glow-card p-5">
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`w-4 h-4 ${s.color}`} />
                  <span className="text-sm text-muted-foreground">{s.label}</span>
                </div>
                <div className="text-2xl font-bold">{s.value}</div>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search pools..."
              className="input-field pl-10"
            />
          </div>
          <div className="flex gap-2">
            {(["tvl", "apr", "volume24h", "fees24h"] as SortKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setSortBy(key)}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  sortBy === key
                    ? "bg-vortex-500/20 text-vortex-400 border border-vortex-500/30"
                    : "glass hover:bg-white/10"
                }`}
              >
                {key === "tvl" ? "TVL" : key === "apr" ? "APR" : key === "volume24h" ? "Volume" : "Fees"}
              </button>
            ))}
          </div>
        </div>

        {/* Pools Table (desktop) */}
        <div className="hidden md:block glow-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Pool</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">TVL</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">APR</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">24h Volume</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">24h Fees</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((pool, i) => (
                <motion.tr
                  key={pool.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-vortex-500 to-neon-blue flex items-center justify-center text-xs font-bold border-2 border-background z-10">
                          {pool.tokenA.symbol[0]}
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center text-xs font-bold border-2 border-background">
                          {pool.tokenB.symbol[0]}
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold">{pool.name}</div>
                        <div className="text-xs text-muted-foreground">0.3% fee</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-right font-medium">
                    {formatNumber(pool.tvl, { prefix: "$", compact: true })}
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-green-400 font-semibold">{pool.apr.toFixed(1)}%</span>
                  </td>
                  <td className="p-4 text-right">
                    {formatNumber(pool.volume24h, { prefix: "$", compact: true })}
                  </td>
                  <td className="p-4 text-right">
                    {formatNumber(pool.fees24h, { prefix: "$", compact: true })}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedPool(pool);
                        setShowAddLiquidity(true);
                      }}
                      className="px-4 py-2 rounded-xl text-sm font-medium bg-vortex-500/10 text-vortex-400 hover:bg-vortex-500/20 transition-all inline-flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pools Cards (mobile) */}
        <div className="md:hidden space-y-3">
          {filtered.map((pool, i) => (
            <motion.div
              key={pool.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glow-card p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-vortex-500 to-neon-blue flex items-center justify-center text-xs font-bold border-2 border-background z-10">
                      {pool.tokenA.symbol[0]}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center text-xs font-bold border-2 border-background">
                      {pool.tokenB.symbol[0]}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold">{pool.name}</div>
                    <div className="text-xs text-muted-foreground">0.3% fee</div>
                  </div>
                </div>
                <span className="text-green-400 font-bold text-lg">{pool.apr.toFixed(1)}%</span>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div>
                  <div className="text-xs text-muted-foreground">TVL</div>
                  <div className="text-sm font-medium">{formatNumber(pool.tvl, { prefix: "$", compact: true })}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Volume</div>
                  <div className="text-sm font-medium">{formatNumber(pool.volume24h, { prefix: "$", compact: true })}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Fees</div>
                  <div className="text-sm font-medium">{formatNumber(pool.fees24h, { prefix: "$", compact: true })}</div>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedPool(pool);
                  setShowAddLiquidity(true);
                }}
                className="w-full py-2.5 rounded-xl text-sm font-medium bg-vortex-500/10 text-vortex-400 hover:bg-vortex-500/20 transition-all flex items-center justify-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add Liquidity
              </button>
            </motion.div>
          ))}
        </div>

        {/* Add Liquidity Modal */}
        {showAddLiquidity && selectedPool && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowAddLiquidity(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md glow-card p-6"
            >
              <h3 className="text-lg font-semibold mb-1">Add Liquidity</h3>
              <p className="text-sm text-muted-foreground mb-6">{selectedPool.name} Pool</p>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/[0.02]">
                  <div className="flex justify-between mb-2 text-sm text-muted-foreground">
                    <span>{selectedPool.tokenA.symbol}</span>
                    <span>Balance: 12.45</span>
                  </div>
                  <input
                    type="number"
                    value={addAmount}
                    onChange={(e) => setAddAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-transparent text-2xl font-semibold outline-none placeholder:text-muted-foreground/30"
                  />
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02]">
                  <div className="flex justify-between mb-2 text-sm text-muted-foreground">
                    <span>{selectedPool.tokenB.symbol}</span>
                    <span>Balance: 1,245.00</span>
                  </div>
                  <input
                    type="text"
                    value={addAmount ? (parseFloat(addAmount) * (selectedPool.tokenA.price || 0) / (selectedPool.tokenB.price || 1)).toFixed(2) : ""}
                    readOnly
                    placeholder="0.00"
                    className="w-full bg-transparent text-2xl font-semibold outline-none placeholder:text-muted-foreground/30 cursor-default"
                  />
                </div>

                <div className="glass rounded-xl p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pool Share</span>
                    <span>&lt; 0.01%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">APR</span>
                    <span className="text-green-400">{selectedPool.apr.toFixed(1)}%</span>
                  </div>
                </div>

                <button
                  disabled={!connected || !addAmount}
                  className={`w-full py-3.5 rounded-xl font-semibold transition-all ${
                    connected && addAmount ? "btn-primary" : "glass text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  {!connected ? "Connect Wallet" : !addAmount ? "Enter Amount" : "Add Liquidity"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
