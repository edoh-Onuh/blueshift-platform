"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  ArrowDownUp,
  Settings,
  ChevronDown,
  Loader2,
  Info,
  AlertTriangle,
  Check,
  Zap,
  RefreshCw,
} from "lucide-react";
import { TOKENS, type Token } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";

export default function SwapPage() {
  const { connected } = useWallet();
  const [tokenIn, setTokenIn] = useState<Token>(TOKENS[0]); // SOL
  const [tokenOut, setTokenOut] = useState<Token>(TOKENS[1]); // USDC
  const [amountIn, setAmountIn] = useState("");
  const [slippage, setSlippage] = useState(0.5);
  const [showSettings, setShowSettings] = useState(false);
  const [showTokenSelect, setShowTokenSelect] = useState<"in" | "out" | null>(null);
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapSuccess, setSwapSuccess] = useState(false);

  const amountOut = amountIn
    ? ((parseFloat(amountIn) * (tokenIn.price || 0)) / (tokenOut.price || 1)).toFixed(
        tokenOut.decimals > 6 ? 6 : tokenOut.decimals
      )
    : "";

  const priceImpact = amountIn ? (parseFloat(amountIn) > 100 ? 0.15 : 0.02) : 0;
  const rate = tokenIn.price && tokenOut.price ? tokenIn.price / tokenOut.price : 0;

  const handleSwapTokens = useCallback(() => {
    setTokenIn(tokenOut);
    setTokenOut(tokenIn);
    setAmountIn(amountOut);
  }, [tokenIn, tokenOut, amountOut]);

  const handleSwap = async () => {
    if (!amountIn || !connected) return;
    setIsSwapping(true);
    // Simulate swap
    await new Promise((r) => setTimeout(r, 2000));
    setIsSwapping(false);
    setSwapSuccess(true);
    setTimeout(() => setSwapSuccess(false), 3000);
  };

  const selectToken = (token: Token) => {
    if (showTokenSelect === "in") {
      if (token.symbol === tokenOut.symbol) handleSwapTokens();
      else setTokenIn(token);
    } else {
      if (token.symbol === tokenIn.symbol) handleSwapTokens();
      else setTokenOut(token);
    }
    setShowTokenSelect(null);
  };

  return (
    <div className="pt-24 md:pt-28 pb-10 px-4 sm:px-6 min-h-screen">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Swap</h1>
            <p className="text-sm text-muted-foreground">Best-price routing across Solana</p>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2.5 rounded-xl transition-all ${
              showSettings ? "bg-vortex-500/20 text-vortex-400" : "glass hover:bg-white/10"
            }`}
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Settings Panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-4"
            >
              <div className="glow-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">Slippage Tolerance</span>
                  <span className="text-sm text-vortex-400">{slippage}%</span>
                </div>
                <div className="flex gap-2">
                  {[0.1, 0.5, 1.0].map((val) => (
                    <button
                      key={val}
                      onClick={() => setSlippage(val)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        slippage === val
                          ? "bg-vortex-500/20 text-vortex-400 border border-vortex-500/30"
                          : "glass hover:bg-white/10"
                      }`}
                    >
                      {val}%
                    </button>
                  ))}
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      value={slippage}
                      onChange={(e) => setSlippage(parseFloat(e.target.value) || 0)}
                      className="input-field text-sm text-center py-2 pr-6"
                      placeholder="Custom"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">%</span>
                  </div>
                </div>
                {slippage > 1 && (
                  <div className="flex items-center gap-2 mt-3 text-xs text-yellow-400">
                    <AlertTriangle className="w-3 h-3" /> High slippage may result in unfavorable trades
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Swap Card */}
        <div className="glow-card p-1">
          {/* Token In */}
          <div className="p-4 rounded-xl bg-white/[0.02]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">You pay</span>
              <span className="text-xs text-muted-foreground">
                Balance: 12.45 {tokenIn.symbol}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={amountIn}
                onChange={(e) => setAmountIn(e.target.value)}
                placeholder="0.00"
                className="flex-1 bg-transparent text-3xl font-semibold outline-none placeholder:text-muted-foreground/30 min-w-0"
              />
              <button
                onClick={() => setShowTokenSelect("in")}
                className="flex items-center gap-2 px-3 py-2 rounded-xl glass hover:bg-white/10 transition-all shrink-0"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-vortex-500 to-neon-blue flex items-center justify-center text-xs font-bold">
                  {tokenIn.symbol[0]}
                </div>
                <span className="font-semibold">{tokenIn.symbol}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            {amountIn && (
              <div className="text-xs text-muted-foreground mt-2">
                ≈ ${formatNumber(parseFloat(amountIn) * (tokenIn.price || 0))}
              </div>
            )}
          </div>

          {/* Swap Direction Button */}
          <div className="relative h-0 flex items-center justify-center z-10">
            <button
              onClick={handleSwapTokens}
              className="absolute top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-background border-4 border-background glass hover:bg-white/10 hover:rotate-180 transition-all duration-300"
            >
              <ArrowDownUp className="w-4 h-4 text-vortex-400" />
            </button>
          </div>

          {/* Token Out */}
          <div className="p-4 rounded-xl bg-white/[0.02] mt-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">You receive</span>
              <span className="text-xs text-muted-foreground">
                Balance: 1,245.00 {tokenOut.symbol}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={amountOut}
                readOnly
                placeholder="0.00"
                className="flex-1 bg-transparent text-3xl font-semibold outline-none placeholder:text-muted-foreground/30 min-w-0 cursor-default"
              />
              <button
                onClick={() => setShowTokenSelect("out")}
                className="flex items-center gap-2 px-3 py-2 rounded-xl glass hover:bg-white/10 transition-all shrink-0"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center text-xs font-bold">
                  {tokenOut.symbol[0]}
                </div>
                <span className="font-semibold">{tokenOut.symbol}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            {amountOut && (
              <div className="text-xs text-muted-foreground mt-2">
                ≈ ${formatNumber(parseFloat(amountOut) * (tokenOut.price || 0))}
              </div>
            )}
          </div>
        </div>

        {/* Swap Details */}
        {amountIn && parseFloat(amountIn) > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 glow-card p-4 space-y-3 text-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-1">
                <RefreshCw className="w-3.5 h-3.5" /> Rate
              </span>
              <span>
                1 {tokenIn.symbol} = {rate.toFixed(rate > 100 ? 2 : 6)} {tokenOut.symbol}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> Price Impact
              </span>
              <span className={priceImpact > 0.1 ? "text-yellow-400" : "text-green-400"}>
                {priceImpact.toFixed(2)}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-1">
                <Info className="w-3.5 h-3.5" /> Min. Received
              </span>
              <span>
                {(parseFloat(amountOut) * (1 - slippage / 100)).toFixed(4)} {tokenOut.symbol}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Network Fee</span>
              <span>~0.000005 SOL</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Route</span>
              <span className="text-vortex-400 flex items-center gap-1">
                {tokenIn.symbol} → Jupiter → {tokenOut.symbol}
              </span>
            </div>
          </motion.div>
        )}

        {/* Swap Button */}
        <button
          onClick={handleSwap}
          disabled={!amountIn || !connected || isSwapping}
          className={`w-full mt-4 py-4 rounded-2xl text-lg font-semibold transition-all ${
            swapSuccess
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : !connected
              ? "glass text-muted-foreground cursor-not-allowed"
              : !amountIn
              ? "glass text-muted-foreground cursor-not-allowed"
              : "btn-primary"
          }`}
        >
          {swapSuccess ? (
            <span className="flex items-center justify-center gap-2">
              <Check className="w-5 h-5" /> Swap Successful!
            </span>
          ) : isSwapping ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" /> Swapping...
            </span>
          ) : !connected ? (
            "Connect Wallet"
          ) : !amountIn ? (
            "Enter an amount"
          ) : (
            `Swap ${tokenIn.symbol} → ${tokenOut.symbol}`
          )}
        </button>
      </div>

      {/* Token Select Modal */}
      <AnimatePresence>
        {showTokenSelect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowTokenSelect(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md glow-card p-6 max-h-[80vh] overflow-auto"
            >
              <h3 className="text-lg font-semibold mb-4">Select a Token</h3>
              <input
                type="text"
                placeholder="Search by name or address..."
                className="input-field mb-4"
              />
              <div className="space-y-1">
                {TOKENS.map((token) => (
                  <button
                    key={token.symbol}
                    onClick={() => selectToken(token)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-vortex-500 to-neon-blue flex items-center justify-center text-sm font-bold shrink-0">
                      {token.symbol[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold">{token.symbol}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {token.name}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-sm font-medium">
                        ${token.price?.toFixed(token.price > 1 ? 2 : 6)}
                      </div>
                      <div
                        className={`text-xs ${
                          (token.change24h || 0) >= 0
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {(token.change24h || 0) >= 0 ? "+" : ""}
                        {token.change24h?.toFixed(2)}%
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
