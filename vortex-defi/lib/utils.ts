import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(
  value: number,
  options?: { prefix?: string; decimals?: number; compact?: boolean }
): string {
  const { prefix = "", decimals = 2, compact = false } = options || {};
  if (compact) {
    if (value >= 1_000_000_000) return `${prefix}${(value / 1_000_000_000).toFixed(1)}B`;
    if (value >= 1_000_000) return `${prefix}${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `${prefix}${(value / 1_000).toFixed(1)}K`;
  }
  return `${prefix}${value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function formatPercent(value: number): string {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
