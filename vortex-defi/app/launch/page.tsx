"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Rocket,
  ExternalLink,
  Check,
  Copy,
  TrendingUp,
  Users,
  BarChart3,
  Globe,
  Shield,
  Zap,
  ArrowRight,
  Coins,
  Gift,
  Twitter,
  MessageCircle,
} from "lucide-react";
import { formatNumber } from "@/lib/utils";

export default function LaunchPage() {
  const { connected } = useWallet();
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tokenAddress = "VTXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

  return (
    <div className="pt-24 md:pt-28 pb-10 px-4 sm:px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-sm text-green-400">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Token Live on DeAura
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold">
              <span className="gradient-text">VTX Token</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The native utility token powering the Vortex DeFi protocol. Launched via DeAura
              with transparent tokenomics and real protocol utility.
            </p>
          </motion.div>
        </div>

        {/* Token Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Price", value: "$0.85", change: "+12.5%", icon: TrendingUp },
            { label: "Market Cap", value: "$8.5M", change: "+8.2%", icon: BarChart3 },
            { label: "Holders", value: "3,847", change: "+15.3%", icon: Users },
            { label: "24h Volume", value: "$1.2M", change: "+24.1%", icon: Globe },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glow-card p-5 text-center"
              >
                <Icon className="w-5 h-5 text-vortex-400 mx-auto mb-2" />
                <div className="text-xl sm:text-2xl font-bold">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
                <div className="text-xs text-green-400 mt-1">{s.change}</div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Buy on DeAura */}
          <div className="glow-card p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Rocket className="w-5 h-5 text-vortex-400" />
              Buy VTX on DeAura
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              VTX is launched exclusively on DeAura. Purchase directly through the DeAura platform
              for the best price and liquidity.
            </p>

            {/* Token Address */}
            <div className="glass rounded-xl p-4 mb-6">
              <div className="text-xs text-muted-foreground mb-2">Token Contract Address</div>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-sm font-mono text-vortex-400 truncate">
                  {tokenAddress}
                </code>
                <button
                  onClick={() => handleCopy(tokenAddress)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-all shrink-0"
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                </button>
              </div>
            </div>

            <a
              href="https://deaura.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Rocket className="w-5 h-5" /> Buy on DeAura
              <ExternalLink className="w-4 h-4" />
            </a>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener"
                className="btn-secondary flex items-center justify-center gap-2 text-sm"
              >
                <Twitter className="w-4 h-4" /> Twitter
              </a>
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noopener"
                className="btn-secondary flex items-center justify-center gap-2 text-sm"
              >
                <MessageCircle className="w-4 h-4" /> Discord
              </a>
            </div>
          </div>

          {/* Tokenomics */}
          <div className="glow-card p-6">
            <h3 className="text-xl font-semibold mb-6">Tokenomics</h3>
            <div className="space-y-4">
              {[
                { label: "Total Supply", value: "100,000,000 VTX", pct: 100, color: "bg-vortex-500" },
                { label: "Community & Rewards", value: "40,000,000 VTX", pct: 40, color: "bg-green-500" },
                { label: "Liquidity (DeAura)", value: "25,000,000 VTX", pct: 25, color: "bg-blue-500" },
                { label: "Team (2yr vest)", value: "15,000,000 VTX", pct: 15, color: "bg-purple-500" },
                { label: "Treasury", value: "10,000,000 VTX", pct: 10, color: "bg-yellow-500" },
                { label: "Advisors (1yr vest)", value: "5,000,000 VTX", pct: 5, color: "bg-orange-500" },
                { label: "Airdrop", value: "5,000,000 VTX", pct: 5, color: "bg-pink-500" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">{item.label}</span>
                    <span className="text-sm text-muted-foreground">{item.pct}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.pct}%` }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                      className={`h-full rounded-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Token Utility */}
        <div className="mt-8 glow-card p-6 sm:p-8">
          <h3 className="text-xl font-semibold mb-6 text-center">VTX Token Utility</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Gift,
                title: "Revenue Sharing",
                desc: "40% of all protocol fees distributed to VTX stakers proportional to their stake",
                color: "from-green-500/20 to-emerald-500/20",
                iconColor: "text-green-400",
              },
              {
                icon: Zap,
                title: "Yield Boost",
                desc: "Up to 3x multiplier on vault yields based on VTX stake amount and lock duration",
                color: "from-yellow-500/20 to-orange-500/20",
                iconColor: "text-yellow-400",
              },
              {
                icon: Shield,
                title: "Governance",
                desc: "Vote on protocol parameters including fee structures, new vaults, and treasury spending",
                color: "from-vortex-500/20 to-blue-500/20",
                iconColor: "text-vortex-400",
              },
              {
                icon: Coins,
                title: "Fee Discounts",
                desc: "Reduced trading fees on swaps and vault withdrawals based on VTX holdings",
                color: "from-purple-500/20 to-pink-500/20",
                iconColor: "text-purple-400",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="glass rounded-xl p-5">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.color} mb-3`}>
                    <Icon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fee Structure */}
        <div className="mt-8 glow-card p-6 sm:p-8">
          <h3 className="text-xl font-semibold mb-6 text-center">Protocol Fee Structure</h3>
          <div className="max-w-2xl mx-auto">
            <div className="glass rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Action</th>
                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">Fee</th>
                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">Distribution</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { action: "Swap", fee: "0.30%", dist: "LP 60% | Stakers 30% | Treasury 10%" },
                    { action: "Vault Deposit", fee: "0.00%", dist: "No fee" },
                    { action: "Vault Withdrawal", fee: "0.10%", dist: "Stakers 60% | Treasury 40%" },
                    { action: "Performance Fee", fee: "10%", dist: "Stakers 50% | Treasury 50%" },
                  ].map((row) => (
                    <tr key={row.action} className="border-b border-white/5 last:border-0">
                      <td className="p-4 text-sm font-medium">{row.action}</td>
                      <td className="p-4 text-sm text-right">{row.fee}</td>
                      <td className="p-4 text-xs text-right text-muted-foreground">{row.dist}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
