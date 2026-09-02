import type { Metadata } from 'next';
import Link from 'next/link';
import { getPosts, getTags } from '@/lib/content';

export const metadata: Metadata = {
  title: '标签',
  description: '通过标签快速找到相关文章',
};

export default function TagsPage() {
  const tags = getTags();
  const posts = getPosts();
  const maxCount = Math.max(1, ...tags.map((t) => posts.filter((p) => p.tags.includes(t.name)).length));

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-14">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold text-ink sm:text-4xl">标签</h1>
        <p className="mt-2 text-ink/50">通过标签快速找到相关文章</p>
      </header>

      {tags.length === 0 ? (
        <p className="py-20 text-center text-ink/40">还没有标签。</p>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          {tags.map((tag) => {
            const count = posts.filter((p) => p.tags.includes(tag.name)).length;
            const ratio = count / maxCount;
            const size = 0.85 + ratio * 0.65;
            return (
              <Link
                key={tag.id}
                href={`/tags/${tag.slug}`}
                style={{ fontSize: `${size}rem` }}
                className="rounded-full bg-paper px-4 py-2 text-ink/70 shadow-card transition hover:-translate-y-0.5 hover:text-accent"
              >
                #{tag.name}
                <span className="ml-1.5 text-xs text-ink/40">{count}</span>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
