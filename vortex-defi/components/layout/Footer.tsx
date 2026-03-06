import Link from "next/link";
import { Github, Twitter, MessageCircle, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="hidden md:block border-t border-white/5 bg-background/50 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-gradient-to-br from-vortex-500 to-neon-blue rounded-lg rotate-45" />
                <div className="absolute inset-[3px] bg-background rounded-[5px] rotate-45" />
                <span className="absolute inset-0 flex items-center justify-center text-vortex-400 font-bold text-xs">
                  V
                </span>
              </div>
              <span className="text-lg font-bold gradient-text">Vortex DeFi</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Intelligent yield routing and liquidity optimization on Solana.
              Maximize returns with smart, automated DeFi strategies.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="https://twitter.com" target="_blank" rel="noopener" className="p-2 rounded-lg glass hover:bg-white/10 transition-all">
                <Twitter className="w-4 h-4 text-muted-foreground" />
              </a>
              <a href="https://discord.gg" target="_blank" rel="noopener" className="p-2 rounded-lg glass hover:bg-white/10 transition-all">
                <MessageCircle className="w-4 h-4 text-muted-foreground" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener" className="p-2 rounded-lg glass hover:bg-white/10 transition-all">
                <Github className="w-4 h-4 text-muted-foreground" />
              </a>
            </div>
          </div>

          {/* Protocol */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Protocol</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/swap", label: "Swap" },
                { href: "/pools", label: "Liquidity Pools" },
                { href: "/vaults", label: "Yield Vaults" },
                { href: "/stake", label: "Staking" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/docs", label: "Documentation" },
                { href: "/dashboard", label: "Analytics" },
                { href: "/launch", label: "Token Launch" },
                { href: "https://deaura.com", label: "DeAura", external: true },
              ].map((link) => (
                <li key={link.href}>
                  {"external" in link ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                    >
                      {link.label}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {["Terms of Service", "Privacy Policy", "Risk Disclosure"].map(
                (label) => (
                  <li key={label}>
                    <span className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                      {label}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Vortex DeFi. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built on
            <span className="text-neon-green font-medium">Solana</span>
            &middot; Powered by
            <span className="text-vortex-400 font-medium">DeAura</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
