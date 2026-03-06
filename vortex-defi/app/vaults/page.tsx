"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Vault,
  TrendingUp,
  Shield,
  AlertTriangle,
  Flame,
  Lock,
  Info,
  ArrowRight,
  Check,
  Loader2,
  ChevronDown,
  ChevronUp,
  Wallet,
  X,
} from "lucide-react";
import { VAULTS, type VaultData } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";

const riskConfig = {
  low: { color: "text-green-400", bg: "bg-green-500/10 border-green-500/20", icon: Shield, label: "Low Risk" },
  medium: { color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20", icon: AlertTriangle, label: "Medium" },
  high: { color: "text-red-400", bg: "bg-red-500/10 border-red-500/20", icon: Flame, label: "High Risk" },
};

export default function VaultsPage() {
  const { connected } = useWallet();
  const [activeVault, setActiveVault] = useState<string | null>(null);
  const [depositAmount, setDepositAmount] = useState("");
  const [isDepositing, setIsDepositing] = useState(false);
  const [depositSuccess, setDepositSuccess] = useState<string | null>(null);
  const [riskFilter, setRiskFilter] = useState<"all" | "low" | "medium" | "high">("all");

  const totalTvl = VAULTS.reduce((s, v) => s + v.tvl, 0);
  const avgApy = VAULTS.reduce((s, v) => s + v.apy, 0) / VAULTS.length;

  const filtered = riskFilter === "all" ? VAULTS : VAULTS.filter((v) => v.riskLevel === riskFilter);

  const handleDeposit = async (vaultId: string) => {
    if (!depositAmount || !connected) return;
    setIsDepositing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsDepositing(false);
    setDepositSuccess(vaultId);
    setDepositAmount("");
    setTimeout(() => setDepositSuccess(null), 3000);
  };

  return (
    <div className="pt-24 md:pt-28 pb-10 px-4 sm:px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Yield Vaults</h1>
          <p className="text-muted-foreground">
            Auto-compounding strategies that maximize your returns. Deposit and let Vortex optimize.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="glow-card p-5">
            <div className="flex items-center gap-2 mb-1">
              <Lock className="w-4 h-4 text-vortex-400" />
              <span className="text-sm text-muted-foreground">Total Vault TVL</span>
            </div>
            <div className="text-2xl font-bold">{formatNumber(totalTvl, { prefix: "$", compact: true })}</div>
          </div>
          <div className="glow-card p-5">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-sm text-muted-foreground">Average APY</span>
            </div>
            <div className="text-2xl font-bold text-green-400">{avgApy.toFixed(1)}%</div>
          </div>
          <div className="glow-card p-5">
            <div className="flex items-center gap-2 mb-1">
              <Vault className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-muted-foreground">Active Vaults</span>
            </div>
            <div className="text-2xl font-bold">{VAULTS.length}</div>
          </div>
        </div>

        {/* Risk Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-1">
          {(["all", "low", "medium", "high"] as const).map((level) => (
            <button
              key={level}
              onClick={() => setRiskFilter(level)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                riskFilter === level
                  ? "bg-vortex-500/20 text-vortex-400 border border-vortex-500/30"
                  : "glass hover:bg-white/10"
              }`}
            >
              {level === "all" ? "All Vaults" : level === "low" ? "🟢 Low Risk" : level === "medium" ? "🟡 Medium" : "🔴 High Risk"}
            </button>
          ))}
        </div>

        {/* Vault Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((vault, i) => {
            const risk = riskConfig[vault.riskLevel];
            const RiskIcon = risk.icon;
            const isOpen = activeVault === vault.id;
            const isSuccess = depositSuccess === vault.id;

            return (
              <motion.div
                key={vault.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glow-card overflow-hidden"
              >
                {/* Vault Header */}
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => setActiveVault(isOpen ? null : vault.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-vortex-500/20 to-neon-blue/20 flex items-center justify-center">
                        <Vault className="w-6 h-6 text-vortex-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{vault.name}</h3>
                        <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${risk.bg} ${risk.color} border mt-1`}>
                          <RiskIcon className="w-3 h-3" />
                          {risk.label}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400">{vault.apy.toFixed(1)}%</div>
                      <div className="text-xs text-muted-foreground">APY</div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{vault.strategy}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-6">
                      <div>
                        <div className="text-xs text-muted-foreground">TVL</div>
                        <div className="text-sm font-medium">{formatNumber(vault.tvl, { prefix: "$", compact: true })}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Token</div>
                        <div className="text-sm font-medium">{vault.token.symbol}</div>
                      </div>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </div>

                {/* Expanded Deposit Section */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-white/5">
                        <p className="text-sm text-muted-foreground mb-4">
                          {vault.description}
                        </p>

                        {/* Deposit Input */}
                        <div className="p-4 rounded-xl bg-white/[0.02] mb-4">
                          <div className="flex justify-between mb-2 text-sm text-muted-foreground">
                            <span>Deposit {vault.token.symbol}</span>
                            <span>Balance: 12.45 {vault.token.symbol}</span>
                          </div>
                          <div className="flex gap-3">
                            <input
                              type="number"
                              value={depositAmount}
                              onChange={(e) => setDepositAmount(e.target.value)}
                              placeholder="0.00"
                              className="flex-1 bg-transparent text-2xl font-semibold outline-none placeholder:text-muted-foreground/30 min-w-0"
                            />
                            <button
                              onClick={() => setDepositAmount("12.45")}
                              className="px-3 py-1 rounded-lg text-xs font-medium bg-vortex-500/10 text-vortex-400 hover:bg-vortex-500/20 transition-all"
                            >
                              MAX
                            </button>
                          </div>
                        </div>

                        {/* Deposit Info */}
                        <div className="glass rounded-xl p-4 space-y-2 text-sm mb-4">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Estimated Yearly Yield</span>
                            <span className="text-green-400">
                              {depositAmount
                                ? formatNumber(parseFloat(depositAmount) * (vault.apy / 100) * (vault.token.price || 1), { prefix: "$" })
                                : "$0.00"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Deposit Fee</span>
                            <span>0.00%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Withdrawal Fee</span>
                            <span>0.10%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Compounds</span>
                            <span>Every 12 hours</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeposit(vault.id)}
                          disabled={!connected || !depositAmount || isDepositing}
                          className={`w-full py-3.5 rounded-xl font-semibold transition-all ${
                            isSuccess
                              ? "bg-green-500/20 text-green-400 border border-green-500/30"
                              : connected && depositAmount
                              ? "btn-primary"
                              : "glass text-muted-foreground cursor-not-allowed"
                          }`}
                        >
                          {isSuccess ? (
                            <span className="flex items-center justify-center gap-2">
                              <Check className="w-5 h-5" /> Deposited!
                            </span>
                          ) : isDepositing ? (
                            <span className="flex items-center justify-center gap-2">
                              <Loader2 className="w-5 h-5 animate-spin" /> Depositing...
                            </span>
                          ) : !connected ? (
                            "Connect Wallet"
                          ) : !depositAmount ? (
                            "Enter Amount"
                          ) : (
                            `Deposit ${vault.token.symbol}`
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
