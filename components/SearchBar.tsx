'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { PostMeta } from '@/lib/content';

export default function SearchBar({ posts }: { posts: PostMeta[] }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const keyword = query.trim().toLowerCase();
  const suggestions = keyword
    ? posts
        .filter(
          (post) =>
            post.title.toLowerCase().includes(keyword) ||
            (post.excerpt ?? '').toLowerCase().includes(keyword) ||
            post.tags.some((tag) => tag.toLowerCase().includes(keyword)),
        )
        .slice(0, 6)
    : [];

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (keyword) {
      router.push(`/home?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/home');
    }
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (keyword) setOpen(true);
          }}
          placeholder="搜索文章"
          className="w-full rounded-full border border-black/10 bg-paper px-4 py-1.5 text-sm text-ink outline-none focus:border-accent/50 sm:w-48"
        />
      </form>

      {open && keyword && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-black/5 bg-paper shadow-cardHover">
          {suggestions.length === 0 ? (
            <p className="px-4 py-3 text-sm text-ink/40">没有匹配的文章</p>
          ) : (
            <ul>
              {suggestions.map((post) => (
                <li key={post.slug}>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      setQuery('');
                      router.push(`/posts/${encodeURIComponent(post.slug)}`);
                    }}
                    className="block w-full px-4 py-2.5 text-left hover:bg-accent/5"
                  >
                    <span className="block text-sm font-medium text-ink">{post.title}</span>
                    {post.category && (
                      <span className="block text-xs text-ink/40">{post.category}</span>
                    )}
                  </button>
                </li>
              ))}
              <li className="border-t border-black/5">
                <Link
                  href={`/home?q=${encodeURIComponent(query.trim())}`}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 text-sm text-accent hover:bg-accent/5"
                >
                  查看全部搜索结果 →
                </Link>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
