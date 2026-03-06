"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Zap,
  TrendingUp,
  Layers,
  Lock,
  BarChart3,
  Rocket,
  ArrowLeftRight,
  Droplets,
  Vault,
  Coins,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { PROTOCOL_STATS } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stats = [
  { label: "Total Value Locked", value: formatNumber(PROTOCOL_STATS.tvl, { prefix: "$", compact: true }), icon: Lock },
  { label: "24h Volume", value: formatNumber(PROTOCOL_STATS.volume24h, { prefix: "$", compact: true }), icon: BarChart3 },
  { label: "Total Users", value: formatNumber(PROTOCOL_STATS.totalUsers, { compact: true, decimals: 0 }), icon: Layers },
  { label: "Avg APY", value: `${PROTOCOL_STATS.avgApy}%`, icon: TrendingUp },
];

const features = [
  {
    icon: Zap,
    title: "Smart Yield Routing",
    desc: "Algorithms continuously scan and route your assets to the highest-yielding opportunities across Solana DeFi protocols.",
    color: "from-yellow-500/20 to-orange-500/20",
    iconColor: "text-yellow-400",
  },
  {
    icon: Shield,
    title: "Risk-Adjusted Returns",
    desc: "Every vault is rated by risk level with transparent strategy details. Choose your risk tolerance, we optimize the rest.",
    color: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
  },
  {
    icon: Layers,
    title: "Protocol-Owned Liquidity",
    desc: "Sustainable liquidity through bonding mechanisms. No mercenary capital. Deep, permanent liquidity for all pairs.",
    color: "from-vortex-500/20 to-blue-500/20",
    iconColor: "text-vortex-400",
  },
  {
    icon: TrendingUp,
    title: "Dynamic Fee Optimization",
    desc: "Fees adjust based on market volatility and utilization. Higher returns during high-activity periods, lower costs when quiet.",
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
  },
];

const products = [
  {
    icon: ArrowLeftRight,
    title: "Swap",
    desc: "Instant token swaps with best-price routing across all Solana DEXes.",
    href: "/swap",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: Droplets,
    title: "Liquidity Pools",
    desc: "Provide liquidity and earn trading fees with concentrated positions.",
    href: "/pools",
    color: "from-emerald-500 to-green-400",
  },
  {
    icon: Vault,
    title: "Yield Vaults",
    desc: "Auto-compounding strategies that maximize your yield effortlessly.",
    href: "/vaults",
    color: "from-purple-500 to-pink-400",
  },
  {
    icon: Coins,
    title: "Staking",
    desc: "Stake VTX to earn protocol revenue and governance power.",
    href: "/stake",
    color: "from-orange-500 to-yellow-400",
  },
];

export default function HomePage() {
  return (
    <div className="relative">
      {/* ── Hero Section ─────────────────────────────────────────── */}
      <section className="relative pt-28 md:pt-36 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Animated orbs */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-vortex-500/10 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-neon-blue/8 rounded-full blur-[120px] animate-float" style={{ animationDelay: "3s" }} />

        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm">
              <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
              <span className="text-muted-foreground">Live on Solana Mainnet</span>
              <span className="text-vortex-400 font-medium flex items-center gap-1">
                Powered by DeAura <ExternalLink className="w-3 h-3" />
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]"
            >
              <span className="block">Intelligent</span>
              <span className="gradient-text">Yield & Liquidity</span>
              <span className="block">on Solana</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Smart yield routing, dynamic AMM, and protocol-owned liquidity.
              Swap, provide liquidity, stake, and earn optimized yields — all in one protocol.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Link href="/swap" className="btn-primary flex items-center gap-2 text-lg px-8 py-4">
                Launch App <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/vaults" className="btn-secondary flex items-center gap-2 text-lg px-8 py-4">
                Explore Vaults <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="glow-card p-5 text-center">
                  <Icon className="w-5 h-5 text-vortex-400 mx-auto mb-2" />
                  <div className="text-2xl sm:text-3xl font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Features Section ───────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why <span className="gradient-text">Vortex</span>?
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Built different. A DeFi protocol designed for real users, real yields, and real sustainability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glow-card p-8 group"
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${f.color} mb-4`}>
                    <Icon className={`w-6 h-6 ${f.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Products Section ──────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              The Complete <span className="gradient-text">DeFi Suite</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Everything you need to trade, earn, and grow your portfolio — in one interface.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={p.href}
                    className="glow-card p-6 flex flex-col h-full group cursor-pointer"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground flex-1">
                      {p.desc}
                    </p>
                    <div className="flex items-center gap-1 mt-4 text-sm text-vortex-400 font-medium group-hover:gap-2 transition-all">
                      Get Started <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Token Section ─────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="glow-card p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-vortex-500/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-green/5 rounded-full blur-[80px]" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-vortex-500/10 border border-vortex-500/20 text-sm text-vortex-400 mb-6">
                <Rocket className="w-4 h-4" /> VTX Token — Live on DeAura
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                The <span className="gradient-text">VTX Token</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                VTX powers the Vortex protocol. Stake for fee revenue sharing, govern protocol parameters,
                and boost your vault yields. Real utility, sustainable tokenomics.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
                {[
                  { label: "Fee Revenue Share", value: "40%", desc: "of protocol fees to stakers" },
                  { label: "Yield Boost", value: "2.5x", desc: "boosted vault returns" },
                  { label: "Governance", value: "100%", desc: "on-chain proposal voting" },
                ].map((item) => (
                  <div key={item.label} className="glass rounded-xl p-4">
                    <div className="text-2xl font-bold text-vortex-400">{item.value}</div>
                    <div className="text-sm font-medium mt-1">{item.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{item.desc}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/launch" className="btn-primary flex items-center gap-2">
                  <Rocket className="w-4 h-4" /> Buy VTX on DeAura
                </Link>
                <Link href="/stake" className="btn-secondary flex items-center gap-2">
                  <Coins className="w-4 h-4" /> Stake VTX
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Section ───────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to <span className="gradient-text">Maximize Your Yield</span>?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Connect your wallet and start earning optimized returns in seconds.
            </p>
            <Link href="/swap" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
              Start Trading <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
