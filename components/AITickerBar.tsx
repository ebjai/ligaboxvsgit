"use client";
import useSWR from "swr";

const fetcher = (u: string) => fetch(u).then(r => r.json());

export default function AITickerBar() {
  const { data } = useSWR("/api/v1/news", fetcher, { refreshInterval: 30_000 });
  const items = (data?.items || []).slice(0, 20);
  
  return (
    <div className="h-8 overflow-hidden border-y border-zinc-800/50 bg-black/70">
      <div className="flex h-full items-center bg-gradient-to-r from-amber-600 to-amber-500 px-4">
        <span className="text-xs font-semibold text-black">BREAKING:</span>
        <div className="ml-2 flex animate-scroll items-center gap-1 text-xs">
          {items.map((i: any, idx: number) => (
            <span key={i._id || idx} className="text-zinc-300">
              {i.title} | 
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}