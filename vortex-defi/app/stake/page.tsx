"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Coins,
  TrendingUp,
  Lock,
  Clock,
  Gift,
  Shield,
  Zap,
  Check,
  Loader2,
  Info,
  ArrowRight,
} from "lucide-react";
import { formatNumber } from "@/lib/utils";

const lockTiers = [
  { duration: 0, label: "Flexible", multiplier: 1.0, apr: 12.5 },
  { duration: 30, label: "30 Days", multiplier: 1.5, apr: 18.75 },
  { duration: 90, label: "90 Days", multiplier: 2.0, apr: 25.0 },
  { duration: 180, label: "180 Days", multiplier: 2.5, apr: 31.25 },
  { duration: 365, label: "1 Year", multiplier: 3.0, apr: 37.5 },
];

export default function StakePage() {
  const { connected } = useWallet();
  const [stakeAmount, setStakeAmount] = useState("");
  const [selectedTier, setSelectedTier] = useState(2); // 90 days default
  const [isStaking, setIsStaking] = useState(false);
  const [stakeSuccess, setStakeSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"stake" | "unstake">("stake");

  const tier = lockTiers[selectedTier];

  const handleStake = async () => {
    if (!stakeAmount || !connected) return;
    setIsStaking(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsStaking(false);
    setStakeSuccess(true);
    setTimeout(() => {
      setStakeSuccess(false);
      setStakeAmount("");
    }, 3000);
  };

  return (
    <div className="pt-24 md:pt-28 pb-10 px-4 sm:px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Stake VTX</h1>
          <p className="text-muted-foreground">
            Stake VTX to earn protocol revenue, boost your vault yields, and govern the protocol.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Staking Form (Left) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Total Staked", value: "$4.2M", icon: Lock, color: "text-vortex-400" },
                { label: "Stakers", value: "3,847", icon: Coins, color: "text-blue-400" },
                { label: "Rewards Paid", value: "$892K", icon: Gift, color: "text-green-400" },
                { label: "Base APR", value: "12.5%", icon: TrendingUp, color: "text-purple-400" },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="glow-card p-4 text-center">
                    <Icon className={`w-5 h-5 ${s.color} mx-auto mb-2`} />
                    <div className="text-lg font-bold">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Staking Card */}
            <div className="glow-card p-6">
              {/* Tab Toggle */}
              <div className="flex gap-1 p-1 rounded-xl glass mb-6">
                {(["stake", "unstake"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all capitalize ${
                      activeTab === tab
                        ? "bg-vortex-500/20 text-vortex-400"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Amount Input */}
              <div className="p-4 rounded-xl bg-white/[0.02] mb-4">
                <div className="flex justify-between mb-2 text-sm text-muted-foreground">
                  <span>{activeTab === "stake" ? "Stake" : "Unstake"} VTX</span>
                  <span>Balance: 5,420 VTX</span>
                </div>
                <div className="flex gap-3">
                  <input
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    placeholder="0.00"
                    className="flex-1 bg-transparent text-3xl font-semibold outline-none placeholder:text-muted-foreground/30 min-w-0"
                  />
                  <div className="flex gap-1">
                    {[25, 50, 75, 100].map((pct) => (
                      <button
                        key={pct}
                        onClick={() => setStakeAmount(String(5420 * pct / 100))}
                        className="px-2 py-1 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 transition-all"
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>
                {stakeAmount && (
                  <div className="text-xs text-muted-foreground mt-2">
                    ≈ ${formatNumber(parseFloat(stakeAmount) * 0.85)}
                  </div>
                )}
              </div>

              {/* Lock Duration Selector */}
              {activeTab === "stake" && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium flex items-center gap-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      Lock Duration
                    </span>
                    <span className="text-sm text-vortex-400">{tier.multiplier}x boost</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {lockTiers.map((t, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedTier(idx)}
                        className={`p-3 rounded-xl text-center transition-all ${
                          selectedTier === idx
                            ? "bg-vortex-500/20 border border-vortex-500/30 text-vortex-400"
                            : "glass hover:bg-white/10"
                        }`}
                      >
                        <div className="text-sm font-medium">{t.label}</div>
                        <div className="text-xs text-green-400 mt-1">{t.apr}% APR</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Staking Info */}
              <div className="glass rounded-xl p-4 space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Effective APR</span>
                  <span className="text-green-400 font-semibold">{tier.apr}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Boost Multiplier</span>
                  <span>{tier.multiplier}x</span>
                </div>
                {stakeAmount && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Est. Monthly Reward</span>
                    <span className="text-green-400">
                      {formatNumber(
                        (parseFloat(stakeAmount) * (tier.apr / 100)) / 12,
                        { decimals: 2 }
                      )}{" "}
                      VTX
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {tier.duration > 0 ? "Lock Period" : "Unlock"}
                  </span>
                  <span>{tier.duration > 0 ? `${tier.duration} days` : "Anytime"}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleStake}
                disabled={!connected || !stakeAmount || isStaking}
                className={`w-full py-4 rounded-2xl text-lg font-semibold transition-all ${
                  stakeSuccess
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : connected && stakeAmount
                    ? "btn-primary"
                    : "glass text-muted-foreground cursor-not-allowed"
                }`}
              >
                {stakeSuccess ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check className="w-5 h-5" /> {activeTab === "stake" ? "Staked" : "Unstaked"} Successfully!
                  </span>
                ) : isStaking ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                  </span>
                ) : !connected ? (
                  "Connect Wallet"
                ) : !stakeAmount ? (
                  "Enter Amount"
                ) : activeTab === "stake" ? (
                  `Stake ${stakeAmount} VTX`
                ) : (
                  `Unstake ${stakeAmount} VTX`
                )}
              </button>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Your Position */}
            <div className="glow-card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Coins className="w-5 h-5 text-vortex-400" />
                Your Position
              </h3>
              {connected ? (
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Staked VTX</div>
                    <div className="text-2xl font-bold">2,500.00</div>
                    <div className="text-xs text-muted-foreground">≈ $2,125.00</div>
                  </div>
                  <div className="h-px bg-white/5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Pending Rewards</div>
                    <div className="text-xl font-bold text-green-400">42.85 VTX</div>
                    <div className="text-xs text-muted-foreground">≈ $36.42</div>
                  </div>
                  <button className="w-full py-2.5 rounded-xl text-sm font-medium bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-all flex items-center justify-center gap-1">
                    <Gift className="w-4 h-4" /> Claim Rewards
                  </button>
                  <div className="h-px bg-white/5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Lock Expires</div>
                    <div className="text-sm font-medium">March 28, 2026</div>
                    <div className="text-xs text-muted-foreground">22 days remaining</div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground text-sm">
                  Connect wallet to view your staking position
                </div>
              )}
            </div>

            {/* Benefits */}
            <div className="glow-card p-6">
              <h3 className="text-lg font-semibold mb-4">Staking Benefits</h3>
              <div className="space-y-3">
                {[
                  { icon: Gift, label: "40% protocol fee share", color: "text-green-400" },
                  { icon: Zap, label: "Up to 3x vault yield boost", color: "text-yellow-400" },
                  { icon: Shield, label: "Governance voting power", color: "text-vortex-400" },
                  { icon: Clock, label: "Early access to new vaults", color: "text-purple-400" },
                ].map((b) => {
                  const Icon = b.icon;
                  return (
                    <div key={b.label} className="flex items-center gap-3 text-sm">
                      <Icon className={`w-4 h-4 ${b.color} shrink-0`} />
                      <span>{b.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
