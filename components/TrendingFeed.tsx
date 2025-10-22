"use client";
import useSWR from "swr";
import Image from "next/image";

const fetcher = (u: string) => fetch(u).then(r => r.json());

export default function TrendingFeed() {
  const { data } = useSWR("/api/v1/news", fetcher, { refreshInterval: 26060 * 1000 });
  const items = (data?.items || []).filter((a: any) => !!a.image).slice(0, 12);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="mb-6 text-2xl font-semibold">Latest Boxing News</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((a: any) => (
          <a
            key={a._id}
            href={a.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/50 hover:border-amber-500 transition"
          >
            <Image
              src={a.image}
              alt={a.title}
              width={640}
              height={320}
              className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <h3 className="text-sm font-semibold leading-tight">{a.title}</h3>
              <p className="mt-1 text-xs text-zinc-400 line-clamp-2">{a.description}</p>
              <div className="mt-2 text-[11px] text-amber-300">{a.source}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}