import Hero from "@/components/Hero";
import AITickerBar from "@/components/AITickerBar";
import TrendingFeed from "@/components/TrendingFeed";
import CompactFightWidget from "@/components/CompactFightWidget";

export default function Home() {
  return (
    <>
      <Hero />
      <AITickerBar />
      <CompactFightWidget />
      <TrendingFeed />
    </>
  );
}