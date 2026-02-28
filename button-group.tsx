"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { OPTIONS } from "@/lib/stellar";
import { VoteIcon, UsersIcon, ClockIcon } from "lucide-react";

interface StatsCardProps {
  results: Record<number, number>;
}

export function StatsCard({ results }: StatsCardProps) {
  const totalVotes = Object.values(results).reduce((a, b) => a + b, 0);
  const leadingOptionId = Object.entries(results).sort((a, b) => b[1] - a[1])[0]?.[0];
  const leadingLabel = OPTIONS.find((o) => o.id === parseInt(leadingOptionId))?.label || "None";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <Card className="border-2 border-primary/5 bg-primary/[0.01] hover:bg-primary/[0.03] transition-colors shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground italic">Total Votes</CardTitle>
          <VoteIcon className="w-5 h-5 text-primary opacity-50" />
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-black tracking-tighter text-primary">{totalVotes}</div>
          <p className="text-xs font-bold text-muted-foreground mt-2 uppercase tracking-tight">On-chain contributions</p>
        </CardContent>
      </Card>
      
      <Card className="border-2 border-primary/5 bg-primary/[0.01] hover:bg-primary/[0.03] transition-colors shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground italic">Leading Choice</CardTitle>
          <UsersIcon className="w-5 h-5 text-primary opacity-50" />
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-black tracking-tighter text-primary">{leadingLabel}</div>
          <p className="text-xs font-bold text-muted-foreground mt-2 uppercase tracking-tight">Community consensus</p>
        </CardContent>
      </Card>

      <Card className="border-2 border-primary/5 bg-primary/[0.01] hover:bg-primary/[0.03] transition-colors shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground italic">Last Updated</CardTitle>
          <ClockIcon className="w-5 h-5 text-primary opacity-50" />
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-black tracking-tighter text-primary">LIVE</div>
          <p className="text-xs font-bold text-muted-foreground mt-2 uppercase tracking-tight tabular-nums tracking-widest animate-pulse">Synced with Testnet</p>
        </CardContent>
      </Card>
    </div>
  );
}
