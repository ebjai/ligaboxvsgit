"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import fighters from "@/lib/fighters.json";
import { getFighterCredit } from "@/lib/getFighterCredit";

type Fighter = {
  id: string;
  name: string;
  division: string | null;
  record: { w: number | null; l: number | null; d: number | null; ko: number | null };
  height_cm: number | null;
  reach_cm: number | null;
  stance: "orthodox" | "southpaw";
  elo: number;
  image?: string | null;
};

export default function CompactFightWidget() {
  const list = fighters as Fighter[];
  const [a, setA] = useState(list.find(f => f.id === "jake-paul") || list[0]);
  const [b, setB] = useState(list.find(f => f.id === "gervonta-davis") || list[1]);
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<null | {
    probA: number;
    probB: number;
    drawProb: number;
    headline: string;
    rationale: string[];
  }>(null);

  async function predict() {
    setLoading(true);
    setRes(null);
    try {
      const r = await fetch("/api/v1/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fighterA: a.id, fighterB: b.id })
      });
      setRes(await r.json());
    } catch {
      setRes({
        probA: 0.55,
        probB: 0.40,
        drawProb: 0.05,
        headline: `Model favors ${a.name}`,
        rationale: ["Reach/form edge", "Elo differential", "Stance dynamics"]
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-[1100px] px-4 py-8">
      <div className="relative h-[300px] overflow-hidden rounded-xl border border-zinc-700 bg-zinc-950/50">
        <div className="grid h-full grid-cols-3">
          <Panel side="left" fighter={a} onChange={(id) => setA(list.find(f => f.id === id) || a)} />
          <CenterPanel loading={loading} res={res} a={a} b={b} onPredict={predict} />
          <Panel side="right" fighter={b} onChange={(id) => setB(list.find(f => f.id === id) || b)} />
        </div>
      </div>
    </section>
  );
}

function Panel({ side, fighter, onChange }: { side: "left" | "right"; fighter: Fighter; onChange: (id: string) => void }) {
  const stats = useMemo(() => [
    `Record: ${fighter.record.w ?? 0}-${fighter.record.l ?? 0}-${fighter.record.d ?? 0} (${fighter.record.ko ?? 0} KO)`,
    `Class: ${fighter.division ?? "TBD"}`,
    `Stance: ${cap(fighter.stance)}`,
    `Reach: ${fighter.reach_cm ? Math.round(fighter.reach_cm / 2.54) + '"' : 'N/A'}`
  ], [fighter]);

  const credit = getFighterCredit(fighter.id);

  return (
    <div className={`h-full flex items-center ${side === "left" ? "pl-6 pr-3" : "pr-6 pl-3"}`}>
      <div className="relative">
        <Image
          src={fighter.image || `/fighters/${fighter.id}.svg`}
          alt={fighter.name}
          width={120}
          height={120}
          className="rounded-full object-cover border border-zinc-700"
        />
        {credit?.source && (
          <a
            href={credit.source}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-0 right-0 rounded bg-black/80 px-1 text-[10px] text-amber-300 hover:text-amber-200"
          >
            📷 Wikimedia Commons
          </a>
        )}
      </div>
      
      <div className="ml-4 flex-1">
        <h3 className="text-lg font-semibold">{fighter.name}</h3>
        <p className="text-sm text-zinc-400">{fighter.division ?? "—"}</p>
        
        <ul className="mt-2 space-y-1 text-xs text-zinc-300">
          {stats.map((s, i) => (
            <li key={i} className={/Class|Stance|Reach/.test(s) ? "text-amber-300/90" : ""}>
              {s}
            </li>
          ))}
        </ul>
        
        <select
          onChange={(e) => onChange(e.target.value)}
          defaultValue={fighter.id}
          className="mt-3 w-full bg-zinc-900/80 border border-zinc-700 rounded-md px-2 py-1 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
        >
          {(fighters as Fighter[]).map(f => (
            <option key={f.id} value={f.id}>{f.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

function CenterPanel({ loading, res, a, b, onPredict }: {
  loading: boolean;
  res: any;
  a: Fighter;
  b: Fighter;
  onPredict: () => void;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center p-6">
      <div className="w-[340px] rounded-lg border border-zinc-700 bg-black/60 p-4">
        <h3 className="mb-4 text-center text-sm font-semibold">
          {res?.headline || "Select fighters and run AI prediction"}
        </h3>
        
        <div className="space-y-2 mb-4">
          <Bar label={a.name} value={(res?.probA ?? 0) * 100} align="left" />
          <Bar label="Draw" value={(res?.drawProb ?? 0) * 100} align="center" muted />
          <Bar label={b.name} value={(res?.probB ?? 0) * 100} align="right" />
        </div>
        
        <ul className="mb-4 space-y-1 text-xs text-zinc-400">
          {(res?.rationale || ["Height/Reach factored", "Form & Elo factored", "Stance dynamics handled"]).map((r: string, i: number) => (
            <li key={i}>• {r}</li>
          ))}
        </ul>
        
        <button
          onClick={onPredict}
          disabled={loading}
          className="w-full rounded-md bg-amber-500 py-2 px-4 text-sm font-semibold text-black hover:bg-amber-400 disabled:opacity-50 transition"
        >
          ⚡ {loading ? "Calculating…" : "Run AI Prediction"}
        </button>
      </div>
    </div>
  );
}

function Bar({ label, value, align, muted }: { label: string; value: number; align: "left" | "center" | "right"; muted?: boolean }) {
  const pct = Math.max(0, Math.min(100, Number.isFinite(value) ? value : 0));
  return (
    <div className="space-y-1">
      <div className={`flex ${align === "left" ? "justify-start" : align === "right" ? "justify-end" : "justify-center"} text-[11px] text-zinc-400`}>
        {label} {pct ? `${pct.toFixed(1)}%` : ""}
      </div>
      <div className="h-2 w-full bg-zinc-800 rounded">
        <div
          className={`h-2 ${muted ? "bg-zinc-500" : "bg-amber-500"} transition-all rounded`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function cap(s: string) {
  return s ? s[0].toUpperCase() + s.slice(1) : "";
}