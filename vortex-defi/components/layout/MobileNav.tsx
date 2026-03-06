"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeftRight,
  Droplets,
  Vault,
  Coins,
  LayoutDashboard,
} from "lucide-react";

const tabs = [
  { href: "/swap", label: "Swap", icon: ArrowLeftRight },
  { href: "/pools", label: "Pools", icon: Droplets },
  { href: "/vaults", label: "Vaults", icon: Vault },
  { href: "/stake", label: "Stake", icon: Coins },
  { href: "/dashboard", label: "Board", icon: LayoutDashboard },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/90 backdrop-blur-xl border-t border-white/5 safe-area-pb">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all text-xs ${
                isActive
                  ? "text-vortex-400"
                  : "text-muted-foreground"
              }`}
            >
              <div
                className={`p-1.5 rounded-lg transition-all ${
                  isActive ? "bg-vortex-500/15" : ""
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
