"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useStellar } from "@/context/StellarContext";
import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit";
import { toast } from "sonner";
import { OPTIONS, CONTRACT_ID, POLL_ID, STELLAR_NETWORK } from "@/lib/stellar";
import { xdr, Address, TransactionBuilder, Operation, SorobanRpc, TimeoutInfinite } from "stellar-sdk";
import { CheckIcon, ExternalLinkIcon, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface PollCardProps {
  results: Record<number, number>;
  onVoteSuccess: (txHash: string) => void;
}

export function PollCard({ results, onVoteSuccess }: PollCardProps) {
  const { address, rpc, connect } = useStellar();
  const [loading, setLoading] = useState<number | null>(null);

  const totalVotes = Object.values(results).reduce((a, b) => a + b, 0);

  const handleVote = async (optionId: number) => {
    if (!address) {
      toast.info("Please connect your wallet first");
      await connect();
      return;
    }

    setLoading(optionId);
    try {
      const contractAddress = CONTRACT_ID;
      const voter = Address.fromString(address);
      
      // 1. Load account for sequence number
      const account = await rpc.getAccount(address);
      
      // 2. Build the transaction
      const txBuilder = new TransactionBuilder(
        account, 
        {
          fee: "1000", // Will be updated by simulation
          networkPassphrase: STELLAR_NETWORK.passphrase,
        }
      ).addOperation(
        Operation.invokeContract({
          contractId: contractAddress,
          function: "vote",
          args: [
            voter.toScVal(),
            xdr.ScVal.scvU32(POLL_ID),
            xdr.ScVal.scvU32(optionId),
          ],
        })
      ).setTimeout(TimeoutInfinite);

      const tx = txBuilder.build();
      
      // 3. Simulation (Preflight)
      const sim = await rpc.simulateTransaction(tx);
      if (SorobanRpc.Api.isSimulationError(sim)) {
        throw new Error(`Simulation failed: ${sim.error}`);
      }
      
      // 4. Update transaction with simulation data
      const txWithFee = SorobanRpc.assembleTransaction(tx, sim).build();
      
      // 5. Sign the transaction using v2 static API
      const { signedTxXdr } = await StellarWalletsKit.signTransaction(txWithFee.toXDR(), {
        networkPassphrase: STELLAR_NETWORK.passphrase,
        address: address,
      });

      // 6. Send transaction
      const sendResponse = await rpc.sendTransaction(TransactionBuilder.fromXDR(signedTxXdr, STELLAR_NETWORK.passphrase));
      
      if (sendResponse.status === "ERROR") {
        throw new Error("Transaction submission failed");
      }

      // 7. Track status
      toast.promise(
        async () => {
          let status = sendResponse.status;
          let hash = sendResponse.hash;
          
          while (status === "PENDING") {
            const txStatus = await rpc.getTransaction(hash);
            status = txStatus.status;
            
            if (status === "SUCCESS") {
              onVoteSuccess(hash);
              return hash;
            }
            if (status === "FAILED") {
              throw new Error("Transaction failed on-chain");
            }
            // Wait before next check
            await new Promise(r => setTimeout(r, 1500));
          }
          return hash;
        },
        {
          loading: "Broadcasting your vote to Stellar Testnet...",
          success: (hash) => `Vote confirmed! Tx: ${hash.slice(0, 8)}`,
          error: (err) => `Voting failed: ${err.message}`,
        }
      );

    } catch (error: any) {
      console.error(error);
      const msg = error.message || "An error occurred";
      toast.error(msg.includes("rejection") ? "Wallet rejected transaction" : msg);
    } finally {
      setLoading(null);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-2 border-primary/10 shadow-xl overflow-hidden bg-card/50 backdrop-blur-sm">
      <CardHeader className="bg-primary/5 pb-8 border-b border-primary/5">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-3xl font-black tracking-tighter uppercase">Decentralized UI Preference</CardTitle>
            <CardDescription className="text-lg mt-2 font-medium opacity-80 italic">Which frontend framework do you prefer for Web3?</CardDescription>
          </div>
          <div className="bg-primary px-3 py-1 rounded-full text-[10px] font-black text-primary-foreground tracking-widest uppercase animate-pulse">
            Active
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-10 pb-12 space-y-8 px-8">
        {OPTIONS.map((option) => {
          const count = results[option.id] || 0;
          const percentage = totalVotes > 0 ? (count / totalVotes) * 100 : 0;
          
          return (
            <div key={option.id} className="space-y-3 group">
              <div className="flex justify-between items-end px-1">
                <span className="font-black text-xl tracking-tighter uppercase italic group-hover:text-primary transition-colors">{option.label}</span>
                <span className="text-xs font-black text-muted-foreground tabular-nums uppercase tracking-widest">
                  {count} VOTES • {percentage.toFixed(0)}%
                </span>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex-grow bg-primary/5 rounded-full h-4 p-0.5 border border-primary/10 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                  />
                </div>
                <Button 
                  size="sm" 
                  variant={loading === option.id ? "secondary" : "default"}
                  onClick={() => handleVote(option.id)}
                  disabled={loading !== null}
                  className="min-w-[120px] h-10 shadow-lg hover:shadow-primary/20 transition-all active:scale-95 font-black uppercase tracking-widest text-[10px] rounded-xl border-b-4 border-primary-foreground/20 active:border-b-0"
                >
                  {loading === option.id ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-1" />
                  ) : (
                    <CheckIcon className="h-4 w-4 mr-1 stroke-[3]" />
                  )}
                  {loading === option.id ? "Broadcasting" : "Cast Vote"}
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
      <CardFooter className="bg-primary/[0.02] border-t border-primary/5 flex justify-between py-6 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">
        <div>Total Network Input: {totalVotes}</div>
        <div className="flex items-center gap-2 group cursor-pointer hover:text-primary transition-colors">
          <ExternalLinkIcon className="h-3.5 w-3.5" />
          <a href={`https://stellar.expert/explorer/testnet/contract/${CONTRACT_ID}`} target="_blank" rel="noopener noreferrer">
            Contract: {CONTRACT_ID.slice(0, 4)}...{CONTRACT_ID.slice(-4)}
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
