export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 bg-black/70 py-8">
      <div className="mx-auto max-w-6xl px-4 text-center text-sm text-zinc-400">
        © {new Date().getFullYear()} Liga de Boxeo — All rights reserved.
        <span className="mx-2">•</span>
        <a href="/sitemap.xml" className="hover:text-amber-300">Sitemap</a>
        <span className="mx-2">•</span>
        <a href="/robots.txt" className="hover:text-amber-300">Robots</a>
      </div>
    </footer>
  );
}