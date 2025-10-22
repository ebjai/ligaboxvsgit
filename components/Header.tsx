"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Home" },
  { href: "/news/why-we-built-liga", label: "Articles" },
  { href: "/about", label: "About" }
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 h-14 border-b border-zinc-800/50 bg-black/70 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <Image 
            src="/brand/logo.png" 
            alt="Liga de Boxeo" 
            width={32} 
            height={32} 
            className="rounded-md"
          />
          <span className="font-semibold text-amber-300">Liga de Boxeo</span>
          <span className="text-xs text-zinc-500">Powered by LDB.AI</span>
        </Link>
        
        <nav className="flex items-center gap-6">
          {nav.map((n) => (
            <Link 
              key={n.href} 
              className={`${pathname === n.href ? 'text-amber-300' : 'text-zinc-200'} hover:text-amber-400`} 
              href={n.href}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}