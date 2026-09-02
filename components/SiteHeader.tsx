'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchBar from '@/components/SearchBar';
import type { PostMeta } from '@/lib/content';

const navItems = [
  { href: '/home', label: '首页' },
  { href: '/categories', label: '分类' },
  { href: '/tags', label: '标签' },
  { href: '/timeline', label: '时间线' },
  { href: '/about', label: '关于' },
];

export default function SiteHeader({
  siteTitle,
  posts,
}: {
  siteTitle: string;
  posts: PostMeta[];
}) {
  const pathname = usePathname();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const raw = pathname?.startsWith(basePath)
    ? pathname.slice(basePath.length)
    : pathname;
  const normalized = (raw || '/').replace(/\/+$/, '') || '/';

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-cream/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/home" className="text-lg font-semibold tracking-wide text-ink">
          {siteTitle}
        </Link>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchBar posts={posts} />
          <nav className="flex flex-wrap items-center gap-1">
            {navItems.map((item) => {
              const active =
                normalized === item.href ||
                (item.href !== '/home' &&
                  normalized.startsWith(item.href + '/'));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                    active
                      ? 'bg-accent/15 font-medium text-accent'
                      : 'text-ink/60 hover:bg-black/5 hover:text-ink'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
