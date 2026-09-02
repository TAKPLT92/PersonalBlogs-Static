'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, type MouseEvent } from 'react';
import type { PostMeta } from '@/lib/content';
import { formatDate } from '@/lib/format';

export default function PostCard({ post }: { post: PostMeta }) {
  const router = useRouter();
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    event.preventDefault();
    linkRef.current?.classList.add('card-fold');
    setTimeout(() => router.push(`/posts/${post.slug}`), 280);
  };

  return (
    <Link
      ref={linkRef}
      href={`/posts/${post.slug}`}
      onClick={handleClick}
      className="group block rounded-2xl border border-black/5 bg-paper p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-cardHover"
    >
      {post.cover_image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.cover_image}
          alt={post.title}
          loading="lazy"
          className="mb-4 h-40 w-full rounded-xl object-cover"
        />
      ) : (
        <div className="mb-4 flex h-40 w-full items-center justify-center rounded-xl bg-gradient-to-br from-accentSoft/40 to-cream text-3xl text-accent/50">
          ✦
        </div>
      )}

      <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-ink/50">
        {post.category && (
          <span className="rounded-full bg-accentSoft/30 px-2.5 py-1 text-accent">
            {post.category}
          </span>
        )}
        <time>{formatDate(post.date)}</time>
      </div>

      <h2 className="text-xl font-semibold leading-snug text-ink transition-colors group-hover:text-accent">
        {post.title}
      </h2>

      {post.excerpt && (
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/60">
          {post.excerpt}
        </p>
      )}

      {post.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-black/[0.04] px-2.5 py-1 text-xs text-ink/50"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
