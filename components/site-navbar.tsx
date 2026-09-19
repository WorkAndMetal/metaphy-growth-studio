"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteNavbar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const nav = navRef.current;
    const active = nav?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!nav || !active) return;
    const center = () => nav.scrollTo({ left: active.offsetLeft - nav.clientWidth / 2 + active.clientWidth / 2 });
    center();
    const observer = new ResizeObserver(center);
    observer.observe(nav);
    return () => observer.disconnect();
  }, [pathname]);
  return (
    <nav ref={navRef} aria-label="Bölümler" className="fixed left-4 top-4 max-w-[calc(100vw-2rem)] overflow-x-auto z-[100] flex gap-1 rounded-xl border border-white/20 bg-black/60 p-1 text-sm shadow-lg backdrop-blur-md">
      {[{ href: "/", label: "1. Bölüm" }, { href: "/bolum-2", label: "2. Bölüm" }, { href: "/bolum-4", label: "4. Bölüm" }, { href: "/bolum-5", label: "5. Bölüm" }].map(({ href, label }) => (
        <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}
          className={`shrink-0 whitespace-nowrap rounded-lg px-3 py-2 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-200 ${pathname === href ? "bg-white text-black" : "text-white/75 hover:bg-white/10 hover:text-white"}`}>
          {label}
        </Link>
      ))}
    </nav>
  );
}
