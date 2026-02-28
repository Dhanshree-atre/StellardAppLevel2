"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OPTIONS } from "@/lib/stellar";
import { formatDistanceToNow } from "date-fns";
import { ActivityIcon, ExternalLinkIcon, LinkIcon } from "lucide-react";

export interface VoteEvent {
  id: string;
  voter: string;
  optionId: number;
  timestamp: number;
  txHash: string;
}

interface VoteHistoryProps {
  events: VoteEvent[];
}

export function VoteHistory({ events }: VoteHistoryProps) {
  return (
    <Card className="h-[600px] border-none shadow-none flex flex-col bg-transparent">
      <CardHeader className="px-0 pt-0 pb-6 border-b">
        <div className="flex items-center gap-3">
          <ActivityIcon className="w-6 h-6 text-primary animate-pulse" />
          <CardTitle className="text-2xl font-black uppercase tracking-tighter">Live Activity Feed</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto px-0 pt-6 scrollbar-thin scrollbar-thumb-primary/10 hover:scrollbar-thumb-primary/20 transition-colors">
        <div className="space-y-4">
          {events.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-20 text-muted-foreground animate-in fade-in zoom-in duration-500">
              <LinkIcon className="w-12 h-12 mb-4 opacity-20" />
              <p className="text-sm font-medium italic">No recent activity on-chain</p>
            </div>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="group relative p-4 rounded-xl border-2 border-primary/5 hover:border-primary/20 transition-all hover:bg-primary/[0.02] animate-in slide-in-from-right duration-500"
              >
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="outline" className="font-mono text-[10px] uppercase bg-primary/[0.03] border-primary/10 tracking-widest px-2 py-0.5">
                    {event.voter.slice(0, 4)}...{event.voter.slice(-4)}
                  </Badge>
                  <span className="text-[10px] font-bold text-muted-foreground tabular-nums uppercase tracking-tight">
                    {formatDistanceToNow(event.timestamp, { addSuffix: true })}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm font-medium text-muted-foreground italic">Voted for</span>
                  <Badge className="font-bold text-xs px-2.5 py-1 shadow-sm bg-primary/90">
                    {OPTIONS.find((o) => o.id === event.optionId)?.label || "Unknown"}
                  </Badge>
                </div>

                <div className="flex justify-end pt-2 border-t border-dashed border-primary/10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a
                    href={`https://stellar.expert/explorer/testnet/tx/${event.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary/70 transition-colors"
                  >
                    Explore TX <ExternalLinkIcon className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
