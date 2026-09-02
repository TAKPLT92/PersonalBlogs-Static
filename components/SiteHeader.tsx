'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/home', label: '首页' },
  { href: '/categories', label: '分类' },
  { href: '/tags', label: '标签' },
  { href: '/timeline', label: '时间线' },
  { href: '/resources', label: '资源' },
  { href: '/about', label: '关于' },
];

export default function SiteHeader({ siteTitle }: { siteTitle: string }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-cream/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/home" className="text-lg font-semibold tracking-wide text-ink">
          {siteTitle}
        </Link>
        <nav className="flex flex-wrap items-center gap-1">
          {navItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== '/home' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                  active
                    ? 'bg-accent/10 text-accent'
                    : 'text-ink/60 hover:bg-black/5 hover:text-ink'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
