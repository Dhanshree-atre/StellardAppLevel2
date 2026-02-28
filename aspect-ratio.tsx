"use client";

import { usePoll } from "@/hooks/usePoll";
import { PollCard } from "@/components/PollCard";
import { VoteHistory } from "@/components/VoteHistory";
import { WalletButton } from "@/components/wallet/WalletButton";
import { StatsCard } from "@/components/StatsCard";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ZapIcon, ShieldIcon, DatabaseIcon, CpuIcon } from "lucide-react";

export default function Home() {
  const { results, events, isLoading, refresh } = usePoll();

  const handleVoteSuccess = (txHash: string) => {
    refresh();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="relative">
          <Loader2 className="w-16 h-16 text-primary animate-spin opacity-20" />
          <Loader2 className="w-16 h-16 text-primary animate-spin absolute top-0 left-0" style={{ animationDuration: '1.5s' }} />
        </div>
        <p className="mt-6 text-sm font-black uppercase tracking-widest text-muted-foreground animate-pulse">Synchronizing with Soroban RPC...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Background patterns */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 opacity-[0.03]">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 py-4">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center gap-3 group cursor-default">
            <div className="relative w-10 h-10 bg-primary rounded-xl flex items-center justify-center overflow-hidden group-hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-shadow">
              <ZapIcon className="w-6 h-6 text-primary-foreground relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black uppercase tracking-tighter leading-none">StellarPoll</span>
              <span className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase leading-none mt-1.5 opacity-70">Soroban Testnet v2</span>
            </div>
          </div>
          <WalletButton />
        </div>
      </header>

      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            <ShieldIcon className="w-3.5 h-3.5" />
            Decentralized & Tamper-proof
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
            The Future of <span className="text-primary italic">On-Chain</span> Voting
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed pt-4">
            Participate in real-time governance and preference polling on the Stellar Network using Soroban smart contracts. Secure, transparent, and blazing fast.
          </p>
        </motion.div>

        <StatsCard results={results} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start relative">
          <div className="lg:col-span-2 space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <PollCard results={results} onVoteSuccess={handleVoteSuccess} />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
              <div className="p-6 rounded-3xl border-2 border-primary/5 bg-primary/[0.01] hover:border-primary/10 transition-all flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <DatabaseIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight mb-1">State persistence</h3>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    Votes are permanently recorded on the Stellar ledger, ensuring total transparency for all participants.
                  </p>
                </div>
              </div>
              <div className="p-6 rounded-3xl border-2 border-primary/5 bg-primary/[0.01] hover:border-primary/10 transition-all flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <CpuIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight mb-1">Soroban Engine</h3>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    Powered by the latest WebAssembly smart contract engine on Stellar, optimized for performance and safety.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-1 sticky top-32"
          >
            <div className="p-1 rounded-[2.5rem] bg-gradient-to-b from-primary/10 to-transparent">
              <div className="bg-background rounded-[2.3rem] p-8 shadow-2xl border border-primary/10 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] pointer-events-none" />
                <VoteHistory events={events} />
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="border-t border-primary/10 bg-muted/20 py-12 mt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_left_-4px] [mask-image:linear-gradient(to_bottom,transparent,black)] pointer-events-none" />
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
          <div className="flex items-center gap-3">
            <ZapIcon className="w-5 h-5 text-primary opacity-50" />
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Built for Stellar Web3 Hackathon</span>
          </div>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 italic">
            <span>Powered by Soroban</span>
            <span>2026 Stellar Ecosystem</span>
            <span>Level 2 Certified</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
